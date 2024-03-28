/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, ToastAndroid, PixelRatio } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_CONFIG } from '../../API/APIConfig';


const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};



const ProfileCompletion1 = ({ navigation }) => {

    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedContactNumber, setSelectedContactNumber] = useState('');
    const [selectedAlternateContactNumber, setSelectedAlternateContactNumber] = useState('');
    const [selectedWappNumber, setSelectedWappNumber] = useState('');
    const [selectedGender, setSelectedGender] = useState();
    const [selectedGenderID, setSelectedGenderID] = useState();
    const [selectedProfession, setSelectedProfession] = useState('');
    const [selectedProfessionID, setSelectedProfessionID] = useState('');
    const [selectedDateOfBirth, setSelectedDateOfBirth] = useState('');

    const [isFocused, setIsFocused] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isContactFocused, setIsContactFocused] = useState(false);
    const [isAltCFocused, setIsAltCFocused] = useState(false);
    const [isWappCFocused, setIsWappCFocused] = useState(false);  
    const [isDateOfBirthFocused, setIsDateOfBirthFocused] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

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


    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const phoneno = await AsyncStorage.getItem('phoneno');
                if (phoneno) {
                    setSelectedContactNumber(phoneno);
                }
            } catch (error) {
                console.log('Error retrieving phone number:', error);
            }
        };

        fetchPhoneNumber();
    }, []);

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
        //     const userData = {
        //         name: selectedName,
        //         email: selectedEmail,
        //         contactNumber: selectedContactNumber,
        //         alternateContactNumber: selectedAlternateContactNumber,
        //         wappNumber: selectedWappNumber,
        //         gender: selectedGender,
        //         profession: selectedProfession,
        //     };

        //     console.log('User Data:', userData);

        //     navigation.navigate('LoginScreen');
        // }
        const userid = await AsyncStorage.getItem('userid');
        const id = parseInt(userid);

        const userData = {
            id: id,
            name: selectedName,
            email: selectedEmail,
            phoneno: selectedContactNumber,
            alternate: selectedAlternateContactNumber,
            wp_number: selectedWappNumber,
            gen_id: selectedGenderID,
            proff_id: selectedProfessionID,
            dob: selectedDateOfBirth
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/requserdtls-ax.php`, userData);

            console.log('dataresponse', response.data);
            //ToastAndroid.show("Product Added Successfully!", ToastAndroid.SHORT);
            console.log('Data Added to database');
        } catch (error) {
            console.error('An error occurred:', error);
        }

        navigation.navigate('LocationScreen');
    };

    const toggleRectVisibility = () => {
        setIsRectVisible(!isRectVisible);
        setIsRect1Visible(!isRect1Visible);
    };

    const [optionsPro, setOptionsPro] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        const fetchProfessionList = async () => {
            try {
                const response = await axios.get(`${API_CONFIG.API_DOMAIN}${API_CONFIG.professionListUrl}`);
                const data = response.data;
                console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    console.log("Filtered data:", filteredData); // Log filtered data

                    const professionOptions = filteredData.map(item => ({
                        label: item.profession,
                        value: item.profession,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    console.log("Dropdown options:", professionOptions); // Log dropdown options

                    setOptionsPro(professionOptions);
                } else {
                    console.error('Error fetching profession options');
                }
            } catch (error) {
                console.error('Error fetching profession options:', error);
            }
        };

        fetchProfessionList();
    }, []);


    useEffect(() => {
        const fetchGenderList = async () => {
            try {
                const response = await axios.get(`${API_CONFIG.API_DOMAIN}${API_CONFIG.genderListUrl}`);
                const data = response.data;
                if (data.code === 1) {
                    const genderOptions = data.data.map(item => ({
                        label: item.gender,
                        value: item.gender,
                        id: parseInt(item.id)
                    }));
                    setGender(genderOptions);
                } else {
                    console.error('Error fetching gender options');
                }
            } catch (error) {
                console.error('Error fetching gender options:', error);
            }
        };

        fetchGenderList();
    }, []);

    // useEffect(() => {
    //     fetch('https://temp.wedeveloptech.in/denxgen/appdata/getprofflist-ax.php')
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.code === 1) {
    //                 const categoryId = parseInt(AsyncStorage.getItem('pr_ty_id'));
    //                 const filteredOptions = data.data.filter(item => item.pr_ty_id === categoryId);
    //                 const professionOptions = filteredOptions.map(item => ({
    //                     label: item.profileType,
    //                     value: item.profession
    //                 }));
    //                 setOptionsPro(professionOptions);
    //             } else {
    //                 console.error('Error fetching profession options');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching profession options:', error);
    //         });
    // }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>

            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Header */}
                    <View style={styles.headerContainer}>
                        <Image source={require('../../../assets/img/LS.png')} style={styles.headerImageBackground} />
                        <View style={styles.headerTextContainer}>
                            <Text style={[commonStyles.headerText1W, {
                                marginBottom: moderateScale(8),

                            }]}>Personal Details</Text>
                            <Text style={[commonStyles.headerText2W, {
                                paddingHorizontal: moderateScale(16), textAlign: 'center',
                            }]}>Please provide your personal details for better user experience.</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>

                        <View style={styles.inputContainerWithLabel}>
                            <Text style={[commonStyles.headerText4BL, {
                                marginBottom: moderateScale(8),

                            }]}>Name <Text style={styles.requiredIndicator}>*</Text></Text>
                            <View style={[styles.inputContainer1, isNameFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder="Enter your name"
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
                                marginBottom: moderateScale(8),
                            }]}>Email Address <Text style={styles.requiredIndicator}>*</Text></Text>
                            <View style={[styles.inputContainer1, isEmailFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.inputs}
                                        placeholder="Enter your email address"
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
                                marginBottom: moderateScale(8),
                            }]}>Contact Number 1 <Text style={styles.requiredIndicator}>*</Text></Text>
                            <View style={[styles.inputContainer1, isContactFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor="#979797"
                                    maxLength={10}
                                    keyboardType="phone-pad"
                                    value={selectedContactNumber}
                                    editable={false}
                                    // onChangeText={(text) => setSelectedContactNumber(text)}
                                    // underlineColorAndroid="transparent"
                                    // onFocus={() => setIsContactFocused(true)}
                                    // onBlur={() => setIsContactFocused(false)}
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
                                marginBottom: moderateScale(8),
                            }]}>Contact Number 2 <Text style={styles.requiredIndicator}>*</Text></Text>
                            <View style={[styles.inputContainer1, isAltCFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.inputs}
                                        placeholder="Enter your alternate phone number"
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

                        <View style={styles.dropdownContainer}>
                            <Text style={[commonStyles.headerText4BL, {
                                marginBottom: height * 0.005,
                            }]}>Specify your gender <Text style={styles.requiredIndicator}>*</Text></Text>
                            {/* <CustomDropdown
                                options={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'Female' },
                                    { label: 'Other', value: 'Other' },
                                ]}
                                onSelect={(value) => setSelectedGender(value)}
                                selectedValue={selectedGender}
                                placeholder="Select Option"
                            /> */}
                              
                                <CustomDropdown
                                    options={gender}
                                    onSelect={(value, id) => {
                                        console.log('Selected Profession:', value);
                                        console.log('Selected ProfessionID:', id);
                                        setSelectedGender(value);
                                        setSelectedGenderID(id);
                                    }}
                                    selectedValue={selectedGender}
                                    placeholder="Select Option"
                                />

                        </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText2BL, { marginBottom: height * 0.005 }]}>
                                    Date of Birth <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <TouchableOpacity
                                    onPress={showDatePicker}
                                    style={[styles.inputContainer1, isDateOfBirthFocused && styles.inputFocused]}
                                >
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Enter your Date of Birth"
                                        placeholderTextColor="#979797"
                                        value={selectedDateOfBirth}
                                        editable={false}
                                    />
                                    {selectedDateOfBirth.length > 0 && (
                                        <Image source={require('../../../assets/img/checked.png')} style={styles.image} />
                                    )}
                                </TouchableOpacity>

                                {isDateOfBirthFocused && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                            </View>

                            {/* <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText2BL, {
                                    marginBottom: height * 0.005,
                                }]}>Date of Birth <Text style={styles.requiredIndicator}>*</Text></Text>
                                <TouchableOpacity onPress={showDatePicker} style={[styles.inputContainer1, isDateOfBirthFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Date of Birth"
                                        placeholderTextColor="#979797"
                                        value={moment(birthDate).format('DD MMMM, YYYY')}
                                        onChangeText={(text) => setSelectedDateOfBirth(text)}
                                        underlineColorAndroid="transparent"
                                        onFocus={() => setIsDateOfBirthFocused(true)}
                                        onBlur={() => setIsDateOfBirthFocused(false)}
                                        editable={false}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        date={birthDate} // Pass the birthDate as the date prop
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    {selectedDateOfBirth.length > 0 && (
                                        <Image
                                            source={require('../../../assets/img/checked.png')}
                                            style={styles.image}
                                        />
                                    )}
                                </TouchableOpacity>

                            </View> */}


                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, {
                                    marginBottom: moderateScale(8),
                                }]}>WhatsApp Number <Text style={styles.requiredIndicator}>*</Text></Text>
                                <View style={[styles.inputContainer1, isWappCFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Enter your whatsapp number"
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

                        <View style={styles.dropdownContainer}>
                            <Text style={[commonStyles.headerText4BL, {
                                marginBottom: height * 0.005,
                            }]}>Specify your profession <Text style={styles.requiredIndicator}>*</Text></Text>
                            {/* <CustomDropdown
                                options={[
                                    { label: 'A Dental Professional', value: 'Dental' },
                                    { label: 'An Intern', value: 'An Intern' },
                                    { label: 'Student', value: 'BDS' },
                                ]}
                                onSelect={(value) => setSelectedProfession(value)}
                                selectedValue={selectedProfession}
                                placeholder="Select Option"
                            /> */}
                                <CustomDropdown
                                    options={optionsPro}
                                    onSelect={(value, id) => {
                                        console.log('Selected Profession:', value); 
                                        console.log('Selected ProfessionID:', id); 
                                        setSelectedProfession(value);
                                        setSelectedProfessionID(id);
                                    }}
                                    selectedValue={selectedProfession}
                                    placeholder="Select Option"
                                />


                        </View>

                    </View>


                    <TouchableOpacity
                            style={[commonStyles.button, { marginBottom: moderateScale(50), }]}
                        onPress={handleNext}
                        activeOpacity={0.8}
                    >
                        <Text style={commonStyles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                
                </ScrollView>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',

    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        
    },
    headerImageBackground: {
        position: 'absolute',
        bottom: height > 650 ? (-moderateScale(height * 0.22)) : (-moderateScale(height * 0.26)),
        height: height * 0.4,
        resizeMode: 'contain',
    },
    //height > 230 ? (height > 250 ? -moderateScale(height * 0.25) : -moderateScale(250 * 0.25)) : -moderateScale(230 * 0.25),
    headerTextContainer: {
        position: 'absolute',
        marginTop: moderateScale(35),
        // marginLeft: width * 0.08,
        width: '100%',
        //height: height * 0.05,
        alignItems: 'center',
        zIndex: 1,
    },

    contentContainer: {
        //paddingHorizontal: width * 0.02,
        marginTop: height > 650 ? (moderateScale(195)) : (moderateScale(170)),
        paddingHorizontal: moderateScale(16),
    },

    dropdownContainer: {
        //width: 330,
        //justifyContent: 'center',
        //alignSelf: 'center',
        position: 'relative',
        zIndex: 2000,
        //paddingHorizontal: width * 0.05,
        marginBottom: moderateScale(16),
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
});


export default ProfileCompletion1;