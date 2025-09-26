import { Header, Categories, BestSeller, BottomNavigation } from '@/components';
import { getCategories, getRandomProducts } from '@/lib/queries';

export default async function Home() {
  // Fetch data from database
  const [categories, products] = await Promise.all([
    getCategories(),
    getRandomProducts(10)
  ]);

  // Serialize Decimal fields for client components
  const safeProducts = products.map((p) => ({
    ...p,
    price: p.price ? Number(p.price as unknown as number) : null,
  }));

  return (
    <div className="min-h-screen bg-[#F7FCFA] mx-auto max-w-[700px] flex flex-col">
      <Header />
      <Categories categories={categories} />
      <BestSeller products={safeProducts} />
      <BottomNavigation />
    </div>
  );
}
