import * as Location from 'expo-location';
import React, { useState } from 'react';
import { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import useAsyncEffect from 'use-async-effect';
import MapStyle from '../../../assets/maps/MapStyle.json';
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
import { RoundedButton } from '../../../ui/components/RoundedButton';
import DefaultTheme, { defaultTheme } from '../../../ui/theme/DefaultTheme';
import ChargerOverlay from '../components/ChargerOverlay';
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
    bottomBarContainer: {
        flex: 1,
        bottom: 75,
        width: '90%',
        position: 'absolute',
        alignItems: 'flex-end'
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
    const [map, setMap] = useState(null);
    const [chargers, setChargers] = useState([]);
    const [mapSearch, setMapSearch] = useState('');
    const [location, setLocation] = useState({ coords: { latitude: 51.2608984, longitude: 5.6907774 } });

    useAsyncEffect(async () => {
        let { status } = await Location.requestPermissionsAsync();
        if ( status !== 'granted' ) {
            Alert.alert('Error', 'Permission to access location was denied');
        }

        // await updateMapLocation();
    });

    useAsyncEffect(async () => {
        await loadNewChargers(location.coords.latitude.toString(), location.coords.longitude.toString());
    }, [location]);

    async function loadNewChargers(
        lat: string,
        long: string
    ) {
        try {
            const c = await ApiService.wrap<Charger[]>(ApiService.default.chargersSearch(lat, long));
            setChargers(c.data);
        } catch (e) {
            Alert.alert('Error', 'Failed to load chargers');
        }
    }

    async function updateMapLocation() {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if ( map !== null ) {
            map.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        }
    }

    function showChargerOverView(charger: Charger) {
        if ( map !== null ) {
            map.animateToRegion({
                latitude: parseFloat(charger.latitude),
                longitude: parseFloat(charger.longitude),
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            });
        }
    }

    const INITIAL_REGION = {
        latitude: 51.3,
        longitude: 5.6907774,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5,
    };


    return (
        <View style={styles.container}>
            <MapView
                ref={ref => {
                    setMap(ref);
                }}
                clusterColor={defaultTheme.colors.primary}
                style={styles.mapStyle}
                showsUserLocation={true}
                initialRegion={INITIAL_REGION}
                radius={75}
                provider={PROVIDER_GOOGLE}
                maxZoom={10}
                // customMapStyle={MapStyle}
                onPress={() => {
                    // props.dismiss();
                }}
            >
                {chargers.map(charger => (
                    <Marker
                        key={charger.uuid}
                        coordinate={{ latitude: parseFloat(charger.latitude), longitude: parseFloat(charger.longitude) }}
                        onPress={() => showChargerOverView(charger)}
                    >
                        <MapMarker/>
                        <Callout
                            tooltip={true}
                        >
                            <ChargerOverlay charger={charger} />
                        </Callout>
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
                        onChangeText={(value) => setMapSearch(value)}
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
            <SafeAreaView
                style={styles.bottomBarContainer}
            >
                <RoundedButton
                    onPress={async () => await updateMapLocation()}
                >
                    <LocationIcon/>
                </RoundedButton>
            </SafeAreaView>
        </View>
    );
}
