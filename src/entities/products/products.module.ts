import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { Product, ProductSchema } from './schemas/product.schema';
import { ValidatedResponse } from 'src/common/validator/validated.response';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ValidatedResponse],
})
export class ProductsModule {}
