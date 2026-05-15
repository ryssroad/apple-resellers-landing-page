import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const footerLinks = {
  products: [
    { name: 'iPhone', href: '#catalog' },
    { name: 'Mac', href: '#catalog' },
    { name: 'iPad', href: '#catalog' },
    { name: 'Apple Watch', href: '#catalog' },
    { name: 'AirPods', href: '#catalog' },
    { name: 'Аксессуары', href: '#catalog' },
  ],
  support: [
    { name: 'Доставка', href: '#' },
    { name: 'Гарантия', href: '#' },
    { name: 'Возврат', href: '#' },
    { name: 'Оплата', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
  company: [
    { name: 'О нас', href: '#' },
    { name: 'Контакты', href: '#contact' },
    { name: 'Блог', href: '#' },
    { name: 'Вакансии', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 backdrop-blur">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
              </div>
              <span className="font-semibold text-lg">iStore KZ</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              Авторизованный реселлер Apple в Казахстане. Официальная техника с гарантией.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-5">Продукты</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-5">Поддержка</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-5">Компания</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5">Контакты</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+77001234567"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  +7 700 123 45 67
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@istore.kz"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  info@istore.kz
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>Алматы, Астана, Шымкент</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                10:00 - 21:00, ежедневно
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; 2026 iStore KZ. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
