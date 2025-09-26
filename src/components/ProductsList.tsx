'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { CategoryWithSubCategories, ProductWithImages } from '@/lib/queries';
import FilterDrawer from './FilterDrawer';
import Header from './Header';

interface ProductsListProps {
  products: ProductWithImages[];
  categories: CategoryWithSubCategories[];
  initialCategoryId?: number | null;
  initialSubCategoryId?: number | null;
}

export default function ProductsList({ 
  products, 
  categories, 
  initialCategoryId = null, 
  initialSubCategoryId = null 
}: ProductsListProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(initialCategoryId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(initialSubCategoryId);

  // Filter products based on selected category/subcategory
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId && !selectedSubCategoryId) {
      return products;
    }

    return products.filter(product => {
      if (selectedSubCategoryId) {
        return product.subCategoryId === selectedSubCategoryId;
      }
      if (selectedCategoryId) {
        return product.categoryId === selectedCategoryId;
      }
      return true;
    });
  }, [products, selectedCategoryId, selectedSubCategoryId]);

  // Format price helper
  const formatPrice = (price: any) => {
    if (!price) return 'Harga belum tersedia';
    const numPrice = typeof price === 'string' ? parseFloat(price) : Number(price);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  // Get selected filter names for display
  const getSelectedFilterNames = () => {
    if (selectedSubCategoryId) {
      const category = categories.find(c => 
        c.subCategories.some(sc => sc.id === selectedSubCategoryId)
      );
      const subCategory = category?.subCategories.find(sc => sc.id === selectedSubCategoryId);
      return subCategory?.name || 'Unknown Subcategory';
    }
    if (selectedCategoryId) {
      const category = categories.find(c => c.id === selectedCategoryId);
      return category?.name || 'Unknown Category';
    }
    return null;
  };

  return (
    <>
      <Header 
        showFilter={true} 
        onFilterClick={() => setIsFilterOpen(true)}
      />
      <div className="flex-1 px-4 py-5 pb-24">
        {/* Filter Status */}
        {getSelectedFilterNames() && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              Filter: <span className="font-medium">{getSelectedFilterNames()}</span>
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="space-y-3">
          {Array.from({ length: Math.ceil(filteredProducts.length / 2) }, (_, rowIndex) => (
            <div key={rowIndex} className="flex space-x-3">
              {filteredProducts.slice(rowIndex * 2, (rowIndex + 1) * 2).map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm flex-1">
                  <div className="w-full h-44 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                    {product.images && product.images.length > 0 && product.images[0].image ? (
                      <Image 
                        src={product.images[0].image} 
                        alt={product.name || 'Product'} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-16 h-16 bg-gray-400 rounded-lg ${product.images && product.images.length > 0 && product.images[0].image ? 'hidden' : ''}`}></div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-[#0D1B1A] mb-1 line-clamp-2">
                      {product.name || 'Unnamed Product'}
                    </h3>
                    <p className="text-sm text-[#45A091] font-medium">
                      {formatPrice(product.price)}
                    </p>
                    {/* Category info */}
                    <p className="text-xs text-gray-500 mt-1">
                      {product.category?.name || 'Unknown Category'}
                      {product.subCategory?.name && ` • ${product.subCategory.name}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">Coba ubah filter atau hapus filter</p>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        selectedSubCategoryId={selectedSubCategoryId}
        onCategorySelect={setSelectedCategoryId}
        onSubCategorySelect={setSelectedSubCategoryId}
        onApplyFilter={() => {}}
        onClearFilter={() => {
          setSelectedCategoryId(null);
          setSelectedSubCategoryId(null);
        }}
      />
    </>
  );
}
