/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, ToastAndroid, PixelRatio, TouchableWithoutFeedback, TouchableHighlight, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomDropdown from '../../components/CustomDropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animation from '../../components/Loader';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProgressBar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};



const EOfficeProfileCompletion1 = ({ navigation, route }) => {

    const { off_id } = route.params;
    console.log(off_id);

    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedContactNumber, setSelectedContactNumber] = useState('');
    const [selectedAlternateContactNumber, setSelectedAlternateContactNumber] = useState('');
    const [selectedWappNumber, setSelectedWappNumber] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedProfession, setSelectedProfession] = useState('');
    const [selectedDateOfBirth, setSelectedDateOfBirth] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isContactFocused, setIsContactFocused] = useState(false);
    const [isAltCFocused, setIsAltCFocused] = useState(false);
    const [isWappCFocused, setIsWappCFocused] = useState(false);
    const [isDateOfBirthFocused, setIsDateOfBirthFocused] = useState(false);
    const [eyear, setEyear] = useState('');

    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getofficevic-ax.php?off_id=${off_id}`);
                const clinicData = response.data.data;
                setSelectedName(clinicData.name);
                setSelectedEmail(clinicData.email);
                setSelectedContactNumber(clinicData.phoneno);
                setSelectedAlternateContactNumber(clinicData.alternate);
                //setTextareaValues(clinicData.about);
                setTextareaValues({ aboutYourself: clinicData.about });
                setNewInputValue(clinicData.about);
                setSelectedWappNumber(clinicData.wp_number);
                setEyear(clinicData.est_year);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching clinic data:', error);
            }
        };

        fetchClinicData();
    }, [off_id]);

    const handleDateChange = (event, date) => {
        if (date === undefined) {
            // User dismissed the picker
            setIsDateOfBirthFocused(false);
        } else {
            setSelectedDate(date);
            const formattedDate = moment(date).format('DD MMMM, YYYY');
            setSelectedDateOfBirth(formattedDate);
            setIsDateOfBirthFocused(false); // Set isDateOfBirthFocused to false after selecting a date
        }
    };


    const showDatePicker = () => {
        setIsDateOfBirthFocused(true);
    };


    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const [isRectVisible, setIsRectVisible] = useState(true);
    const [isRect1Visible, setIsRect1Visible] = useState(false);

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

    const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
    const [textareaValues, setTextareaValues] = useState({
        aboutYourself: '',
    });
    const [newInputValue, setNewInputValue] = useState('');


    const openModalA = () => {
        setIsAboutModalVisible(true);
    };

    const closeModalA = () => {
        setIsAboutModalVisible(false);
    };

    const handleAboutChange = (text) => {
        setNewInputValue(text);
    };

    const handleAboutSave = () => {
        setTextareaValues({ ...textareaValues, aboutYourself: newInputValue });
        closeModalA();
    };


    const handleNext = async () => {
        // if (!selectedName) {
        //     ToastAndroid.show('Name is Required', ToastAndroid.SHORT);
        // } else if (selectedName.length > 5) {
        //     ToastAndroid.show('Name should be maximum 5 characters long', ToastAndroid.SHORT);
        // } 
        // else if (!selectedEmail) {
        //     ToastAndroid.show('Email is Required', ToastAndroid.SHORT);
        // } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(selectedEmail)) {
        //     ToastAndroid.show('Invalid Email Address', ToastAndroid.SHORT);
        // } 
        // else if (!selectedContactNumber) {
        //     ToastAndroid.show('Contact Number is Required', ToastAndroid.SHORT);
        // } else if (!/^\d{10}$/.test(selectedContactNumber)) {
        //     ToastAndroid.show('Invalid Contact Number', ToastAndroid.SHORT);
        // } 

        // else if (!selectedAlternateContactNumber) {
        //     ToastAndroid.show('Alternate Contact Number is Required', ToastAndroid.SHORT);
        // } else if (!/^\d{10}$/.test(selectedAlternateContactNumber)) {
        //     ToastAndroid.show('Invalid Alternate Contact Number', ToastAndroid.SHORT);
        // } else if (!selectedGender) {
        //     ToastAndroid.show('Gender is Required', ToastAndroid.SHORT);
        // } else if (!selectedWappNumber) {
        //     ToastAndroid.show('WhatsApp Number is Required', ToastAndroid.SHORT);
        // } else if (!/^\d{10}$/.test(selectedWappNumber)) {
        //     ToastAndroid.show('Invalid WhatsApp Number', ToastAndroid.SHORT);
        // } else if (!selectedProfession) {
        //     ToastAndroid.show('Profession is Required', ToastAndroid.SHORT);
        // } else {

        // const cl_id = await AsyncStorage.getItem('cl_id');
        const acc_ty_id = await AsyncStorage.getItem('acc_ty_id');
        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);
        const userData = {
            off_id: off_id,
            pr_id: id,
            name: selectedName,
            email: selectedEmail,
            phoneno: selectedContactNumber,
            alternate: selectedAlternateContactNumber,
            wp_number: selectedWappNumber,
            about: textareaValues['aboutYourself'],
            est_year: eyear,
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqofficedtls1-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            console.log('Data Added to database');
            //navigation.navigate('ClinicProfileCompletion2');
            navigation.navigate('EditOfficeProfile', { off_id: off_id })
        } catch (error) {
            console.error('An error occurred:', error);
        }

        //
    };

    const toggleRectVisibility = () => {
        setIsRectVisible(!isRectVisible);
        setIsRect1Visible(!isRect1Visible);
    };

    const currentStep = 1; // For example, current step is 4
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
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>
                        {/* Header */}
                        {/* <View style={styles.headerContainer}>
                        <Image source={require('../../../assets/img/LS.png')} style={styles.headerImageBackground} />
                        <View style={styles.headerTextContainer}>
                            <Text style={[commonStyles.headerText1W, {
                                marginBottom: moderateScale(8),

                            }]}>Personal Details</Text>
                            <Text style={[commonStyles.headerText2W, {
                                paddingHorizontal: moderateScale(16), textAlign: 'center',
                            }]}>Please provide your personal details for better user experience.</Text>
                        </View>
                    </View> */}
                        <View style={styles.contentContainer}>

                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, {
                                    marginBottom: 6, textAlign: 'center'
                                }]}>Clinic Details</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Please provide your personal details for better user experience.</Text>
                                {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                {/* <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                /> */}
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: 8,

                                }]}>Clinic Name <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isNameFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Enter your clinic name"
                                        placeholderTextColor={'#979797'}
                                        value={selectedName}
                                        onChangeText={(text) => setSelectedName(text)}
                                        underlineColorAndroid='transparent'
                                        onFocus={() => setIsNameFocused(true)}
                                        onBlur={() => setIsNameFocused(false)}
                                        autoFocus={true} // Set autoFocus to true
                                    />
                                    {selectedName.length > 0 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: 8,
                                }]}>Email Address <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isEmailFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Email Address"
                                        placeholderTextColor={'#979797'}
                                        value={selectedEmail}
                                        onChangeText={(text) => setSelectedEmail(text)}
                                        underlineColorAndroid='transparent'
                                        onFocus={() => setIsEmailFocused(true)}
                                        onBlur={() => setIsEmailFocused(false)}
                                        autoFocus={true} // Set autoFocus to true
                                    />
                                    {selectedEmail.length > 0 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: 8,
                                }]}>Contact Number 1 <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isContactFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Contact Number"
                                        placeholderTextColor="#979797"
                                        maxLength={10}
                                        keyboardType="phone-pad"
                                        value={selectedContactNumber}
                                        onChangeText={(text) => setSelectedContactNumber(text)}
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setIsContactFocused(true)}
                                        onBlur={() => setIsContactFocused(false)}
                                    />

                                    {selectedContactNumber.length > 9 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: 8,
                                }]}>Contact Number 2 <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isAltCFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Alternate Contact Number"
                                        maxLength={10}
                                        placeholderTextColor={'#979797'}
                                        keyboardType="phone-pad"
                                        value={selectedAlternateContactNumber}
                                        onChangeText={(text) => setSelectedAlternateContactNumber(text)}
                                        underlineColorAndroid='transparent'
                                        onFocus={() => setIsAltCFocused(true)}
                                        onBlur={() => setIsAltCFocused(false)}
                                        autoFocus={true} // Set autoFocus to true
                                    />
                                    {selectedAlternateContactNumber.length > 9 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: 8,
                                }]}>WhatsApp Number <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isWappCFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="WhatsApp Number"
                                        maxLength={10}
                                        placeholderTextColor={'#979797'}
                                        keyboardType="phone-pad"
                                        value={selectedWappNumber}
                                        onChangeText={(text) => setSelectedWappNumber(text)}
                                        underlineColorAndroid='transparent'
                                        onFocus={() => setIsWappCFocused(true)}
                                        onBlur={() => setIsWappCFocused(false)}
                                        autoFocus={true} // Set autoFocus to true
                                    />
                                    {selectedWappNumber.length > 9 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8, }]}>
                                    Write about yourself <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <TouchableHighlight
                                    style={styles.inputContainer1}
                                    onPress={openModalA}
                                    underlayColor={'transparent'}
                                >
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder={'Write about yourself...'}
                                        placeholderTextColor={'#979797'}
                                        value={textareaValues['aboutYourself']}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                        selection={{ start: 0, end: 0 }}
                                    />
                                </TouchableHighlight>

                                {/* About Yourself Modal */}
                                <Modal visible={isAboutModalVisible} transparent>
                                    <TouchableWithoutFeedback onPress={() => closeModalA()}>
                                        <View style={styles.modalContainer}>
                                            <TouchableWithoutFeedback >
                                                <View style={styles.modalContent}>
                                                    <View style={styles.horizontalLine}></View>
                                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                        Write something about yourself
                                                    </Text>
                                                    <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                        Note: Tell us something about yourself to let users know you better
                                                    </Text>
                                                    <TextInput
                                                        style={styles.modalTextarea}
                                                        multiline
                                                        placeholder="Write about yourself..."
                                                        placeholderTextColor="#979797"
                                                        value={newInputValue}
                                                        onChangeText={handleAboutChange}
                                                        textAlignVertical="top"
                                                    />
                                                    <TouchableOpacity onPress={handleAboutSave} style={commonStyles.button} activeOpacity={0.8}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8, }]}>
                                    Establishment Year <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <View style={styles.inputContainer1}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Establishment Year"
                                        placeholderTextColor="#979797"
                                        value={eyear}
                                        onChangeText={(text) => setEyear(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
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

                </View>

            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
        paddingHorizontal: 16,
        maxHeight: '95%',
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
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalTextarea: {
        height: 200,
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

    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',

    },
    headerImageBackground: {
        position: 'absolute',
        bottom: height > 650 ? (-(height * 0.22)) : (-(height * 0.26)),
        height: height * 0.4,
        resizeMode: 'contain',
    },
    //height > 230 ? (height > 250 ? -moderateScale(height * 0.25) : -moderateScale(250 * 0.25)) : -moderateScale(230 * 0.25),
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },

    contentContainer: {
        marginTop: 32,
        //justifyContent: 'center',
        alignItems: 'center',
        //marginTop: height * 0.00,
    },
    dropdownContainer: {
        //width: 330,
        //justifyContent: 'center',
        //alignSelf: 'center',
        position: 'relative',
        zIndex: 2000,
        //paddingHorizontal: width * 0.05,
        marginBottom: 16,
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
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    inputFocused: {
        borderColor: '#289EF5',
        backgroundColor: '#FEFCFC',
    },
    image: {
        width: 20,
        height: 20,
        marginRight: width * 0.04,
        alignSelf: 'center',
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
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    saveContainer: {
        flexDirection: 'row',
        //marginHorizontal: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: height * 0.01,
        marginBottom: 30,
        paddingHorizontal: width * 0.1,
    },
    savedContainer: {
        height: 16,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    wrapShort: {
        paddingHorizontal: 8,
    },
    titleShort: {
        //marginRight: 5,
        color: '#000000',
        lineHeight: 16.8,
        fontSize: 12,
        fontWeight: '400',

    },
    inputContainerWithLabel: {
        //paddingHorizontal: width * 0.05,
    },
    label: {
        marginBottom: height * 0.005,
        fontSize: responsiveFontSize(14),
        color: '#121212',
        fontFamily: 'DMSans-Bold',
        lineHeight: 22,
    },
    requiredIndicator: {
        color: 'red', // Change the color as needed
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 5,
    },
    continueButton: {
        position: 'absolute',
        bottom: 30,
    },
});


export default EOfficeProfileCompletion1;