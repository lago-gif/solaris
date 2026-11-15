# Cómo se construye un token en solaris-ds

Este es el manual para crear o cambiar un token. Si añades uno nuevo, sigue estas reglas. Así todos tendrán la misma estructura, y cualquiera, persona o agente, podrá encontrarlo y entenderlo.

> **Token:** un valor visual con nombre propio (un color, un espacio, un radio…) que se define una sola vez y se usa en todas partes. Si cambia el token, cambia todo lo que lo usa.

Todos los tokens viven en un único archivo, [`tokens.json`](./tokens.json), tal como decide el [ADR-001](../docs/adr/001-alcance.md). **Nunca se escribe un valor visual directamente en el código**: ni `#0e7c86`, ni `16px`, ni `bg-blue-700`.

---

## 1. Los tres niveles

Cada token pertenece a uno de estos tres niveles. Piensa en ellos como capas: cada una se apoya en la de abajo.

```
component   button.color.background.primary   ← para qué pieza
    │  alias
    ▼
semantic    color.background.brand.strong     ← para qué sirve
    │  alias
    ▼
primitive   color.brand.700  =  #0e7c86       ← cómo es
```

| Nivel | Qué guarda | Su valor es… | Ejemplo | Quién lo usa |
|---|---|---|---|---|
| **primitive** | Los valores en bruto: la paleta, las escalas de medida, la tipografía. Dice **cómo es** | Un valor **literal** (un color, una medida, un número) | `primitive.color.brand.700` = #0e7c86 | Solo los tokens semantic |
| **semantic** | El valor con **significado**: para qué sirve en la interfaz | Un **alias** a un primitive | `semantic.color.background.brand.strong` → `{primitive.color.brand.700}` | Los tokens component y, mientras no tengan los suyos, los componentes |
| **component** | El valor de una **pieza concreta** de un componente | Un **alias** a un semantic | `component.button.color.background.primary` → `{semantic.color.background.brand.strong}` | Solo su componente |

### La regla de oro: cada nivel solo apunta al de abajo

| Desde | Puede apuntar a | No puede apuntar a |
|---|---|---|
| **primitive** | Nada: tiene un valor literal | Ningún alias |
| **semantic** | Un **primitive** | Otro semantic (de lado), un component (hacia arriba) |
| **component** | Un **semantic** | Un primitive (se salta un nivel), otro component (de lado) |

**Por qué.** Si un componente apuntara directamente a `primitive.color.brand.700`, para cambiar el color de acción tendrías que buscarlo componente a componente. Si apunta a `semantic.color.background.brand.strong`, lo cambias en un solo sitio.

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
| **modifier** | ¿Qué intensidad tiene? | `subtle` (más suave), `strong` (más intenso), `inverse` (para usar sobre un fondo oscuro). Sin modifier = intensidad normal |
| **state** | ¿En qué estado de interacción? | `hover` (pasar el ratón), `active` (pulsando), `focus` (seleccionado con teclado), `disabled` (desactivado). Sin state = reposo |

Los roles `info`, `success`, `warning` y `danger` son los mismos valores que la prop `tone` de los componentes (ADR-001). Así, `tone="danger"` usará los tokens `…danger…`.

**Ejemplos:**

| Nombre | Se lee | Apuntaría a |
|---|---|---|
| `color.background.neutral` | fondo · neutro | `{primitive.color.gray.50}` |
| `color.text.neutral` | texto · neutro | `{primitive.color.gray.900}` |
| `color.text.neutral.subtle` | texto · neutro · suave | `{primitive.color.gray.600}` |
| `color.border.neutral` | borde · neutro | `{primitive.color.gray.300}` |
| `color.background.brand.strong` | fondo · marca · intenso | `{primitive.color.brand.700}` |
| `color.background.brand.strong.hover` | fondo · marca · intenso · al pasar el ratón | `{primitive.color.brand.800}` |
| `color.text.danger` | texto · peligro | `{primitive.color.red.700}` |
| `color.background.success.subtle` | fondo · éxito · suave | `{primitive.color.green.50}` |
| `color.text.neutral.inverse` | texto · neutro · sobre fondo oscuro | `{primitive.color.gray.50}` |

> Los valores de la columna "Apuntaría a" son ejemplos de cómo se construye un alias. Los valores definitivos se decidirán al crear los tokens semantic.

### Component

Va **delante el nombre del componente**, y en el lugar del `role` va **su `variant`** (los mismos valores que la prop del componente):

```
[component].[category].[element].[variant].[modifier].[state]
```

| Nombre | Se lee | Apunta a |
|---|---|---|
| `button.color.background.primary` | botón · fondo · variante primary | `{semantic.color.background.brand.strong}` |
| `button.color.background.primary.hover` | botón · fondo · primary · al pasar el ratón | `{semantic.color.background.brand.strong.hover}` |
| `button.color.background.danger` | botón · fondo · variante danger | `{semantic.color.background.danger.strong}` |
| `input.color.border.default` | campo · borde · estado normal | `{semantic.color.border.neutral}` |

---

## 3. El formato DTCG

`tokens.json` sigue el formato del **W3C Design Tokens Community Group (DTCG)**, el estándar que leen herramientas como Figma, Tokens Studio o Style Dictionary.

### Las reglas

1. **Cada token lleva `$value` y `$description`.**
   - `$value`: el valor (literal en primitive, alias en semantic y component).
   - `$description`: para qué sirve, en una frase en español. Es lo que lee una persona o un agente para saber si es el token correcto.
2. **El `$type` va en el grupo**, no en cada token. Todos los tokens de dentro lo heredan. Tipos que usamos: `color`, `dimension`, `fontFamily`, `fontWeight`.
3. **Los alias se escriben entre llaves con la ruta completa del token**: `{primitive.color.gray.900}`. La ruta empieza siempre por el nivel (`primitive`, `semantic` o `component`).
4. **Los nombres de grupo y de token no pueden empezar por `$`** ni contener `{`, `}` o `.`. El punto solo separa niveles en la ruta.

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
          "strong": {
            "$value": "{primitive.color.brand.700}",
            "$description": "Fondo de la acción principal, por ejemplo el botón primario."
          }
        }
      }
    }
  },
  "component": {
    "button": {
      "color": {
        "$type": "color",
        "background": {
          "primary": {
            "$value": "{semantic.color.background.brand.strong}",
            "$description": "Fondo del botón primary en reposo."
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

Hoy `tokens.json` solo tiene el nivel primitive, y todavía no sigue del todo este manual:
- **Los primitivos están en la raíz** (`color.gray.900`), no dentro de un grupo `primitive`. Se moverán a `primitive.…` cuando se añadan los niveles semantic y component.
- **La mayoría de tokens no tiene `$description` propia**: la explicación está en su grupo. Se añadirá token a token.

Cuando se cambie `tokens.json`, se aplicará este manual completo.

---

## 4. Lista de comprobación antes de abrir la PR

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
- [ ] **Contraste:** si es un color de texto o de borde, cumple WCAG 2.2 AA con su fondo (4,5:1 en texto, 3:1 en bordes e iconos), como pide el ADR-001.
