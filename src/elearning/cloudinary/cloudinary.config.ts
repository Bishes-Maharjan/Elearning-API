import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryConfig {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUD_NAME'),
      api_key: this.configService.get<string>('API_KEY'),
      api_secret: this.configService.get<string>('API_SECRET'),
    });
  }

  getCloudinary() {
    return cloudinary;
  }
}
