import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStoreActions } from '../../../store/hooks';
import { SideBar } from '../components/SideBar';
// @ts-ignore
import MapIcon from "../../../assets/icons/MapIcon.svg";
import MapScreenNavigator from './MapScreenNavigator';

const Drawer = createDrawerNavigator();

export default function AuthenticatedScreen() {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <Drawer.Navigator initialRouteName="Map" drawerContent={(props) => (
            <SideBar {...props} logout={logoutAction} />
        )}>
            <Drawer.Screen
                name="Map"
                component={MapScreenNavigator}
                options={{
                    title: 'Map',
                    drawerIcon: ({focused, size}) => (
                        <MapIcon />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
