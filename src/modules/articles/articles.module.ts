import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entity/categories.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entity/articles.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Article,Category])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
