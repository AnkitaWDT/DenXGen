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
    ToastAndroid,
    Platform
} from 'react-native';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ProgressBar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

    const handleProfileUpload = async () => {
        // Call pickImage function with type 'profile'
        await pickImage('profile');
        // After selecting the profile image, directly call the image upload function
        await uploadProfileImage(profileImage);
    };

    const uploadProfileImage = async () => {
        try {
            const response = await ImagePicker.openPicker({
                mediaType: 'photo',
            });

            if (response.path) {
                const formData = new FormData();
                formData.append('profile_pic', {
                    uri: response.path,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                });

                const pr_id = await AsyncStorage.getItem('pr_id');
                if (pr_id) {
                    formData.append('pr_id', parseInt(pr_id));
                }

                const uploadResponse = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls31-ax.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(uploadResponse);

                if (!uploadResponse.ok) {
                    throw new Error('Upload failed');
                }

                const responseData = await uploadResponse.json();

                console.log(responseData);
                if (responseData && responseData.data && responseData.data.pr_gal_id) {
                    setProfileImage(response.path);
                } else {
                    throw new Error('Invalid response format');
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            //ToastAndroid.show('Error uploading image. Please try again.', ToastAndroid.SHORT);
        }
    };

    // const uploadProfileImage = async (profile_pic) => {
    //     try {
    //         // Check if profile image is selected
    //         if (profile_pic) {
    //             // Create formData object
    //             const formData = new FormData();
    //             // Append image data to formData
    //             formData.append('profile_pic', {
    //                 uri: profile_pic.path,
    //                 type: profile_pic.mime,
    //                 name: 'image.jpg',
    //             });

    //             const pr_id = await AsyncStorage.getItem('pr_id');
    //             const id = parseInt(pr_id);
    //             console.log(id);
    //             console.log(pr_id);
    //             if (id) {
    //                 console.log(id);
    //                 formData.append('pr_id', id);
    //             }
    //             console.log(formData);
    //             // Send formData to the server for profile image upload
    //             const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls31-ax.php', {
    //                 method: 'POST',
    //                 body: formData,
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     // Add any additional headers if required
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Profile image upload failed');
    //             }
    //             // Log the response to debug
    //             //setProfileImage(profile_pic);
    //             const responseData = await response.text();
    //             console.log('Response from server:', responseData);
    //         }
    //     } catch (error) {
    //         ToastAndroid.show('Error uploading profile image', ToastAndroid.SHORT);
    //     }
    // };

    const handleBannerUpload = async () => {
        // Call pickImage function with type 'banner'
        await pickImage('banner');
        // After selecting the banner image, directly call the image upload function
        await uploadBannerImage(bannerImage);
    };

    const uploadBannerImage = async (profile_banner) => {
        try {
            // Check if banner image is selected
            if (profile_banner) {
                // Create formData object
                const formData = new FormData();
                // Append image data to formData
                formData.append('profile_banner', {
                    uri: profile_banner.path,
                    type: profile_banner.mime,
                    name: 'image.jpg',
                });

                const pr_id = await AsyncStorage.getItem('pr_id');
                const id = parseInt(pr_id);
                console.log(id);
                console.log(pr_id);
                if (id) {
                    console.log(id);
                    formData.append('pr_id', id);
                }
                console.log(formData);
                // Send formData to the server for banner image upload
                const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls32-ax.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        // Add any additional headers if required
                    },
                });
                if (!response.ok) {
                    throw new Error('Banner image upload failed');
                }

                //setBannerImage(profile_banner);
                const data = await response.json();
                console.log('Banner image uploaded successfully:', data);
            }
        } catch (error) {
            //ToastAndroid.show('Error uploading banner image', ToastAndroid.SHORT);
        }
    };

    const handleSkip = () => {
        navigation.navigate('ProfileCompletion4');
    };


    const pickImage = async (type) => {
        try {
            // const image = await ImagePicker.openPicker({
            //     width: 400,
            //     height: 400,
            //     cropping: true,
            // });

            let aspectRatio;
            if (type === 'profile') {
                aspectRatio = [1, 1]; // 1:1 aspect ratio for profile images
            } else if (type === 'banner') {
                aspectRatio = [16, 9]; // 16:9 aspect ratio for banner images
            }

            const image = await ImagePicker.openPicker({
                width: type === 'profile' ? 400 : 1200,
                height: 'profile' ? 400 : 900,
                cropping: true,
                //cropperCircleOverlay: type === 'profile', // Circular cropping overlay for profile images
                cropperToolbarTitle: type === 'profile' ? 'Crop Profile Image' : 'Crop Banner Image', // Custom title for cropper toolbar
                cropperActiveWidgetColor: '#FF0000', // Custom color for active cropper widget
                cropperStatusBarColor: '#000000', // Custom status bar color for cropper
                cropperToolbarColor: '#FFFFFF', // Custom toolbar color for cropper
                cropperToolbarWidgetColor: '#000000', // Custom toolbar widget color for cropper
                cropperToolbarTitleColor: '#000000', // Custom toolbar title color for cropper
                cropperCircleOverlayColor: 'rgba(0,0,0,0.5)', // Custom circle overlay color for profile images
                cropperCancelText: 'Cancel', // Custom cancel button text
                cropperChooseText: 'Choose', // Custom choose button text
                cropperBackgroundColor: '#FFFFFF', // Custom background color for cropper
                freeStyleCropEnabled: true, // Enable/disable free style cropping
                aspectRatio: aspectRatio, // Set aspect ratio for cropping
                //maxSize: 1024 * 10,
            });

            const sizeInKB = image.size / 1024;
            if (sizeInKB > 1000) {
                ToastAndroid.show('Selected image exceeds 1MB limit', ToastAndroid.SHORT);
                return; // Exit function if image exceeds size limit
            }


            // if (Platform.OS === 'ios') {
            //     Image.getSize(image.path, (width, height) => {
            //         console.log('Image dimensions:', { width, height });
            //     });
            // } else {
            //     const { width, height } = await Image.getSize(image.path);
            //     console.log('Image dimensions:', { width, height });
            // }

            if (type === 'profile') {
                setProfileImage(image);
            } else if (type === 'banner') {
                setBannerImage(image);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleNext = async () => {
        // Upload profile image
        // if (profileImage) {
        //     const formData = new FormData();
        //     formData.append('image', {
        //         uri: profileImage.path,
        //         type: profileImage.mime,
        //         name: 'image.jpg',
        //     });

        //     const pr_id = await AsyncStorage.getItem('pr_id');
        //     const id = parseInt(pr_id);
        //     if (id) {
        //         formData.append('pr_id', id);
        //     }
        //     //console.log(formData);

        //     fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqimagedata-temp-ax.php', {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             // Add any additional headers if required
        //         },
        //     })
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.json();
        //         })
        //         .then(data => {
        //             console.log('Image uploaded successfully:', data);
        //             //navigation.navigate('ProfileCompletion4');
        //         })
        //         .catch(error => {
        //             console.error('Error uploading image:', error);
        //             // Handle error
        //         });
        // }

        // if (bannerImage) {
        //     const formData = new FormData();
        //     formData.append('image', {
        //         uri: bannerImage.path,
        //         type: bannerImage.mime,
        //         name: 'image.jpg',
        //     });

        //     //console.log(formData);

        //     fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqimagedata-temp-ax.php', {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             // Add any additional headers if required
        //         },
        //     })
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.json();
        //         })
        //         .then(data => {
        //             console.log('Image uploaded successfully:', data);
        //             //navigation.navigate('ProfileCompletion4');
        //         })
        //         .catch(error => {
        //             console.error('Error uploading image:', error);
        //             // Handle error
        //         });
        // }

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
                                    <Image source={{ uri: profileImage.path }} style={styles.previewImage} />
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
                                activeOpacity={0.8}
                                 onPress={handleSkip} >
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
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#121212'
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
        borderWidth: 1,
        borderColor: '#121212',
        borderRadius: 10,
    },
    defaultBannerImage: {
        width: width * 0.85,
        height: height * 0.2,
        marginVertical: 10,
        resizeMode: 'cover',
    },
});

export default NDProfileCompletion3;
