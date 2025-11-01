import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(productDto: CreateProductDto): Promise<ProductDocument> {
    const res = await this.productModel.create(productDto);
    return res;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().lean().exec();
    return products;
  }
}
