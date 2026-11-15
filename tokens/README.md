# Cómo se construye un token en solaris-ds

Este es el manual para crear o cambiar un token. Si añades uno nuevo, sigue estas reglas. Así todos tendrán la misma estructura, y cualquiera, persona o agente, podrá encontrarlo y entenderlo.

> **Token:** un valor visual con nombre propio (un color, un espacio, un radio…) que se define una sola vez y se usa en todas partes. Si cambia el token, cambia todo lo que lo usa.

Todos los tokens viven en un único archivo, [`tokens.json`](./tokens.json), tal como decide el [ADR-001](../docs/adr/001-alcance.md). **Nunca se escribe un valor visual directamente en el código**: ni `#0e7c86`, ni `16px`, ni `bg-blue-700`.

---

## 1. Los tres niveles

Cada token pertenece a uno de estos tres niveles. Piensa en ellos como capas: cada una se apoya en la de abajo.

```
component   button.background.brand    ← para qué pieza
    │  alias
    ▼
semantic    color.background.brand     ← para qué sirve
    │  alias
    ▼
primitive   color.brand.700  =  #0e7c86       ← cómo es
```

| Nivel | Qué guarda | Su valor es… | Ejemplo | Quién lo usa |
|---|---|---|---|---|
| **primitive** | Los valores en bruto: la paleta, las escalas de medida, la tipografía. Dice **cómo es** | Un valor **literal** (un color, una medida, un número) | `primitive.color.brand.700` = #0e7c86 | Solo los tokens semantic |
| **semantic** | El valor con **significado**: para qué sirve en la interfaz | Un **alias** a un primitive | `semantic.color.background.brand` → `{primitive.color.brand.700}` | Los tokens component y, mientras no tengan los suyos, los componentes |
| **component** | El valor de una **pieza concreta** de un componente | Un **alias** a un semantic | `component.button.background.brand` → `{semantic.color.background.brand.$root}` | Solo su componente |

### La regla de oro: cada nivel solo apunta al de abajo

| Desde | Puede apuntar a | No puede apuntar a |
|---|---|---|
| **primitive** | Nada: tiene un valor literal | Ningún alias |
| **semantic** | Un **primitive** | Otro semantic (de lado), un component (hacia arriba) |
| **component** | Un **semantic** | Un primitive (se salta un nivel), otro component (de lado) |

**Por qué.** Si un componente apuntara directamente a `primitive.color.brand.700`, para cambiar el color de acción tendrías que buscarlo componente a componente. Si apunta a `semantic.color.background.brand`, lo cambias en un solo sitio.

**Solo los primitive tienen valores literales.** Si ves un hex o una medida en un token semantic o component, es un error.

> **Pendiente de decisión:** el ADR-001 habla de **dos niveles** (primitivo y semántico) y dice que los componentes usan los semánticos. El nivel **component** de este manual se formalizará en el **ADR-002**. Hasta entonces, este manual describe la estructura a la que vamos.

---

## 2. Cómo se nombra un token

Un nombre se escribe de lo general a lo concreto, con piezas separadas por puntos y siempre **en inglés y en minúsculas**. Las palabras compuestas se unen con guion: `line-height`, `font-size`.

### Primitive

`[category].[scale].[step]`. La escala solo existe en los colores.

| Ejemplo | Se lee |
|---|---|
| `color.gray.900` | color · escala gris · tono 900 |
| `color.brand.700` | color · escala de la marca · tono 700 |
| `spacing.400` | espaciado · paso 400 (16px) |
| `radius.full` | radio · completo (píldora) |

### Semantic de color: la fórmula

```
[category].[element].[role].[modifier].[state]
```

Las dos primeras piezas son obligatorias, y casi siempre también la tercera. **`modifier` y `state` son opcionales**: si no hacen falta, no se escriben. Cada pieza tiene una **lista cerrada** de valores; si necesitas uno nuevo, se propone en una PR y se añade aquí antes de usarlo.

| Pieza | Pregunta que responde | Valores permitidos |
|---|---|---|
| **category** | ¿Qué tipo de token es? | `color` |
| **element** | ¿Qué parte pinta? | `background` (fondo), `text` (texto), `border` (borde), `icon` (icono) |
| **role** | ¿Qué significa? | `neutral` (sin significado: la base de la interfaz), `brand` (marca y acción principal), `info`, `success`, `warning`, `danger` |
| **modifier** | ¿Qué intensidad tiene? | `subtle` (más suave), `strong` (más intenso), `inverted` (para usar sobre un fondo de color u oscuro, como `brand` o `danger`). Sin modifier = intensidad normal |
| **state** | ¿En qué estado de interacción? | `hover` (pasar el ratón), `active` (pulsando), `focus` (seleccionado con teclado), `disabled` (desactivado). Sin state = reposo |

Los roles `info`, `success`, `warning` y `danger` son los mismos valores que la prop `tone` de los componentes (ADR-001). Así, `tone="danger"` usará los tokens `…danger…`.

**Ejemplos:**

| Nombre | Se lee | Apunta a |
|---|---|---|
| `color.background.neutral` | fondo · neutro | `{primitive.color.gray.50}` |
| `color.text.neutral` | texto · neutro | `{primitive.color.gray.900}` |
| `color.text.neutral.subtle` | texto · neutro · suave | `{primitive.color.gray.600}` |
| `color.border.neutral` | borde · neutro | `{primitive.color.gray.300}` |
| `color.background.brand` | fondo · marca (acción principal) | `{primitive.color.brand.700}` |
| `color.background.brand.hover` | fondo · marca · al pasar el ratón | `{primitive.color.brand.800}` |
| `color.text.danger` | texto · peligro | `{primitive.color.red.700}` |
| `color.text.success` | texto · éxito | `{primitive.color.green.800}` |
| `color.text.brand.inverted` | texto · marca · sobre el fondo brand | `{primitive.color.gray.50}` |

> Todos estos tokens existen en `tokens.json` (capa `semantic`), y la columna "Apunta a" muestra su alias real. La página **Fundamentos → Semánticos** de Storybook los enseña con su contraste.

### Component

**Mismo orden que los semánticos, con el componente delante** y sin la categoría `color`:

```
[component].[element].[role].[modifier].[state]
```

- **element** y **role** son los mismos que en los semánticos: `button.background.brand` es el fondo de marca del botón (su variante primary).
- **Lo que no depende de la variante** lleva directamente el estado: `button.background.disabled`.
- **Las piezas sin color** usan el nombre de la propiedad: `padding-x`, `padding-y`, `gap`, `radius`, `border-width`, `font-size`, `line-height`, `font-weight`, `elevation`.
- **Si una pieza cambia con el tamaño** del componente, la talla va al final: `button.padding-x.sm`.
- **Si una pieza es una parte interna** del componente, la parte va después del componente: `card.title.font-size`, `input.label.text`.

| Nombre | Se lee | Apunta a |
|---|---|---|
| `button.background.brand` | botón · fondo · marca (variante primary) | `{semantic.color.background.brand.$root}` |
| `button.background.brand.hover` | botón · fondo · marca · al pasar el ratón | `{semantic.color.background.brand.hover}` |
| `button.icon.brand.inverted` | botón · icono · sobre fondo de marca | `{semantic.color.icon.brand.inverted}` |
| `button.padding-x.md` | botón · relleno horizontal · talla md | `{semantic.space.lg}` |
| `button.radius` | botón · esquinas | `{semantic.radius.full}` |
| `input.border.danger` | campo · borde · con error | `{semantic.color.border.danger}` |
| `card.elevation` | tarjeta · sombra | `{semantic.elevation.sm}` |

Todos los tokens de componente están en `tokens.json` (capa `component`) y se ven en Storybook, en **Fundamentos → Semánticos → Tokens de componente**.

---

## 3. El formato DTCG

`tokens.json` sigue el formato del **W3C Design Tokens Community Group (DTCG)**, el estándar que leen herramientas como Figma, Tokens Studio o Style Dictionary.

### Las reglas

1. **Cada token lleva `$value` y `$description`.**
   - `$value`: el valor (literal en primitive, alias en semantic y component).
   - `$description`: para qué sirve, en una frase en español. Es lo que lee una persona o un agente para saber si es el token correcto.
2. **El `$type` va en el grupo**, no en cada token. Todos los tokens de dentro lo heredan. Tipos que usamos: `color`, `dimension`, `fontFamily`, `fontWeight` y `shadow`.
   - **Excepción:** si un grupo mezcla tipos, el `$type` va en cada token. Pasa en los estilos de texto (`semantic.typography.body`), que juntan un tamaño (`dimension`), un interlineado (`dimension`) y un peso (`fontWeight`).
3. **Los alias se escriben entre llaves con la ruta completa del token**: `{primitive.color.gray.900}`. La ruta empieza siempre por el nivel (`primitive`, `semantic` o `component`).
4. **Los nombres de grupo y de token no pueden empezar por `$`** ni contener `{`, `}` o `.`. El punto solo separa niveles en la ruta.
5. **Un token no puede tener otros tokens dentro.** Cuando un nombre es a la vez un token y el comienzo de otros (`color.background.neutral` y `color.background.neutral.subtle`), el valor principal va en un token llamado **`$root`** dentro del grupo. Es la solución oficial de DTCG:

   ```json
   "neutral": {
     "$root":  { "$value": "{primitive.color.gray.50}",  "$description": "Fondo principal de la app." },
     "subtle": { "$value": "{primitive.color.gray.100}", "$description": "Fondo de zonas secundarias." }
   }
   ```

   El token se sigue llamando `color.background.neutral`; `$root` solo dice dónde se guarda su valor. **Para apuntar a él con un alias se escribe `$root` explícitamente**: `{semantic.color.background.neutral.$root}`.
6. **Las sombras se montan con piezas.** Un token de `$type` `shadow` tiene como `$value` un objeto con `color`, `offsetX`, `offsetY`, `blur` y `spread`, y cada pieza es un alias a `primitive.shadow`.

### Cómo se ve cada nivel en el archivo

```json
{
  "primitive": {
    "color": {
      "$type": "color",
      "brand": {
        "700": {
          "$value": { "colorSpace": "oklch", "components": [0.5362, 0.0888, 205.032], "hex": "#0e7c86" },
          "$description": "Color principal de la marca (#0E7C86)."
        }
      }
    }
  },
  "semantic": {
    "color": {
      "$type": "color",
      "background": {
        "brand": {
          "$root": {
            "$value": "{primitive.color.brand.700}",
            "$description": "Fondo de la acción principal, como el botón primary."
          },
          "hover": {
            "$value": "{primitive.color.brand.800}",
            "$description": "Fondo de la acción principal al pasar el ratón."
          }
        }
      }
    }
  },
  "component": {
    "button": {
      "background": {
        "$type": "color",
        "brand": {
          "$root": {
            "$value": "{semantic.color.background.brand.$root}",
            "$description": "Fondo del botón primary."
          },
          "hover": {
            "$value": "{semantic.color.background.brand.hover}",
            "$description": "Fondo del botón primary al pasar el ratón."
          }
        }
      }
    }
  }
}
```

### Formato de los valores literales (solo primitive)

| `$type` | Formato de `$value` | Ejemplo |
|---|---|---|
| `color` | Objeto con espacio de color, componentes y hex | `{ "colorSpace": "oklch", "components": [0.5362, 0.0888, 205.032], "hex": "#0e7c86" }` |
| `dimension` | Objeto con número y unidad (`px` o `rem`) | `{ "value": 0.25, "unit": "rem" }` |
| `fontFamily` | Lista de familias, de la preferida al respaldo | `["Atkinson Hyperlegible Next", "-apple-system", "sans-serif"]` |
| `fontWeight` | Número | `600` |

### Estado actual de `tokens.json`

| Nivel | Estado |
|---|---|
| **primitive** | ✅ Dentro del grupo `primitive`. La mayoría de tokens tiene la explicación en su grupo y no una `$description` propia; se añadirá token a token |
| **semantic** | ✅ Dentro del grupo `semantic`: color, tipografía, espaciado (`space`), radio, grosor de borde y elevación. Todos son alias a primitivos y tienen su `$description` |
| **component** | ✅ Dentro del grupo `component`: Button, Input, Card y Badge. Todos son alias a semánticos y tienen su `$description`. Su existencia como nivel está pendiente de formalizar en el ADR-002 |

---

## 4. De tokens.json al código

`tokens.json` no lo lee el navegador. Para usar los tokens hay que **generar** los archivos CSS:

```bash
npm run tokens
```

| Archivo generado | Qué es |
|---|---|
| `src/styles/tokens.css` | Una variable CSS por token: `--semantic-color-background-brand`, `--component-button-radius`… |
| `src/styles/theme.css` | Convierte los tokens semantic y component en **clases de Tailwind**: `bg-background-brand`, `p-space-md`, `bg-button-background-brand`… |
| `docs/tokens.md` | La tabla de cada token con su clase de Tailwind |

**Después de cambiar `tokens.json`, ejecuta siempre `npm run tokens`** y sube los archivos generados en la misma PR. Para comprobar que están al día sin escribir nada: `npm run tokens -- --check`.

**Cómo se forma la clase:** la utilidad de Tailwind + el nombre del token sin el nivel. En los semánticos de color se quita también `color`:

| Token | Clase |
|---|---|
| `semantic.color.background.brand` | `bg-background-brand` |
| `semantic.color.icon.neutral` | `text-icon-neutral` |
| `semantic.space.md` | `p-space-md`, `gap-space-md`, `m-space-md`… |
| `semantic.radius.md` | `rounded-radius-md` |
| `semantic.border-width.default` | `border-width-default` |
| `semantic.elevation.md` | `shadow-elevation-md` |
| `semantic.typography.heading` | `text-heading` (tamaño, interlineado y peso a la vez) |
| `component.button.background.brand` | `bg-button-background-brand` |
| `component.button.padding-x.md` | `px-button-padding-x-md` |

Ninguna clase se llama igual que una de Tailwind, y las escalas de Tailwind no cambian: `bg-gray-500` o `p-4` siguen existiendo, pero **en los componentes solo se usan las clases de los tokens**.

---

## 5. Lista de comprobación antes de abrir la PR

Repasa cada token nuevo o cambiado:

- [ ] **Nivel correcto:** literal → `primitive`; con significado → `semantic`; de una pieza de componente → `component`.
- [ ] **Apunta solo al nivel de abajo:** un semantic apunta a un primitive; un component, a un semantic. Nada de saltos, ni de lado ni hacia arriba.
- [ ] **Solo los primitive tienen valores literales.**
- [ ] **El nombre sigue la fórmula** de su nivel, en inglés, en minúsculas, y con valores de la lista cerrada (`element`, `role`, `modifier`, `state`, `variant`).
- [ ] **Tiene `$value` y `$description`**, y la descripción dice para qué sirve.
- [ ] **El `$type` está en su grupo.**
- [ ] **Los alias usan llaves y la ruta completa**, empezando por el nivel: `{primitive.color.gray.900}`.
- [ ] **El alias existe:** la ruta apunta a un token real de `tokens.json`.
- [ ] **No duplica otro token:** si ya existe uno con el mismo significado, se usa ese.
- [ ] **Has ejecutado `npm run tokens`** y subes los archivos generados.
- [ ] **Contraste:** si es un color de texto o de borde, cumple WCAG 2.2 AA con su fondo (4,5:1 en texto, 3:1 en bordes e iconos), como pide el ADR-001.
