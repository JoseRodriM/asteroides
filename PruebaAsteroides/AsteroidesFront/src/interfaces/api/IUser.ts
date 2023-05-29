export interface IUserLoginOrRegister{
    username: string;
    password: string;
}

export interface IUser{
    id: string
    username: string;
    favoriteAsteroids: string[];
}

export interface IUpdateFavoriteAsteroid{
    id: string;
    favoriteAsteroidId: string;
}