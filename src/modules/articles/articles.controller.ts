import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-aritlce.dto';
import { UpdateArticleDto } from './dto/update-article.dto';


@ApiBearerAuth()
@ApiTags('文章模块')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({
    summary: '创建文章',
  })
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @ApiOperation({
    summary: '查找文章列表',
  })
  @Get('list')
  async getArticleList() {
    return await this.articlesService.getArticleList();
  }

  @ApiOperation({
    summary:'查找文章详情'
  })  
  @Get(':id')
  async getArticleDetail(@Param('id') id: number) {
    const article = await this.articlesService.getArticleDetail(id);
    if (!article) {
      throw new HttpException('没有找到文章', 404);
    }
    return article;
  }

  @ApiOperation({
    summary:'修改文章'
  })
  @Post('/update')
  async updateArticle(@Body() updateArticleDto:UpdateArticleDto){
    return await this.articlesService.updateArticle(updateArticleDto)
  }
}
