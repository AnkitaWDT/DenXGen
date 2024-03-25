/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Button, Dimensions } from 'react-native';
import commonStyles from './CommonStyles';
import { moderateScale } from 'react-native-size-matters';


const { width, height } = Dimensions.get('window');

const AlertPopup = ({ visible, onRequestClose, title, message, yesLabel, noLabel, onYesPress }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onRequestClose}
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.popupContainer}>
                    <Text style={[commonStyles.headerText4BL, {
                        marginBottom: height * 0.015,
                    }]}>{title}</Text>
                    <Text style={[commonStyles.headerText3BL, {
                        marginRight: width * 0.02, marginBottom: height * 0.025,
                    }]}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onRequestClose} style={[commonStyles.button2H, {
                            width: width * 0.3, height: 40,
                        }]}>
                            <Text style={[commonStyles.buttonText2H]}>{noLabel}</Text>
                        </TouchableOpacity>
                        <View style={{ marginRight: width * 0.015, }}></View> 
                        <TouchableOpacity onPress={onYesPress} style={[commonStyles.buttonH, {
                            width: width * 0.3, height: 40,
                        }]}>
                            <Text style={[commonStyles.buttonTextH]}>{yesLabel}</Text>
                        </TouchableOpacity>
                       
                       
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContainer: {
        backgroundColor: 'white',
        padding: 20,
        paddingVertical: height * 0.04,
        borderRadius: 10,
        //alignItems: 'center',
        width: width * 0.9,
        //height: height * 0.3
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
};

export default AlertPopup;
