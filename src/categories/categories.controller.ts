import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BaseResponse,
  PagingResponse,
} from 'src/params/dto/params-response.dto';
import { Category } from './entities/category.entity';
import { ParamsRequest } from 'src/params/dto/params-request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: BaseResponse<Category>,
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResponse<Category>> {
    const category = await this.categoriesService.create(createCategoryDto);
    return {
      message: 'Category created successfully',
      success: true,
      status: 'OK',
      data: category,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of categories with pagination',
    type: BaseResponse<PagingResponse<Category>>,
  })
  async findAll(
    @Query() params: ParamsRequest,
  ): Promise<BaseResponse<PagingResponse<Category>>> {
    return this.categoriesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category fetched successfully',
    type: BaseResponse<Category>,
  })
  async findOne(@Param('id') id: string): Promise<BaseResponse<Category>> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    type: BaseResponse<Category>,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResponse<Category>> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category removed successfully',
    type: BaseResponse<Category>,
  })
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
