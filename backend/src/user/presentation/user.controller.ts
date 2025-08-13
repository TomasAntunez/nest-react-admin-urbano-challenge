import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  JwtGuard,
  Roles,
  RolesGuard,
  UserGuard,
} from '../../auth/presentation';
import {
  CreateUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
  UpdateUserDto,
  UserMapper,
  UserResponseDto,
} from '../application';
import { FindUsersDto, UserRole } from '../core';
import { CreateUserDto, UpdateUserBodyDto } from './user.dto';
import { UserQuery } from './user.query';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserById: GetUserById,
    private readonly getUsers: GetUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  async save(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.createUser.execute(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(@Query() userQuery: UserQuery): Promise<UserResponseDto[]> {
    return await this.getUsers.execute(new FindUsersDto(userQuery));
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return UserMapper.toResponse(await this.getUserById.execute(id));
  }

  @Put('/:id')
  @UseGuards(UserGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserBodyDto,
  ): Promise<void> {
    await this.updateUser.execute(new UpdateUserDto({ ...updateUserDto, id }));
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
