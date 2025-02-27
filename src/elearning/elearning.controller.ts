import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CourseDTO } from 'src/dtos/create-course.dto';
import { EditCourseDTO } from 'src/dtos/edit-course.dto';
import { ElearningService } from './elearning.service';

@ApiTags('Course')
@Controller('course')
export class ElearningController {
  constructor(private elearningService: ElearningService) {}
  @ApiOperation({ summary: 'Create Course' })
  @Post()
  async createCourse(@Body() coursedto: CourseDTO) {
    return this.elearningService.createCourse(coursedto);
  }
  @ApiOperation({ summary: 'Get Course' })
  //Get All
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 0,
    description: 'Page number (starts from 0)',
    default: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Items per page',
    default: 10,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    example: 'createdAt',
    description: 'Field to sort by',
    default: 'createdAt',
    enum: ['title', 'category', 'subCategory', 'modifiedBy', 'VideoFor'],
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc',
    description: 'Sort order',
    default: 'asc',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    example: 'title',
    description: 'Filter attribute (e.g., title, order)',
  })
  @ApiQuery({
    name: 'value',
    required: false,
    type: String,
    example: 'English',
    description: 'Value for the filter attribute',
  })
  async getCourse(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string,
    @Query('sort') sort: string,
    @Query('filter') filter: string,
    @Query('value') filterValue: string,
  ) {
    return this.elearningService.getAllCourse(
      page,
      limit,
      sortBy,
      sort,
      filter,
      filterValue,
    );
  }
  //Get a Single Course
  @ApiOperation({ summary: 'Get a single Course' })
  @Get(':id')
  async getOneCourse(@Param('id') id: string) {
    return this.elearningService.getOneCourse(id);
  }
  //Update a Single Course
  @ApiOperation({ summary: 'Update a course' })
  @Patch(':id')
  async patchACourse(
    @Param('id') id: string,
    @Body() editCourse: EditCourseDTO,
  ) {
    return this.elearningService.patchACourse(id, editCourse);
  }
  //Delete a Single course
  @ApiOperation({ summary: 'Delete a course' })
  @Delete(':id')
  async deleteACourse(@Param('id') id: string) {
    return this.elearningService.deleteACourse(id);
  }
}
