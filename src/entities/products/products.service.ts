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

  /*   async create(createProductDto: CreateProductDto): Promise<Product> {
    const res = await this.productModel.create(createProductDto);
    return res;
  } */

  async create(product: CreateProductDto): Promise<ProductDocument> {
    const res = new this.productModel(product);
    return res.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }
}
