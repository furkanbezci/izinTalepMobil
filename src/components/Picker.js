import React, { useState } from 'react'
import { View, Button, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormButton } from './FormButton';
import { colors } from '../theme';

export const Picker = ({ pickerTitle }) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [date2, setDate2] = useState(new Date(1598051730000));

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        // setShow(Platform.OS === 'ios');
        setDate2(currentDate);
        setShow(false)
    };
    debugger;
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    return (
        <View>
            <View>
                <FormButton OnPressButton={showDatepicker} buttonTitle={pickerTitle} buttonColor={colors.none} />
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
}

