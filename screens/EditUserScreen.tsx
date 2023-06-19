import { View, Text, StyleSheet, TextInput, Button, Switch, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { UpdateUserProfile } from '../api/api';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { UserInterface } from '../models/UserInterface';
import { useNavigation } from '@react-navigation/native';

export default function EditUserScreen() {

    const user: UserInterface = useSelector((state: RootState) => state.user)
    const [firstName, changeFisrtName] = useState<string>(user?.firstName ? user.firstName : '')
    const [lastName, ChangeLastName] = useState<string>(user?.lastName ? user.lastName : '')
    const [isLoading, setLoading] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    const navigation = useNavigation()

    function handleSubmit() {
        setLoading(true)
        setTimeout(() => {
            Promise.resolve(
                UpdateUserProfile(user, firstName, lastName, dispatch)
            )
                .then(() => {
                    navigation.goBack()
                })
                .catch((err) => {
                    setLoading(false)
                })
        }, 1000);
    }


    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={styles.label}>Firstname</Text>
            <TextInput inputMode='text' style={styles.input} value={firstName}
                onChangeText={(text) => { changeFisrtName(text) }} />
            <Text style={styles.label}>Lastname</Text>
            <TextInput inputMode='text' style={styles.input} value={lastName}
                onChangeText={(text) => { ChangeLastName(text) }} />
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