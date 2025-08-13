import { Uuid } from '../../shared/core';
import { UserRole } from '../core';

interface UserConstructor {
  id: Uuid;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
  refreshToken: string | null;
  isActive: boolean;
}

export type CreateUserParams = Omit<
  UserConstructor,
  'id' | 'refreshToken' | 'isActive'
>;

export type EditUserParams = Partial<
  Omit<UserConstructor, 'id' | 'refreshToken'>
>;

export class User {
  private readonly id: Uuid;
  private firstName: string;
  private lastName: string;
  private username: string;
  private password: string;
  private role: UserRole;
  private refreshToken: string | null;
  private isActive: boolean;

  private constructor(data: UserConstructor) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
    this.refreshToken = data.refreshToken;
    this.isActive = data.isActive;
  }

  static create(params: CreateUserParams): User {
    return new User({
      id: Uuid.create(),
      firstName: params.firstName,
      lastName: params.lastName,
      username: params.username,
      password: params.password,
      role: params.role,
      refreshToken: null,
      isActive: true,
    });
  }

  static restore(data: UserConstructor): User {
    return new User(data);
  }

  edit(params: EditUserParams): void {
    if (params.firstName) this.firstName = params.firstName;
    if (params.lastName) this.lastName = params.lastName;
    if (params.username) this.username = params.username;
    if (params.password) this.password = params.password;
    if (params.role) this.role = params.role;
    if (params.isActive !== undefined) this.isActive = params.isActive;
  }

  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken;
  }

  removeRefreshToken(): void {
    this.refreshToken = null;
  }

  getId(): Uuid {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getUsername(): string {
    return this.username;
  }

  getHashedPassword(): string {
    return this.password;
  }

  getRole(): UserRole {
    return this.role;
  }

  getRefreshToken(): string | null {
    return this.refreshToken;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
