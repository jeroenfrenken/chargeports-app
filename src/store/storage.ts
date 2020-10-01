import AsyncStorage from '@react-native-community/async-storage';

const storage = {
    async getItem(key: string) {
        return JSON.parse(await AsyncStorage.getItem(key) as string);
    },

    async setItem(
        key: string,
        data: any
    ) {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    },

    async removeItem(key: string) {
        await AsyncStorage.removeItem(key);
    }
};

export default storage;
