import React, { useState } from 'react'
import { Block, FormButton, Input } from '../components'
import { sendFetch } from '../services'
import { useNavigation } from '@react-navigation/native';
import { asyncSaveOperations } from '../utils'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { colors } from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'

export const LoginScreen = ({ route }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    // Params içerisinde isPErsonel diye tanımlı bir key oldugu için route.params.isPersonel olarak yazmamıza gerek yok 
    //const={isPersone}=route.params dersek direkt isPersonel verisi eşitlenecektir
    //Alternafif olarak     const { tip } = route.params.isPersonel;
    const { isPersonel } = route.params;
    const loginFunc = async () => {
        try {
            var result = await sendFetch('/Yonetim/PersonelGirisYap', JSON.stringify({
                eposta: email,
                sifre: password
            }));
            //gelen bilgiler  kaydediliyor
            await asyncSaveOperations(result)
            debugger;
            if (!isPersonel) {
                navigation.navigate('AdminScreen')
            } if (isPersonel)
                navigation.navigate('PersonelScreen')
        }
        catch (error) {
            console.log(error)
        }
    }
    const { label, view, iconStyle, btnAdmin } = styles;

    return (
        <Block middle center  >
            { isPersonel ?
                <View style={view}>
                    <Ionicons name='person' style={iconStyle} color={colors.black} />
                    <Text style={label}>Personel Giriş Ekranı</Text>
                </View>
                :
                <View style={[view, { borderColor: colors.primary }]}>
                    <Fontisto name='person' style={iconStyle} color={colors.black} />
                    <Text style={label}>Yönetici Giriş Ekranı</Text>
                </View>
            }

            <Input placeholder={'Email '} value={email} onChangeText={(email) => setEmail(email)} />
            <Input placeholder={'Şifre '} value={password} onChangeText={(password) => setPassword(password)} />
            <Block center flex={false} >
                <FormButton
                    buttonTitle='Giriş'
                    OnPressButton={() => loginFunc()}
                    FBwidth={Dimensions.get('window').width * 0.8}
                    buttonColor={isPersonel ? colors.accent : colors.primary} />
                {!isPersonel &&
                    <FormButton style={btnAdmin} buttonTitle='Kaydol' OnPressButton={() => navigation.navigate('SignUpScreen')}
                        FBwidth={Dimensions.get('window').width * 0.8}
                    />
                }
            </Block>
        </Block>
    )
}
const styles = StyleSheet.create({
    wrapper: { backgroundColor: colors.gray3 },
    label: { fontSize: 22, alignItems: 'center', justifyContent: 'center' },
    view: {
        flexDirection: 'column',
        height: 140,
        width: '70%',
        borderRadius: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderColor: colors.accent,
        borderWidth: 1,
        marginBottom: 40
    },
    iconStyle: { height: 40, fontSize: 40, marginLeft: 6 },
    btnAdmin: { marginTop: 10, }
})

