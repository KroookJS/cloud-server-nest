import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

interface ILogin {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: CreateUserDto })
    async login(@Request() req) {
       return this.authService.login(req.user as UserEntity);
    }

    @Post('register')
    registerUser(@Body()dto: CreateUserDto){
        return this.authService.registrationUser(dto)
    }
    
}
