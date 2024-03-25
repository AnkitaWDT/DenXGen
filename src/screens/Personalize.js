/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, PermissionsAndroid, ToastAndroid, Dimensions, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const Personalize = ({ navigation }) => {

    const [isRectVisible, setIsRectVisible] = useState(true);
    const [isRect1Visible, setIsRect1Visible] = useState(false);

    const toggleRectVisibility = () => {
        setIsRectVisible(!isRectVisible);
        setIsRect1Visible(!isRect1Visible);
    };


    const handleNext = () => {
        if (isRect1Visible) {
            navigation.navigate('SelectCategory');
        } else {
            ToastAndroid.show('Please accept the Terms and Privacy Policy', ToastAndroid.SHORT);
        }

        //navigation.navigate('SelectCategory');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/img/personalize.png')} style={styles.image} />
            </View>

            <View style={styles.subContainer}>
                <Text style={[commonStyles.headerText1BL, {
                    marginBottom: 16,
                }]}>
                    Personalize your{'\n'}Den<Text style={styles.denxgenX}>X</Text>Gen experience
                </Text>
                <Text style={[commonStyles.headerText4BL, {
                   
                }]}>Sharing your activity with DenXGen and we will help you build your world with us : </Text>
                <View style={styles.tickC}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.tick}>
                            <Image
                                source={require('../../assets/img/tick.png')}
                                style={commonStyles.icon}
                            />
                        </View>
                        <Text style={[commonStyles.headerText3G, {
                            paddingHorizontal: 4,
                        }]}>Show ads that are relevant to you</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.tick}>
                            <Image
                                source={require('../../assets/img/tick.png')}
                                style={commonStyles.icon}
                            />
                        </View>
                        <Text style={[commonStyles.headerText3G, {
                            paddingHorizontal: 4,
                        }]}>Identify areas for app development</Text>
                    </View>
                </View>
                <Text style={[commonStyles.headerText4BL, {
                    
                }]}>This setting can be changed anytime in your system settings.</Text>
            </View>


            {/* <View style={styles.contentContainer}>
                  <View style={styles.imageContainer}>
                      <Image source={require('../../assets/img/CurrentLocation.png')} style={styles.image} />
                  </View>
              </View> */}

            <TouchableOpacity
                style={[commonStyles.button, { marginTop: 20 }]} // Wrap style object inside curly braces
                onPress={handleNext}
                activeOpacity={0.8}
            >
                <Text style={commonStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
        
            <TouchableOpacity onPress={() => toggleRectVisibility()} style={styles.textContainer}>
                <View style={styles.textedContainer}>
                    <Image
                        source={isRectVisible ? require('../../assets/img/Rect.png') : require('../../assets/img/Rect1.png')}
                        style={styles.icon}
                    />
                </View>
                <View style={styles.wrapShort}>
                    <Text style={[commonStyles.headerText3BL, {
                        //paddingHorizontal: width * 0.015,
                    }]}>
                        {/* {isShortlisted ? 'I agree to the DENXGEN Terms of Service and Privacy Policy' : 'I agree to the DENXGEN Terms of Service and Privacy Policy'} */}
                        I agree to  the Terms and Privacy Policy

                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginBottom: height * 0.05, }}></View>
    
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        //alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        paddingHorizontal: 16,

    },

    // imageContainer: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    image: {
        height: width * 0.7, // Adjust height as needed
        width: width, // Set width to the width of the screen
        alignSelf: 'stretch', // Stretch the image to fill its container's width
        marginBottom: height * 0.1,
        //resizeMode: 'contain',
    },
    denxgenX: {
        color: '#289EF5',
        paddingHorizontal: 5,
    },
    tickC: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        marginVertical: 20,
    },
    tick: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: height * 0.08,
    },
    buttonText: {
        color: '#FEFCFC',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    wrapShort: {
        paddingLeft: 10,
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    textedContainer: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

});

export default Personalize;
