import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <StatusBar style={'auto'}/>
            <SafeAreaView>
                {children}
            </SafeAreaView>
        </>
    );
}
