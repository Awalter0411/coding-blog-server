import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entity/categories.entity';
import { User } from '../users/entity/users.entity';
import { ArticleListDto } from './dto/article-list.dto';
import { CreateArticleDto } from './dto/create-aritlce.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entity/articles.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 查找用户
  async getUser(username:string){
    return await this.userRepository.findOne({
      where: {
        username
      }
    })
  }

  // 创建文章
  async createArticle(createArticleDto: CreateArticleDto, userId: number) {
    const article = new Article();
    const hasCategory = await this.categoryRepository.findOne({
      where: {
        id: createArticleDto.category,
      },
    });
    if (!hasCategory) {
      throw new HttpException('分类不存在', 404);
    }
    for (let key in createArticleDto) {
      article[key] = createArticleDto[key];
    }
    article.user = userId;
    await this.articlesRepository.save(article);
    return await this.articlesRepository.find({
      where: {
        isDelete: false,
      },
    });
  }

  // 查找文章列表
  async getArticleList(username: string) {
    const user = await this.getUser(username)
    const articleList = await this.articlesRepository.find({
      where: { isDelete: false, user: user.id },
      relations: ['category'],
    });
    return articleList;
  }

  // 查找文章详情
  async getArticleDetail(id: number, username: string) {
    const user = await this.getUser(username)
    const article = await this.articlesRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: user.id,
      },
      relations: ['category'],
    });
    if (!article) {
      throw new HttpException('文章不存在', 404);
    }
    return article;
  }
  // 修改文章
  async updateArticle(updateArticleDto: UpdateArticleDto, userId: number) {
    const { id } = updateArticleDto;
    const article = await this.articlesRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: userId,
      },
    });
    const hasCategory = await this.articlesRepository.findOne({
      where: {
        id: updateArticleDto.category,
      },
    });
    if (!article || !hasCategory) {
      throw new HttpException('没有找到文章或分类', 404);
    }
    for (let key in updateArticleDto) {
      article[key] = updateArticleDto[key];
    }
    await this.articlesRepository.save(article);
    return '修改成功';
  }

  // 删除文章
  async deleteArtilce(id: number, userId: number) {
    const article = await this.articlesRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: userId,
      },
    });
    if (!article) {
      throw new HttpException('文章不存在', 404);
    }
    article.isDelete = true;
    await this.articlesRepository.save(article);
    return await this.articlesRepository.find({
      where: {
        isDelete: false,
      },
      relations: ['category'],
    });
  }
}
