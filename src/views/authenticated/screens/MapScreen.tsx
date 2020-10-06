import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import useAsyncEffect from 'use-async-effect';
import { Charger } from '../../../api';
// @ts-ignore
import MenuBarIcon from '../../../assets/icons/MenuIcon.svg';
// @ts-ignore
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
// @ts-ignore
import FilterIcon from '../../../assets/icons/FilterIcon.svg';
import { StyleSheet, View, Dimensions, SafeAreaView, Keyboard, InteractionManager, Alert } from 'react-native';
import { ApiService } from '../../../service/ApiService';
import MapInput from '../../../ui/components/MapInput';
import { MenuButton } from '../../../ui/components/MenuButton';
import MapMarker from '../components/MapMarker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBarContainer: {
        flex: 1,
        top: 0,
        height: 120,
        width: '90%',
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    inputContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
        flex: 2
    },
    filterIcon: {
        position: 'absolute',
        top: 25,
        right: 20
    }
});

export default (props: any) => {
    const [chargers, setChargers] = useState([]);

    useAsyncEffect(async () => {
       try {
           const c = await ApiService.wrap<Charger[]>(ApiService.default.chargersAll())
           console.log(c.data);
           setChargers(c.data);
       } catch (e) {
           Alert.alert('Error', 'Failed to load chargers');
       }
    });

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}>
                {chargers.map(marker => (
                    <Marker
                        key={marker.uuid}
                        coordinate={{ latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}
                        title={marker.name}
                    >
                        <MapMarker/>
                    </Marker>
                ))}
            </MapView>
            <SafeAreaView
                style={styles.topBarContainer}
            >
                <MenuButton
                    onPress={() => {
                        Keyboard.dismiss();
                        InteractionManager.runAfterInteractions(() => {
                            props.openMenu();
                        });
                    }}
                >
                    <MenuBarIcon/>
                </MenuButton>
                <View style={styles.inputContainer}>
                    <MapInput
                        placeholder="Voer een locatie in"
                        returnKeyType="done"
                        autoCapitalize="none"
                    />
                    <FilterIcon
                        style={styles.filterIcon}
                        onPress={() => {
                            Keyboard.dismiss();
                            InteractionManager.runAfterInteractions(() => {
                                props.present('FilterScreen');
                            });
                        }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
