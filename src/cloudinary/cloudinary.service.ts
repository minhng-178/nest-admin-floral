// cloudinary.service.ts

import * as streamifier from 'streamifier';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'Floral' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async multipleUpload(
    files: Express.Multer.File[],
  ): Promise<CloudinaryResponse[]> {
    return Promise.all(
      files.map((file) => {
        return this.uploadFile(file);
      }),
    );
  }
}
