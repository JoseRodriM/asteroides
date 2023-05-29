import { IAsteroid } from "../api/IAsteroids";
import { IUser } from "../api/IUser";

export interface IHeader {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setActiveAsteroidTab: React.Dispatch<React.SetStateAction<number>>;
}