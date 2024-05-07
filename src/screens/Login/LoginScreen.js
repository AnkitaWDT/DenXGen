/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, PixelRatio, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, ToastAndroid } from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import commonStyles from '../../components/CommonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../API/APIConfig';

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation, route}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
//   const handleRegistration = async () => {
//     navigation.navigate('OTPScreen');
//   };

    const handleRegistration = async () => {
        try {
            const endpoint = `https://temp.wedeveloptech.in/denxgen/appdata/reqpersonallogin-ax.php?phno=${encodeURIComponent(phoneNumber)}`;
            const response = await fetch(endpoint);
            console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            if (data && data.code === 1) {
                console.log('OTP sent to phoneNumber!');
                ToastAndroid.show('OTP sent successfully!', ToastAndroid.SHORT);

                await AsyncStorage.setItem('pr_id', data.data.id);
                await AsyncStorage.setItem('phoneno', data.data.phoneno);
                await AsyncStorage.setItem('password', String(data.data.password));
                await AsyncStorage.setItem('name', data.data.name);

                // Navigate to OTPScreen
                navigation.navigate('OTPScreen', { phoneNumber });
                setPhoneNumber('');
            } else {
                console.log('Failed to send OTP. Please try again.');
                ToastAndroid.show('Please Check Number and Try Again.', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log('Error occurred:', error);
            ToastAndroid.show('Network Error.', ToastAndroid.SHORT);
        }
        setPhoneNumber('');
    };


    useEffect(() => {
        // Check if route and route.params are defined
        if (route && route.params && route.params.phoneNumber) {
            setPhoneNumber(route.params.phoneNumber);
        }
    }, [route]);


  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Blue container */}
              <View style={[styles.blueContainer, { height: moderateScale(height * 0.05) }]}>
          {/* No content inside the blue container */}
        </View>

        {/* White container */}
              <ScrollView style={[styles.whiteContainer, {  }]}>
          {/* Content inside the white container */}
                  <Image source={require('../../../assets/img/LoginOTP.png')} style={styles.headerImageBackground} />
                  <Text style={[commonStyles.headerText1BL, {
                      marginBottom: moderateScale(10),
                  }]}>
                      Login to Den<Text style={styles.denxgenX}>X</Text>Gen
                  </Text>
                  <Text style={[commonStyles.headerText3BL, {

                  }]}>Enter your phone number and Go ahead and set up your account</Text>
                  <View style={{ flexDirection: 'row', marginVertical: moderateScale(34) }}>
                      <View style={styles.inputContainer2}>
                          <TextInput
                              style={styles.inputs}
                              placeholder="IN +91"
                              placeholderTextColor={"#121212"}
                              underlineColorAndroid='transparent'
                              editable={false}
                              selectTextOnFocus={false}
                          />
                      </View>
                      <View style={styles.inputContainer1}>
                          <TextInput
                              style={styles.inputs}
                              maxLength={10}
                              keyboardType="phone-pad"
                              placeholder="Enter Mobile Number"
                              placeholderTextColor="#979797"
                              value={phoneNumber}
                              onChangeText={setPhoneNumber}
                          />
                      </View>
                  </View>
                  <View style={styles.buttonRow}>
                      <View style={styles.wrapShortR}>
                          <Text style={[commonStyles.headerText5B, {

                          }]}>You will receive 5 digits code on your number</Text>
                      </View>
                  </View>
                  <TouchableOpacity
                      style={[commonStyles.button, { marginTop: moderateScale(20) }]} // Wrap style object inside curly braces
                      onPress={handleRegistration}
                      activeOpacity={0.8}
                  >
                      <Text style={commonStyles.buttonText}>Get OTP</Text>
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
                              marginTop: moderateScale(20),
                              
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
};

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
    paddingTop: moderateScale(30),
    paddingHorizontal: moderateScale(16),
    
  },
  denxgenX: {
    color: '#289EF5',
  },
    headerImageBackground: {
        width: width * 0.9,
        height: height * 0.32,
        marginBottom: moderateScale(37),
        alignSelf: 'center',
    },
    inputContainer2: {
        marginRight: moderateScale(10),
        borderColor: '#979797',
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: '#FEFCFC',
        height: 45,
        width: '20%',
        //marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
    },
    inputs: {
        padding: moderateScale(10),
        color: '#121212',
        fontFamily: 'DMSans-Regular',
    },
    inputContainer1: {
        borderColor: '#979797',
        borderWidth: 0.5,
        borderRadius: 20,
        backgroundColor: '#FEFCFC',
        height: 45,
        width: '75%',
        //marginVertical: 10,
        paddingHorizontal: moderateScale(7),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    wrapShortR: {
        //marginLeft: width * 0.02,
    },
    wrapShort: {
        paddingHorizontal: moderateScale(7),
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
});

export default LoginScreen;
