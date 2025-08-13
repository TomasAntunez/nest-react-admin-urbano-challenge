import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Uuid } from '../../shared/core';
import { UserMapper, UserResponseDto } from '../application';
import { FindUsersDto, User, UserRepository } from '../core';
import { SqlUserRepository } from '../infrastructure';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserQuery } from './user.query';

@Injectable()
export class UserService {
  constructor(
    @Inject(SqlUserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async save(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findByUsername(
      createUserDto.username,
    );

    if (user) {
      throw new HttpException(
        `User with username ${createUserDto.username} is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password } = createUserDto;
    createUserDto.password = await bcrypt.hash(password, 10);

    const newUser = User.create(createUserDto);
    await this.userRepository.create(newUser);

    return UserMapper.toResponse(newUser);
  }

  async findAll(userQuery: UserQuery): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll(
      new FindUsersDto(userQuery),
    );

    return users.map(UserMapper.toResponse);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(Uuid.fromString(id));

    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.findById(id);

    /* If username is same as before, delete it from the dto */
    if (user.getUsername() === updateUserDto.username) {
      delete updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.username) {
      if (await this.userRepository.findByUsername(updateUserDto.username)) {
        throw new HttpException(
          `User with username ${updateUserDto.username} is already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    user.edit(updateUserDto);
    await this.userRepository.update(user);

    return UserMapper.toResponse(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(await this.findById(id));
  }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }
}
