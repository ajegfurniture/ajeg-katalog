'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Grid3X3 } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-6 h-6 mb-1" />,
    href: '/'
  },
  {
    id: 'products',
    label: 'Daftar Produk',
    icon: <Package className="w-6 h-6 mb-1" />,
    href: '/products'
  },
  {
    id: 'categories',
    label: 'Kategori',
    icon: <Grid3X3 className="w-6 h-6 mb-1" />,
    href: '/categories'
  }
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 bg-white border-t border-green-100 mt-auto">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center py-2 px-4 text-xs transition-colors ${
              pathname === item.href ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
