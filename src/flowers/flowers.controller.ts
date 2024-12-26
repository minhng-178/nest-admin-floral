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
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BaseResponse,
  PagingResponse,
} from 'src/params/dto/params-response.dto';
import { Flower } from '@prisma/client';
import { ParamsRequest } from 'src/params/dto/params-request.dto';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flower' })
  @ApiResponse({
    status: 201,
    description: 'The flower has been successfully created.',
    type: CreateFlowerDto,
  })
  async create(
    @Body() createFlowerDto: CreateFlowerDto,
  ): Promise<BaseResponse<Flower>> {
    const flower = await this.flowersService.create(createFlowerDto);
    return {
      message: 'Flower created successfully',
      success: true,
      status: 'OK',
      data: flower,
    };
  }
  @Get()
  @ApiOperation({ summary: 'Get all flowers with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of flowers with pagination',
    type: BaseResponse<PagingResponse<Flower>>,
  })
  async findAll(
    @Query() params: ParamsRequest,
  ): Promise<BaseResponse<PagingResponse<Flower>>> {
    return this.flowersService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a flower by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flower has been successfully retrieved.',
    type: BaseResponse<Flower>,
  })
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a flower by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flower has been successfully updated.',
    type: BaseResponse<Flower>,
  })
  update(@Param('id') id: string, @Body() updateFlowerDto: UpdateFlowerDto) {
    return this.flowersService.update(id, updateFlowerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a flower by ID' })
  @ApiResponse({
    status: 200,
    description: 'The flower has been successfully deleted.',
    type: BaseResponse<Flower>,
  })
  remove(@Param('id') id: string) {
    return this.flowersService.remove(id);
  }
}
