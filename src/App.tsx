import { useSyncExternalStore } from 'react'
import type { ComponentType } from 'react'
import TailwindPage from './TailwindPage'

// Índice de la app: un menú arriba y, debajo, la página que indica la dirección (#/...).
//
// Cada archivo de src/screens/ se añade solo al menú. Su dirección es el nombre
// del archivo: src/screens/antes.tsx → #/antes. Cada pantalla exporta su
// componente por defecto y, opcionalmente, `title` con el nombre del menú.

type ScreenModule = { default: ComponentType; title?: string }

type Page = { path: string; title: string; Component: ComponentType }

const screenModules = import.meta.glob<ScreenModule>('./screens/*.tsx', { eager: true })

const screens: Page[] = Object.entries(screenModules)
  .map(([file, module]) => {
    const name = file.replace('./screens/', '').replace('.tsx', '')
    return { path: `/${name}`, title: module.title ?? name, Component: module.default }
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'es'))

const pages: Page[] = [{ path: '/tailwind', title: 'Tailwind', Component: TailwindPage }, ...screens]

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getPath() {
  return window.location.hash.replace(/^#/, '') || pages[0].path
}

export default function App() {
  const path = useSyncExternalStore(subscribe, getPath)
  const current = pages.find((page) => page.path === path)

  return (
    <div className="flex h-dvh flex-col bg-white text-gray-900">
      <nav aria-label="Páginas" className="shrink-0 border-b border-gray-200 bg-gray-50">
        <ul className="flex flex-wrap items-center gap-1 px-4 py-2">
          <li className="mr-3 text-sm font-semibold">solaris-ds</li>
          {pages.map((page) => {
            const active = page.path === current?.path
            return (
              <li key={page.path}>
                <a
                  href={`#${page.path}`}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-full px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    active ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page.title}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/*
        La zona principal tiene su propio scroll: tabIndex={0} permite enfocarla con Tab
        y desplazarla con las flechas cuando la página no tiene nada más que reciba el foco
        (docs/accesibilidad.md, regla 2). El anillo usa los tokens de foco.
      */}
      <main
        tabIndex={0}
        className="min-h-0 flex-1 overflow-y-auto focus-visible:outline-width-focus focus-visible:outline-border-focus focus-visible:-outline-offset-2"
      >
        {current ? (
          <current.Component />
        ) : (
          <div className="mx-auto max-w-xl space-y-2 px-6 py-12">
            <h1 className="text-2xl font-semibold">Página no encontrada</h1>
            <p className="text-gray-600">
              No existe ninguna página en <code>#{path}</code>. Elige una en el menú de arriba.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
