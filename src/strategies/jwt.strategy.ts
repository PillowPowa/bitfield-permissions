import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../components/auth/auth.repository';
import type { Types } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ id }: { id: Types.ObjectId }) {
    return this.usersRepository.findById(id, {
      select: ['_id', 'name', 'email', 'permissions'],
    });
  }
}
