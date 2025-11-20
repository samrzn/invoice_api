export enum ManufactureOriginEnum {
  NATIONAL = 'NATIONAL',
  IMPORTED = 'IMPORTED',
}

export const ManufactureOriginNames: Record<ManufactureOriginEnum, string> = {
  [ManufactureOriginEnum.NATIONAL]: 'National',
  [ManufactureOriginEnum.IMPORTED]: 'Imported',
};
