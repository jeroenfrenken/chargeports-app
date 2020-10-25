import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { User } from '../../../api';
import { useStoreState } from '../../../store/hooks';
import Constants from 'expo-constants';

export function SideBar(props) {
    const user: User = useStoreState(state => state.auth.user);

    return (
        <DrawerContentScrollView {...props}>
            <View>
                <Text style={{
                    textAlign: "center",
                    fontSize: 18,
                    padding: 40
                }}>{user.firstName} {user.lastName}</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button onPress={() => props.logout()} title="Uitloggen"/>
                <Text style={{
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "300"
                }}>{ Constants.manifest.name } { Constants.manifest.version }</Text>
            </View>
        </DrawerContentScrollView>
    );
}
