import { IAsteroid } from "../api/IAsteroids";
import { IUser } from "../api/IUser";

export interface IAsteroidCard {
    data: IAsteroid;
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    setSelectedAsteroidId: React.Dispatch<React.SetStateAction<string>>;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
}