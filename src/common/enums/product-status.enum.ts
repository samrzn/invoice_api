export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  RESTOCK = 'RESTOCK',
  DISCONTINUED = 'DISCONTINUED',
}

export const ProductStatusNames: Record<ProductStatusEnum, string> = {
  [ProductStatusEnum.ACTIVE]: 'Active',
  [ProductStatusEnum.RESTOCK]: 'Restock',
  [ProductStatusEnum.DISCONTINUED]: 'Discontinued',
};
