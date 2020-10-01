import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';
import { useStoreActions } from '../../../store/hooks';
import MapView, {Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions, SafeAreaView, Text, Image} from 'react-native';
import {Localization} from "expo/build/removed.web";
import MapMarker from "../components/MapMarker";

type Props = StackScreenProps<RootStackParamList, 'Map'>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

const locations = [
    {
        id: 1,
        title: 'Laadpaal Strijen',
        latitude: 51.744690,
        longitude: 4.550590
    },
    {
        id: 2,
        title: 'Laadpaal Numansdorp',
        latitude: 51.727791,
        longitude: 4.438850
    },
    {
        id: 3,
        title: 'Laadpaal Maasdam',
        latitude: 51.787560,
        longitude: 4.555190
    }
];

export default ({ navigation }: Props) => {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} >
                { locations.map(marker => (
                    <Marker key = {marker.id} coordinate = {{ latitude: marker.latitude, longitude: marker.longitude }} title = {marker.title}>
                        <MapMarker/>
                    </Marker>
                )) }
            </MapView>
            <SafeAreaView>
                <Text
                    onPress={() => logoutAction()}
                >LOGOUT</Text>
            </SafeAreaView>
        </View>
    );
}
