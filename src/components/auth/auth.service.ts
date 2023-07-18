import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Types } from 'mongoose';

import { UsersRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwt: JwtService,
  ) {}

  public async login(dto: LoginDto) {
    const userData = await this.usersRepository.findOne({
      where: { email: dto.email },
    });

    const isPasswordValid = await verify(userData.password, dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('You have entered an incorrect password');
    }
    delete userData.password;

    return { ...userData, token: this.generateToken(userData._id) };
  }

  public async register(dto: RegisterDto) {
    const userData = await this.usersRepository.findOne(
      {
        where: {
          $or: [{ email: dto.email, name: dto.name }],
        },
      },
      { skipExistChecking: true },
    );

    if (userData) {
      throw new BadRequestException(
        'A user with that name or email already exists',
      );
    }

    const user = await this.usersRepository.create({
      ...dto,
      password: await hash(dto.password),
    });
    delete user.password;

    return { ...user, token: this.generateToken(user._id) };
  }

  private generateToken(userId: Types.ObjectId): string {
    return this.jwt.sign({ id: userId }, { expiresIn: '2d' });
  }
}
