import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { categoryId, images, ...flowerData } = createFlowerDto;

    if (!images || images.length === 0) {
      throw new HttpException('Images are required', HttpStatus.BAD_REQUEST);
    }

    if (!categoryId) {
      throw new HttpException('Category is required', HttpStatus.BAD_REQUEST);
    }

    const flower = await this.prisma.flower.create({
      data: {
        ...flowerData,
        category: {
          connect: { id: categoryId },
        },
      },
    });

    if (!flower) {
      throw new HttpException('Wrong Category Id', HttpStatus.NOT_FOUND);
    }

    await this.prisma.image.createMany({
      data: images.map((image) => ({
        flowerId: flower.id,
        type: image.type,
        id: image.id,
        url: image.url,
        altText: image?.altText || '',
        status: image.status,
      })),
    });

    return flower;
  }

  async findAll(
    params: ParamsRequest,
  ): Promise<BaseResponse<PagingResponse<Flower>>> {
    const { page, pageSize, search } = params;

    if (!page || !pageSize || page < 1 || pageSize < 1) {
      throw new HttpException(
        'Page and pageSize must be greater than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

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
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    const flower = await this.prisma.flower.findUnique({
      where: { id },
    });

    if (!flower) {
      throw new HttpException('Flower not found', HttpStatus.NOT_FOUND);
    }

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
    const { categoryId, images, ...flowerData } = updateFlowerDto;

    if (!images || images.length === 0) {
      throw new HttpException('Images are required', HttpStatus.BAD_REQUEST);
    }

    if (!categoryId) {
      throw new HttpException('Category is required', HttpStatus.BAD_REQUEST);
    }

    const flower = await this.prisma.flower.update({
      where: { id },
      data: {
        ...flowerData,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: images.map((image) => ({
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
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

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
