import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.create(productDto);
  }
}
