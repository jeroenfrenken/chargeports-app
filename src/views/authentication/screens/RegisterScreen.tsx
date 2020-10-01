import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { RootStackParamList } from '../../../../RootStack';
import NormalButton from '../../../ui/components/NormalButton';
import NormalInput from '../../../ui/components/NormalInput';
import AuthenticationContainer from '../components/AuthenticationContainer';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

export default ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function register() {

    }

    return (
        <AuthenticationContainer>
            <NormalInput placeholder="Email"
                         returnKeyType="next"
                         autoCompleteType="name"
                         textContentType="name"
                         style={{ marginTop: 10 }}
                         autoCapitalize="none"
                         value={email}
                         onChangeText={(value) => setEmail(value)}/>
            <NormalInput placeholder="Wachtwoord"
                         returnKeyType="done"
                         secureTextEntry
                         autoCompleteType="password"
                         autoCapitalize="none"
                         textContentType="password"
                         style={{ marginTop: 10 }}
                         value={password}
                         onChangeText={(value) => setPassword(value)}/>
            <NormalButton
                onPress={() => register()}
                style={{ marginTop: 30 }}
                text={'Register'}/>
            <Text
                onPress={() => navigation.navigate('Login')}
                style={{
                    marginTop: 20,
                    textAlign: 'center'
                }}
            >or login here</Text>
        </AuthenticationContainer>
    );
}
