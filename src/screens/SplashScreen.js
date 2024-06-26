/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../API/APIConfig';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import axios from 'axios';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchPlayerIdAndHitApi = async () => {
            try {
                // Fetch player ID from local storage
                const playerId = await AsyncStorage.getItem('playerId');
                const pr_id = await AsyncStorage.getItem('pr_id');
                // Check if player ID exists
                if (playerId) {
                    // Make API call to send player ID
                    const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/reqplayerid-ax.php?pr_id=${pr_id}&playerid=${playerId}`);
                    console.log('Player ID sent to server:', response.data);

                    // Continue with your navigation logic here
                    // For example, navigate to the next screen after the API call
                    // navigation.navigate('NextScreen');
                } else {
                    // Player ID not found in local storage
                    console.log('Player ID not found');
                    // Handle the case where player ID is not found, if needed
                }
            } catch (error) {
                console.error('Error fetching player ID or hitting API:', error);
                // Handle errors, e.g., show an error message to the user
            }
        };

        // Call the function to fetch player ID and hit API
        fetchPlayerIdAndHitApi();
    }, [navigation]);

    useEffect(() => {
        const requestNotificationPermission = async () => {
            try {
                let permission;
                if (Platform.OS === 'android') {
                    permission = PERMISSIONS.ANDROID.ACCESS_NOTIFICATIONS;
                } else if (Platform.OS === 'ios') {
                    permission = PERMISSIONS.IOS.NOTIFICATIONS;
                }

                const status = await check(permission);

                if (status !== RESULTS.GRANTED) {
                    const result = await request(permission);

                    if (result !== RESULTS.GRANTED) {
                        console.log('Notification permission is denied');
                        // Handle permission denied case, e.g., show an error message to the user
                        return;
                    }
                }
            } catch (err) {
                console.error('Error requesting notification permission:', err);
                // Handle other errors, e.g., show a generic error message to the user
            }
        };

        requestNotificationPermission();
    }, []);

    // useEffect(() => {
    //     requestNotificationsPermission();
    // }, []);

    // const requestNotificationsPermission = async () => {
    //     if (Platform.OS === 'android') {
    //         try {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.ACCESS_NOTIFICATION_POLICY,
    //                 {
    //                     title: 'Notification Permission',
    //                     message: 'This app needs access to your notifications.',
    //                 }
    //             );
    //             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                 console.log('Notification permission granted');
    //             } else {
    //                 console.log('Notification permission denied');
    //             }
    //         } catch (err) {
    //             console.warn(err);
    //         }
    //     } else if (Platform.OS === 'ios') {
    //         // iOS doesn't require explicit permission request
    //         console.log('Notification permission already handled on iOS');
    //     }
    // };

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

                if (userLoggedIn === null || userLoggedIn === 'false') {
                    // User not logged in
                    showLoginScreen();
                    return; // Exit early
                }

                const userData = {
                    status: await AsyncStorage.getItem('status'),
                    isregistered: await AsyncStorage.getItem('isregistered'),
                };

                const phoneNumber = await AsyncStorage.getItem('phoneno');
                const response = await fetch(`${API_CONFIG.API_DOMAIN}${API_CONFIG.loginUrl}?phno=${phoneNumber}`);
                const apiData = await response.json();

                // Check if API response contains the expected data
                if (apiData && apiData.data && apiData.data.isregistered !== undefined) {
                    // Update the userData object with new values
                    userData.isregistered = apiData.data.isregistered.toString();

                    // Save the updated userData object back to AsyncStorage
                    await AsyncStorage.setItem('isregistered', userData.isregistered);
                } else {
                    console.log('Error: API response is missing expected data');
                    // Handle the case where API response is missing expected data
                    // For example, show an error message to the user
                    return; // Exit early
                }

                console.log("Status:", userData.isregistered);

                // Compare the current and new userData.status values
                if (parseInt(userData.isregistered) === 1) {
                    console.log('HomeScreen');
                    showHomeScreen();
                } else if (parseInt(userData.isregistered) === 0) {
                    console.log('SelectCategory');
                    showSelectCategoryScreen();
                } else {
                    console.log('WaitingScreen2');
                    // Consider handling this case
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

