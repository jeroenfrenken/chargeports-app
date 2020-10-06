import React from 'react';
import { ApiService } from './src/service/ApiService';
import { useStoreState } from './src/store/hooks';
import store from './src/store/model';
import { StoreProvider } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultTheme from './src/ui/theme/DefaultTheme';
import AuthenticatedScreen from './src/views/authenticated/screens/AuthenticatedScreen';
import FilterScreen from './src/views/authenticated/screens/FilterScreen';
import LoginScreen from './src/views/authentication/screens/LoginScreen';
import RegisterScreen from './src/views/authentication/screens/RegisterScreen';

const Stack = createStackNavigator();

ApiService.setup();

const BaseNavigation = ({ children }: { children: React.ReactNode }) => {
    return (
        <DefaultTheme>
            <NavigationContainer>
                <Stack.Navigator>
                    {children}
                </Stack.Navigator>
            </NavigationContainer>
        </DefaultTheme>
    );
};

const App = () => {
    const isLoggedIn = useStoreState(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return (
            <BaseNavigation>
                <Stack.Screen
                    name="Login"
                    options={{
                        headerShown: false
                    }}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Register"
                    options={{
                        headerShown: false
                    }}
                    component={RegisterScreen}
                />
            </BaseNavigation>
        );
    } else {
        return (
            <BaseNavigation>
                <Stack.Screen
                    name="Authenticated"
                    options={{
                        headerShown: false
                    }}
                    component={AuthenticatedScreen}
                />
                <Stack.Screen
                    name="FilterScreen"
                    options={{
                        headerShown: false
                    }}
                    component={FilterScreen}
                />
            </BaseNavigation>
        );
    }
};

export default () => (
    <StoreProvider store={store}>
        <App/>
    </StoreProvider>
)
