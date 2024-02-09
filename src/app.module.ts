import { PrismaService } from './database/prisma.service';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
