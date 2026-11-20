# Accesibilidad en solaris-ds

La accesibilidad engloba muchos criterios (las pautas WCAG 2.2 tienen más de 80). **solaris-ds cubre estos cuatro**, que son los que más afectan a una app de salud usada por personas de cualquier edad y con distintas capacidades: **contraste, navegación por teclado, nombre accesible y lectura con lector de pantalla**. Cuatro reglas son fáciles de auditar. Al final hay una tabla con lo que no se cubre.

Las cuatro reglas desarrollan el principio 4 del [ADR-001](./adr/001-alcance.md). La regla 1 incluye además "el color nunca va solo" (principio 5 del ADR-001) y "texto ampliable al 200 %" (el "texto ampliado" que pide `AGENTS.md`), porque los tres tratan de lo mismo: que la información **se vea bien**. Los ejemplos usan los tokens y componentes de solaris-ds.

---

## 1. Contraste

**Qué es.** Que la información **se vea bien** para todo el mundo. Tiene tres partes:
- **Contraste:** la diferencia de luminosidad entre un elemento y lo que tiene detrás. Si es poca, el texto o el icono "se pierde" para quien ve mal, tiene la pantalla con mucho brillo o está al sol. Se mide con una cifra: **1:1** es el mismo color y **21:1** es negro sobre blanco.
- **El color nunca va solo:** una de cada doce personas ve mal algunos colores (sobre todo rojo y verde). Si la información solo está en el color, no la recibe. En una app de salud eso puede significar no ver que un análisis está fuera de rango.
- **Texto ampliable:** muchas personas, sobre todo mayores, agrandan el texto. Si el diseño no está preparado, el texto se corta o se solapa.

**La regla:**
- **Texto: al menos 4,5:1** con su fondo.
- **Iconos con significado, bordes de campos y anillo de foco: al menos 3:1** con lo que tienen al lado. Los bordes puramente decorativos (separadores, el borde de una tarjeta) no tienen mínimo.
- **El color nunca va solo:** todo estado o significado que se comunica con color se dice también **con texto o con un icono**.
- **Texto ampliable al 200 %:** con el texto al doble, nada se corta ni se solapa. Los tamaños van en `rem` (los tokens ya lo están) y nada que contenga texto tiene una altura fija: la altura sale del relleno y del interlineado, como en `Button` e `Input`.

**✅ Correcto**

| Elemento | Cómo | Por qué cumple |
|---|---|---|
| Texto secundario | `color.text.neutral.subtle` (gray.600) sobre `color.background.neutral` (gray.50) | 7,2:1 |
| Texto del botón primary | `color.text.brand.inverted` (gray.50) sobre `color.background.brand` (brand.700) | 4,7:1 |
| Borde de un campo | `color.border.neutral.strong` (gray.500) sobre gray.50 | 4,6:1 |
| Icono de éxito | `color.icon.success` (green.700) sobre gray.50 | 4,7:1 |
| Un análisis fuera de rango | `<Badge tone="danger" icon={IconX}>Fuera de rango</Badge>` | Color, icono y texto |
| Un error en un campo | `<Input label="Correo" error="Escribe un correo válido" />` | Borde rojo, icono y mensaje |
| Altura de un botón | `py-button-padding-y-md leading-button-line-height-md` | Si el texto crece, el botón crece con él |

**❌ Incorrecto**

| Elemento | Cómo | Por qué falla |
|---|---|---|
| Texto de ayuda en gris claro | gray.400 sobre gray.50 | 2,5:1: casi no se lee |
| Borde de un campo con el gris de los separadores | `color.border.neutral` (gray.300) sobre gray.50 | 1,4:1: no se ve dónde escribir |
| Texto en un tono claro de la marca | brand.400 sobre gray.50 | 1,9:1: bonito, pero ilegible |
| Un estado marcado con un punto de color | `<span className="size-2 rounded-full bg-background-danger" />` | Solo color: ¿qué significa el punto rojo? |
| Un medicamento en verde "porque está tomado" | `<p className="text-text-success">Ibuprofeno</p>` | Quien no ve el verde no lo sabe |
| Un botón de altura fija | `<button className="h-10 overflow-hidden text-[16px]">` | Altura fija y `px`: al ampliar, el texto se corta |

**☑️ Checklist**
- [ ] Todo texto tiene 4,5:1 o más con su fondo, también en hover, desactivado y error.
- [ ] Los iconos con significado, los bordes de campos y el anillo de foco tienen 3:1 o más.
- [ ] El contraste se comprueba con el fondo real donde se usa, no sobre blanco.
- [ ] Los colores salen de tokens semánticos con contraste ya comprobado (página **Fundamentos → Semánticos** de Storybook, columna "Contraste").
- [ ] Cada estado (error, aviso, éxito, información) tiene texto o icono además del color. Si quito el color (pantalla en grises), la pantalla dice lo mismo.
- [ ] Con el zoom del navegador al 200 % (`Cmd +` varias veces) todo se lee y se usa: nada se corta ni se solapa.
- [ ] Ningún contenedor con texto tiene altura fija, y los tamaños salen de tokens en `rem`.

---

## 2. Navegación por teclado

**Qué es.** Muchas personas no usan ratón: personas con movilidad reducida, con temblores, que usan un lector de pantalla o que simplemente navegan más rápido con el teclado. Para ellas, **lo que no funciona con el teclado no existe**.

**La regla:**
- **Todo lo que se usa con el ratón se usa con el teclado:**
  - **Tab** avanza al siguiente elemento (y **Mayús + Tab** retrocede);
  - **Enter** activa botones y enlaces;
  - **Espacio** activa botones y marca casillas;
  - **Esc** cierra ventanas, menús y avisos.
- **El orden es lógico:** el foco recorre la pantalla en el mismo orden en que se lee, de arriba abajo y de izquierda a derecha.
- **El foco siempre se ve**, con un **anillo doble**:
  - **por dentro, un anillo de color** (`color.border.focus`);
  - **por fuera, un anillo claro** (`color.border.focus.inverted`).

  Así pasa 3:1 sobre cualquier fondo. En fondos claros destaca el anillo de color (4,7:1 sobre gray.50), y en fondos oscuros o de color destaca el blanco (17,8:1 sobre gray.900).

**✅ Correcto**

```tsx
// Un botón de verdad: recibe el foco con Tab y se activa con Enter y Espacio sin hacer nada más.
<Button onClick={guardar}>Guardar cita</Button>
```

```tsx
// En solaris-ds el anillo doble es una clase generada desde los tokens: focus-ring-button, focus-ring-input…
// Junta el color del foco, el anillo claro exterior y el grosor del componente.
<button className="… focus-visible:focus-ring-button">Guardar cita</button>
```

**❌ Incorrecto**

```tsx
// Un div que parece un botón: no recibe el foco con Tab ni responde a Enter.
<div className="…" onClick={guardar}>Guardar cita</div>
```

```css
/* Quitar el foco "porque queda feo": quien usa el teclado se queda a ciegas. */
button:focus { outline: none; }
```

```tsx
// Cambiar el orden con tabIndex positivo: el foco salta de forma imprevisible.
<input tabIndex={3} /> <input tabIndex={1} />
```

**☑️ Checklist**
- [ ] Puedo recorrer toda la pantalla solo con Tab y Mayús + Tab.
- [ ] El orden del foco sigue el orden de lectura.
- [ ] Siempre veo dónde está el foco, con el anillo doble, sobre cualquier fondo.
- [ ] Enter y Espacio activan botones; Esc cierra lo que se abre encima (ventanas, menús).
- [ ] Ningún elemento atrapa el foco (puedo salir de él con el teclado).
- [ ] Uso elementos nativos (`button`, `a`, `input`) en lugar de `div` con `onClick`.
- [ ] La historia **Teclado** del componente pasa en Storybook (panel **Interactions**, en verde). Recorre sus partes interactivas con Tab y comprueba que el anillo doble se ve. Un componente nuevo con partes interactivas añade la suya.

---

## 3. Nombre accesible

**Qué es.** El nombre que **un lector de pantalla dice en voz alta** cuando llega a un elemento: "Guardar cita, botón" o "Correo, campo de texto". Sin nombre, solo dice "botón" o "campo de texto", y la persona no sabe para qué sirve.

**La regla:** cada componente interactivo tiene un nombre, que sale de una de estas tres fuentes, por orden de preferencia:
1. **Su texto visible:** el texto de un botón o de un enlace.
2. **Su etiqueta:** el `label` de un campo. En `Input` es obligatorio.
3. **Un `aria-label`**, solo cuando no hay texto visible, como en un botón que solo tiene un icono.

**✅ Correcto**

```tsx
<Button icon={IconPlus}>Añadir cita</Button>                // nombre: "Añadir cita"
<Input label="Correo" placeholder="nombre@correo.com" />    // nombre: "Correo"
<Button icon={IconTrash} variant="danger" aria-label="Borrar nota" />  // solo icono: nombre "Borrar nota"
```

**❌ Incorrecto**

```tsx
<Button icon={IconTrash} variant="danger" />          // solo icono y sin aria-label: el lector dice "botón"
<input placeholder="Correo" />                         // el placeholder desaparece al escribir y no es una etiqueta
<Button>Haz clic aquí</Button>                         // tiene nombre, pero no dice qué hace
```

**☑️ Checklist**
- [ ] Cada botón, enlace y campo tiene un nombre.
- [ ] Los campos usan `label` (en `Input`, la prop `label`), nunca solo el placeholder.
- [ ] Los botones de solo icono llevan `aria-label`.
- [ ] El nombre dice qué hace el elemento ("Borrar nota"), no cómo se usa ("Haz clic aquí").
- [ ] Si el texto visible y el `aria-label` existen a la vez, dicen lo mismo.

---

## 4. Lectura con lector de pantalla

**Qué es.** Un lector de pantalla (VoiceOver en Mac e iPhone, TalkBack en Android, NVDA en Windows) lee la página en voz alta. Muchas personas navegan **saltando de encabezado en encabezado**, como quien ojea un índice. Y como no ven las imágenes ni los iconos, necesitan su texto.

**La regla:**
- **Los encabezados van en orden:** un `h1` por pantalla, `h2` para las secciones y `h3` dentro de ellas, sin saltarse niveles. El nivel lo marca la estructura, no el tamaño de letra. Por eso `Card` tiene la prop `headingLevel`: su título es un `h3` por defecto, pero se cambia según dónde esté la tarjeta, sin que cambie su aspecto.
- **Cada icono o imagen con significado tiene texto alternativo.**
- **Los decorativos se ocultan**, para que el lector no los lea:
  - iconos con `aria-hidden="true"`;
  - imágenes con `alt=""`.

**✅ Correcto**

```tsx
<h1>Mi medicación</h1>
  <h2>Tomas de hoy</h2>
    <Card title="Ibuprofeno 600 mg" />                   {/* h3, el nivel por defecto */}

<h1>Mi medicación</h1>
  <Card title="Ibuprofeno 600 mg" headingLevel={2} />    {/* directamente bajo el h1: h2 */}

<Button icon={IconPlus}>Añadir cita</Button>   {/* el icono es decorativo: el componente lo oculta solo */}
<img src="radiografia.png" alt="Radiografía de tórax del 12 de marzo, sin hallazgos" />
<img src="adorno.svg" alt="" />                {/* decorativa */}
```

**❌ Incorrecto**

```tsx
<h1>Mi medicación</h1>
<h3>Tomas de hoy</h3>                          {/* salta del h1 al h3 */}
<h1>Mi medicación</h1>
<Card title="Ibuprofeno 600 mg" />             {/* bajo un h1, el título queda en h3: falta headingLevel={2} */}
<p className="text-heading">Citas</p>          {/* parece un título, pero el lector no lo encuentra como tal */}

<IconAlertCircle />                            {/* icono de aviso sin texto: el lector no dice nada, o dice "imagen" */}
<img src="radiografia.png" />                  {/* sin alt: el lector lee el nombre del archivo */}
```

**☑️ Checklist**
- [ ] Hay un solo `h1` por pantalla y los niveles no se saltan.
- [ ] Lo que parece un título es un encabezado (`h1`–`h3`), no solo un texto grande.
- [ ] Cada `Card` con título tiene el `headingLevel` que le toca según dónde está.
- [ ] Cada icono o imagen con significado tiene texto alternativo (o un texto visible al lado que dice lo mismo).
- [ ] Los iconos decorativos llevan `aria-hidden="true"` y las imágenes decorativas, `alt=""`.
- [ ] Al escucharla con VoiceOver (`Cmd + F5` en Mac), la pantalla se entiende sin verla.

---

## Lo que no se cubre

Estos criterios de accesibilidad **no forman parte de las cuatro reglas de este documento**. Eso no significa que no importen: quedan fuera del alcance actual de solaris-ds y se pueden añadir más adelante con un ADR.

| Criterio | Qué es | Nota |
|---|---|---|
| **Zona táctil mínima** | Que lo que se pulsa con el dedo tenga un área suficiente (WCAG pide 24 × 24 px) para no tocar lo de al lado por error | |
| **Pantallas estrechas sin scroll horizontal** | Que en una pantalla de 320 px de ancho (o con zoom al 400 %) el contenido se reorganice en una columna sin desplazarse hacia el lado | |
| **Movimiento reducido** | Respetar la opción del sistema "reducir movimiento": quitar animaciones y efectos para quien se marea con ellos | |
| **Tiempo suficiente** | Que nada caduque deprisa (sesiones, avisos que desaparecen) sin poder pedir más tiempo | |
| **Subtítulos y transcripciones** | Texto para el audio y el vídeo, por ejemplo en las consultas grabadas | |
| **Idioma de la página** | Indicar el idioma para que el lector de pantalla pronuncie bien | `index.html` ya tiene `lang="es"` |
| **Lenguaje sencillo** | Textos claros, frases cortas y sin jerga médica innecesaria | |
| **Sin destellos** | Nada que parpadee más de tres veces por segundo, porque puede provocar crisis epilépticas | |
| **Ayuda con los errores** | Explicar qué ha fallado y cómo arreglarlo, no solo marcar el error | `Input` ya muestra el mensaje con su prop `error`, pero no hay una regla para redactarlo |
