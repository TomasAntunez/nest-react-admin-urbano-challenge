import { compare, hash } from 'bcrypt';

import { EncryptionService } from '../core';

export class BcryptEncryptionService implements EncryptionService {
  async hash(data: string): Promise<string> {
    return await hash(data, 10);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return await compare(data, hashed);
  }
}
