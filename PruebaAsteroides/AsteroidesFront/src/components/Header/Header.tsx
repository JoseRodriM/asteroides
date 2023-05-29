import React, { useState } from "react";
import Button from '@mui/material/Button';
import ModalLogin from "../ModalLogin";
import { ActiveAsteroidTabEnum, ActiveTabEnum } from "../../constants";
import { IHeader } from "../../interfaces/components/IHeader";
import { isEmpty } from 'lodash'
import { IUser } from "../../interfaces/api/IUser";

const Header = ({ user, setUser, setActiveAsteroidTab }: IHeader) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<number>(ActiveTabEnum.LOGIN)

    const onClickFavorites = () => {
        if (!isEmpty(user)) {
            setActiveAsteroidTab(ActiveAsteroidTabEnum.FAVORITES_ASTEROIDS)
            return;
        }
        window.alert('You must log in to view your favorites list.')
    }

    return (
        <>
            <header className="block w-full flex h-20 items-center justify-between px-24 bg-violet-900">
                <h2 className="text-4xl">Galaxy of Jose</h2>
                <nav>
                    <ul className="flex gap-14 text-2xl">
                        <Button variant="contained" color="primary" onClick={() => setActiveAsteroidTab(ActiveAsteroidTabEnum.ALL_ASTEROIDS)}>Asteroids</Button>
                        <Button variant="contained" color="primary" onClick={() => onClickFavorites()}>My favorites</Button>
                    </ul>
                </nav>
                {isEmpty(user) ?
                    <div className="flex gap-5 text-2xl">
                        <Button variant="contained" color="success" onClick={() => {
                            setIsOpen(true)
                            setActiveTab(ActiveTabEnum.LOGIN)
                        }}>Sign in</Button>
                        <Button variant="contained" color="warning" onClick={() => {
                            setIsOpen(true)
                            setActiveTab(ActiveTabEnum.REGISTER)
                        }}>Sign up</Button>
                    </div> :
                    <div className="flex gap-5 text-2xl">
                        <p>{user.username}</p>
                        <Button variant="contained" color="error" onClick={() => {
                            setUser({} as IUser)
                        }}>Log out</Button>
                    </div>
                }
            </header>
            {isOpen && <ModalLogin
                isOpen={isOpen} setIsOpen={setIsOpen} activeTab={activeTab} setUser={setUser}
            />}
        </>
    )
}

export default Header;