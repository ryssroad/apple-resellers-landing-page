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
    <div className="group relative flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNew && (
          <Badge className="bg-foreground text-background">Новинка</Badge>
        )}
        {product.isBestseller && (
          <Badge variant="secondary">Хит продаж</Badge>
        )}
        {!product.inStock && (
          <Badge variant="destructive">Нет в наличии</Badge>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-muted/50 p-6">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-base leading-tight line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Colors preview */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.slice(0, 5).map((color) => (
            <div
              key={color.name}
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{product.colors.length - 5}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-1.5" />
                Подробнее
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{product.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Product image */}
                <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Product details */}
                <div className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>

                  {/* Color selection */}
                  <div>
                    <label className="text-sm font-medium">Цвет: {selectedColor}</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedColor === color.name
                              ? 'border-foreground scale-110'
                              : 'border-border hover:border-muted-foreground'
                          }`}
                          style={{ backgroundColor: color.hex }}
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
                      <label className="text-sm font-medium">Память</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.storage.map((storage) => (
                          <button
                            key={storage}
                            onClick={() => setSelectedStorage(storage)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                              selectedStorage === storage
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-border hover:border-muted-foreground'
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
                    <label className="text-sm font-medium">Характеристики</label>
                    <div className="mt-2 space-y-2">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm py-1.5 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium text-right max-w-[60%]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and add to cart */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <Button 
                      className="w-full h-12" 
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
            className="flex-1"
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
