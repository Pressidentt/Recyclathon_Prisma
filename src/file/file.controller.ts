import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { AiLogicService } from '../ai-logic/ai-logic.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService,
    private aiLogicServce: AiLogicService
    ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void) => {
          const extension = extname(file.originalname);
          const filename = v4() + extension;
          callback(null, filename);
          return filename;
        }
      }),

    }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    console.log('test')
    console.log(file.path);
    await this.aiLogicServce.sendImageToApi('https://api.imagga.com/v2/uploads',file); 
  }
}

