import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { SqlUserRepository } from '../../infrastructure';

@Injectable()
export class ValidateUsername {
  constructor(
    private readonly userRepository: SqlUserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(username: string): Promise<void> {
    const user = await this.userRepository.findByUsername(username);

    if (user) {
      this.logger.warn(
        `User with username ${user.getUsername()} already exists - userId: ${user
          .getId()
          .toString()}`,
        ValidateUsername.name,
      );

      throw new BadRequestException(
        `User with username ${user.getUsername()} already exists`,
      );
    }
  }
}
