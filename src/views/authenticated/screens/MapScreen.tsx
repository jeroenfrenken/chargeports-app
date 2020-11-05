import Axios from 'axios';
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { Callout, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import Constants from 'expo-constants';
import useAsyncEffect from 'use-async-effect';
import { Charger } from '../../../api';
import { decode } from '../../../util/HerePolyline';
// @ts-ignore
import MenuBarIcon from '../../../assets/icons/MenuIcon.svg';
// @ts-ignore
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
// @ts-ignore
import FilterIcon from '../../../assets/icons/FilterIcon.svg';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    Keyboard,
    InteractionManager,
    Alert,
    ScrollView, Text
} from 'react-native';
import { UberMapStyle } from '../../../assets/maps/MapStyle';
import { ApiService } from '../../../service/ApiService';
import MapInput from '../../../ui/components/MapInput';
import { MenuButton } from '../../../ui/components/MenuButton';
import { RoundedButton } from '../../../ui/components/RoundedButton';
import DefaultTheme, { defaultTheme } from '../../../ui/theme/DefaultTheme';
import AnimatedPolyline from '../components/AnimatedPolyline';
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
    },
    searchResultContainer: {
        top: 120,
        height: 350,
        width: '90%',
        position: 'absolute',
    },
    searchItem: {
        marginBottom: 10,
        padding: 20,
        borderRadius: 5,
        backgroundColor: defaultTheme.colors.white
    }
});

export default (props: any) => {
    const mapRef = useRef();
    const [coords, setCoords] = useState([]);
    const [markersRef, setMarkersRef] = useState([]);
    const [chargers, setChargers] = useState([]);
    const [foundChargers, setFoundChargers] = useState([]);
    const [mapSearch, setMapSearch] = useState('');
    const [location, setLocation] = useState({ coords: { latitude: 51.2608984, longitude: 5.6907774 } });

    useAsyncEffect(async () => {
        let { status } = await Location.requestPermissionsAsync();
        if ( status !== 'granted' ) {
            Alert.alert('Error', 'Permission to access location was denied');
        }

        await updateMapLocation();
    }, []);

    async function chargerSearch() {
        try {
            const c = await ApiService.wrap<Charger[]>(ApiService.default.chargersSearch(mapSearch, '', ''));
            setFoundChargers([]);
            setFoundChargers(c.data);
        } catch (e) {
        }
    }

    async function loadNewChargers(
        lat: string,
        long: string
    ) {
        try {
            const c = await ApiService.wrap<Charger[]>(ApiService.default.chargersSearch('', lat, long));
            setChargers(c.data);
        } catch (e) {
            Alert.alert('Error', 'Failed to load chargers');
        }


    }

    async function updateMapLocation() {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        await loadNewChargers(location.coords.latitude.toString(), location.coords.longitude.toString());

        if ( mapRef.current === undefined ) return null;

        mapRef.current.animateToRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    }

    async function showChargerOverView(charger: Charger) {
        setCoords([])
        if ( mapRef.current === undefined ) return null;

        mapRef.current.animateToRegion(
            {
                latitude: parseFloat(charger.latitude),
                longitude: parseFloat(charger.longitude),
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            });
    }

    async function drawRoute(charger: Charger) {
        try {
            const route = await Axios.get(`https://router.hereapi.com/v8/routes?transportMode=car&origin=${location.coords.latitude},${location.coords.longitude}&destination=${parseFloat(charger.latitude)},${parseFloat(charger.longitude)}&apiKey=${Constants.manifest.extra.hereApiKey}&return=polyline`);

            console.log(route);

            if (route.data.routes.length) {
                const coords = decode(route.data.routes[0].sections[0].polyline);
                const formattedCoords = [];

                coords.polyline.forEach((val) => {
                    formattedCoords.push({
                        latitude: val[ 0 ],
                        longitude: val[ 1 ]
                    });
                });
                setCoords(formattedCoords)
            }
        } catch (e) {
            console.log(e);
        }

        if ( mapRef.current === undefined ) return null;

        mapRef.current.fitToCoordinates([
            {
                latitude: parseFloat(charger.latitude),
                longitude: parseFloat(charger.longitude),
            },
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        ], {
            edgePadding: { top: 100, right: 100, bottom: 120, left: 100 },
            animated: true
        });
    }

    const INITIAL_REGION = {
        latitude: 51.3,
        longitude: 5.6907774,
        latitudeDelta: 8.5,
        longitudeDelta: 8.5
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                clusterColor={defaultTheme.colors.primary}
                style={styles.mapStyle}
                showsUserLocation={true}
                initialRegion={INITIAL_REGION}
                radius={75}
                provider={PROVIDER_GOOGLE}
                maxZoom={10}
                customMapStyle={UberMapStyle}
            >
                {chargers.map(charger => (
                    <Marker
                        ref={ref => {
                            markersRef[charger.uuid] = ref;
                            setMarkersRef(markersRef)
                        }}
                        key={charger.uuid}
                        identifier={charger.uuid}
                        coordinate={{
                            latitude: parseFloat(charger.latitude),
                            longitude: parseFloat(charger.longitude)
                        }}
                        onPress={async () => await showChargerOverView(charger)}
                    >
                        <MapMarker/>
                        <Callout
                            tooltip={true}
                        >
                            <ChargerOverlay
                                charger={charger}
                                openReservationScreen={() => {
                                    props.present('ChargerOverview', {
                                        charger,
                                        onConfirm: async () => {
                                            markersRef[charger.uuid].hideCallout();
                                            props.dismiss();
                                            await drawRoute(charger);
                                        }
                                    });
                                }}
                            />
                        </Callout>
                    </Marker>
                ))}
                {
                    coords.length > 0 && (
                        <>
                            <Polyline coordinates={coords} strokeWidth={4} strokeColor={defaultTheme.colors.primary} />
                        </>)
                }

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
                        onChangeText={async (value) => {
                            setMapSearch(value)
                        }}
                        onEndEditing={async () => {
                            await chargerSearch();
                        }}
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
            <ScrollView style={styles.searchResultContainer}>
                {foundChargers.map(charger => (
                    <View key={charger.uuid} style={styles.searchItem}>
                        <Text>{charger.name}</Text>
                    </View>
                ))}
            </ScrollView>
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
