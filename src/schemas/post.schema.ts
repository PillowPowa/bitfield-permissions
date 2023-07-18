import { Types } from 'mongoose';
import { AbstractDocument } from '../utils/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/decorators/user.decorator';

@Schema({ versionKey: false })
export class Post extends AbstractDocument {
    @Prop()
    text: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
