import React from 'react';
import { Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';

type Props = StackScreenProps<RootStackParamList, 'Map'>;

export default ({ navigation }: Props) => {
    return (
        <Text>Map Screen!</Text>
    );
}
