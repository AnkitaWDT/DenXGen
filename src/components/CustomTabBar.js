/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import TabBg from './TabBg';

const TabBarAdvancedButton = ({ bgColor, onPress }) => (
    <View style={styles.container} pointerEvents="box-none">
        <TabBg color='#fff' style={styles.background} />
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image
                source={require('../../assets/img/Vector.png')}
                resizeMode='contain'
                style={styles.buttonIcon} // Add this style
            />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 75,
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
        top: -26,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 27,
        backgroundColor: '#289EF5',
    },
    buttonIcon: {
        width: '60%', // Adjust the width as needed
        height: '60%', // Adjust the height as needed
    },
});

export default TabBarAdvancedButton;
