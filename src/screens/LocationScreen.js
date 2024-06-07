/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, PermissionsAndroid, ToastAndroid, Dimensions, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation module
import { moderateScale } from 'react-native-size-matters';

import commonStyles from '../components/CommonStyles';


const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};



const LocationScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        const fakeAsyncOperation = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        fakeAsyncOperation();
    }, []);

    const handleLocationSubmit = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            console.log('Location Permission Granted:', granted); // Add this line

            if (granted) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log('Position:', position); // Add this line
                        const { latitude, longitude } = position.coords;
                        console.log('Latitude:', latitude); // Add this line
                        console.log('Longitude:', longitude); // Add this line
                        setLatitude(latitude);
                        setLongitude(longitude);
                        setIsLoading(false);
                        storeLocation(latitude, longitude, position);
                    },
                    error => {
                        console.log('Error:', error); // Add this line
                        setIsLoading(false);
                        ToastAndroid.show('Error getting location', ToastAndroid.SHORT);
                        console.error(error);
                    }
                );

                navigation.navigate('WelcomeScreen');
            } else {
                setIsLoading(false);
                ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
                navigation.navigate('WelcomeScreen');
            }
        } catch (err) {
            setIsLoading(false);
            console.error('Error requesting location permission:', err); // Add this line
        }

        navigation.navigate('WelcomeScreen');
    };


    const storeLocation = async (latitude, longitude, position) => {
        try {
            await AsyncStorage.setItem('latitude', String(latitude));
            await AsyncStorage.setItem('longitude', String(longitude));
            await AsyncStorage.setItem('position', String(position));
        } catch (error) {
            console.error('Error storing location:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={require('../../assets/img/LS.png')} style={styles.headerImageBackground} />
                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1W, {
                                    marginBottom: 8,

                                }]}>What’s your Location?</Text>
                                <Text style={[commonStyles.headerText2W, {
                                    paddingHorizontal: 16, textAlign: 'center',
                                }]}>We need your location to show available clinics & listing.</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.imageContainer}>
                                <Image source={require('../../assets/img/SelectLocation.png')} style={styles.image} />
                        </View>
                    </View>
                        <TouchableOpacity
                            style={[commonStyles.button, { position: 'absolute', bottom: height > 650 ? 82 : 50, }]}
                            onPress={handleLocationSubmit}
                            activeOpacity={0.8}
                        >
                            <Text style={commonStyles.buttonText}>Use Current Location</Text>
                        </TouchableOpacity>

                    {/* <TouchableOpacity
                        style={[commonStyles.button1, { marginBottom: height * 0.05 }]}
                        onPress={handleLocationSubmit}
                        activeOpacity={0.8}
                    >
                        <Text style={commonStyles.buttonText1}>Enter Location Manually</Text>
                    </TouchableOpacity> */}
                    {/* <View style={styles.buttonContainer}>
                    
                            <TouchableOpacity
                                style={[commonStyles.button, { marginBottom: height * 0.01 }]}
                                onPress={handleLocationSubmit}
                                activeOpacity={0.8}
                            >
                                <Text style={commonStyles.buttonText}>Use Current Location</Text>
                            </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadButtonS}>
                            <Text style={styles.buttonTextU}>Enter Location Manually</Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',

    },
    headerImageBackground: {
        position: 'absolute',
        bottom: height > 650 ? (-(height * 0.22)) : (-(height * 0.26)),
        height: height * 0.4,
        resizeMode: 'contain',
    },
    //height > 230 ? (height > 250 ? -moderateScale(height * 0.25) : -moderateScale(250 * 0.25)) : -moderateScale(230 * 0.25),
    headerTextContainer: {
        position: 'absolute',
        marginTop: 35,
        // marginLeft: width * 0.08,
        width: '100%',
        //height: height * 0.05,
        alignItems: 'center',
        zIndex: 1,
    },
    contentContainer: {
        //paddingHorizontal: width * 0.02,
        marginTop: height > 650 ? 255: 200,
        paddingHorizontal: 16,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: width * 0.65,
        width: '100%',
        marginBottom: 152,
        resizeMode: 'contain',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    buttonText: {
        color: '#FEFCFC',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    uploadButtonS: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 30
    },
    buttonTextU: {
        color: '#289EF5',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
    },
});

export default LocationScreen;
