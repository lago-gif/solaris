# Mapa de props

Los nombres que pueden usar las props de los componentes de solaris-ds y los que no. Sirve para que todas las piezas hablen igual y para que una persona o un agente acierte el nombre a la primera.

**Cómo se eligió cada nombre:** siempre el que un agente de IA escribiría por defecto, sin haber leído nada del sistema. Es el que más se repite en React y en HTML. Si el nombre ya es el habitual, no hay que enseñárselo a nadie.

> **Es norma.** El [ADR-002](./adr/002-api.md) lo convierte en la regla para nombrar props y variantes, y dice quién decide un nombre nuevo. Sustituye dos cosas del [ADR-001](./adr/001-alcance.md): la prop `tone` desaparece (todo es `variant`) y el error de un campo pasa a ser `invalid` + `errorMessage`.

Fuente: los props de `src/components/*.tsx` y sus contratos en `contracts/*.json`, y los nombres que salieron en la [auditoría](./audit.md).

## 1. Vocabulario

| Correcto | Prohibido | Notas |
|---|---|---|
| `variant` | `tone`, `kind`, `appearance`, `intent`, `color`, `status`, `type` (para el estilo) | El aspecto según el significado. Una sola palabra para todos los componentes: Button y Badge usan `variant`. Sus valores, en la sección 2. |
| `size` | `scale`, `small`, `large`, `compact`, `dense` | Valores `sm`, `md`, `lg`. Cada componente ofrece solo los que necesita (Badge: `sm`, `md`). Nunca `small`, `medium`, `large` ni números. |
| `isLoading` | `loading`, `busy`, `pending`, `isBusy` | Booleana. Mientras carga, el componente no se puede pulsar y lo anuncia al lector de pantalla. Lleva `is` porque no existe en HTML. |
| `disabled` | `isDisabled`, `inactive`, `isInactive` | Booleana. Sin `is`, porque es el atributo de HTML y se pasa tal cual. |
| `invalid` | `error` (sí/no), `hasError`, `isInvalid`, `isError` | Booleana. Marca que el valor está mal: borde y `aria-invalid`. Sin `is`, igual que `disabled`. |
| `errorMessage` | `error` (texto), `errorText`, `helperError`, `validationMessage` | Texto que explica el error. Si hay `errorMessage`, el campo se marca `invalid` solo. |
| `onClick` | `onPress`, `onTap`, `handleClick`, `onAction` | El de HTML. Las props de evento empiezan por `on`; `handle…` es el nombre de la función de dentro, no de la prop. |
| `onSubmit` | `onSend`, `onSave`, `handleSubmit` | El de HTML, para formularios. |
| `onChange` | `onInput`, `onValueChange`, `onUpdate` | El de HTML: recibe el evento, no el valor suelto. |
| `label` | `title` (en campos), `name`, `caption`, `text` | Texto visible que nombra un campo. Obligatorio en los campos. |
| `children` | `text`, `content`, `label` (en botones y etiquetas) | Lo que va dentro: el texto de Button y de Badge, el contenido de Card. |
| `iconStart` | `iconPosition`, `leftIcon`, `startIcon`, `iconLeft`, `icon` + `iconPosition="left"` | Icono **delante** del texto. `start` y no `left`: en idiomas que se leen de derecha a izquierda, delante está a la derecha. Recibe un icono de Tabler. |
| `iconEnd` | `iconPosition`, `rightIcon`, `endIcon`, `iconRight`, `icon` + `iconPosition="right"` | Icono **detrás** del texto. Un componente puede llevar `iconStart` e `iconEnd` a la vez. |

## 2. Valores de `variant`

**Para acciones (Button):**

| Correcto | Prohibido | Notas |
|---|---|---|
| `primary` | `default`, `main`, `solid`, `filled`, `brand` | La acción principal. Tokens del rol **brand** en su versión fuerte (`button.background.brand`, `button.text.brand.inverted`). |
| `secondary` | `outline`, `outlined`, `bordered`, `default` | Acción secundaria. Tokens del rol **neutral** (`button.background.neutral`, `button.border.neutral`, `button.text.neutral`). |
| `ghost` | `tertiary`, `text`, `link`, `plain`, `subtle` | Acción de poco peso, sin fondo. Tokens del rol **brand** en su versión suave (`button.text.brand`, `button.background.brand.subtle.hover`). |
| `danger` | `error`, `destructive`, `critical`, `delete`, `negative` | Acciones que borran o no tienen vuelta atrás. Tokens del rol **danger** (`button.background.danger`, `button.text.danger.inverted`). |

**Para estados (Badge):**

| Correcto | Prohibido | Notas |
|---|---|---|
| `neutral` | `default`, `gray`, `grey`, `secondary` | Sin significado especial. Tokens del rol **neutral**. |
| `info` | `information`, `primary`, `blue` | Información. Tokens del rol **info**. |
| `success` | `positive`, `ok`, `done`, `green` | Algo va bien o está hecho. Tokens del rol **success**. |
| `warning` | `caution`, `alert`, `attention`, `yellow` | Hay que prestar atención. Tokens del rol **warning**. |
| `danger` | `error`, `destructive`, `critical`, `red` | Algo va mal. Tokens del rol **danger**. |

Reglas de los valores:

- **El valor es el significado, nunca el color** (`danger`, no `red`), y siempre en inglés.
- **`danger` y nunca `error`**, en valores y en tokens: el rol de color se llama `danger` en todo el sistema. `error` solo vive en `errorMessage`.
- **El valor coincide con el rol de tokens cuando puede** (`danger` → rol danger). `primary`, `secondary` y `ghost` son la excepción: hablan de jerarquía de la acción y usan los roles brand y neutral.
- **El color nunca va solo** (ADR-001): un `variant` de estado siempre acompaña a un texto.

## 3. Excepciones

**Atributos de HTML: no se renombran.** Si HTML ya tiene un nombre para algo, se usa ese tal cual, aunque no siga las reglas de arriba:

| Atributo | Por qué se queda |
|---|---|
| `type` | En Button es el tipo de HTML (`button`, `submit`), no un estilo. Por eso `type` nunca puede ser el nombre del aspecto. |
| `name`, `value`, `defaultValue` | Los usa el formulario al enviarse. |
| `title` | Tooltip nativo de HTML. Excepción (ADR-002): en los componentes con encabezado visible, como Card, `title` es el texto del encabezado. |
| `id`, `htmlFor`, `className`, `style` | Los de React para HTML. |
| `placeholder`, `required`, `readOnly`, `autoComplete`, `inputMode` | Comportamiento nativo de los campos. |
| `disabled`, `onClick`, `onChange`, `onSubmit` | Ya están en el vocabulario precisamente porque son de HTML. |
| `aria-*`, `role`, `tabIndex` | Accesibilidad: el lector de pantalla los lee con ese nombre exacto. |
| `href`, `target`, `rel` | Enlaces. |

**Figma: un icono que se puede quitar lleva dos propiedades.**

| En Figma | Tipo | Para qué |
|---|---|---|
| `iconStart` | Cambio de instancia | Qué icono se muestra. |
| `iconStart.` | Booleana | Si se muestra o no. Mismo nombre **con un punto al final**. |
| `iconEnd` / `iconEnd.` | Las mismas dos | Para el icono de detrás. |

Figma no deja que dos propiedades se llamen igual, así que la booleana lleva el punto. En código no hay booleana: si no pasas `iconStart`, no hay icono. Con el punto, quien lee el componente en Figma sabe que las dos propiedades son la misma prop de código.
