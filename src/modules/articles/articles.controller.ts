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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../users/decorators/user.decorator';
import { ArticlesService } from './articles.service';
import { ArticleDetailDto } from './dto/article-detail.dto';
import { ArticleListDto } from './dto/article-list.dto';
import { CreateArticleDto } from './dto/create-aritlce.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('文章模块')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '创建文章',
  })
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @AuthUser('id') userId: number,
  ) {
    return await this.articlesService.createArticle(createArticleDto, userId);
  }

  @ApiOperation({
    summary: '查找文章列表',
  })
  @Get('list/:username')
  async getArticleList(@Param('username') username: string) {
    return await this.articlesService.getArticleList(username);
  }

  @ApiOperation({
    summary:'根据分类查找文章列表'
  })
  @ApiParam({
    type:Number,
    name:'id',
    description:'分类id'
  })
  @Get('listByCate/:id')
  async getArticleListByCate(@Param('id') id:number) {
    return await this.articlesService.getArticleListByCate(id)
  }

  @ApiOperation({
    summary: '查找文章详情',
  })
  @Post('detail')
  async getArticleDetail(
    @Body() articleDetailDto:ArticleDetailDto
  ) {
    return await this.articlesService.getArticleDetail(articleDetailDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '修改文章',
  })
  @Post('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateArticle(
    @Body() updateArticleDto: UpdateArticleDto,
    @AuthUser('id') userId: number,
  ) {
    return await this.articlesService.updateArticle(updateArticleDto, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '删除文章',
  })
  @Delete('/delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteArticle(@Param('id') id: number, @AuthUser('id') userId: number) {
    return await this.articlesService.deleteArtilce(id, userId);
  }
}
