import { UserEntity } from 'src/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.finByEmail(email);
    
        if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
    
        return null;
      }

    async registrationUser(dto: CreateUserDto){
        const user = await this.usersService.create(dto)
        return {token: this.jwtService.sign({id: user.id})}
    }

    async login(user: UserEntity) {
        return {
          token: this.jwtService.sign({ id: user.id }),
        };
    }
}
