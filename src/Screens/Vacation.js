import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { Block, FormButton, Input, VacationListCard } from '../components'
import { sendFetch } from '../services'
import { colors } from '../theme'

export const Vacation = () => {

    const [redSebebi, setRedSebebi] = useState(null)
    const [izinListesi, setIzinListesi] = useState({})
    const [rowindex, setRowindex] = useState(-1)
    const [item, setItem] = useState(null)

    useEffect(() => {
        verileriGetir()
    }, [])

    const verileriGetir = async () => {
        var result = await sendFetch('/Yonetim/OnayListesi', JSON.stringify({}))
        setIzinListesi(result)
    }

    const reddetFunc = async (item, i) => {
        setItem(item);
        setRowindex(i)
    }

    const onayla = async (item) => {
        item.p.yoneticiKodu = parseInt(await AsyncStorage.getItem("personelKodu"));
        item.o.durum = true;
        await kaydet(item.o)
    }

    const redetKaydet = async (item) => {
        if (redSebebi == null || redSebebi.length == 0)
            return alert('Lütfen red sebebi giriniz!')
        var item = item;
        item.yoneticiKodu = parseInt(await AsyncStorage.getItem("personelKodu"));
        item.durum = false;
        item.redSebebi = redSebebi;
        await kaydet(item)
        setRedSebebi('');
        setRowindex(-1)
    }

    const kaydet = async (item) => {
        await sendFetch('/Yonetim/DurumGuncelle', JSON.stringify(item))
        await verileriGetir()
    }

    const renderListItems = ({ item, index }) => {
        return (
            <View key={index}>
                <VacationListCard val={item} index={index} />
                <View>
                    {rowindex == -1 && item.o.durum == null &&
                        <Block row center spaceEvenly>
                            <FormButton buttonColor={colors.green} OnPressButton={() => onayla(item)} buttonTitle='Onayla' FBwidth='35%' />
                            <FormButton buttonColor={colors.red} OnPressButton={() => reddetFunc(item.o, index)} buttonTitle='Reddet' FBwidth='35%' />
                        </Block >
                    }
                </View>
                {rowindex == index &&
                    <Block  >
                        <Input maxLength={100} onChangeText={(sebep) => setRedSebebi(sebep)} value={redSebebi} placeholder='Red Sebebi Giriniz...' />
                        <Block row center spaceEvenly>
                            <FormButton FBwidth={'35%'} OnPressButton={() => redetKaydet(item.o)} buttonTitle='Kaydet' />
                            <FormButton FBwidth={'35%'} OnPressButton={() => setRowindex(-1)} buttonTitle='İptal' buttonColor={colors.gray2} />
                        </Block>

                    </Block>}
            </View>
        );
    };

    const { title } = styles;
    return (
        <>
            <Text style={title}>İZİN TALEP LİSTESİ</Text>
            <FlatList
                data={izinListesi}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderListItems}
            />
        </>
    )

}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        padding: 20,
        textAlign: 'center'
    }
})
