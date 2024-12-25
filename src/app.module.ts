import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { FlowersModule } from './flowers/flowers.module';
import { ParamsModule } from './params/params.module';

@Module({
  imports: [PrismaModule, CategoriesModule, FlowersModule, ParamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
