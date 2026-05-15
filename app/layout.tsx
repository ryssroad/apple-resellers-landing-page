import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'iStore KZ - Авторизованный реселлер Apple в Казахстане',
  description: 'Официальная техника Apple в Казахстане. iPhone 17, MacBook Pro M5, iPad, Apple Watch. Гарантия, доставка по всему Казахстану. Оплата картой Visa/Mastercard.',
  keywords: 'Apple, iPhone, MacBook, iPad, Apple Watch, Казахстан, купить, реселлер',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-[#f5f7fa]">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-b from-[#f5f7fa] to-[#e4e8ec] min-h-screen`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
