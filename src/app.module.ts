import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordService } from './password/password.service';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PasswordService],
})
export class AppModule {}
