import * as React from 'react';
import {Dimensions, InteractionManager, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import {MenuButton} from "../../../ui/components/MenuButton";
// @ts-ignore
import MenuBarIcon from "../../../assets/icons/MenuIcon.svg";
import PreviousCharge from "../components/PreviousCharge";
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
        overflow: 'visible'
    },
    listWrap: {
        paddingTop: 150,
        backgroundColor: 'transparent'
    }
});

const PreviousCharges = [
    {
        id: 1,
        date: '20-10-2020',
        title: 'AH Eindhoven',
        address: 'Groeneweg 12',
        kWh: '20',
        timeStart: '12:35',
        timeEnd: '13:35',
        price: '20,50',
    },
    {
        id: 2,
        date: '19-10-2020',
        title: 'AH Eindhoven',
        address: 'Groeneweg 12',
        kWh: '30',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '30,50',
    },
    {
        id: 3,
        date: '18-10-2020',
        title: 'Strijen',
        address: 'Rietgansstraat 1',
        kWh: '40',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '30,50',
    },
    {
        id: 4,
        date: '17-10-2020',
        title: 'Weert',
        address: 'Rentemeesterlaan 13',
        kWh: '10',
        timeStart: '10:30',
        timeEnd: '14:30',
        price: '69,50',
    },
    {
        id: 5,
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
            <View style={styles.listWrap}>
                <ScrollView style={styles.list}>
                    { PreviousCharges.map((charge) =>
                        <PreviousCharge charge={charge} key={charge.id}/>
                    ) }
                </ScrollView>
            </View>
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
