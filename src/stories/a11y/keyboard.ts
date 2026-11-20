import { expect } from 'storybook/test'

// Comprobaciones comunes de las pruebas de teclado (docs/accesibilidad.md, regla 2).

/**
 * Comprueba que el elemento con el foco muestra el anillo doble:
 * un hueco claro, el anillo de color (token de foco) y el anillo claro exterior.
 * Si el foco está en un campo, el anillo lo pinta su caja (el elemento padre).
 */
export async function expectFocusRingVisible(focused: Element | null, ringOn: 'self' | 'parent' = 'self') {
  await expect(focused).not.toBeNull()
  const target = ringOn === 'parent' ? focused!.parentElement! : focused!
  const shadow = getComputedStyle(target).boxShadow
  // Tres capas de sombra = hueco, anillo de color y anillo claro.
  const layers = shadow === 'none' ? 0 : shadow.split(/,(?![^(]*\))/).length
  await expect(layers, `el foco no se ve en "${focused!.textContent?.trim() || focused!.getAttribute('aria-label') || focused!.tagName}"`).toBe(3)
}

/** El elemento activo del documento de la historia. */
export const active = (canvasElement: HTMLElement) => canvasElement.ownerDocument.activeElement
