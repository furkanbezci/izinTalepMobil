import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Block, FormButton, ListCard, Picker } from '../components'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendFetch } from '../services';
import { colors } from '../theme';
import IonIcons from 'react-native-vector-icons/Ionicons'

export const PersonelScreen = ({ navigation }) => {
    const [isIzinBasVisible, setIsIzinBasVisibility] = useState(false);
    const [isIzinBitisVisible, setIsIzinBitVisibility] = useState(false);
    const [kalanIzin, setKalanIzin] = useState(null)
    const [izinListesi, setIzinListesi] = useState([])
    const [basarili, setBasarili] = useState(null)
    const [izinBas, setIzinBas] = useState(null)
    const [izinBit, setIzinBit] = useState(null)
    const [hesapKalan, setHesapKalan] = useState(null)

    useEffect(() => {
        verileriGetir = async () => {
            var result = await sendFetch('/Yonetim/PersonelIzinListesi', JSON.stringify({
                personelKodu: await AsyncStorage.getItem("personelKodu")
            }))
            setIzinListesi(result);
            var kalan = await AsyncStorage.getItem("kalanIzinGunSayisi")
            setKalanIzin(kalan)
        }
        verileriGetir();


    }, [])

    const hideIzinBasDP = () => {
        setIsIzinBasVisibility(false);
    };
    const hideIzinBitDP = () => {
        setIsIzinBitVisibility(false);
    };

    const handleIzinBasConfirm = (date) => {
        setIzinBas(date);
        hideIzinBasDP();
    };

    const handleIzinBitConfirm = async (date2) => {
        var fark = calcBusinessDays(new Date(izinBas), new Date(date2));
        var kalan = parseInt(await AsyncStorage.getItem("kalanIzinGunSayisi"));
        fark = kalan - fark;
        setHesapKalan(fark);
        setIzinBit(date2)
        hideIzinBitDP();
    };


    const kaydet = async () => {
        if (izinBas == null && izinBit == null)
            return alert('Lütfen başlangıç ve bitiş tarihlerinin seçiniz!')
        // url e bu bilgileri post et json formatında
        var fark = calcBusinessDays(new Date(izinBas), new Date(izinBit));
        fark = parseInt(await AsyncStorage.getItem("kalanIzinGunSayisi")) - fark;
        setKalanIzin(fark);

        if (kalanIzin < 0) return

        var res = await sendFetch('/Yonetim/PersonelIzinTalep', JSON.stringify({
            personelKodu: await AsyncStorage.getItem("personelKodu"),
            yoneticiKodu: await AsyncStorage.getItem("yoneticiKodu"),
            durum: null,
            izinBaslangicTarihi: izinBas,
            izinBitisTarihi: izinBit,
        }))
        if (res !== undefined)
            alert('İzin Talebi Başarılı')
        await verileriGetir()
        setIzinBas(null)
        setIzinBit(null)
        setBasarili(true)
    }

    const calcBusinessDays = (dDate1, dDate2) => { // input given as Date objects
        if (dDate1 == "" || dDate2 == "") return
        var iWeeks, iDateDiff, iAdjust = 0;
        if (dDate2 < dDate1) return -1; // error code if dates transposed
        var iWeekday1 = dDate1.getDay(); // day of week
        var iWeekday2 = dDate2.getDay();
        iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
        iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
        if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
        iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
        iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

        // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

        if (iWeekday1 < iWeekday2) { //Equal to makes it reduce 5 days
            iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
        } else {
            iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
        }

        iDateDiff -= iAdjust // take into account both days on weekend

        return (iDateDiff + 1); // add 1 because dates are inclusive
    }

    const renderListItems = ({ item, index }) => {
        return (
            <ListCard val={item} index={index} />
        );
    };
    clearAsyncStorage = async () => {
        AsyncStorage.clear();
    }
    const { exitWrapper, exitTouch, exitText, title, timeText, selectedTime, timeWrapper, izinWrapper, listBlock } = styles;
    return (
        <>
            <Block flex={false} style={exitWrapper}>
                <TouchableOpacity onPress={() => {
                    clearAsyncStorage();
                    navigation.navigate('HomeScreen', { isPersonel: true });
                }}
                    style={exitTouch} >
                    <Text style={exitText}>Çıkış</Text>
                    <IonIcons name='exit-outline' size={30} color={colors.accent} />
                </TouchableOpacity>
            </Block>

            <Block middle>
                {kalanIzin != null && <Text style={title}>Kalan İzin Gün {hesapKalan}</Text>}

                <Block row flex={false} style={timeWrapper} >
                    <TouchableOpacity onPress={() => setIsIzinBasVisibility(true)} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <IonIcons name="calendar" size={20} />
                        <Text style={timeText}>Başlangıç Günü Seç</Text>
                    </TouchableOpacity>
                    {izinBas != null && <Text style={selectedTime}> {izinBas.toISOString().split('T')[0]}</Text>}
                </Block>
                <Block row flex={false} style={timeWrapper} >
                    <TouchableOpacity onPress={() => setIsIzinBitVisibility(true)} style={{ flexDirection: 'row', justifyContent: 'center' }} >
                        <IonIcons name="calendar" size={20} />
                        <Text style={timeText}>Bitiş Günü Seç</Text>
                    </TouchableOpacity>
                    {izinBit != null && <Text style={selectedTime}> {izinBit.toISOString().split('T')[0]}</Text>}
                </Block>

                <DateTimePickerModal
                    isVisible={isIzinBasVisible}
                    mode="date"
                    onConfirm={handleIzinBasConfirm}
                    onCancel={hideIzinBasDP}
                    minimumDate={new Date()}
                    maximumDate={izinBit}
                />
                <DateTimePickerModal
                    isVisible={isIzinBitisVisible}
                    mode="date"
                    onConfirm={handleIzinBitConfirm}
                    onCancel={hideIzinBitDP}
                    minimumDate={izinBas}
                />
                <Block flex={false} center  >
                    <FormButton OnPressButton={kaydet} buttonTitle='İzin Talep Et' FBwidth={'60%'} buttonColor={colors.gray3} />
                </Block>

                <Block center style={izinWrapper}>
                    <Text style={title}>İZİN LİSTESİ</Text>
                    <Block style={listBlock}>
                        <FlatList
                            data={izinListesi}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={renderListItems}
                            scrollEnabled={true}
                        />
                    </Block>
                </Block>
            </Block>
        </>

    )

}


const styles = StyleSheet.create({
    exitWrapper: { alignItems: 'flex-end', width: '100%', padding: 10 },
    exitTouch: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    exitText: { color: colors.accent, paddingRight: 5 },
    title: { fontSize: 20, padding: 20, textAlign: 'center' },
    timeText: { paddingLeft: 10, color: colors.primary },
    selectedTime: { left: 20, fontSize: 16 },
    timeWrapper: { padding: 20, borderColor: colors.gray2, borderWidth: 1, margin: 10, borderRadius: 5 },
    izinWrapper: { width: '100%' },
    listBlock: { width: '90%' }
})
