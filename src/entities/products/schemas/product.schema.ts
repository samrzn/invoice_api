import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ManufactureOriginEnum } from 'src/common/enums/manufacture-origin.enum';
import { ProductStatusEnum } from 'src/common/enums/product-status.enum';
import { CategoryEnum } from 'src/common/enums/category.enum';
import { AvailabilityEnum } from 'src/common/enums/availability.enum';

/* import * as mongoose from 'mongoose';
import { Order } from '../orders/schemas/order.schema'; */ // To be implemented later

@Schema()
export class Details {
  @ApiProperty({ example: 'TechMaster Importações LTDA' })
  @Prop({ required: true })
  supplier: string;

  @ApiProperty({ example: '2025-10-20T00:00:00.000Z' })
  @Prop({ required: true })
  lastIn: Date;

  @ApiProperty({ example: '2025-10-25T00:00:00.000Z' })
  @Prop({ required: true })
  lastOut: Date;

  @ApiProperty({
    enum: ManufactureOriginEnum,
    example: ManufactureOriginEnum.IMPORTED,
  })
  @Prop({ required: true, enum: Object.values(ManufactureOriginEnum) })
  manufactureOrigin: ManufactureOriginEnum;

  @ApiProperty({ example: 'LCH-2025-078' })
  @Prop({ required: true })
  batch: string;

  @ApiProperty({ example: 50, required: false })
  @Prop()
  unitsPerBatch?: number;

  @ApiProperty({ example: ['NBK001', 'NBK002'] })
  @Prop({ required: true, type: [String], default: [] })
  skuInStock: string[];

  /* @Prop
  ({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders_id: Order[] | null; */ // To be implemented later
}
export const DetailsSchema = SchemaFactory.createForClass(Details);

@Schema()
export class Dimensions {
  @ApiProperty({ example: 1.75 })
  @Prop()
  weight: number;

  @ApiProperty({ example: 2.1 })
  @Prop()
  height: number;

  @ApiProperty({ example: 35.8 })
  @Prop()
  width: number;

  @ApiProperty({ example: 24.6 })
  @Prop()
  depth: number;

  @ApiProperty({ example: 1.75 })
  @Prop()
  volume: number;
}
export const DimensionsSchema = SchemaFactory.createForClass(Dimensions);

@Schema()
export class Stock {
  @ApiProperty({ example: 'A-03-B' })
  @Prop({ required: false })
  location?: string;

  @ApiProperty({ enum: ProductStatusEnum, example: ProductStatusEnum.ACTIVE })
  @Prop({ required: true, enum: Object.values(ProductStatusEnum) })
  productStatus: ProductStatusEnum;

  @ApiProperty({ example: '2027-12-31T00:00:00.000Z' })
  @Prop({ required: true })
  expiryDate: Date;

  @ApiProperty({ example: '2025-05-10T00:00:00.000Z' })
  @Prop()
  manufactureDate?: Date;

  @ApiProperty({ example: 45 })
  @Prop({ required: true })
  available: number;

  @ApiProperty({ example: 5 })
  @Prop({ required: true })
  reserved: number;

  @ApiProperty({ example: 10 })
  @Prop({ required: true })
  min: number;

  @ApiProperty({ example: 100 })
  @Prop({ required: true })
  max: number;
}
export const StockSchema = SchemaFactory.createForClass(Stock);

@Schema()
export class Value {
  @ApiProperty({ example: 3200.99 })
  @Prop({ required: true })
  cost: number;

  @ApiProperty({ example: 4499.9 })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ example: 'BRL' })
  @Prop()
  currency?: string;

  @ApiProperty({ example: ['ICMS', 'PIS', 'COFINS'] })
  @Prop({ required: true, type: [String], default: [] })
  taxes: string[];

  @ApiProperty({ example: true })
  @Prop({ required: true, default: false })
  refundable: boolean;
}
export const ValueSchema = SchemaFactory.createForClass(Value);

@Schema({ timestamps: true })
export class Product {
  @ApiProperty({ example: 'c7fcb4a9-9f9a-4a1e-9e21-6d3a6bcd5c4b' })
  @Prop({ required: true, unique: true, index: true })
  product_id: string; // change to UUID later!!!

  @ApiProperty({ example: 'NBK-2025-15FHD', required: false })
  @Prop()
  serialNumberSKU?: string;

  @ApiProperty({ example: '7891234567895' })
  @Prop({ required: true })
  EANCode: string;

  @ApiProperty({ example: 'Notebook Lenovo ThinkPad E14' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    enum: CategoryEnum,
    example: CategoryEnum.ELECTRONICS,
  })
  @Prop({ enum: Object.values(CategoryEnum) })
  category: CategoryEnum;

  @ApiProperty({ example: 'Laptops', required: false })
  @Prop()
  subcategory?: string;

  @ApiProperty({ example: 'Lenovo' })
  @Prop({ required: true })
  brand: string;

  @ApiProperty({ example: 'ThinkPad E14 Gen 5' })
  @Prop({ required: true })
  model: string;

  @ApiProperty({ example: 'Professional-grade laptop ...', required: false })
  @Prop()
  description?: string;

  @ApiProperty({ type: Dimensions })
  @Prop({ type: DimensionsSchema, _id: false })
  dimensions: Dimensions;

  @ApiProperty({ type: Stock })
  @Prop({ required: true, type: StockSchema, _id: false })
  stock: Stock;

  @ApiProperty({ type: Value })
  @Prop({ required: true, type: ValueSchema, _id: false })
  value: Value;

  @ApiProperty({ type: Details })
  @Prop({ required: true, type: DetailsSchema, _id: false })
  details: Details;

  @ApiProperty({
    example: [{ url: 'https://cdn.example.com/img1.jpg' }],
    required: false,
  })
  @Prop({ type: [Object], default: [] })
  images?: object[];

  @ApiProperty({ example: ['notebook', 'lenovo'] })
  @Prop({ type: [String], default: [] })
  tags: string[];

  @ApiProperty({ enum: AvailabilityEnum, example: AvailabilityEnum.AVAILABLE })
  @Prop({ required: true, enum: Object.values(AvailabilityEnum) })
  availability: AvailabilityEnum;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
