import { Permissions } from 'src/utils/persmissions';
import { AbstractDocument } from '../utils/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: Permissions.READ })
    permissions?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
