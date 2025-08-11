import { User } from '../user/User';

export interface AuthResponse {
  token: string;
  user: User;
}
