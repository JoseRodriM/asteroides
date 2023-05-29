import { IsString, IsNotEmpty } from "class-validator";

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class UpdateFavAsterUserDTO{
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    favoriteAsteroidId: string;
}