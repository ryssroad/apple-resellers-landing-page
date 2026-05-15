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
    <div className="group relative flex flex-col glass-card rounded-3xl overflow-hidden transition-all duration-300">
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

        {/* Colors preview */}
        <div className="flex items-center gap-1.5 mt-4">
          {product.colors.slice(0, 5).map((color) => (
            <div
              key={color.name}
              className="w-5 h-5 rounded-full border-2 border-white/60 shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-foreground/50 ml-1">
              +{product.colors.length - 5}
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
        <div className="flex gap-2 mt-4">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 rounded-full glass-button border-0 h-11">
                <Eye className="w-4 h-4 mr-1.5" />
                Подробнее
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
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            selectedColor === color.name
                              ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                          title={color.name}
                        >
                          {selectedColor === color.name && (
                            <Check className={`w-4 h-4 ${
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
                      <div className="flex flex-wrap gap-2 mt-3">
                        {product.storage.map((storage) => (
                          <button
                            key={storage}
                            onClick={() => setSelectedStorage(storage)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
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
            size="sm" 
            className="flex-1 rounded-full h-11 premium-shadow"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="w-4 h-4 mr-1.5" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
