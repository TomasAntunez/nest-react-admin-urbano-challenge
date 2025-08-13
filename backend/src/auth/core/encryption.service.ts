export interface EncryptionService {
  hash(data: string): Promise<string>;
  compare(data: string, hashed: string): Promise<boolean>;
}
