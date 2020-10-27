import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStoreActions } from '../../../store/hooks';
import { SideBar } from '../components/SideBar';
// @ts-ignore
import MapIcon from "../../../assets/icons/MapIcon.svg";
// @ts-ignore
import Previous from "../../../assets/icons/Previous.svg";
// @ts-ignore
import Upcomming from "../../../assets/icons/Upcomming.svg";
// @ts-ignore
import Settings from "../../../assets/icons/Settings.svg";
import MapScreenNavigator from './MapScreenNavigator';
import PreviousChargesScreen from "./PreviousChargesScreen";
import UpcommingChargesScreen from "./UpcommingChargesScreen";
import SettingsScreen from "./SettingsScreen";

const Drawer = createDrawerNavigator();

export default function AuthenticatedScreen() {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <Drawer.Navigator initialRouteName="Map" drawerContent={(props) => (
            <SideBar {...props} logout={logoutAction} />
        )} drawerStyle={{backgroundColor: "transparent"}}>
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
            <Drawer.Screen
                name="PreviousCharges"
                component={PreviousChargesScreen}
                options={{
                    title: 'Vorige laadbeurten',
                    drawerIcon: ({focused, size}) => (
                        <Previous />
                    ),
                }}
            />
            <Drawer.Screen
                name="UpcommingCharges"
                component={UpcommingChargesScreen}
                options={{
                    title: 'Aankomende laadbeurten',
                    drawerIcon: ({focused, size}) => (
                        <Upcomming />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Instellingen',
                    drawerIcon: ({focused, size}) => (
                        <Settings />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
