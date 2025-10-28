import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

export enum Category {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  CLOTHING = 'Clothing',
  FOOD = 'Food',
  TOYS = 'Toys',
  BOOKS = 'Books',
  BEAUTY = 'Beauty',
  SPORTS = 'Sports',
  AUTOMOTIVE = 'Automotive',
  OTHER = 'Other',
}

export enum ProductStatus {
  ACTIVE = 'Active',
  RESTOCK = 'Restock',
  DISCONTINUED = 'Discontinued',
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  id: number; // change to UUID later!!!

  @Prop()
  serialNumber_SKU: string;

  @Prop({ required: true })
  EANCode: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  category: Category;

  @Prop()
  subcategory?: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  description?: string;

  @Prop()
  dimensions: {
    height: number;
    width: number;
    depth: number;
    weight: number;
    volume: number;
  };

  @Prop({ required: true })
  stock: {
    location: string;
    productStatus: ProductStatus;
    expiryDate: Date;
    manufactureDate?: Date;
    available: number;
    reserved: number;
    min: number;
    max: number;
  };

  @Prop({ required: true })
  value: {
    cost: number;
    price: number;
    currency?: string;
    taxes: Array<string>;
    refundable: boolean;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
