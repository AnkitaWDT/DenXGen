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
    TouchableWithoutFeedback,
    FlatList,
    Picker,
    ToastAndroid,
    PixelRatio
} from 'react-native';
import CustomYearPicker from '../../components/CustomYearPicker';
import CustomMonthPicker from '../../components/CustomMonthPicker';
import commonStyles from '../../components/CommonStyles';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
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


const NDProfileCompletion6 = ({ navigation }) => {


    // const [isYearPickerVisible, setYearPickerVisible] = useState(false);
    // const [yearPickerType, setYearPickerType] = useState(null);


    // const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
    // const [monthPickerType, setMonthPickerType] = useState(null);

    const [selectedSinceYears, setSelectedSinceYears] = useState({});
    const [selectedUptoYears, setSelectedUptoYears] = useState({});
    const [isSinceYearPickerVisible, setSinceYearPickerVisible] = useState(false);
    const [sinceYearPickerType, setSinceYearPickerType] = useState(null);

    const [selectedSinceMonths, setSelectedSinceMonths] = useState({});
    const [selectedUptoMonths, setSelectedUptoMonths] = useState({});
    const [isSinceMonthPickerVisible, setSinceMonthPickerVisible] = useState(false);
    const [sinceMonthPickerType, setSinceMonthPickerType] = useState(null);

    const [EduInputs, setEduInputs] = useState([]);
    // const [EducationInputs, setEducationInputs] = useState([]);
    // const [ExpInputs, setExpInputs] = useState([]);
    // const [EduModalVisible, setEduModalVisible] = useState(false);
    // const [ExpModalVisible, setExpModalVisible] = useState(false);
    // const [EducationModalVisible, setEducationModalVisible] = useState(false);
    // const [newInputValue, setNewInputValue] = useState('');
    // const [newInputValue1, setNewInputValue1] = useState('');

    // const [selectedFromYear, setSelectedFromYear] = useState(null);
    // const [selectedFromMonth, setSelectedFromMonth] = useState(null);

    // const [selectedToYear, setSelectedToYear] = useState(null);
    // const [selectedToMonth, setSelectedToMonth] = useState(null);


    // const handleFromYearSelect = (year) => {
    //   setSelectedFromYear(year);
    // };

    // const handleFromMonthSelect = (month) => {
    //   setSelectedFromMonth(month);
    // };

    // const handleToYearSelect = (year) => {
    //   setSelectedToYear(year);
    // };

    // const handleToMonthSelect = (month) => {
    //   setSelectedToMonth(month);
    // };




    // const handleRemoveEducationInput = (indexToRemove) => {
    //   const updatedEducationInputs = EducationInputs.filter((_, index) => index !== indexToRemove);
    //   setEducationInputs(updatedEducationInputs);
    // };


    // const handleRemoveExpInput = (indexToRemove) => {
    //   const updatedExp = ExpInputs.filter((_, index) => index !== indexToRemove);
    //   setExpInputs(updatedExp);
    // };


    // const handleAddEducationInput = () => {
    //   setEducationModalVisible(true);
    // };

    // const handleEducationModalSubmit = () => {
    //   setEducationInputs([...EducationInputs, { Institute: newInputValue, Degree: newInputValue1 }]);
    //   setNewInputValue('');
    //   setNewInputValue1('');
    //   setEducationModalVisible(false);
    // };

    // const handleAddExpInput = () => {
    //   if (ExpInputs.length < 5) {
    //     setExpModalVisible(true);
    //   }
    // };

    // const handleEducationModalSubmit = () => {
    //   if (EducationInputs.length < 5 && newInputValue1 && newInputValue && selectedFromYear && selectedFromMonth && selectedToYear && selectedToMonth) {
    //     const newInputs = [
    //       ...EducationInputs,
    //       {
    //         Degree: newInputValue1,
    //         InstituteName: newInputValue,
    //         StartDate: { year: selectedFromYear, month: selectedFromMonth },
    //         EndDate: { year: selectedToYear, month: selectedToMonth }
    //       }
    //     ];
    //     setEducationInputs(newInputs);
    //   }
    //   setEducationModalVisible(false);
    //   setNewInputValue('');
    //   setNewInputValue1('');
    // };


    // const handleExpModalSubmit = () => {
    //   if (ExpInputs.length < 5) {
    //     const newInputs = [...ExpInputs, newInputValue];
    //     setExpInputs(newInputs);
    //   }
    //   setExpModalVisible(false);
    //   setNewInputValue('');
    // };

    // const handleEduModalSubmit = () => {
    //   if (EduInputs.length < 5) {
    //     const newInputs = [...EduInputs, newInputValue1];
    //     setEduInputs(newInputs);
    //   }
    //   setEduModalVisible(false); // Close the modal
    //   setNewInputValue1(''); // Reset newInputValue1
    // };


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

    const toggleSinceYearPicker = (sectionId) => {
        setSinceYearPickerVisible(!isSinceYearPickerVisible);
        //setActiveSectionW(sectionId);
        setSinceYearPickerType('since');
    };

    const toggleUptoYearPicker = (sectionId) => {
        setSinceYearPickerVisible(!isSinceYearPickerVisible);
        //setActiveSectionW(sectionId);
        setSinceYearPickerType('upto');
    };


    const toggleYearPicker = () => {
        setIsYearPickerVisible(!isYearPickerVisible);
    };

    // const toggleFromYearPicker = (sectionId) => {
    //   setYearPickerVisible(!isYearPickerVisible);
    //   //setActiveSection(sectionId);
    //   setYearPickerType('from');
    // };

    // const toggleToYearPicker = (sectionId) => {
    //   setYearPickerVisible(!isYearPickerVisible);
    //   //setActiveSection(sectionId);
    //   setYearPickerType('to');
    // };



    const toggleMonthPicker = () => {
        setIsExpMonthPickerVisible(!isExpMonthPickerVisible);
    };

    const toggleExpMonthPicker = () => {
        setIsExpMonthPickerVisible(!isExpMonthPickerVisible);
    };

    const toggleSinceMonthPicker = (sectionId) => {
        setSinceMonthPickerVisible(!isSinceMonthPickerVisible);
        //setActiveSectionW(sectionId);
        setSinceMonthPickerType('since');
    };



    // const toggleFromMonthPicker = (sectionId) => {
    //   setMonthPickerVisible(!isMonthPickerVisible);
    //   ///setActiveSection(sectionId);
    //   setMonthPickerType('from');
    // };

    // const toggleToMonthPicker = (sectionId) => {
    //   setMonthPickerVisible(!isMonthPickerVisible);
    //   //setActiveSection(sectionId);
    //   setMonthPickerType('to');
    // };

    // const handleCurrentlyWorkingToggle = () => {
    //   setCurrentlyWorking(!currentlyWorking);
    // };

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const pr_id = await AsyncStorage.getItem('pr_id');
                const id = parseInt(pr_id);

                const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getvic-ax.php?prid=${id}`);
                const data = await response.json();
                setUserData(data.data);
                setEducationInputs(data.data.eduList);
                setExpInputs(data.data.woexpList);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData(); // Call the function immediately

    }, []);


    const [newInputValue, setNewInputValue] = useState('');
    const [newInputValue1, setNewInputValue1] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [EducationInputs, setEducationInputs] = useState([]);
    const [EducationModalVisible, setEducationModalVisible] = useState(false);
    const [selectedFromYear, setSelectedFromYear] = useState(null);
    const [selectedFromMonth, setSelectedFromMonth] = useState(null);
    const [selectedToYear, setSelectedToYear] = useState(null);
    const [selectedToMonth, setSelectedToMonth] = useState(null);
    const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);
    const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);
    const [yearPickerType, setYearPickerType] = useState('');
    const [monthPickerType, setMonthPickerType] = useState('');

    const handleAddEducationInput = () => {
        // Reset state variables for date pickers
        setSelectedFromYear(null);
        setSelectedFromMonth(null);
        setSelectedToYear(null);
        setSelectedToMonth(null);
        setIsYearPickerVisible(false);
        setIsMonthPickerVisible(false);
        setYearPickerType('');
        setMonthPickerType('');
        setEducationModalVisible(true);
    };

    const handleRemoveEducationInput = (indexToRemove) => {
        const updatedEducationInputs = EducationInputs.filter((_, index) => index !== indexToRemove);
        setEducationInputs(updatedEducationInputs);
    };

    const handleEducationModalSubmit = () => {
        setEducationInputs(prevInputs => [
            ...prevInputs,
            {
                institute: newInputValue,
                Degree: newInputValue1,
                StartMonth: selectedFromMonth,
                StartYear: selectedFromYear,
                EndMonth: selectedToMonth,
                EndYear: selectedToYear, // Combine selected month and year for end date
            }
        ]);
        setNewInputValue('');
        setNewInputValue1('');
        setSelectedFromYear(null);
        setSelectedFromMonth(null);
        setSelectedToYear(null);
        setSelectedToMonth(null);
        setEducationModalVisible(false);
    };



    const toggleFromYearPicker = () => {
        setIsYearPickerVisible(!isYearPickerVisible);
        setYearPickerType('from');
    };

    const handleFromYearSelect = (year) => {
        setSelectedFromYear(year);
        setIsYearPickerVisible(false);
    };

    const toggleFromMonthPicker = () => {
        setIsMonthPickerVisible(!isMonthPickerVisible);
        setMonthPickerType('from');
    };

    const handleFromMonthSelect = (month) => {
        setSelectedFromMonth(month);
        setIsMonthPickerVisible(false);
    };

    const toggleToYearPicker = () => {
        setIsYearPickerVisible(!isYearPickerVisible);
        setYearPickerType('to');
    };

    const handleToYearSelect = (year) => {
        setSelectedToYear(year);
        setIsYearPickerVisible(false);
    };

    const toggleToMonthPicker = () => {
        setIsMonthPickerVisible(!isMonthPickerVisible);
        setMonthPickerType('to');
    };

    const handleToMonthSelect = (month) => {
        setSelectedToMonth(month);
        setIsMonthPickerVisible(false);
    };


    const [newInputValue2, setNewInputValue2] = useState('');
    const [newInputValue3, setNewInputValue3] = useState('');
    const [ExpInputs, setExpInputs] = useState([]);
    const [ExpModalVisible, setExpModalVisible] = useState(false);
    const [selectedExpFromYear, setSelectedExpFromYear] = useState(null);
    const [selectedExpFromMonth, setSelectedExpFromMonth] = useState(null);
    const [selectedExpToYear, setSelectedExpToYear] = useState(null);
    const [selectedExpToMonth, setSelectedExpToMonth] = useState(null);
    const [isExpYearPickerVisible, setIsExpYearPickerVisible] = useState(false);
    const [isExpMonthPickerVisible, setIsExpMonthPickerVisible] = useState(false);
    const [expYearPickerType, setExpYearPickerType] = useState('');
    const [expMonthPickerType, setExpMonthPickerType] = useState('');
    const [currentlyWorking, setCurrentlyWorking] = useState(false);


    const handleAddExpInput = () => {
        setSelectedExpFromYear(null);
        setSelectedExpFromMonth(null);
        setSelectedExpToYear(null);
        setSelectedExpToMonth(null);
        setIsExpYearPickerVisible(false);
        setIsExpMonthPickerVisible(false);
        setExpYearPickerType('');
        setExpMonthPickerType('');
        setExpModalVisible(true);
    };

    const handleRemoveExpInput = (indexToRemove) => {
        const updatedExpInputs = ExpInputs.filter((_, index) => index !== indexToRemove);
        setExpInputs(updatedExpInputs);
    };


    const handleExpModalSubmit = () => {
        setExpInputs(prevInputs => [
            ...prevInputs,
            {
                company: newInputValue2,
                Designation: newInputValue3,
                StartMonth: selectedExpFromMonth,
                StartYear: selectedExpFromYear,
                EndMonth: selectedExpToMonth,
                EndYear: selectedExpToYear,
                // StartDate: selectedExpFromMonth + ' ' + selectedExpFromYear,
                // EndDate: currentlyWorking ? 'null' : (selectedExpToMonth + ' ' + selectedExpToYear),
            }
        ]);
        setNewInputValue2('');
        setNewInputValue3('');
        setSelectedExpFromYear(null);
        setSelectedExpFromMonth(null);
        setSelectedExpToYear(null);
        setSelectedExpToMonth(null);
        setExpModalVisible(false);
    };

    const toggleExpFromYearPicker = () => {
        setIsExpYearPickerVisible(!isExpYearPickerVisible);
        setExpYearPickerType('from');
    };

    const handleExpFromYearSelect = (year) => {
        setSelectedExpFromYear(year);
        setIsExpYearPickerVisible(false);
    };

    const toggleExpFromMonthPicker = () => {
        setIsExpMonthPickerVisible(!isExpMonthPickerVisible);
        setExpMonthPickerType('from');
    };

    const handleExpFromMonthSelect = (month) => {
        setSelectedExpFromMonth(month);
        setIsExpMonthPickerVisible(false);
    };

    const toggleExpToYearPicker = () => {
        setIsExpYearPickerVisible(!isExpYearPickerVisible);
        setExpYearPickerType('to');
    };

    const handleExpToYearSelect = (year) => {
        setSelectedExpToYear(year);
        setIsExpYearPickerVisible(false);
    };

    const toggleExpToMonthPicker = () => {
        setIsExpMonthPickerVisible(!isExpMonthPickerVisible);
        setExpMonthPickerType('to');
    };

    const handleExpToMonthSelect = (month) => {
        setSelectedExpToMonth(month);
        setIsExpMonthPickerVisible(false);
    };

    const handleCurrentlyWorkingToggle = () => {
        setCurrentlyWorking(!currentlyWorking);
    };


    const handleNext = async () => {
        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);

        const edu_id = EducationInputs.map(edu => ({
            institute: edu.institute,
            degree: edu.Degree,
            start_month: edu.StartMonth,
            start_year: edu.StartYear,
            end_month: edu.EndMonth,
            end_year: edu.EndYear,
        }));

        // Map over WorkExperience array and transform each item
        const wo_exp_id = ExpInputs.map(exp => ({
            company: exp.company,
            designation: exp.Designation,
            start_month: exp.StartMonth,
            start_year: exp.StartYear,
            end_month: exp.EndMonth,
            end_year: exp.EndYear,
        }));

        const userData = {
            pr_id: id,
            edu_id,
            wo_exp_id,
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls6-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            navigation.navigate('EditProfile')
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
    };



    const currentStep = 6; // For example, current step is 4
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
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                        <View style={styles.contentContainer}>
                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, {
                                    marginBottom: moderateScale(6), textAlign: 'center'
                                }]}>Career Details</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Choose your career category and unlock endless possibilities.</Text>

                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                    Educational Qualification <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                    {EducationInputs.map((value, index) => (
                                        <View key={index} style={[styles.inputContainer1, index !== EducationInputs.length - 1 && { marginHorizontal: 10 }]}>
                                            <TextInput
                                                style={styles.inputs}
                                                placeholder="Enter Institute Name"
                                                placeholderTextColor="#979797"
                                                value={value.institute}
                                                underlineColorAndroid="transparent"
                                                editable={false}
                                            />
                                            <TouchableOpacity onPress={() => handleRemoveEducationInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                                <Image
                                                    source={require('../../../assets/img/close.png')}
                                                    style={styles.closeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {/* Add new Education input */}
                                    {EducationInputs.length < 5 && (
                                        <TouchableOpacity onPress={handleAddEducationInput} style={[styles.inputContainer1, { marginHorizontal: 10 }]} activeOpacity={0.8}>
                                            <Text style={[styles.inputsP, { textAlignVertical: 'center' }]}>Add Educational Qualification</Text>
                                        </TouchableOpacity>
                                    )}

                                <Modal visible={EducationModalVisible} transparent onRequestClose={() => setEducationModalVisible(false)}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.modalContainer} onPress={() => setEducationModalVisible(false)}>
                                        <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => { }}>
                                            <ScrollView>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02 }]}>Educational Qualification
                                                    <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                                </Text>
                                                <View style={[styles.inputContainer1]}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Enter Institute Name"
                                                        placeholderTextColor="#979797"
                                                        value={newInputValue}
                                                        onChangeText={setNewInputValue}
                                                    />
                                                </View>
                                                <View style={[styles.inputContainer1]}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Enter Degree"
                                                        placeholderTextColor="#979797"
                                                        value={newInputValue1}
                                                        onChangeText={setNewInputValue1}
                                                    />
                                                </View>
                                                <View style={styles.dropdownContainer}>
                                                    <Text style={[commonStyles.headerText2BL, { marginBottom: height * 0.02, textDecorationLine: 'underline' }]}>Start Date</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Month  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleFromMonthPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedFromMonth ? selectedFromMonth.toString() : 'Month'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isMonthPickerVisible && monthPickerType === 'from' && (
                                                            <CustomMonthPicker onSelectMonth={handleFromMonthSelect} onClose={toggleFromMonthPicker} />
                                                        )}


                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Year  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleFromYearPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedFromYear ? selectedFromYear.toString() : 'Year'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isYearPickerVisible && yearPickerType === 'from' && (
                                                            <CustomYearPicker onSelectYear={handleFromYearSelect} onClose={toggleFromYearPicker} initialSelectedYear={selectedFromYear} />
                                                        )}

                                                    </View>
                                                </View>

                                                <View>
                                                    <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02, textDecorationLine: 'underline' }]}>End Date (or expected)</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Month  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleToMonthPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedToMonth ? selectedToMonth.toString() : 'Month'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isMonthPickerVisible && monthPickerType === 'to' && (
                                                            <CustomMonthPicker onSelectMonth={handleToMonthSelect} onClose={toggleToMonthPicker} />
                                                        )}


                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Year  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleToYearPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedToYear ? selectedToYear.toString() : 'Year'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isYearPickerVisible && yearPickerType === 'to' && (
                                                            <CustomYearPicker onSelectYear={handleToYearSelect} onClose={toggleToYearPicker} initialSelectedYear={selectedToYear} />
                                                        )}

                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    style={[commonStyles.button]}
                                                    onPress={handleEducationModalSubmit}
                                                    activeOpacity={0.8}
                                                >
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>
                                            </ScrollView>

                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: height * 0.005 }]}>
                                    Work Experience <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                    {ExpInputs.map((value, index) => (
                                        <View key={index} style={[styles.inputContainer1, index !== ExpInputs.length - 1 && { marginHorizontal: 10 }]}>
                                            <TextInput
                                                style={styles.inputs}
                                                placeholder="Enter Company"
                                                placeholderTextColor="#979797"
                                                value={value.company}
                                                underlineColorAndroid="transparent"
                                                editable={false}
                                            />
                                            <TouchableOpacity onPress={() => handleRemoveExpInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                                <Image
                                                    source={require('../../../assets/img/close.png')}
                                                    style={styles.closeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {/* Add new Experience input */}
                                    {ExpInputs.length < 5 && (
                                        <TouchableOpacity onPress={handleAddExpInput} style={[styles.inputContainer1, { marginHorizontal: 10 }]} activeOpacity={0.8}>
                                            <Text style={[styles.inputsP, { textAlignVertical: 'center' }]}>Add Work Experience</Text>
                                        </TouchableOpacity>
                                    )}

                                <Modal visible={ExpModalVisible} transparent onRequestClose={() => setExpModalVisible(false)}>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.modalContainer} onPress={() => setExpModalVisible(false)}>
                                        <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => { }}>
                                            <ScrollView>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText11BL, { marginVertical: height * 0.02 }]}>Working Experience
                                                    <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum
                                                </Text>
                                                <View style={[styles.inputContainer1]}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Enter Company"
                                                        placeholderTextColor="#979797"
                                                        value={newInputValue2}
                                                        onChangeText={setNewInputValue2}
                                                    />
                                                </View>
                                                <View style={[styles.inputContainer1]}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Enter Designation"
                                                        placeholderTextColor="#979797"
                                                        value={newInputValue3}
                                                        onChangeText={setNewInputValue3}
                                                    />
                                                </View>
                                                <View style={styles.dropdownContainer}>
                                                    <Text style={[commonStyles.headerText2BL, { marginBottom: height * 0.02, textDecorationLine: 'underline' }]}>Start Date</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Month  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleExpFromMonthPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedExpFromMonth ? selectedExpFromMonth.toString() : 'Month'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isExpMonthPickerVisible && expMonthPickerType === 'from' && (
                                                            <CustomMonthPicker onSelectMonth={handleExpFromMonthSelect} onClose={toggleExpFromMonthPicker} />
                                                        )}

                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Year  :</Text>
                                                            <TouchableOpacity
                                                                onPress={() => toggleExpFromYearPicker()}
                                                                style={styles.yearDropdown}
                                                            >
                                                                <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedExpFromYear ? selectedExpFromYear.toString() : 'Year'}</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                        {isExpYearPickerVisible && expYearPickerType === 'from' && (
                                                            <CustomYearPicker onSelectYear={handleExpFromYearSelect} onClose={toggleExpFromYearPicker} initialSelectedYear={selectedExpFromYear} />
                                                        )}




                                                    </View>
                                                </View>

                                                <TouchableOpacity style={styles.toggleRow}
                                                    activeOpacity={0.8}
                                                    onPress={() =>
                                                        handleCurrentlyWorkingToggle()
                                                    }>
                                                    <Text style={[commonStyles.headerText2BL, { textDecorationLine: 'underline' }]}>Currently Working</Text>
                                                    <View
                                                        style={styles.toggleButton}
                                                    >
                                                        <Image
                                                            source={
                                                                currentlyWorking
                                                                    ? require('../../../assets/img/Rect1.png')
                                                                    : require('../../../assets/img/Rect.png')
                                                            }
                                                            style={styles.toggleIcon}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                                {!currentlyWorking && (
                                                    <View style={styles.dropdownContainer}>
                                                        <Text style={[commonStyles.headerText2BL, { marginVertical: height * 0.02, textDecorationLine: 'underline' }]}>End Date (or expected)</Text>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Month  :</Text>
                                                                <TouchableOpacity
                                                                    onPress={() => toggleExpToMonthPicker()}
                                                                    style={styles.yearDropdown}
                                                                >
                                                                    <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedExpToMonth ? selectedExpToMonth.toString() : 'Month'}</Text>
                                                                </TouchableOpacity>
                                                            </View>

                                                            {isExpMonthPickerVisible && expMonthPickerType === 'to' && (
                                                                <CustomMonthPicker onSelectMonth={handleExpToMonthSelect} onClose={toggleExpToMonthPicker} />
                                                            )}

                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={[commonStyles.headerText3BL, { alignSelf: 'center', marginRight: 10 }]}>Year  :</Text>
                                                                <TouchableOpacity
                                                                    onPress={() => toggleExpToYearPicker()}
                                                                    style={styles.yearDropdown}
                                                                >
                                                                    <Text style={[commonStyles.headerText3BL, { color: '#000', fontSize: 15 }]}>{selectedExpToYear ? selectedExpToYear.toString() : 'Year'}</Text>
                                                                </TouchableOpacity>
                                                            </View>

                                                            {isExpYearPickerVisible && expYearPickerType === 'to' && (
                                                                <CustomYearPicker onSelectYear={handleExpToYearSelect} onClose={toggleExpToYearPicker} initialSelectedYear={selectedExpToYear} />
                                                            )}



                                                        </View>
                                                    </View>
                                                )}

                                                <TouchableOpacity
                                                    style={[commonStyles.button]}
                                                    onPress={handleExpModalSubmit}
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
        marginVertical: 5,
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


export default NDProfileCompletion6;
