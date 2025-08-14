import { forwardRef, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import {
  CreateUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
  ValidateUsername,
} from './application';
import { SqlUser, SqlUserRepository } from './infrastructure';
import { UserController } from './presentation';

@Module({
  imports: [TypeOrmModule.forFeature([SqlUser]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    Logger,
    SqlUserRepository,
    ValidateUsername,
    CreateUser,
    GetUserById,
    GetUsers,
    UpdateUser,
    DeleteUser,
  ],
  exports: [SqlUserRepository, GetUserById, CreateUser],
})
export class UserModule {}
