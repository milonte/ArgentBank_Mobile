import { View, Text } from 'react-native'
import React from 'react'
import { UserInterface } from '../models/UserInterface'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function UserScreen() {

    const user: UserInterface = useSelector((state: RootState) => state.user)

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{ color: '#66f' }}>{user.firstName} {user.lastName}</Text>
        </View>
    )
}