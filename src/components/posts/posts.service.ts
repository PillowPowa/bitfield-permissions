import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { PostDto } from './dto/post.dto';
import { Types } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async create(dto: PostDto, userId: Types.ObjectId) {
    return this.postsRepository.create({ author: userId, ...dto });
  }

  public async getPostById(postId: Types.ObjectId) {
    const post = await this.postsRepository.findById(postId);
    return post;
  }

  public async update(postId: Types.ObjectId, dto: PostDto) {
    return this.postsRepository.updateById(postId, {
      update: dto,
    });
  }

  public async delete(postId: Types.ObjectId) {
    return this.postsRepository.deleteById(postId);
  }
}
