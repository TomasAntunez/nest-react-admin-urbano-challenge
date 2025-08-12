import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentModule } from '../content/content.module';
import { CourseController } from './course.controller';
import { Course } from './course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    forwardRef(() => ContentModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
