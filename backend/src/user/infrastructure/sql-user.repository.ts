import { ILike } from 'typeorm';

import { Uuid } from '../../shared/core';
import { FindUsersDto, User, UserRepository } from '../core';
import { SqlUser } from './sql-user.entity';
import { UserMapper } from './user.mapper';

export class SqlUserRepository implements UserRepository {
  async findById(id: Uuid): Promise<User | null> {
    const user = await SqlUser.findOne(id.toString());
    return user ? UserMapper.toUser(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await SqlUser.findOne({ where: { username } });
    return user ? UserMapper.toUser(user) : null;
  }

  async findAll(dto: FindUsersDto): Promise<User[]> {
    const query = {};

    Object.keys(dto).forEach((key) => {
      if (!dto[key]) return;

      if (key === 'role') {
        query[key] = dto[key];
      } else {
        query[key] = ILike(`%${dto[key]}%`);
      }
    });

    const users = await SqlUser.find({
      where: query,
      order: {
        firstName: 'ASC',
        lastName: 'ASC',
      },
    });

    return users.map(UserMapper.toUser);
  }

  async count(): Promise<number> {
    return await SqlUser.count();
  }

  async create(user: User): Promise<void> {
    await SqlUser.create(UserMapper.toPrimitives(user)).save();
  }

  async update(user: User): Promise<void> {
    const { id, ...rest } = UserMapper.toPrimitives(user);
    await SqlUser.update(id, { ...rest });
  }

  async delete(user: User): Promise<void> {
    await SqlUser.delete(user.getId().toString());
  }
}
