/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../API/APIConfig';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const checkAppLaunchStatus = async () => {
            try {
                const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');

                if (isFirstLaunch === null) {
                    // First app launch
                    await AsyncStorage.setItem('isFirstLaunch', 'false');
                    showOnboardingScreen();
                } else {
                    // App launched before
                    checkUserLoggedInStatus();
                    // showHomeScreen();
                }
            } catch (error) {
                // Handle AsyncStorage errors
                console.log(error);
                showOnboardingScreen();
            }
        };

        const checkUserLoggedInStatus = async () => {
            try {
                const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
                const adminLoggedIn = await AsyncStorage.getItem('adminLoggedIn');
                const userid = await AsyncStorage.getItem('userid');
                
                //console.log(adminLoggedIn);
                console.log(userLoggedIn);

                if (userLoggedIn === null || userLoggedIn === 'false') {
                    // User not logged in
                    showLoginScreen();
                } else {
                    showHomeScreen();

                //     const userData = {
                //         status: await AsyncStorage.getItem('status'),
                //         isregistered: await AsyncStorage.getItem('isregistered'),
                //     };

                //     // Fetch the updated API response
                //     const phoneNumber = await AsyncStorage.getItem('phoneno');
                //     const response = await fetch(`${API_CONFIG.API_DOMAIN}${API_CONFIG.loginUrl}?phno=${phoneNumber}`);
                //     const apiData = await response.json();

                //     // Update the userData object with new values
                //     userData.status = apiData.data.status;
                //     //userData.isregistered = apiData.data.isregistered.toString(); // Convert to string

                //     // Save the updated userData object back to AsyncStorage
                //     await AsyncStorage.setItem('status', userData.status);
                //     await AsyncStorage.setItem('isregistered', userData.isregistered);

                //     console.log("Status:", userData.status);
                //     console.log("IsRegistered:", userData.isregistered);

                //     // Compare the current and new userData.status values
                //    if (parseInt(userData.status) === 1 && parseInt(userData.isregistered) === 1) {

                //         console.log('HomeScreen');
                //         showHomeScreen();
                //     }
                //     else if (parseInt(userData.status) === 0) {
                //         console.log('SelectCategory');
                //        showHomeScreen();
                //         //showSelectCategoryScreen();
                //     }
                //    else if (parseInt(userData.status) === 0 ) {
                //        console.log('Profile');
                //        showHomeScreen();
                //    }
                //     else if (parseInt(userData.status) === 1 ) {
                //        console.log('Profile');
                //        showHomeScreen();
                //    }
                //     else {
                //         console.log('WaitingScreen2');
                //         null;
                //     }
                }
            } catch (error) {
                // Handle AsyncStorage errors
                console.log(error);
                console.log('NoInternetScreenError');
                //showNoInternetScreen();
            }
        };

        const showProfileScreen = () => {
            const fadeIn = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });
            const fadeOut = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });

            Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
                console.log('ProfileCompletion1');
                navigation.replace('ProfileCompletion1');
            });
        };

        const showSelectCategoryScreen = () => {
            const fadeIn = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });
            const fadeOut = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });

            Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
                console.log('SelectCategory');
                navigation.replace('SelectCategory');
            });
        };

        const showLoginScreen = () => {
            const fadeIn = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });
            const fadeOut = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });

            Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
                console.log('LoginScreen');
                navigation.replace('LoginScreen');
            });
        };

        const showHomeScreen = () => {
            const fadeIn = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });
            const fadeOut = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });

            Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
                console.log('HomeScreen');
                navigation.replace('HomeScreen');
                // navigation.replace('PersonalDetails');
            });
        };


        const showOnboardingScreen = () => {
            const fadeIn = Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });
            const fadeOut = Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 700, // Adjust the duration as per your preference
                useNativeDriver: true,
            });

            Animated.sequence([fadeIn, Animated.delay(700), fadeOut]).start(() => {
                console.log('OnBoardScreenOnBoardScreen');
                navigation.replace('OnBoardScreen');
                //  navigation.replace('PersonalDetails');
            });
        };

        checkAppLaunchStatus();
    }, [fadeAnim, navigation]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
                {/* Replace the Image component with your own splash screen image */}
                <Image
                    source={require('../../assets/img/DenXGenLogoV.png')}
                    style={styles.image}
                />
            </Animated.View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.5,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
});


export default SplashScreen;

