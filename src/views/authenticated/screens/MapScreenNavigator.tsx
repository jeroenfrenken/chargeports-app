import React from 'react';
import { Navigator } from 'react-native-popup-navigation';
import { Dimensions } from 'react-native';
import { ChargerOverview } from '../components/ChargerOverview';
import FilterScreen from './FilterScreen';
import MapScreen from './MapScreen';

const { height } = Dimensions.get('window');

console.log(height - 250);

export default (props) => {
    return (
        <Navigator pages={[
            {
                screen: MapScreen, props: {
                    openMenu: () => {
                        props.navigation.openDrawer();
                    }
                }, name: 'Map', init: true
            },
            { screen: FilterScreen, props: {}, name: 'FilterScreen', snapPoints: [50, height] },
            {
                screen: ChargerOverview, props: {
                    hideBackground: true,
                    firstSnapPoint: 1
                }, name: 'ChargerOverview', snapPoints: [0, height - 250, height]
            }
        ]}/>
    );
}
