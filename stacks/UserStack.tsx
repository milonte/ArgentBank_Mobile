import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import ProfileScreen from '../screens/ProfileScreen';
import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserInterface } from '../models/UserInterface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faSignOut, faUserCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';

export default function UserStack() {
    const Stack = createNativeStackNavigator();
    const user: UserInterface = useSelector((state: RootState) => state.user);
    const dispatch: AppDispatch = useDispatch();
    const [modaleVisible, setModaleVisible] = useState<boolean>(false)

    function HeaderSettingsModal() {
        return (
            <View>
                <Modal
                    animationType='slide'
                    visible={modaleVisible}>
                    <View style={styles.modalCloseBtn}>
                        <View style={styles.modalUser}>
                            <FontAwesomeIcon style={{ borderWidth: 0, borderRadius: 30, backgroundColor: '#fff', margin: 5, width: 5, height: 5 }}
                                icon={faUserCircle} color='#555' size={25} />
                            <Text style={{ color: '#555', fontSize: 14 }}>{user?.email}</Text>
                        </View>
                        <Pressable onPress={() => { setModaleVisible(false) }}>
                            <FontAwesomeIcon icon={faClose} size={30} />
                        </Pressable>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalLink}>Edit User</Text>
                        <FontAwesomeIcon icon={faUserEdit} size={20} color={'#333'} />
                    </View>
                    <Pressable style={{ height: 60 }} onPress={() => { dispatch(logout()) }}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalLink}>Logout</Text>
                            <FontAwesomeIcon icon={faSignOut} size={20} color={'#333'} />
                        </View>
                    </Pressable>
                </Modal>
            </View >
        )
    }

    function HeaderRight() {
        return (
            <>
                <HeaderSettingsModal />
                <Pressable onPress={() => { setModaleVisible(true) }}>
                    <View style={styles.headerRigth}>
                        <FontAwesomeIcon style={{ borderWidth: 0, borderRadius: 30, backgroundColor: '#fff', margin: 5, width: 5, height: 5 }}
                            icon={faUserCircle} color='#555' size={25} />
                    </View>
                </Pressable>
            </>

        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen}
                options={{
                    headerRight: () => (<HeaderRight />)
                }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerRigth: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        height: 50,
    },
    modalUser: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalCloseBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        maxHeight: 60,
    },
    modalContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#efefef',
        marginTop: 0,
        maxHeight: 60,
        shadowColor: '#f00',
        shadowRadius: 2,
        shadowOffset: { width: 4, height: 4 },
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#bbb',
    },
    modalLink: {
        color: '#222',
        fontSize: 18,
        marginLeft: 10,
    },
})