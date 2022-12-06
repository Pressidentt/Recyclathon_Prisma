import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AiLogicModule } from './ai-logic/ai-logic.module';
import { BinModule } from './bin/bin.module';

@Module({
  imports: [UserModule, AuthModule, AiLogicModule, BinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
