import { BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export class ValidatedResponse {
  validateId(id: string): { isMongoId: boolean } {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID '${id}' format`);
    }
    return { isMongoId: true };
  }

  validateUUID(uuid: string): { isUUID: boolean } {
    if (!isUUID(uuid)) {
      throw new BadRequestException(`Invalid UUID '${uuid}' format`);
    }

    return { isUUID: true };
  }
}
