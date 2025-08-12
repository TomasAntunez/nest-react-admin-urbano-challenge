import { CreateCourseContentDto } from './create-course-content.dto';

export interface UpdateCourseContentDto
  extends Partial<CreateCourseContentDto> {
  id: string;
  courseId: string;
}
