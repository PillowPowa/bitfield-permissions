import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/schemas/user.schema';
import { Permissions } from 'src/utils/persmissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<Permissions[]>(
      'permissions',
      ctx.getHandler(),
    );
    if (!permissions) return true;

    const { user }: { user?: Omit<User, 'password'> } = ctx
      .switchToHttp()
      .getRequest();
    if (!user) return false;

    const hasPermissions =
      this.hasPermission(user.permissions, Permissions.ADMIN) ||
      permissions.every((permission: Permissions) =>
        this.hasPermission(user.permissions, permission),
      );

    if (!hasPermissions) {
      console.log(
        `User ${user.name} with permissions ${user.permissions} has not permissions ${permissions}`,
      );
    }
    return hasPermissions;
  }

  private hasPermission(permissions: number, permission: Permissions) {
    return (permissions & permission) === permission;
  }
}
