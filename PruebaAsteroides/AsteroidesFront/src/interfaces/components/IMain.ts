import { IUser } from '../api/IUser';
export interface IMain {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    activeAsteroidTab: number
}