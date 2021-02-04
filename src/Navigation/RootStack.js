import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { AdminScreen, PersonelScreen, Vacation, AddPersonelScreen, HomeScreen, LoginScreen } from '../Screens'

const Stack = createStackNavigator();

export const RootStack = () => {

    var [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        callUser = async () => {
            //eger giriş yapan kişinin yönetici kodu yoksa bu kişi yöneticidir.Yönetici sayfasına yönlendirilir.
            //eger yönetici kodu varsa bu kişi personeldir. Personel sayfasına yönlendirtilir.
            var adminInfo = await AsyncStorage.getItem('yoneticiKodu');
            setAdmin(adminInfo)
            setLoading(false)
        }
        callUser();
    }, []);


    return (
        loading ? <ActivityIndicator color={'red'} /> :
            <Stack.Navigator headerMode='none' >
                {admin == null ?
                    <>
                        <Stack.Screen name='AdminScreen' component={AdminScreen} />
                        <Stack.Screen name='Vacation' component={Vacation} />
                        <Stack.Screen name='AddPersonelScreen' component={AddPersonelScreen} />
                        <Stack.Screen name='HomeScreen' component={HomeScreen} />
                        <Stack.Screen name='PersonelScreen' component={PersonelScreen} />
                    </>
                    :
                    <>
                        <Stack.Screen name='PersonelScreen' component={PersonelScreen} />
                        <Stack.Screen name='HomeScreen' component={HomeScreen} />
                        <Stack.Screen name='AdminScreen' component={AdminScreen} />

                    </>

                }
                <Stack.Screen name='LoginScreen' component={LoginScreen} />


            </Stack.Navigator>
    )

}

