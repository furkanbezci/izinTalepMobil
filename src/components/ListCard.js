import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from '.';

export const ListCard = ({ val, index }) => {
    const { card, } = styles;

    return (
        <Card key={index} style={card}>
            <Text>İzin Başlangıç Tarihi : {val.izinBaslangicTarihi.split("T")[0]}</Text>
            <Text>İzin Bitiş Tarihi          : {val.izinBitisTarihi.split("T")[0]}</Text>
            <Text>Durum                        : {val.durum == null ? "Bekliyor" : val.durum ? "Onaylandı" : "Red Edildi"}</Text>
            <Text>Red Sebebi                : {val.redSebebi}</Text>

        </Card>
    );
};
const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        height: 110,
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