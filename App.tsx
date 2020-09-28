import React from 'react';
import store from './src/store/model';
import { StoreProvider } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/views/authentication/screens/LoginScreen';

const Stack = createStackNavigator();

const Navigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {children}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <Navigation>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Navigation>
    );
};

export default () => (
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>
)
