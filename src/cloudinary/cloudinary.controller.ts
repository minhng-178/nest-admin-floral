// app.controller.ts
import {
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CloudinaryResponse } from './cloudinary-response';

@Controller('image')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 2 })
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .build(),
    )
    file: Express.Multer.File,
  ): Promise<CloudinaryResponse> {
    return this.cloudinaryService.uploadFile(file);
  }

  @Post('multiple-upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files'))
  multipleUpload(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1024 * 1024 * 4 })
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .build(),
    )
    files: Array<Express.Multer.File>,
  ): Promise<Array<CloudinaryResponse>> {
    return this.cloudinaryService.multipleUpload(files);
  }
}
