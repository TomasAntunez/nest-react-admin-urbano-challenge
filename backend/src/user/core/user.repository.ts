import { Uuid } from '../../shared/core';
import { FindUsersDto } from './find-users.dto';
import { User } from './user';

export interface UserRepository {
  findById(id: Uuid): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findAll(dto: FindUsersDto): Promise<User[]>;
  count(): Promise<number>;
  create(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
