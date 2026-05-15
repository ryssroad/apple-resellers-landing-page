import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 30

const systemPrompt = `Ты — консультант Apple iRoom. Помогай клиентам выбрать устройство Apple.

ПРАВИЛА:
- Отвечай ОЧЕНЬ кратко, максимум 2-3 предложения
- Рекомендуй конкретные модели из ассортимента 2026 года
- Всегда учитывай бюджет клиента
- Цены в тенге (KZT)

АССОРТИМЕНТ И ЦЕНЫ:
iPhone:
- iPhone 17 Pro Max: 899,990 ₸ (флагман, титан, 48МП камера, A19 Pro)
- iPhone 17 Pro: 749,990 ₸ (компактный Pro)
- iPhone 17: 549,990 ₸ (оптимальный выбор)

Mac:
- MacBook Pro 16" M5 Pro: 1,475,800 ₸ (для профи)
- MacBook Pro 14" M5 Pro: 1,199,990 ₸ (мощный и портативный)
- MacBook Air 15" M5: 784,900 ₸ (большой экран)
- MacBook Air 13" M4: 524,990 ₸ (самый популярный)

iPad:
- iPad Pro 13" M5: 795,990 ₸ (OLED, для работы)
- iPad Air 11" M4: 449,990 ₸ (универсальный)
- iPad 10: 269,990 ₸ (базовый)

Watch:
- Apple Watch Ultra 3: 549,990 ₸ (экстрим)
- Apple Watch Series 10: 349,990 ₸ (для всех)

AirPods:
- AirPods Pro 3: 189,990 ₸ (шумоподавление)
- AirPods 4: 129,990 ₸ (открытый дизайн)
- AirPods Max 2: 399,990 ₸ (Hi-Fi)

Если клиент называет бюджет — рекомендуй лучший вариант в рамках бюджета.
Не извиняйся, не лей воду. Сразу по делу.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 150,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
