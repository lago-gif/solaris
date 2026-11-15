#!/usr/bin/env node
// Genera, a partir de tokens/tokens.json:
//   src/styles/tokens.css  → una variable CSS por token
//   src/styles/theme.css   → bloque @theme de Tailwind con los semánticos y los de componente
//   docs/tokens.md         → tabla token → clase de Tailwind
//
// Uso:
//   npm run tokens            escribe los archivos
//   npm run tokens -- --check comprueba que están al día, sin escribir (falla si no lo están)

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cssVar, tailwindFor, typographyStyle, classFor, segments } from './token-names.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))
const check = process.argv.includes('--check')
const HEADER = 'Archivo generado por `npm run tokens` a partir de tokens/tokens.json. No lo edites a mano.'

/* ---------- 1. Recorrer tokens.json ---------- */

/** Lista todos los tokens en orden: { path, type, value, description }. */
function collect(node, path, type, out = []) {
  const t = node.$type ?? type
  if (node.$value !== undefined) {
    out.push({ path, type: t, value: node.$value, description: node.$description ?? '' })
    return out
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') && key !== '$root') continue
    collect(child, `${path}.${key}`, t, out)
  }
  return out
}

const all = ['primitive', 'semantic', 'component'].flatMap((layer) => collect(tokens[layer], layer))
const byPath = new Map(all.map((t) => [segments(t.path).join('.'), t]))

/* ---------- 2. Valores CSS ---------- */

const isAlias = (v) => typeof v === 'string' && /^\{.+\}$/.test(v)
const aliasPath = (v) => v.slice(1, -1)

function aliasRef(v) {
  const target = segments(aliasPath(v)).join('.')
  if (!byPath.has(target)) throw new Error(`Alias roto: ${v}`)
  return `var(${cssVar(aliasPath(v))})`
}

function cssValue(type, value) {
  if (isAlias(value)) return aliasRef(value)
  switch (type) {
    case 'color': {
      const [a, b, c] = value.components
      const alpha = value.alpha !== undefined && value.alpha !== 1 ? ` / ${value.alpha}` : ''
      return value.colorSpace === 'oklch' ? `oklch(${a} ${b} ${c}${alpha})` : `rgb(${a * 255} ${b * 255} ${c * 255}${alpha})`
    }
    case 'dimension':
      return `${value.value}${value.unit}`
    case 'fontFamily':
      return value.map((f) => (/\s/.test(f) ? `'${f}'` : f)).join(', ')
    case 'fontWeight':
      return String(value)
    case 'shadow': {
      const v = (k) => cssValue(k === 'color' ? 'color' : 'dimension', value[k])
      return `${v('offsetX')} ${v('offsetY')} ${v('blur')} ${v('spread')} ${v('color')}`
    }
    default:
      throw new Error(`Tipo sin soporte: ${type}`)
  }
}

/* ---------- 3. tokens.css ---------- */

function buildTokensCss() {
  const lines = [`/* ${HEADER} */`, '', ':root {']
  let layer = ''
  for (const t of all) {
    const l = segments(t.path)[0]
    if (l !== layer) {
      lines.push(`${layer ? '\n' : ''}  /* ${l} */`)
      layer = l
    }
    lines.push(`  ${cssVar(t.path)}: ${cssValue(t.type, t.value)};`)
  }
  lines.push('}', '')
  return lines.join('\n')
}

/* ---------- 4. theme.css ---------- */

// Variables y clases que ya trae Tailwind: ninguna de las nuestras puede llamarse igual.
const tailwindTheme = readFileSync(join(root, 'node_modules/tailwindcss/theme.css'), 'utf8')
const tailwindVars = new Set([...tailwindTheme.matchAll(/(--[a-z0-9-]+):/g)].map((m) => m[1]))

function buildThemeCss() {
  const theme = []
  const utilities = []
  const typographyDone = new Set()
  for (const t of all) {
    const s = segments(t.path)
    if (s[0] === 'primitive') continue
    if (s[0] === 'semantic' && s[1] === 'typography') {
      if (typographyDone.has(s[2])) continue
      typographyDone.add(s[2])
      theme.push(...typographyStyle(s[2]).theme)
      continue
    }
    const tw = tailwindFor(t.path, t.type)
    theme.push(...tw.theme)
    if (tw.utility) utilities.push(...tw.utility)
  }
  const clash = theme.map(([v]) => v).filter((v) => tailwindVars.has(v))
  if (clash.length) throw new Error(`Estas variables chocan con las de Tailwind: ${clash.join(', ')}`)
  const names = theme.map(([v]) => v)
  const dup = names.filter((v, i) => names.indexOf(v) !== i)
  if (dup.length) throw new Error(`Variables repetidas: ${dup.join(', ')}`)

  return [
    `/* ${HEADER} */`,
    '',
    '/*',
    '  Convierte los tokens semantic y component en clases de Tailwind.',
    '  "inline" hace que cada clase use directamente la variable de tokens.css.',
    '  Solo se añaden nombres nuevos: las escalas de Tailwind (gray-500, p-4, text-sm…) no cambian.',
    '*/',
    '@theme inline {',
    ...theme.map(([k, v]) => `  ${k}: ${v};`),
    '}',
    '',
    '/* Grosores de borde y separación del foco: Tailwind no tiene variables de tema para ellos. */',
    ...utilities.map(([name, css]) => `@utility ${name} {\n  ${css}\n}`),
    '',
  ].join('\n')
}

/* ---------- 5. docs/tokens.md ---------- */

function buildDocs() {
  const row = (t) => {
    const alias = isAlias(t.value) ? `\`${segments(aliasPath(t.value)).slice(1).join('.')}\`` : ''
    const name = segments(t.path).slice(1).join('.')
    const cls = classFor(t.path, t.type)
    return `| \`${name}\` | ${alias} | ${cls ? cls.split(' · ').map((c) => `\`${c}\``).join(' · ') : ''} | \`${cssVar(t.path)}\` | ${t.description} |`
  }
  const table = (layer, title, intro) => [
    `## ${title}`,
    '',
    intro,
    '',
    '| Token | Apunta a | Clase de Tailwind | Variable CSS | Para qué sirve |',
    '|---|---|---|---|---|',
    ...all.filter((t) => segments(t.path)[0] === layer).map(row),
    '',
  ]
  return [
    '# Tokens → clases de Tailwind',
    '',
    `> ${HEADER}`,
    '',
    'Cada token semantic y component tiene una **clase de Tailwind** con su nombre. Se usan en los componentes en lugar de los valores de Tailwind (`bg-blue-700`, `p-4`, `rounded-lg`…).',
    '',
    '- **Clase de Tailwind:** lo que se escribe en `className`. Los colores también funcionan con otras utilidades (`bg-`, `text-`, `border-`…) y los espaciados con cualquier utilidad de espacio (`p-`, `m-`, `gap-`…).',
    '- **Variable CSS:** el valor real, definido en `src/styles/tokens.css`.',
    '- **Los estilos de texto** (`typography.*`) se usan con una sola clase que aplica tamaño, interlineado y peso a la vez: `text-heading`.',
    '- **Los primitivos no tienen clase:** solo los usan los semánticos (ADR-001).',
    '',
    ...table('semantic', 'Semánticos', 'Para pantallas y para definir los tokens de componente.'),
    ...table('component', 'De componente', 'Solo para su componente.'),
  ].join('\n')
}

/* ---------- 6. Escribir o comprobar ---------- */

const outputs = [
  ['src/styles/tokens.css', buildTokensCss()],
  ['src/styles/theme.css', buildThemeCss()],
  ['docs/tokens.md', buildDocs()],
]

let outdated = 0
for (const [file, content] of outputs) {
  const full = join(root, file)
  const current = existsSync(full) ? readFileSync(full, 'utf8') : null
  if (check) {
    if (current !== content) {
      outdated++
      console.error(`✗ ${file} no está al día`)
    } else console.log(`✓ ${file}`)
  } else if (current !== content) {
    writeFileSync(full, content)
    console.log(`✎ ${file} actualizado`)
  } else console.log(`✓ ${file} sin cambios`)
}

if (check && outdated) {
  console.error('\nEjecuta `npm run tokens` y sube los archivos generados.')
  process.exit(1)
}
console.log(`\n${all.length} tokens (${all.filter((t) => t.path.startsWith('semantic')).length} semantic, ${all.filter((t) => t.path.startsWith('component')).length} component).`)
