/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import commonStyles from './CommonStyles';

const ToggleContainer = ({ text, imageSource1, imageSource2, onToggle }) => {
    const [isImageVisible, setIsImageVisible] = useState(false);

    const toggleImage = () => {
        const newVisibility = !isImageVisible;
        setIsImageVisible(newVisibility);
        onToggle(text, newVisibility);
    };

    return (
        <TouchableOpacity onPress={toggleImage} style={styles.container}>
            <Text style={commonStyles.headerText3BL}>{text}</Text>
            <Image
                source={isImageVisible ? imageSource2 : imageSource1}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        //borderBottomWidth: 1,
        borderBottomColor: '#979797',
    },
    text: {
        color: '#000',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Mukta-Regular' 
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});

export default ToggleContainer;