import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import { Alert, Keyboard, Text } from 'react-native';
import {RootStackParamList} from '../../../../RootStack';
import NormalButton from '../../../ui/components/NormalButton';
import NormalInput from '../../../ui/components/NormalInput';
import AuthenticationContainer from '../components/AuthenticationContainer';
import {ApiService} from "../../../service/ApiService";
import {InlineResponse200} from "../../../api";
import {useStoreActions} from "../../../store/hooks";

type Props = StackScreenProps<RootStackParamList, 'Register'>;

export default ({navigation}: Props) => {
    const registerAction = useStoreActions(state => state.auth.authenticate);
    const setIsLoading = useStoreActions(state => state.app.setIsLoading);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function register() {
        if (
            email.length > 1 &&
            password.length > 1
        ) {
            Keyboard.dismiss();
            setIsLoading(true);
            try {
                const res = await ApiService.wrap<InlineResponse200>(ApiService.default.authenticationRegister({
                    firstName,
                    lastName,
                    email,
                    password
                }));

                if (res.data.token !== undefined) {
                    registerAction(res.data.token);
                }
            } catch (e) {
                setIsLoading(false);
                Alert.alert('Failed', 'Failed to register');
            }
        } else {
            Alert.alert('Failed', 'Failed to register');
        }
    }

    return (
        <AuthenticationContainer>
            <NormalInput placeholder="First name"
                         returnKeyType="next"
                         style={{marginTop: 10}}
                         autoCapitalize="none"
                         value={firstName}
                         onChangeText={(value) => setFirstName(value)}/>
            <NormalInput placeholder="Last name"
                         returnKeyType="next"
                         style={{marginTop: 10}}
                         autoCapitalize="none"
                         value={lastName}
                         onChangeText={(value) => setLastName(value)}/>
            <NormalInput placeholder="Email"
                         returnKeyType="next"
                         autoCompleteType="email"
                         textContentType="emailAddress"
                         style={{marginTop: 10}}
                         autoCapitalize="none"
                         value={email}
                         onChangeText={(value) => setEmail(value)}/>
            <NormalInput placeholder="Wachtwoord"
                         returnKeyType="done"
                         secureTextEntry
                         autoCompleteType="password"
                         autoCapitalize="none"
                         textContentType="password"
                         style={{marginTop: 10}}
                         value={password}
                         onChangeText={(value) => setPassword(value)}/>
            <NormalButton
                onPress={() => register()}
                style={{marginTop: 30}}
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
