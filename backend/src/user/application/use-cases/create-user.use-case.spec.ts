import { User, UserRole } from '../../core';
import { UserResponseDto } from '../dtos/user-response.dto';
import { CreateUser } from './create-user.use-case';

describe('CreateUser UseCase', () => {
  let useCase: CreateUser;
  let validateUsername: any;
  let userRepository: any;
  let encryptionService: any;

  const params = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: 'password123',
    role: UserRole.USER,
  };

  beforeEach(() => {
    validateUsername = { execute: jest.fn().mockResolvedValue(undefined) };
    userRepository = { create: jest.fn().mockResolvedValue(undefined) };
    encryptionService = { hash: jest.fn().mockResolvedValue('hashedPassword') };
    useCase = new CreateUser(
      validateUsername,
      userRepository,
      encryptionService,
    );
  });

  it('should create a user and return UserResponseDto', async () => {
    const result = await useCase.execute(params);
    expect(validateUsername.execute).toHaveBeenCalledWith('johndoe');
    expect(encryptionService.hash).toHaveBeenCalledWith('password123');
    expect(userRepository.create).toHaveBeenCalledWith(expect.any(User));
    expect(result).toBeInstanceOf(UserResponseDto);
    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Doe');
    expect(result.username).toBe('johndoe');
    expect(result.role).toBe(UserRole.USER);
    expect(result.isActive).toBe(true);
  });

  it('should propagate error from validateUsername', async () => {
    validateUsername.execute.mockRejectedValue(new Error('Username error'));
    await expect(useCase.execute(params)).rejects.toThrow('Username error');
  });

  it('should propagate error from encryptionService.hash', async () => {
    encryptionService.hash.mockRejectedValue(new Error('Hash error'));
    await expect(useCase.execute(params)).rejects.toThrow('Hash error');
  });

  it('should propagate error from userRepository.create', async () => {
    userRepository.create.mockRejectedValue(new Error('Repo error'));
    await expect(useCase.execute(params)).rejects.toThrow('Repo error');
  });
});
