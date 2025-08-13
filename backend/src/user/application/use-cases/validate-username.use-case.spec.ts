import { BadRequestException, Logger } from '@nestjs/common';

import { SqlUserRepository } from '../../infrastructure/sql-user.repository';
import { ValidateUsername } from './validate-username.use-case';

describe('ValidateUsername UseCase', () => {
  let useCase: ValidateUsername;
  let mockUserRepository: jest.Mocked<SqlUserRepository>;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    mockUserRepository = {
      findByUsername: jest.fn().mockResolvedValue(undefined),
    } as any;
    mockLogger = {
      warn: jest.fn(),
    } as any;
    useCase = new ValidateUsername(mockUserRepository, mockLogger);
  });

  it('should not throw if user does not exist', async () => {
    await expect(useCase.execute('newuser')).resolves.toBeUndefined();
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('newuser');
  });

  it('should throw BadRequestException if user exists', async () => {
    const userMock = {
      getUsername: () => 'existinguser',
      getId: () => ({ toString: () => 'uuid' }),
    };
    mockUserRepository.findByUsername.mockResolvedValue(userMock as any);
    await expect(useCase.execute('existinguser')).rejects.toThrow(
      BadRequestException,
    );
    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('existinguser'),
      ValidateUsername.name,
    );
  });
});
