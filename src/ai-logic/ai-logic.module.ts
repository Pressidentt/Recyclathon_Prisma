import { Module } from '@nestjs/common';
import { AiLogicService } from './ai-logic.service';
import { AiLogicController } from './ai-logic.controller';
import { HttpModule } from '@nestjs/axios';
import { ItemModule } from '../item/item.module';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AiLogicController],
  providers: [AiLogicService, PrismaService],
  imports: [HttpModule, ItemModule],
  exports: [AiLogicService]
})
export class AiLogicModule {}
