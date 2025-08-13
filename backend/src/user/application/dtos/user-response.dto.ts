interface UserResponseDtoConstructor {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  isActive: boolean;
}

export class UserResponseDto {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly role: string;
  readonly isActive: boolean;

  constructor(data: UserResponseDtoConstructor) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.role = data.role;
    this.isActive = data.isActive;
  }
}
