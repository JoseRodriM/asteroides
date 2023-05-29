import Main from './components/Main'
import Header from './components/Header'
import { useEffect, useState, useMemo } from 'react'
import React from 'react'
import { useAsteroids } from './hooks'
import { IAsteroid } from './interfaces/api/IAsteroids'
import { IUser } from './interfaces/api/IUser'
import { dataPrueba, ActiveAsteroidTabEnum } from './constants';

function App() {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [activeAsteroidTab, setActiveAsteroidTab] = useState<number>(ActiveAsteroidTabEnum.ALL_ASTEROIDS)

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setActiveAsteroidTab={setActiveAsteroidTab}
      />
      <Main
        user={user}
        setUser={setUser}
        activeAsteroidTab={activeAsteroidTab}
      />
    </>
  )
}

export default App
