import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { CreateUser } from '../../user/application';
import { UserRole } from '../../user/core';
import { SqlUserRepository } from '../../user/infrastructure';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly userRepository: SqlUserRepository,
    private readonly createUser: CreateUser,
  ) {}

  async onApplicationBootstrap() {
    const adminUser = await this.userRepository.findByUsername('admin');

    if (!adminUser) {
      await this.createUser.execute({
        firstName: 'admin',
        lastName: 'admin',
        username: 'admin',
        role: UserRole.ADMIN,
        password: 'admin123',
      });
    }
  }
}
