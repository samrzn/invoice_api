import { ApiProperty } from '@nestjs/swagger';
import { ProductStatusNames } from '../enums/product-status.enum';
import { ManufactureOriginNames } from '../enums/manufacture-origin.enum';
import { CategoryNames } from '../enums/category.enum';
import { AvailabilityNames } from '../enums/availability.enum';

export class ConstantsDto {
  @ApiProperty({
    enum: ProductStatusNames,
    enumName: 'ProductStatusNames',
    'x-enumNames': Object.keys(ProductStatusNames),
  })
  productStatusNames: typeof ProductStatusNames;

  @ApiProperty({
    enum: ManufactureOriginNames,
    enumName: 'ManufactureOriginNames',
    'x-enumNames': Object.keys(ManufactureOriginNames),
  })
  manufactureOriginNames: typeof ManufactureOriginNames;

  @ApiProperty({
    enum: CategoryNames,
    enumName: 'CategoryNames',
    'x-enumNames': Object.keys(CategoryNames),
  })
  categoryNames: typeof CategoryNames;

  @ApiProperty({
    enum: AvailabilityNames,
    enumName: 'AvailabilityNames',
    'x-enumNames': Object.keys(AvailabilityNames),
  })
  availabilityNames: typeof AvailabilityNames;
}
