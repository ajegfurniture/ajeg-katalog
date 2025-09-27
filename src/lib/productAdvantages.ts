export interface ProductAdvantage {
  text: string;
  icon?: string;
}

export function getProductAdvantages(productTypeName?: string | null): ProductAdvantage[] {
  if (!productTypeName) {
    return [
      { text: 'Material berkualitas tinggi' },
      { text: 'Desain modern dan elegan' },
      { text: 'Garansi 1 tahun' },
      { text: 'Gratis ongkir area Bekasi & Jogja' },
    ];
  }

  const typeName = productTypeName.toLowerCase();

  if (typeName.includes('sofa')) {
    return [
      { text: 'Garansi 3 tahun' },
      { text: 'Gratis ongkir se Jawa' },
      { text: 'Material berkualitas tinggi' },
      { text: 'One day service' },
    ];
  }

  if (typeName.includes('kayu') || typeName.includes('wood')) {
    return [
      { text: 'Garansi 1 tahun' },
      { text: 'Full kayu jati' },
      { text: 'Gratis ongkir se Jawa' },
      { text: 'Anti rayap' },
      { text: 'Finishing premium' },
    ];
  }

  if (typeName.includes('fabrikasi') || typeName.includes('fabrication')) {
    return [
      { text: '1 minggu sampai' },
      { text: 'Garansi dari vendor' },
      { text: 'Gratis ongkir area Jogja dan sekitarnya' },
      { text: 'Custom sesuai kebutuhan' },
    ];
  }

  // Default advantages
  return [
    { text: 'Material berkualitas tinggi' },
    { text: 'Desain modern dan elegan' },
    { text: 'Garansi 1 tahun' },
    { text: 'Gratis ongkir area Bekasi & Jogja' },
  ];
}
