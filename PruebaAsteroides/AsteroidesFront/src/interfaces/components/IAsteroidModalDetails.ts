import { IAsteroid } from "../api/IAsteroids";

export interface IAsteroidModalDetails{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: IAsteroid;
}