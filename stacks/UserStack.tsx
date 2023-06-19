import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import UserScreen from '../screens/UserScreen';
import { Button, Text } from 'react-native';
import { UserInterface } from '../models/UserInterface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/userSlice';





export default function UserStack() {
    const Stack = createNativeStackNavigator();
    const user: UserInterface = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch()

    function HeaderRight() {
        return (
            <>
                <Text style={{ color: '#555', marginEnd: 12 }}>{user?.email}</Text>
                <Button title="Logout" onPress={() => { dispatch(logout()) }} />
            </>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="User" component={UserScreen}
                options={{
                    headerRight: () => (<HeaderRight />
                    )
                }} />
        </Stack.Navigator>
    )
}