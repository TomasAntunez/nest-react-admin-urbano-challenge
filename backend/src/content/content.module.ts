import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CourseModule } from '../course/course.module';
import { Content } from './content.entity';
import { ContentService } from './content.service';

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
