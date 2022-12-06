import { Controller } from '@nestjs/common';
import { AiLogicService } from './ai-logic.service';

@Controller('ai-logic')
export class AiLogicController {
  constructor(private readonly aiLogicService: AiLogicService) {}
}
