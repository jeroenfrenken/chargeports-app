import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// @ts-ignore
import Previous from "../../../assets/icons/Previous.svg";
import {defaultTheme} from "../../../ui/theme/DefaultTheme";

const styles = StyleSheet.create({
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

export default (props) => {
    const charge = props.charge;

    return (
        <View style={styles.chargeWrap}>
            <View style={styles.date}>
                <Text>{charge.date}</Text>
            </View>
            <View style={styles.infoLineMain}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>{charge.title}</Text>
                    <Text>{charge.address}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>{charge.kWh} kWh</Text>
                    <Text style={{textAlign: 'right'}}>totaal</Text>
                </View>
            </View>
            <View style={styles.infoLineMain}>
                <View style={styles.infoLine}>
                    <View style={styles.previousWrap}>
                        <Previous style={{width: 8, height: 8}}/>
                    </View>
                    <View style={styles.infoLine}>
                        <Text style={styles.time}>{charge.timeStart}</Text>
                        <Text style={{marginTop: 8, marginLeft: 5, marginRight: 5}}>tot</Text>
                        <Text style={styles.time}>{charge.timeEnd}</Text>
                    </View>
                </View>
                <View style={styles.infoLineRight}>
                    <View style={styles.euroWrap}>
                        <Text style={styles.euro}>&euro;</Text>
                    </View>
                    <Text style={{marginTop: 8}}>{charge.price}</Text>
                </View>
            </View>
        </View>
    )
};
