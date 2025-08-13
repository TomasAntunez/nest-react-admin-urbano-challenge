import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { BcryptEncryptionService } from './infrastructure';
import { AuthController, AuthService, JwtStrategy } from './presentation';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, BcryptEncryptionService],
  exports: [BcryptEncryptionService],
})
export class AuthModule {}
