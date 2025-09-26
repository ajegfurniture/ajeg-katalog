'use client';

import Image from 'next/image';
import { Filter } from 'lucide-react';

interface HeaderProps {
  showFilter?: boolean;
  onFilterClick?: () => void;
}

export default function Header({ showFilter = false, onFilterClick }: HeaderProps) {
  return (
    <header className="bg-[#F7FCFA] px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden">
            <Image
              src="/apple-icon-180x180.png"
              alt="Ajeg Furniture Logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-[#0D1B1A]">Ajeg Furniture</h1>
        </div>
        
        {showFilter && (
          <button
            onClick={onFilterClick}
            className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4 text-[#0D1B1A]" />
            <span className="text-sm text-[#0D1B1A]">Filter</span>
          </button>
        )}
      </div>
    </header>
  );
}
