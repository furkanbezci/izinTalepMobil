import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignUpScreen, HomeScreen, AdminScreen, PersonelScreen, AddPersonelScreen, Vacation } from '../Screens';
import { } from '../Screens/AddPersonelScreen';
import { } from '../Screens/Vacation';



const Stack = createStackNavigator();

export const AuthStack = () => {
    return (

        <Stack.Navigator headerMode='none' initialRouteName={'HomeScreen'}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='AdminScreen' component={AdminScreen} />
            <Stack.Screen name='PersonelScreen' component={PersonelScreen} />
            <Stack.Screen name='AddPersonelScreen' component={AddPersonelScreen} />
            <Stack.Screen name='Vacation' component={Vacation} />


        </Stack.Navigator>
    )
}

