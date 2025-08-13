import { Uuid } from '../../shared/core';
import { User } from '../core';
import { SqlUser } from './sql-user.entity';

export class UserMapper {
  static toUser(user: SqlUser): User {
    return User.restore({
      ...user,
      id: Uuid.fromString(user.id),
    });
  }

  static toPrimitives(user: User) {
    return {
      id: user.getId().toString(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      username: user.getUsername(),
      password: user.getHashedPassword(),
      role: user.getRole(),
      refreshToken: user.getRefreshToken(),
      isActive: user.getIsActive(),
    };
  }
}
