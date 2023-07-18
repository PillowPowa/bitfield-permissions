import { SetMetadata } from '@nestjs/common';
import type { Permissions } from 'src/utils/persmissions';

export const PermissionsMeta = (...permissions: Permissions[]) =>
  SetMetadata('permissions', permissions);
