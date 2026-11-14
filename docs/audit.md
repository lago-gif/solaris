# Auditoría del design system

Revisión de `src/components/` (Button, Input, Card y Badge) sobre `main` en el commit `f38096a`.

**Punto de partida:** solaris-ds todavía no tiene tokens propios. El bloque `@theme` de `src/index.css` está vacío, así que **todos los valores visuales son clases por defecto de Tailwind o números escritos dentro de los componentes**.

---

## 1. Inventario de componentes

| Componente | Archivo | Variantes | Tamaños | Estados | Icono |
|---|---|---|---|---|---|
| **Button** | `src/components/Button.tsx` | `variant`: `primary` (por defecto), `secondary`, `ghost`, `danger` | `size`: `sm`, `md` (por defecto), `lg` → 32 / 40 / 48 px de alto | hover, active, focus-visible, disabled | Opcional (`icon`), a la izquierda o a la derecha (`iconPosition`) |
| **Input** | `src/components/Input.tsx` | Sin prop de variante. Cambia de aspecto con `error` | Uno solo: 40 px de alto | focus-visible, disabled, error, obligatorio (`required`) | Opcional (`icon`), siempre a la izquierda. Icono fijo `IconAlertCircle` en el error |
| **Card** | `src/components/Card.tsx` | Sin prop de variante. Las zonas son opcionales: cabecera (`title`, `description`, `icon`), contenido (`children`) y pie (`footer`) | Uno solo | Ninguno (no es interactiva) | Opcional (`icon`), dentro de un cuadrado de 40 px |
| **Badge** | `src/components/Badge.tsx` | `tone`: `neutral` (por defecto), `info`, `success`, `warning`, `danger` | `size`: `sm`, `md` (por defecto) | Ninguno (no es interactivo) | Opcional (`icon`), a la izquierda |

Otras props comunes:
- **Button:** `fullWidth` (ancho completo). `type` vale `"button"` por defecto.
- **Todos** aceptan `className` y los atributos HTML de su elemento (`button`, `input`, `article` o `span`).

---

## 2. Valores de Tailwind que usa cada componente

### Button

| Tipo | Valores |
|---|---|
| **Color** | `primary`: `bg-blue-700`, `hover:bg-blue-800`, `active:bg-blue-900`, `text-white` · `secondary`: `bg-white`, `border-gray-300`, `text-gray-900`, `hover:bg-gray-50`, `active:bg-gray-100` · `ghost`: `bg-transparent`, `text-blue-700`, `hover:bg-blue-50`, `active:bg-blue-100` · `danger`: `bg-red-700`, `hover:bg-red-800`, `active:bg-red-900`, `text-white` · foco: `outline-blue-600` |
| **Espaciado** | `sm`: `h-8`, `px-3`, `gap-1.5` · `md`: `h-10`, `px-4`, `gap-2` · `lg`: `h-12`, `px-6`, `gap-2` · foco: `outline-offset-2` |
| **Radio** | `rounded-full` |
| **Texto** | `text-sm` / `text-base` / `text-lg` según tamaño · `font-medium` |
| **Otros** | `outline-2`, `border` (1 px, solo `secondary`), `disabled:opacity-50` |

### Input

| Tipo | Valores |
|---|---|
| **Color** | Etiqueta: `text-gray-900` · asterisco: `text-red-700` · campo: `bg-white`, `text-gray-900`, `placeholder:text-gray-500`, `border-gray-500` · error: `border-red-700`, `text-red-700` · ayuda: `text-gray-600` · icono: `text-gray-500` · desactivado: `bg-gray-100`, `text-gray-500` · foco: `outline-blue-600` |
| **Espaciado** | Contenedor: `gap-1.5` · campo: `h-10`, `px-3`, `pl-10` (con icono) · icono: `left-3` · mensaje de error: `gap-1.5` · foco: `outline-offset-0` |
| **Radio** | `rounded-lg` |
| **Texto** | Etiqueta: `text-sm font-medium` · campo: `text-base` · ayuda y error: `text-sm` |
| **Otros** | `border` (1 px), `outline-2` |

### Card

| Tipo | Valores |
|---|---|
| **Color** | `bg-white`, `border-gray-200`, `text-gray-900` · caja del icono: `bg-blue-50`, `text-blue-700` · descripción: `text-gray-600` · línea del pie: `border-gray-100` |
| **Espaciado** | Tarjeta: `p-5`, `gap-4` · cabecera: `gap-3` · título y descripción: `gap-0.5` · caja del icono: `size-10` · pie: `pt-4`, `gap-2` |
| **Radio** | Tarjeta: `rounded-xl` · caja del icono: `rounded-lg` |
| **Texto** | Título: `text-lg font-semibold` · descripción: `text-sm` · contenido: `text-base` |
| **Otros** | `shadow-sm`, `border` (1 px), `border-t` en el pie |

### Badge

| Tipo | Valores |
|---|---|
| **Color** | `neutral`: `bg-gray-100`, `text-gray-800`, `ring-gray-300` · `info`: `bg-blue-50`, `text-blue-800`, `ring-blue-200` · `success`: `bg-green-50`, `text-green-800`, `ring-green-200` · `warning`: `bg-amber-50`, `text-amber-800`, `ring-amber-200` · `danger`: `bg-red-50`, `text-red-800`, `ring-red-200` |
| **Espaciado** | `sm`: `px-2`, `py-0.5`, `gap-1` · `md`: `px-2.5`, `py-1`, `gap-1.5` |
| **Radio** | `rounded-md` |
| **Texto** | `text-xs` / `text-sm` según tamaño · `font-medium` |
| **Otros** | `ring-1 ring-inset` (borde interior de 1 px) |

### Resumen de lo que se usa entre todos

| Tipo | Valores distintos |
|---|---|
| **Familias de color** | `blue`, `red`, `green`, `amber`, `gray`, más `white` y `transparent` |
| **Tonos** | 50, 100, 200, 300, 500, 600, 700, 800, 900 |
| **Radios** | `rounded-md` (Badge), `rounded-lg` (Input, caja del icono de Card), `rounded-xl` (Card), `rounded-full` (Button) |
| **Tamaños de texto** | `text-xs`, `text-sm`, `text-base`, `text-lg` |
| **Alturas** | `h-8`, `h-10`, `h-12` (Button) · `h-10` (Input) |

---

## 3. Valores escritos a mano

**Colores hex, `px` o valores entre corchetes de Tailwind (`[...]`):** ninguno en los cuatro componentes.

**Números escritos a mano** (tamaño y grosor de los iconos de Tabler, en píxeles):

| Archivo | Línea | Valor | Qué es |
|---|---|---|---|
| `src/components/Button.tsx` | 33 | `{ sm: 16, md: 20, lg: 24 }` | Tamaño del icono según el tamaño del botón |
| `src/components/Button.tsx` | 46 | `stroke={2}` | Grosor del trazo del icono |
| `src/components/Input.tsx` | 39 | `size={20}` | Tamaño del icono del campo |
| `src/components/Input.tsx` | 40 | `stroke={1.75}` | Grosor del icono del campo |
| `src/components/Input.tsx` | 68 | `size={16} stroke={2}` | Icono del mensaje de error |
| `src/components/Card.tsx` | 29 | `size={22} stroke={1.75}` | Icono de la cabecera |
| `src/components/Badge.tsx` | 42 | `size === 'sm' ? 14 : 16`, `stroke={2}` | Tamaño y grosor del icono según el tamaño del badge |

> Hay **5 tamaños de icono distintos** (14, 16, 20, 22 y 24) y **2 grosores** (1.75 y 2), sin una regla común.

**Colores de la paleta de Tailwind escritos directamente**, sin pasar por un token con significado (como `primary` o `danger`):

| Archivo | Línea | Clases de color |
|---|---|---|
| `src/components/Button.tsx` | 21 | `bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900` |
| `src/components/Button.tsx` | 22 | `border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100` |
| `src/components/Button.tsx` | 23 | `bg-transparent text-blue-700 hover:bg-blue-50 active:bg-blue-100` |
| `src/components/Button.tsx` | 24 | `bg-red-700 text-white hover:bg-red-800 active:bg-red-900` |
| `src/components/Button.tsx` | 53 | `focus-visible:outline-blue-600` |
| `src/components/Input.tsx` | 26 | `text-gray-900` |
| `src/components/Input.tsx` | 29 | `text-red-700` |
| `src/components/Input.tsx` | 42 | `text-gray-500` |
| `src/components/Input.tsx` | 51 | `bg-white text-gray-900 placeholder:text-gray-500` |
| `src/components/Input.tsx` | 52 | `focus-visible:outline-blue-600` |
| `src/components/Input.tsx` | 53 | `disabled:bg-gray-100 disabled:text-gray-500` |
| `src/components/Input.tsx` | 55 | `border-red-700`, `border-gray-500` |
| `src/components/Input.tsx` | 62 | `text-gray-600` |
| `src/components/Input.tsx` | 67 | `text-red-700` |
| `src/components/Card.tsx` | 22 | `border-gray-200 bg-white text-gray-900` |
| `src/components/Card.tsx` | 28 | `bg-blue-50 text-blue-700` |
| `src/components/Card.tsx` | 34 | `text-gray-600` |
| `src/components/Card.tsx` | 41 | `border-gray-100` |
| `src/components/Badge.tsx` | 19 | `bg-gray-100 text-gray-800 ring-gray-300` |
| `src/components/Badge.tsx` | 20 | `bg-blue-50 text-blue-800 ring-blue-200` |
| `src/components/Badge.tsx` | 21 | `bg-green-50 text-green-800 ring-green-200` |
| `src/components/Badge.tsx` | 22 | `bg-amber-50 text-amber-800 ring-amber-200` |
| `src/components/Badge.tsx` | 23 | `bg-red-50 text-red-800 ring-red-200` |

**Mismo significado, distinto valor:**
- **Azul de acción:** `blue-700` en el fondo de Button, pero `blue-600` en el contorno de foco (Button e Input).
- **Rojo de error o peligro:** `red-700` en Button `danger` y en el error de Input, pero `red-800` en el texto del Badge `danger`.
- **Bordes grises:** `gray-300` (Button `secondary`, Badge `neutral`), `gray-500` (Input), `gray-200` (Card) y `gray-100` (pie de Card).
- **Texto secundario:** `gray-600` (ayuda de Input, descripción de Card) y `gray-500` (placeholder de Input).

---

## 4. Nombres que un agente no adivinaría

| Componente | Nombre real | Lo que un agente probablemente escribiría | Por qué confunde |
|---|---|---|---|
| Badge | **`tone`** | `variant`, `color`, `status` | Button usa `variant` para lo mismo: el estilo según el significado |
| Badge | `tone="neutral"` | `default`, `gray` | No existe `default` |
| Button | `variant="ghost"` | `tertiary`, `text`, `link` | Nombre de convención, no descriptivo |
| Button | No tiene `info`, `success` ni `warning` | `variant="success"` | Badge sí tiene esos valores, Button no |
| Button / Badge | **`danger`** | `error`, `destructive`, `critical` | El nombre es `danger`, pero en Input el estado se llama `error` |
| Input | **`error`** es un **texto**, no un sí/no | `error={true}`, `invalid`, `status="error"` | Para marcar el error hay que pasar el mensaje: `error="Escribe un correo válido"` |
| Input | **`hint`** | `helperText`, `description`, `help` | Card usa `description` para un texto parecido (texto secundario bajo un título) |
| Input | **`label` es obligatorio** | Omitirlo y usar solo `placeholder` | Sin `label` no compila |
| Input | No tiene `size` | `size="sm"` | Se quitó a propósito el atributo `size` de HTML. Solo hay un tamaño |
| Input | El icono va siempre a la izquierda | `iconPosition="right"` | Esa prop solo existe en Button |
| Card | **`title`** es el título visible | Usarlo como tooltip, que es lo que hace en HTML | Sustituye al atributo `title` de HTML |
| Card | **`footer`** recibe contenido libre | `actions`, `buttons` | Es una zona libre: hay que pasarle los botones ya montados |
| Card | Siempre pinta un `<article>` con título `<h3>` | `as="section"`, `headingLevel={2}` | No se puede cambiar la etiqueta ni el nivel del título |
| Todos | **`icon`** recibe **el componente**, no el elemento | `icon={<IconPlus />}` o `icon="plus"` | Se escribe `icon={IconPlus}`, sin `< />` |
| Button | **`iconPosition`**: `left` / `right` | `iconRight`, `trailingIcon`, `iconPosition="end"` | No existen `start` ni `end` |
| Button | **`fullWidth`** | `block`, `width="full"`, `className="w-full"` | `className` también funciona, pero no es la forma prevista |
| Button | **`type` vale `"button"` por defecto** | Suponer que envía el formulario | En un formulario hay que poner `type="submit"` |
| Badge | **`children` es obligatorio** | `<Badge tone="success" />` con solo color | No compila: el color nunca va solo |
| Button / Badge | Tamaños distintos: Button `sm`/`md`/`lg`, Badge solo `sm`/`md` | `<Badge size="lg">` | No existe `lg` en Badge |
| Todos | Exportaciones con nombre desde `src/components/index.ts` | `import Button from './components/Button'` | No hay exportación por defecto: se usa `import { Button } from './components'` |
| Todos | Valores en inglés, documentación en español | `variant="primario"` | Los valores de las props siempre van en inglés |
