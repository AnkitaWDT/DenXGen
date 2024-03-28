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
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ProfileCompletion5 = ({ navigation }) => {

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

    // const [languagesData] = useState([
    //     'English',
    //     'Hindi',
    //     'Marathi',
    //     'Bengali',
    //     'Telugu',
    //     'Tamil',
    //     'Gujarati',
    //     'Urdu',
    //     'Kannada',
    //     'Odia',
    //     'Malayalam',
    //     'Punjabi',
    // ]);

    const [languagesData, setLanguagesData] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
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

        // If otherSpecialty is not empty, include it
        if (otherLanguages.trim() !== '') {
            updatedLanguages.push(otherLanguages.trim());
        }

        // Update the main text input with the combined specialties
        setSelectedLanguages(updatedLanguages);

        // Close the modal
        setLanguagesModalVisible(false);
    };

    const toggleLanguages = (languages) => {
        if (selectedLanguages.includes(languages)) {
            setSelectedLanguages(selectedLanguages.filter((item) => item !== languages));
        } else {
            if (selectedLanguages.length < 5) {
                setSelectedLanguages([...selectedLanguages, languages]);
            } else {
                ToastAndroid.show('You can select only upto 5 specialties!', ToastAndroid.SHORT);
            }
        }
    };

    const toggleOtherLanguagesInput = () => {
        setShowOtherLanguagesInput(!showOtherLanguagesInput);
    };

    // const [experienceData] = useState([
    //     '>2 years',
    //     '2-5 years',
    //     '5-10 years',
    //     '10-15 years',
    //     '15+ years',
    // ]);

    const [experienceData, setExperienceData] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState('');
    const [otherExperience, setOtherExperience] = useState('');
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

    // const toggleExperience = (experience) => {
    //     if (selectedExperience.includes(experience)) {
    //         setSelectedExperience(selectedExperience.filter((item) => item !== experience));
    //     } else {
    //         if (selectedExperience.length < 5) {
    //             setSelectedExperience([...selectedExperience, experience]);
    //         } else {
    //             ToastAndroid.show('You can select only upto 5 experiences!', ToastAndroid.SHORT);
    //         }
    //     }
    // };

    const toggleExperience = (experience) => {
        // If the clicked experience is already selected, deselect it
        // Otherwise, select the clicked experience
        setSelectedExperience(selectedExperience === experience ? '' : experience);
    };

    const toggleOtherExperienceInput = () => {
        setShowOtherExperienceInput(!showOtherExperienceInput);
    };

    const [registerNumber, setRegisterNumber] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    const handleNext = async () => {
        const userData = {
            AvailableForHomeVisits: selectedButton === 'button1' ? "Yes" : "No",
            SelectedLanguages: selectedLanguages,
            SelectedExperience: selectedExperience,
            LicenseNumber: registerNumber,
            PaymentLink: paymentLink,
            availableForHomeVisitsValue: selectedButton === 'button1' ? 1 : 2,

        };

        console.log('User Data:', userData);
        navigation.navigate('ProfileCompletion6');
    };


    const currentStep = 5; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    console.log("Progress Percentage:", progressPercentage);

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
                                    }]}>Step 5 - Additional Details</Text>
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
                                            // value={selectedServices.join(', ')}
                                            value={selectedLanguages.length > 0 ? selectedLanguages[0] : ''}
                                            underlineColorAndroid="transparent"
                                            editable={false}
                                        />
                                        {selectedLanguages.length > 0 ? (
                                            <Text style={styles.totalServiceText}>+{selectedLanguages.filter(languages => languages !== 'Other').length + (showOtherLanguagesInput ? 1 : 0)}</Text>
                                        ) : (
                                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                        )}
                                    </TouchableOpacity>
                                    {/* <Modal visible={languagesModalVisible} transparent>
                                        <TouchableWithoutFeedback onPress={() => setLanguagesModalVisible(false)}>
                                            <View style={styles.modalContainer}>
                                                <TouchableWithoutFeedback>
                                                    <View style={styles.modalContent}>
                                                        <View style={styles.horizontalLine}></View>
                                                        <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                            Languages you spoken <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                        </Text>
                                                        <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                            Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                                        </Text>
                                                        <View style={styles.servicesContainer}>
                                                            {languagesData.map((languages) => (
                                                                <TouchableOpacity
                                                                    key={languages}
                                                                    style={[
                                                                        styles.serviceButton,
                                                                        selectedLanguages.includes(languages) && styles.selectedServiceButton,
                                                                    ]}
                                                                    onPress={() => toggleLanguages(languages)}
                                                                >
                                                                    <Text
                                                                        style={[
                                                                            styles.serviceButtonText,
                                                                            selectedLanguages.includes(languages) && styles.selectedServiceButtonText,
                                                                        ]}
                                                                    >
                                                                        {languages}
                                                                    </Text>
                                                                    {selectedLanguages.includes(languages) && (
                                                                        <TouchableOpacity
                                                                            style={styles.closeButton}
                                                                            onPress={() => toggleLanguages(languages)}
                                                                        >
                                                                            <Image
                                                                                source={require('../../../assets/img/close.png')}
                                                                                style={styles.closeImage}
                                                                            />
                                                                        </TouchableOpacity>
                                                                    )}
                                                                </TouchableOpacity>
                                                            ))}
                                                            <TouchableOpacity
                                                                style={[
                                                                    styles.serviceButton,
                                                                    styles.otherButton,
                                                                    showOtherLanguagesInput && styles.selectedServiceButton,
                                                                ]}
                                                                onPress={toggleOtherLanguagesInput}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.serviceButtonText,
                                                                        showOtherLanguagesInput && styles.selectedServiceButtonText,
                                                                    ]}
                                                                >
                                                                    Other
                                                                </Text>
                                                                {showOtherLanguagesInput && (
                                                                    <TouchableOpacity
                                                                        style={styles.closeButton}
                                                                        onPress={toggleOtherLanguagesInput}
                                                                    >
                                                                        <Image
                                                                            source={require('../../../assets/img/close.png')}
                                                                            style={styles.closeImage}
                                                                        />
                                                                    </TouchableOpacity>
                                                                )}
                                                            </TouchableOpacity>
                                                        </View>
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
                                                        <TouchableOpacity style={[commonStyles.button]} onPress={handleLanguagesModalSubmit}>
                                                            <Text style={commonStyles.buttonText}>Submit</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Modal> */}
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
                                            <ScrollView style={styles.modalContent}>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Languages you spoken <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                                </Text>
                                                <View style={styles.servicesContainer11}>

                                                    {languagesData.map((languagesItem) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            key={languagesItem.id}
                                                        onPress={() => toggleLanguages(languagesItem.language)}
                                                        onMouseEnter={() => setHoveredItem(languagesItem.language)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedLanguages.includes(languagesItem.language) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === languagesItem.language && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={selectedLanguages.includes(languagesItem.language) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                    style={styles.checkboxImage}
                                                                />
                                                                <Text style={selectedLanguages.includes(languagesItem.language) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {languagesItem.language}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))}
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={toggleOtherLanguagesInput}
                                                        onMouseEnter={() => setHoveredItem('Other')}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                showOtherLanguagesInput && styles.selectedCheckboxContainer,
                                                                hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={showOtherLanguagesInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={showOtherLanguagesInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
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
                                          
                                            </ScrollView>
                                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.08, }]} activeOpacity={0.8} onPress={handleLanguagesModalSubmit}>
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
                                            value={selectedExperience}
                                            underlineColorAndroid="transparent"
                                            editable={false}
                                        />
                                        {!selectedExperience && <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />}
                                    </TouchableOpacity>

                                 
                                    <Modal
                                        visible={experienceModalVisible}
                                        transparent
                                        onRequestClose={handleCloseExperienceModal}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.modalContainer}
                                            onPress={handleCloseExperienceModal}
                                        >
                                            <ScrollView style={styles.modalContent}>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Tell us your experience <Text style={commonStyles.headerText3G}> (select one)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                                </Text>
                                                <View style={styles.servicesContainer11}>
                                                    {experienceData.map((experienceItem) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            key={experienceItem.id}
                                                            onPress={() => toggleExperience(experienceItem.experience)}
                                                            onMouseEnter={() => setHoveredItem(experienceItem.experience)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedExperience.includes(experienceItem.experience) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === experienceItem.experience && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={selectedExperience.includes(experienceItem.experience) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                    style={styles.checkboxImage}
                                                                />
                                                                <Text style={selectedExperience.includes(experienceItem.experience) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {experienceItem.experience}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))}
                                                    {/* <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={toggleOtherExperienceInput}
                                                        onMouseEnter={() => setHoveredItem('Other')}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                showOtherExperienceInput && styles.selectedCheckboxContainer,
                                                                hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={showOtherExperienceInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={showOtherExperienceInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                        </View>
                                                    </TouchableOpacity> */}
                                                </View>
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
                                                )} */}
                                            </ScrollView>
                                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.08, }]} activeOpacity={0.8} onPress={handleExperienceModalSubmit}>
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
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%', // Maximum height of 50%
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
    buttonContainer:{
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

export default ProfileCompletion5;
