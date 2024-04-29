/* eslint-disable prettier/prettier */
import React from 'react';
import {
    Modal,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from './CommonStyles';

const { width, height } = Dimensions.get('window');

const CustomDropCard = ({ visible, onClose, onContinue, onSkip }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1}
                onPress={onClose}>
                <TouchableOpacity style={styles.popupContainer} activeOpacity={1}
                    onPress={() => { }}>
                    <Image
                        source={require('../../assets/img/LoginOTP.png')}
                        style={styles.image}
                    />
                    <Text style={[commonStyles.headerText11BL, { marginVertical: height * 0.01, }]}>Drop a Card</Text>
                    <Text style={[commonStyles.headerText6BL, { marginBottom: height * 0.05 }]}>
                        Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                    </Text>
                    <Text style={[commonStyles.headerText4BL, { textAlign: 'center', }]}>Are you sure you want to send drop a card?</Text>
                    <View style={{ height: 1, backgroundColor: '#000', marginBottom: 10 }} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8} onPress={onSkip} style={[commonStyles.button1H, { marginRight: height * 0.015, width: width * 0.3, height: 40, }]}>
                            <Text style={commonStyles.buttonText1H}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onContinue}
                            activeOpacity={0.8}
                            style={[commonStyles.buttonH, { marginLeft: height * 0.015, width: width * 0.3, height: 40, }]}>
                            <Text style={commonStyles.buttonTextH}>Send</Text>
                        </TouchableOpacity>
                        
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

CustomDropCard.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    popupContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.9,
        //height: height * 0.43
    },
    image: {
        width: width * 0.85,
        height: height * 0.34,
        marginBottom: height * 0.015,
    },
    buttonContainer: {
        justifyContent: 'center',
        //justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: height * 0.01
    },
    continueButton: {
        backgroundColor: '#289EF5',
        //padding: 10,
        borderRadius: 999,
        width: width * 0.45,
        marginVertical: 10,
        height: height * 0.055,
        justifyContent: 'center',
        alignItems: 'center',
    },
    skipButton: {
        backgroundColor: '#fff',
        borderColor: '#289EF5',
        //padding: 10,
        borderWidth: 1,
        borderRadius: 999,
        width: width * 0.45,
        height: height * 0.055,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default CustomDropCard;
