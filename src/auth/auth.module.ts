import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/config/config.interface';
import { PasswordService } from 'src/password/password.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy],
})
export class AuthModule {}
