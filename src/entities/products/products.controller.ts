import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':product_id')
  async findOneProduct(
    @Param('product_id') productId: string,
  ): Promise<Product> {
    return this.productsService.findProduct(productId);
  }

  @Get('/id/:id')
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.create(productDto);
  }

  @Put('/id/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    await this.productsService.findById(id);
    const res = await this.productsService.updateProduct(id, productDto);

    if (!res) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return res;
  }
}
