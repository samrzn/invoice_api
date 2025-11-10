import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/* import * as mongoose from 'mongoose';
import { Order } from '../orders/schemas/order.schema'; */ // To be implemented later

export enum Availability {
  AVAILABLE = 'Available',
  PRE_ORDER = 'Pre-order',
  UNAVAILABLE = 'Unavailable',
}

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

export enum ManufactureOrigin {
  NATIONAL = 'National',
  IMPORTED = 'Imported',
}

export enum ProductStatus {
  ACTIVE = 'Active',
  RESTOCK = 'Restock',
  DISCONTINUED = 'Discontinued',
}

@Schema()
export class Details {
  @Prop({ required: true })
  supplier: string;

  @Prop({ required: true })
  lastIn: Date;

  @Prop({ required: true })
  lastOut: Date;

  @Prop({ required: true, enum: Object.values(ManufactureOrigin) })
  manufactureOrigin: ManufactureOrigin;

  @Prop({ required: true })
  batch: string;

  @Prop()
  unitsPerBatch?: number;

  @Prop({ required: true, type: [String], default: [] })
  skuInStock: string[];

  /* @Prop
  ({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders_id: Order[] | null; */ // To be implemented later
}
export const DetailsSchema = SchemaFactory.createForClass(Details);

@Schema()
export class Dimensions {
  @Prop()
  height: number;

  @Prop()
  width: number;

  @Prop()
  depth: number;

  @Prop()
  weight: number;

  @Prop()
  volume: number;
}
export const DimensionsSchema = SchemaFactory.createForClass(Dimensions);

@Schema()
export class Stock {
  @Prop()
  location: string;

  @Prop({ required: true, enum: Object.values(ProductStatus) })
  productStatus: ProductStatus;

  @Prop({ required: true })
  expiryDate: Date;

  @Prop()
  manufactureDate?: Date;

  @Prop({ required: true })
  available: number;

  @Prop({ required: true })
  reserved: number;

  @Prop({ required: true })
  min: number;

  @Prop({ required: true })
  max: number;
}
export const StockSchema = SchemaFactory.createForClass(Stock);

@Schema()
export class Value {
  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  currency?: string;

  @Prop({ required: true, type: [String], default: [] })
  taxes: string[];

  @Prop({ required: true, default: false })
  refundable: boolean;
}
export const ValueSchema = SchemaFactory.createForClass(Value);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true, index: true })
  product_id: string; // change to UUID later!!!

  @Prop()
  serialNumberSKU: string;

  @Prop({ required: true })
  EANCode: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: Object.values(Category) })
  category: Category;

  @Prop()
  subcategory?: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  description?: string;

  @Prop({ type: DimensionsSchema })
  dimensions: Dimensions;

  @Prop({ required: true, type: StockSchema })
  stock: Stock;

  @Prop({ required: true, type: ValueSchema })
  value: Value;

  @Prop({ required: true, type: DetailsSchema })
  details: Details;

  @Prop({ type: [Object] })
  images?: object[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ required: true, enum: Object.values(Availability) })
  availability: Availability;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
