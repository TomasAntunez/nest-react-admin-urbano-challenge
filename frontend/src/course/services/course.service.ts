import { httpService } from '../../shared/services';
import { CreateCourseDto, FindCoursesDto, UpdateCourseDto } from '../dtos';
import { Course } from '../entities';

class CourseService {
  async save(dto: CreateCourseDto): Promise<void> {
    await httpService.post('/api/courses', dto);
  }

  async findAll(dto: FindCoursesDto): Promise<Course[]> {
    const { data } = await httpService.get<Course[]>('/api/courses', {
      params: dto,
    });
    return data;
  }

  async findOne(id: string): Promise<Course> {
    return (await httpService.get<Course>(`/api/courses/${id}`)).data;
  }

  async update(dto: UpdateCourseDto): Promise<void> {
    const { id, ...updateData } = dto;
    await httpService.put(`/api/courses/${id}`, updateData);
  }

  async delete(id: string): Promise<void> {
    await httpService.delete(`/api/courses/${id}`);
  }
}

export const courseService = new CourseService();
