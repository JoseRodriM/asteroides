import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { IModalLogin } from '../../interfaces/components/IModalLogin';
import { ActiveTabEnum } from "../../constants";
import { useForm } from 'react-hook-form';
import { useUser } from "../../hooks";
import Spinner from "../Spinner/Spinner";

const ModalLogin = ({ isOpen, setIsOpen, activeTab, setUser }: IModalLogin) => {
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const { getValues, register } = useForm();
    const { login, registerUser } = useUser();
    const submitData = async () => {
        setIsFetching(true)
        const data = getValues()
        if (!data.username) return window.alert('Username is required')
        if (!data.password) return window.alert('Password is required')
        const newUser = { username: data.username, password: data.password }
        if (activeTab === ActiveTabEnum.REGISTER) {
            if (data.password !== data.confirmPassword) return window.alert('The passwords must match')
            const user = await registerUser(newUser);
            user && setUser(user)
        }
        if (activeTab === ActiveTabEnum.LOGIN) {
            const user = await login(newUser)
            user && setUser(user)
        }
        setIsOpen(false)
        setIsFetching(false)
    }
    return (
        <form>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                {isFetching ?
                    <Spinner />
                    : <>
                        <DialogTitle>{activeTab === ActiveTabEnum.LOGIN ? 'Sign in' : 'Sign up'}</DialogTitle>
                        <DialogContent className="flex flex-col gap-5">
                            <TextField id="outlined-basic" label="Username" variant="outlined" {...register('username', { required: true })} />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                {...register('password', { required: true })}
                            />
                            {activeTab === ActiveTabEnum.REGISTER &&
                                <TextField
                                    id="password-input"
                                    label="Repeat password"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register('confirmPassword', { required: true })}
                                />
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button onClick={() => submitData()}>{activeTab === ActiveTabEnum.LOGIN ? 'Sign in' : 'Sign up'}</Button>
                        </DialogActions>
                    </>}
            </Dialog>
        </form>
    );
}

export default ModalLogin