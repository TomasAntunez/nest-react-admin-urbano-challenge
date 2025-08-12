import { Injectable } from '@nestjs/common';

import { CourseService } from '../../course/presentation';
import { CourseContentService } from '../../course-content/presentation';
import { UserService } from '../../user/presentation';
import { StatsResponseDto } from './stats.dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly contentService: CourseContentService,
  ) {}
  async getStats(): Promise<StatsResponseDto> {
    const numberOfUsers = await this.userService.count();
    const numberOfCourses = await this.courseService.count();
    const numberOfContents = await this.contentService.count();

    return { numberOfUsers, numberOfContents, numberOfCourses };
  }
}
