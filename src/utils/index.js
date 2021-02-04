import AsyncStorage from '@react-native-async-storage/async-storage'

export const asyncSaveOperations = async (data) => {
    await AsyncStorage.setItem("adi", data.adi)
    await AsyncStorage.setItem("kalanIzinGunSayisi", data.kalanIzinGunSayisi.toString())
    await AsyncStorage.setItem("personelKodu", data.personelKodu.toString())
    await AsyncStorage.setItem("sifre", data.sifre)
    await AsyncStorage.setItem("eposta", data.eposta)
    await AsyncStorage.setItem("soyadi", data.soyadi)
    await AsyncStorage.setItem("yoneticiKodu", data.yoneticiKodu != null ? data.yoneticiKodu.toString() : '')
}