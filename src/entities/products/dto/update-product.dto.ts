import {
  Availability,
  Category,
  ManufactureOrigin,
  ProductStatus,
} from '../../products/schemas/product.schema';

export class DetailsDto {
  readonly supplier: string;
  readonly lastIn: Date;
  readonly lastOut: Date;
  readonly manufactureOrigin: ManufactureOrigin;
  readonly batch: string;
  readonly unitsPerBatch?: number;
  readonly skuInStock: string[];
}

export class StockDto {
  readonly location: string;
  readonly productStatus: ProductStatus;
  readonly expiryDate: Date;
  readonly manufactureDate?: Date;
  readonly available: number;
  readonly reserved: number;
  readonly min: number;
  readonly max: number;
}

export class ValueDto {
  readonly cost: number;
  readonly price: number;
  readonly currency: string;
  readonly taxes: string[];
  readonly refundable: boolean;
}

export class UpdateProductDto {
  readonly serialNumberSKU: string;
  readonly name: string;
  readonly category: Category;
  readonly subcategory: string;
  readonly description: string;
  readonly stock: StockDto;
  readonly value: ValueDto;
  readonly details: DetailsDto;
  readonly tags: string[];
  readonly availability: Availability;
}
