import React from 'react';
import { useStoreState } from './src/store/hooks';
import store from './src/store/model';
import { StoreProvider } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultTheme from './src/ui/theme/DefaultTheme';
import LoginScreen from './src/views/authentication/screens/LoginScreen';
import RegisterScreen from './src/views/authentication/screens/RegisterScreen';
import MapScreen from './src/views/map/screens/MapScreen';

const Stack = createStackNavigator();

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
                    name="Map"
                    options={{
                        headerShown: false
                    }}
                    component={MapScreen}
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
