import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { UserInterface } from '../models/UserInterface'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import BankCard from '../components/BankCard'

export default function ProfileScreen() {

    const user: UserInterface = useSelector((state: RootState) => state.user)

    const userBanks: { name: string, balance: number }[] = [
        {
            name: 'Argent Bank Checking (x9452)',
            balance: 2082.79
        },
        {
            name: 'Argent Bank Savings (x67156)',
            balance: 10928.42
        },
        {
            name: 'Argent Bank Credit card (x5201)',
            balance: 184.30
        },
    ]

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Text style={styles.welcome}>Welcome back</Text>
                <Text style={styles.user}>{user.firstName} {user.lastName}</Text>
            </View>
            <View style={styles.cardsContainer}>
                {Object.entries(userBanks).map(([key, bank]) => {
                    return (
                        <View style={styles.card}>
                            <BankCard key={key} name={bank.name} balance={bank.balance} />
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    userContainer: {
        flex: .2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 14,
        color: '#333',
    },
    user: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 25,

    },
    cardsContainer: {
        flex: .6,
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: '90%'
    },
    card: {
        flex: .5
    },
})