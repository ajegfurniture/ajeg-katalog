import { prisma } from './prisma';
import { Category, SubCategory, Product, ProductImage } from '@prisma/client';

// Type definitions for complex queries
export type CategoryWithSubCategories = Category & {
  subCategories: SubCategory[];
};

export type SubCategoryWithProducts = SubCategory & {
  category: Category;
  products: ProductWithImages[];
};

export type ProductWithImages = Product & {
  category: Category | null;
  subCategory: SubCategory | null;
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
  return await prisma.subCategory.findUnique({
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
          images: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });
}

// Product Queries
export async function getProducts(limit?: number): Promise<ProductWithImages[]> {
  return await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });
}

export async function getProductsBySubCategory(subCategoryId: number, limit?: number): Promise<ProductWithImages[]> {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      subCategoryId,
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: limit,
  });
}

export async function getProductById(id: number): Promise<ProductWithImages | null> {
  return await prisma.product.findUnique({
    where: {
      id,
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
  });
}

export async function searchProducts(query: string, limit: number = 20): Promise<ProductWithImages[]> {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
    orderBy: {
      name: 'asc',
    },
    take: limit,
  });
}

// Random/Featured products for homepage
export async function getRandomProducts(limit: number = 10): Promise<ProductWithImages[]> {
  // Note: For better performance in production, consider using a different approach
  // like having a featured flag or using a separate query with better indexing
  const totalProducts = await prisma.product.count({
    where: { isActive: true }
  });
  
  const skip = Math.max(0, Math.floor(Math.random() * Math.max(0, totalProducts - limit)));
  
  return await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      subCategory: true,
      images: true,
    },
    skip,
    take: limit,
    orderBy: {
      name: 'asc',
    },
  });
}
