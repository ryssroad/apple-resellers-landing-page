'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield, Truck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Гарантия 1 год',
    description: 'Официальная гарантия на всю технику',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'По всему Казахстану за 1-3 дня',
  },
  {
    icon: CreditCard,
    title: 'Удобная оплата',
    description: 'Visa, Mastercard, Kaspi QR',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden premium-gradient">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 lg:py-24">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-button text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Новинки 2026 уже в наличии
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1]">
              Официальная техника{' '}
              <span className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                Apple
              </span>{' '}
              в Казахстане
            </h1>
            
            <p className="mt-6 text-lg text-foreground/60 max-w-xl mx-auto lg:mx-0 text-pretty leading-relaxed">
              Авторизованный реселлер Apple. Гарантия качества, быстрая доставка по всему Казахстану и удобная оплата любым способом.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full premium-shadow-lg">
                <Link href="#catalog">
                  Смотреть каталог
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full glass-button border-0">
                <a href="tel:+77001234567">
                  Позвонить нам
                </a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
              {/* Glass background for image */}
              <div className="absolute inset-8 rounded-[3rem] glass-card" />
              <Image
                src="/images/iphone-17-pro-max.jpg"
                alt="iPhone 17 Pro Max"
                fill
                className="object-contain p-8 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Features - Glass Cards */}
        <div className="grid sm:grid-cols-3 gap-4 pb-16 lg:pb-24">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-5 rounded-2xl glass-card transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center premium-shadow">
                <feature.icon className="w-6 h-6 text-foreground/80" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground/90">{feature.title}</h3>
                <p className="text-sm text-foreground/60 mt-0.5">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
