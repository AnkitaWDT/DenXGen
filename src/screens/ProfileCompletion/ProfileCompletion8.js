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
    ToastAndroid
} from 'react-native';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { moderateScale } from 'react-native-size-matters';

import commonStyles from '../../components/CommonStyles';
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ProfileCompletion8 = ({ navigation }) => {

    const [isSocialModalVisible, setIsSocialModalVisible] = useState(false);
    const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
    const [isAwardsModalVisible, setIsAwardsModalVisible] = useState(false);
    const [isPublicationsModalVisible, setIsPublicationsVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [textareaValues, setTextareaValues] = useState({
        socialmedia: '',
        videolinks: [''],
        awards: [''],
        publications: [''],
        // licencesNumber: '',
        // selectGender: '',
        // selectProfession: '',
        // availableForHomeVisits: '',
    });

    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [awardsModalVisible, setAwardsModalVisible] = useState(false);
    const [blogsModalVisible, setBlogsModalVisible] = useState(false);

    const [videoInputs, setVideoInputs] = useState([]);
    const [awardsInputs, setAwardsInputs] = useState([]);
    const [blogsInputs, setBlogsInputs] = useState([]);
    const [newInputValue, setNewInputValue] = useState('');

    const [socialModalVisible, setSocialModalVisible] = useState(false);

    const [instaLink, setInstaLink] = useState(null);
    const [whatsappLink, setWhatsappLink] = useState(null);
    const [linkedinLink, setLinkedInLink] = useState(null);
    const [facebookLink, setFacebookLink] = useState(null);
    const [otherLink, setOtherLink] = useState(null);


    const openModalA = () => {
        setSocialModalVisible(true);
    };

    const closeModalA = () => {
        setSocialModalVisible(false);
    };


    const handleAddVideoInput = () => {
        if (videoInputs.length < 5) {
            setVideoModalVisible(true);
        }
    };

    const handleAddAwardsInput = () => {
        if (awardsInputs.length < 5) {
            setAwardsModalVisible(true);
        }
    };
    const handleAddBlogsInput = () => {
        if (blogsInputs.length < 5) {
            setBlogsModalVisible(true);
        }
    };

    const handleVideoModalSubmit = () => {
        if (videoInputs.length < 5) {
            const newInputs = [...videoInputs, newInputValue];
            setVideoInputs(newInputs);
        }
        setVideoModalVisible(false);
        setNewInputValue('');
    };

    const handleAwardsModalSubmit = () => {

        if (awardsInputs.length < 5) {
            const newInputs = [...awardsInputs, newInputValue];
            setAwardsInputs(newInputs);
        }
        setAwardsModalVisible(false);
        setNewInputValue('');
    };


    const handleBlogsModalSubmit = () => {
        if (blogsInputs.length < 5) {
            const newInputs = [...blogsInputs, newInputValue];
            setBlogsInputs(newInputs);
        }
        setBlogsModalVisible(false);
        setNewInputValue('');
    };

    const handleRemoveVideoInput = (indexToRemove) => {
        const updatedVideo = videoInputs.filter((_, index) => index !== indexToRemove);
        setVideoInputs(updatedVideo);
    };

    const handleRemoveAwardsInput = (indexToRemove) => {
        const updatedAwards = awardsInputs.filter((_, index) => index !== indexToRemove);
        setAwardsInputs(updatedAwards);
    };


    const handleRemoveBlogsInput = (indexToRemove) => {
        const updatedBlogs = blogsInputs.filter((_, index) => index !== indexToRemove);
        setBlogsInputs(updatedBlogs);
    };



    const [isLoading, setIsLoading] = useState(true);

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


    const openModal = (field) => {
        setCurrentField(field);
        if (field === 'socialmedia') {
            setIsSocialModalVisible(true);
        } else if (field === 'videolinks') {
            setIsVideoModalVisible(true);
        } else if (field === 'awards') {
            setIsAwardsModalVisible(true);
        } else if (field === 'publications') {
            setIsPublicationsVisible(true);
        }
    };

    const closeModal = () => {
        setCurrentField('');
        setIsSocialModalVisible(false);
        setIsVideoModalVisible(false);
        setIsAwardsModalVisible(false);
        setIsPublicationsVisible(false);
        ;
    };

    const handleTextareaSubmit = () => {
        console.log(`${currentField} value:`, textareaValues[currentField]);
        closeModal();
    };

    const handleSocialChange = (text) => {
        setTextareaValues({ ...textareaValues, socialmedia: text });
    };

    const handleVideoChange = (index, text) => {
        const updatedVideos = [...textareaValues.videolinks];
        updatedVideos[index] = text;
        setTextareaValues({ ...textareaValues, videolinks: updatedVideos });
    };

    const handleAddMoreVideo = () => {
        const updatedVideos = [...textareaValues.videolinks, ''];
        setTextareaValues({ ...textareaValues, videolinks: updatedVideos });
    };

    const handleAwardsChange = (index, text) => {
        const updatedAwards = [...textareaValues.awards];
        updatedAwards[index] = text;
        setTextareaValues({ ...textareaValues, awards: updatedAwards });
    };

    const handleAddMoreAwards = () => {
        const updatedAwards = [...textareaValues.awards, ''];
        setTextareaValues({ ...textareaValues, awards: updatedAwards });
    };

    const handlePublicationsChange = (index, text) => {
        const updatedPublications = [...textareaValues.publications];
        updatedPublications[index] = text;
        setTextareaValues({ ...textareaValues, publications: updatedPublications });
    };

    const handleAddMorePublications = () => {
        const updatedPublications = [...textareaValues.publications, ''];
        setTextareaValues({ ...textareaValues, publications: updatedPublications });
    };

    const currentStep = 8; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    //console.log("Progress Percentage:", progressPercentage);


        const handleNext = async () => {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);

            const socialMediaArray = [
                { instagram: instaLink || "" },
                { linkedIn: linkedinLink || "" },
                { facebook: facebookLink || "" },
                { other: otherLink || "" }
            ];


            const userData = {
                pr_id: id,
                vid_id: videoInputs,
                awa_id: awardsInputs,
                pub_id: blogsInputs,
                // socialMedia: [
                //     instaLink || "", // Instagram link
                //     linkedinLink || "", // LinkedIn link
                //     facebookLink || "", // Facebook link
                //     otherLink || "" // Other link
                // ],
                soc_id: socialMediaArray,
                //  socialMedia: {
                //     instagram: instaLink || "",
                //     linkedIn: linkedinLink || "",
                //     facebook: facebookLink || "",
                //     other: otherLink || "",
                // },    
            };

            try {
                const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls8-ax.php`, userData);

                console.log('dataresponse', response.data);
                ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            } catch (error) {
                console.error('An error occurred:', error);
            }

            console.log('User Data:', userData);
            navigation.navigate('HomeScreen');
        };


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
                              }]}>Step 8 - Gallery</Text>
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

                          <View style={styles.inputContainerWithLabel}>
                              <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                  Video Links <Text style={styles.requiredIndicator}>*</Text>
                              </Text>
                              {videoInputs.map((value, index) => (
                                  <View style={[styles.inputContainer1]}>
                                      <TextInput
                                          style={styles.inputs}
                                          placeholder="Video Links"
                                          placeholderTextColor="#979797"
                                          value={value}
                                          underlineColorAndroid="transparent"
                                      />
                                      <TouchableOpacity onPress={() => handleRemoveVideoInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                          <Image
                                              source={require('../../../assets/img/close.png')} // Close image for removing key forte
                                              style={styles.closeImage}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              ))}
                              {videoInputs.length < 5 && (
                                  <TouchableOpacity onPress={handleAddVideoInput} style={styles.inputContainer1} activeOpacity={0.8}>
                                      <Text style={[styles.inputsP, { textAlignVertical: 'center' }]}>Video Links</Text>
                                  </TouchableOpacity>
                              )}

                              <Modal
                                  visible={videoModalVisible}
                                  transparent
                                  onRequestClose={() => setVideoModalVisible(false)} // To handle Android back button
                              >
                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      style={styles.modalContainer}
                                      onPress={() => setVideoModalVisible(false)} // Close the modal when clicking on the background
                                  >
                                      <TouchableOpacity style={styles.modalContent}
                                          activeOpacity={1}
                                          onPress={() => { }}>
                                          <View style={styles.horizontalLine}></View>
                                          <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02 }]}>Video Links
                                              <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                          </Text>
                                          <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                              Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                          </Text>
                                          <View style={[styles.inputContainerM]}>
                                              <TextInput
                                                  style={styles.inputs}
                                                  placeholder="Video Links"
                                                  placeholderTextColor="#979797"
                                                  value={newInputValue}
                                                  onChangeText={setNewInputValue}
                                              />
                                          </View>
                                          <TouchableOpacity
                                              style={[commonStyles.button]}
                                              onPress={handleVideoModalSubmit}
                                              activeOpacity={0.8}
                                          >
                                              <Text style={commonStyles.buttonText}>Submit</Text>
                                          </TouchableOpacity>

                                      </TouchableOpacity>
                                  </TouchableOpacity>
                              </Modal>
                          </View>

                          <View style={styles.inputContainerWithLabel}>
                              <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                  Awards <Text style={styles.requiredIndicator}>*</Text>
                              </Text>
                              {awardsInputs.map((value, index) => (
                                  <View key={index} style={[styles.inputContainer1, index !== awardsInputs.length - 1 && { marginHorizontal: 10 }]}>
                                      <TextInput
                                          style={styles.inputs}
                                          placeholder="Awards"
                                          placeholderTextColor="#979797"
                                          value={value}
                                          underlineColorAndroid="transparent"
                                      />
                                      <TouchableOpacity onPress={() => handleRemoveAwardsInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                          <Image
                                              source={require('../../../assets/img/close.png')} // Close image for removing key forte
                                              style={styles.closeImage}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              ))}
                              {awardsInputs.length < 5 && (
                                  <TouchableOpacity onPress={handleAddAwardsInput} style={[styles.inputContainer1, { marginHorizontal: 10 }]} activeOpacity={0.8}>
                                      <Text style={[styles.inputsP, { textAlignVertical: 'center' }]}>Add Awards</Text>
                                  </TouchableOpacity>
                              )}

                              <Modal
                                  visible={awardsModalVisible}
                                  transparent
                                  onRequestClose={() => setAwardsModalVisible(false)}
                              >
                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      style={styles.modalContainer}
                                      onPress={() => setAwardsModalVisible(false)}
                                  >
                                      <TouchableOpacity style={styles.modalContent}
                                          activeOpacity={1}
                                          onPress={() => { }}>
                                          <View style={styles.horizontalLine}></View>
                                          <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02 }]}>Awards
                                              <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                          </Text>
                                          <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                              Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                          </Text>
                                          <View style={[styles.inputContainerM]}>
                                              <TextInput
                                                  style={styles.inputs}
                                                  placeholder="Awards"
                                                  placeholderTextColor="#979797"
                                                  value={newInputValue}
                                                  onChangeText={setNewInputValue}
                                              />
                                          </View>
                                          <TouchableOpacity
                                              style={[commonStyles.button]}
                                              onPress={handleAwardsModalSubmit}
                                              activeOpacity={0.8}
                                          >
                                              <Text style={commonStyles.buttonText}>Submit</Text>
                                          </TouchableOpacity>
                                      </TouchableOpacity>
                                  </TouchableOpacity>
                              </Modal>
                
                          </View>

                          <View style={styles.inputContainerWithLabel}>
                              <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                 Publication / Blog Links <Text style={styles.requiredIndicator}>*</Text>
                              </Text>
                              {blogsInputs.map((value, index) => (
                                  <View style={[styles.inputContainer1]}>
                                      <TextInput
                                          style={styles.inputs}
                                          placeholder="Publication / Blog Links"
                                          placeholderTextColor="#979797"
                                          value={value}
                                          underlineColorAndroid="transparent"
                                      />
                                      <TouchableOpacity onPress={() => handleRemoveBlogsInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                          <Image
                                              source={require('../../../assets/img/close.png')} // Close image for removing key forte
                                              style={styles.closeImage}
                                          />
                                      </TouchableOpacity>
                                  </View>
                              ))}
                              {blogsInputs.length < 5 && (
                                  <TouchableOpacity onPress={handleAddBlogsInput} style={styles.inputContainer1} activeOpacity={0.8}>
                                      <Text style={[styles.inputsP, { textAlignVertical: 'center' }]}>Publication / Blog Links</Text>
                                  </TouchableOpacity>
                              )}

                              <Modal
                                  visible={blogsModalVisible}
                                  transparent
                                  onRequestClose={() => setBlogsModalVisible(false)}
                              >
                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      style={styles.modalContainer}
                                      onPress={() => setBlogsModalVisible(false)}
                                  >
                                      <TouchableOpacity style={styles.modalContent}
                                          activeOpacity={1}
                                          onPress={() => { }}>
                                          <View style={styles.horizontalLine}></View>
                                          <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02 }]}>Publication / Blog Links
                                              <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                          </Text>
                                          <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                              Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                          </Text>
                                          <View style={[styles.inputContainerM]}>
                                              <TextInput
                                                  style={styles.inputs}
                                                  placeholder="Publication / Blog Links"
                                                  placeholderTextColor="#979797"
                                                  value={newInputValue}
                                                  onChangeText={setNewInputValue}
                                              />
                                          </View>
                                          <TouchableOpacity
                                              style={[commonStyles.button]}
                                              onPress={handleBlogsModalSubmit}
                                              activeOpacity={0.8}
                                          >
                                              <Text style={commonStyles.buttonText}>Submit</Text>
                                          </TouchableOpacity>
                                      </TouchableOpacity>
                                  </TouchableOpacity>
                              </Modal>
                          </View>

                          <View style={styles.inputContainerWithLabel}>
                              <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                  Social Media Links <Text style={styles.requiredIndicator}>*</Text>
                              </Text>

                              <TouchableHighlight 
                                  style={styles.inputContainer1}
                                  onPress={openModalA}
                                  underlayColor={'transparent'}
                              >
                                  <TextInput
                                      style={styles.inputs}
                                      placeholder="Social Media Links"
                                      placeholderTextColor="#979797"
                                      //value={value}
                                      editable={false}
                                      underlineColorAndroid="transparent"
                                  />
                              </TouchableHighlight>

                              <Modal
                                  visible={socialModalVisible}
                                  transparent
                                  onRequestClose={() => closeModalA()}
                              >
                                  <TouchableOpacity
                                      activeOpacity={0.8}
                                      style={styles.modalContainer}
                                      onPress={() => closeModalA()}
                                  >
                                      <TouchableOpacity style={styles.modalContent}
                                          activeOpacity={1}
                                          onPress={() => { }}>
                                          <ScrollView>
                                              <View style={styles.horizontalLine}></View>
                                              <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02 }]}>Social Media Links

                                              </Text>
                                              <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                  Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                              </Text>

                                              <View>
                                                  <Text style={[commonStyles.headerText2BL, { marginBottom: 8 }]}>
                                                      Instagram
                                                  </Text>
                                                  <View style={[styles.inputContainer1]}>
                                                      <TextInput
                                                          style={styles.inputs}
                                                          placeholder="Instagram"
                                                          placeholderTextColor="#979797"
                                                          value={instaLink}
                                                          onChangeText={(text) => setInstaLink(text)}
                                                          underlineColorAndroid="transparent"
                                                      />
                                                  </View>

                                              </View>


                                              <View>
                                                  <Text style={[commonStyles.headerText2BL, { marginBottom: 8 }]}>
                                                      LinkedIn
                                                  </Text>
                                                  <View style={[styles.inputContainer1]}>
                                                      <TextInput
                                                          style={styles.inputs}
                                                          placeholder="LinkedIn"
                                                          placeholderTextColor="#979797"
                                                          value={linkedinLink}
                                                          onChangeText={(text) => setLinkedInLink(text)}
                                                          underlineColorAndroid="transparent"
                                                      />

                                                  </View>

                                              </View>
                                              <View>
                                                  <Text style={[commonStyles.headerText2BL, { marginBottom: 8 }]}>
                                                      Facebook
                                                  </Text>
                                                  <View style={[styles.inputContainer1]}>
                                                      <TextInput
                                                          style={[styles.inputs, { width: '100%' }]}
                                                          placeholder="Facebook"
                                                          placeholderTextColor="#979797"
                                                          value={facebookLink}
                                                          onChangeText={(text) => setFacebookLink(text)}
                                                          underlineColorAndroid="transparent"
                                                      />
                                                  </View>

                                              </View>
                                              <View>
                                                  <Text style={[commonStyles.headerText2BL, { marginBottom: 8 }]}>
                                                      Other Links
                                                  </Text>
                                                  <View style={[styles.inputContainer1]}>
                                                      <TextInput
                                                          style={[styles.inputs, { width: '100%' }]}
                                                          placeholder="Other"
                                                          placeholderTextColor="#979797"
                                                          value={otherLink}
                                                          onChangeText={(text) => setOtherLink(text)}
                                                          underlineColorAndroid="transparent"
                                                      />
                                                  </View>

                                              </View>


                                              <TouchableOpacity
                                                  style={[commonStyles.button, { marginBottom: 20 }]} // Adjust the marginBottom value as needed
                                                  onPress={closeModalA}
                                                  activeOpacity={0.8}
                                              >
                                                  <Text style={commonStyles.buttonText}>Submit</Text>
                                              </TouchableOpacity>
                                          </ScrollView>
                                     
                                      </TouchableOpacity>
                                  </TouchableOpacity>
                              </Modal>
                          </View>

                       
                          <TouchableOpacity
                              style={[commonStyles.button]}
                              onPress={handleNext}
                              activeOpacity={0.8}
              >
                              <Text style={commonStyles.buttonText}>Continue</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
          )}
      </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
    inputsP: {
        marginHorizontal: width * 0.05,
        color: '#979797',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',

        width: '100%'
    },
    horizontalLine: {
        width: '20%',
        height: 5,
        marginBottom: height * 0.03,
        //marginHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#979797',
        borderRadius: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background blur effect
    },
    modalContent: {
        backgroundColor: '#FEFCFC',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: moderateScale(16),
        maxHeight: '95%',
        minHeight: 100,
        paddingBottom: 30,
    },
    modalContent1: {
        backgroundColor: '#FEFCFC',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '95%', // Maximum height of 50%
        paddingBottom: 20
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#12121',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#289EF5',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FEFCFC',
        fontWeight: 'bold',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(100),
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: height * 0.22,
    },
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
        //zIndex: 1,
    },
    headerText1: {
        fontSize: 24,
        fontFamily: 'Mukta-Bold',
        color: '#121212',
        marginBottom: 17,
    },
    headerText2: {
        fontSize: 18,
        color: '#121212',
        fontFamily: 'Mukta-Regular',
        lineHeight: 25,
        textAlign: 'center',
    },
    contentContainer: {
        marginTop: moderateScale(32),
        //justifyContent: 'center',
        //alignItems: 'center',
        //marginTop: height * 0.00,
    },
    progImage: {
        height: 26,
        width: 311,
        alignSelf: 'center',
        marginBottom: 20,
    },
    inputContainer1: {
        flexDirection: 'row',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: 42,
        width: '100%',
        marginBottom: moderateScale(16),
        justifyContent: 'space-between',
    },
    totalServiceText: {
        position: 'absolute',
        right: width * 0.04,
        top: '50%',
        transform: [{ translateY: -10 }],
        color: '#289EF5',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
    },

    closeP: {
        position: 'absolute',
        right: width * 0.04,
        top: '50%',
        transform: [{ translateY: -10 }],
        width: 20,
        height: 20,
    },
    inputContainerM: {
        flexDirection: 'row',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: 42,
        width: '100%',
        marginBottom: moderateScale(16),
        justifyContent: 'space-between',
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    inputContainerC: {
        flexDirection: 'row',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    inputs: {
        marginLeft: width * 0.04,
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        flex: 1
    },
    button: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: '#289EF5',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 18,
    },
    modalHeaderText: {
        color: '#121212',
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 10,

    },
    uptoText: {
        color: '#979797',
        fontSize: 16,
        fontFamily: 'Mukta-SemiBold',
        marginLeft: 10,
        //marginBottom: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalTextarea: {
        height: 134,
        borderColor: '#979797',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.022,
    },
    modalTextareaContainer: {
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#289EF5',
        marginHorizontal: 55,
        borderRadius: 100,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        alignSelf: 'flex-end',  // Align to the right side
        marginBottom: 10,  // Add spacing if needed
    },
    addButtonText: {
        color: '#289EF5',  // Use a color that fits your design
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
    },
    dropdownContainer: {
        //width: 330,
        //justifyContent: 'center',
        //alignSelf: 'center',
        position: 'relative',
        marginBottom: 15,
        //zIndex: 2000,
        //paddingHorizontal: width * 0.067,
    },
    inputContainerWithLabel: {
        //paddingHorizontal: width * 0.067,
    },
    label: {
        fontSize: 16,
        color: '#121212',
        marginBottom: 5,
        fontFamily: 'Mukta-Bold',
    },
    requiredIndicator: {
        color: 'red', // Change the color as needed
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 5,
    },
    labelD: {
        fontSize: 16,
        color: '#121212',
        marginBottom: 5,
        fontFamily: 'Mukta-Bold',
    },
    closeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 20, // Adjust height if needed
        width: 20, // Adjust width if needed
        marginRight: width * 0.05,
    },

    image: {
        width: 20,
        height: 20,
        marginRight: width * 0.05,
        alignSelf: 'center',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    serviceButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8F8FF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10,
    },
    selectedServiceButton: {
        backgroundColor: '#289EF5',
    },
    selectedServiceButtonText: {
        alignSelf: 'center',
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontSize: responsiveFontSize(15),
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    serviceButtonText: {
        fontSize: responsiveFontSize(15),
        alignSelf: 'center',
        color: '#289EF5',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    closeButton: {
        padding: 5,
    },
    closeImage: {
        width: 15,
        height: 15,
    },
    continueButton: {
        position: 'absolute',
        bottom: 30,
    },
    yearDropdown: {
        paddingVertical: 3,
        // paddingHorizontal: width * 0.02,
        borderRadius: 6,
        borderColor: '#289EF5',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: width * 0.1,
        width: width * 0.25,
        backgroundColor: 'rgba(232, 248, 255, 1)'
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#979797',
        borderTopColor: '#979797'
    },
    toggleButton: {
        padding: 10,
    },

    toggleIcon: {
        width: 24,
        height: 24,
    },
});

export default ProfileCompletion8;
