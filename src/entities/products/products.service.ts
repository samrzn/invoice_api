import * as mongoose from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { GetProductsQuery } from './dto/get-products.query';
import { PaginatedResponse } from 'src/common/pagination/paginated.response';

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

  async findAll(query: GetProductsQuery): Promise<PaginatedResponse<Product>> {
    const keyword = query.keyword?.trim() ?? '';
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;

    const filters: Record<string, any> = {};

    if (keyword) {
      filters.$or = [{ name: { $regex: keyword, $options: 'i' } }];
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.productModel.find(filters).skip(skip).limit(limit).lean().exec(),
      this.productModel.countDocuments(filters).exec(),
    ]);

    return {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: products,
    };
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

  async deleteProduct(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.productModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException(`Product '${id}' not found`);
    }

    return { deleted: true };
  }
}
