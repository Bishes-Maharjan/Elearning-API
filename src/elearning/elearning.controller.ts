import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CourseDTO } from 'src/elearning/dtos/create-course.dto';
import { EditCourseDTO } from 'src/elearning/dtos/edit-course.dto';
import { ChangeOrder } from './dtos/chane-order.dto';
import { ElearningService } from './elearning.service';

@ApiTags('Course')
@Controller('course')
export class ElearningController {
  constructor(private elearningService: ElearningService) {}
  @ApiOperation({ summary: 'Create Course' })
  @Post()
  @UseInterceptors(FileInterceptor('file')) // Handle file upload
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiConsumes('multipart/form-data') // Specify the content type
  @ApiBody({
    description: 'Create a new course with an image',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'English II' },
        category: { type: 'string', example: 'Language' },
        subCategory: { type: 'string', example: 'English II' },
        department: { type: 'string', example: 'English Department' },
        modifiedBy: { type: 'string', example: 'John Doe' },
        videoFor: { type: 'string', example: 'Students' },

        file: {
          type: 'string',
          format: 'binary', // Specify that this is a file
        },
      },
      required: [
        'title',
        'category',
        'subCategory',
        'department',
        'modifiedBy',
        'videoFor',
      ],
    },
  })
  async createCourse(
    @Body() coursedto: CourseDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.elearningService.createCourse(coursedto, file);
  }

  //Get All
  @ApiOperation({ summary: 'Get Course' })
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
    example: '',
    description: 'Filter attribute (e.g., title, order)',
  })
  @ApiQuery({
    name: 'value',
    required: false,
    type: String,
    example: '',
    description: 'Value for the filter attribute',
  })
  //opted for using the boxes rather than using '/?title=&category=...' in the whole query body and later needing to destructure it in services
  async getCourse(
    @Query('page') page: number,
    @Query('limit') limit: number,
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

  //Delete All the Courses
  @ApiOperation({ summary: 'Delete all the courses' })
  @Delete()
  async deleteAllCourse() {
    return this.elearningService.deleteAllCourse();
  }
  @ApiOperation({ summary: 'Change the order of a course' })
  @Patch('/:id/change-order')
  async changeOrder(@Param('id') id: string, @Body() changeOrder: ChangeOrder) {
    const order = changeOrder.order;
    return this.elearningService.changeOrder(id, order);
  }
}
