import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

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
}
