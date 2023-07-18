import { AbstractRepository } from '../../utils/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) model: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(model, connection);
  }
}
