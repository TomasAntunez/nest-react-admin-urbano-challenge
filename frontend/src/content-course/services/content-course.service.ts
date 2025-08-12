import { httpService } from '../../shared/services';
import {
  CreateCourseContentDto,
  FindCourseContentsDto,
  UpdateCourseContentDto,
} from '../dtos';
import { CourseContent } from '../entities';

class CourseContentService {
  async findAll(dto: FindCourseContentsDto): Promise<CourseContent[]> {
    const { courseId, ...rest } = dto;

    const { data } = await httpService.get<CourseContent[]>(
      `/api/courses/${courseId}/contents`,
      { params: rest },
    );

    return data;
  }

  async save(dto: CreateCourseContentDto): Promise<void> {
    const { courseId, ...rest } = dto;
    await httpService.post(`/api/courses/${courseId}/contents`, rest);
  }

  async update(dto: UpdateCourseContentDto): Promise<void> {
    const { id, courseId, ...rest } = dto;
    await httpService.put(`/api/courses/${courseId}/contents/${id}`, rest);
  }

  async delete(courseId: string, id: string): Promise<void> {
    await httpService.delete(`/api/courses/${courseId}/contents/${id}`);
  }
}

export const courseContentService = new CourseContentService();
