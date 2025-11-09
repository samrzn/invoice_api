// import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async create(productDto: CreateProductDto): Promise<ProductDocument> {
    const res = await this.productModel.create(productDto);
    return res;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().lean().exec();
    return products;
  }

  async findById(product_id: string): Promise<Product> {
    const product = await this.productModel.findById(product_id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}

/* import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  // Get all Products  =>  GET  /products
  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  // Create new Product  =>  POST  /products
  async create(product: CreateProductDto): Promise<Product> {
    const res = await this.productModel.create(product);
    return res;
  }

  // Get a Product by ID  =>  GET  /products/:id
  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }
} */
