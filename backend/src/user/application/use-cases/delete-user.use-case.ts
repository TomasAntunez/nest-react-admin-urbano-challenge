import { Injectable } from '@nestjs/common';

import { SqlUserRepository } from '../../infrastructure';
import { GetUserById } from './get-user-by-id.use-case';

@Injectable()
export class DeleteUser {
  constructor(
    private readonly getUserById: GetUserById,
    private readonly userRepository: SqlUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.getUserById.execute(id);
    await this.userRepository.delete(user);
  }
}
