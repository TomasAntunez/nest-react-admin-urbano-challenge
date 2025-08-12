import { IsNotEmpty } from 'class-validator';

import { User } from '../../user/infrastructure';

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  token: string;
  user: User;
}
