#!/usr/bin/env node
// Comprueba el contraste de los colores semánticos (docs/accesibilidad.md, regla 1).
//
// Lee las reglas de tokens/contrast-pairs.json, genera todas las parejas
// (color de delante × fondo), calcula el contraste de cada una con los valores
// reales de tokens/tokens.json y lo guarda en docs/contraste.md.
//
// Uso: npm run contrast

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'))
const config = JSON.parse(readFileSync(join(root, 'tokens/contrast-pairs.json'), 'utf8'))

/* ---------- Tokens semánticos de color ---------- */

/** Lista los tokens de un grupo con su nombre legible (sin "$root"). */
function collect(node, path, out = []) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$') && key !== '$root') continue
    const name = key === '$root' ? path : `${path}.${key}`
    if (child.$value !== undefined) out.push(name)
    else collect(child, name, out)
  }
  return out
}

const semanticColors = collect(tokens.semantic.color, 'color')

/** Busca un token por su ruta, resolviendo "$root". */
function tokenAt(path) {
  let n = tokens
  for (const k of path.split('.')) {
    n = n?.[k]
    if (n === undefined) throw new Error(`No existe el token ${path}`)
  }
  return n.$value !== undefined ? n : n.$root
}

/** Sigue los alias hasta el color real y devuelve su hex y el primitivo final. */
function resolveColor(path) {
  let current = `semantic.${path}`
  let token = tokenAt(current)
  while (typeof token.$value === 'string') {
    current = token.$value.slice(1, -1).replace(/\.\$root$/, '')
    token = tokenAt(current)
  }
  return { hex: token.$value.hex, primitive: current.replace(/^primitive\./, '') }
}

/* ---------- Contraste WCAG ---------- */

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/* ---------- Generar las parejas a partir de las reglas ---------- */

const isInverted = (name) => name.endsWith('.inverted')

function selectForeground({ prefix, inverted, exclude = [] }) {
  return semanticColors.filter(
    (name) => name.startsWith(`${prefix}.`) && isInverted(name) === inverted && !exclude.includes(name),
  )
}

const groups = config.groups
for (const [id, group] of Object.entries(groups)) {
  for (const t of group.tokens) {
    if (!semanticColors.includes(t)) throw new Error(`El grupo "${id}" incluye ${t}, que no existe en tokens.json`)
  }
}

const results = config.rules.map((rule) => {
  const pairs = rule.apply.flatMap(({ foreground, backgrounds }) => {
    const group = groups[backgrounds]
    if (!group) throw new Error(`La regla "${rule.id}" usa el grupo "${backgrounds}", que no existe`)
    return selectForeground(foreground).flatMap((fg) =>
      group.tokens.map((bg) => {
        const f = resolveColor(fg)
        const b = resolveColor(bg)
        const ratio = contrast(f.hex, b.hex)
        return { fg, bg, f, b, ratio, pass: ratio >= rule.min }
      }),
    )
  })
  return { rule, pairs }
})

/* ---------- docs/contraste.md ---------- */

const fmt = (n) => n.toFixed(2).replace('.', ',')
const all = results.flatMap((r) => r.pairs)
const failing = results.flatMap((r) => r.pairs.filter((p) => !p.pass).map((p) => ({ ...p, rule: r.rule })))

const lines = [
  '# Contraste de los colores semánticos',
  '',
  '> Archivo generado por `npm run contrast` a partir de `tokens/contrast-pairs.json` y `tokens/tokens.json`. No lo edites a mano.',
  '',
  'Comprueba la regla 1 de [`docs/accesibilidad.md`](./accesibilidad.md): **texto 4,5:1** e **iconos y bordes de campos y de foco 3:1**.',
  '',
  'Las parejas no se escriben a mano: salen de **reglas por grupos**. Un token de texto, icono o borde nuevo entra solo en su regla por su nombre, y un fondo nuevo solo hay que añadirlo a su grupo en `tokens/contrast-pairs.json`.',
  '',
  '## Resumen',
  '',
  `- **${all.length} parejas** comprobadas.`,
  `- ✅ **${all.length - failing.length}** pasan.`,
  `- ${failing.length ? '❌' : '✅'} **${failing.length}** no pasan.`,
  '',
  '| Regla | Tipo | Mínimo | Parejas | No pasan |',
  '|---|---|---|---|---|',
  ...results.map(
    ({ rule, pairs }) =>
      `| \`${rule.id}\` | ${rule.kind === 'text' ? 'Texto' : 'Interfaz (iconos y bordes)'} | ${fmt(rule.min)}:1 | ${pairs.length} | ${pairs.filter((p) => !p.pass).length} |`,
  ),
  '',
  '## Grupos de fondos',
  '',
  ...Object.entries(groups).flatMap(([id, g]) => [`- **${id}**: ${g.$description} ${g.tokens.map((t) => `\`${t}\``).join(', ')}.`]),
  '',
]

if (failing.length) {
  lines.push(
    '## ❌ Parejas que no pasan',
    '',
    '| Delante | Fondo | Contraste | Mínimo | Regla |',
    '|---|---|---|---|---|',
    ...failing.map(
      (p) =>
        `| \`${p.fg}\` (${p.f.primitive}) | \`${p.bg}\` (${p.b.primitive}) | **${fmt(p.ratio)}:1** | ${fmt(p.rule.min)}:1 | \`${p.rule.id}\` |`,
    ),
    '',
  )
}

for (const { rule, pairs } of results) {
  lines.push(
    `## \`${rule.id}\``,
    '',
    `${rule.$description} Tipo **${rule.kind}**, mínimo **${fmt(rule.min)}:1**.`,
    '',
    '| Delante | Fondo | Contraste | |',
    '|---|---|---|---|',
    ...pairs.map(
      (p) =>
        `| \`${p.fg}\` · ${p.f.hex} | \`${p.bg}\` · ${p.b.hex} | ${fmt(p.ratio)}:1 | ${p.pass ? '✅' : '❌'} |`,
    ),
    '',
  )
}

writeFileSync(join(root, 'docs/contraste.md'), lines.join('\n'))

console.log(`${all.length} parejas · ✅ ${all.length - failing.length} pasan · ❌ ${failing.length} no pasan`)
for (const p of failing) console.log(`  ❌ ${p.fg} sobre ${p.bg}: ${fmt(p.ratio)}:1 (mínimo ${fmt(p.rule.min)}:1)`)
console.log('Resultado en docs/contraste.md')
