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

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ProfileCompletion3 = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [bannerImage, setBannerImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const defaultBannerImage = require('../../../assets/img/DBanner.png');
    const defaultProfileImage = require('../../../assets/img/DProfile.png');

    const handleBannerUpload = () => {
        launchImagePicker('banner');
    };

    const handleProfileUpload = () => {
        launchImagePicker('profile');
    };

    const launchImagePicker = (type) => {
        const options = {
            mediaType: 'photo',
            cropping: false, // Set cropping to false initially
        };

        ImageCropPicker.openPicker(options).then((response) => {
            if (!response.path) {
                console.log('User cancelled image picker');
                return;
            }

            const aspectRatio = type === 'banner' ? 16 / 9 : 1 / 1;

            cropImage(response.path, aspectRatio, type === 'banner' ? setBannerImage : setProfileImage);
        }).catch((error) => {
            console.log('ImagePicker Error: ', error);
        });
    };

    const cropImage = (path, aspectRatio, setImage) => {
        ImageCropPicker.openCropper({
            path,
            width: aspectRatio * 100,
            height: 100,
            cropperCircleOverlay: false,
            cropping: true,
            includeBase64: false,
            freeStyleCropEnabled: true,
            cropperToolbarTitle: 'Crop Image',
            cropperToolbarColor: '#3498db',
            cropperActiveWidgetColor: '#3498db',
            cropperStatusBarColor: '#3498db',
            cropperToolbarWidgetColor: 'white',
            cropperToolbarWidgetSize: 40,
            hideBottomControls: true,
            showCropFrame: true,
            showCropGrid: true,
            aspectRatio,
        }).then((croppedImage) => {
            setImage({ uri: croppedImage.path, width: croppedImage.width, height: croppedImage.height });
        }).catch((error) => {
            console.log('ImageCropPicker Error: ', error);
        });
    };

    const handleNext = () => {

        // console.log('Banner Image URI:', bannerImage ? bannerImage.uri : 'No banner image');
        // console.log('Profile Image URI:', profileImage ? profileImage.uri : 'No profile image');

        // // Show URIs in toast
        // ToastAndroid.show(
        //     `Banner Image URI: ${bannerImage ? bannerImage.uri : 'No banner image'}`,
        //     ToastAndroid.LONG,
        //     ToastAndroid.TOP,
        //     25,
        //     50
        // );

        // ToastAndroid.show(
        //     `Profile Image URI: ${profileImage ? profileImage.uri : 'No profile image'}`,
        //     ToastAndroid.LONG,
        //     ToastAndroid.TOP,
        //     25,
        //     50
        // );

        //sendImageToApi();

        navigation.navigate('ProfileCompletion4');
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
    console.log("Progress Percentage:", progressPercentage);

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
                            {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                />
                        </View>


                            <View style={styles.defaultContainer}>
                                {profileImage ? (
                                    <Image source={{ uri: profileImage.uri }} style={styles.previewImage} />
                                ) : (
                                    <Image source={defaultProfileImage} style={styles.defaultImage} />
                                )}
                            </View>



                            <TouchableOpacity onPress={handleProfileUpload} style={[commonStyles.button1, { marginTop: height * 0.001, marginBottom: height * 0.02, }]} activeOpacity={0.8}>
                                <Text style={commonStyles.buttonText1}>Select Photo</Text>
                            </TouchableOpacity>

                                                    <View style={styles.defaultContainer}>
                            {bannerImage ? (
                                <Image source={{ uri: bannerImage.uri }} style={styles.bannerImage} />
                            ) : (
                                <Image source={defaultBannerImage} style={styles.defaultBannerImage} />
                            )}
                        </View>


                            <TouchableOpacity onPress={handleBannerUpload} style={[commonStyles.button1, {  marginTop: height * 0.001, }]} activeOpacity={0.8}>
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

export default ProfileCompletion3;
