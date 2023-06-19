import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

export default function BankCard(props: { name: string, balance: number }) {
    return (
        <View style={styles.container}>

            <View style={styles.row}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.balance}>${props.balance}</Text>
            </View>
            <Button title="View transactions" onPress={() => { }} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: .8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        justifyContent: 'space-around',
        shadowColor: '#ddd',
        shadowRadius: 3,
        textShadowOffset: 2
    },
    row: {
        flex: 1,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: '#333',
        width: '50%',
        fontSize: 13
    },
    balance: {
        color: '#333',
        width: '50%',
        fontSize: 20,
        textAlign: 'right',
        fontWeight: 'bold'
    }
})
