import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../articles/entity/articles.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entity/categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category,Article])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
