import React from 'react'
import { Block } from '../components'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../theme';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export const HomeScreen = () => {

    const navigation = useNavigation();
    const { touchable, label, view, personIcon, touchableAdmin, adminIcon } = styles;
    return (
        <Block middle center  >
            <TouchableOpacity style={touchable} onPress={() => navigation.navigate('LoginScreen', { isPersonel: true })}>
                <View style={view}>
                    <Ionicons name='person' style={personIcon} color={colors.black} />
                    <Text style={label}>Personel Girişi</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={touchableAdmin} onPress={() => navigation.navigate('LoginScreen',
                { isPersonel: false })}>
                <View style={[view, { borderColor: colors.primary }]}>
                    <Fontisto name='person' style={adminIcon} />
                    <Text style={label}>Yönetici Girişi</Text>
                </View>
            </TouchableOpacity>

        </Block>
    )
}

const styles = StyleSheet.create({
    touchable: { alignItems: 'center' },
    label: { fontSize: 22 },
    view: {
        flexDirection: 'row',
        height: 120,
        width: '90%',
        borderRadius: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: colors.accent,
        borderWidth: 1
    },
    personIcon: {
        height: 40,
        fontSize: 40,
        marginLeft: 6
    },
    touchableAdmin: { alignItems: 'center', top: 20 },
    adminIcon: {
        height: 40,
        fontSize: 40,
        marginLeft: 10
    }
})
