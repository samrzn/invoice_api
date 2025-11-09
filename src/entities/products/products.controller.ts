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
    @Param('product_id') product_id: string,
  ): Promise<Product> {
    return this.productsService.findById(product_id);
  }

  @Post()
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.create(productDto);
  }
}

/* import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async createProduct(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get(':id')
  async findProduct(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }
} */
