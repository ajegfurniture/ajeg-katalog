'use client';

import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { CategoryWithSubCategories } from '@/lib/queries';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryWithSubCategories[];
  selectedCategoryId: number | null;
  selectedSubCategoryId: number | null;
  onCategorySelect: (categoryId: number | null) => void;
  onSubCategorySelect: (subCategoryId: number | null) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategoryId,
  selectedSubCategoryId,
  onCategorySelect,
  onSubCategorySelect,
  onApplyFilter,
  onClearFilter
}: FilterDrawerProps) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSubCategoryDropdownOpen, setIsSubCategoryDropdownOpen] = useState(false);

  // Get selected category and subcategory names
  const selectedCategory = categories.find(c => c.id === selectedCategoryId);
  const selectedSubCategory = selectedCategory?.subCategories.find(sc => sc.id === selectedSubCategoryId);

  const handleCategorySelect = (categoryId: number | null) => {
    onCategorySelect(categoryId);
    onSubCategorySelect(null); // Reset subcategory when category changes
    setIsCategoryDropdownOpen(false);
  };

  const handleSubCategorySelect = (subCategoryId: number | null) => {
    onSubCategorySelect(subCategoryId);
    setIsSubCategoryDropdownOpen(false);
  };

  const handleApply = () => {
    onApplyFilter();
    onClose();
  };

  const handleClear = () => {
    onClearFilter();
    onCategorySelect(null);
    onSubCategorySelect(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#0D1B1A]">Filter Produk</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Category Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0D1B1A] mb-2">
                Kategori
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-sm">
                    {selectedCategory ? selectedCategory.name : 'Pilih Kategori'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className={`w-full p-3 text-left text-sm hover:bg-gray-50 ${
                        !selectedCategoryId ? 'bg-green-50 text-green-700' : ''
                      }`}
                    >
                      Semua Kategori
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full p-3 text-left text-sm hover:bg-gray-50 ${
                          selectedCategoryId === category.id ? 'bg-green-50 text-green-700' : ''
                        }`}
                      >
                        {category.name || 'Unnamed Category'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Subcategory Dropdown */}
            {selectedCategory && selectedCategory.subCategories && selectedCategory.subCategories.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#0D1B1A] mb-2">
                  Sub Kategori
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsSubCategoryDropdownOpen(!isSubCategoryDropdownOpen)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm">
                      {selectedSubCategory ? selectedSubCategory.name : 'Pilih Sub Kategori'}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isSubCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSubCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      <button
                        onClick={() => handleSubCategorySelect(null)}
                        className={`w-full p-3 text-left text-sm hover:bg-gray-50 ${
                          !selectedSubCategoryId ? 'bg-green-50 text-green-700' : ''
                        }`}
                      >
                        Semua Sub Kategori
                      </button>
                      {selectedCategory.subCategories.map((subCategory) => (
                        <button
                          key={subCategory.id}
                          onClick={() => handleSubCategorySelect(subCategory.id)}
                          className={`w-full p-3 text-left text-sm hover:bg-gray-50 ${
                            selectedSubCategoryId === subCategory.id ? 'bg-green-50 text-green-700' : ''
                          }`}
                        >
                          {subCategory.name || 'Unnamed Subcategory'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="flex space-x-3">
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-2 bg-[#45A091] text-white rounded-lg hover:bg-[#3a8a7a] transition-colors"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
