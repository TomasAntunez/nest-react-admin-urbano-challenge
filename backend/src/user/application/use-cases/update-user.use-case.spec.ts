import { BcryptEncryptionService } from '../../../auth/infrastructure';
import { SqlUserRepository } from '../../infrastructure/sql-user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { GetUserById } from './get-user-by-id.use-case';
import { UpdateUser } from './update-user.user-case';
import { ValidateUsername } from './validate-username.use-case';

describe('UpdateUser UseCase', () => {
  let useCase: UpdateUser;
  let mockValidateUsername: jest.Mocked<ValidateUsername>;
  let mockGetUserById: jest.Mocked<GetUserById>;
  let mockEncryptionService: jest.Mocked<BcryptEncryptionService>;
  let mockUserRepository: jest.Mocked<SqlUserRepository>;

  beforeEach(() => {
    mockValidateUsername = {
      execute: jest.fn().mockResolvedValue(undefined),
    } as any;
    mockGetUserById = {
      execute: jest.fn().mockResolvedValue({
        getUsername: () => 'olduser',
        edit: jest.fn(),
      }),
    } as any;
    mockEncryptionService = {
      hash: jest.fn().mockResolvedValue('hashedPass'),
    } as any;
    mockUserRepository = {
      update: jest.fn().mockResolvedValue(undefined),
    } as any;
    useCase = new UpdateUser(
      mockValidateUsername,
      mockGetUserById,
      mockEncryptionService,
      mockUserRepository,
    );
  });

  it('should update user with new username and password', async () => {
    const dto = new UpdateUserDto({
      id: 'id',
      username: 'newuser',
      password: '123456',
    });
    await useCase.execute(dto);
    expect(mockGetUserById.execute).toHaveBeenCalledWith('id');
    expect(mockValidateUsername.execute).toHaveBeenCalledWith('newuser');
    expect(mockEncryptionService.hash).toHaveBeenCalledWith('123456');
    expect(mockUserRepository.update).toHaveBeenCalled();
  });

  it('should not validate username if unchanged', async () => {
    const dto = new UpdateUserDto({ id: 'id', username: 'olduser' });
    await useCase.execute(dto);
    expect(mockValidateUsername.execute).not.toHaveBeenCalled();
  });

  it('should not hash password if not provided', async () => {
    const dto = new UpdateUserDto({ id: 'id', username: 'olduser' });
    await useCase.execute(dto);
    expect(mockEncryptionService.hash).not.toHaveBeenCalled();
  });

  it('should propagate error from getUserById', async () => {
    mockGetUserById.execute.mockRejectedValue(new Error('not found'));
    const dto = new UpdateUserDto({ id: 'id', username: 'newuser' });
    await expect(useCase.execute(dto)).rejects.toThrow('not found');
  });

  it('should propagate error from validateUsername', async () => {
    mockValidateUsername.execute.mockRejectedValue(new Error('username error'));
    const dto = new UpdateUserDto({ id: 'id', username: 'newuser' });
    await expect(useCase.execute(dto)).rejects.toThrow('username error');
  });

  it('should propagate error from encryptionService.hash', async () => {
    mockEncryptionService.hash.mockRejectedValue(new Error('hash error'));
    const dto = new UpdateUserDto({
      id: 'id',
      username: 'newuser',
      password: '123456',
    });
    await expect(useCase.execute(dto)).rejects.toThrow('hash error');
  });

  it('should propagate error from userRepository.update', async () => {
    mockUserRepository.update.mockRejectedValue(new Error('update error'));
    const dto = new UpdateUserDto({ id: 'id', username: 'newuser' });
    await expect(useCase.execute(dto)).rejects.toThrow('update error');
  });
});
