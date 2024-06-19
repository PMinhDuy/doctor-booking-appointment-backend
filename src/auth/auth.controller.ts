import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { Auth } from 'src/modals/auth.modal';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<Auth> {
    const { accessToken, refreshToken } =
      await this.authService.signUp(signUpDto);
    const { lastName, firstName, email } =
      await this.authService.getUserFromToken(accessToken);

    return {
      accessToken,
      refreshToken,
      user: {
        email,
        lastName,
        firstName,
      },
    };
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<Auth> {
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);
    const { lastName, firstName, email } =
      await this.authService.getUserFromToken(accessToken);

    return {
      accessToken,
      refreshToken,
      user: {
        email,
        lastName,
        firstName,
      },
    };
  }
}
