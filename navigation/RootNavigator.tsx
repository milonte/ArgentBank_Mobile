import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import UserStack from '../stacks/UserStack';
import AuthStack from '../stacks/AuthStack';
import { UserInterface } from '../models/UserInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function RootNavigator() {
    const user: UserInterface = useSelector((state: RootState) => state.user)

    const [isConnected, setConnected] = useState(false);

    useEffect(() => {
        setConnected(false)
        if (user && user.token) {
            setConnected(true)
        }

    }, [user])

    return (
        <NavigationContainer>
            {isConnected ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}