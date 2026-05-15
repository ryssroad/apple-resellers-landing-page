'use client'

import { useState } from 'react'
import { Grid3X3, Smartphone, Laptop, Tablet, Watch, Headphones, Cable } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

const categoryIcons: Record<string, React.ElementType> = {
  grid: Grid3X3,
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  watch: Watch,
  headphones: Headphones,
  cable: Cable,
}

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const products = getProductsByCategory(activeCategory)

  return (
    <section id="catalog" className="py-12 lg:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">
            Каталог продукции Apple
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Полная линейка техники Apple 2026 года с официальной гарантией. Выберите категорию для просмотра товаров.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 mb-8 scrollbar-hide">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon]
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeCategory === category.id
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Товары в данной категории временно отсутствуют
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
