import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { signUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @Post('register')
  async register(@Body() signUpDto: signUpDto) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.name,
      signUpDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate user' })
  @ApiResponse({ status: 200, description: 'User successfully validated' })
  @Post('validate')
  async validate(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.validateUser(email, password);
  }
}
