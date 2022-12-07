import { Module } from '@nestjs/common';
import { AiLogicService } from './ai-logic.service';
import { AiLogicController } from './ai-logic.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AiLogicController],
  providers: [AiLogicService],
  imports: [HttpModule],
  exports: [AiLogicService]
})
export class AiLogicModule {}
