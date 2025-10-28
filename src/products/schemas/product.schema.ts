import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  id: number; // change to UUID later!!!

  @Prop()
  serialNumber: string; // also used as SKU

  @Prop({ required: true })
  EANCode: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  category: Array<string>; // change to enum later!!!

  @Prop()
  subcategory: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  description: string;

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
    productStatus: string; // change to enum later!!!
    expiryDate: Date;
    manufactureDate: Date;
    available: number;
    reserved: number;
    min: number;
    max: number;
  };
}

export const ProductSchema = SchemaFactory.createForClass(Product);
