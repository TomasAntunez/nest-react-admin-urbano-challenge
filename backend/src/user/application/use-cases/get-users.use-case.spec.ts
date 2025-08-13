import { FindUsersDto } from '../../core/find-users.dto';
import { SqlUserRepository } from '../../infrastructure/sql-user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';
import { GetUsers } from './get-users.use-case';

describe('GetUsers UseCase', () => {
  let useCase: GetUsers;
  let mockUserRepository: jest.Mocked<SqlUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findAll: jest.fn().mockResolvedValue([]),
    } as any;
    useCase = new GetUsers(mockUserRepository);
  });

  it('should return mapped users', async () => {
    const users = [
      {
        getId: () => {
          return { toString: () => '1' };
        },
        getFirstName: () => 'John',
        getLastName: () => 'Doe',
        getUsername: () => 'johndoe',
        getRole: () => 'user',
        getIsActive: () => true,
      },
      {
        getId: () => {
          return { toString: () => '1' };
        },
        getFirstName: () => 'Jane',
        getLastName: () => 'Smith',
        getUsername: () => 'janesmith',
        getRole: () => 'admin',
        getIsActive: () => false,
      },
    ];
    mockUserRepository.findAll.mockResolvedValue(users as any);
    const dto = new FindUsersDto({ firstName: 'John' });
    const result = await useCase.execute(dto);
    expect(mockUserRepository.findAll).toHaveBeenCalledWith(dto);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(UserResponseDto);
    expect(result[0].firstName).toBe('John');
    expect(result[1].username).toBe('janesmith');
  });

  it('should propagate errors from repository', async () => {
    mockUserRepository.findAll.mockRejectedValue(new Error('repo error'));
    await expect(useCase.execute(new FindUsersDto({}))).rejects.toThrow(
      'repo error',
    );
  });
});
