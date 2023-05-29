import axios from "axios"
import { asteroidsURL } from "../constants"
import { IAsteroid, IQuery } from '../interfaces/api/IAsteroids';
import { useCallback } from "react";

const useAsteroids = () => {
    const getAsteroids = useCallback(async (query?: IQuery): Promise<IAsteroid[]> => {
        let res: IAsteroid[] = [];
        let queryForGet:string;
        if (query) {
            const { sortingCriteria, startDate, endDate } = query;
            const sortingCriteriaQuery = sortingCriteria ? `sortingCriteria=${sortingCriteria}` : ''
            const startDateQuery = startDate ? sortingCriteria ? `&startDate=${startDate}` : '`startDate=${startDate}`' : ''
            const endDateQuery = endDate ? startDate ? `&endDate=${endDate}` : `endDate=${endDate}` : ''
            queryForGet = `${asteroidsURL}?${sortingCriteriaQuery}${startDateQuery}${endDateQuery}`
        } else {
            queryForGet = `${asteroidsURL}`
        }

        try {
            res = (await axios.get<IAsteroid[]>(`${queryForGet}`)).data
        } catch (e) {
            console.log(e)
            window.alert('Something went wrong')
        }
        return res || {} as IAsteroid;
    }, [])

    const getAsteroidById = useCallback(async (id: string): Promise<IAsteroid> => {
        let res: IAsteroid = {} as IAsteroid;
        try {
            res = (await axios.get(`${asteroidsURL}/by-asteroid-id/${id}`)).data
        } catch (e) {
            console.log(e)
            window.alert('Something went wrong')
        }
        return res || {} as IAsteroid;
    }, [])
    return { getAsteroids, getAsteroidById }
}

export default useAsteroids