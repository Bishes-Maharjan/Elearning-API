import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDTO } from 'src/elearning/dtos/create-course.dto';
import { EditCourseDTO } from 'src/elearning/dtos/edit-course.dto';
import { Course, CourseDocument } from 'src/elearning/Schema/course-schema';

@Injectable()
export class ElearningService {
  constructor(
    @InjectModel(Course.name) private course: Model<CourseDocument>,
  ) {}
  async createCourse(coursedto: CourseDTO) {
    const newCourse = new this.course(coursedto);
    if (!newCourse) throw new ForbiddenException('Couldnt Create the course');
    return newCourse.save();
  }
  async getAllCourse(
    page: number = 0,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sort: string = 'asc',
    filter: string,
    value: string | null,
  ) {
    const sortOrder = sort == 'asc' ? 1 : -1;
    const skip = page * limit;
    const newCourse = await this.course
      .find({ [filter]: value })
      .select('title category subCategory VideoFor modifiedBy status')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();
    if (!newCourse) throw new NotFoundException('Course not found');
    return newCourse;
  }
  async getOneCourse(id: string) {
    const course = await this.course.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
  async patchACourse(id: string, editCourse: EditCourseDTO) {
    const course = await this.course
      .findByIdAndUpdate(id, editCourse, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!course) throw new NotFoundException('Course couldnt be updated');
    return course;
  }
  async deleteACourse(id: string) {
    const course = await this.course.findByIdAndDelete(id).exec();
    if (!course) throw new Error('Couldnt Delete the Course');
    return course;
  }
}
