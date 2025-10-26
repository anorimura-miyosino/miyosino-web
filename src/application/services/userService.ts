import { apiClient } from '@/infrastructure/api';
import { User, CreateUserRequest, UpdateUserRequest } from '@/domains/user';
import { ApiResponse, PaginatedResponse } from '@/shared/types';

export class UserService {
  async getUsers(): Promise<User[]> {
    const response: PaginatedResponse<User> = await apiClient.get('/users');
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response: ApiResponse<User> = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response: ApiResponse<User> = await apiClient.post(
      '/users',
      userData
    );
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response: ApiResponse<User> = await apiClient.put(
      `/users/${id}`,
      userData
    );
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}

export const userService = new UserService();
