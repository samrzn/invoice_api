export enum AvailabilityEnum {
  AVAILABLE = 'AVAILABLE',
  PRE_ORDER = 'PRE-ORDER',
  UNAVAILABLE = 'UNAVAILABLE',
}

export const AvailabilityNames: Record<AvailabilityEnum, string> = {
  [AvailabilityEnum.AVAILABLE]: 'Available',
  [AvailabilityEnum.PRE_ORDER]: 'Pre-order',
  [AvailabilityEnum.UNAVAILABLE]: 'Unavailable',
};
