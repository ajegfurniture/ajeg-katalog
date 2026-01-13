'use client';

import { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Filter, Search } from 'lucide-react';

interface HeaderProps {
  showFilter?: boolean;
  onFilterClick?: () => void;
  initialSearchTerm?: string;
}

export default function Header({ showFilter = false, onFilterClick, initialSearchTerm = '' }: HeaderProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = searchTerm.trim();

    if (!trimmedQuery) {
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <header className="bg-[#F7FCFA] px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center space-x-3 shrink-0">
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

        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 justify-end">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-xs shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="search"
              name="q"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari produk"
              className="ml-2 w-full bg-transparent text-sm text-[#0D1B1A] placeholder:text-gray-400 focus:outline-none"
              aria-label="Cari produk"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[#45A091] rounded-lg hover:bg-[#3b897c] transition-colors"
          >
            Cari
          </button>
          {showFilter && (
            <button
              onClick={onFilterClick}
              type="button"
              className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 text-[#0D1B1A]" />
              <span className="text-sm text-[#0D1B1A]">Filter</span>
            </button>
          )}
        </form>
      </div>
    </header>
  );
}
