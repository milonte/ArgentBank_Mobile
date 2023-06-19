import { View, Text, StyleSheet, TextInput, Button, Switch, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { GetUserProfile, GetUserToken } from '../api/api'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { UserInterface } from '../models/UserInterface'

export default function LoginScreen() {
    const [email, changeEmail] = useState<string>('')
    const [password, changePassword] = useState<string>('')
    const [isLoading, setLoading] = useState<boolean>(false)
    const user: UserInterface = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch()

    function handleSubmit() {
        setLoading(true)
        setTimeout(() => {
            Promise.resolve(
                GetUserToken(email.toLowerCase(), password, dispatch)
            )
                .then(token => {
                    GetUserProfile(token, false, dispatch)
                })
                .catch(err => setLoading(false))
        }, 1000);

    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={styles.label}>Email</Text>
            <TextInput inputMode='email' style={styles.input}
                onChangeText={(text) => { changeEmail(text) }} />
            <Text style={styles.label}>Password</Text>
            <TextInput inputMode='text' style={styles.input}
                onChangeText={(text) => { changePassword(text) }}
                secureTextEntry={true} />
            {user?.error ?
                <Text style={{ color: 'red' }}>{user.error}</Text>
                : null}
            <View style={{ marginTop: 30, width: '80%' }}>
                {isLoading ?
                    <ActivityIndicator size={'large'} /> :
                    <Button title='Send'
                        onPress={handleSubmit} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#66f',
    },
    label: {
        textAlign: 'left',
        width: '80%',
        marginLeft: 15,
        color: 'red',
    },
    input: {
        color: '#666',
        height: 50,
        margin: 12,
        paddingLeft: 15,
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        width: '80%',
    },
    button: {

    },
})