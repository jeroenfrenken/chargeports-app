import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';
import { useStoreActions } from '../../../store/hooks';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';

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

export default ({ navigation }: Props) => {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} />
            <SafeAreaView>
                <Text
                    onPress={() => logoutAction()}
                >LOGOUT</Text>
            </SafeAreaView>
        </View>
    );
}
