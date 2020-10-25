import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger } from '../../../api';
import NormalButton from '../../../ui/components/NormalButton';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import { ChargerUtil } from '../../../util/ChargerUtil';

const styles = StyleSheet.create({
    wrapper: {
        width: (Dimensions.get('window').width) - 100,
    },
    content: {
        backgroundColor: defaultTheme.colors.white,
        padding: 15,
        borderRadius: 10,
        height: 240
        // shadowColor: '#000',
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
        // shadowOffset: { width: 0, height: 0 }
    },
    title: {
        fontSize: 24,
        paddingBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: defaultTheme.colors.primary
    },
    location: {
        paddingTop: 10,
        paddingBottom: 10
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
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#808592',
        paddingTop: 10
    },
    detailTitle: {
        color: '#808592'
    },
    detailText: {
        color: defaultTheme.colors.secondary
    },
    triangle: {
        left: ((Dimensions.get('window').width) - 120) / 2,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#FFF'
    }
});

export default (props: {
    charger: Charger,
    openReservationScreen: Function
}) => (
    <View style={styles.wrapper}>
        <View style={styles.content}>
            <Text style={styles.title}>{props.charger.name}</Text>
            <View style={styles.location}>
                <Text style={styles.detailTitle}>Locatie</Text>
                <Text style={styles.detailText}>{props.charger.addressLine} {props.charger.postcode !== '' && (props.charger.postcode + ' ')}{props.charger.town}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Afstand</Text>
                    <Text style={styles.detailText}>{props.charger.distance}KM</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Connectie</Text>
                    <Text style={styles.detailText}>{ChargerUtil.parseConnectionType(props.charger.chargerConnections[0].connectionTypeId)}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailTitle}>Stroom</Text>
                    <Text style={styles.detailText}>{props.charger.chargerConnections[0].powerKw} kW</Text>
                </View>
            </View>
            <NormalButton
                text={'Reserveer'}
                onPress={() => {
                    console.log('ja');
                    // props.openReservationScreen();
                }}
            />
        </View>
        <View style={styles.triangle}/>
    </View>
);
