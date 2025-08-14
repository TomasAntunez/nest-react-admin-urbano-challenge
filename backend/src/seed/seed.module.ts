import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { SeedService } from './presentation/seed.service';

@Module({
  imports: [UserModule],
  providers: [SeedService],
})
export class SeedModule {}
