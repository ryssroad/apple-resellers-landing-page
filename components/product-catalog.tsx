'use client'

import { type ElementType, useEffect, useState } from 'react'
import { Grid3X3, Smartphone, Laptop, Tablet, Watch, Headphones, Cable } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories, getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

type CategoryId = (typeof categories)[number]['id']

const categoryIcons: Record<string, ElementType> = {
  grid: Grid3X3,
  smartphone: Smartphone,
  laptop: Laptop,
  tablet: Tablet,
  watch: Watch,
  headphones: Headphones,
  cable: Cable,
}

const catalogCategoryIds = new Set(categories.map((category) => category.id))

function isCategoryId(category: string): category is CategoryId {
  return catalogCategoryIds.has(category as CategoryId)
}

function getCategoryFromHash() {
  if (typeof window === 'undefined') {
    return null
  }

  const category = window.location.hash.replace('#catalog-', '')

  return isCategoryId(category) ? category : null
}

export function ProductCatalog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const products = getProductsByCategory(activeCategory)

  useEffect(() => {
    const syncCategoryFromHash = () => {
      const category = getCategoryFromHash()

      if (category) {
        setActiveCategory(category)
      }
    }

    const handleCategoryChange = (event: Event) => {
      const category = (event as CustomEvent<{ category?: string }>).detail?.category

      if (category && isCategoryId(category)) {
        setActiveCategory(category)
      }
    }

    syncCategoryFromHash()
    window.addEventListener('hashchange', syncCategoryFromHash)
    window.addEventListener('catalog-category-change', handleCategoryChange)

    return () => {
      window.removeEventListener('hashchange', syncCategoryFromHash)
      window.removeEventListener('catalog-category-change', handleCategoryChange)
    }
  }, [])

  const handleCategoryClick = (categoryId: CategoryId) => {
    setActiveCategory(categoryId)

    if (categoryId === 'all') {
      window.history.replaceState(null, '', '#catalog')
      return
    }

    window.history.replaceState(null, '', `#catalog-${categoryId}`)
  }

  return (
    <section id="catalog" className="py-16 lg:py-24 scroll-mt-20 premium-gradient relative">
      {categories.map((category) => (
        <span
          key={category.id}
          id={category.id === 'all' ? 'catalog-all' : `catalog-${category.id}`}
          className="absolute top-0 scroll-mt-20"
          aria-hidden="true"
        />
      ))}

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-white/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground/90 text-balance">
            Каталог продукции Apple
          </h2>
          <p className="mt-4 text-foreground/50 max-w-2xl mx-auto text-pretty leading-relaxed">
            Полная линейка техники Apple 2026 года с официальной гарантией. Выберите категорию для просмотра товаров.
          </p>
        </div>

        {/* Category tabs - Glass style */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 mb-10 scrollbar-hide">
          {categories.map((category) => {
            const Icon = categoryIcons[category.icon]
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-foreground text-background premium-shadow-lg scale-105'
                    : 'glass-button text-foreground/60 hover:text-foreground hover:bg-white/90 hover:scale-[1.02]'
                )}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            )
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
              <p className="text-foreground/50">
                Товары в данной категории временно отсутствуют
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
