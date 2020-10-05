import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Button, Text, View } from 'react-native';

export function SideBar(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Text style={{
                textAlign: "center",
                fontSize: 18,
                padding: 40
            }}>Jeroen Frenken</Text>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button onPress={() => props.logout()} title="Logout"/>
            </View>
        </DrawerContentScrollView>
    );
}
