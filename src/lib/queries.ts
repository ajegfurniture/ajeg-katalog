import { prisma } from './prisma';
import { Category, SubCategory, Product, product_types } from '@prisma/client';

// Define ProductImage type manually since it's ignored in schema
export interface ProductImage {
  id: number;
  productId: number;
  image: string;
  isVariant: boolean;
}

// Type definitions for complex queries
export type CategoryWithSubCategories = Category & {
  subCategories: SubCategory[];
};

export type SubCategoryWithProducts = SubCategory & {
  category: Category | null;
  products: ProductWithImages[];
};

export type ProductWithImages = Omit<Product, 'price' | 'tmp_price_buy'> & {
  price: number | null;
  tmp_price_buy: number | null;
  category: Category | null;
  subCategory: SubCategory | null;
  productType: product_types | null;
  images: ProductImage[];
};

// Category Queries
export async function getCategories(): Promise<CategoryWithSubCategories[]> {
  return await prisma.category.findMany({
    where: {
      isActive: true,
    },
    include: {
      subCategories: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getCategoryById(id: number): Promise<CategoryWithSubCategories | null> {
  return await prisma.category.findUnique({
    where: {
      id,
      isActive: true,
    },
    include: {
      subCategories: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });
}

// SubCategory Queries
export async function getSubCategoriesByCategory(categoryId: number): Promise<SubCategory[]> {
  return await prisma.subCategory.findMany({
    where: {
      categoryId,
      isActive: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getSubCategoryById(id: number): Promise<SubCategoryWithProducts | null> {
  const subCategory = await prisma.subCategory.findUnique({
    where: {
      id,
      isActive: true,
    },
    include: {
      category: true,
      products: {
        where: {
          isActive: true,
        },
        include: {
          category: true,
          subCategory: true,
          productType: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  if (!subCategory) {
    return null;
  }

  // Fetch images for each product and serialize
  const productsWithImages = await Promise.all(
    subCategory.products.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        ...product,
        price: product.price ? Number(product.price as unknown as number) : null,
        tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
        images,
      };
    })
  );

  return {
    ...subCategory,
    products: productsWithImages,
  };
}

// Product Queries
export async function getProducts(limit?: number): Promise<ProductWithImages[]> {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      productType: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });

  // Fetch images for each product and serialize
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        ...product,
        price: product.price ? Number(product.price as unknown as number) : null,
        tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
        images,
      };
    })
  );

  return productsWithImages;
}

export async function getProductsBySubCategory(subCategoryId: number, limit?: number): Promise<ProductWithImages[]> {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      subCategoryId,
    },
    include: {
      category: true,
      subCategory: true,
      productType: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: limit,
  });

  // Fetch images for each product and serialize
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        ...product,
        price: product.price ? Number(product.price as unknown as number) : null,
        tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
        images,
      };
    })
  );

  return productsWithImages;
}

export async function getProductById(id: number): Promise<ProductWithImages | null> {
  const product = await prisma.product.findUnique({
    where: {
      id,
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      productType: true,
    },
  });

  if (!product) {
    return null;
  }

  const images = await getProductImages(id);
  
  return {
    ...product,
    price: product.price ? Number(product.price as unknown as number) : null,
    tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
    images,
  };
}

export async function searchProducts(query: string, limit: number = 20): Promise<ProductWithImages[]> {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      category: true,
      subCategory: true,
      productType: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: limit,
  });

  // Fetch images for each product and serialize
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        ...product,
        price: product.price ? Number(product.price as unknown as number) : null,
        tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
        images,
      };
    })
  );

  return productsWithImages;
}

// Product Types Queries
export async function getProductTypes(): Promise<product_types[]> {
  return await prisma.product_types.findMany({
    where: {
      is_active: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getProductTypeById(id: number): Promise<product_types | null> {
  return await prisma.product_types.findUnique({
    where: {
      id,
      is_active: true,
    },
  });
}

// Product Images Queries
export async function getProductImages(productId: number): Promise<ProductImage[]> {
  const result = await prisma.$queryRaw`
    SELECT id, product_fkid as "productId", image, is_variant as "isVariant"
    FROM product_images 
    WHERE product_fkid = ${productId}
  `;
  
  return result as ProductImage[];
}

// Random/Featured products for homepage
export async function getRandomProducts(limit: number = 10): Promise<ProductWithImages[]> {
  // Note: For better performance in production, consider using a different approach
  // like having a featured flag or using a separate query with better indexing
  const totalProducts = await prisma.product.count({
    where: { isActive: true }
  });
  
  const skip = Math.max(0, Math.floor(Math.random() * Math.max(0, totalProducts - limit)));
  
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      productType: true,
    },
    skip,
    take: limit,
    orderBy: {
      name: 'asc',
    },
  });

  // Fetch images for each product and serialize
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const images = await getProductImages(product.id);
      return {
        ...product,
        price: product.price ? Number(product.price as unknown as number) : null,
        tmp_price_buy: product.tmp_price_buy ? Number(product.tmp_price_buy as unknown as number) : null,
        images,
      };
    })
  );

  return productsWithImages;
}
