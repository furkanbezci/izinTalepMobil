import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors } from '../theme'

export const Input = ({ placeholder, value, onChangeText, maxLength }) => {
    const { wrapper } = styles
    return (
        <View style={wrapper}>
            <TextInput autoCapitalize={'none'} placeholder={placeholder} value={value} onChangeText={onChangeText} maxLength={maxLength} />
        </View>

    )
}

const styles = StyleSheet.create({
    wrapper: {
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 18,
        margin: 10,
        width: '90%'
    }
})


