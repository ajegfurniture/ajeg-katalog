'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductWithImages } from '@/lib/queries';

interface BestSellerProps {
  products: ProductWithImages[];
}

export default function BestSeller({ products }: BestSellerProps) {
  // Format price helper
  const formatPrice = (price: number | null) => {
    if (!price) return 'Harga belum tersedia';
    const numPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };
  return (
    <section className="px-4 py-5 pb-24">
      <h2 className="text-xl font-semibold text-[#0D1B1A] mb-5">Best Seller</h2>
      <div className="space-y-3">
        {Array.from({ length: Math.ceil(products.length / 2) }, (_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-3">
            {products.slice(rowIndex * 2, (rowIndex + 1) * 2).map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="flex-1">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full h-44 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {product.images && product.images.length > 0 && product.images[0].image ? (
                      <Image 
                        src={product.images[0].image} 
                        alt={product.name || 'Product'} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/placeholder.png';
                        }}
                      />
                    ) : (
                      <Image 
                        src="/api/placeholder/placeholder.png" 
                        alt={product.name || 'Product'} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    )}
                    <div className={`w-16 h-16 bg-gray-400 rounded-lg ${product.images && product.images.length > 0 && product.images[0].image ? 'hidden' : ''}`}></div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-[#0D1B1A] mb-1 line-clamp-2">
                      {product.name || 'Unnamed Product'}
                    </h3>
                    <p className="text-sm text-[#45A091] font-medium">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
