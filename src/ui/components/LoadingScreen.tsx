import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { defaultTheme } from '../theme/DefaultTheme';
import LottieView from 'lottie-react-native';


const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/lottie/charger_loading.json')}
                autoPlay
                loop
            />
        </View>
    );
}
