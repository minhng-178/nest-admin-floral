import { Injectable } from '@nestjs/common';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower, Prisma } from '@prisma/client';
import {
  BaseResponse,
  PagingResponse,
} from 'src/params/dto/params-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParamsRequest } from 'src/params/dto/params-request.dto';
import { paginate } from 'src/params/helpers/params.helper';

@Injectable()
export class FlowersService {
  constructor(private prisma: PrismaService) {}
  async create(createFlowerDto: CreateFlowerDto): Promise<Flower> {
    const { categoryId, ...flowerData } = createFlowerDto;

    const flower = await this.prisma.flower.create({
      data: {
        ...flowerData,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: flowerData.images.map((image) => ({
            type: image.type,
            id: image.id,
            url: image.url,
            altText: image.altText,
            status: image.status,
          })),
        },
      },
    });

    return flower;
  }

  async findAll(
    params: ParamsRequest,
  ): Promise<BaseResponse<PagingResponse<Flower>>> {
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
      this.prisma.flower.findMany({
        where,
        take,
        skip,
      }),
      this.prisma.flower.count({ where }),
    ]);

    return paginate(items, totalItems, page, pageSize);
  }

  async findOne(id: string): Promise<BaseResponse<Flower>> {
    const flower = await this.prisma.flower.findUnique({
      where: { id },
    });
    return {
      data: flower,
      message: 'Flower found',
      success: true,
      status: 'OK',
    };
  }

  async update(
    id: string,
    updateFlowerDto: UpdateFlowerDto,
  ): Promise<BaseResponse<Flower>> {
    const { categoryId, ...flowerData } = updateFlowerDto;

    const flower = await this.prisma.flower.update({
      where: { id },
      data: {
        ...flowerData,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: flowerData.images.map((image) => ({
            type: image.type,
            id: image.id,
            url: image.url,
            altText: image.altText,
            status: image.status,
          })),
        },
      },
    });

    return {
      data: flower,
      message: 'Flower updated successfully',
      success: true,
      status: 'OK',
    };
  }

  async remove(id: string): Promise<BaseResponse<Flower>> {
    const flower = await this.prisma.flower.delete({
      where: { id },
    });
    return {
      data: flower,
      message: 'Flower deleted successfully',
      success: true,
      status: 'OK',
    };
  }
}
