import { UserRole } from '../../core';

interface UpdateUserDtoConstructor {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}

export class UpdateUserDto {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly password?: string;
  readonly role?: UserRole;
  readonly isActive?: boolean;

  constructor(data: UpdateUserDtoConstructor) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
    this.isActive = data.isActive;
  }
}
