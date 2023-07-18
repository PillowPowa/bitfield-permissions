import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from './persmissions.guard';

export const Auth = () => UseGuards(AuthGuard('jwt'), PermissionsGuard);