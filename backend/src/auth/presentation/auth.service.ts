import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { GetUserById, UserMapper } from '../../user/application';
import { User } from '../../user/core';
import { SqlUserRepository } from '../../user/infrastructure';
import { BcryptEncryptionService } from '../infrastructure';
import { LoginDto, LoginResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly SECRET = process.env.JWT_SECRET;
  private readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

  constructor(
    private readonly userRepository: SqlUserRepository,
    private readonly encryptService: BcryptEncryptionService,
    private readonly jwtService: JwtService,
    private readonly getUserById: GetUserById,
  ) {}

  async login(
    loginDto: LoginDto,
    response: Response,
  ): Promise<LoginResponseDto> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findByUsername(username);

    const passwordsAreEquals = await this.encryptService.compare(
      password,
      user.getHashedPassword(),
    );

    if (!user || !passwordsAreEquals) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!user.getIsActive()) {
      throw new HttpException('Account is disabled', HttpStatus.UNAUTHORIZED);
    }

    const payload = this.createPayload(user);
    const userId = user.getId().toString();

    const accessToken = await this.jwtService.signAsync(payload, {
      subject: userId,
      expiresIn: '15m',
      secret: this.SECRET,
    });

    /* Generates a refresh token and stores it in a httponly cookie */
    const refreshToken = await this.jwtService.signAsync(payload, {
      subject: userId,
      expiresIn: '1y',
      secret: this.REFRESH_SECRET,
    });

    user.setRefreshToken(await this.encryptService.hash(refreshToken));
    await this.userRepository.update(user);

    response.cookie('refresh-token', refreshToken, { httpOnly: true });

    return this.createLoginResponseDto(accessToken, user);
  }

  /* Because JWT is a stateless authentication, this function removes the refresh token from the cookies and the database */
  async logout(request: Request, response: Response): Promise<void> {
    const userId = request.user['userId'];

    const user = await this.getUserById.execute(userId);
    await this.removeUserRefreshToken(user);

    response.clearCookie('refresh-token');
  }

  async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<LoginResponseDto> {
    if (!refreshToken) {
      throw new HttpException('Refresh token required', HttpStatus.BAD_REQUEST);
    }

    const decoded = this.jwtService.decode(refreshToken);
    const user = await this.getUserById.execute(decoded['sub']);

    const refreshTokensAreEquals = await this.encryptService.compare(
      refreshToken,
      user.getRefreshToken(),
    );

    if (!refreshTokensAreEquals) {
      response.clearCookie('refresh-token');
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.FORBIDDEN,
      );
    }

    const userId = user.getId().toString();

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.REFRESH_SECRET,
      });

      const accessToken = await this.jwtService.signAsync(
        this.createPayload(user),
        {
          subject: userId,
          expiresIn: '15m',
          secret: this.SECRET,
        },
      );

      return this.createLoginResponseDto(accessToken, user);
    } catch (error) {
      response.clearCookie('refresh-token');
      await this.removeUserRefreshToken(user);

      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private createPayload(user: User) {
    return {
      username: user.getUsername(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      role: user.getRole(),
    };
  }

  private async removeUserRefreshToken(user: User): Promise<void> {
    user.removeRefreshToken();
    await this.userRepository.update(user);
  }

  private createLoginResponseDto(
    accessToken: string,
    user: User,
  ): LoginResponseDto {
    return {
      token: accessToken,
      user: UserMapper.toResponse(user),
    };
  }
}
