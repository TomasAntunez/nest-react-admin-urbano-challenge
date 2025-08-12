import { Module } from '@nestjs/common';

import { CourseModule } from '../course/course.module';
import { CourseContentModule } from '../course-content/course-content.module';
import { UserModule } from '../user/user.module';
import { StatsController, StatsService } from './presentation';

@Module({
  imports: [UserModule, CourseContentModule, CourseModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
