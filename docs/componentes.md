# Estado de los componentes

| Componente | Storybook | Solo tokens | Accesibilidad | Contrato |
|---|---|---|---|---|
| Button | ✅ | ✅ | ✅ | ✅ |
| Input | ✅ | ✅ | ✅ | ✅ |
| Card | ✅ | ✅ | ✅ | ✅ |
| Badge | ✅ | ✅ | ✅ | ✅ |

- **Storybook:** el componente tiene historia.
- **Solo tokens:** todos sus colores, espaciados, bordes, radios, tipografía y sombras salen de sus tokens de componente (`bg-button-background-brand`, `px-button-padding-x-md`…), sin valores de la paleta ni de las escalas de Tailwind (`bg-blue-700`, `p-4`, `rounded-lg`…). La tabla de clases está en `docs/tokens.md`.
- **Accesibilidad:** el componente pasa las 4 reglas de `docs/accesibilidad.md`:
  1. **Contraste:** solo usa colores semánticos que pasan `npm run contrast`.
  2. **Teclado:** su historia **Teclado** pasa en Storybook (panel Interactions).
  3. **Nombre accesible** y 4. **Lectura con lector de pantalla:** el panel **Accessibility** de Storybook no marca fallos en ninguna de sus historias.
- **Contrato:** el componente tiene su ficha técnica en `contracts/` (por ejemplo, `contracts/button.json`), que cumple `contracts/contract.schema.json` y solo usa tokens que existen en `tokens/tokens.json`.
