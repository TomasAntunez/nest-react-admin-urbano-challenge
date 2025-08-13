import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SqlUser, SqlUserRepository } from './infrastructure';
import { UserController, UserService } from './presentation';

@Module({
  imports: [TypeOrmModule.forFeature([SqlUser])],
  controllers: [UserController],
  providers: [SqlUserRepository, UserService],
  exports: [SqlUserRepository, UserService],
})
export class UserModule {}
