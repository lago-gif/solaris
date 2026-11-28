import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { IconInfoCircle, IconMessageChatbot, IconSend, IconSparkles, IconTrash, IconUser } from '@tabler/icons-react'
import { Badge, Button, Card, Input } from '@/components'

/** Nombre que aparece en el menú. */
export const title = 'Asistente (antes)'

type Message = {
  id: number
  author: 'user' | 'assistant'
  text: string
  time: string
}

const suggestions = ['Hoy me noto muy cansado', '¿Cuándo es mi próxima cita?', 'Quiero preparar mi revisión de la vista']

// Respuesta simulada: esta pantalla todavía no está conectada a un agente real.
function fakeReply(text: string) {
  return `He anotado: «${text}». Lo tendré en cuenta para tu próxima consulta. Si te encuentras mal o es urgente, contacta con tu centro de salud o llama al 112.`
}

function now() {
  return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}

export default function Antes() {
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  function send(text: string) {
    const clean = text.trim()
    if (!clean) return
    const time = now()
    setMessages((current) => [
      ...current,
      { id: current.length + 1, author: 'user', text: clean, time },
      { id: current.length + 2, author: 'assistant', text: fakeReply(clean), time },
    ])
    setDraft('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    send(draft)
  }

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Asistente</h1>
          <Badge variant="info" size="sm" iconStart={IconSparkles}>
            IA
          </Badge>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" iconStart={IconTrash} onClick={() => setMessages([])}>
            Borrar conversación
          </Button>
        )}
      </header>

      <p className="flex items-start gap-2 bg-blue-50 px-4 py-2 text-sm text-blue-800">
        <IconInfoCircle size={18} stroke={2} aria-hidden="true" className="mt-0.5 shrink-0" />
        Hablas con un asistente de IA. Te ayuda a ordenar cómo te sientes, pero no sustituye a tu médico.
      </p>

      <section aria-label="Historial de mensajes" className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <Card
            iconStart={IconMessageChatbot}
            title="¿Cómo te encuentras hoy?"
            description="Cuéntame cómo te sientes o pregúntame por tus citas y revisiones."
            className="mx-auto max-w-md"
            footer={suggestions.map((suggestion) => (
              <Button key={suggestion} variant="secondary" size="sm" onClick={() => send(suggestion)}>
                {suggestion}
              </Button>
            ))}
          />
        ) : (
          <ol className="flex flex-col gap-4" aria-live="polite">
            {messages.map((message) => {
              const isUser = message.author === 'user'
              return (
                <li key={message.id} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                      isUser ? 'bg-gray-200 text-gray-700' : 'bg-blue-50 text-blue-700'
                    }`}
                    aria-hidden="true"
                  >
                    {isUser ? <IconUser size={18} stroke={1.75} /> : <IconMessageChatbot size={18} stroke={1.75} />}
                  </span>
                  <div className={`flex max-w-lg flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
                    <span className="sr-only">{isUser ? 'Tú dijiste:' : 'El asistente dijo:'}</span>
                    <p
                      className={`rounded-2xl px-4 py-2 text-base ${
                        isUser ? 'bg-blue-700 text-white' : 'border border-gray-200 bg-white text-gray-900'
                      }`}
                    >
                      {message.text}
                    </p>
                    <span className="text-xs text-gray-600">{message.time}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        )}
        <div ref={endRef} />
      </section>

      <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-gray-200 bg-white px-4 py-4">
        <Input
          label="Escribe tu mensaje"
          placeholder="Por ejemplo: hoy me duele la cabeza"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          autoComplete="off"
          className="flex-1"
        />
        <Button type="submit" iconStart={IconSend} disabled={!draft.trim()}>
          Enviar
        </Button>
      </form>
    </div>
  )
}
