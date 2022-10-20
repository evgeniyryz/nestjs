import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userServise: UserService) { }
    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userServise.createUser(createUserDto);
        return this.userServise.buildUserResponse(user);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userServise.login(loginUserDto)

        return this.userServise.buildUserResponse(user)
    }

    @Get()
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
        return this.userServise.buildUserResponse(user);
    }

    @Put()
    @UseGuards(AuthGuard)
    async updateCurrentUser(
        @User('id') currentUserId: number,
        @Body('user') UpdateUserDto: UpdateUserDto): Promise<UserResponseInterface> {
        const user = await this.userServise.updateUser(currentUserId, UpdateUserDto);

        return this.userServise.buildUserResponse(user);
    }

}
