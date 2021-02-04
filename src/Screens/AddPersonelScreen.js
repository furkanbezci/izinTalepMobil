import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, FlatList, StyleSheet } from 'react-native'
import { sendFetch } from '../services';
import { Block, Card, FormButton, Input } from '../components';

export const AddPersonelScreen = () => {


    const [name, setName] = useState('a')
    const [surname, setSurname] = useState('a')
    const [email, setEmail] = useState('a@a')
    const [password, setPassword] = useState('a')
    const [personelList, setPersonelList] = useState([])

    useEffect(() => {

        // callDatas()
        getDatas()

    }, [])

    getDatas = async () => {
        var yoneticiKoduStr = await AsyncStorage.getItem("personelKodu");
        var yoneticiKodu = parseInt(yoneticiKoduStr)
        var result = await sendFetch('/Yonetim/PersonelListesi', JSON.stringify({
            yoneticiKodu
        }))

        setPersonelList(result);
    }

    const signUpPersonel = async () => {

        var kod = await AsyncStorage.getItem("personelKodu");
        try {
            await sendFetch('/Yonetim/PersonelKayitOl', JSON.stringify({

                adi: name,
                soyadi: surname,
                eposta: email,
                sifre: password,
                yoneticiKodu: kod

            }))
            setName('');
            await getDatas()
        }
        catch (error) {
            console.log(error)
        }
    }
    const renderListItems = ({ item, index }) => {
        return (
            <Card key={index} style={styles.card}>
                <Text style={styles.label}>Ad Soyad:{item.adi} {item.soyadi}</Text>
                <Text style={styles.label}>Eposta:{item.eposta}</Text>
            </Card>
        );
    };
    const { title, btnWrapper, izinWrapper, listBlock } = styles
    return (
        <Block block>
            <Text style={title}>PERSONEL EKLE</Text>
            <Block center middle flex={false} >
                <Input placeholder={'Ad '} value={name} onChangeText={(name) => setName(name)} />
                <Input placeholder={'Soyad '} value={surname} onChangeText={(surname) => setSurname(surname)} />
                <Input placeholder={'Email '} value={email} onChangeText={(email) => setEmail(email)} />
                <Input placeholder={'Şifre '} value={password} onChangeText={(password) => setPassword(password)} />

                <Block center style={btnWrapper} >
                    <FormButton buttonTitle='Kaydet' OnPressButton={() => signUpPersonel()} />
                </Block>

            </Block>
            <Block flex={false} center style={izinWrapper}>
                <Text style={title}>İZİN LİSTESİ</Text>
                <Block flex={false} style={listBlock}>
                    <FlatList
                        data={personelList}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={renderListItems}
                    />
                </Block>
            </Block>
        </Block>
    )
}

const styles = StyleSheet.create({
    title: { fontSize: 20, padding: 20, textAlign: 'center' },
    btnWrapper: { width: '100%' },
    izinWrapper: { width: '100%', top: 50 },
    listBlock: { width: '90%', height: '100%' },
    card: {
        padding: 10,
        borderRadius: 10,
        height: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        marginBottom: 10,
        padding: 10
    },
    label: {
        fontSize: 16
    }
})
