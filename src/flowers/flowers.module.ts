import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService],
  imports: [PrismaModule],
})
export class FlowersModule {}
