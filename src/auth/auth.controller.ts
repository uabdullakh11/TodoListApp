import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import { LogOutDto } from './dto/logout-dto';
import { RefreshTokenrDto } from './dto/refreshtoken-dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto){
    return this.authService.login(dto)
  }
  @Post('/register')
  register(@Body() dto: CreateUserDto){
    return this.authService.register(dto)
  }
  @Post('/logout')
  logout(@Body() dto: LogOutDto){
    return this.authService.logout(dto)
  }
  @Post('/refresh')
  refreshToken(@Body() dto: RefreshTokenrDto){
    return this.authService.refreshToken(dto)
  }
}
