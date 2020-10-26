import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger } from '../../../api';
import RNPickerSelect from 'react-native-picker-select';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 15
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerItemLarge: {
        flex: 2
    },
    containerItemSmall: {
        flex: 1
    }
});

export function ChargerOverview(props: {
    charger: Charger
}) {
    const [activeDate, setActiveDate] = useState(null);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const days = [];

        for (let i = 0; i < 7; i++) {
            const date = moment();
            date.add(i, 'days');
            days.push({
                label: date.format('ddd DD MMM'),
                value: date.format('DD-MM-YYYY')
            });
        }

        console.log(days);

        setDates(days);
        setActiveDate(days[0].value);
    }, []);

    return (
        <View style={styles.wrapper}>
            <Text>{props.charger.name}</Text>
            <View style={styles.container}>
                <View style={styles.containerItemLarge}>
                    <RNPickerSelect
                        onValueChange={(val) => setActiveDate(val)}
                        items={dates}
                        placeholder={'Selecteer een datum'}
                        style={{}}
                        value={activeDate}
                    />
                </View>
                <View style={styles.containerItemSmall}>
                    <Text>Test</Text>
                </View>
                <View style={styles.containerItemLarge}>
                    <Text>2</Text>
                </View>
            </View>
        </View>
    );
}
