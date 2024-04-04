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



const NDProfileCompletion1 = ({ navigation }) => {

    const [selectedName, setSelectedName] = useState('');
    const [selectedEmail, setSelectedEmail] = useState('');
    const [selectedContactNumber, setSelectedContactNumber] = useState('');
    const [selectedAlternateContactNumber, setSelectedAlternateContactNumber] = useState('');
    const [selectedWappNumber, setSelectedWappNumber] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedGenderID, setSelectedGenderID] = useState();
    const [selectedProfession, setSelectedProfession] = useState('');
    const [selectedProfessionID, setSelectedProfessionID] = useState('');
    const [selectedDateOfBirth, setSelectedDateOfBirth] = useState('');

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const pr_id = await AsyncStorage.getItem('pr_id');
                const id = parseInt(pr_id);

                const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getvic-ax.php?prid=${id}`);
                const data = await response.json();
                setUserData(data.data);
                setSelectedName(data.data.name);
                setSelectedEmail(data.data.email);
                setSelectedContactNumber(data.data.phoneno);
                setSelectedAlternateContactNumber(data.data.alternate);
                setSelectedWappNumber(data.data.wp_number);
                setSelectedDateOfBirth(data.data.dob);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData(); // Call the function immediately

    }, []);


    const [optionsPro, setOptionsPro] = useState([]);
    const [gender, setGender] = useState([]);

    useEffect(() => {
        if (userData) {
            setSelectedGender(userData.genList.gender);
            setSelectedGenderID(userData.genList.gen_id);
            setSelectedProfession(userData.profession);
            setSelectedProfessionID(userData.proff_id);
        }
    }, [userData]);

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
            setSelectedDate(date); // Update the selected date
            const formattedDate = moment(date).format('DD MMMM, YYYY');
            setSelectedDateOfBirth(formattedDate); // Update the displayed date of birth
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




    const handleNext = async () => {
        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);
        const pr_ty_id = await AsyncStorage.getItem('pr_ty_id');

        const userData = {
            pr_ty_id: parseInt(pr_ty_id),
            pr_id: id,
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
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls1-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            console.log('Data Added to database');
            navigation.navigate('EditProfile')
        } catch (error) {
            console.error('An error occurred:', error);
        }


    };

    const toggleRectVisibility = () => {
        setIsRectVisible(!isRectVisible);
        setIsRect1Visible(!isRect1Visible);
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>

            ) : (
                    <View style={{ flex: 1 }}>
                        {userData && (
                <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.contentContainer}>

                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, { marginBottom: moderateScale(6), textAlign: 'center' }]}>
                                            Personal Details
                                </Text>
                                <Text style={[commonStyles.headerText2BL, { textAlign: 'center', paddingHorizontal: width * 0.02 }]}>
                                    Choose your career category and unlock endless possibilities.
                                </Text>

                            </View>

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
                                        autoFocus={true} // Set autoFocus to true
                                    />
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
                                        onChangeText={(text) => setSelectedContactNumber(text)}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
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
                                </View>
                            </View>

                                    <View style={styles.dropdownContainer}>
                                        <Text style={[commonStyles.headerText4BL, {
                                            marginBottom: height * 0.005,
                                        }]}>Specify your gender <Text style={styles.requiredIndicator}>*</Text></Text>


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
                                    />
                                </View>
                            </View>
                                    <View style={styles.dropdownContainer}>
                                        <Text style={[commonStyles.headerText4BL, {
                                            marginBottom: height * 0.005,
                                        }]}>Specify your profession <Text style={styles.requiredIndicator}>*</Text></Text>
                                  
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
                </View>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

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


export default NDProfileCompletion1;