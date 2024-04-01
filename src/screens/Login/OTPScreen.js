/* eslint-disable prettier/prettier */
import React, { useRef, useEffect, useState } from 'react';
import { PixelRatio, View, Image, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, ToastAndroid } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../API/APIConfig';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const OTPScreen = ({ navigation, route }) => {

    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '']);

    const [inputValues, setInputValues] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);

    const [timer, setTimer] = useState(60); // Initial timer value
    const [showResendButton, setShowResendButton] = useState(false); // State to toggle between timer and resend button

    useEffect(() => {
        let intervalId;
        if (timer > 0) {
            // Start the timer countdown
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            // Timer expired, show resend button
            setShowResendButton(true);
        }

        // Clear the interval when component unmounts or timer reaches 0
        return () => clearInterval(intervalId);
    }, [timer]);


    const handleRegistration = async () => {
        navigation.navigate("OTPScreen");
    };


    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 5); // Limit the inputRefs array to a maximum of 4 elements
    }, []);

    const goback = () => {
        navigation.goBack();
    };
    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value !== '' && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };


    //const handleInputChange = (index, value) => {

    //         if (value === '') {
    //             if (index > 0) {
    //                 inputRefs.current[index - 1].focus();
    //             }
    //         } else {
    //             if (index < inputRefs.current.length - 1) {
    //                 inputRefs.current[index + 1].focus();
    //             }
    //         }
    //     };

    const handleInputDelete = (index, value) => {
        if (value === '' && index > 0) {
            const newInputValues = [...inputValues];
            newInputValues[index - 1] = '';
            setInputValues(newInputValues);
            inputRefs.current[index - 1].focus();
        }
    };



    // const handleInputDelete = (index) => {
    //     const newInputValues = [...inputValues];
    //     newInputValues[index] = '';
    //     setInputValues(newInputValues);
    // };

    const handleVerify = async () => {
        try {
            const enteredOTP = otp.join('');

            if (!enteredOTP) {
                console.log('Please enter OTP!');
                ToastAndroid.show('Please enter OTP!', ToastAndroid.SHORT);
                return;
            }

            // Retrieve password from AsyncStorage
            const password = await AsyncStorage.getItem('password');

            if (!password) {
                console.log('Password not found in AsyncStorage.');
                ToastAndroid.show('Password not found.', ToastAndroid.SHORT);
                return;
            }

            if (enteredOTP === password) {
                // Password matches OTP
                console.log('OTP Verified Successfully!');
                // Navigate to next screen
              
                ToastAndroid.show('OTP Verified Successfully!', ToastAndroid.SHORT);
                await AsyncStorage.setItem('userLoggedIn', 'true');
                navigation.navigate('Personalize');
            } else {
                // Invalid OTP
                console.log('Invalid OTP!');
                ToastAndroid.show('Invalid OTP!', ToastAndroid.SHORT);
            }

            // Reset OTP input fields
            setOtp(['', '', '', '', '']);
        } catch (error) {
            console.log('Error occurred:', error);
            ToastAndroid.show('Error occurred. Please try again.', ToastAndroid.SHORT);
        }
    };


    // const handleVerify = async () => {
    //     try {

    //         const endpoint = `${API_CONFIG.API_DOMAIN}${API_CONFIG.loginUrl}?phno=${encodeURIComponent(phoneNumber)}`;

    //         const response2 = await fetch(endpoint);
    //         const data = await response2.json();

    //         if (data.code === 1) {
    //             const correctOTP = data.data.password.toString();
    //             const enteredOTP = otp.join('');

    //             console.log(correctOTP);
    //             console.log(enteredOTP);

    //             if (enteredOTP === correctOTP) {
    //                 console.log('OTP Verified Successfully!');

    //                 await AsyncStorage.setItem('userLoggedIn', 'true');
    //                 await AsyncStorage.setItem('isregistered', data.data.isregistered.toString());
    //                 await AsyncStorage.setItem('status', data.data.status.toString());
    //                 await AsyncStorage.setItem('pr_id', String(data.data.pr_id));
    //                 const pr_id = await AsyncStorage.getItem('pr_id');
    //                 console.log(pr_id);

    //                 ToastAndroid.show('OTP Verified Successfully!', ToastAndroid.SHORT);

    //                 console.log("Status:", data.data.status);
    //                 console.log("IsRegistered:", data.data.isregistered);

    //                 if (parseInt(data.data.status) === 0 && parseInt(data.data.isregistered) === 0) {
    //                     navigation.replace('Personalize', { phoneNumber: phoneNumber });
    //                 } else if (parseInt(data.data.status) === 0 && parseInt(data.data.isregistered) === 1) {
    //                     navigation.replace('Personalize', { phoneNumber: phoneNumber });
    //                 } else if (parseInt(data.data.status) === 1 && parseInt(data.data.isregistered) === 0) {
    //                     navigation.replace('Personalize');
    //                 } else if (parseInt(data.data.status) === 1 && parseInt(data.data.isregistered) === 1) {
    //                     navigation.replace('HomeScreen');
    //                 } 
    //                 else {
    //                     console.log('WaitingScreen2');
    //                     navigation.replace('WaitingScreen', { phoneNumber: phoneNumber });
    //                 }
    //             } else {
    //                 console.log('Invalid OTP!');
    //                 ToastAndroid.show('Invalid OTP!', ToastAndroid.SHORT);
    //                 // Perform invalid OTP action
    //             }
    //         } else {
    //             console.log('Failed to retrieve OTP. Please try again.');
    //             ToastAndroid.show(
    //                 'Failed to retrieve OTP. Please try again.',
    //                 ToastAndroid.SHORT,
    //             );
    //             // Perform OTP retrieval failure action
    //         }

    //         setOtp(['', '', '', '', '']); // Reset OTP input fields
    //     } catch (error) {
    //         console.log('Error occurred:', error);
    //         // Perform error handling
    //     }
    // };


    const focusPreviousInput = index => {
        if (inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const focusNextInput = index => {
        if (inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (index, event) => {
        if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
            focusPreviousInput(index);
        } else if (event.nativeEvent.key !== 'Backspace' && otp[index] === '' && index < 4) {
            // If a digit is entered and the current input field is empty, move focus to the next input field
            focusNextInput(index);
        }
    };

    const handleEditNumber = () => {
        navigation.goBack(); // Navigate back to the LoginScreen
    };

    const renderInputs = () => {
        const inputs = [];

        for (let i = 0; i < 5; i++) {
            inputs.push(
                <TextInput
                    key={i}
                    style={[
                        styles.input,
                        {
                            backgroundColor: inputValues[i] !== '' ? '#FEFCFC' : '#FEFCFC',
                            borderColor: inputValues[i] !== '' ? 'rgba(40, 158, 245, 1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                    ]}
                    maxLength={1}
                    keyboardType="numeric"
                    onChangeText={text => {
                        const newOtp = [...otp];
                        newOtp[i] = text;
                        setOtp(newOtp);
                        if (text.length === 1) {
                            focusNextInput(i);
                        }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace') {
                            const value = inputValues[i] || '';
                            handleInputDelete(i, value);
                        }
                    }}
                    ref={(ref) => (inputRefs.current[i] = ref)}
                />,
            );
        }

        return inputs;
    };

    const handleResendCode = async () => {
        try {
            // Fetch the OTP again
            const endpoint = `${API_CONFIG.API_DOMAIN}${API_CONFIG.loginUrl}?phno=${encodeURIComponent(phoneNumber)}`;
            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.code === 1) {
                // Reset the timer to 00:59
                setTimer(60);
                setShowResendButton(false); // Hide the resend button
            } else {
                console.log('Failed to resend OTP. Please try again.');
                ToastAndroid.show(
                    'Failed to resend OTP. Please try again.',
                    ToastAndroid.SHORT,
                );
            }
        } catch (error) {
            console.log('Error occurred while resending OTP:', error);
            ToastAndroid.show(
                'Error occurred while resending OTP.',
                ToastAndroid.SHORT,
            );
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Blue container */}
                <View style={[styles.blueContainer, { height: moderateScale(height * 0.05) }]}>
                    {/* No content inside the blue container */}
                </View>
                <ScrollView style={[styles.whiteContainer, {  }]}>

                    <Image source={require('../../../assets/img/LoginOTP.png')} style={styles.headerImageBackground} />
                    <Text style={[commonStyles.headerText1BL, {
                        marginBottom: moderateScale(10),
                    }]}>
                        OTP Verification
                    </Text>
                    <Text style={[commonStyles.headerText3BL, {

                    }]}>Enter the verification code we just sent to your number +91 *******53.</Text>
                    {/* <View style={styles.otpContainer}>{renderInputs()}</View> */}
                    <View style={styles.inputContainer}>
                        {otp.map((value, index) => (
                            <TextInput
                                key={index}
                                ref={ref => (inputRefs.current[index] = ref)}
                                style={[
                                    styles.input,
                                    {
                                        backgroundColor: value !== '' ? '#FEFCFC' : '#FEFCFC',
                                        borderColor: value !== '' ? 'rgba(40, 158, 245, 1)' : 'rgba(0, 0, 0, 0.1)',
                                    },
                                ]}
                                value={value}
                                onChangeText={text => {
                                    const newOtp = [...otp];
                                    newOtp[index] = text;
                                    setOtp(newOtp);
                                    if (text.length === 1) {
                                        focusNextInput(index);
                                    }
                                }}
                                keyboardType="number-pad"
                                maxLength={1}
                                onSubmitEditing={() => focusNextInput(index)}
                                onKeyPress={event => handleKeyPress(index, event)}
                                textAlign="center"
                                textAlignVertical="center"
                            />
                        ))}
                    </View>
                    <View style={styles.buttonRow}>
                        {/* <View style={styles.resend}>
                            <View style={styles.textedContainerR}>
                                <Image
                                    source={require('../../../assets/img/resend.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <View style={styles.wrapShortR}>
                                <Text style={[commonStyles.headerText3B, {
                                    paddingHorizontal: width * 0.02,
                                }]}>Resend CODE</Text>
                            </View>
                        </View> */}
                        {showResendButton ? (
                            <TouchableOpacity style={styles.resend} onPress={handleResendCode}>
                                <View style={styles.textedContainerR}>
                                    <Image
                                        source={require('../../../assets/img/resend.png')}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.wrapShortR}>
                                    <Text style={[commonStyles.headerText3B, { paddingHorizontal: width * 0.02 }]}>Resend CODE</Text>
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.resend}>
                                <View style={styles.textedContainerT}>
                                    <Image
                                        source={require('../../../assets/img/timerL.png')}
                                        style={styles.icon}
                                    />
                                </View>
                                <View style={styles.wrapShortR}>
                                    <Text style={[commonStyles.headerText3B, { paddingHorizontal: width * 0.02 }]}>00:{timer}</Text>
                                </View>
                            </View>
                        )}


                        <View style={styles.verticalLine} />
                        <TouchableOpacity style={styles.resend} onPress={() => navigation.navigate('LoginScreen', { phoneNumber: phoneNumber })}>
                            <View style={styles.textedEContainer}>
                                <Image
                                    source={require('../../../assets/img/Edit.png')}
                                    style={styles.icon}
                                />
                            </View>
                            <View style={styles.wrapShortR}>
                                <Text style={[commonStyles.headerText3B, {
                                    paddingHorizontal: width * 0.02,
                                }]}>Edit Number</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[commonStyles.button, { marginTop: moderateScale(20) }]} // Wrap style object inside curly braces
                        onPress={handleVerify}
                        activeOpacity={0.8}
                    >
                        <Text style={commonStyles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <View style={styles.textedContainer}>
                            <Image
                                source={require('../../../assets/img/PrivacyLogin.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.wrapShort}>
                            <Text style={[commonStyles.headerText3BL, {
                                marginTop: height * 0.02,
                            }]}>
                                We never share this with anyone and it won’t be on your profile
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: height * 0.05, }}></View>


                </ScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#289EF5',
    },
    blueContainer: {
        backgroundColor: '#289EF5',
    },
    whiteContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#FEFCFC',
        paddingTop:30,
        paddingHorizontal: 16,
    },
    headerImageBackground: {
        width: width * 0.9,
        height: height * 0.32,
        marginBottom: moderateScale(37),
        alignSelf: 'center',
    },
    headerText1: {
        fontSize: responsiveFontSize(21),
        fontFamily: 'DMSans-Bold',
        color: '#121212',
        textTransform: 'uppercase',
        lineHeight: 28,
        paddingHorizontal: width * 0.02,
        marginBottom: height * 0.01,
    },
    denxgenX: {
        color: '#289EF5',
        paddingHorizontal: 5,
    },
    headerText2: {
        fontSize: responsiveFontSize(14),
        color: '#121212',
        fontFamily: 'DMSans-Regular',
        lineHeight: 22,
        paddingHorizontal: width * 0.02,
    },
    inputContainer2: {
        marginRight: 10,
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        height: 45,
        width: '20%',
        marginVertical: 10
    },
   

    inputs: {
        padding: 10,
        color: '#000'
    },
    inputContainer1: {
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        height: 45,
        width: '75%',
        marginVertical: 10
    },
    button: {
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: height * 0.03,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    wrapShort: {
        paddingHorizontal: 7,
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    textedContainer: {
        height: moderateScale(18),
        width: moderateScale(18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapShortR: {
        marginLeft: width * 0.02,
    },
    titleShortR: {
        fontSize: responsiveFontSize(12),
        color: '#289EF5',
        fontFamily: 'DMSans-Regular',
        lineHeight: 18,
    },
    headerTextContainer: {
        marginTop: height * 0.05,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: '#979797', // Change color as needed
        marginHorizontal: width * 0.04,
    },

    resend: {
        flexDirection: 'row',
        //paddingHorizontal: 7,
        alignItems: 'center',
    },
    // edit: {
    //     flexDirection: 'row',
    //     paddingHorizontal: 16,
    //     alignItems: 'center',
    // },
    // verticleLine: {
    //     height: '100%',
    //     width: 1,
    //     backgroundColor: '#898A8D',
    // },
    // button: {
    //     marginHorizontal: 59,
    //     height: height * 0.06,
    //     width: 257,
    //     backgroundColor: "#289EF5",
    //     borderRadius: 100,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: 28,
    //     alignSelf: 'center'
    // },
    // buttonText: {
    //     color: '#FFFFFF',
    //     fontSize: 16,
    //     textAlign: 'center',
    //     fontFamily: 'Mukta-Bold',
    // },
    // wrapShort: {
    //     paddingHorizontal: 7,
    // },
    // titleShort: {
    //     marginRight: 5,
    //     color: '#289EF5',
    //     fontSize: 14,
    //     fontWeight: '500',
    //     fontFamily: 'Mukta-Regular',
    // },
    // icon: {
    //     height: '100%',
    //     width: '100%',
    //     resizeMode: 'contain',
    // },
    textedContainerR: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textedContainerT: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textedEContainer: {
        height: 16,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // textContainer: {
    //     flexDirection: 'row',
    //     marginHorizontal: 60,
    //     alignItems: 'center',
    //     marginTop: 82,
    //     alignSelf: 'center'
    // },
    // container: {
    //     flex: 1,
    //     backgroundColor: '#ffffffff',
    // },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: moderateScale(34)
    },
    inputContainer: {
        flexDirection: 'row',
        marginVertical: 34,
        borderRadius: 20, // Adjust the borderRadius based on device size
        borderColor: '#ffffffff',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 45,
        height: 45,
        borderRadius: 8,
        borderWidth: 2,
        color: '#121212',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 28,
        marginHorizontal: moderateScale(7),
        //borderColor: 'rgba(60, 60, 67, 0.3)',
    },
    // pageContainer: {
    //     alignItems: 'center',
    //     //paddingHorizontal: 10,
    //     //paddingTop: 50,
    //     //marginTop: 120,
    //     width: width,
    //     //marginHorizontal: 20,
    // },
    // headerContainer: {
    //     position: 'relative',
    //     alignItems: 'center',
    //     marginBottom: 244,
    // },
    // headerImage: {
    //     position: 'absolute', // Position the image behind the header text
    //     //width: width * 2,
    //     //height: 70, // Set the fixed height
    //     resizeMode: 'cover', // Resize the image to cover the container
    // },
    // headerImageBackground: {
    //     position: 'absolute',
    //     bottom: -181, // Adjust the value to position the ellipse image
    //     //width: width, // Set the width to the screen width
    //     height: 281, // Set the height to 181
    //     resizeMode: 'contain',

    // },
    // horizontalLine: {
    //     width: 233,
    //     borderBottomWidth: 1, // Adjust the line thickness as needed
    //     borderBottomColor: 'white',
    //     marginTop: 8,
    //     marginBottom: 8,
    // },
    // headerTextContainer: {
    //     position: 'absolute',
    //     marginTop: 30,
    //     marginLeft: 32,
    //     paddingHorizontal: 20,
    //     width: '100%',
    //     height: 289,
    //     //justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     zIndex: 1, // Ensure the text appears above the background image
    // },
    // headerText1: {
    //     fontSize: 24,
    //     fontFamily: 'Mukta-Bold',
    //     color: 'white',
    //     marginBottom: 17
    // },
    // headerText2: {
    //     fontSize: 18,
    //     color: 'white',
    //     fontFamily: 'Mukta-Regular',
    //     lineHeight: 25,
    //     textAlign: 'center'
    // },
    // imageContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // image: {
    //     height: 147,
    //     width: 147,
    //     marginBottom: 60,
    //     resizeMode: 'contain',
    // },
});



export default OTPScreen;