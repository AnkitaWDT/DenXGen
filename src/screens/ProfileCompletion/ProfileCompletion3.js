/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     Dimensions,
//     TextInput,
//     ScrollView,
//     Modal,
//     TouchableHighlight,
//     PixelRatio,
//     Keyboard,
//     TouchableWithoutFeedback,
//     ToastAndroid
// } from 'react-native';
// import Animation from '../../components/Loader';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import commonStyles from '../../components/CommonStyles';
// import { moderateScale } from 'react-native-size-matters';
// import ImagePicker from 'react-native-image-crop-picker';
// import { ProgressBar } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const { width, height } = Dimensions.get('window');

// const responsiveFontSize = (size) => {
//     const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
//     const newSize = size * scale;
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };


// const ProfileCompletion3 = ({ navigation }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [bannerImage, setBannerImage] = useState(null);
//     const [profileImage, setProfileImage] = useState(null);

//     const defaultBannerImage = require('../../../assets/img/DBanner.png');
//     const defaultProfileImage = require('../../../assets/img/DProfile.png');

//     // const handleBannerUpload = () => {
//     //     launchImagePicker('banner');
//     // };

//     // const handleProfileUpload = () => {
//     //     launchImagePicker('profile');
//     // };

//     // const launchImagePicker = (type) => {
//     //     const options = {
//     //         mediaType: 'photo',
//     //         cropping: false, // Set cropping to false initially
//     //     };

//     //     ImageCropPicker.openPicker(options).then((response) => {
//     //         if (!response.path) {
//     //             console.log('User cancelled image picker');
//     //             return;
//     //         }

//     //         const aspectRatio = type === 'banner' ? 16 / 9 : 1 / 1;

//     //         cropImage(response.path, aspectRatio, type === 'banner' ? setBannerImage : setProfileImage);
//     //         console.log('profileImage',profileImage);
//     //     }).catch((error) => {
//     //         console.log('ImagePicker Error: ', error);
//     //     });
//     // };

//     // const cropImage = (path, aspectRatio, setImage) => {
//     //     ImageCropPicker.openCropper({
//     //         path,
//     //         width: aspectRatio * 100,
//     //         height: 100,
//     //         cropperCircleOverlay: false,
//     //         cropping: true,
//     //         includeBase64: true,
//     //         freeStyleCropEnabled: true,
//     //         cropperToolbarTitle: 'Crop Image',
//     //         cropperToolbarColor: '#3498db',
//     //         cropperActiveWidgetColor: '#3498db',
//     //         cropperStatusBarColor: '#3498db',
//     //         cropperToolbarWidgetColor: 'white',
//     //         cropperToolbarWidgetSize: 40,
//     //         hideBottomControls: true,
//     //         showCropFrame: true,
//     //         showCropGrid: true,
//     //         aspectRatio,
//     //     }).then((croppedImage) => {
//     //         setImage({ uri: croppedImage.path, width: croppedImage.width, height: croppedImage.height });
//     //     }).catch((error) => {
//     //         console.log('ImageCropPicker Error: ', error);
//     //     });
//     // };

//     // const handleNext = async () => {
//     //     if (!profileImage || !profileImage.uri) {
//     //         console.error('No profile image selected.');
//     //         return;
//     //     }

//     //     console.log('Profile Image URI:', profileImage.uri);

//     //     const pr_id = await AsyncStorage.getItem('pr_id');
//     //     const id = parseInt(pr_id);

//     //     // Extract file name from URI
//     //     const uriComponents = profileImage.uri.split('/');
//     //     const fileName = uriComponents[uriComponents.length - 1];

//     //     //let formdata = new FormData();

//     //     // formdata.append('pr_id', id);
//     //     // formdata.append('profile_pic', {
//     //     //     uri: profileImage.uri,
//     //     //     name: fileName, // Use extracted file name
//     //     //     type: 'image/jpeg', // Adjust the file type as needed
//     //     // });

//     //     //console.log('Request Data:', formdata); // Log request data before sending

//     //     // fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', {
//     //     //     method: 'post',
//     //     //     headers: {
//     //     //         'Content-Type': 'multipart/form-data',
//     //     //     },
//     //     //     body: formdata
//     //     // })
//     //     //     .then(response => {
//     //     //         if (response.ok) {
//     //     //             console.log("Image uploaded successfully");
//     //     //         } else {
//     //     //             console.error("Failed to upload image. Status:", response.status);
//     //     //         }
//     //     //     })
//     //     //     .catch(err => {
//     //     //         console.error("Error uploading image:", err);
//     //     //     });


//     //     // const formData = new FormData();
//     //     // formData.append('pr_id', id);
//     //     // formData.append('profile_pic', {
//     //     //     uri: profileImage.uri,
//     //     //     name: profileImage.fileName,
//     //     //     type: profileImage.mime, 
//     //     // });

//     //     // console.log('FormData:', formData);

//     //     // try {
//     //     //     const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', {
//     //     //         method: 'POST',
//     //     //         body: formData,
//     //     //         headers: {
//     //     //             'Content-Type': 'multipart/form-data',
//     //     //         },
//     //     //     });

//     //     //     if (!response.ok) {
//     //     //         throw new Error(`HTTP error! Status: ${response.status}`);
//     //     //     }

//     //     //     const responseBody = await response.text(); // Get response body as text
//     //     //     console.log('Response Body:', responseBody);
//     //     // } catch (error) {
//     //     //     console.error('An error occurred:', error);
//     //     // }
//     // };


//     // const handleNext = async () => {
//     //     if (!profileImage || !profileImage.uri) {
//     //         console.error('No profile image selected.');
//     //         return;
//     //     }

//     //     console.log('Profile Image URI:', profileImage ? profileImage.uri : 'No profile image');

//     //     const pr_id = await AsyncStorage.getItem('pr_id');
//     //     const id = parseInt(pr_id);

//     //     const formData = new FormData();
//     //     formData.append('pr_id', id);
//     //     formData.append('profile_pic', {
//     //         uri: profileImage.uri,
//     //         name: 'profile_image.jpg',
//     //         type: 'image/jpeg', // Adjust the file type as needed
//     //     });
//     //     // Append other form data
//     //     //formData.append('pr_id', id);
//     //     //formData.append('other_field2', otherFieldValue2);
//     //     // Append more fields as needed

//     //     console.log('FormData:', formData);

//     //     try {
//     //         const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', {
//     //             method: 'POST',
//     //             body: formData,
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data',
//     //             },
//     //         });

//     //         if (!response.ok) {
//     //             throw new Error(`HTTP error! Status: ${response.status}`);
//     //         }

//     //         const responseBody = await response.text(); // Get response body as text
//     //         console.log('Response Body:', responseBody);
//     //     } catch (error) {
//     //         console.error('An error occurred:', error);
//     //     }



//     //     // try {
//     //     //     const response = await axios.post('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', formData, {
//     //     //         headers: {
//     //     //             'Content-Type': 'multipart/form-data',
//     //     //         },
//     //     //     });

//     //     //     console.log('Response:', response.data);
//     //     //     console.log('Data Added to database');
//     //     // } catch (error) {
//     //     //     console.error('An error occurred:', error);
//     //     // }
//     // };

//     // const handleNext = async () => {
//     //     // Check if profileImage is available
//     //     if (!profileImage || !profileImage.uri) {
//     //         console.error('No profile image selected.');
//     //         return;
//     //     }

//     //     console.log('Profile Image URI:', profileImage ? profileImage.uri : 'No profile image');

//     //     const pr_id = await AsyncStorage.getItem('pr_id');
//     //     const id = parseInt(pr_id);

//     //     // Convert image URI to a file
//     //     const profileImageFile = await RNFetchBlob.fs.readFile(profileImage.uri, 'base64');
//     //     const profileImageFormData = new FormData();
//     //     profileImageFormData.append('profile_pic', {
//     //         uri: profileImage.uri,
//     //         name: 'profile_image.jpg',
//     //         type: 'image/jpeg', // Adjust the file type as needed
//     //     });

//     //     profileImageFormData.append('pr_id', id);

//     //     console.log('Profile Image FormData:', profileImageFormData);

//     //     // try {
//     //     //     const response = await axios.post('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', profileImageFormData, {
//     //     //         headers: {
//     //     //             'Content-Type': 'multipart/form-data',
//     //     //         },
//     //     //     });

//     //     //     console.log('Response:', response.data);
//     //     //     console.log('Data Added to database');
//     //     // } catch (error) {
//     //     //     console.error('An error occurred:', error);
//     //     // }
//     // };

//     // const handleNext = async () => {

//     //     console.log('Banner Image URI:', bannerImage ? bannerImage.uri : 'No banner image');
//     //     console.log('Profile Image URI:', profileImage ? profileImage.uri : 'No profile image');

//     //     const pr_id = await AsyncStorage.getItem('pr_id');
//     //     const id = parseInt(pr_id);

//     //     const userImages = {
//     //         pr_id: id,
//     //         //bannerImage: bannerImage.uri,
//     //         profile_pic: profileImage.uri,
//     //     };

//     //     console.log(userImages);

//     //     try {
//     //         const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php`, userImages);

//     //         console.log('dataresponse', response.data);
//     //         //ToastAndroid.show("Product Added Successfully!", ToastAndroid.SHORT);
//     //         console.log('Data Added to database');
//     //     } catch (error) {
//     //         console.error('An error occurred:', error);
//     //     }

//     //     // // Show URIs in toast
//     //     // ToastAndroid.show(
//     //     //     `Banner Image URI: ${bannerImage ? bannerImage.uri : 'No banner image'}`,
//     //     //     ToastAndroid.LONG,
//     //     //     ToastAndroid.TOP,
//     //     //     25,
//     //     //     50
//     //     // );

//     //     // ToastAndroid.show(
//     //     //     `Profile Image URI: ${profileImage ? profileImage.uri : 'No profile image'}`,
//     //     //     ToastAndroid.LONG,
//     //     //     ToastAndroid.TOP,
//     //     //     25,
//     //     //     50
//     //     // );

//     //     //sendImageToApi();

//     //     //navigation.navigate('ProfileCompletion4');
//     //     //console.log('ProfileCompletion4');
//     // };


//     useEffect(() => {
//         // Simulate an asynchronous operation (e.g., fetching data) before rendering the profile screen
//         const fakeAsyncOperation = async () => {
//             // Add any asynchronous logic here if needed
//             // For now, just simulate a delay
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             // Set loading state to false after the delay
//             setIsLoading(false);
//         };

//         // Execute the fakeAsyncOperation
//         fakeAsyncOperation();
//     }, []);

//     const currentStep = 3; // For example, current step is 4
//     const totalSteps = 9; // Total number of steps

//     const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
//     console.log("Progress Percentage:", progressPercentage);




//     const handleProfileUpload = () => {

//     }


//     const [selectedImage, setSelectedImage] = useState(null);

//     const openImagePicker = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 400,
//             cropping: true,
//         }).then(image => {
//             setSelectedImage(image);
//             console.log(selectedImage);
//         }).catch(error => {
//             console.error('Error while picking image: ', error);
//         });
//     };


//     const formData = new FormData();
//     formData.append('image', {
//         uri: selectedImage.path,
//         type: selectedImage.mime,
//         name: selectedImage.filename,
//     });

//     // Append other form data fields if needed
//     // formData.append('field_name', field_value);

//     // Send the formData to your server using fetch or any other method
//     const response = fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls3-ax.php', {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//             // Add any additional headers here
//         },
//     });

//     // Handle the response from the server
//     const responseData = response.json();
//     console.log(responseData);






//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             {isLoading ? (
//                 <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
//                     <Animation />
//                 </View>

//             ) : (
//                 <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

//                     <View style={styles.contentContainer}>

//                         <View style={styles.headerTextContainer}>
//                             <Text style={[commonStyles.headerText1BL, {
//                                 marginBottom: moderateScale(6), textAlign: 'center'
//                                 }]}>Step 3 - Update Photo</Text>
//                             <Text style={[commonStyles.headerText2BL, {
//                                 textAlign: 'center', paddingHorizontal: width * 0.02
//                             }]}>Choose your career category and unlock endless possibilities.</Text>
//                             {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
//                                 <ProgressBar
//                                     progress={progressPercentage / 100}
//                                     color="#00B0FF"
//                                     style={commonStyles.progImage}
//                                 />
//                         </View>


//                             <View style={styles.defaultContainer}>
//                                 {profileImage ? (
//                                     <Image source={{ uri: profileImage.uri }} style={styles.previewImage} />
//                                 ) : (
//                                     <Image source={defaultProfileImage} style={styles.defaultImage} />
//                                 )}
//                             </View>



//                             <TouchableOpacity onPress={openImagePicker} style={[commonStyles.button1, { marginTop: height * 0.001, marginBottom: height * 0.02, }]} activeOpacity={0.8}>
//                                 <Text style={commonStyles.buttonText1}>Select Photo</Text>
//                             </TouchableOpacity>

//                                                     <View style={styles.defaultContainer}>
//                             {bannerImage ? (
//                                 <Image source={{ uri: bannerImage.uri }} style={styles.bannerImage} />
//                             ) : (
//                                 <Image source={defaultBannerImage} style={styles.defaultBannerImage} />
//                             )}
//                         </View>


//                             {/* <TouchableOpacity onPress={handleBannerUpload} style={[commonStyles.button1, {  marginTop: height * 0.001, }]} activeOpacity={0.8}>
//                             <Text style={commonStyles.buttonText1}>Select Banner Photo</Text>
//                         </TouchableOpacity> */}



//                             <TouchableOpacity
//                                 style={[commonStyles.button]}
//                                 //onPress={handleNext}
//                                 activeOpacity={0.8}
//                             >
//                                 <Text style={commonStyles.buttonText}>Continue</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={[commonStyles.button1, { marginBottom: height * 0.05, marginTop: height * 0.001, }]}
//                                 activeOpacity={0.8}>
//                                 <Text style={commonStyles.buttonText1}>Skip</Text>
//                             </TouchableOpacity>

//                     </View>
//                 </ScrollView>
//             )}
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         backgroundColor: '#FEFCFC',
//         paddingHorizontal: moderateScale(16),
//     },
//     contentContainer: {
//         marginTop: moderateScale(32),
//         //justifyContent: 'center',
//         alignItems: 'center',
//         //marginTop: height * 0.00,
//     },
//     headerTextContainer: {
//         width: '100%',
//         alignItems: 'center',
//         //zIndex: 1,
//     },
//     previewImage: {
//         width: width * 0.45, 
//         height: width * 0.45,
//         marginVertical: 10,
//         borderRadius: 200 / 2,
//     },

//     defaultImage: {
//         width: width * 0.45,
//         height: width * 0.45,
//         marginVertical: 10,
//         resizeMode: 'cover',
//     },
//     bannerImage: {
//         width: width * 0.85,
//         height: height * 0.2,
//         marginVertical: 10,
//     },
//     defaultBannerImage: {
//         width: width * 0.85,
//         height: height * 0.2,
//         marginVertical: 10,
//         resizeMode: 'cover',
//     },
// });

// export default ProfileCompletion3;



import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileCompletion3 = () => {
    const [pickedVideo, setPickedVideo] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const pickVideo = async () => {
        try {
            const video = await ImagePicker.openPicker({
                mediaType: 'video',
                //cropping: true,
            });

            setPickedVideo(video);
            sendVideo(video); // Call sendVideo function immediately after picking the video
        } catch (error) {
            console.log(error);
        }
    };

    const sendVideo = async (profile_video) => {
        setIsSending(true);

        let formData = new FormData();
        if (profile_video) {
            formData.append('profile_video', {
                uri: profile_video.path,
                type: profile_video.mime,
                name: 'video.mp4',
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

            fetch('https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls33-ax.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => response.text()) // Get the response text directly
                .then(data => {
                    console.log('Video upload response:', data); // Log the response text
                })
                .catch(error => {
                    console.error('Error uploading video:', error);
                })
                .finally(() => {
                    setIsSending(false);
                });
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {pickedVideo && (
                <Video source={{ uri: pickedVideo.path }} style={{ width: 200, height: 200 }} />
            )}
            <Button title="Select Video" onPress={pickVideo} />
            
        </View>
    );
};



export default ProfileCompletion3;
