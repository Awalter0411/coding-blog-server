import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../articles/entity/articles.entity';
import { User } from '../users/entity/users.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username: string) {
    return await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  // 创建分类
  async createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
    const category = new Category();
    for (let key in createCategoryDto) {
      category[key] = createCategoryDto[key];
    }
    category.user = userId;
    const hasCategory = await this.categoryRepository.findOne({
      where: {
        isDelete: false,
        name: category.name,
        user: userId,
      },
    });
    if (hasCategory) {
      throw new HttpException('分类已经存在', 404);
    }
    if (!category.name) {
      throw new HttpException('分类名不能为空', 404);
    }
    await this.categoryRepository.save(category);
    return await this.categoryRepository.find({
      where: {
        isDelete: false,
      },
    });
  }

  // 查找所有分类
  async getCategoryList(username: string) {
    const user = await this.getUser(username);
    const categoryList = await this.categoryRepository.find({
      where: {
        isDelete: false,
        user: user.id,
      },
    });
    return categoryList;
  }

  // 删除分类
  async deleteCategory(id: number, userId: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        isDelete: false,
        id: id,
        user: userId,
      },
    });
    if (!category) {
      throw new HttpException('分类不存在', 404);
    }
    const articleList = await this.articleRepository.find({
      where: {
        isDelete: false,
        category: category.id,
        user: userId,
      },
    });

    articleList.map((item) => {
      item.isDelete = true;
      this.articleRepository.save(item);
    });

    category.isDelete = true;
    await this.categoryRepository.save(category);

    const res = await this.categoryRepository.find({
      where: {
        isDelete: false,
      },
    });
    return res;
  }
}
