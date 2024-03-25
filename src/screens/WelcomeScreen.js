/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Image, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, Animated, PanResponder, Alert, Modal, PixelRatio } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import thumbIcon from '../../assets/img/arrow-left.png';
import commonStyles from '../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const WelcomeScreen = ({ navigation }) => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const CustomPopup = ({ isVisible, imageSource, text, onClose, onButton1Press, onButton2Press }) => {
        return (
            <Modal visible={isVisible} transparent animationType="slide">
                <View style={styles.popupContainer}>
                    {/* Blurred Background */}
                    <View style={styles.blurredBackground} />

                    {/* White Popup Container */}
                    <View style={styles.popupContent}>
                        <Image source={imageSource} style={styles.image1} />
                        <Text style={styles.popupText}>{text}</Text>
                        <View style={styles.buttonContainer}>
                            {/* Buttons */}
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={{ color: 'black' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const handleSwipeSuccess = () => {
        navigation.navigate('HomeScreen', { fromWelcomeScreen: true });
        console.log('ProfileCompletion1')
        // Show the custom popup when the swipe is successful
        //setIsPopupVisible(true);
    };

    const closePopup = () => {
        // Close the custom popup
        setIsPopupVisible(false);
    };


    return (
        <View style={styles.container}>
            <Text style={[commonStyles.headerText1BL, {
                top: height > 650 ? height * 0.12 : height * 0.1,
                position: 'absolute',
            }]}>Welcome To</Text>
            <Image source={require('../../assets/img/DenXGenLogo.png')} style={styles.image} />
            <Image source={require('../../assets/img/GroupWelcome.png')} style={styles.imageR} />
            <Text style={[commonStyles.headerText4B, {
                paddingHorizontal:8, textAlign: 'center', top: height > 650 ? height * 0.55 : height * 0.5,
                position: 'absolute'
            }]}>2000+ Users like our care systems</Text>
            <Text style={[commonStyles.headerText2BL, {
                paddingHorizontal: 8, textAlign: 'center', top: height > 650 ? height * 0.65 : height * 0.58,
                position: 'absolute'
            }]}>We provide an equally comfortable experience of relaxation for all our young and adult customers visiting a dentist !</Text>

            {/* <Text style={styles.title}>WELCOME TO{"\n"}DEN
                    <Text style={{ color: '#289EF5' }}>X</Text>
                    GEN ™</Text>

                <Text style={styles.subtitle}>We provide an equally comfortable experience of relaxation for all our young and adult customers visiting a dentist !</Text>
                <View
                    style={styles.resendCode}
                //onPress={handleVerify}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={require('../../assets/img/WelcomeS.png')} style={styles.imageR} />
                        <Text style={styles.resendText}>2000+ Users like our care systems</Text>                     
                    </View>

                </View> */}

            <View style={{ position: 'absolute', bottom: height > 650 ? height * 0.1 : height * 0.05, marginTop: 50 }}>
                <SwipeButton
                    style={styles.slideButton}
                    disabled={false}
                    swipeSuccessThreshold={70}
                    height={50}
                    width={257}
                    title="Get Started"
                    titleColor='#FEFCFC'
                    //titleFontSize={24}
                    titleStyles={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: 30,
                        fontSize: responsiveFontSize(16),
                        fontFamily: 'DMSans-Bold',
                        lineHeight: 28
                    }}
                    containerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                    thumbIconImageSource={thumbIcon}
                    thumbIconStyles={{ borderRadius: 36 }}
                    onSwipeSuccess={handleSwipeSuccess}
                    thumbIconBackgroundColor='#FEFCFC'
                    thumbIconBorderColor='#FEFCFC'
                    railBorderColor='rgba(255, 255, 255, 0.5)'
                    railBackgroundColor='#289EF5'
                    railFillBackgroundColor='rgba(255, 255, 255, 0.7)'
                />

            </View>


            <View style={{ height: 50, backgroundColor: '#289EF5' }}>
                <CustomPopup
                    isVisible={isPopupVisible}
                    imageSource={require('../../assets/img/OTPS.png')}
                    text="Success!"
                    onClose={closePopup}
                    onButton1Press={() => {
                        // Handle button 1 press
                        closePopup();
                    }}
                    onButton2Press={() => {
                        // Handle button 2 press
                        closePopup();
                    }}
                />
            </View>

            {/* <TouchableOpacity
                    style={styles.slideButton}
                    {...panResponder.panHandlers}
                >
                    <Animated.Image
                        source={require('../../assets/img/SlideButton.png')}
                        style={[styles.slideButtonImage, slideStyle]}
                    />
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity> */}

        </View>
    );
}

const styles = {
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Set the background to transparent
    },
    blurredBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity for the blur effect
    },
    popupContent: {
        backgroundColor: '#FEFCFC', // Set the popup background to white
        width: '80%', // Adjust the width as needed
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    image1: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    buttonC: {
        backgroundColor: '#289EF5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonTextC: {
        color: 'white',
        fontSize: 16,
    },
    popupText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: '#FEFCFC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    image: {
        width: width * 0.75,
        height: height * 0.12,
        marginBottom: height * 0.1,
        top: height > 650 ? height * 0.2 : height * 0.2,
        position: 'absolute'
        //marginTop: 20
    },
    imageBack: {
        width: 34,
        height: 34,
        marginBottom: 8,
    },
    title: {
        color: '#FEFCFC',
        fontSize: 24,
        fontFamily: 'Mukta-Bold',
        textAlign: 'center',
        lineHeight: 28,
        //marginBottom: 30,
        top: height * 0.15,
        position: 'absolute'
    },
    subtitle: {
        color: '#FEFCFC',
        fontSize: 17,
        fontFamily: 'Mukta-Regular',
        textAlign: 'center',
        lineHeight: 21,
        width: 331,
        marginTop: 17,
        marginBottom: 50,
        top: height * 0.65,
        position: 'absolute'
    },
    subtitle1: {
        color: '#121212',
        fontSize: 18,
        fontFamily: 'Mukta-Regular',
        lineHeight: 21,
        width: 283,
        textAlign: 'left',
    },
    resend: {
        color: '#3C3C43',
        fontSize: 14,
        fontFamily: 'Mukta-Regular',
        textAlign: 'center',
        lineHeight: 28,
    },
    resendText: {
        color: '#FEFCFC',
        fontSize: 20,
        fontFamily: 'Mukta-Bold',
        textAlign: 'center',
        lineHeight: 28,
        marginTop: 22,
        top: height * 0.58,
        position: 'absolute'
    },
    resendCode: {
        marginVertical: 38,
    },
    imageR: {
        width: undefined,
        height: height * 0.11,
        aspectRatio: 4/1.76, // Maintain aspect ratio
        position: 'absolute',
        top: height > 650 ? height * 0.4 : height * 0.35,
        // Add other styles as needed
    },


    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 29,
    },
    input: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        color: '#121212',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 28,
        marginHorizontal: 16,
        borderColor: '#121212',
    },
    button: {
        height: 50,
        width: 257,
        alignSelf: 'center',
        backgroundColor: "#289EF5",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    slideButton: {
        height: 50,
        width: 257,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: '#289EF5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 24,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        //marginLeft: 40, // Adjust the distance between text and image
    },
}
export default WelcomeScreen;