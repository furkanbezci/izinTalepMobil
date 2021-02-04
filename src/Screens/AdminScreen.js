import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Block, FormButton } from '../components'
import { colors } from '../theme'

export const AdminScreen = () => {
    clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }
    const navigation = useNavigation();
    return (
        <Block middle center >
            <FormButton buttonTitle={'Yönetici İzin Listesi'} OnPressButton={() => navigation.navigate('Vacation', { isPersonel: true })} />
            <FormButton buttonTitle={'Personel Ekle'} OnPressButton={() => navigation.navigate('AddPersonelScreen', { isPersonel: false })} buttonColor={colors.accent} />
            <FormButton buttonTitle={'Çıkış'}
                OnPressButton={() => {
                    clearAsyncStorage();
                    navigation.navigate('HomeScreen');
                }}
                buttonColor={colors.gray2}
            />
        </Block>
    )
}



