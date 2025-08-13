import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateUser,
  DeleteUser,
  GetUserById,
  GetUsers,
  UpdateUser,
  UserResponseDto,
} from '../application';
import { UserRole } from '../core';
import { UserController } from './user.controller';

const mockCreateUser = {
  execute: jest.fn().mockResolvedValue(
    new UserResponseDto({
      id: 'testid',
      firstName: 'test',
      lastName: 'test',
      username: 'test',
      role: UserRole.USER,
      isActive: true,
    }),
  ),
};
const mockGetUserById = {
  execute: jest.fn().mockResolvedValue({
    getId: () => {
      return { toString: () => '1' };
    },
    getFirstName: () => 'Jane',
    getLastName: () => 'Smith',
    getUsername: () => 'janesmith',
    getRole: () => 'admin',
    getIsActive: () => false,
  }),
};
const mockGetUsers = {
  execute: jest.fn().mockResolvedValue([
    new UserResponseDto({
      id: 'test1',
      firstName: 'test1',
      lastName: 'test1',
      username: 'test1',
      role: UserRole.ADMIN,
      isActive: true,
    }),
    new UserResponseDto({
      id: 'test2',
      firstName: 'test2',
      lastName: 'test2',
      username: 'test2',
      role: UserRole.ADMIN,
      isActive: true,
    }),
    new UserResponseDto({
      id: 'test3',
      firstName: 'test3',
      lastName: 'test3',
      username: 'test3',
      role: UserRole.ADMIN,
      isActive: true,
    }),
  ]),
};
const mockUpdateUser = {
  execute: jest.fn().mockResolvedValue(undefined),
};
const mockDeleteUser = {
  execute: jest.fn().mockResolvedValue(undefined),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CreateUser, useValue: mockCreateUser },
        { provide: GetUserById, useValue: mockGetUserById },
        { provide: GetUsers, useValue: mockGetUsers },
        { provide: UpdateUser, useValue: mockUpdateUser },
        { provide: DeleteUser, useValue: mockDeleteUser },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('saveUser', () => {
    it('should return the created user', async () => {
      const returnValue = await controller.save({
        firstName: 'test',
        lastName: 'test',
        password: 'testpass',
        role: UserRole.USER,
        username: 'test',
      });
      expect(returnValue.id).toBe('testid');
      expect(returnValue.firstName).toBe('test');
      expect(returnValue.role).toBe(UserRole.USER);
    });
  });

  describe('findAllUsers', () => {
    it('should get the list of users', async () => {
      const users = await controller.findAll({});
      expect(Array.isArray(users)).toBe(true);
      expect(users[0].firstName).toBe('test1');
      expect(users[1].lastName).toBe('test2');
      expect(users[2].username).toBe('test3');
      expect(users.length).toBe(3);
    });
  });

  describe('findOneUser', () => {
    it('should get a user matching id', async () => {
      const user = await controller.findOne('1');
      expect(user.id).toBe('1');
      expect(user.firstName).toBe('Jane');
    });
  });

  describe('updateUser', () => {
    it('should update a user and return void', async () => {
      const result = await controller.update('testid', {
        firstName: 'test',
        role: UserRole.EDITOR,
      });
      expect(result).toBeUndefined();
      expect(mockUpdateUser.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'testid',
          firstName: 'test',
          role: UserRole.EDITOR,
        }),
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return void', async () => {
      const result = await controller.delete('testid');
      expect(result).toBeUndefined();
      expect(mockDeleteUser.execute).toHaveBeenCalledWith('testid');
    });
  });
});
