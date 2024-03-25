/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import commonStyles from '../components/CommonStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const QRScreen = ({ navigation, route }) => {
    const [opacity, setOpacity] = useState(new Animated.Value(1));
    const [isExpanded, setIsExpanded] = useState(false);
    const [rotation] = useState(new Animated.Value(0));

    const rotateImage = () => {
        Animated.timing(rotation, {
            toValue: 1,
            duration: 5000, // 5 seconds
            useNativeDriver: true,
        }).start(() => {
            // Animation finished
            Animated.timing(rotation, {
                toValue: 0,
                duration: 0, // Instantly revert
                useNativeDriver: true,
            }).start(() => {
                // Set state to collapse the expanded view
                setIsExpanded(false);
            });
        });
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const [profileImage, setProfileImage] = useState(
        require('../../assets/img/Profile.png')
    );
    const [title, setTitle] = useState('Dr. Naina Swaroop');
    const [subtitle, setSubtitle] = useState('Root canal Specialist');

    const handleSwapPress = () => {
        setProfileImage(
            profileImage === require('../../assets/img/Profile.png')
                ? require('../../assets/img/DentalD.png')
                : require('../../assets/img/Profile.png')
        );
        setTitle(
            title === 'Dr. Naina Swaroop'
                ? 'ZeNiL Dental Studio'
                : 'Dr. Naina Swaroop'
        );
        setSubtitle(
            subtitle === 'Root canal Specialist'
                ? 'Plastic and Cosmetic Surgeon'
                : 'Root canal Specialist'
        );
        // // Fade out animation
        // Animated.timing(opacity, {
        //     toValue: 0,
        //     duration: 300, // Adjust duration as needed
        //     easing: Easing.linear, // Adjust easing as needed
        //     useNativeDriver: true, // For better performance
        // }).start(() => {
        //     // After fade out animation, update content and fade in
        //     setProfileImage(
        //         profileImage === require('../../assets/img/Profile.png')
        //             ? require('../../assets/img/DentalD.png')
        //             : require('../../assets/img/Profile.png')
        //     );
        //     setTitle(
        //         title === 'Dr. Naina Swaroop'
        //             ? 'ZeNiL Dental Studio'
        //             : 'Dr. Naina Swaroop'
        //     );
        //     setSubtitle(
        //         subtitle === 'Root canal Specialist'
        //             ? 'Plastic and Cosmetic Surgeon'
        //             : 'Root canal Specialist'
        //     );

        //     // Fade in animation
        //     Animated.timing(opacity, {
        //         toValue: 1,
        //         duration: 300, // Adjust duration as needed
        //         easing: Easing.linear, // Adjust easing as needed
        //         useNativeDriver: true, // For better performance
        //     }).start();
        // });
    };

    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container1}>
                    <View style={commonStyles.wrapT}>
                        <TouchableOpacity
                            style={commonStyles.backContainer} activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require('../../assets/img/Back.png')}
                                style={commonStyles.icon}
                            />
                        </TouchableOpacity>
                        {/* {isExpanded ? (
                            <TouchableOpacity
                                style={[styles.expandedImageContainer, { top: deviceHeight / 2 - 50 }]} // Adjust -50 based on the height of the image
                                onPress={handleSwapPress}
                            >
                                <Animated.Image
                                    source={require('../../assets/img/swap.png')}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        transform: [{ rotate: rotateInterpolate }],
                                    }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={commonStyles.backContainer1}
                                onPress={() => {
                                    setIsExpanded(true);
                                    rotateImage();
                                }}
                            >
                                <Image
                                    source={require('../../assets/img/swap.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                        )} */}
                        <TouchableOpacity
                            style={commonStyles.backContainer1} activeOpacity={0.8}
                            onPress={handleSwapPress}
                        >
                            <Image
                                source={require('../../assets/img/swap.png')}
                                style={commonStyles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={commonStyles.logoIcon}>
                        <Image
                            source={require('../../assets/img/DenXGenLogo.png')}
                            style={commonStyles.icon}
                        />
                    </View>
                    <View style={styles.scannerIcon}>
                        <Image
                            source={require('../../assets/img/QRCode.png')}
                            style={commonStyles.icon}
                        />
                    </View>
                    <View style={styles.blueContainer}>
                        <Animated.View style={{ opacity }}>
                            <TouchableOpacity
                                style={styles.profileIcon1}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('PersonalProfile')}
                            >
                                <Image
                                    source={profileImage}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
            {isExpanded && (
                <View style={styles.overlay}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => setIsExpanded(false)}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Set background color here if needed
    },
    container1: {
        paddingHorizontal: 20,
    },
    subContainer: {
        marginVertical: 6,
    },
    blueContainer: {
        backgroundColor: 'rgba(40, 158, 245, 0.8)', // semi-transparent blue color
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '10%',
        height: '100%',
        justifyContent: 'flex-start',
        marginTop: '5%',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'Mukta-Regular',
    },
    scannerIcon: {
        height: height * 0.3,
        width: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: height * 0.05,
    },
    profileIcon1: {
        height: height * 0.25, 
        width: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: 21,
        fontWeight: '400',
        fontFamily: 'Mukta-Regular',
    },
    scrollView: {
        flexGrow: 1,
        marginTop: 10
    },
    expandedImageContainer: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // semi-transparent black overlay
        zIndex: 1,
    },
});

export default QRScreen;
