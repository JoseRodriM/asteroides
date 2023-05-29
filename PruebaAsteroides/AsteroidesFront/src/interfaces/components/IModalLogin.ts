import { IUser } from "../api/IUser";

export interface IModalLogin{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    activeTab: number;
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}