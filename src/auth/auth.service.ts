import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { create, checkExisting, getAll, getById } from 'src/database/User';
import { SecurityConfig } from 'src/config/config.interface';
import { Token } from 'src/modals/token.modal';
import { User } from 'src/modals/user.modal';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(payload: SignUpDto): Promise<Token> {
    const isUserExisting = await checkExisting(payload.email);
    if (isUserExisting) {
      throw new ConflictException(`Email ${payload.email} already used.`);
    } else {
      const hashPassword = await this.passwordService.hashPassword(
        payload.password,
      );
      const userId = await create({ ...payload, password: hashPassword });

      return this.generateToken({ userId });
    }
  }

  async signIn({ email, password }: SignInDto): Promise<Token> {
    const users = await getAll();

    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateToken({ userId: user.id });
  }

  async getUserFromToken(token: string): Promise<User> {
    const userId = this.jwtService.decode(token)['userId'];
    const user = await getById(userId);

    return user;
  }

  generateToken(payload: { userId: string }): Token {
    const accessToken = this.jwtService.sign(payload);

    const securityConfig = this.configService.get<SecurityConfig>('security');
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: securityConfig.refreshIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  refetchToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);

      return this.generateToken({ userId });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
