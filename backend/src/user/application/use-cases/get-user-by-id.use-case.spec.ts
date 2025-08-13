import { Logger, NotFoundException } from '@nestjs/common';

import { User } from '../../core/user';
import { SqlUserRepository } from '../../infrastructure/sql-user.repository';
import { GetUserById } from './get-user-by-id.use-case';

describe('GetUserById UseCase', () => {
  let useCase: GetUserById;
  let mockUserRepository: jest.Mocked<SqlUserRepository>;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn().mockResolvedValue(undefined),
    } as any;
    mockLogger = {
      error: jest.fn(),
    } as any;
    useCase = new GetUserById(mockUserRepository, mockLogger);
  });

  it('should return user if found', async () => {
    const userMock = {} as User;
    mockUserRepository.findById.mockResolvedValue(userMock);
    const result = await useCase.execute('some-id');
    expect(result).toBe(userMock);
    expect(mockUserRepository.findById).toHaveBeenCalled();
  });

  it('should throw NotFoundException if user not found', async () => {
    await expect(useCase.execute('missing-id')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining('missing-id'),
      undefined,
      GetUserById.name,
    );
  });
});
