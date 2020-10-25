import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger } from '../../../api';
import NormalButton from '../../../ui/components/NormalButton';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import { ChargerUtil } from '../../../util/ChargerUtil';

const styles = StyleSheet.create({
    wrapper: {
        width: (Dimensions.get('window').width) - 100,
        backgroundColor: defaultTheme.colors.white,
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    detailsContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    detailItem: {
        flex: 1,
        textAlign: "center",
        borderTopColor: defaultTheme.colors.secondary,
        borderTopWidth: 1,
        paddingTop: 5
    },
    detailTitle: {
        color: 'rgba(43,50,71,60)'
    },
    detailText: {
        color: defaultTheme.colors.secondary
    }
});

export default (props: {
    charger: Charger
}) => (
    <View style={styles.wrapper}>
        <Text style={styles.title}>{props.charger.name}</Text>
        {/*{props.charger.name !== props.charger.addressLine && (<Text>{props.charger.addressLine}</Text>)}*/}
        {/*<Text>{props.charger.postcode !== '' && (props.charger.postcode + ' ')}{props.charger.town}</Text>*/}

        {/*{props.charger.chargerConnections.map(connection => <Text>{ChargerUtil.parseConnectionType(connection.connectionTypeId)} {connection.quantity} {ChargerUtil.parseCurrentType(connection.currentTypeId)} {connection.powerKw}KwH</Text>)}*/}
        <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>Distance</Text>
                <Text style={styles.detailText}>{props.charger.distance}KM</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>Connection</Text>
                <Text style={styles.detailText}>{ChargerUtil.parseConnectionType(props.charger.chargerConnections[0].connectionTypeId)}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.detailTitle}>Power</Text>
                <Text style={styles.detailText}>{props.charger.chargerConnections[0].powerKw} kW</Text>
            </View>
        </View>
        <NormalButton
            style={{
                marginTop: 40
            }}
            text={'Reserveer'}
        />
    </View>
);
