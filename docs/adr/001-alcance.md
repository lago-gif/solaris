# ADR-001 · Alcance y principios

| | |
|---|---|
| **Estado** | Aceptado |
| **Fecha** | 15 de noviembre de 2026 |
| **Autor** | lago-gif |
| **Decide** | lago-gif |

## Estado

**Aceptado** el 15 de noviembre de 2026, una vez comprobado que los cinco principios se pueden verificar revisando el código o mirándolo en Storybook (ver "Cómo se comprobará cada principio").

Esta decisión se aplica a todo el trabajo nuevo en solaris-ds. Para cambiarla, se escribe un ADR nuevo que la sustituya; este archivo no se edita para cambiar lo decidido.

> **Corrección puntual (15 de noviembre de 2026):** al crear `tokens/tokens.json`, se actualiza este ADR para nombrarlo como la fuente de los tokens, en lugar de `@theme` (`src/index.css`). Es una excepción a la regla anterior, aprobada por lago-gif, porque no cambia ninguna decisión: solo dice dónde viven los tokens. Cualquier otro cambio requiere un ADR nuevo.

## Contexto

**solaris-ds** es el design system de **solaris-app**, una app de salud personal:
- **Qué ve cada persona en su portal:** sus recetas y medicación, sus análisis y chequeos, sus citas, consultas grabadas con notas, un agente de IA para hablar de cómo se siente, objetivos de revisiones anuales y un panel de datos y métricas.
- **Cómo está hecho:** web en React con TypeScript, componentes propios sin librerías de componentes, Tailwind CSS para los estilos e iconos de Tabler Icons.
- **Para quién:** personas de cualquier edad y soltura digital, que manejan **datos de salud** y a veces están preocupadas.

La auditoría de `docs/audit.md` muestra que, **sin reglas**, el sistema ya se está fragmentando:

| Hallazgo | Dato | Sección de la auditoría |
|---|---|---|
| No hay tokens propios | El bloque `@theme` está vacío. 23 líneas de los componentes y 17 de la pantalla del asistente usan colores de la paleta de Tailwind escritos a mano | 3 y 5.1 |
| El mismo significado tiene valores distintos | El azul de acción es `blue-700` y `blue-600`. El rojo de error es `red-700` y `red-800`. Hay 4 grises distintos para bordes | 3 |
| Aparecen valores nuevos en cada pantalla | La pantalla del asistente añadió `text-xl`, `rounded-2xl`, un icono de 18 px y dos grises que ningún componente usaba | 5.1 |
| Lo que falta se copia | El aviso, el avatar y la burbuja de chat se hicieron a mano copiando estilos de Badge, Card y Button | 5.2 |
| Cada pieza nombra el aspecto a su manera | `variant` (Button), `tone` (Badge), `author` (pantalla). `danger` en Button y Badge, pero `error` en Input | 4 y 5.3 |
| Los iconos no siguen una escala | 6 tamaños (14, 16, 18, 20, 22 y 24 px) y 2 grosores | 3 y 5.1 |

Si cada persona o agente decide estos valores por su cuenta, solaris-app acabará con estilos incoherentes. También será más difícil garantizar la accesibilidad y no se podrá cambiar un color o un tamaño desde un solo sitio.

## Decisión

### Alcance

| Dentro | Fuera (de momento) |
|---|---|
| La web de solaris-app en React y TypeScript | Apps nativas (iOS y Android) |
| Una sola marca | Multi-marca |
| Tema claro | Tema oscuro |
| Componentes en `src/components/`, documentados en Storybook | Emails y documentos impresos |
| Pantallas en `src/screens/` | Librerías de componentes externas (MUI, shadcn/ui, Radix…) |

Ampliar el alcance, por ejemplo con tema oscuro o apps nativas, requiere un ADR nuevo.

### Tokens: dos niveles, y solo se usan los semánticos

Se sigue el modelo de dos niveles que usan la mayoría de design systems y el formato del W3C Design Tokens Community Group:

| Nivel | Qué es | Ejemplo | Quién lo puede usar |
|---|---|---|---|
| **Primitivo** | El valor bruto: la paleta y las escalas de Tailwind, más la escala de marca y la tipografía. Viven en `tokens/tokens.json` (formato DTCG) | `color.gray.700`, `radius.200`, `font-size.sm` | **Solo** la definición de tokens semánticos |
| **Semántico** | El valor con significado, por su uso | `primary`, `danger`, `surface`, `border`, `text-muted` | Componentes y pantallas |

**`tokens/tokens.json` es la única fuente de los tokens.** El bloque `@theme` de `src/index.css` se genera a partir de él para que Tailwind pueda usarlos; no se escriben valores a mano en `@theme`.

Los nombres exactos de los tokens semánticos se fijarán en un ADR posterior.

### Nombres: una convención única

Se usa la convención más extendida en design systems de React:

| Prop | Para qué | Valores |
|---|---|---|
| `variant` | El **estilo visual** de una pieza | Por ejemplo, en Button: `primary`, `secondary`, `ghost`, `danger` |
| `tone` | El **significado** de un estado | `neutral`, `info`, `success`, `warning`, `danger` |
| `size` | El **tamaño** | `sm`, `md`, `lg` (y solo los que existan en cada componente) |

Reglas:
- **`danger`**, nunca `error`, `critical` ni `destructive`, para todo lo que signifique peligro, error o acción irreversible. `error` solo se usa como nombre del **texto** de validación de un campo de formulario (la prop `error` de Input).
- **Los valores de las props van en inglés**; la documentación va en español.
- **Los iconos usan la escala de tamaños** `sm` = 16 px, `md` = 20 px y `lg` = 24 px, con un único grosor de trazo.

### Gobierno

- **Quién aprueba:** lago-gif aprueba cada componente nuevo y cada cambio de token.
- **Cómo se trabaja:** todo cambio entra por una rama con PR, como indica `AGENTS.md`.

### Principios

| # | Principio |
|---|---|
| **1** | **Todo valor visual sale de un token semántico.** Ningún archivo de `src/components/` ni de `src/screens/` contiene colores de la paleta de Tailwind (`blue-700`, `gray-200`…), colores hex (`#1d4ed8`), medidas escritas en píxeles (`13px`) ni valores entre corchetes en las clases (`max-w-[80%]`). Los tamaños de icono también salen de la escala de tokens |
| **2** | **Toda pieza visual de una pantalla es un componente de `src/components/`.** Cada componente tiene su archivo `.stories.tsx`, aparece en Storybook bajo **Componentes** y tiene su fila ✅ en `docs/componentes.md`. Los archivos de `src/screens/` solo usan clases de distribución (`flex`, `grid`, `gap`, `p`, `m`, `w`, `h` con tokens de espaciado) y ninguna de aspecto (`bg-`, `text-` de color o tamaño, `border-` de color, `rounded-`, `shadow-`, `font-`) |
| **3** | **Solo tres props cambian el aspecto de un componente: `variant`, `tone` y `size`.** `tone` solo admite `neutral`, `info`, `success`, `warning` y `danger`. `size` solo admite `sm`, `md` y `lg`. Ninguna prop ni valor se llama `color`, `status`, `kind`, `appearance`, `intent`, `error` (como tono), `critical` ni `destructive` |
| **4** | **Accesibilidad (criterios de WCAG 2.2 AA):** (a) todo elemento interactivo se alcanza y se usa con el teclado (Tab, Enter y Espacio); (b) al recibir el foco muestra un contorno visible; (c) todo campo de formulario tiene una etiqueta visible; (d) el texto tiene un contraste de al menos 4,5:1 con su fondo, y los bordes de campos e iconos con significado, de al menos 3:1 |
| **5** | **Seguridad en salud:** (a) todo `tone` lleva texto, y el componente no se puede usar sin él; (b) toda pantalla con respuestas de IA muestra de forma permanente el aviso de que es una IA y no sustituye al personal sanitario; (c) todo botón que borra datos usa `variant="danger"`; (d) grabar, compartir o borrar datos de salud pide confirmación antes de hacerlo, y mientras se graba hay un indicador visible |

### Cómo se comprobará cada principio

| # | Principio | Cómo se comprueba | Qué mirar | Resultado esperado |
|---|---|---|---|---|
| **1** | Todo valor visual sale de un token | **Revisando el código** | Buscar en `src/components/` y `src/screens/` nombres de la paleta (`red-`, `blue-`, `gray-`…), `#` seguido de un color, un número seguido de `px` (`13px`) y `-[` (valor entre corchetes en una clase). Comprobar que los `size=` de los iconos usan la escala | **0 resultados** |
| **2** | Toda pieza visual es un componente | **Revisando el código** y **mirándolo en Storybook** | Código: cada `X.tsx` de `src/components/` tiene su `X.stories.tsx`, y las pantallas no tienen clases de aspecto. Storybook: el componente aparece en **Componentes**, y la página **Status** lo muestra con ✅ | **0 componentes sin historia, 0 clases de aspecto en pantallas** |
| **3** | Solo `variant`, `tone` y `size` | **Revisando el código** | Los tipos de las props de cada componente: nombres permitidos y valores de `tone` y `size` | **0 props o valores fuera de la lista** |
| **4** | Accesibilidad | **Mirándolo en Storybook** (a, b, d) y **revisando el código** (c) | Storybook: recorrer cada historia solo con el teclado y comprobar el foco; medir con un comprobador de contraste los colores de cada variante y tono. Código: `label` es obligatoria en los campos | **0 elementos sin teclado o sin foco, 0 contrastes por debajo del mínimo, 0 campos sin etiqueta** |
| **5** | Seguridad en salud | **Revisando el código** (a, c) y **mirándolo en Storybook** (b, d) | Código: `children` es obligatorio en los componentes con `tone`, y los botones de borrar usan `variant="danger"`. Storybook: las historias y pantallas con IA muestran el aviso; grabar, compartir y borrar abren una confirmación | **0 excepciones** |

## Consecuencias

### Lo que ganamos

- **Coherencia:** el mismo significado tiene siempre el mismo valor, por ejemplo un único rojo de peligro.
- **Un solo sitio para cambiar:** cambiar un color o un radio se hace en `tokens/tokens.json` y llega a toda la app.
- **Agentes más fiables:** con nombres estándar y tokens con significado, un agente (Claude, Dust…) acierta más sin necesidad de explicaciones.
- **Comprobable:** los cinco principios se pueden revisar en cada PR, y más adelante con evals automáticos.

### Lo que cuesta

- **Más trabajo al empezar:** hay que definir los tokens y migrar los componentes antes de seguir creando pantallas.
- **Pantallas más lentas al principio:** si falta un componente, hay que crearlo con su historia antes de usarlo en la pantalla.
- **Revisión más estricta de las PR:** cada PR se revisa contra los cinco principios.

### Próximos pasos

1. **ADR-002 · Tokens:** definir los tokens semánticos (color, espaciado, radio, tipografía, sombra e iconos) en `tokens/tokens.json`, y generar a partir de él el bloque `@theme` que usa Tailwind.
2. **Migrar los cuatro componentes** (Button, Input, Card y Badge) a los tokens semánticos y unificar los tamaños de icono.
3. **Crear los componentes que faltan** según la auditoría: aviso (Alert), Avatar y mensaje de chat.
4. **Añadir la revisión de accesibilidad automática** en Storybook (el complemento a11y), para comprobar el principio 4.
5. **Referenciar este ADR desde `AGENTS.md`**, para que los agentes lo lean antes de cada tarea.

### Lo que no cambia

- **La rama `antes`** sigue congelada como foto del design system antes de estas reglas.
- **`src/screens/antes.tsx`** no se corrige: se mantiene como ejemplo de lo que este ADR quiere evitar.
