import { IsNotEmpty } from 'class-validator';

import { UserResponseDto } from '../../user/application';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: UserResponseDto;
}
