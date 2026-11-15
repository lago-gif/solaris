# ADR-001 · Alcance y principios

| | |
|---|---|
| **Estado** | Aceptado |
| **Fecha** | 15 de noviembre de 2026 |
| **Autor** | lago-gif |
| **Decide** | lago-gif |

## Estado

**Aceptado.** Esta decisión se aplica a todo el trabajo nuevo en solaris-ds desde su fusión en `main`. Para cambiarla, se escribe un ADR nuevo que la sustituya. Este archivo no se edita para cambiar lo decidido.

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
| **Primitivo** | El valor bruto: la paleta y las escalas por defecto de Tailwind | `blue-700`, `rounded-lg`, `text-sm` | **Solo** la definición de tokens semánticos en `@theme` (`src/index.css`) |
| **Semántico** | El valor con significado, por su uso | `primary`, `danger`, `surface`, `border`, `text-muted` | Componentes y pantallas |

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

Cada principio se puede comprobar con una prueba concreta.

| # | Principio | Cómo se comprueba |
|---|---|---|
| **1** | **Todo valor visual sale de un token semántico.** Ningún componente ni pantalla escribe colores, radios, tamaños de texto, sombras ni tamaños de icono a mano | Buscar en `src/components/` y `src/screens/` colores de la paleta (`blue-700`, `gray-200`…), hex (`#1d4ed8`), `px` y valores entre corchetes (`[80%]`). **Resultado esperado: 0** |
| **2** | **Toda pieza visual de una pantalla es un componente de `src/components/`**, con su historia en Storybook y su fila ✅ en `docs/componentes.md`. Las pantallas solo colocan componentes: usan clases de distribución (flex, grid y espaciado con tokens) y nunca de aspecto (color, radio, tipografía o borde) | Cada `.tsx` de `src/components/` tiene su `.stories.tsx` y su fila en `docs/componentes.md`. Las pantallas no contienen clases de aspecto. **Resultado esperado: 0 piezas sin componente** |
| **3** | **Una sola convención de nombres**: `variant` para el estilo, `tone` para el significado, `size` con `sm`/`md`/`lg`, y `danger` para peligro | Revisar las props de cada componente nuevo en la PR. **Resultado esperado: ningún sinónimo** (`color`, `status`, `kind`, `error` como tono, `destructive`…) |
| **4** | **Todo componente cumple WCAG 2.2 AA**: contraste de 4,5:1 en texto y 3:1 en bordes e iconos, foco visible, uso completo con teclado y etiqueta en cada campo | Revisión de accesibilidad de cada historia en Storybook. **Resultado esperado: 0 fallos** |
| **5** | **Seguridad en salud**: el color nunca va solo (todo `tone` lleva texto o icono), la IA siempre se identifica y avisa de que no sustituye al personal sanitario, las acciones que borran usan `danger`, y grabar o compartir datos siempre se muestra y se confirma | Revisión de la PR. Ningún `tone` sin texto, toda pantalla con IA muestra el aviso y ningún botón de borrar usa otra variante que `danger`. **Resultado esperado: 0 excepciones** |

## Consecuencias

### Lo que ganamos

- **Coherencia:** el mismo significado tiene siempre el mismo valor, por ejemplo un único rojo de peligro.
- **Un solo sitio para cambiar:** cambiar un color o un radio se hace en `@theme` y llega a toda la app.
- **Agentes más fiables:** con nombres estándar y tokens con significado, un agente (Claude, Dust…) acierta más sin necesidad de explicaciones.
- **Comprobable:** los cinco principios se pueden revisar en cada PR, y más adelante con evals automáticos.

### Lo que cuesta

- **Más trabajo al empezar:** hay que definir los tokens y migrar los componentes antes de seguir creando pantallas.
- **Pantallas más lentas al principio:** si falta un componente, hay que crearlo con su historia antes de usarlo en la pantalla.
- **Revisión más estricta de las PR:** cada PR se revisa contra los cinco principios.

### Próximos pasos

1. **ADR-002 · Tokens:** definir los tokens semánticos (color, espaciado, radio, tipografía, sombra e iconos) en `@theme`.
2. **Migrar los cuatro componentes** (Button, Input, Card y Badge) a los tokens semánticos y unificar los tamaños de icono.
3. **Crear los componentes que faltan** según la auditoría: aviso (Alert), Avatar y mensaje de chat.
4. **Añadir la revisión de accesibilidad automática** en Storybook (el complemento a11y), para comprobar el principio 4.
5. **Referenciar este ADR desde `AGENTS.md`**, para que los agentes lo lean antes de cada tarea.

### Lo que no cambia

- **La rama `antes`** sigue congelada como foto del design system antes de estas reglas.
- **`src/screens/antes.tsx`** no se corrige: se mantiene como ejemplo de lo que este ADR quiere evitar.
