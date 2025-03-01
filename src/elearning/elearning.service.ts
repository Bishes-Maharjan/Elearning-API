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
import { CloudinaryConfig } from './cloudinary/cloudinary.config';

@Injectable()
export class ElearningService {
  constructor(
    @InjectModel(Course.name) private course: Model<CourseDocument>,
    private cloudinary: CloudinaryConfig,
  ) {}
  // Creating the Course
  async createCourse(coursedto: CourseDTO, file?: Express.Multer.File) {
    let imgUrl: string | undefined;
    if (file) {
      //Cloudinary for Image Upload
      const base64File = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`; // file.buffer.toString('base64'): Converts the file buffer to a base64-encoded string.
      const cloudinary = this.cloudinary.getCloudinary(); //Get the cloudinary
      const result = cloudinary.uploader.upload(base64File); //upload the actual file path to the cloudinary
      imgUrl = (await result).secure_url; //Gets the Image URL
    }
    const allCourse = await this.course.find({}); // For finding existing courses to determine the order
    const newCourse = new this.course(coursedto); // creates the course
    newCourse.order = allCourse.length + 1; // sets the order
    newCourse.imageUrl = imgUrl; // sets the image ur;
    if (!newCourse) throw new ForbiddenException('Couldnt Create the course');
    return newCourse.save();
  }

  // Getting all the Course
  async getAllCourse(
    page: number = 0, //pagination ; starts from 0
    limit: number = 10, //limit 10 as deafult
    sortBy: string = 'createdAt', //deafult sorts acc to creation date
    sort: string = 'asc', // ascending by deafult
    filter: string = '', // filter none as default
    value: string | null,
  ) {
    const sortOrder = sort == 'asc' ? 1 : -1;
    const skip = page * limit;
    const newCourse = await this.course
      .find({ [filter]: value })
      .select('order title category subCategory VideoFor modifiedBy status') // Displaying onyl these particular values as shown in the refernce figma picture
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();
    if (!newCourse) throw new NotFoundException('Course not found');
    return newCourse;
  }

  // Getting a single course with id as params
  async getOneCourse(id: string) {
    const course = await this.course.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  //Patching the Course, Editing it, Setting the LastModified to DAte.now()
  async patchACourse(id: string, editCourse: EditCourseDTO) {
    const course = await this.course.findByIdAndUpdate(id, editCourse, {
      new: true,
      runValidators: true,
    });
    if (!course) throw new NotFoundException('Course couldnt be updated');
    return course;
  }

  // Setting the isDeleted to true for one course
  async deleteACourse(id: string) {
    const course = await this.course
      .findByIdAndUpdate(id, { isDeleted: true })
      .exec();
    if (!course) throw new Error('Couldnt Delete the Course');
    return course;
  }

  // Setting the isDeleted to true for all course
  async deleteAllCourse() {
    const course = await this.course.updateMany({}, { isDeleted: true }).exec();
    if (!course) throw new Error('There was a problem delete all the courses');
    return { msg: 'Successfully Delete All The records', course };
  }

  async changeOrder(id: string, newOrder: number) {
    const course = await this.course.findOne({ _id: id }).exec();
    console.log(course);
    if (!course) throw new NotFoundException('Course Not found');
    const currentOrder: number = course.order;

    if (currentOrder < newOrder) {
      const course = await this.course
        .updateMany(
          { order: { $gt: currentOrder, $lte: newOrder } },
          { $inc: { order: -1 } },
        )
        .exec();
      console.log('the course that runs after condition \n');
      console.log(course);
    } else {
      await this.course
        .updateMany(
          { order: { $lt: currentOrder, $gte: newOrder } },
          { $inc: { order: 1 } },
        )
        .exec();
      console.log('the course that runs after condition');
      console.log(course);
    }
    await this.course.findByIdAndUpdate(id, { order: newOrder });
    const allCourses = await this.course
      .find({})
      .select('order title category subCategory VideoFor modifiedBy status')
      .sort({ order: 1 })
      .exec();
    console.log('all the courses: \n');
    console.log(allCourses);
    return { msg: 'Updated Order List', allCourses };
  }
}
