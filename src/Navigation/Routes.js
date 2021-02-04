import React, { useState, useEffect } from 'react'
import { RootStack, AuthStack } from './index';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

export const Routes = () => {
    var [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        callUser = async () => {
            //PERSONEL KODU BİLGİSİ TÜM KAYITLI KİŞİLERDE BULUNMAKTA
            //eger personel kodu null ise bu kişi kayıtlın degildir logine yönlendirme yapılır
            var userInfo = await AsyncStorage.getItem('personelKodu');
            setUser(userInfo)
            setLoading(false)
        }
        callUser();

    }, []);


    return (
        <NavigationContainer>
            {loading ? <ActivityIndicator /> :
                user != null ? < RootStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
