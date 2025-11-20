export enum CategoryEnum {
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  CLOTHING = 'CLOTHING',
  FOOD = 'FOOD',
  TOYS = 'TOYS',
  BOOKS = 'BOOKS',
  BEAUTY = 'BEAUTY',
  SPORTS = 'SPORTS',
  AUTOMOTIVE = 'AUTOMOTIVE',
  OTHER = 'OTHER',
}

export const CategoryNames: Record<CategoryEnum, string> = {
  [CategoryEnum.ELECTRONICS]: 'Electronics',
  [CategoryEnum.FURNITURE]: 'Furniture',
  [CategoryEnum.CLOTHING]: 'Clothing',
  [CategoryEnum.FOOD]: 'Food',
  [CategoryEnum.TOYS]: 'Toys',
  [CategoryEnum.BOOKS]: 'Books',
  [CategoryEnum.BEAUTY]: 'Beauty',
  [CategoryEnum.SPORTS]: 'Sports',
  [CategoryEnum.AUTOMOTIVE]: 'Automotive',
  [CategoryEnum.OTHER]: 'Other',
};
