import React, { useState } from 'react'
import { Block, FormButton, Input } from '../components'
import { asyncSaveOperations } from '../utils'
import { useNavigation } from '@react-navigation/native'
import { sendFetch } from '../services'

export const SignUpScreen = () => {

    const [name, setName] = useState('admin')
    const [surname, setSurname] = useState('adin')
    const [email, setEmail] = useState('a@a')
    const [password, setPassword] = useState('1')
    const navigation = useNavigation();

    const signUpFunc = async () => {
        try {
            var result = await sendFetch('/Yonetim/PersonelKayitOl', JSON.stringify({
                adi: name,
                soyadi: surname,
                eposta: email,
                sifre: password,
                yoneticiKodu: null
            }));
            //gelen bilgiler asyncstorage a  kayıt ediliyor
            await asyncSaveOperations(result);
            //başarılı kayıttan sonra diger sayfaya yönlendirme işlemi yapılıyor
            navigation.reset({
                index: 0,
                routes: [{ name: 'AdminScreen' }],
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <Block middle >
            <Input placeholder={'Ad '} value={name} onChangeText={(name) => setName(name)} />
            <Input placeholder={'Soyad '} value={surname} onChangeText={(surname) => setSurname(surname)} />
            <Input placeholder={'Email '} value={email} onChangeText={(email) => setEmail(email)} />
            <Input placeholder={'Şifre '} value={password} onChangeText={(password) => setPassword(password)} />
            <Block center flex={false} >
                <FormButton buttonTitle='Kaydol' OnPressButton={() => signUpFunc()} />
            </Block>
        </Block>
    )
}

