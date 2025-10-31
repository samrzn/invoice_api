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

export class DimensionsDto {
  readonly height: number;
  readonly width: number;
  readonly depth: number;
  readonly weight: number;
  readonly volume: number;
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

export class CreateProductDto {
  readonly product_id: string;
  readonly serialNumberSKU: string;
  readonly EANCode: string;
  readonly name: string;
  readonly category: Category;
  readonly subcategory: string;
  readonly brand: string;
  readonly model: string;
  readonly description: string;
  readonly dimensions: DimensionsDto;
  readonly stock: StockDto;
  readonly value: ValueDto;
  readonly details: DetailsDto;
  readonly images: object[];
  readonly tags: string[];
  readonly availability: Availability;
}
