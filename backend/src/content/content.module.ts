import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '../course/course.module';
import { ContentService } from './content.service';
import { Content } from './content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    forwardRef(() => CourseModule),
  ],
  controllers: [],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
