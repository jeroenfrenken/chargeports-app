import React from 'react';
import { Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-navigation';
import { RootStackParamList } from '../../../../RootStack';
import { useStoreActions } from '../../../store/hooks';

type Props = StackScreenProps<RootStackParamList, 'Map'>;

export default ({ navigation }: Props) => {
    const logoutAction = useStoreActions(state => state.auth.logout);

    return (
        <SafeAreaView>
            <Text>Map Screen!</Text>
            <Text
                onPress={() => logoutAction}
                style={{
                    marginTop: 20,
                    textAlign: 'center'
                }}
            >LOGOUT</Text>
        </SafeAreaView>
    );
}
