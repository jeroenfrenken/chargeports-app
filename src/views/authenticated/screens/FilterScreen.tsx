import * as React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { defaultTheme } from '../../../ui/theme/DefaultTheme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultTheme.colors.white,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default function FilterScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text>Filter screen</Text>
            </SafeAreaView>
        </View>
    );
}
