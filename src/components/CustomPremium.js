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

const CustomPremium = ({ visible, onClose, onContinue, onSkip, mainText }) => {

    const bulletPoints = [
        "500+ Connections",
        "200+ Drop A Card",
        "Multiple Locations",
        "Multiple Data"
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={onClose}>
                <TouchableOpacity style={styles.popupContainer} activeOpacity={1} onPress={() => { }}>
                    <Text style={[commonStyles.headerText11BL, { marginVertical: height * 0.01, textAlign: 'center'}]}>{mainText}</Text>
                    <Image
                        source={require('../../assets/img/DropACard.png')}
                        style={styles.image}
                    />
                    <Text style={[commonStyles.headerText1BL, { marginVertical: height * 0.01, textAlign: 'center' }]}>Upgrade Premium</Text>
                    <Text style={[commonStyles.headerText6BL, { color: '#979797', textAlign: 'center' }]}>Enjoy a comfortable experience!</Text>
                    {/* <Text style={[commonStyles.headerText6BL, { marginBottom: height * 0.01, }]}>
                        Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                    </Text> */}
                    <View style={styles.bulletPointsContainer}>
                        <Text style={[commonStyles.headerText11BL, { marginVertical: height * 0.01, }]}>What will you get?</Text>
                        {bulletPoints.map((point, index) => (
                            <View style={styles.bulletPointItem} key={index}>
                                <Text style={styles.bulletPoint}>•</Text>
                                <Text style={commonStyles.headerText6BL}>{point}</Text>
                            </View>
                        ))}
                    </View>
                    {/* <Text style={[commonStyles.headerText4BL, { textAlign: 'center', }]}>Are you sure you want to send drop a card?</Text> */}
                    {/* <View style={{ height: 1, backgroundColor: '#000', marginBottom: 10 }} /> */}
                    <TouchableOpacity
                        style={[commonStyles.button, { backgroundColor: '#FFD700'}]}
                        activeOpacity={0.8}
                        onPress={onContinue}
                    >
                        <Text style={commonStyles.buttonText}>Get Premium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[commonStyles.button, {}]}
                        activeOpacity={0.8}
                    >
                        <Text style={commonStyles.buttonText}>Get Premium</Text>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../../assets/img/Prime.png')} // Replace with the actual path to your crown icon
                                style={styles.icon}
                            />
                        </View>
                    </TouchableOpacity>
{/* 
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

                    </View> */}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

CustomPremium.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onContinue: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
    mainText: PropTypes.string.isRequired, // New prop for main text
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
        //alignItems: 'center',
        width: width * 0.9,
        //height: height * 0.43
    },
    image: {
        width: width * 0.85,
        height: height * 0.34,
        marginBottom: height * 0.015,
        alignSelf: 'center'
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
    bulletPointsContainer: {
        marginTop: 10,
    },
    bulletPointItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    bulletPoint: {
        fontSize: 20,
        marginRight: 5,
        color: '#000', // Bullet point color
    },
    bulletPointText: {
        fontSize: 16,
        //flex: 1,
        color: '#000', // Text color
    },
    button: {
        position: 'relative', // Set the button position to relative
        backgroundColor: '#FFD700',
        paddingHorizontal: 16, // Add padding to ensure space around text and icon
        paddingVertical: 12,
        borderRadius: 8,
    },
    iconContainer: {
        position: 'absolute', // Set the icon container position to absolute
        top: -25, // Position the icon container at the top of the button
        right: -20, // Position the icon container at the right of the button
        //padding: 8, // Add padding to adjust the position of the icon
    },
    icon: {
        width: 50, // Adjust width and height according to your crown icon size
        height: 50,
    },


});

export default CustomPremium;
