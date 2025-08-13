import { User } from '../../core';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.getId().toString(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      username: user.getUsername(),
      role: user.getRole(),
      isActive: user.getIsActive(),
    });
  }
}
