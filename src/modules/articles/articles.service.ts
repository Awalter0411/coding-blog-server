import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-aritlce.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/articles.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
  ) {}

  // 创建文章
  async createArticle(createArticleDto: CreateArticleDto, userId: number) {
    const article = new Article();
    for (let key in createArticleDto) {
      article[key] = createArticleDto[key];
    }
    article.user = userId;
    await this.articlesRepository.save(article);
    return '添加成功';
  }

  // 查找文章列表
  async getArticleList(userId: number) {
    const articleList = await this.articlesRepository.find({
      where: { isDelete: false, user: userId },
    });
    return articleList;
  }

  // 查找文章详情
  async getArticleDetail(id: number, userId: number) {
    return await this.articlesRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: userId,
      },
    });
  }
  // 修改文章
  async updateArticle(updateArticleDto: UpdateArticleDto,userId:number) {
    const { id } = updateArticleDto;
    const article = await this.articlesRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: userId
      },
    });
    if (!article) {
      throw new HttpException('没有找到文章', 404);
    }
    for (let key in updateArticleDto) {
      article[key] = updateArticleDto[key];
    }
    await this.articlesRepository.save(article);
    return '修改成功';
  }
}
