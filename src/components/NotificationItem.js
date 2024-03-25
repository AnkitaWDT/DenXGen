/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import commonStyles from './CommonStyles';

const { width, height } = Dimensions.get('window');

const NotificationItem = ({ title, time, isRead }) => {
    return (
        <View style={[styles.container, { backgroundColor: isRead ? '#FEFCFC' : '#E8F8FF' }]}>
            <Text style={[commonStyles.headerText2BL, {marginBottom: height * 0.005}]}>{title}</Text>
            <View style={styles.timeContainer}>
                <Text style={commonStyles.headerText3G}>{time}</Text>
                {!isRead && (
                    <Image
                        source={require('../../assets/img/NotificationDot.png')} // Change this to your dot image source
                        style={styles.dotImage}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingVertical: 15,
        borderRadius: 8,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    time: {
        fontSize: 12,
        color: '#666',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dotImage: {
        width: 10,
        height: 10,
        //marginLeft: 5,
    },
});

export default NotificationItem;
