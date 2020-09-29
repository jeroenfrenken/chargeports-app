import React from 'react';
import NormalButton from '../../../ui/components/NormalButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';
import NormalInput from '../../../ui/components/NormalInput';
import AuthenticationContainer from '../components/AuthenticationContainer';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export default ({ navigation }: Props) => {

    return (
        <AuthenticationContainer>
            <NormalInput placeholder="Email"
                         returnKeyType="next"
                         autoCompleteType="name"
                         textContentType="name"
                         style={{ marginTop: 10 }}
                         autoCapitalize="none"/>
            <NormalInput placeholder="Wachtwoord"
                         returnKeyType="done"
                         secureTextEntry
                         autoCompleteType="password"
                         autoCapitalize="none"
                         textContentType="password"
                         style={{ marginTop: 10 }}/>
            <NormalButton
                onPress={() => navigation.navigate('Register')}
                style={{ marginTop: 30 }}
                text={'Registreren'}/>
        </AuthenticationContainer>
    );
}
