import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStoreActions } from '../../../store/hooks';
import { SideBar } from '../components/SideBar';
import MapScreen from './MapScreen';

function NotificationsScreen({ navigation }) {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => logoutAction()} title="Logout"/>
        </View>
    );
}

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <Drawer.Navigator initialRouteName="Map" drawerContent={SideBar}>
            <Drawer.Screen name="Map" component={MapScreen}/>
            <Drawer.Screen name="Notifications" component={NotificationsScreen}/>
        </Drawer.Navigator>
    );
}
