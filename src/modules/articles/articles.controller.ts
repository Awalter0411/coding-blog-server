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
import { AuthUser } from '../users/decorators/user.decorator';
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
  async createArticle(@Body() createArticleDto: CreateArticleDto,@AuthUser('id') userId:number) {
    return await this.articlesService.createArticle(createArticleDto, userId);
  }

  @ApiOperation({
    summary: '查找文章列表',
  })
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async getArticleList(@AuthUser('id') userId:number) {
    return await this.articlesService.getArticleList(userId);
  }

  @ApiOperation({
    summary:'查找文章详情'
  })  
  @Get(':id')
  async getArticleDetail(@Param('id') id: number,@AuthUser('id') userId:number) {
    const article = await this.articlesService.getArticleDetail(id,userId);
    if (!article) {
      throw new HttpException('没有找到文章', 404);
    }
    return article;
  }

  @ApiOperation({
    summary:'修改文章'
  })
  @Post('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateArticle(@Body() updateArticleDto:UpdateArticleDto,@AuthUser('id') userId:number){
    return await this.articlesService.updateArticle(updateArticleDto,userId)
  }
}
