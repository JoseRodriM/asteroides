import Spinner from "../Spinner"
import { IMain } from "../../interfaces/components/IMain"
import React, { useState } from "react"
import AsteroidCard from '../AsteroidCard/AsteroidCard';
import { IAsteroid } from "../../interfaces/api/IAsteroids";
import { useAsteroids } from "../../hooks";
import { useMemo, useEffect, useCallback } from 'react';
import { ActiveAsteroidTabEnum } from "../../constants";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import AsteroidModalDetails from "../AsteroidModalDetails/AsteroidModalDetails";


const Main = ({ user, setUser, activeAsteroidTab }: IMain) => {

    const [data, setData] = useState<IAsteroid[]>([])
    const [favoriteData, setFavoriteData] = useState<IAsteroid[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [orderQuery, setOrderQuery] = useState<string>('')
    const [startDate, setStartDate] = useState<Dayjs | null>()
    const [endDate, setEndDate] = useState<Dayjs | null>()
    const [selectedAsteroidId, setSelectedAsteroidId] = useState<string>('')
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedAsteroid, setSelectedAsteroid] = useState<IAsteroid>({} as IAsteroid)

    const { favoriteAsteroids } = user;

    const { getAsteroidById, getAsteroids } = useAsteroids()

    const findFavoritesAsteroids = useCallback(async () => {
        if (favoriteAsteroids?.length) {
            const favoritesAst: IAsteroid[] = [];
            for await (const asteroidsIds of favoriteAsteroids) {
                const res = await getAsteroidById(asteroidsIds)
                res && favoritesAst.push(res)
            }
            setFavoriteData(favoritesAst)
        }
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        setOrderQuery(event.target.value as string);
    };

    const getAsteroidByFilters = async () => {
        const query = { sortingCriteria: orderQuery, startDate: startDate?.toISOString().slice(0, 10), endDate: endDate?.toISOString().slice(0, 10) }
        setIsLoading(true)
        const ordererData = await getAsteroids(query)
        ordererData && setData(ordererData)
        setIsLoading(false)
    }

    useEffect(() => {
      (async () => {
        setIsLoading(true)
        const res = await getAsteroids()
        res && setData(res)
        setIsLoading(false)
      })()
    }, [getAsteroids])


    useEffect(() => {
        if (activeAsteroidTab === ActiveAsteroidTabEnum.FAVORITES_ASTEROIDS) {
            (async () => {
                setIsLoading(true)
                await findFavoritesAsteroids()
                setIsLoading(false)
            })()
        }
    }, [activeAsteroidTab, findFavoritesAsteroids])

    useEffect(() => {
        if (openModal && selectedAsteroidId) {
            (async () => {
                const res = await getAsteroidById(selectedAsteroidId);
                res && setSelectedAsteroid(res);
            })()
        }
    }, [openModal, selectedAsteroidId, getAsteroidById])

    const asteroidsMemo = useMemo(() => data, [data])


    if (isLoading) {
        return (<div className="mt-52">
            <Spinner />
        </div>)
    }

    return (
        <div className="flex items-center justify-center flex-col py-12">
            {activeAsteroidTab === ActiveAsteroidTabEnum.ALL_ASTEROIDS &&
                <div className="flex gap-5">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel>Order by:</InputLabel>
                            <Select
                                labelId="queryForGet"
                                id="queryForGet"
                                value={orderQuery}
                                label="Order by"
                                onChange={handleChange}
                            >
                                <MenuItem value=''>-</MenuItem>
                                <MenuItem value='name'>Name</MenuItem>
                                <MenuItem value='id'>Id</MenuItem>
                                <MenuItem value='absolute_magnitude_h'>Absolute magnitud</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            label="From"
                            value={startDate}
                            onChange={(e) => e && setStartDate(e)}
                            format="YYYY-MM-DD"
                        />
                        <DateField
                            label="To"
                            value={endDate}
                            onChange={(e) => e && setEndDate(e)}
                            format="YYYY-MM-DD"
                        />
                    </LocalizationProvider>
                    <Button variant="contained" onClick={() => getAsteroidByFilters()}>Search</Button>
                </div>
            }
            <div className="grid gap-4 grid-cols-4 grid-rows-4 my-12">
                {asteroidsMemo && activeAsteroidTab === ActiveAsteroidTabEnum.ALL_ASTEROIDS && asteroidsMemo.map((asteroid) => {
                    return (
                        <AsteroidCard
                            key={asteroid.id}
                            data={asteroid}
                            user={user}
                            setUser={setUser}
                            setSelectedAsteroidId={setSelectedAsteroidId}
                            setIsOpen={setOpenModal}
                        />
                    )
                })}
                {favoriteData && activeAsteroidTab === ActiveAsteroidTabEnum.FAVORITES_ASTEROIDS && favoriteData.map((favoriteAsteroid) => {
                    return (
                        <AsteroidCard
                            key={favoriteAsteroid.name}
                            data={favoriteAsteroid}
                            user={user}
                            setUser={setUser}
                            setSelectedAsteroidId={setSelectedAsteroidId}
                            setIsOpen={setOpenModal}
                        />
                    )
                })}
            </div>
            {openModal &&
                <AsteroidModalDetails
                    open={openModal}
                    setOpen={setOpenModal}
                    data={selectedAsteroid}
                />}
        </div>
    )
}

export default Main