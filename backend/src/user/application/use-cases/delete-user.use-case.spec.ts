import { User } from '../../core/user';
import { SqlUserRepository } from '../../infrastructure/sql-user.repository';
import { DeleteUser } from './delete-user.use-case';
import { GetUserById } from './get-user-by-id.use-case';

describe('DeleteUser UseCase', () => {
  let useCase: DeleteUser;
  let mockGetUserById: jest.Mocked<GetUserById>;
  let mockUserRepository: jest.Mocked<SqlUserRepository>;

  beforeEach(() => {
    mockGetUserById = {
      execute: jest.fn().mockResolvedValue({} as User),
    } as any;
    mockUserRepository = {
      delete: jest.fn().mockResolvedValue(undefined),
    } as any;
    useCase = new DeleteUser(mockGetUserById, mockUserRepository);
  });

  it('should delete user if found', async () => {
    await expect(useCase.execute('user-id')).resolves.toBeUndefined();
    expect(mockGetUserById.execute).toHaveBeenCalledWith('user-id');
    expect(mockUserRepository.delete).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should propagate error from getUserById', async () => {
    mockGetUserById.execute.mockRejectedValue(new Error('not found'));
    await expect(useCase.execute('bad-id')).rejects.toThrow('not found');
  });

  it('should propagate error from userRepository.delete', async () => {
    mockUserRepository.delete.mockRejectedValue(new Error('delete error'));
    await expect(useCase.execute('user-id')).rejects.toThrow('delete error');
  });
});
