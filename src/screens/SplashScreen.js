/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                    showHomeScreen();
                }
            } catch (error) {
                // Handle AsyncStorage errors
                console.log(error);
                showOnboardingScreen();
            }
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

