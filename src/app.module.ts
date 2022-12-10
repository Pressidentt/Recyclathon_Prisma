import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AiLogicModule } from './ai-logic/ai-logic.module';
import { BinModule } from './bin/bin.module';
import { ItemModule } from './item/item.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UserModule, AuthModule,
    AiLogicModule, BinModule,
    ItemModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
