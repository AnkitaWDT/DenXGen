/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    Modal,
    TouchableHighlight,
    PixelRatio,
    Keyboard,
    TouchableWithoutFeedback,
    ToastAndroid
} from 'react-native';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ProgressBar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const NDProfileCompletion3 = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);

    const defaultProfileImage = require('../../../assets/img/DProfile.png');
    const defaultBannerImage = require('../../../assets/img/DBanner.png');

    const handleProfileUpload = () => {
        pickImage('profile');
    };

    const handleBannerUpload = () => {
        pickImage('banner');
    };

    const pickImage = async (type) => {
        try {
            const image = await ImagePicker.openPicker({
                width: 400,
                height: 400,
                cropping: true,
            });

            if (type === 'profile') {
                setProfileImage(image);
            } else if (type === 'banner') {
                setBannerImage(image);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleNext = () => {
        // Upload profile image
        if (profileImage) {
            const profileFormData = new FormData();
            profileFormData.append('profileImage', {
                uri: profileImage.path,
                type: profileImage.mime,
                name: 'profile_image.jpg',
            });

            // Send profile image to the backend
            fetch('YOUR_PROFILE_IMAGE_UPLOAD_URL', {
                method: 'POST',
                body: profileFormData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Profile image uploaded successfully:', data);
                    // Handle response from the backend
                })
                .catch(error => {
                    console.error('Error uploading profile image:', error);
                    // Handle error
                });
        }

        // Upload banner image
        if (bannerImage) {
            const bannerFormData = new FormData();
            bannerFormData.append('bannerImage', {
                uri: bannerImage.path,
                type: bannerImage.mime,
                name: 'banner_image.jpg',
            });

            // Send banner image to the backend
            fetch('YOUR_BANNER_IMAGE_UPLOAD_URL', {
                method: 'POST',
                body: bannerFormData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Banner image uploaded successfully:', data);
                    // Handle response from the backend
                })
                .catch(error => {
                    console.error('Error uploading banner image:', error);
                    // Handle error
                });
        }

        console.log('ProfileCompletion4');
    };

    useEffect(() => {
        // Simulate an asynchronous operation (e.g., fetching data) before rendering the profile screen
        const fakeAsyncOperation = async () => {
            // Add any asynchronous logic here if needed
            // For now, just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set loading state to false after the delay
            setIsLoading(false);
        };

        // Execute the fakeAsyncOperation
        fakeAsyncOperation();
    }, []);


    const currentStep = 3; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    //console.log("Progress Percentage:", progressPercentage);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>

            ) : (
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                        <View style={styles.contentContainer}>
                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, {
                                    marginBottom: moderateScale(6), textAlign: 'center'
                                }]}>Step 3 - Update Photo</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Choose your career category and unlock endless possibilities.</Text>
                                <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                />
                            </View>

                            <View style={styles.defaultContainer}>
                                {profileImage ? (
                                    <Image source={{ uri: profileImage.path }} style={styles.profileImage} />
                                ) : (
                                    <Image source={defaultProfileImage} style={styles.defaultProfileImage} />
                                )}
                            </View>

                            <TouchableOpacity onPress={handleProfileUpload} style={[commonStyles.button1, { marginTop: height * 0.001, marginBottom: height * 0.02, }]} activeOpacity={0.8}>
                                <Text style={commonStyles.buttonText1}>Select Profile Photo</Text>
                            </TouchableOpacity>

                            <View style={styles.defaultContainer}>
                                {bannerImage ? (
                                    <Image source={{ uri: bannerImage.path }} style={styles.bannerImage} />
                                ) : (
                                    <Image source={defaultBannerImage} style={styles.defaultBannerImage} />
                                )}
                            </View>

                            <TouchableOpacity onPress={handleBannerUpload} style={[commonStyles.button1, { marginTop: height * 0.001, marginBottom: height * 0.02, }]} activeOpacity={0.8}>
                                <Text style={commonStyles.buttonText1}>Select Banner Photo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[commonStyles.button]}
                                onPress={handleNext}
                                activeOpacity={0.8}
                            >
                                <Text style={commonStyles.buttonText}>Continue</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[commonStyles.button1, { marginBottom: height * 0.05, marginTop: height * 0.001, }]}
                                activeOpacity={0.8}>
                                <Text style={commonStyles.buttonText1}>Skip</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: moderateScale(16),
    },
    contentContainer: {
        marginTop: moderateScale(32),
        //justifyContent: 'center',
        alignItems: 'center',
        //marginTop: height * 0.00,
    },
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
        //zIndex: 1,
    },
    previewImage: {
        width: width * 0.45,
        height: width * 0.45,
        marginVertical: 10,
        borderRadius: 200 / 2,
    },

    defaultImage: {
        width: width * 0.45,
        height: width * 0.45,
        marginVertical: 10,
        resizeMode: 'cover',
    },
    bannerImage: {
        width: width * 0.85,
        height: height * 0.2,
        marginVertical: 10,
    },
    defaultBannerImage: {
        width: width * 0.85,
        height: height * 0.2,
        marginVertical: 10,
        resizeMode: 'cover',
    },
});

export default NDProfileCompletion3;
