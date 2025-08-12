import { httpService } from '../../shared/services';
import { CreateUserDto, FindUsersDto, UpdateUserDto } from '../dtos';
import { User } from '../entities';

class UserService {
  async save(dto: CreateUserDto): Promise<void> {
    await httpService.post('/api/users', dto);
  }

  async findAll(dto: FindUsersDto): Promise<User[]> {
    const { data } = await httpService.get<User[]>('/api/users', {
      params: dto,
    });

    return data;
  }

  async findOne(id: string): Promise<User> {
    const { data } = await httpService.get<User>(`/api/users/${id}`);
    return data;
  }

  async update(dto: UpdateUserDto): Promise<void> {
    await httpService.put(`/api/users/${dto.id}`, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.username,
      role: dto.role,
      isActive: dto.isActive,
      password: dto.password,
    });
  }

  async delete(id: string): Promise<void> {
    await httpService.delete(`/api/users/${id}`);
  }
}

export const userService = new UserService();
