import { User } from '../../user/entities';

export interface AuthResponseDto {
  token: string;
  user: User;
}
