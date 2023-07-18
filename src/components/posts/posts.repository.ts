import { AbstractRepository } from '../../utils/database/abstract.repository';
import { Post } from 'src/schemas/post.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class PostsRepository extends AbstractRepository<Post> {
  protected readonly logger = new Logger(PostsRepository.name);

  constructor(
    @InjectModel(Post.name) model: Model<Post>,
    @InjectConnection() connection: Connection,
  ) {
    super(model, connection);
  }
}
