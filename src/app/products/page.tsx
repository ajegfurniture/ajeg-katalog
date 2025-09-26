import { Header, BottomNavigation } from '@/components';
import { getCategories, getProducts, getProductsBySubCategory } from '@/lib/queries';
import ProductsList from '@/components/ProductsList';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    subcategory?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Fetch data from database
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  // Filter products based on query parameters
  let products = allProducts;
  if (searchParams.subcategory) {
    const subCategoryId = parseInt(searchParams.subcategory);
    products = await getProductsBySubCategory(subCategoryId);
  } else if (searchParams.category) {
    const categoryId = parseInt(searchParams.category);
    products = allProducts.filter(p => p.categoryId === categoryId);
  }

  // Serialize Decimal fields for client components
  const safeProducts = products.map((p) => ({
    ...p,
    price: p.price ? Number(p.price as unknown as number) : null,
  }));

  return (
    <div className="min-h-screen bg-[#F7FCFA] mx-auto max-w-[700px] flex flex-col">
      <ProductsList 
        products={safeProducts} 
        categories={categories}
        initialCategoryId={searchParams.category ? parseInt(searchParams.category) : null}
        initialSubCategoryId={searchParams.subcategory ? parseInt(searchParams.subcategory) : null}
      />
      <BottomNavigation />
    </div>
  );
}
