import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '../course/course.module';
import { CourseContent } from './infrastructure';
import { CourseContentService } from './presentation';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseContent]),
    forwardRef(() => CourseModule),
  ],
  controllers: [],
  providers: [CourseContentService],
  exports: [CourseContentService],
})
export class CourseContentModule {}
