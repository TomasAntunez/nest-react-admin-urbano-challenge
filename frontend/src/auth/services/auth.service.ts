import axios from 'axios';

import { httpService } from '../../shared/services';
import { AuthResponseDto, LoginDto } from '../dtos';

class AuthService {
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const authResponse = (
      await axios.post<AuthResponseDto>('/api/auth/login', dto, {
        withCredentials: true,
      })
    ).data;
    httpService.defaults.headers.Authorization = `Bearer ${authResponse.token}`;
    return authResponse;
  }

  async logout(): Promise<void> {
    await httpService.post('/api/auth/logout', {}, { withCredentials: true });
    httpService.defaults.headers.Authorization = null;
  }

  async refresh(): Promise<AuthResponseDto> {
    const authResponse = (
      await axios.post<AuthResponseDto>(
        '/api/auth/refresh',
        {},
        { withCredentials: true },
      )
    ).data;
    httpService.defaults.headers.Authorization = `Bearer ${authResponse.token}`;
    return authResponse;
  }
}

export const authService = new AuthService();
