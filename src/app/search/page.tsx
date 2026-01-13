import Image from 'next/image';
import Link from 'next/link';
import { Header, BottomNavigation } from '@/components';
import { searchProducts } from '@/lib/queries';

// Force dynamic rendering to ensure fresh search results
export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

const formatPrice = (price: number | null) => {
  if (!price) return 'Harga belum tersedia';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q || '').trim();
  const products = query ? await searchProducts(query) : [];

  return (
    <div className="min-h-screen bg-[#F7FCFA] mx-auto max-w-[700px] flex flex-col">
      <Header initialSearchTerm={query} />
      <main className="flex-1 px-4 py-5 pb-24">
        {query ? (
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Hasil pencarian untuk: <span className="font-medium text-[#0D1B1A]">{query}</span>
            </p>
          </div>
        ) : null}

        {!query && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-medium">Cari produk berdasarkan nama</p>
            <p className="text-sm text-gray-400 mt-1">Masukkan kata kunci di kolom pencarian</p>
          </div>
        )}

        {query && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 font-medium">Tidak ada produk ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">Coba gunakan kata kunci lain</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="space-y-3">
            {Array.from({ length: Math.ceil(products.length / 2) }, (_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-3">
                {products.slice(rowIndex * 2, (rowIndex + 1) * 2).map((product) => {
                  const mainImage = product.images && product.images.length > 0 && product.images[0].image
                    ? product.images[0].image
                    : '/api/placeholder/placeholder.png';

                  return (
                    <Link key={product.id} href={`/products/${product.id}`} className="flex-1">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-full h-44 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                          <Image
                            src={mainImage}
                            alt={product.name || 'Product'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                          <div className={`w-16 h-16 bg-gray-400 rounded-lg ${mainImage ? 'hidden' : ''}`}></div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-[#0D1B1A] mb-1 line-clamp-2">
                            {product.name || 'Unnamed Product'}
                          </h3>
                          <p className="text-sm text-[#45A091] font-medium">{formatPrice(product.price)}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.category?.name || 'Unknown Category'}
                            {product.subCategory?.name && ` • ${product.subCategory.name}`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNavigation />
    </div>
  );
}
