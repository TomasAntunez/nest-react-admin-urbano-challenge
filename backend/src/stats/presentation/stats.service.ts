import { Injectable } from '@nestjs/common';
import { SqlUserRepository } from 'src/user/infrastructure';

import { CourseService } from '../../course/presentation';
import { CourseContentService } from '../../course-content/presentation';
import { StatsResponseDto } from './stats.dto';

@Injectable()
export class StatsService {
  constructor(
    private readonly userRepository: SqlUserRepository,
    private readonly courseService: CourseService,
    private readonly contentService: CourseContentService,
  ) {}

  async getStats(): Promise<StatsResponseDto> {
    const [
      numberOfUsers,
      numberOfCourses,
      numberOfContents,
    ] = await Promise.all([
      this.userRepository.count(),
      this.courseService.count(),
      this.contentService.count(),
    ]);

    return { numberOfUsers, numberOfContents, numberOfCourses };
  }
}
