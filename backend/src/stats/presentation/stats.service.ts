import { Injectable } from '@nestjs/common';

import { CourseService } from '../../course/presentation';
import { CourseContentService } from '../../course-content/presentation';
import { SqlUserRepository } from '../../user/infrastructure';
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
