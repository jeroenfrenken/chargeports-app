import React from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
// @ts-ignore
import MenuBarIcon from "../../../assets/icons/MenuIcon.svg";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../RootStack';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import NormalInput from '../../../ui/components/NormalInput';

type Props = StackScreenProps<RootStackParamList, 'Map'>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

const MenuButton = styled.TouchableOpacity<{ color?: string }>`
  background: ${props => props.color || props.theme.colors.primary};
  padding: 10px;

  border-radius: 10px;
  margin-right: 10px;
  margin-top: 18px;

  width: 40px;
  height: 42px
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}/>
            <SafeAreaView
                style={{
                    flex: 1,
                    top: 0,
                    height: 150,
                    width: '90%',
                    position: 'absolute',
                    alignItems: 'top',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}
            >
                <MenuButton
                    onPress={() => navigation.openDrawer()}
                >
                    <MenuBarIcon />
                </MenuButton>
                <NormalInput
                    placeholder="Voer een locatie in"
                    returnKeyType="done"
                    style={{ marginTop: 10 }}
                    autoCapitalize="none"
                />
            </SafeAreaView>
        </View>
    );
}
