import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from '.';

export const VacationListCard = ({ val, index }) => {
    const { card } = styles;

    return (
        <Card key={index} style={card}>
            <Text>#{val.o.id}</Text>
            <Text>Personel: {val.p.adi} {val.p.soyadi}</Text>
            <Text>İzin Talep Tarihi: {val.o.islemTarihi.split('T')[0]}</Text>
            <Text>İzin Başlangıç Tarihi: {val.o.izinBaslangicTarihi.split("T")[0]}</Text>
            <Text>İzin Bitiş Tarihi: {val.o.izinBitisTarihi.split('T')[0]}</Text>
            <Text>Güncel İzin Gün Sayısı: {val.o.guncelIzinGunSayisi}</Text>
            <Text>Durum: {val.o.durum == null ? "Bekliyor" : val.o.durum ? "Onaylandı" : "Red Edildi"}</Text>
            <Text>Red Sebebi: {val.o.redSebebi}</Text>
        </Card>
    );
};
const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 10,
        height: 180,
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

});