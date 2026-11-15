// Tipos de scripts/token-names.mjs, para usarlo desde TypeScript (Storybook).
export function segments(path: string): string[]
export function cssVar(path: string): string
export function classFor(path: string, type: string): string
export function tailwindFor(
  path: string,
  type: string,
): { theme: [string, string][]; utility: [string, string][] | null; classes: string[] } | null
export function typographyStyle(style: string): { theme: [string, string][]; classes: string[] }
