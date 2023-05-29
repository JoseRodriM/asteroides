import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateFavAsterUserDTO, UserDTO } from '../dto/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('register')
    registerUser(@Body() user: UserDTO) {
        return this.userService.registerUser(user)
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @Post('login')
    login(@Body() user:UserDTO){
        return this.userService.loginUser(user)
    }

    @Put('favoriteAsteroid')
    saveFavoriteAsteroidIdByUserId(@Body() data: UpdateFavAsterUserDTO) {
        return this.userService.saveFavoriteAsteroidIdByUserId(data)
    }
}
