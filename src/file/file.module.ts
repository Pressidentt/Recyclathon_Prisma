import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { AiLogicService } from '../ai-logic/ai-logic.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [FileController],
  providers: [FileService, AiLogicService],
  imports: [HttpModule]
})
export class FileModule {}
