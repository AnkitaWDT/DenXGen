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
    FlatList
} from 'react-native';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const NDProfileCompletion5 = ({ navigation }) => {

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

    const [selectedButton, setSelectedButton] = useState('');

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pr_id = await AsyncStorage.getItem('pr_id');
                const id = parseInt(pr_id);

                const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getvic-ax.php?prid=${id}`);
                const data = await response.json();
                setUserData(data.data);
                console.log('Experience from API:', data.data.experience);
                setSelectedButton(data.data.ho_vi_id === 1 ? 'button1' : 'button2');
                setRegisterNumber(data.data.reg_no);
                setPaymentLink(data.data.payment);
                const selectedLanguagesIds = data.data.langList.map(language => parseInt(language.lang_id));
                setSelectedLanguages(selectedLanguagesIds);
                const selectedLanguagesNames = data.data.languages.map(language => language.language);
                setSelectedLanguagesName(selectedLanguagesNames);
                setSelectedExperience(data.data.experience); // Set selected experience from API
                setSelectedExperienceName(data.data.experience);

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData(); // Call the function immediately
    }, []);



    const [languagesData, setLanguagesData] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedLanguagesName, setSelectedLanguagesName] = useState('');
    const [otherLanguages, setOtherLanguages] = useState('');
    const [languagesModalVisible, setLanguagesModalVisible] = useState(false);
    const [showOtherLanguagesInput, setShowOtherLanguagesInput] = useState(false);

    useEffect(() => {
        fetchLanguagesData();
    }, []);

    const fetchLanguagesData = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getlang-ax.php');
            const data = await response.json();
            setLanguagesData(data.data);
        } catch (error) {
            console.error('Error fetching key forte data:', error);
        }
    };

    const handleLanguagesModal = () => {
        setLanguagesModalVisible(true);
    };

    const handleCloseLanguagesModal = () => {
        setLanguagesModalVisible(false);
    };

    const handleLanguagesModalSubmit = () => {


        let updatedLanguages = [...selectedLanguages];
        const otherIndex = updatedLanguages.findIndex(service => service.hasOwnProperty('other'));

        if (otherLanguages.trim() !== '') {
            const newOtherLanguage = { other: otherLanguages.trim() };
            if (otherIndex !== -1) {
                // Replace the existing "other" service with the new one
                updatedLanguages[otherIndex] = newOtherLanguage;
            } else {
                // Add the new "other" service
                updatedLanguages.push(newOtherLanguage);
            }
        } else {
            // If otherService is empty, remove the "other" service from selectedServices
            if (otherIndex !== -1) {
                updatedLanguages.splice(otherIndex, 1);
            }
        }

        setSelectedLanguages(updatedLanguages);
        console.log('updatedServices', updatedLanguages)
        setLanguagesModalVisible(false);
    };

    const toggleLanguages = (id, language) => {
        const isSelected = selectedLanguages.includes(id);
        setSelectedLanguages(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);
        //setSelectedLanguages(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
        setSelectedLanguagesName(isSelected ? [] : [language]);
  
    };

    const toggleOtherLanguagesInput = () => {
        setShowOtherLanguagesInput(!showOtherLanguagesInput);
    };

    const [experienceData, setExperienceData] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState('');
    const [otherExperience, setOtherExperience] = useState('');
    const [selectedExperienceName, setSelectedExperienceName] = useState('');
    const [experienceModalVisible, setExperienceModalVisible] = useState(false);
    const [showOtherExperienceInput, setShowOtherExperienceInput] = useState(false);

    useEffect(() => {
        fetchExperienceData();
    }, []);

    const fetchExperienceData = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getexplist-ax.php');
            const data = await response.json();
            setExperienceData(data.data);
        } catch (error) {
            console.error('Error fetching key forte data:', error);
        }
    };

    const handleExperienceModal = () => {
        setExperienceModalVisible(true);
    };

    const handleCloseExperienceModal = () => {
        setExperienceModalVisible(false);
    };
    const handleExperienceModalSubmit = () => {


        // Close the modal
        setExperienceModalVisible(false);
    };


    const toggleExperience = (id, experience) => {
        // If the clicked experience is already selected, deselect it
        // Otherwise, select the clicked experience
        setSelectedExperience(id);
        setSelectedExperienceName(experience);
        // setSelectedExperience(selectedExperience === id ? '' : id);
        // setSelectedExperienceName(selectedExperienceName === experience ? '' : experience);
    };

    const toggleOtherExperienceInput = () => {
        setShowOtherExperienceInput(!showOtherExperienceInput);
    };

    const [registerNumber, setRegisterNumber] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    const handleNext = async () => {


        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);

        const userData = {
            pr_id: id,
            lang_id: selectedLanguages,
            exp_id: selectedExperience,
            reg_no: registerNumber,
            payment: paymentLink,
            ho_vi_id: selectedButton === 'button1' ? 1 : 2,
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls5-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            navigation.navigate('EditProfile')
        } catch (error) {
            console.error('An error occurred:', error);
        }

        
    };


    const currentStep = 5; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    //console.log("Progress Percentage:", progressPercentage);

    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>

            ) : (
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                        <View style={styles.contentContainer}>

                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, {
                                    marginBottom: moderateScale(6), textAlign: 'center'
                                }]}>Additional Details</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Choose your career category and unlock endless possibilities.</Text>
                                {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                {/* <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                /> */}
                            </View>



                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Available For Home Visits <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, selectedButton === 'button1' && styles.selectedButton]}
                                        onPress={() => setSelectedButton('button1')}
                                        activeOpacity={0.8}
                                    >
                                        {selectedButton === 'button1' ? (
                                            <Image source={require('../../../assets/img/Cat2.png')} style={styles.imageStyle} />
                                        ) : (
                                            <Image source={require('../../../assets/img/Cat1.png')} style={styles.imageStyle} />
                                        )}
                                        <Text style={[commonStyles.headerText2BL, { textAlign: 'center' }]}>Yes, it is available</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, selectedButton === 'button2' && styles.selectedButton]}
                                        onPress={() => setSelectedButton('button2')}
                                        activeOpacity={0.8}
                                    >
                                        {selectedButton === 'button2' ? (
                                            <Image source={require('../../../assets/img/Cat2.png')} style={styles.imageStyle} />
                                        ) : (
                                            <Image source={require('../../../assets/img/Cat1.png')} style={styles.imageStyle} />
                                        )}
                                        <Text style={[commonStyles.headerText2BL, { textAlign: 'center' }]}>No, not available</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Languages Spoken <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={handleLanguagesModal} style={[styles.inputContainer1]} activeOpacity={0.8}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Languages"
                                        placeholderTextColor="#979797"
                                        value={selectedLanguagesName.length > 0 ? selectedLanguagesName[0] : ''}
                                        //value={selectedLanguages.length > 0 ? selectedLanguages[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedLanguages.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedLanguages.filter(languages => languages !== 'Other').length + (showOtherLanguagesInput ? 1 : 0)}</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                <Modal
                                    visible={languagesModalVisible}
                                    transparent
                                    onRequestClose={() => setLanguagesModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setLanguagesModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <TouchableOpacity style={styles.modalContent}
                                            activeOpacity={1}
                                            onPress={() => { }}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Languages you spoken <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <FlatList
                                                style={{ paddingBottom: showOtherLanguagesInput ? 0 : 46 }}
                                                data={[...languagesData, { id: 'other', language: 'Other' }]} // Add 'Other' as an additional item
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            if (item.id === 'other') {
                                                                toggleOtherLanguagesInput();
                                                            } else {
                                                                toggleLanguages(item.id, item.language);
                                                            }
                                                        }}
                                                        onMouseEnter={() => setHoveredItem(item.language)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedLanguages.includes(item.language) && styles.selectedCheckboxContainer,
                                                                hoveredItem === item.language && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={
                                                                    selectedLanguages.includes(item.id) || (showOtherLanguagesInput && item.id === 'other')
                                                                        ? require('../../../assets/img/Rect1.png')
                                                                        : require('../../../assets/img/Rect.png')
                                                                }
                                                                style={styles.checkboxImage}
                                                            />
                                                            {/* <Image
                                                                    source={
                                                                        selectedLanguages.includes(item.language) || (showOtherLanguagesInput && item.id === 'other')
                                                                            ? require('../../../assets/img/Rect1.png')
                                                                            : require('../../../assets/img/Rect.png')
                                                                    }
                                                                    style={styles.checkboxImage}
                                                                /> */}
                                                            <Text style={selectedLanguages.includes(item.language) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {item.language}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={item => item.id}
                                            />
                                            {showOtherLanguagesInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Languages"
                                                        placeholderTextColor="#979797"
                                                        value={otherLanguages}
                                                        onChangeText={(text) => setOtherLanguages(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}

                                            {showOtherLanguagesInput && (
                                                <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleLanguagesModalSubmit}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>
                                            )}


                                        </TouchableOpacity>
                                        <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: 20, }]} activeOpacity={0.8} onPress={handleLanguagesModalSubmit}>
                                            <Text style={commonStyles.buttonText}>Submit</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Experiences <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                    <TouchableOpacity onPress={handleExperienceModal} style={[styles.inputContainer1]} activeOpacity={0.8}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="Experiences"
                                            placeholderTextColor="#979797"
                                            value={selectedExperienceName}
                                            underlineColorAndroid="transparent"
                                            editable={false}
                                        />
                                        {selectedExperienceName === '' && <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />}
                                    </TouchableOpacity>

                                <Modal
                                    visible={experienceModalVisible}
                                    transparent
                                    onRequestClose={() => setExperienceModalVisible(false)}// To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setExperienceModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <TouchableOpacity style={styles.modalContent}
                                            activeOpacity={1}
                                            onPress={() => { }}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Tell us your services <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                            </Text>
                                            <FlatList
                                                style={{ paddingBottom: showOtherExperienceInput ? 0 : 46 }}
                                                data={[...experienceData]} // Add 'Other' as an additional item
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            if (item.id === 'other') {
                                                                toggleOtherExperienceInput();
                                                            } else {
                                                                toggleExperience(item.id, item.experience);
                                                            }
                                                        }}
                                                        onMouseEnter={() => setHoveredItem(item.experience)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedExperience.includes(item.experience) && styles.selectedCheckboxContainer,
                                                                hoveredItem === item.experience && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={
                                                                    selectedExperience.includes(item.id) || (showOtherExperienceInput && item.id === 'other')
                                                                        ? require('../../../assets/img/Rect1.png')
                                                                        : require('../../../assets/img/Rect.png')
                                                                }
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedExperience.includes(item.experience) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {item.experience}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={item => item.id}
                                            />
                                            {/* {showOtherExperienceInput && (
                                                    <View style={styles.inputContainer1}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="Other Experiences"
                                                            placeholderTextColor="#979797"
                                                            value={otherExperience}
                                                            onChangeText={(text) => setOtherExperience(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                )}

                                                {showOtherExperienceInput && (
                                                    <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleExperienceModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                )} */}


                                        </TouchableOpacity>
                                        <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: 20, }]} activeOpacity={0.8} onPress={handleExperienceModalSubmit}>
                                            <Text style={commonStyles.buttonText}>Submit</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>

                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Registration Number <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <View style={styles.inputContainer1}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Registration Number"
                                        placeholderTextColor="#979797"
                                        value={registerNumber}
                                        onChangeText={(text) => setRegisterNumber(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Payment Links <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <View style={styles.inputContainer1}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="upi@okicici"
                                        placeholderTextColor="#979797"
                                        value={paymentLink}
                                        onChangeText={(text) => setPaymentLink(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                            {/* Continue Button */}
                            <TouchableOpacity
                                style={[commonStyles.button]}
                                // onPress={() => {
                                //     navigation.navigate('ProfileCompletion6');
                                //     console.log('ProfileCompletion21');
                                // }}
                                onPress={handleNext}
                                activeOpacity={0.8}
                            >
                                <Text style={commonStyles.buttonText}>Continue</Text>
                            </TouchableOpacity>




                        </View>
                    </ScrollView>

                </View>
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
        marginBottom: 20,
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
        height: moderateScale(41),
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
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.015,
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
        flexDirection: 'row',
        marginBottom: moderateScale(8),
    },
    buttonContainer: {
        marginBottom: moderateScale(8),
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
        zIndex: 2000,
        paddingHorizontal: width * 0.067,
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
    imageStyle: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 18,
    },
    checkboxImage: {
        height: moderateScale(18),
        width: moderateScale(18),

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        //flexWrap: 'wrap',
        marginVertical: moderateScale(12),
        paddingRight: moderateScale(18),
        // paddingLeft: moderateScale(18),
    },
    hoveredCheckboxContainer: {
        backgroundColor: '#E8F8FF',
    },
    servicesContainer11: {
        //paddingHorizontal: moderateScale(18),
    }
});

export default NDProfileCompletion5;
