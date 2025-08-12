import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { CourseService } from '../../course/presentation';
import { CourseContent } from '../infrastructure';
import {
  CreateCourseContentDto,
  UpdateCourseContentDto,
} from './course-content.dto';
import { CourseContentQuery } from './course-content.query';

@Injectable()
export class CourseContentService {
  constructor(private readonly courseService: CourseService) {}

  async save(
    courseId: string,
    createContentDto: CreateCourseContentDto,
  ): Promise<CourseContent> {
    const { name, description } = createContentDto;
    const course = await this.courseService.findById(courseId);
    return await CourseContent.create({
      name,
      description,
      course,
      dateCreated: new Date(),
    }).save();
  }

  async findAll(contentQuery: CourseContentQuery): Promise<CourseContent[]> {
    Object.keys(contentQuery).forEach((key) => {
      contentQuery[key] = ILike(`%${contentQuery[key]}%`);
    });

    return await CourseContent.find({
      where: contentQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<CourseContent> {
    const content = await CourseContent.findOne(id);

    if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return content;
  }

  async findByCourseIdAndId(
    courseId: string,
    id: string,
  ): Promise<CourseContent> {
    const content = await CourseContent.findOne({ where: { courseId, id } });
    if (!content) {
      throw new HttpException(
        `Could not find content with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return content;
  }

  async findAllByCourseId(
    courseId: string,
    contentQuery: CourseContentQuery,
  ): Promise<CourseContent[]> {
    Object.keys(contentQuery).forEach((key) => {
      contentQuery[key] = ILike(`%${contentQuery[key]}%`);
    });
    return await CourseContent.find({
      where: { courseId, ...contentQuery },
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async update(
    courseId: string,
    id: string,
    updateContentDto: UpdateCourseContentDto,
  ): Promise<CourseContent> {
    const content = await this.findByCourseIdAndId(courseId, id);
    return await CourseContent.create({
      id: content.id,
      ...updateContentDto,
    }).save();
  }

  async delete(courseId: string, id: string): Promise<string> {
    const content = await this.findByCourseIdAndId(courseId, id);
    await CourseContent.delete(content);
    return id;
  }

  async count(): Promise<number> {
    return await CourseContent.count();
  }
}
