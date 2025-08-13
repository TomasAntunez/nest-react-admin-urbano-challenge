import { v4 as uuid } from 'uuid';

export class Uuid {
  private constructor(private readonly value: string) {}

  static create(): Uuid {
    return new Uuid(uuid());
  }

  static fromString(uuid: string): Uuid {
    return new Uuid(uuid);
  }

  toString(): string {
    return this.value;
  }
}
