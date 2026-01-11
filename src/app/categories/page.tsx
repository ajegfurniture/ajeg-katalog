import { Header, BottomNavigation } from '@/components';
import { getCategories } from '@/lib/queries';
import CategoriesList from '@/components/CategoriesList';

// Force dynamic rendering to prevent static generation during build
export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  // Fetch categories from database
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#F7FCFA] mx-auto max-w-[700px] flex flex-col">
      <Header />
      <CategoriesList categories={categories} />
      <BottomNavigation />
    </div>
  );
}
