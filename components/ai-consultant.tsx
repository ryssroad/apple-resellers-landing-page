'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'

export function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const quickQuestions = [
    'iPhone до 600,000 ₸',
    'MacBook для работы',
    'Наушники с шумодавом',
  ]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-button flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Открыть консультанта"
      >
        <MessageCircle className="w-6 h-6 text-neutral-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </button>

      {/* Chat window */}
      {isOpen && (
      <div
        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-48px)] max-w-[380px] transition-all duration-300 origin-bottom-right"
      >
        <div className="glass-menu rounded-3xl overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">AI Консультант</h3>
                <p className="text-xs text-neutral-500">Помогу выбрать устройство</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-neutral-600 text-sm mb-4">
                  Привет! Помогу подобрать технику Apple под ваш бюджет.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        sendMessage({ text: q })
                      }}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/60 hover:bg-white/80 border border-white/40 text-neutral-700 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-md'
                      : 'bg-white/70 text-neutral-800 rounded-bl-md border border-white/40'
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return <span key={index}>{part.text}</span>
                    }
                    return null
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/70 text-neutral-800 rounded-2xl rounded-bl-md border border-white/40 px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ваш вопрос..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-full bg-white/60 border border-white/40 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/30 disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="icon"
                className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      )}
    </>
  )
}
