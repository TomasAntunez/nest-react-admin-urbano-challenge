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
import { UserMapper, UserResponseDto } from '../application';
import { UserRole } from '../core';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserQuery } from './user.query';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN)
  async save(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.save(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(@Query() userQuery: UserQuery): Promise<UserResponseDto[]> {
    return await this.userService.findAll(userQuery);
  }

  @Get('/:id')
  @UseGuards(UserGuard)
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return UserMapper.toResponse(await this.userService.findById(id));
  }

  @Put('/:id')
  @UseGuards(UserGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
