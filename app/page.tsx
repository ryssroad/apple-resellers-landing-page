import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProductCatalog } from '@/components/product-catalog'
import { Footer } from '@/components/footer'
import { AIConsultant } from '@/components/ai-consultant'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
      </main>
      <Footer />
      <AIConsultant />
    </div>
  )
}
