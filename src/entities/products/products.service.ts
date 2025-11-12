import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<ProductDocument>,
  ) {}

  async create(productDto: CreateProductDto): Promise<ProductDocument> {
    const res = await this.productModel.create(productDto);
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
    productDto: Product /* : UpdateProductDto */,
  ): Promise<ProductDocument | null> {
    const updated = await this.productModel.findByIdAndUpdate(id, productDto, {
      new: true,
      runValidators: true,
    });
    return updated ? updated.toObject() : null;
  }
}
