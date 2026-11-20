# Contraste de los colores semánticos

> Archivo generado por `npm run contrast` a partir de `tokens/contrast-pairs.json` y `tokens/tokens.json`. No lo edites a mano.

Comprueba la regla 1 de [`docs/accesibilidad.md`](./accesibilidad.md): **texto 4,5:1** e **iconos y bordes de campos y de foco 3:1**.

Las parejas no se escriben a mano: salen de **reglas por grupos**. Un token de texto, icono o borde nuevo entra solo en su regla por su nombre, y un fondo nuevo solo hay que añadirlo a su grupo en `tokens/contrast-pairs.json`.

## Resumen

- **156 parejas** comprobadas.
- ✅ **156** pasan.
- ✅ **0** no pasan.

| Regla | Tipo | Mínimo | Parejas | No pasan |
|---|---|---|---|---|
| `texto-sobre-claros` | Texto | 4,50:1 | 56 | 0 |
| `texto-inverted-sobre-fuertes` | Texto | 4,50:1 | 10 | 0 |
| `bordes-sobre-claros` | Interfaz (iconos y bordes) | 3,00:1 | 24 | 0 |
| `iconos` | Interfaz (iconos y bordes) | 3,00:1 | 66 | 0 |

## Grupos de fondos

- **light**: Fondos claros: llevan encima texto, iconos y bordes normales (los que no terminan en inverted). `color.background.neutral`, `color.background.neutral.subtle`, `color.background.neutral.strong`, `color.background.brand.subtle`, `color.background.info.subtle`, `color.background.success.subtle`, `color.background.warning.subtle`, `color.background.danger.subtle`.
- **strong**: Fondos fuertes: llevan encima texto e iconos inverted. `color.background.brand`, `color.background.brand.hover`, `color.background.danger`, `color.background.danger.hover`, `color.background.neutral.inverted`.

## `texto-sobre-claros`

Todo color.text que no sea inverted, sobre todos los fondos claros. Tipo **text**, mínimo **4,50:1**.

| Delante | Fondo | Contraste | |
|---|---|---|---|
| `color.text.neutral` · #101828 | `color.background.neutral` · #f9fafb | 16,98:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.neutral.subtle` · #f3f4f6 | 16,13:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.neutral.strong` · #e5e7eb | 14,33:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.brand.subtle` · #f4fbfc | 16,94:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.info.subtle` · #f4fbfc | 16,94:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.success.subtle` · #f0fdf4 | 16,95:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.warning.subtle` · #fff7ed | 16,71:1 | ✅ |
| `color.text.neutral` · #101828 | `color.background.danger.subtle` · #fef2f2 | 16,22:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.neutral` · #f9fafb | 7,23:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.neutral.subtle` · #f3f4f6 | 6,87:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.neutral.strong` · #e5e7eb | 6,10:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.brand.subtle` · #f4fbfc | 7,22:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.info.subtle` · #f4fbfc | 7,22:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.success.subtle` · #f0fdf4 | 7,22:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.warning.subtle` · #fff7ed | 7,12:1 | ✅ |
| `color.text.neutral.subtle` · #4a5565 | `color.background.danger.subtle` · #fef2f2 | 6,91:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.neutral` · #f9fafb | 7,27:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.neutral.subtle` · #f3f4f6 | 6,90:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.neutral.strong` · #e5e7eb | 6,13:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.brand.subtle` · #f4fbfc | 7,25:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.info.subtle` · #f4fbfc | 7,25:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.success.subtle` · #f0fdf4 | 7,25:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.warning.subtle` · #fff7ed | 7,15:1 | ✅ |
| `color.text.brand` · #095d65 | `color.background.danger.subtle` · #fef2f2 | 6,94:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.neutral` · #f9fafb | 6,14:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.neutral.subtle` · #f3f4f6 | 5,83:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.neutral.strong` · #e5e7eb | 5,19:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.brand.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.info.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.success.subtle` · #f0fdf4 | 6,13:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.warning.subtle` · #fff7ed | 6,05:1 | ✅ |
| `color.text.danger` · #c10007 | `color.background.danger.subtle` · #fef2f2 | 5,87:1 | ✅ |
| `color.text.success` · #016630 | `color.background.neutral` · #f9fafb | 6,82:1 | ✅ |
| `color.text.success` · #016630 | `color.background.neutral.subtle` · #f3f4f6 | 6,48:1 | ✅ |
| `color.text.success` · #016630 | `color.background.neutral.strong` · #e5e7eb | 5,76:1 | ✅ |
| `color.text.success` · #016630 | `color.background.brand.subtle` · #f4fbfc | 6,81:1 | ✅ |
| `color.text.success` · #016630 | `color.background.info.subtle` · #f4fbfc | 6,81:1 | ✅ |
| `color.text.success` · #016630 | `color.background.success.subtle` · #f0fdf4 | 6,81:1 | ✅ |
| `color.text.success` · #016630 | `color.background.warning.subtle` · #fff7ed | 6,72:1 | ✅ |
| `color.text.success` · #016630 | `color.background.danger.subtle` · #fef2f2 | 6,52:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.neutral` · #f9fafb | 7,27:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.neutral.subtle` · #f3f4f6 | 6,90:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.neutral.strong` · #e5e7eb | 6,13:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.brand.subtle` · #f4fbfc | 7,25:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.info.subtle` · #f4fbfc | 7,25:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.success.subtle` · #f0fdf4 | 7,25:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.warning.subtle` · #fff7ed | 7,15:1 | ✅ |
| `color.text.info` · #095d65 | `color.background.danger.subtle` · #fef2f2 | 6,94:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.neutral` · #f9fafb | 7,05:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.neutral.subtle` · #f3f4f6 | 6,70:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.neutral.strong` · #e5e7eb | 5,95:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.brand.subtle` · #f4fbfc | 7,04:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.info.subtle` · #f4fbfc | 7,04:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.success.subtle` · #f0fdf4 | 7,04:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.warning.subtle` · #fff7ed | 6,94:1 | ✅ |
| `color.text.warning` · #9f2d00 | `color.background.danger.subtle` · #fef2f2 | 6,74:1 | ✅ |

## `texto-inverted-sobre-fuertes`

Todo color.text que termine en inverted, sobre todos los fondos fuertes. Tipo **text**, mínimo **4,50:1**.

| Delante | Fondo | Contraste | |
|---|---|---|---|
| `color.text.brand.inverted` · #f9fafb | `color.background.brand` · #0e7c86 | 4,73:1 | ✅ |
| `color.text.brand.inverted` · #f9fafb | `color.background.brand.hover` · #095d65 | 7,27:1 | ✅ |
| `color.text.brand.inverted` · #f9fafb | `color.background.danger` · #c10007 | 6,14:1 | ✅ |
| `color.text.brand.inverted` · #f9fafb | `color.background.danger.hover` · #9f0712 | 8,00:1 | ✅ |
| `color.text.brand.inverted` · #f9fafb | `color.background.neutral.inverted` · #101828 | 16,98:1 | ✅ |
| `color.text.danger.inverted` · #f9fafb | `color.background.brand` · #0e7c86 | 4,73:1 | ✅ |
| `color.text.danger.inverted` · #f9fafb | `color.background.brand.hover` · #095d65 | 7,27:1 | ✅ |
| `color.text.danger.inverted` · #f9fafb | `color.background.danger` · #c10007 | 6,14:1 | ✅ |
| `color.text.danger.inverted` · #f9fafb | `color.background.danger.hover` · #9f0712 | 8,00:1 | ✅ |
| `color.text.danger.inverted` · #f9fafb | `color.background.neutral.inverted` · #101828 | 16,98:1 | ✅ |

## `bordes-sobre-claros`

Bordes con los que se interactúa (campos, foco, error), sobre todos los fondos claros. color.border.neutral queda fuera porque es decorativo y no tiene mínimo; los inverted, porque van sobre fondos oscuros. Tipo **ui**, mínimo **3,00:1**.

| Delante | Fondo | Contraste | |
|---|---|---|---|
| `color.border.neutral.strong` · #6a7282 | `color.background.neutral` · #f9fafb | 4,63:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.neutral.subtle` · #f3f4f6 | 4,39:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.neutral.strong` · #e5e7eb | 3,91:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.brand.subtle` · #f4fbfc | 4,62:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.info.subtle` · #f4fbfc | 4,62:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.success.subtle` · #f0fdf4 | 4,62:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.warning.subtle` · #fff7ed | 4,56:1 | ✅ |
| `color.border.neutral.strong` · #6a7282 | `color.background.danger.subtle` · #fef2f2 | 4,42:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.neutral` · #f9fafb | 4,73:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.neutral.subtle` · #f3f4f6 | 4,49:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.neutral.strong` · #e5e7eb | 3,99:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.brand.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.info.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.success.subtle` · #f0fdf4 | 4,72:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.warning.subtle` · #fff7ed | 4,66:1 | ✅ |
| `color.border.focus` · #0e7c86 | `color.background.danger.subtle` · #fef2f2 | 4,52:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.neutral` · #f9fafb | 6,14:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.neutral.subtle` · #f3f4f6 | 5,83:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.neutral.strong` · #e5e7eb | 5,19:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.brand.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.info.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.success.subtle` · #f0fdf4 | 6,13:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.warning.subtle` · #fff7ed | 6,05:1 | ✅ |
| `color.border.danger` · #c10007 | `color.background.danger.subtle` · #fef2f2 | 5,87:1 | ✅ |

## `iconos`

Los iconos, como el texto: todo color.icon que no sea inverted sobre los fondos claros y todo color.icon que termine en inverted sobre los fuertes. Tipo **ui**, mínimo **3,00:1**.

| Delante | Fondo | Contraste | |
|---|---|---|---|
| `color.icon.neutral` · #101828 | `color.background.neutral` · #f9fafb | 16,98:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.neutral.subtle` · #f3f4f6 | 16,13:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.neutral.strong` · #e5e7eb | 14,33:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.brand.subtle` · #f4fbfc | 16,94:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.info.subtle` · #f4fbfc | 16,94:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.success.subtle` · #f0fdf4 | 16,95:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.warning.subtle` · #fff7ed | 16,71:1 | ✅ |
| `color.icon.neutral` · #101828 | `color.background.danger.subtle` · #fef2f2 | 16,22:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.neutral` · #f9fafb | 7,23:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.neutral.subtle` · #f3f4f6 | 6,87:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.neutral.strong` · #e5e7eb | 6,10:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.brand.subtle` · #f4fbfc | 7,22:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.info.subtle` · #f4fbfc | 7,22:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.success.subtle` · #f0fdf4 | 7,22:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.warning.subtle` · #fff7ed | 7,12:1 | ✅ |
| `color.icon.neutral.subtle` · #4a5565 | `color.background.danger.subtle` · #fef2f2 | 6,91:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.neutral` · #f9fafb | 4,73:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.neutral.subtle` · #f3f4f6 | 4,49:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.neutral.strong` · #e5e7eb | 3,99:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.brand.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.info.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.success.subtle` · #f0fdf4 | 4,72:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.warning.subtle` · #fff7ed | 4,66:1 | ✅ |
| `color.icon.brand` · #0e7c86 | `color.background.danger.subtle` · #fef2f2 | 4,52:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.neutral` · #f9fafb | 6,14:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.neutral.subtle` · #f3f4f6 | 5,83:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.neutral.strong` · #e5e7eb | 5,19:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.brand.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.info.subtle` · #f4fbfc | 6,13:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.success.subtle` · #f0fdf4 | 6,13:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.warning.subtle` · #fff7ed | 6,05:1 | ✅ |
| `color.icon.danger` · #c10007 | `color.background.danger.subtle` · #fef2f2 | 5,87:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.neutral` · #f9fafb | 4,73:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.neutral.subtle` · #f3f4f6 | 4,49:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.neutral.strong` · #e5e7eb | 3,99:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.brand.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.info.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.success.subtle` · #f0fdf4 | 4,72:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.warning.subtle` · #fff7ed | 4,66:1 | ✅ |
| `color.icon.success` · #008236 | `color.background.danger.subtle` · #fef2f2 | 4,52:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.neutral` · #f9fafb | 4,73:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.neutral.subtle` · #f3f4f6 | 4,49:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.neutral.strong` · #e5e7eb | 3,99:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.brand.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.info.subtle` · #f4fbfc | 4,72:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.success.subtle` · #f0fdf4 | 4,72:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.warning.subtle` · #fff7ed | 4,66:1 | ✅ |
| `color.icon.info` · #0e7c86 | `color.background.danger.subtle` · #fef2f2 | 4,52:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.neutral` · #f9fafb | 5,00:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.neutral.subtle` · #f3f4f6 | 4,75:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.neutral.strong` · #e5e7eb | 4,22:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.brand.subtle` · #f4fbfc | 4,99:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.info.subtle` · #f4fbfc | 4,99:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.success.subtle` · #f0fdf4 | 4,99:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.warning.subtle` · #fff7ed | 4,92:1 | ✅ |
| `color.icon.warning` · #ca3500 | `color.background.danger.subtle` · #fef2f2 | 4,77:1 | ✅ |
| `color.icon.brand.inverted` · #f9fafb | `color.background.brand` · #0e7c86 | 4,73:1 | ✅ |
| `color.icon.brand.inverted` · #f9fafb | `color.background.brand.hover` · #095d65 | 7,27:1 | ✅ |
| `color.icon.brand.inverted` · #f9fafb | `color.background.danger` · #c10007 | 6,14:1 | ✅ |
| `color.icon.brand.inverted` · #f9fafb | `color.background.danger.hover` · #9f0712 | 8,00:1 | ✅ |
| `color.icon.brand.inverted` · #f9fafb | `color.background.neutral.inverted` · #101828 | 16,98:1 | ✅ |
| `color.icon.danger.inverted` · #f9fafb | `color.background.brand` · #0e7c86 | 4,73:1 | ✅ |
| `color.icon.danger.inverted` · #f9fafb | `color.background.brand.hover` · #095d65 | 7,27:1 | ✅ |
| `color.icon.danger.inverted` · #f9fafb | `color.background.danger` · #c10007 | 6,14:1 | ✅ |
| `color.icon.danger.inverted` · #f9fafb | `color.background.danger.hover` · #9f0712 | 8,00:1 | ✅ |
| `color.icon.danger.inverted` · #f9fafb | `color.background.neutral.inverted` · #101828 | 16,98:1 | ✅ |
