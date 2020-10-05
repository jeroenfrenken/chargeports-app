import React from 'react'
import { Navigator } from 'react-native-popup-navigation'
import { Dimensions } from 'react-native'
import FilterScreen from './FilterScreen';
import MapScreen from './MapScreen';

const { height } = Dimensions.get('window')

export default (props) => {
    return (
        <Navigator pages={[
            { screen: MapScreen, props: {
                    openMenu: () => {props.navigation.openDrawer()}
                }, name: 'Map', init: true },
            { screen: FilterScreen, props: {}, name: 'FilterScreen', snapPoints: [50, height] }
        ]} />
    )
}
