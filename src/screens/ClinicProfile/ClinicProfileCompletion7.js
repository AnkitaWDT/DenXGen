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

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ClinicProfileCompletion7 = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [videoPath, setVideoPath] = useState(null);
    const [imagePaths, setImagePaths] = useState([]);

    useEffect(() => {
        if (videoPath && imagePaths.length === 5) {
            // Both video and 5 images are uploaded
            // navigation.navigate('HomeScreen');
        }
    }, [navigation, videoPath, imagePaths]);

    const handleVideoUpload = () => {
        ImagePicker.openPicker({
            mediaType: 'video',
        }).then((response) => {
            if (response.path) {
                setVideoPath(response.path);
            }
        });
    };

    const handleImageUpload = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
        }).then((responses) => {
            if (responses.length + imagePaths.length > 5) {
                // If the total number of images would exceed 5, show an alert.
                //Alert.alert('Limit Exceeded', 'You can upload a maximum of 5 images.');
                ToastAndroid.show('You can upload a maximum of 5 images.', ToastAndroid.SHORT);
            } else {
                // Append the selected images to the existing images, up to a maximum of 5.
                const paths = responses.map((response) => response.path);
                setImagePaths([...imagePaths, ...paths.slice(0, 5 - imagePaths.length)]);
            }
        });
    };


    const handleRemoveImage = (index) => {
        const updatedImages = [...imagePaths];
        updatedImages.splice(index, 1);
        setImagePaths(updatedImages);
    };

    const handleNext = () => {
        if (videoPath && imagePaths.length === 5) {
            navigation.navigate('ClinicProfileCompletion8');
        } else {
            //Alert.alert('Incomplete', 'Please upload both video and 5 images.');
            ToastAndroid.show('Please upload both video and 5 images.', ToastAndroid.SHORT);

        }
    };

    const handleSkip = () => {
        navigation.navigate('ClinicProfileCompletion8');
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

    const currentStep = 7; // For example, current step is 4
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
                                marginBottom: 6, textAlign: 'center'
                            }]}>Step 7 - Gallery</Text>
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

                        <View style={{ marginBottom: height * 0.025, }}>
                            <Text style={[commonStyles.headerText4BL, {
                                marginBottom: height * 0.009,
                            }]}>Upload Video here </Text>


                            <TouchableOpacity
                                style={styles.uploadBanner}
                                onPress={handleVideoUpload}
                            >
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

                        <View style={{ marginBottom: height * 0.001, }}>
                            {/* Image Upload Section */}
                            <Text style={[commonStyles.headerText4BL, {
                                marginBottom: height * 0.005,
                            }]}>Upload Photos here</Text>
                            <View style={{ justifyContent: 'center' }}>
                                <View style={styles.imageGrid}>
                                    {imagePaths.map((path, index) => (
                                        <View key={index} style={[styles.imageContainer, index % 3 !== 2 && { marginRight: '5%' }]}>
                                            <Image source={{ uri: path }} style={styles.defaultImageU} />
                                            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveImage(index)}>
                                                <Image source={require('../../../assets/img/remove.png')} style={styles.removeIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {[...Array(Math.max(0, 5 - imagePaths.length))].map((_, index) => (
                                        <TouchableOpacity key={index} style={[styles.imageContainer, index % 3 !== 2 && { marginRight: '5%' }]} onPress={handleImageUpload}>
                                            <View style={styles.defaultImageContainer}>
                                                <Image source={require('../../../assets/img/Add.png')} style={styles.defaultImage} />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                        </View>


                        <TouchableOpacity
                            style={[commonStyles.button]}
                            onPress={handleNext}
                            activeOpacity={0.8}
                        >
                            <Text style={commonStyles.buttonText}>Continue</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[commonStyles.button1, { marginBottom: height * 0.05, marginTop: height * 0.001, }]}
                            activeOpacity={0.8}
                            onPress={handleSkip}>
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
        paddingHorizontal: 16,
    },
    contentContainer: {
        marginTop: 32,
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
        backgroundColor: '#f0f0f0',
        position: 'relative',
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
        justifyContent: 'flex-start', // Updated to 'flex-start'
        marginBottom: height * 0.01,
        //marginLeft: '6%',
    },
    imageContainer: {
        width: width * 0.272,
        height: width * 0.272,
        aspectRatio: 1,
        position: 'relative',
        marginVertical: 7,
        //marginRight: '5%',
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
        backgroundColor: '#F4F4F4', // Set the background color to grey
        justifyContent: 'center',
        alignItems: 'center',
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
