import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../users/decorators/user.decorator';
import { ArticlesService } from './articles.service';
import { ArticleListDto } from './dto/article-list.dto';
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
  @Post('list')
  @UseGuards(AuthGuard('jwt'))
  async getArticleList(@Body() articleListDto:ArticleListDto,@AuthUser('id') userId:number) {
    return await this.articlesService.getArticleList(articleListDto,userId);
  }

  @ApiOperation({
    summary:'查找文章详情'
  })  
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getArticleDetail(@Param('id') id: number,@AuthUser('id') userId:number) {
    return await this.articlesService.getArticleDetail(id,userId);
  }

  @ApiOperation({
    summary:'修改文章'
  })
  @Post('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateArticle(@Body() updateArticleDto:UpdateArticleDto,@AuthUser('id') userId:number){
    return await this.articlesService.updateArticle(updateArticleDto,userId)
  }

  @ApiOperation({
    summary: '删除文章'
  })
  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteArticle(@Param('id') id:number,@AuthUser('id') userId:number){
    return await this.articlesService.deleteArtilce(id,userId)
  }
}
