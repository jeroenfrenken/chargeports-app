import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger } from '../../../api';
import NormalButton from '../../../ui/components/NormalButton';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import { ChargerUtil } from '../../../util/ChargerUtil';

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 15
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
    }
});

export function ChargerOverview(props: {
    charger: Charger
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{ props.charger.name }</Text>
            {props.charger.name !== props.charger.addressLine && (<Text>{ props.charger.addressLine }</Text>)}
            <Text>{props.charger.postcode !== "" && (props.charger.postcode + " ")}{props.charger.town}</Text>
            {/*<Text>{props.charger.distance}KM</Text>*/}
            {props.charger.chargerConnections.map(connection => <Text>{ChargerUtil.parseConnectionType(connection.connectionTypeId)} {connection.quantity} {ChargerUtil.parseCurrentType(connection.currentTypeId)} {connection.powerKw}KwH</Text>)}
            <NormalButton
                style={{
                    marginTop: 40
                }}
                text={'Reserveer'}
            />
        </View>
    );
}
