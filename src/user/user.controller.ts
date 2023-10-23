import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.decorator';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto){
    return this.userService.createUser(dto)
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@User() id: string){
    return this.userService.getUser(id)
  }
  @Get('/statistic')
  @UseGuards(JwtAuthGuard)
  getUserStatisctic(@User() id: string){
    return this.userService.getStatistic(id)
  }
  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@User() id: string){
    return this.userService.delete(id)
  }
  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  changePass(@User() id: string){
    return this.userService.changePass(id)
  }
  @Patch()
  @UseGuards(JwtAuthGuard)
  changeData(@Body() dto: UpdateUserDto, @User() id: string){
    return this.userService.changeData(dto, id)
  }
  @Put("/avatar")
  createAvatar(@User() id: string){
    return this.userService.createAvatar(id)
  }
}
