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
import ImagePicker from 'react-native-image-crop-picker';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertPopup from '../../components/AlertPopup';
const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ClinicProfileCompletion7 = ({ navigation, route }) => {
    const { cl_id } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [videoPath, setVideoPath] = useState(null);
    const [imagePaths, setImagePaths] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [removingIndex, setRemovingIndex] = useState(null);

    const [imageInfo, setImageInfo] = useState([]);


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

    const pickVideo = async () => {
        try {
            const video = await ImagePicker.openPicker({
                mediaType: 'video',
            });
            setVideoPath(video.path); // Update the videoPath state with the selected video path
            sendVideo(video);
        } catch (error) {
            console.log(error);
        }
    };

    const sendVideo = async (profile_video) => {
        try {
            if (profile_video) {
                const formData = new FormData();
                formData.append('profile_video', {
                    uri: profile_video.path,
                    type: profile_video.mime,
                    name: 'video.mp4',
                });
                //const cl_id = await AsyncStorage.getItem('cl_id');
                if (cl_id) {
                    formData.append('cl_id', parseInt(cl_id));
                }
                const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqclinicvideo-ax.php', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (!response.ok) {
                    throw new Error('Banner image upload failed');
                }
                const data = await response.json();
                console.log('Video upload response:', data);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const handleImageUpload = async () => {
        try {
            const response = await ImagePicker.openPicker({
                mediaType: 'photo',
            });

            if (response.path) {
                const formData = new FormData();
                formData.append('gal_image', {
                    uri: response.path,
                    type: 'image/jpeg',
                    name: `image_${imageInfo.length + 1}.jpg`,
                });

                //const cl_id = await AsyncStorage.getItem('cl_id');
                if (cl_id) {
                    formData.append('cl_id', parseInt(cl_id));
                }

                const uploadResponse = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqclinicgallery-ax.php', {
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
                if (responseData && responseData.data && responseData.data.cl_gal_id) {
                    setImageInfo(prevInfo => [...prevInfo, { path: response.path, cl_gal_id: responseData.data.cl_gal_id }]);
                } else {
                    throw new Error('Invalid response format');
                }
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            ToastAndroid.show('Error uploading image. Please try again.', ToastAndroid.SHORT);
        }
    };

    const handleRemoveImage = (index) => {
        setRemovingIndex(index);
        setShowPopup(true);
    };

    const confirmRemoveImage = async () => {
        try {
            const cl_gal_id = imageInfo[removingIndex].cl_gal_id;
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqdelclinicgallery-ax.php?cl_gal_id=${cl_gal_id}`);

            if (!response.ok) {
                throw new Error('Failed to remove image');
            }

            console.log(response);

            const updatedImages = [...imageInfo];
            updatedImages.splice(removingIndex, 1);
            setImageInfo(updatedImages);
            setShowPopup(false);
        } catch (error) {
            console.error('Error removing image:', error);
            ToastAndroid.show('Failed to remove image. Please try again.', ToastAndroid.SHORT);
        }
    };

    const cancelRemoveImage = () => {
        setRemovingIndex(null);
        setShowPopup(false);
    };

    // const handleRemoveImage = (index) => {
    //     const updatedImages = [...imagePaths];
    //     updatedImages.splice(index, 1);
    //     setImagePaths(updatedImages);
    // };

    const handleNext = () => {
        // if (videoPath && imagePaths.length === 5) {
        //     //navigation.navigate('ProfileCompletion5');
        //     navigation.navigate('ClinicProfileCompletion8', { cl_id: cl_id });
        // } else {
        //     ToastAndroid.show('Please upload both video and 5 images.', ToastAndroid.SHORT);
        // }
        navigation.navigate('ClinicProfileCompletion8', { cl_id: cl_id });
    };

    const handleSkip = () => {
        //navigation.navigate('ClinicProfileCompletion8');
        navigation.navigate('ClinicProfileCompletion8', { cl_id: cl_id });
    };

    const currentStep = 7; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    {/* Placeholder for loading animation */}
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <View style={styles.contentContainer}>
                        <View style={styles.headerTextContainer}>
                            <Text style={[commonStyles.headerText1BL, { marginBottom: 6, textAlign: 'center' }]}>
                                Step 7 - Gallery
                            </Text>
                            <Text style={[commonStyles.headerText2BL, { textAlign: 'center', paddingHorizontal: '2%' }]}>
                                Choose your career category and unlock endless possibilities.
                            </Text>
                            <ProgressBar progress={progressPercentage / 100} color="#00B0FF" style={commonStyles.progImage} />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={[commonStyles.headerText4BL, { marginBottom: 10 }]}>Upload Video here </Text>
                            <TouchableOpacity style={styles.uploadBanner} onPress={pickVideo}>
                                <View style={styles.videoContainer}>
                                    {videoPath ? (
                                        <View style={styles.bannerClickArea}>
                                            <Image source={{ uri: videoPath }} style={styles.BannerImage} />
                                        </View>
                                    ) : (
                                        <View style={styles.bannerClickArea}>
                                            <Image source={require('../../../assets/img/Add.png')} style={styles.defaultBannerImage} />
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={[commonStyles.headerText4BL, { marginBottom: 5 }]}>Upload Photos here</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <View style={styles.imageGrid}>
                                    {imageInfo.map((info, index) => (
                                        <View key={index} style={styles.imageContainer}>
                                            <Image source={{ uri: info.path }} style={styles.defaultImageU} />
                                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                                                <Image source={require('../../../assets/img/remove.png')} style={styles.removeIcon} />
                                            </TouchableOpacity>
                                            <AlertPopup
                                                visible={showPopup}
                                                onRequestClose={() => setShowPopup(false)}
                                                title="Confirm Removal"
                                                message="Are you sure you want to remove this image?"
                                                yesLabel="Yes"
                                                noLabel="No"
                                                onYesPress={confirmRemoveImage}
                                                onNoPress={cancelRemoveImage}
                                            />
                                        </View>
                                    ))}
                                    {[...Array(Math.max(0, 6 - imageInfo.length))].map((_, index) => (
                                        <TouchableOpacity key={index} style={styles.imageContainer} onPress={handleImageUpload}>
                                            <View style={styles.defaultImageContainer}>
                                                <Image source={require('../../../assets/img/Add.png')} style={styles.defaultImage} />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={[commonStyles.button]} onPress={handleNext} activeOpacity={0.8}>
                            <Text style={commonStyles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[commonStyles.button1, { marginBottom: 20 }]} onPress={handleSkip} activeOpacity={0.8}>
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
        //alignItems: 'center',
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

    uploadBanner: {
        width: '100%',
        aspectRatio: 16 / 9,
        paddingBottom: '50%', // Aspect ratio of 3:4
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2, // Adjust the opacity as needed
        shadowRadius: 1,
        elevation: 2, // Android shadow
    },

    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9, // Adjust aspect ratio as needed
        //backgroundColor: '#000', // Fallback color for when video is loading or not available
    },
    bannerClickArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BannerImage: {
        width: '100%',
        height: '100%',
    },
    defaultBannerImage: {
        width: 50,
        height: 50,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: height * 0.01,
        //paddingHorizontal: '3%', 
    },
    imageContainer: {
        width: '30%', // Adjust width to allow space between images
        aspectRatio: 1,
        position: 'relative',
        marginVertical: 7,
    },
    defaultImageU: {
        flex: 1,
        width: '100%',
        // borderWidth: 1,
        // borderColor: '#289EF5',
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
        padding: 5,
        zIndex: 1,
    },
    removeIcon: {
        width: 20,
        height: 20,
    },
    defaultImageContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2, // Adjust the opacity as needed
        shadowRadius: 1,
        elevation: 2, // Android shadow
    },
    defaultImage: {
        //flex: 1,
        height: 39,
        width: 39,
        // borderWidth: 1,
        // borderColor: '#289EF5',
    },
});


export default ClinicProfileCompletion7;
