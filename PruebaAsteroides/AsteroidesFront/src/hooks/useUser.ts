import { useCallback } from "react"
import { IUserLoginOrRegister, IUser, IUpdateFavoriteAsteroid } from "../interfaces/api/IUser"
import axios from "axios"
import { userURL } from "../constants"

const useUser = () => {
    const login = useCallback(async (data: IUserLoginOrRegister): Promise<IUser> => {
        let res: IUser = {} as IUser;
        try {
            res = (await axios.post(`${userURL}/login`, data)).data
        } catch (e) {
            console.log(e)
            window.alert('Something went wrong')
        }
        return res || {} as IUser;
    }, [])

    const registerUser = useCallback(async (data: IUserLoginOrRegister): Promise<IUser> => {
        let res: IUser = {} as IUser;
        try {
            res = (await axios.post(`${userURL}/register`, data)).data
        } catch (e) {
            console.log(e)
            window.alert('Something went wrong')
        }
        return res || {} as IUser;
    }, [])

    const saveFavoriteAsteroid = useCallback(async (data: IUpdateFavoriteAsteroid): Promise<IUser> => {
        let res: IUser = {} as IUser;
        try {
            res = (await axios.put(`${userURL}/favoriteAsteroid`, data)).data
        } catch (e) {
            window.alert('Something went wrong')
            console.log(e)
        }
        return res || {} as IUser;
    }, [])

    return { login, registerUser, saveFavoriteAsteroid }
}

export default useUser;