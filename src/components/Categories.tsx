'use client';

import { useMemo, useState } from 'react';
import { CategoryWithSubCategories } from '@/lib/queries';
import { Sofa, Bed, Utensils, Computer, Armchair, Lamp, Tv, Bath, Boxes, Ellipsis, Palette, Gift, Archive, Table } from 'lucide-react';

interface CategoriesProps {
  categories: CategoryWithSubCategories[];
}

export default function Categories({ categories }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 1);

  // Choose icon based on category name
  const getCategoryIcon = (name?: string) => {
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

  // Sort categories so that "Lainnya" (or similar) is always at the end
  const sortedCategories = useMemo(() => {
    const isOthers = (name?: string) => !!(name && /(lainnya|others|other)/i.test(name));
    return [...categories].sort((a, b) => {
      const aOthers = isOthers(a.name);
      const bOthers = isOthers(b.name);
      if (aOthers && !bOthers) return 1;
      if (!aOthers && bOthers) return -1;
      const an = (a.name || '').toLowerCase();
      const bn = (b.name || '').toLowerCase();
      return an.localeCompare(bn);
    });
  }, [categories]);

  return (
    <section className="px-4 py-5">
      <h2 className="text-xl font-semibold text-[#0D1B1A] mb-5">Kategori</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
        {sortedCategories.map((category) => (
          <div
            key={category.id}
            className={`border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer transition-all duration-200 ${
              activeCategory === category.id
                ? 'border-green-300 bg-green-50'
                : 'border-gray-200'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-[#0D1B1A]">
              {getCategoryIcon(category.name)}
            </div>
            <span className={`text-xs text-center ${
              activeCategory === category.id
                ? 'text-[#45A091] font-medium'
                : 'text-[#0D1B1A]'
            }`}>
              {category.name || 'Unnamed Category'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
