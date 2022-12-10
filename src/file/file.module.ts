import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { AiLogicService } from '../ai-logic/ai-logic.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AiLogicModule } from '../ai-logic/ai-logic.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [HttpModule, AiLogicModule]
})
export class FileModule {}
