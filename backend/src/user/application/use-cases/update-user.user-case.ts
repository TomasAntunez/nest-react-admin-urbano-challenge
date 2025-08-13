import { Injectable } from '@nestjs/common';

import { BcryptEncryptionService } from '../../../auth/infrastructure';
import { SqlUserRepository } from '../../infrastructure';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { GetUserById } from './get-user-by-id.use-case';
import { ValidateUsername } from './validate-username.use-case';

@Injectable()
export class UpdateUser {
  constructor(
    private readonly validateUsername: ValidateUsername,
    private readonly getUserById: GetUserById,
    private readonly encryptionService: BcryptEncryptionService,
    private readonly userRepository: SqlUserRepository,
  ) {}

  async execute(dto: UpdateUserDto): Promise<void> {
    const user = await this.getUserById.execute(dto.id);

    if (dto.username && dto.username !== user.getUsername()) {
      await this.validateUsername.execute(dto.username);
    }

    let hashedPassword: string | undefined;
    if (dto.password) {
      hashedPassword = await this.encryptionService.hash(dto.password);
    }

    user.edit({ ...dto, password: hashedPassword });
    await this.userRepository.update(user);
  }
}
