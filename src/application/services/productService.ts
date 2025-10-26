import { apiClient } from '@/infrastructure/api';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from '@/domains/product';
import { ApiResponse, PaginatedResponse } from '@/shared/types';

export class ProductService {
  async getProducts(): Promise<Product[]> {
    const response: PaginatedResponse<Product> =
      await apiClient.get('/products');
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response: ApiResponse<Product> = await apiClient.get(
      `/products/${id}`
    );
    return response.data;
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response: ApiResponse<Product> = await apiClient.post(
      '/products',
      productData
    );
    return response.data;
  }

  async updateProduct(
    id: string,
    productData: UpdateProductRequest
  ): Promise<Product> {
    const response: ApiResponse<Product> = await apiClient.put(
      `/products/${id}`,
      productData
    );
    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  }
}

export const productService = new ProductService();
