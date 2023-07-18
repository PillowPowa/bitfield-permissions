import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Auth } from 'src/guards/jwt.guard';
import { PermissionsMeta } from 'src/decorators/permissions.decorator';
import { Permissions } from 'src/utils/persmissions';
import { PostDto } from './dto/post.dto';
import { User } from 'src/decorators/user.decorator';
import { Types } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  @PermissionsMeta(Permissions.WRITE)
  public async create(
    @Body() dto: PostDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    return this.postsService.create(dto, userId);
  }

  @Get('/:id')
  @Auth()
  @PermissionsMeta(Permissions.READ)
  public async getPostById(@Param('id') postId: Types.ObjectId) {
    return this.postsService.getPostById(postId);
  }

  @Patch('/:id')
  @Auth()
  @PermissionsMeta(Permissions.UPDATE)
  public async update(
    @Param('id') postId: Types.ObjectId,
    @Body() dto: PostDto,
  ) {
    return this.postsService.update(postId, dto);
  }

  @Delete('/:id')
  @Auth()
  @PermissionsMeta(Permissions.DELETE)
  public async delete(@Param('id') postId: Types.ObjectId) {
    return this.postsService.delete(postId);
  }
}
