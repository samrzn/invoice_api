import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import type { Query as ExpressQuery } from 'express-serve-static-core';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({
    status: 200,
    description: 'List of products returned successfully',
  })
  async findAllProducts(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productsService.findAll(query);
  }

  @Get(':product_id')
  @ApiOperation({ summary: 'Find a product by product_id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOneProduct(
    @Param('product_id') productId: string,
  ): Promise<Product> {
    return this.productsService.findProduct(productId);
  }

  @Get('/id/:id')
  @ApiOperation({ summary: 'Find a product by MongoDB _id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.create(productDto);
  }

  @Put('/update/:id')
  @ApiOperation({ summary: 'Update a product by MongoDB _id' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.updateProduct(id, productDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
