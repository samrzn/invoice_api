import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<ProductDocument> {
    const res = await this.productModel.create(product);
    const created = res.toObject();
    return created;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().lean().exec();
    return products;
  }

  async findProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ product_id: productId });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    id: string,
    product: Partial<Product>,
  ): Promise<ProductDocument> {
    const updated = await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException(`Product '${id}' not found`);
    }

    return updated.toObject();
  }

  async deleteProduct(id: string): Promise<ProductDocument | null> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
