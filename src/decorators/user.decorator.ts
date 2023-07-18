import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as MongooseUser } from 'src/schemas/user.schema';

type PublicUserKeys = keyof Pick<MongooseUser, 'name' | 'email' | '_id'>;
export type PickUser<T extends keyof MongooseUser = PublicUserKeys> = Pick<
  MongooseUser,
  T
>;

export const User = createParamDecorator(
  (data: PublicUserKeys, ctx: ExecutionContext) => {
    const { user }: { user: MongooseUser } = ctx.switchToHttp().getRequest();
    return data ? user[data] : user;
  },
);
