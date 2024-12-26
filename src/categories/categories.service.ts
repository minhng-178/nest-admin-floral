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

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
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

  async findOne(id: number): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: { status: false },
    });
  }
}
