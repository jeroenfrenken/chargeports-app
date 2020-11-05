import moment from 'moment';
import { useState } from 'react';
import * as React from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import useAsyncEffect from 'use-async-effect';
import { Reservation } from '../../../api';
import { ApiService } from '../../../service/ApiService';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import {MenuButton} from "../../../ui/components/MenuButton";
// @ts-ignore
import MenuBarIcon from "../../../assets/icons/MenuIcon.svg";
// @ts-ignore
import Previous from "../../../assets/icons/Previous.svg";

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    topBarContainer: {
        flex: 1,
        top: 60,
        height: 50,
        width: '90%',
        left: '5%',
        position: 'absolute',
        flexDirection: 'row',
    },
    menuButton: {
        marginTop: 0
    },
    titleWrap: {
        backgroundColor: defaultTheme.colors.white,
        height: 45,
        padding: 10,
        borderRadius: 5,
        shadowColor: defaultTheme.colors.black,
        shadowOffset: {width: 5, height: 5},
        shadowRadius: 20,
        shadowOpacity: 0.1,
    },
    title: {
        fontSize: 20,
        height: 30,
        fontWeight: '600'
    },
    icon: {
        marginRight: 10
    },
    list: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 150,
        overflow: 'visible'
    },
    listWrap: {
        paddingTop: 150,
        backgroundColor: 'transparent'
    },
    date: {
        backgroundColor: '#F3F3F3',
        padding: 10,
        borderRadius: 5,
    },
    chargeWrap: {
        shadowColor: defaultTheme.colors.black,
        shadowOffset: {width: 5, height: 5},
        shadowRadius: 20,
        shadowOpacity: 0.1,
        borderRadius: 20,
        backgroundColor: defaultTheme.colors.white,
        width: '100%',
        padding: 20,
        marginBottom: 20,
    },
    previousWrap: {
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        backgroundColor: '#97d0a352',
        marginRight: 10
    },
    euroWrap: {
        padding: 5,
        paddingLeft: 8,
        borderRadius: 5,
        width: 30,
        height: 30,
        backgroundColor: '#673ab747',
        marginRight: 10
    },
    euro: {
        fontSize: 18
    },
    time: {
        fontWeight: "600",
        marginTop: 8
    },
    infoLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoLineMain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    infoLineRight: {
        display: 'flex',
        flexDirection: 'row',
    }
});

export default function PreviousChargesScreen(props: any) {
    const [ charges, setChargers ] = useState([]);

    useAsyncEffect(async () => {
        try {
            const c = await ApiService.wrap<Reservation[]>(ApiService.default.previousReservations());
            setChargers(c.data);
        } catch (e) {
            Alert.alert('Error', 'Vorige laadbeurten niet gevonden');
        }
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.list}>
                { charges.map((charge: Reservation) =>
                    <View style={styles.chargeWrap} key={charge.uuid}>
                        <Text>{ moment(charge.startTime).format('ddd DD MMMM YYYY')}</Text>
                        <View style={styles.infoLineMain}>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>{ charge.charger.name }</Text>
                                <Text>{ charge.charger.addressLine }</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>{ charge.chargerConnection.powerKw } kW</Text>
                                <Text style={{textAlign: 'right'}}>totaal</Text>
                            </View>
                        </View>
                        <View style={styles.infoLineMain}>
                            <View style={styles.infoLine}>
                                <View style={styles.previousWrap}>
                                    <Previous style={{ width: 8, height: 8}}/>
                                </View>
                                <View style={styles.infoLine}>
                                    <Text style={styles.time}>{ moment(charge.startTime).format('DD MMMM YYYY H:mm') }</Text>
                                    <Text style={{ marginTop: 8, marginLeft: 5, marginRight: 5}}>tot</Text>
                                    <Text style={styles.time}>{ moment(charge.endTime).format('H:mm') }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) }
            </ScrollView>
            <SafeAreaView
                style={styles.topBarContainer}>
                <MenuButton
                    style={styles.menuButton}
                    onPress={() => {
                        props.navigation.openDrawer();
                    }}>
                    <MenuBarIcon/>
                </MenuButton>
                <View style={styles.titleWrap}>
                    <Text style={styles.title}><Previous style={styles.icon}/> Vorige laadbeurten</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}
