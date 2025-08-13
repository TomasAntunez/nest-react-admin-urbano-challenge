import { UserRole } from './user-role.enum';

interface FindUsersDtoConstructor {
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: UserRole;
}

export class FindUsersDto {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly role?: UserRole;

  constructor(data: FindUsersDtoConstructor) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.role = data.role;
  }
}
