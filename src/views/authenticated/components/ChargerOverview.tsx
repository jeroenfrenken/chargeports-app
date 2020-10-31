import LottieView from "lottie-react-native";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Down from '../../../assets/icons/Down.svg';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Charger, Reservation, ReservationType } from '../../../api';
import { ApiService } from '../../../service/ApiService';
import LargeButton from '../../../ui/components/LargeButton';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        padding: 15
    },
    title: {
        fontSize: 24,
        paddingBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: defaultTheme.colors.black
    },
    subTitle: {
        fontSize: 15,
        paddingBottom: 5,
        fontWeight: 'bold',
    },
    datePicker: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 60
    },
    datePickerInput: {
        flex: 5,
        padding: 10,
        height: 40,
        backgroundColor: '#f4f4f4',
        justifyContent: 'flex-start'
    },
    datePickerDown: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: defaultTheme.colors.primary
    }
});

export function ChargerOverview(props: {
    charger: Charger,
    onConfirm: Function
}) {
    const now = moment();
    const max = moment().add(7, 'days');

    const [isLoading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(moment());
    const [leaveDate, setLeaveDate] = useState(moment().add(1, 'hour'));
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isLeaveDatePickerVisible, setLeaveDatePickerVisible] = useState(false);


    async function confirmReservation() {
        setLoading(true);

        const reservationDto: ReservationType = {
            startTime: startDate.format(),
            endTime: leaveDate.format(),
            chargerConnection: props.charger.chargerConnections[0].id.toString()
        }

        try {
            await ApiService.wrap<Reservation>(ApiService.default.reservationCreate(reservationDto));
            Alert.alert('Success', `De reservering is bevestigd`);
        } catch (e) {
            Alert.alert('Failed', 'Niet mogelijk om de reservering te maken');
        }

        setLoading(false);
        await props.onConfirm();
    }

    useEffect(() => {
    }, []);

    return (
        <View style={styles.wrapper}>
            {isLoading && (
                <View style={{
                    flex: 1,
                    alignItems: "center"
                }}>
                    <LottieView
                        style={{
                            height: 300,
                        }}
                        source={require('../../../assets/lottie/charger_loading.json')}
                        autoPlay
                        loop
                    />
                </View>
            )}

            {!isLoading && (
                <>
                    <Text style={styles.title}>{props.charger.name}</Text>
                    <View>
                        <Text style={styles.subTitle}>Aankomst</Text>
                        <View style={styles.datePicker} onStartShouldSetResponder={() => {
                            setDatePickerVisible(true);
                        }}>
                            <Text style={styles.datePickerInput}>{startDate.format('ddd DD MMMM YYYY H:mm')}</Text>
                            <View style={styles.datePickerDown}>
                                <Down width={30} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>Vertrek</Text>
                        <View style={styles.datePicker} onStartShouldSetResponder={() => {
                            setLeaveDatePickerVisible(true);
                        }}>
                            <Text style={styles.datePickerInput}>{leaveDate.format('ddd DD MMMM YYYY H:mm')}</Text>
                            <View style={styles.datePickerDown}>
                                <Down width={30} />
                            </View>
                        </View>
                    </View>
                    <View>
                        <LargeButton
                            text={"Bevestig reservering"}
                            style={{
                                marginTop: 20,
                            }}
                            onPress={async () => {
                                await confirmReservation();
                            }}
                        />
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        headerTextIOS="Selecteer aankomst tijd"
                        date={startDate.toDate()}
                        minimumDate={now.toDate()}
                        maximumDate={max.toDate()}
                        isDarkModeEnabled={false}
                        onConfirm={(date) => {
                            setStartDate(moment(date));
                            setDatePickerVisible(false);
                        }}
                        onCancel={() => {
                            setDatePickerVisible(false);
                        }}
                    />
                    <DateTimePickerModal
                        isVisible={isLeaveDatePickerVisible}
                        mode="datetime"
                        headerTextIOS="Selecteer vertrektijd"
                        date={leaveDate.toDate()}
                        minimumDate={startDate.toDate()}
                        maximumDate={max.toDate()}
                        isDarkModeEnabled={false}
                        onConfirm={(date) => {
                            setLeaveDate(moment(date));
                            setLeaveDatePickerVisible(false);
                        }}
                        onCancel={() => {
                            setLeaveDatePickerVisible(false);
                        }}
                    />
                </>
            )}
        </View>
    );
}
