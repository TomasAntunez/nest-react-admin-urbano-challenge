import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Uuid } from '../../../shared/core';
import { User } from '../../core';
import { SqlUserRepository } from '../../infrastructure';

@Injectable()
export class GetUserById {
  constructor(
    private readonly userRepository: SqlUserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(Uuid.fromString(id));

    if (!user) {
      this.logger.error(
        `User with id ${id} not found`,
        undefined,
        GetUserById.name,
      );

      throw new NotFoundException('User not found');
    }

    return user;
  }
}
