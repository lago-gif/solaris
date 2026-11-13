# AGENTS.md

Manual de trabajo para agentes de IA en este repositorio. Léelo entero antes de cada tarea.

## Qué es

**solaris-ds** es el design system de **solaris-app**, una app de salud personal. En su portal, cada persona ve:

- sus recetas y la medicación que tiene que tomar;
- los análisis y chequeos que se ha hecho en el año;
- sus citas (médico, dentista, oftalmólogo…).

También puede grabar consultas y tomar notas, hablar con un agente de IA sobre cómo se siente, ponerse objetivos de revisiones anuales (vista, dientes, medicina general) y seguirlo todo en un panel de datos y métricas.

solaris-ds aporta los tokens, componentes y patrones con los que se construye esa app. Más contexto en el [README](./README.md).

Ten siempre presente que son **datos de salud** y que la usan personas de cualquier edad y soltura digital:
- La accesibilidad (WCAG 2.2 AA) es obligatoria en todo componente: contraste, foco visible, teclado, lector de pantalla y texto ampliado.
- Los estados de salud nunca se comunican solo con color: siempre con texto o icono además.
- La UI del agente de IA deja claro que habla una IA y que no sustituye al personal sanitario.
- Grabar, guardar o compartir datos siempre se muestra y se confirma.

## Tecnología

| Qué | Con qué |
|---|---|
| Componentes | **React** con **TypeScript** |
| Desarrollo y compilación | **Vite** |
| Estilos | **Tailwind CSS** |
| Iconos | **Tabler Icons** (`@tabler/icons-react`) |
| Librerías de componentes | **Ninguna**: los componentes se crean desde cero |

Reglas:
- **No instales librerías de componentes ni de UI** (MUI, Chakra, shadcn/ui, Radix, Headless UI, Ant Design, etc.). Si crees que hace falta una, pregunta antes.
- **Iconos solo de Tabler Icons.** No mezcles otros sets ni pegues SVG sueltos si existe el icono en Tabler.
- **Estilos solo con Tailwind**, usando los tokens del sistema (colores, espaciado, tipografía) definidos en su configuración. Nada de valores sueltos (`#3a7bd5`, `13px`) si existe un token.
- **TypeScript estricto**: tipa las props de cada componente y no uses `any`.

## Cómo trabajamos

- **Idioma:** responde, comenta y escribe documentación en **español**.
- **Siempre en una rama con PR.** No subas cambios directamente a `main`. Crea una rama, haz los commits ahí y abre una pull request.
- **Explica los cambios sin jerga**, tanto en la descripción de la PR como al resumir el trabajo: qué ha cambiado, por qué y cómo se nota (por ejemplo, "el botón ahora se ve con foco al navegar con teclado"). Si un término técnico es inevitable, explícalo en una frase.
- **Si cambias `package.json`, actualiza `package-lock.json` en la misma PR.** Instala o actualiza dependencias con `npm install` para que el lock se regenere, y sube los dos archivos juntos.
