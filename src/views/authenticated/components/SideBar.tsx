import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Button, Text, View } from 'react-native';

export function SideBar(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Text>Jeroen Frenken</Text>
            <DrawerItemList {...props} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => {}} title="Logout"/>
            </View>
        </DrawerContentScrollView>
    );
}
