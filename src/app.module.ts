import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CardModule,
    DatabaseModule,
  ],
})
export class AppModule {}
