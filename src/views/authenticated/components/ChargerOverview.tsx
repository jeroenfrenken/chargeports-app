import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger } from '../../../api';
import NormalButton from '../../../ui/components/NormalButton';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 15
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    }
});

export function ChargerOverview(props: {
    charger: Charger
}) {
    return (
        <View style={styles.container}>
            <Text>Cool we gaan reserveren</Text>
        </View>
    );
}
