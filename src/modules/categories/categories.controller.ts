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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('文章分类模块')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: '创建文章分类',
  })
  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @AuthUser('id') userId: number,
  ) {
    return await this.categoryService.createCategory(createCategoryDto, userId);
  }

  @ApiOperation({
    summary: '查找文章分类列表',
  })
  @Get('/list/:username')
  async getCategoryList(@Param('username') username: string) {
    return await this.categoryService.getCategoryList(username);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '删除文章分类',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async deleteCategory(
    @Param('id') id: number,
    @AuthUser('id') userId: number,
  ) {
    return await this.categoryService.deleteCategory(id, userId);
  }
}
