import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { InlineResponse200 } from '../../../api';
import { ApiService } from '../../../service/ApiService';
import { useStoreActions } from '../../../store/hooks';
import NormalButton from '../../../ui/components/NormalButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';
import NormalInput from '../../../ui/components/NormalInput';
import AuthenticationContainer from '../components/AuthenticationContainer';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export default ({ navigation }: Props) => {
    const loginAction = useStoreActions(state => state.auth.authenticate);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        if (
            email.length > 1 &&
            password.length > 1
        ) {
            try {
                const res = await ApiService.wrap<InlineResponse200>(ApiService.default.authenticationLogin({
                    email,
                    password
                }));

                console.log('Hier Kwam ik 2');
                console.log(res);

                if ( res.data.token !== undefined ) {
                    loginAction(res.data.token);
                }
            } catch (e) {
                console.log('Hier Kwam ik');
                console.log(e);
                Alert.alert('Failed', 'Credentials not valid');
            }
        } else {
            console.log('Hier Kwam ik 3');
            Alert.alert('Failed', 'Credentials not valid');
        }
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
                onPress={() => login()}
                style={{ marginTop: 30 }}
                text={'Login'}/>
            <Text
                onPress={() => navigation.navigate('Register')}
                style={{
                    marginTop: 20,
                    textAlign: 'center'
                }}
            >or register here</Text>
        </AuthenticationContainer>
    );
}
