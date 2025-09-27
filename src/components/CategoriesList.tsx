'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryWithSubCategories } from '@/lib/queries';
import { loadingController } from '@/lib/loadingController';
import {
  Sofa, Bed, Utensils, Computer, Armchair, Lamp, Tv, Bath, Boxes,
  Palette, Gift, Archive, Table, Ellipsis
} from 'lucide-react';

interface CategoriesListProps {
  categories: CategoryWithSubCategories[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const router = useRouter();

  // Choose icon based on category name
  const getCategoryIcon = (name?: string | null) => {
    const n = (name || '').toLowerCase();
    // Specific Indonesian names first
    if (/^bantal$/.test(n)) return <Bed className="w-6 h-6" />; // pillow -> bed context
    if (/^dekorasi$/.test(n)) return <Palette className="w-6 h-6" />;
    if (/^kasur$/.test(n)) return <Bed className="w-6 h-6" />;
    if (/^kitchen set$/.test(n)) return <Utensils className="w-6 h-6" />;
    if (/^kitchen ware$/.test(n)) return <Utensils className="w-6 h-6" />;
    if (/^komplimen$/.test(n)) return <Gift className="w-6 h-6" />;
    if (/^kursi$/.test(n)) return <Armchair className="w-6 h-6" />;
    if (/^lemari arsip$/.test(n)) return <Archive className="w-6 h-6" />;
    if (/^lemari buffet$/.test(n)) return <Boxes className="w-6 h-6" />;
    if (/^lemari pakaian$/.test(n)) return <Boxes className="w-6 h-6" />;
    if (/^meja$/.test(n)) return <Table className="w-6 h-6" />;
    if (/^nakas$/.test(n)) return <Lamp className="w-6 h-6" />; // bedside
    if (/^rak$/.test(n)) return <Boxes className="w-6 h-6" />;
    if (/^sofa$/.test(n)) return <Sofa className="w-6 h-6" />;
    if (/^lainnya$|^others?$/.test(n)) return <Ellipsis className="w-6 h-6" />;

    // Generic fallbacks
    if (/(tamu|sofa|ruang tamu)/.test(n)) return <Sofa className="w-6 h-6" />;
    if (/(kamar|tidur|bed|ranjang)/.test(n)) return <Bed className="w-6 h-6" />;
    if (/(makan|dapur|kitchen|meja makan|utensil|ware)/.test(n)) return <Utensils className="w-6 h-6" />;
    if (/(kantor|kerja|office|komputer|meja kerja)/.test(n)) return <Computer className="w-6 h-6" />;
    if (/(kursi|armchair)/.test(n)) return <Armchair className="w-6 h-6" />;
    if (/(lampu|penerangan|lighting)/.test(n)) return <Lamp className="w-6 h-6" />;
    if (/(tv|hiburan|entertainment)/.test(n)) return <Tv className="w-6 h-6" />;
    if (/(kamar mandi|bath|toilet)/.test(n)) return <Bath className="w-6 h-6" />;
    if (/(storage|rak|lemari|box|penyimpanan|arsip|buffet|pakaian)/.test(n)) return <Boxes className="w-6 h-6" />;
    if (/(meja|table|desk)/.test(n)) return <Table className="w-6 h-6" />;
    if (/(dekor|dekorasi|deco|hias)/.test(n)) return <Palette className="w-6 h-6" />;
    if (/(hadiah|gift|bonus|kompli)/.test(n)) return <Gift className="w-6 h-6" />;
    return <Ellipsis className="w-6 h-6" />;
  };

  const toggleCategory = (categoryId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    loadingController.show();
    router.push(`/products?category=${categoryId}`);
  };

  const handleSubCategoryClick = (subCategoryId: number) => {
    loadingController.show();
    router.push(`/products?subcategory=${subCategoryId}`);
  };

  return (
    <div className="flex-1 px-4 py-5 pb-24">
      <h2 className="text-xl font-semibold text-[#0D1B1A] mb-5">Daftar Kategori</h2>
      
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Category Header */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-[#0D1B1A]">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#0D1B1A]">
                      {category.name || 'Unnamed Category'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.subCategories?.length || 0} subkategori
                    </p>
                  </div>
                </div>
                
                {category.subCategories && category.subCategories.length > 0 && (
                  <button
                    onClick={(e) => toggleCategory(category.id, e)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {expandedCategories.has(category.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategories.has(category.id) && category.subCategories && category.subCategories.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="p-4 pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Subkategori:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.subCategories.map((subCategory) => (
                      <div
                        key={subCategory.id}
                        onClick={() => handleSubCategoryClick(subCategory.id)}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <p className="text-sm font-medium text-[#0D1B1A]">
                          {subCategory.name || 'Unnamed Subcategory'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ellipsis className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Tidak ada kategori yang tersedia</p>
        </div>
      )}
    </div>
  );
}