import * as React from 'react';
// @ts-ignore
import MapMarker from '../../../assets/icons/Charger.svg';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    mapMarker: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
});

export default () => (
    <View style={styles.mapMarker}>
        <MapMarker width={12} height={12}/>
    </View>
);
