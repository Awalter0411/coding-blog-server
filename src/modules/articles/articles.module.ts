import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entity/articles.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
