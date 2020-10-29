import * as React from 'react';
import {Dimensions, InteractionManager, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
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
        top: 30,
        height: 50,
        width: '90%',
        left: '5%',
        position: 'absolute',
        flexDirection: 'row',
    },
    menuButton: {
        marginTop: 0
    },
    title: {
        fontSize: 26
    },
    list: {
        paddingTop: 100,
        paddingBottom: 200,
        padding: 20
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

const PreviousCharges = [
    {
        date: '20-10-2020',
        title: 'AH Eindhoven',
        address: 'Groeneweg 12',
        kWh: '20',
        timeStart: '12:35',
        timeEnd: '13:35',
        price: '20,50',
    },
    {
        date: '19-10-2020',
        title: 'AH Eindhoven',
        address: 'Groeneweg 12',
        kWh: '30',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '30,50',
    },
    {
        date: '18-10-2020',
        title: 'Strijen',
        address: 'Rietgansstraat 1',
        kWh: '40',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '30,50',
    },
    {
        date: '17-10-2020',
        title: 'Weert',
        address: 'Rentemeesterlaan 13',
        kWh: '10',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '69,50',
    },
    {
        date: '18-10-2020',
        title: 'Strijen',
        address: 'Rietgansstraat 1',
        kWh: '40',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '30,50',
    }
];

export default function PreviousChargesScreen(props: any) {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.list}>
                { PreviousCharges.map((charge) =>
                    <View style={styles.chargeWrap}>
                        <Text>{charge.date}</Text>
                        <View style={styles.infoLineMain}>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>{ charge.title }</Text>
                                <Text>{ charge.address }</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 20, fontWeight: '600'}}>{ charge.kWh } kWh</Text>
                                <Text style={{textAlign: 'right'}}>totaal</Text>
                            </View>
                        </View>
                        <View style={styles.infoLineMain}>
                            <View style={styles.infoLine}>
                                <View style={styles.previousWrap}>
                                    <Previous style={{ width: 8, height: 8}}/>
                                </View>
                                <View style={styles.infoLine}>
                                    <Text style={styles.time}>{ charge.timeStart }</Text>
                                    <Text style={{ marginTop: 8, marginLeft: 5, marginRight: 5}}>tot</Text>
                                    <Text style={styles.time}>{ charge.timeEnd }</Text>
                                </View>
                            </View>
                            <View style={styles.infoLineRight}>
                                <View style={styles.euroWrap}>
                                    <Text style={styles.euro}>&euro;</Text>
                                </View>
                                <Text style={{marginTop: 8}}>{ charge.price }</Text>
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
                <Text style={styles.title}>Vorige laadbeurten</Text>
            </SafeAreaView>
        </View>
    );
}
