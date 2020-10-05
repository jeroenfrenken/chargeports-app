import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStoreActions } from '../../../store/hooks';
import { SideBar } from '../components/SideBar';
import MapScreen from './MapScreen';
// @ts-ignore
import MapIcon from "../../../assets/icons/MapIcon.svg";

const Drawer = createDrawerNavigator();

export default function App() {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <Drawer.Navigator initialRouteName="Map" drawerContent={(props) => (
            <SideBar {...props} logout={logoutAction} />
        )}>
            <Drawer.Screen
                name="Map"
                component={MapScreen}
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
