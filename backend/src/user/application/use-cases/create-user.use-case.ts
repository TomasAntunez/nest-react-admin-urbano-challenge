import { Injectable } from '@nestjs/common';

import { BcryptEncryptionService } from '../../../auth/infrastructure';
import { CreateUserParams, User } from '../../core';
import { SqlUserRepository } from '../../infrastructure';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { ValidateUsername } from './validate-username.use-case';

@Injectable()
export class CreateUser {
  constructor(
    private readonly validateUsername: ValidateUsername,
    private readonly userRepository: SqlUserRepository,
    private readonly encryptionService: BcryptEncryptionService,
  ) {}

  async execute(params: CreateUserParams): Promise<UserResponseDto> {
    await this.validateUsername.execute(params.username);

    const hashedPassword = await this.encryptionService.hash(params.password);
    const newUser = User.create({ ...params, password: hashedPassword });

    await this.userRepository.create(newUser);
    return UserMapper.toResponse(newUser);
  }
}
