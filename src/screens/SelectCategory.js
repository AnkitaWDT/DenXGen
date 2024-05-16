/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, PixelRatio, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import commonStyles from '../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const SelectCategory = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        // Check if the screen height is less than a certain threshold (e.g., 640)
        setIsSmallScreen(height < 650);
    }, []);

    const handleOptionPress = async (option) => {
        setSelectedOption(option);
        let pr_ty_id;
        if (option === 'Dental Professional') {
            pr_ty_id = '1';
            //navigation.navigate('ProfileCompletion1');
        } else if (option === 'Non-Dental Professional') {
            pr_ty_id = '2';
            //navigation.navigate('ProfileCompletion1');
        }
        try {
            await AsyncStorage.setItem('pr_ty_id', pr_ty_id); // Removed the space before 'pr_ty_id'
            console.log('pr_ty_id', pr_ty_id);
        } catch (error) {
            console.error('Error setting category ID in AsyncStorage:', error);
        }
    };


    const handleNext = async () => {
        if (selectedOption === 'Dental Professional') {
            navigation.navigate('ProfileCompletion1');
            console.log('Dental Professional');
        } else if (selectedOption === 'Non-Dental Professional') {
            navigation.navigate('ProfileCompletion1');
            console.log('Non-Dental Professional');
        } else {
            ToastAndroid.show('Please select one option!', ToastAndroid.SHORT);
            console.log('No option selected');
        }
    };

    const renderOptionButton = (option) => {
        const isSelected = selectedOption === option;

        return (
            <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.8}>
                <Text style={[commonStyles.headerText2BL, {
                    paddingHorizontal: 25,
                }]}>{option}</Text>
                <View
                    style={[
                        styles.circle,
                        {
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#FEFCFC',
                        },
                    ]}>
                    {isSelected ? (
                        <Image
                            source={require('../../assets/img/Cat2.png')} // Replace with your image source
                            style={styles.imageStyle}
                        />
                    ) : (
                        <Image
                            source={require('../../assets/img/Cat1.png')} // Replace with your image source
                            style={styles.imageStyle}
                        />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const renderTextComponents = !isSmallScreen && (
        <>
            <Text style={[commonStyles.headerText1BL, {
                marginBottom: 6,
            }]}>Select Your Profession</Text>
            <Text style={[commonStyles.headerText2BL, {
                paddingHorizontal: 16, textAlign: 'center'
            }]}>Choose your career category and unlock endless possibilities.</Text>
        </>
    );



    return (
        <View style={styles.container}>
            <View style={styles.headerTextContainer}>
                {/* <Text style={[commonStyles.headerText1BL, {
                  marginBottom: moderateScale(6),
                }]}>Select Your Profession</Text>
                <Text style={[commonStyles.headerText2BL, {
                    paddingHorizontal:moderateScale(16),  textAlign: 'center'
                }]}>Choose your career category and unlock endless possibilities.</Text> */}
                {renderTextComponents}
            </View>
            <View style={styles.bottomImageContainer}>
                <Image
                    source={require('../../assets/img/Subtract.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.container2}>
                    {renderOptionButton('Dental Professional')}
                    {renderOptionButton('Non-Dental Professional')}
                </View>
                <TouchableOpacity
                    style={[commonStyles.button1, { marginBottom: height * 0.04 }]}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <Text style={commonStyles.buttonText1}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={require('../../assets/img/SelectCat.png')}
                style={styles.topImage}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //overflow: 'hidden',
        backgroundColor: '#FEFCFC',
    },
    topImage: {
        position: 'absolute',
        bottom: 280,
        width: width* 0.7,
        height: height * 0.35,
        zIndex: 0,
    },
    imageStyle: {
        height: 24,
        width: 24
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: 360,
        zIndex: 0,
    },
    bottomImageContainer: {
        position: 'absolute',
        width: '200%',
        height: height * 0.5,
        zIndex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    optionButton: {
        height: 52,
        width: width * 0.9,
        borderRadius: 24,
        borderWidth: 1,
        backgroundColor: '#FEFCFC',
        borderColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        margingHorizontal: 24,
        paddingRight: 28,
    },
    optionButtonText: {
        flex: 1,

        fontSize: responsiveFontSize(16),
        fontFamily: 'DMSans-Medium',
        color: '#121212',
        lineHeight: 28,
        paddingHorizontal: width * 0.04,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 36,
        borderColor: '#289EF5',
        backgroundColor: 'transparent'
    },
    headerTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 50,
        //zIndex: 2,
        paddingHorizontal: 16,
    },
    headerText1: {
        fontSize: responsiveFontSize(21),
        fontFamily: 'DMSans-Bold',
        color: '#121212',
        lineHeight: 32,
        paddingHorizontal: width * 0.02,
        marginBottom: height * 0.02,
    },

    headerText2: {
        fontSize: responsiveFontSize(14),
        color: '#121212',
        fontFamily: 'DMSans-Bold',
        lineHeight: 22,
        paddingHorizontal: width * 0.02,
        textAlign: 'center',
    },
    mediumCircle: {
        width: 13.33,
        height: 13.33,
        borderRadius: 16,
    },
    container2: {
        marginBottom: height * 0.02,
    },
    button: {
        marginHorizontal: 59,
        height: height * 0.06,
        width: width * 0.9,
        //backgroundColor: '#FEFCFC',
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50
    },
    buttonText: {
        color: '#289EF5',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
});

export default SelectCategory;

