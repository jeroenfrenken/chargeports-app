import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 10
    }
});

export function ChargerOverview(props) {
    return (
        <View style={styles.container}>
            <Text>{ props.charger.name }</Text>
        </View>
    );
}
