import { Injectable } from '@nestjs/common';

import { FindUsersDto } from '../../core';
import { SqlUserRepository } from '../../infrastructure';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetUsers {
  constructor(private readonly userRepository: SqlUserRepository) {}

  async execute(dto: FindUsersDto): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll(dto);

    return users.map(UserMapper.toResponse);
  }
}
