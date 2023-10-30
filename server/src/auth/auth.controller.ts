import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { ValidatorPipe } from 'pipes/validation.pipe';
import { UserSchema } from 'user/validation/user.schema';
import { LoginSchema } from './validation/login.schema';
import { TokenDto } from './dto/token-dto';
import { TokenSchema } from './validation/token.schema';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidatorPipe(LoginSchema))
  login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }
  @Post('/register')
  @UsePipes(new ValidatorPipe(UserSchema))
  register(@Body() dto: CreateUserDto){
    return this.authService.register(dto)
  }
  @Post('/logout')
  @UsePipes(new ValidatorPipe(TokenSchema))
  logout(@Body() dto: TokenDto){
    return this.authService.logout(dto)
  }
  @Post('/refresh')
  @UsePipes(new ValidatorPipe(TokenSchema))
  refreshToken(@Body() dto: TokenDto){
    return this.authService.refreshToken(dto)
  }
}
