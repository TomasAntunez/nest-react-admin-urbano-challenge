import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseContentModule } from '../course-content/course-content.module';
import { Course } from './infrastructure';
import { CourseController, CourseService } from './presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => CourseContentModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
