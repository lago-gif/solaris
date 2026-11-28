// Preparación de los tests de lógica (npm test). Se ejecuta antes de cada archivo *.test.tsx.
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Vacía la pantalla simulada después de cada test, para que no se mezclen.
afterEach(cleanup)

// jsdom (el navegador simulado de los tests) no sabe abrir ni cerrar un <dialog>.
// Esta versión mínima solo cambia el atributo open y avisa con el evento close, como el navegador.
// El foco y la tecla Esc reales se prueban en Storybook (historia Teclado de Dialog).
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
