'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingBag, Eye, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCart } from '@/components/cart-provider'
import { type Product, formatPrice } from '@/lib/products'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name)
  const [selectedStorage, setSelectedStorage] = useState(product.storage?.[0])
  const [isOpen, setIsOpen] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedStorage)
    toast.success('Добавлено в корзину', {
      description: product.name,
    })
  }

  return (
    <div className="group relative flex flex-col glass-card rounded-3xl overflow-hidden transition-all duration-300" style={{ isolation: 'isolate' }}>
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <Badge className="bg-foreground/90 text-background backdrop-blur-sm rounded-full px-3">Новинка</Badge>
        )}
        {product.isBestseller && (
          <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm rounded-full px-3">Хит продаж</Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive" className="rounded-full px-3">Нет в наличии</Badge>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-white/80 to-white/40 p-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-semibold text-base leading-tight line-clamp-2 text-foreground/90">
          {product.name}
        </h3>
        
        <p className="text-sm text-foreground/50 mt-1.5 line-clamp-2">
          {product.description}
        </p>

        {/* Colors preview - just display, not interactive */}
        <div className="flex items-center gap-2 mt-4">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color.name}
              className="w-6 h-6 rounded-full border-2 border-white/80 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-foreground/50 ml-1">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground/90">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-foreground/40 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4 relative z-20" style={{ pointerEvents: 'auto' }}>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                type="button"
                variant="outline" 
                className="rounded-full glass-button border-0 h-11 text-sm touch-manipulation active:scale-95 transition-transform px-3 cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span className="truncate">Подробнее</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-menu border-0 rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">{product.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Product image */}
                <div className="relative aspect-square bg-gradient-to-br from-white/80 to-white/40 rounded-2xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 drop-shadow-lg"
                  />
                </div>

                {/* Product details */}
                <div className="space-y-5">
                  <p className="text-foreground/60 leading-relaxed">{product.description}</p>

                  {/* Color selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground/70">Цвет: <span className="text-foreground">{selectedColor}</span></label>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-all touch-manipulation active:scale-90 ${
                            selectedColor === color.name
                              ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check className={`w-5 h-5 ${
                              color.hex === '#F5F5F7' || color.hex === '#F0E4D3' || color.hex === '#E3E4E5' || color.hex === '#F5F5F0'
                                ? 'text-foreground'
                                : 'text-white'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage selection */}
                  {product.storage && (
                    <div>
                      <label className="text-sm font-medium text-foreground/70">Память</label>
                      <div className="flex flex-wrap gap-3 mt-3">
                        {product.storage.map((storage) => (
                          <button
                            key={storage}
                            onClick={() => setSelectedStorage(storage)}
                            className={`px-5 py-3 min-h-[44px] rounded-full text-sm font-medium transition-all touch-manipulation active:scale-95 ${
                              selectedStorage === storage
                                ? 'bg-foreground text-background shadow-lg'
                                : 'glass-button hover:bg-white/90'
                            }`}
                          >
                            {storage}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specs */}
                  <div>
                    <label className="text-sm font-medium text-foreground/70">Характеристики</label>
                    <div className="mt-3 space-y-0 rounded-2xl glass-card overflow-hidden">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm py-3 px-4 border-b border-black/5 last:border-0">
                          <span className="text-foreground/50">{spec.label}</span>
                          <span className="font-medium text-right max-w-[55%] text-foreground/80">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and add to cart */}
                  <div className="pt-4">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <Button 
                      className="w-full h-14 rounded-full text-base premium-shadow-lg" 
                      onClick={() => {
                        handleAddToCart()
                        setIsOpen(false)
                      }}
                      disabled={!product.inStock}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            type="button"
            className="rounded-full h-11 text-sm premium-shadow touch-manipulation active:scale-95 transition-transform px-3 cursor-pointer"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span className="truncate">В корзину</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
