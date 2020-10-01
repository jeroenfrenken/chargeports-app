import * as React from 'react';
import MapMarker from '../../../assets/charger.svg';
import {Dimensions, StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    wrapper: {
        width: 30,
        height: 35,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 0},
    },
    mapMarker: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 30,
        height: 30,
    },
    triangle: {
        left: 10,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFF'
    },
});

export default () => (
    <View style={styles.wrapper}>
        <View style={styles.mapMarker}>
            <MapMarker width={20} height={20}/>
        </View>
        <View style={styles.triangle} />
    </View>
);