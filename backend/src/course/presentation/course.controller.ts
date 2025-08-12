import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard, Roles, RolesGuard } from '../../auth/presentation';
import { CourseContent } from '../../course-content/infrastructure';
import {
  CourseContentQuery,
  CourseContentService,
  CreateCourseContentDto,
  UpdateCourseContentDto,
} from '../../course-content/presentation';
import { UserRole } from '../../user/core';
import { Course } from '../infrastructure';
import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { CourseQuery } from './course.query';
import { CourseService } from './course.service';

@Controller('courses')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('Courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => CourseContentService))
    private readonly contentService: CourseContentService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  async save(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.courseService.save(createCourseDto);
  }

  @Get()
  async findAll(@Query() courseQuery: CourseQuery): Promise<Course[]> {
    return await this.courseService.findAll(courseQuery);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return await this.courseService.findById(id);
  }

  @Put('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return await this.courseService.update(id, updateCourseDto);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string): Promise<string> {
    return await this.courseService.delete(id);
  }

  @Post('/:id/contents')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  async saveContent(
    @Param('id') id: string,
    @Body() createContentDto: CreateCourseContentDto,
  ): Promise<CourseContent> {
    return await this.contentService.save(id, createContentDto);
  }

  @Get('/:id/contents')
  async findAllContentsByCourseId(
    @Param('id') id: string,
    @Query() contentQuery: CourseContentQuery,
  ): Promise<CourseContent[]> {
    return await this.contentService.findAllByCourseId(id, contentQuery);
  }

  @Put('/:id/contents/:contentId')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  async updateContent(
    @Param('id') id: string,
    @Param('contentId') contentId: string,
    @Body() updateContentDto: UpdateCourseContentDto,
  ): Promise<CourseContent> {
    return await this.contentService.update(id, contentId, updateContentDto);
  }

  @Delete('/:id/contents/:contentId')
  @Roles(UserRole.ADMIN)
  async deleteContent(
    @Param('id') id: string,
    @Param('contentId') contentId: string,
  ): Promise<string> {
    return await this.contentService.delete(id, contentId);
  }
}
