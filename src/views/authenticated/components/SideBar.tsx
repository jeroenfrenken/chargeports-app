import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Button, Text, View, ViewComponent, Dimensions} from 'react-native';
import { User } from '../../../api';
import { useStoreState } from '../../../store/hooks';
import Constants from 'expo-constants';
// @ts-ignore
import UserIcon from "../../../assets/icons/User.svg";
import { defaultTheme } from "../../../ui/theme/DefaultTheme";

const styles = StyleSheet.create({
    sidebar: {
        borderRadius: 30,
        padding: 20,
        backgroundColor: defaultTheme.colors.white,
    },
    userIcon: {
        backgroundColor: defaultTheme.colors.primary,
        padding: 20,
        borderRadius: 1000,
        width: 70,
        height: 70,
        marginBottom: 10
    },
    user: {
        textAlign: "left",
        fontSize: 18,
        flex: 2,
        marginBottom: 20
    },
    logout: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: Dimensions.get('window').height - 120,
        width: '100%'
    }
});

export function SideBar(props) {
    const user: User = useStoreState(state => state.auth.user);

    return (
        <DrawerContentScrollView {...props} style={styles.sidebar}>
            <View style={{marginTop: 50}}>
                <View style={styles.userIcon}>
                    <UserIcon />
                </View>
                <Text style={styles.user}>{user.firstName} {user.lastName}</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={ styles.logout }>
                <Button onPress={() => props.logout()} title="Uitloggen" color={defaultTheme.colors.black}/>
                <Text style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "300",
                    opacity: 0.4,
                    marginTop: 5
                }}>{ Constants.manifest.name } { Constants.manifest.version }</Text>
            </View>
        </DrawerContentScrollView>
    );
}
