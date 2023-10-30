import { Body, Controller, Delete, Get, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserId } from './decorator/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/guards/jwt-auth.guard';
import { ChangePassDto } from './dto/change-pass.decorator';
import { PassSchema } from './validation/pass.schema';
import { ValidatorPipe } from 'pipes/validation.pipe';
import { ChangeDataSchema } from './validation/change.user-data.schema';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto){
    return this.userService.createUser(dto)
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@UserId() id: string){
    return this.userService.getUser(id)
  }
  @Get('/statistic')
  @UseGuards(JwtAuthGuard)
  getUserStatisctic(@UserId() id: string){
    return this.userService.getStatistic(id)
  }
  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@UserId() id: string){
    return this.userService.delete(id)
  }
  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidatorPipe(PassSchema))
  changePass(@UserId() id: string, @Body() dto: ChangePassDto){
    return this.userService.changePass(id, dto)
  }
  @Patch()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidatorPipe(ChangeDataSchema))
  changeData(@Body() dto: UpdateUserDto, @UserId() id: string){
    return this.userService.changeData(dto, id)
  }
  @Put("/avatar")
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  createAvatar(@UserId() id: string, @UploadedFile() avatar){
    return this.userService.createAvatar(id, avatar)
  }
}
