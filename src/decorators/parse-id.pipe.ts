import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<unknown, Types.ObjectId>
{
  transform(value: string): Types.ObjectId {
    const validObjectId = this.isObjectId(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return value;
  }

  private isObjectId(value: string | Types.ObjectId) : value is Types.ObjectId {
    return Types.ObjectId.isValid(value);
  };
}
