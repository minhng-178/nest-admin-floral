import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { paginate } from 'src/params/helpers/params.helper';
import { ParamsRequest } from 'src/params/dto/params-request.dto';
import {
  BaseResponse,
  PagingResponse,
} from 'src/params/dto/params-response.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResponse<Category>> {
    const category = await this.prisma.category.create({
      data: createCategoryDto,
    });
    return {
      data: category,
      message: 'Category created successfully',
      success: true,
      status: 'OK',
    };
  }

  async findAll(
    params: ParamsRequest,
  ): Promise<BaseResponse<PagingResponse<Category>>> {
    const { page, pageSize, search } = params;

    const take = pageSize || 10;
    const skip = pageSize * (page - 1) || 0;
    const where =
      search !== ''
        ? {
            status: true,
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {};

    const [items, totalItems] = await Promise.all([
      this.prisma.category.findMany({
        where,
        take,
        skip,
      }),
      this.prisma.category.count({ where }),
    ]);

    return paginate(
      items,
      totalItems,
      page,
      pageSize,
      'Categories fetched successfully',
    );
  }

  async findOne(id: string): Promise<BaseResponse<Category>> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return {
      data: category,
      message: 'Category fetched successfully',
      success: true,
      status: 'OK',
    };
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<BaseResponse<Category>> {
    const category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
    return {
      data: category,
      message: 'Category updated successfully',
      success: true,
      status: 'OK',
    };
  }

  async remove(id: string): Promise<BaseResponse<Category>> {
    const category = await this.prisma.category.delete({
      where: { id },
    });
    return {
      data: category,
      message: 'Category deleted successfully',
      success: true,
      status: 'OK',
    };
  }
}
