# Estado de los componentes

| Componente | Storybook | Solo tokens |
|---|---|---|
| Button | ✅ | ✅ |
| Input | ✅ | ✅ |
| Card | ✅ | ✅ |
| Badge | ✅ | ✅ |

- **Storybook:** el componente tiene historia.
- **Solo tokens:** todos sus colores, espaciados, bordes, radios, tipografía y sombras salen de sus tokens de componente (`bg-button-background-brand`, `px-button-padding-x-md`…), sin valores de la paleta ni de las escalas de Tailwind (`bg-blue-700`, `p-4`, `rounded-lg`…). La tabla de clases está en `docs/tokens.md`.
