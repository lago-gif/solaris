# Tokens → clases de Tailwind

> Archivo generado por `npm run tokens` a partir de tokens/tokens.json. No lo edites a mano.

Cada token semantic y component tiene una **clase de Tailwind** con su nombre. Se usan en los componentes en lugar de los valores de Tailwind (`bg-blue-700`, `p-4`, `rounded-lg`…).

- **Clase de Tailwind:** lo que se escribe en `className`. Los colores también funcionan con otras utilidades (`bg-`, `text-`, `border-`…) y los espaciados con cualquier utilidad de espacio (`p-`, `m-`, `gap-`…).
- **Variable CSS:** el valor real, definido en `src/styles/tokens.css`.
- **Los estilos de texto** (`typography.*`) se usan con una sola clase que aplica tamaño, interlineado y peso a la vez: `text-heading`.
- **Los primitivos no tienen clase:** solo los usan los semánticos (ADR-001).
- **Anillo de foco doble:** `focus-ring-button`, `focus-ring-input`. Junta el color del foco, el anillo claro exterior y el grosor del componente (docs/accesibilidad.md, regla 2).

## Semánticos

Para pantallas y para definir los tokens de componente.

| Token | Apunta a | Clase de Tailwind | Variable CSS | Para qué sirve |
|---|---|---|---|---|
| `color.background.neutral` | `color.gray.50` | `bg-background-neutral` | `--semantic-color-background-neutral` | Fondo principal de la app y de las superficies. |
| `color.background.neutral.subtle` | `color.gray.100` | `bg-background-neutral-subtle` | `--semantic-color-background-neutral-subtle` | Fondo de zonas secundarias que se separan un poco del principal, como una barra lateral o una fila al pasar el ratón. |
| `color.background.neutral.strong` | `color.gray.200` | `bg-background-neutral-strong` | `--semantic-color-background-neutral-strong` | Fondo más marcado para separar bloques o elementos desactivados. |
| `color.background.neutral.inverted` | `color.gray.900` | `bg-background-neutral-inverted` | `--semantic-color-background-neutral-inverted` | Fondo oscuro, por ejemplo para un tooltip o un aviso flotante (toast). |
| `color.background.brand` | `color.brand.700` | `bg-background-brand` | `--semantic-color-background-brand` | Fondo de la acción principal, como el botón primary. Sobre él va el texto brand.inverted. |
| `color.background.brand.hover` | `color.brand.800` | `bg-background-brand-hover` | `--semantic-color-background-brand-hover` | Fondo de la acción principal al pasar el ratón. |
| `color.background.brand.subtle` | `color.brand.50` | `bg-background-brand-subtle` | `--semantic-color-background-brand-subtle` | Fondo suave de marca: hover del botón ghost y fondo de iconos destacados. |
| `color.background.danger` | `color.red.700` | `bg-background-danger` | `--semantic-color-background-danger` | Fondo de acciones de peligro o que borran, como el botón danger. Sobre él va el texto danger.inverted. |
| `color.background.danger.hover` | `color.red.800` | `bg-background-danger-hover` | `--semantic-color-background-danger-hover` | Fondo de acciones de peligro al pasar el ratón. |
| `color.background.danger.subtle` | `color.red.50` | `bg-background-danger-subtle` | `--semantic-color-background-danger-subtle` | Fondo suave de peligro, por ejemplo un badge o un aviso de error. |
| `color.background.success.subtle` | `color.green.50` | `bg-background-success-subtle` | `--semantic-color-background-success-subtle` | Fondo suave de éxito, por ejemplo un badge de "Tomada". |
| `color.background.warning.subtle` | `color.orange.50` | `bg-background-warning-subtle` | `--semantic-color-background-warning-subtle` | Fondo suave de aviso, por ejemplo un badge de "Pendiente". |
| `color.background.info.subtle` | `color.brand.50` | `bg-background-info-subtle` | `--semantic-color-background-info-subtle` | Fondo suave de información, por ejemplo un badge informativo. |
| `color.text.neutral` | `color.gray.900` | `text-text-neutral` | `--semantic-color-text-neutral` | Texto principal sobre fondos neutros. |
| `color.text.neutral.subtle` | `color.gray.600` | `text-text-neutral-subtle` | `--semantic-color-text-neutral-subtle` | Texto secundario: ayudas, descripciones y datos de menor importancia. |
| `color.text.brand` | `color.brand.800` | `text-text-brand` | `--semantic-color-text-brand` | Texto de marca sobre fondos neutros, como el botón ghost o un enlace. |
| `color.text.brand.inverted` | `color.gray.50` | `text-text-brand-inverted` | `--semantic-color-text-brand-inverted` | Texto sobre el fondo brand, por ejemplo en el botón primary. |
| `color.text.danger` | `color.red.700` | `text-text-danger` | `--semantic-color-text-danger` | Texto de error o peligro sobre fondos neutros, como el mensaje de error de un campo. |
| `color.text.danger.inverted` | `color.gray.50` | `text-text-danger-inverted` | `--semantic-color-text-danger-inverted` | Texto sobre el fondo danger, por ejemplo en el botón danger. |
| `color.text.success` | `color.green.800` | `text-text-success` | `--semantic-color-text-success` | Texto de éxito o confirmación, como "Medicación tomada". |
| `color.text.info` | `color.brand.800` | `text-text-info` | `--semantic-color-text-info` | Texto informativo sobre fondos neutros o sobre background.info.subtle. |
| `color.text.warning` | `color.orange.800` | `text-text-warning` | `--semantic-color-text-warning` | Texto de aviso sobre fondos neutros o sobre background.warning.subtle. |
| `color.icon.neutral` | `color.gray.900` | `text-icon-neutral` | `--semantic-color-icon-neutral` | Icono principal sobre fondos neutros. |
| `color.icon.neutral.subtle` | `color.gray.600` | `text-icon-neutral-subtle` | `--semantic-color-icon-neutral-subtle` | Icono secundario: ayudas, descripciones y datos de menor importancia. |
| `color.icon.brand` | `color.brand.700` | `text-icon-brand` | `--semantic-color-icon-brand` | Icono de marca sobre fondos neutros, como en el botón ghost. |
| `color.icon.brand.inverted` | `color.gray.50` | `text-icon-brand-inverted` | `--semantic-color-icon-brand-inverted` | Icono sobre el fondo brand, por ejemplo en el botón primary. |
| `color.icon.danger` | `color.red.700` | `text-icon-danger` | `--semantic-color-icon-danger` | Icono de error o peligro sobre fondos neutros, como el mensaje de error de un campo. |
| `color.icon.danger.inverted` | `color.gray.50` | `text-icon-danger-inverted` | `--semantic-color-icon-danger-inverted` | Icono sobre el fondo danger, por ejemplo en el botón danger. |
| `color.icon.success` | `color.green.700` | `text-icon-success` | `--semantic-color-icon-success` | Icono de éxito o confirmación, como "Medicación tomada". |
| `color.icon.info` | `color.brand.700` | `text-icon-info` | `--semantic-color-icon-info` | Icono informativo. |
| `color.icon.warning` | `color.orange.700` | `text-icon-warning` | `--semantic-color-icon-warning` | Icono de aviso. |
| `color.border.neutral` | `color.gray.300` | `border-border-neutral` | `--semantic-color-border-neutral` | Borde decorativo y separadores. No sirve para delimitar campos: no llega a 3:1 de contraste. |
| `color.border.neutral.strong` | `color.gray.500` | `border-border-neutral-strong` | `--semantic-color-border-neutral-strong` | Borde que delimita elementos con los que se interactúa, como un campo de texto (contraste de 3:1 o más). |
| `color.border.focus` | `color.brand.700` | `outline-border-focus` | `--semantic-color-border-focus` | Contorno de foco al navegar con el teclado. |
| `color.border.focus.inverted` | `color.gray.50` | `outline-border-focus-inverted` | `--semantic-color-border-focus-inverted` | Anillo exterior claro del foco. Rodea a color.border.focus para que el foco pase 3:1 sobre cualquier fondo, también oscuro o de color. |
| `color.border.danger` | `color.red.700` | `border-border-danger` | `--semantic-color-border-danger` | Borde de un campo con error. |
| `typography.display.font-size` | `font-size.5xl` | `text-display` | `--semantic-typography-display-font-size` | Tamaño del estilo display. |
| `typography.display.line-height` | `line-height.1200` | `text-display` | `--semantic-typography-display-line-height` | Interlineado del estilo display. |
| `typography.display.font-weight` | `font-weight.700` | `text-display` | `--semantic-typography-display-font-weight` | Peso del estilo display. |
| `typography.heading.font-size` | `font-size.3xl` | `text-heading` | `--semantic-typography-heading-font-size` | Tamaño del estilo heading. |
| `typography.heading.line-height` | `line-height.900` | `text-heading` | `--semantic-typography-heading-line-height` | Interlineado del estilo heading. |
| `typography.heading.font-weight` | `font-weight.600` | `text-heading` | `--semantic-typography-heading-font-weight` | Peso del estilo heading. |
| `typography.title.font-size` | `font-size.xl` | `text-title` | `--semantic-typography-title-font-size` | Tamaño del estilo title. |
| `typography.title.line-height` | `line-height.700` | `text-title` | `--semantic-typography-title-line-height` | Interlineado del estilo title. |
| `typography.title.font-weight` | `font-weight.600` | `text-title` | `--semantic-typography-title-font-weight` | Peso del estilo title. |
| `typography.body.font-size` | `font-size.base` | `text-body` | `--semantic-typography-body-font-size` | Tamaño del estilo body. |
| `typography.body.line-height` | `line-height.600` | `text-body` | `--semantic-typography-body-line-height` | Interlineado del estilo body. |
| `typography.body.font-weight` | `font-weight.400` | `text-body` | `--semantic-typography-body-font-weight` | Peso del estilo body. |
| `typography.label.font-size` | `font-size.sm` | `text-label` | `--semantic-typography-label-font-size` | Tamaño del estilo label. |
| `typography.label.line-height` | `line-height.500` | `text-label` | `--semantic-typography-label-line-height` | Interlineado del estilo label. |
| `typography.label.font-weight` | `font-weight.500` | `text-label` | `--semantic-typography-label-font-weight` | Peso del estilo label. |
| `typography.caption.font-size` | `font-size.xs` | `text-caption` | `--semantic-typography-caption-font-size` | Tamaño del estilo caption. |
| `typography.caption.line-height` | `line-height.400` | `text-caption` | `--semantic-typography-caption-line-height` | Interlineado del estilo caption. |
| `typography.caption.font-weight` | `font-weight.400` | `text-caption` | `--semantic-typography-caption-font-weight` | Peso del estilo caption. |
| `space.none` | `spacing.0` | `p-space-none` | `--semantic-space-none` | Sin espacio. |
| `space.2xs` | `spacing.050` | `p-space-2xs` | `--semantic-space-2xs` | Mínimo: separa piezas que van pegadas, como un icono de su texto en un badge. |
| `space.xs` | `spacing.100` | `p-space-xs` | `--semantic-space-xs` | Muy pequeño: dentro de componentes compactos. |
| `space.sm` | `spacing.200` | `p-space-sm` | `--semantic-space-sm` | Pequeño: entre un icono y su texto, o dentro de un botón. |
| `space.md` | `spacing.300` | `p-space-md` | `--semantic-space-md` | Medio: entre elementos relacionados. |
| `space.lg` | `spacing.400` | `p-space-lg` | `--semantic-space-lg` | Grande: relleno de tarjetas y separación entre bloques. |
| `space.xl` | `spacing.600` | `p-space-xl` | `--semantic-space-xl` | Muy grande: entre secciones de una pantalla. |
| `space.2xl` | `spacing.800` | `p-space-2xl` | `--semantic-space-2xl` | Separación amplia entre grupos. |
| `space.3xl` | `spacing.1200` | `p-space-3xl` | `--semantic-space-3xl` | Márgenes generosos de página. |
| `space.4xl` | `spacing.1600` | `p-space-4xl` | `--semantic-space-4xl` | El espacio más grande: cabeceras y portadas. |
| `radius.none` | `radius.0` | `rounded-radius-none` | `--semantic-radius-none` | Esquinas rectas. |
| `radius.sm` | `radius.100` | `rounded-radius-sm` | `--semantic-radius-sm` | Redondeo pequeño: badges y elementos pequeños. |
| `radius.md` | `radius.200` | `rounded-radius-md` | `--semantic-radius-md` | Redondeo medio: campos de texto. |
| `radius.lg` | `radius.300` | `rounded-radius-lg` | `--semantic-radius-lg` | Redondeo grande: tarjetas. |
| `radius.xl` | `radius.400` | `rounded-radius-xl` | `--semantic-radius-xl` | Redondeo muy grande: ventanas y paneles. |
| `radius.full` | `radius.full` | `rounded-radius-full` | `--semantic-radius-full` | Píldora o círculo: botones y avatares. |
| `border-width.default` | `border-width.1` | `border-width-default` · `outline-width-default` | `--semantic-border-width-default` | Borde normal de campos, tarjetas y separadores. |
| `border-width.strong` | `border-width.2` | `border-width-strong` · `outline-width-strong` | `--semantic-border-width-strong` | Borde destacado, por ejemplo de un elemento seleccionado. |
| `border-width.focus` | `border-width.2` | `border-width-focus` · `outline-width-focus` | `--semantic-border-width-focus` | Grosor del contorno de foco al navegar con el teclado. |
| `elevation.sm` |  | `shadow-elevation-sm` | `--semantic-elevation-sm` | Elevación baja: tarjetas y elementos apenas separados del fondo. |
| `elevation.md` |  | `shadow-elevation-md` | `--semantic-elevation-md` | Elevación media: menús desplegables y elementos que flotan sobre el contenido. |
| `elevation.lg` |  | `shadow-elevation-lg` | `--semantic-elevation-lg` | Elevación alta: ventanas modales y paneles. |

## De componente

Solo para su componente.

| Token | Apunta a | Clase de Tailwind | Variable CSS | Para qué sirve |
|---|---|---|---|---|
| `button.background.brand` | `color.background.brand` | `bg-button-background-brand` | `--component-button-background-brand` | Fondo del botón primary. |
| `button.background.brand.hover` | `color.background.brand.hover` | `bg-button-background-brand-hover` | `--component-button-background-brand-hover` | Fondo del botón primary al pasar el ratón. |
| `button.background.brand.subtle.hover` | `color.background.brand.subtle` | `bg-button-background-brand-subtle-hover` | `--component-button-background-brand-subtle-hover` | Fondo del botón ghost al pasar el ratón (en reposo es transparente). |
| `button.background.neutral` | `color.background.neutral` | `bg-button-background-neutral` | `--component-button-background-neutral` | Fondo del botón secondary. |
| `button.background.neutral.hover` | `color.background.neutral.subtle` | `bg-button-background-neutral-hover` | `--component-button-background-neutral-hover` | Fondo del botón secondary al pasar el ratón. |
| `button.background.danger` | `color.background.danger` | `bg-button-background-danger` | `--component-button-background-danger` | Fondo del botón danger. |
| `button.background.danger.hover` | `color.background.danger.hover` | `bg-button-background-danger-hover` | `--component-button-background-danger-hover` | Fondo del botón danger al pasar el ratón. |
| `button.background.disabled` | `color.background.neutral.strong` | `bg-button-background-disabled` | `--component-button-background-disabled` | Fondo de cualquier botón desactivado. |
| `button.text.brand` | `color.text.brand` | `text-button-text-brand` | `--component-button-text-brand` | Texto del botón ghost. |
| `button.text.brand.inverted` | `color.text.brand.inverted` | `text-button-text-brand-inverted` | `--component-button-text-brand-inverted` | Texto del botón primary. |
| `button.text.neutral` | `color.text.neutral` | `text-button-text-neutral` | `--component-button-text-neutral` | Texto del botón secondary. |
| `button.text.danger.inverted` | `color.text.danger.inverted` | `text-button-text-danger-inverted` | `--component-button-text-danger-inverted` | Texto del botón danger. |
| `button.text.disabled` | `color.text.neutral.subtle` | `text-button-text-disabled` | `--component-button-text-disabled` | Texto de cualquier botón desactivado. |
| `button.icon.brand` | `color.icon.brand` | `text-button-icon-brand` | `--component-button-icon-brand` | Icono del botón ghost. |
| `button.icon.brand.inverted` | `color.icon.brand.inverted` | `text-button-icon-brand-inverted` | `--component-button-icon-brand-inverted` | Icono del botón primary. |
| `button.icon.neutral` | `color.icon.neutral` | `text-button-icon-neutral` | `--component-button-icon-neutral` | Icono del botón secondary. |
| `button.icon.danger.inverted` | `color.icon.danger.inverted` | `text-button-icon-danger-inverted` | `--component-button-icon-danger-inverted` | Icono del botón danger. |
| `button.icon.disabled` | `color.icon.neutral.subtle` | `text-button-icon-disabled` | `--component-button-icon-disabled` | Icono de cualquier botón desactivado. |
| `button.border.neutral` | `color.border.neutral` | `border-button-border-neutral` | `--component-button-border-neutral` | Borde del botón secondary. |
| `button.border.focus` | `color.border.focus` | `outline-button-border-focus` | `--component-button-border-focus` | Contorno del botón al recibir el foco del teclado. |
| `button.border.focus.inverted` | `color.border.focus.inverted` | `outline-button-border-focus-inverted` | `--component-button-border-focus-inverted` | Anillo exterior claro del foco del botón. |
| `button.border-width` | `border-width.default` | `border-width-button-border-width` · `outline-width-button-border-width` | `--component-button-border-width` | Grosor del borde del botón secondary. |
| `button.border-width.focus` | `border-width.focus` | `border-width-button-border-width-focus` · `outline-width-button-border-width-focus` | `--component-button-border-width-focus` | Grosor del contorno de foco del botón. |
| `button.radius` | `radius.full` | `rounded-button-radius` | `--component-button-radius` | Esquinas del botón: forma de píldora. |
| `button.padding-x.sm` | `space.md` | `px-button-padding-x-sm` | `--component-button-padding-x-sm` | Relleno horizontal del botón pequeño (sm). |
| `button.padding-x.md` | `space.lg` | `px-button-padding-x-md` | `--component-button-padding-x-md` | Relleno horizontal del botón mediano (md). |
| `button.padding-x.lg` | `space.xl` | `px-button-padding-x-lg` | `--component-button-padding-x-lg` | Relleno horizontal del botón grande (lg). |
| `button.gap.sm` | `space.xs` | `gap-button-gap-sm` | `--component-button-gap-sm` | Separación entre icono y texto en el botón pequeño. |
| `button.gap.md` | `space.sm` | `gap-button-gap-md` | `--component-button-gap-md` | Separación entre icono y texto en los botones mediano y grande. |
| `button.font-size.sm` | `typography.label.font-size` | `text-button-font-size-sm` | `--component-button-font-size-sm` | Tamaño de texto del botón pequeño. |
| `button.font-size.md` | `typography.body.font-size` | `text-button-font-size-md` | `--component-button-font-size-md` | Tamaño de texto del botón mediano. |
| `button.font-size.lg` | `typography.title.font-size` | `text-button-font-size-lg` | `--component-button-font-size-lg` | Tamaño de texto del botón grande. |
| `button.line-height.sm` | `typography.label.line-height` | `leading-button-line-height-sm` | `--component-button-line-height-sm` | Interlineado del botón pequeño. |
| `button.line-height.md` | `typography.body.line-height` | `leading-button-line-height-md` | `--component-button-line-height-md` | Interlineado del botón mediano. |
| `button.line-height.lg` | `typography.title.line-height` | `leading-button-line-height-lg` | `--component-button-line-height-lg` | Interlineado del botón grande. |
| `button.font-weight` | `typography.label.font-weight` | `font-button-font-weight` | `--component-button-font-weight` | Peso del texto de todos los botones. |
| `button.padding-y.sm` | `space.xs` | `py-button-padding-y-sm` | `--component-button-padding-y-sm` | Relleno vertical del botón pequeño. Con su interlineado, da una altura de 28px. |
| `button.padding-y.md` | `space.sm` | `py-button-padding-y-md` | `--component-button-padding-y-md` | Relleno vertical del botón mediano. Con su interlineado, da una altura de 40px. |
| `button.padding-y.lg` | `space.md` | `py-button-padding-y-lg` | `--component-button-padding-y-lg` | Relleno vertical del botón grande. Con su interlineado, da una altura de 52px. |
| `button.focus-offset` | `space.2xs` | `outline-offset-button-focus-offset` | `--component-button-focus-offset` | Separación entre el botón y su contorno de foco. |
| `input.background` | `color.background.neutral` | `bg-input-background` | `--component-input-background` | Fondo del campo. |
| `input.background.disabled` | `color.background.neutral.subtle` | `bg-input-background-disabled` | `--component-input-background-disabled` | Fondo del campo desactivado. |
| `input.text` | `color.text.neutral` | `text-input-text` | `--component-input-text` | Texto que escribe la persona. |
| `input.text.placeholder` | `color.text.neutral.subtle` | `text-input-text-placeholder` | `--component-input-text-placeholder` | Texto de ejemplo dentro del campo vacío. |
| `input.text.disabled` | `color.text.neutral.subtle` | `text-input-text-disabled` | `--component-input-text-disabled` | Texto del campo desactivado. |
| `input.label.text` | `color.text.neutral` | `text-input-label-text` | `--component-input-label-text` | Texto de la etiqueta encima del campo. |
| `input.label.required` | `color.text.danger` | `text-input-label-required` | `--component-input-label-required` | Asterisco de campo obligatorio. |
| `input.label.font-size` | `typography.label.font-size` | `text-input-label-font-size` | `--component-input-label-font-size` | Tamaño de la etiqueta. |
| `input.label.font-weight` | `typography.label.font-weight` | `font-input-label-font-weight` | `--component-input-label-font-weight` | Peso de la etiqueta. |
| `input.hint.text` | `color.text.neutral.subtle` | `text-input-hint-text` | `--component-input-hint-text` | Texto de ayuda debajo del campo. |
| `input.hint.font-size` | `typography.label.font-size` | `text-input-hint-font-size` | `--component-input-hint-font-size` | Tamaño de la ayuda y del mensaje de error. |
| `input.error.text` | `color.text.danger` | `text-input-error-text` | `--component-input-error-text` | Mensaje de error debajo del campo. |
| `input.error.icon` | `color.icon.danger` | `text-input-error-icon` | `--component-input-error-icon` | Icono del mensaje de error. |
| `input.icon` | `color.icon.neutral.subtle` | `text-input-icon` | `--component-input-icon` | Icono dentro del campo, por ejemplo una lupa. |
| `input.border` | `color.border.neutral.strong` | `border-input-border` | `--component-input-border` | Borde del campo en reposo. |
| `input.border.danger` | `color.border.danger` | `border-input-border-danger` | `--component-input-border-danger` | Borde del campo con error. |
| `input.border.focus` | `color.border.focus` | `outline-input-border-focus` | `--component-input-border-focus` | Contorno del campo al recibir el foco del teclado. |
| `input.border.focus.inverted` | `color.border.focus.inverted` | `outline-input-border-focus-inverted` | `--component-input-border-focus-inverted` | Anillo exterior claro del foco del campo. |
| `input.border-width` | `border-width.default` | `border-width-input-border-width` · `outline-width-input-border-width` | `--component-input-border-width` | Grosor del borde del campo. |
| `input.border-width.focus` | `border-width.focus` | `border-width-input-border-width-focus` · `outline-width-input-border-width-focus` | `--component-input-border-width-focus` | Grosor del contorno de foco del campo. |
| `input.radius` | `radius.md` | `rounded-input-radius` | `--component-input-radius` | Esquinas del campo. |
| `input.padding-x` | `space.md` | `px-input-padding-x` | `--component-input-padding-x` | Relleno horizontal dentro del campo. |
| `input.gap` | `space.xs` | `gap-input-gap` | `--component-input-gap` | Separación entre etiqueta, campo y textos de ayuda o error. |
| `input.font-size` | `typography.body.font-size` | `text-input-font-size` | `--component-input-font-size` | Tamaño del texto que se escribe. |
| `input.line-height` | `typography.body.line-height` | `leading-input-line-height` | `--component-input-line-height` | Interlineado del texto que se escribe. |
| `input.padding-y` | `space.sm` | `py-input-padding-y` | `--component-input-padding-y` | Relleno vertical dentro del campo. Con el interlineado y el borde, da una altura de 42px. |
| `input.icon-gap` | `space.sm` | `gap-input-icon-gap` | `--component-input-icon-gap` | Separación entre el icono del campo y el texto. |
| `input.focus-offset` | `space.2xs` | `outline-offset-input-focus-offset` | `--component-input-focus-offset` | Separación entre la caja del campo y su anillo de foco. Igual que en el botón, para que todos los componentes tengan el mismo anillo. |
| `card.background` | `color.background.neutral` | `bg-card-background` | `--component-card-background` | Fondo de la tarjeta. |
| `card.border` | `color.border.neutral` | `border-card-border` | `--component-card-border` | Borde de la tarjeta y línea que separa el pie. |
| `card.border-width` | `border-width.default` | `border-width-card-border-width` · `outline-width-card-border-width` | `--component-card-border-width` | Grosor del borde de la tarjeta. |
| `card.radius` | `radius.lg` | `rounded-card-radius` | `--component-card-radius` | Esquinas de la tarjeta. |
| `card.padding` | `space.lg` | `p-card-padding` | `--component-card-padding` | Relleno interior de la tarjeta. |
| `card.gap` | `space.lg` | `gap-card-gap` | `--component-card-gap` | Separación entre cabecera, contenido y pie. |
| `card.header.gap` | `space.md` | `gap-card-header-gap` | `--component-card-header-gap` | Separación entre el icono y el título. |
| `card.header.text-gap` | `space.2xs` | `gap-card-header-text-gap` | `--component-card-header-text-gap` | Separación entre el título y la descripción. |
| `card.elevation` | `elevation.sm` | `shadow-card-elevation` | `--component-card-elevation` | Sombra de la tarjeta. |
| `card.title.text` | `color.text.neutral` | `text-card-title-text` | `--component-card-title-text` | Color del título. |
| `card.title.font-size` | `typography.title.font-size` | `text-card-title-font-size` | `--component-card-title-font-size` | Tamaño del título. |
| `card.title.line-height` | `typography.title.line-height` | `leading-card-title-line-height` | `--component-card-title-line-height` | Interlineado del título. |
| `card.title.font-weight` | `typography.title.font-weight` | `font-card-title-font-weight` | `--component-card-title-font-weight` | Peso del título. |
| `card.description.text` | `color.text.neutral.subtle` | `text-card-description-text` | `--component-card-description-text` | Color del texto bajo el título. |
| `card.description.font-size` | `typography.label.font-size` | `text-card-description-font-size` | `--component-card-description-font-size` | Tamaño del texto bajo el título. |
| `card.body.text` | `color.text.neutral` | `text-card-body-text` | `--component-card-body-text` | Color del contenido principal. |
| `card.body.font-size` | `typography.body.font-size` | `text-card-body-font-size` | `--component-card-body-font-size` | Tamaño del contenido principal. |
| `card.icon` | `color.icon.brand` | `text-card-icon` | `--component-card-icon` | Icono de la cabecera. |
| `card.icon.background` | `color.background.brand.subtle` | `bg-card-icon-background` | `--component-card-icon-background` | Fondo del cuadrado que rodea el icono. |
| `card.icon.radius` | `radius.md` | `rounded-card-icon-radius` | `--component-card-icon-radius` | Esquinas del cuadrado del icono. |
| `card.icon.padding` | `space.sm` | `p-card-icon-padding` | `--component-card-icon-padding` | Relleno alrededor del icono de la cabecera. Con el icono de 24px, forma un cuadrado de 40px. |
| `card.footer.gap` | `space.sm` | `gap-card-footer-gap` | `--component-card-footer-gap` | Separación entre los botones del pie. |
| `card.footer.padding-top` | `space.lg` | `pt-card-footer-padding-top` | `--component-card-footer-padding-top` | Espacio entre la línea del pie y su contenido. |
| `badge.background.neutral` | `color.background.neutral.subtle` | `bg-badge-background-neutral` | `--component-badge-background-neutral` | Fondo del badge con tone neutral (sin significado). |
| `badge.background.info` | `color.background.info.subtle` | `bg-badge-background-info` | `--component-badge-background-info` | Fondo del badge con tone info (información). |
| `badge.background.success` | `color.background.success.subtle` | `bg-badge-background-success` | `--component-badge-background-success` | Fondo del badge con tone success (éxito). |
| `badge.background.warning` | `color.background.warning.subtle` | `bg-badge-background-warning` | `--component-badge-background-warning` | Fondo del badge con tone warning (aviso). |
| `badge.background.danger` | `color.background.danger.subtle` | `bg-badge-background-danger` | `--component-badge-background-danger` | Fondo del badge con tone danger (peligro). |
| `badge.text.neutral` | `color.text.neutral` | `text-badge-text-neutral` | `--component-badge-text-neutral` | Texto del badge con tone neutral (sin significado). |
| `badge.text.info` | `color.text.info` | `text-badge-text-info` | `--component-badge-text-info` | Texto del badge con tone info (información). |
| `badge.text.success` | `color.text.success` | `text-badge-text-success` | `--component-badge-text-success` | Texto del badge con tone success (éxito). |
| `badge.text.warning` | `color.text.warning` | `text-badge-text-warning` | `--component-badge-text-warning` | Texto del badge con tone warning (aviso). |
| `badge.text.danger` | `color.text.danger` | `text-badge-text-danger` | `--component-badge-text-danger` | Texto del badge con tone danger (peligro). |
| `badge.icon.neutral` | `color.icon.neutral` | `text-badge-icon-neutral` | `--component-badge-icon-neutral` | Icono del badge con tone neutral (sin significado). |
| `badge.icon.info` | `color.icon.info` | `text-badge-icon-info` | `--component-badge-icon-info` | Icono del badge con tone info (información). |
| `badge.icon.success` | `color.icon.success` | `text-badge-icon-success` | `--component-badge-icon-success` | Icono del badge con tone success (éxito). |
| `badge.icon.warning` | `color.icon.warning` | `text-badge-icon-warning` | `--component-badge-icon-warning` | Icono del badge con tone warning (aviso). |
| `badge.icon.danger` | `color.icon.danger` | `text-badge-icon-danger` | `--component-badge-icon-danger` | Icono del badge con tone danger (peligro). |
| `badge.border` | `color.border.neutral` | `border-badge-border` | `--component-badge-border` | Borde fino del badge, igual en todos los tonos. |
| `badge.border-width` | `border-width.default` | `border-width-badge-border-width` · `outline-width-badge-border-width` | `--component-badge-border-width` | Grosor del borde del badge. |
| `badge.radius` | `radius.sm` | `rounded-badge-radius` | `--component-badge-radius` | Esquinas del badge: ligeramente redondeadas. |
| `badge.padding-x.sm` | `space.sm` | `px-badge-padding-x-sm` | `--component-badge-padding-x-sm` | Relleno horizontal del badge pequeño. |
| `badge.padding-x.md` | `space.md` | `px-badge-padding-x-md` | `--component-badge-padding-x-md` | Relleno horizontal del badge mediano. |
| `badge.padding-y.sm` | `space.2xs` | `py-badge-padding-y-sm` | `--component-badge-padding-y-sm` | Relleno vertical del badge pequeño. |
| `badge.padding-y.md` | `space.xs` | `py-badge-padding-y-md` | `--component-badge-padding-y-md` | Relleno vertical del badge mediano. |
| `badge.gap` | `space.xs` | `gap-badge-gap` | `--component-badge-gap` | Separación entre el icono y el texto. |
| `badge.font-size.sm` | `typography.caption.font-size` | `text-badge-font-size-sm` | `--component-badge-font-size-sm` | Tamaño de texto del badge pequeño. |
| `badge.font-size.md` | `typography.label.font-size` | `text-badge-font-size-md` | `--component-badge-font-size-md` | Tamaño de texto del badge mediano. |
| `badge.font-weight` | `typography.label.font-weight` | `font-badge-font-weight` | `--component-badge-font-weight` | Peso del texto del badge. |
