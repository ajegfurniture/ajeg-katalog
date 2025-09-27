'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Heart, Share2, Star } from 'lucide-react';
import { ProductWithImages } from '@/lib/queries';
import { WhatsAppCTA } from './WhatsAppCTA';
import { getProductAdvantages } from '@/lib/productAdvantages';

interface ProductDetailProps {
  product: ProductWithImages & {
    price: number | null;
    tmp_price_buy: number | null;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Harga Hubungi Kami';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name || 'Produk Ajeg Furniture',
          text: product.description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link produk berhasil disalin!');
    }
  };

  const mainImage = product.images[selectedImageIndex]?.image || '/api/placeholder/placeholder.png';
  const thumbnailImages = product.images.slice(0, 4);

  return (
    <div className="flex-1 pb-20">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg truncate flex-1 mx-3">
          {product.name}
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white">
        <div className="aspect-square relative">
          <Image
            src={mainImage}
            alt={product.name || 'Produk'}
            fill
            className="object-cover"
            priority
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {thumbnailImages.length > 1 && (
          <div className="p-4 flex gap-2 overflow-x-auto">
            {thumbnailImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index
                    ? 'border-blue-500'
                    : 'border-gray-200'
                }`}
              >
                <Image
                  src={image.image || '/api/placeholder/placeholder.png'}
                  alt={`${product.name} ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(4.8) • 120 ulasan</span>
            </div>
          </div>
        </div>

        {/* Category */}
        {(product.category || product.subCategory) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {product.category.name}
                </span>
              )}
              {product.subCategory && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  {product.subCategory.name}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>
          {product.price && (
            <div className="text-sm text-gray-500">
              Harga sudah termasuk PPN
            </div>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Keunggulan Produk</h3>
          <div className="space-y-2">
            {getProductAdvantages(product.productType?.name).map((advantage, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {advantage.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="mt-2">
        <WhatsAppCTA productName={product.name || 'Produk'} />
      </div>
    </div>
  );
}
