import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/queries';
import { ProductDetail } from '@/components/ProductDetail';
import { Header, BottomNavigation } from '@/components';

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);
  
  if (!product) {
    notFound();
  }

  // Serialize Decimal fields for client components
  const safeProduct = {
    ...product,
    price: product.price ? Number(product.price as unknown as number) : null,
    tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
  };

  return (
    <div className="min-h-screen bg-[#F7FCFA] mx-auto max-w-[700px] flex flex-col">
      <Header />
      <ProductDetail product={safeProduct} />
      <BottomNavigation />
    </div>
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id);
  
  if (isNaN(productId)) {
    return {
      title: 'Produk Tidak Ditemukan | Ajeg Furniture',
    };
  }

  const product = await getProductById(productId);
  
  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan | Ajeg Furniture',
    };
  }

  return {
    title: `${product.name} | Ajeg Furniture`,
    description: product.description || `Lihat detail produk ${product.name} dari Ajeg Furniture`,
  };
}
