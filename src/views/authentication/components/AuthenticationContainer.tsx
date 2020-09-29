import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthenticationContainer = styled.View`
  padding: 20px 20px;
`;

export default ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <StatusBar style={'dark'}/>
            <SafeAreaView>
                <AuthenticationContainer>
                    {children}
                </AuthenticationContainer>
            </SafeAreaView>
        </>
    );
}
