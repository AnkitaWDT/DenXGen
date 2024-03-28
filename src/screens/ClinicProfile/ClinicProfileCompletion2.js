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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ClinicProfileCompletion2 = ({ navigation }) => {

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

    const currentStep = 2; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    console.log("Progress Percentage:", progressPercentage);

    const [selectedTimes, setSelectedTimes] = useState({
        Monday: { from: '', to: '' },
        Tuesday: { from: '', to: '' },
        Wednesday: { from: '', to: '' },
        Thursday: { from: '', to: '' },
        Friday: { from: '', to: '' },
        Saturday: { from: '', to: '' },
        Sunday: { from: '', to: '' },
    });
    const [additionalInputs, setAdditionalInputs] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedType, setSelectedType] = useState('from');

    useEffect(() => {
        const fakeAsyncOperation = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsLoading(false);
        };
        fakeAsyncOperation();
    }, []);

    // const showTimePicker = (day, type) => {
    //     setSelectedDay(day);
    //     setSelectedType(type);
    //     setIsTimePickerVisible(true);
    // };

    const showTimePicker = (day, type, index) => {
        setSelectedDay(day);
        setSelectedType(type);
        setIsTimePickerVisible(true);
        setSelectedAdditionalIndex(index); // Update to use setSelectedAdditionalIndex
        setSelectedDayFromIndex(index); // Assuming setSelectedDayFromIndex and setSelectedDayToIndex are defined elsewhere
        setSelectedDayToIndex(index); // Assuming setSelectedDayFromIndex and setSelectedDayToIndex are defined elsewhere
    };


    const [selectedDayFromIndex, setSelectedDayFromIndex] = useState(null);
    const [selectedDayToIndex, setSelectedDayToIndex] = useState(null);
    const [selectedAdditionalIndex, setSelectedAdditionalIndex] = useState(null);



    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            const formattedTime = moment(time).format('h:mm A');
            setSelectedTimes(prevState => ({
                ...prevState,
                [selectedDay]: {
                    ...prevState[selectedDay],
                    [selectedType]: formattedTime,
                },
            }));
            setIsTimePickerVisible(false);
        } else {
            setIsTimePickerVisible(false);
        }
    };

    const addTimeInput = (day) => {
        if (selectedTimes[day].length < 5) {
            setSelectedTimes(prevState => ({
                ...prevState,
                [day]: [...prevState[day], { from: '', to: '' }],
            }));
        }
    };

    const addAdditionalInput = (day) => {
        const updatedInputs = [...additionalInputs[day], ''];
        setAdditionalInputs(prevState => ({
            ...prevState,
            [day]: updatedInputs,
        }));
    };

    // Function to handle input change for additional inputs
    // Function to handle input change for additional inputs
    const handleAdditionalInputChange = (day, index, text) => {
        const updatedInputs = [...additionalInputs[day]];
        updatedInputs[index] = text;
        const updatedAdditionalInputs = { ...additionalInputs }; // Copy the additionalInputs object
        updatedAdditionalInputs[day] = updatedInputs; // Update the inputs for the specific day
        setAdditionalInputs(updatedAdditionalInputs); // Update the state
    };



    const [showAdditionalInput, setShowAdditionalInput] = useState(true);


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
                                    marginBottom: 6, textAlign: 'center'
                                }]}>Step 2- Timings</Text>
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
                            {Object.keys(selectedTimes).map((day, index) => (
                                <View key={day}>
                                    <View style={styles.dayRow}>
                                        <Text style={[commonStyles.headerText4BL, { textAlign: 'center' }]}>{day} :</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={styles.inputContainerT}
                                                activeOpacity={0.8}
                                                onPress={() => showTimePicker(day, 'from')}
                                            >
                                                <TextInput
                                                    style={styles.inputs}
                                                    placeholder="00:00 AM"
                                                    placeholderTextColor="#979797"
                                                    value={selectedTimes[day].from}
                                                    underlineColorAndroid="transparent"
                                                    editable={false}
                                                />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.inputContainerT}
                                                activeOpacity={0.8}
                                                onPress={() => showTimePicker(day, 'to')}
                                            >
                                                <TextInput
                                                    style={styles.inputs}
                                                    placeholder="00:00 AM"
                                                    placeholderTextColor="#979797"
                                                    value={selectedTimes[day].to}
                                                    underlineColorAndroid="transparent"
                                                    editable={false}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* {additionalInputs[day].map((time, index) => (
                                        <View style={styles.dayRow} key={index}>
                                            <Text style={styles.dayLabel}></Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity
                                                    style={styles.inputContainerT}
                                                    activeOpacity={0.8}
                                                    onPress={() => showTimePicker(day, 'from', index)}
                                                >
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="00:00 AM"
                                                        placeholderTextColor="#979797"
                                                        value={time.from}
                                                        onChangeText={(text) => handleAdditionalInputChange(day, index, text)}
                                                        underlineColorAndroid="transparent"
                                                        editable={false}
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={styles.inputContainerT}
                                                    activeOpacity={0.8}
                                                    onPress={() => showTimePicker(day, 'to', index)}
                                                >
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="00:00 AM"
                                                        placeholderTextColor="#979797"
                                                        value={time.to}
                                                        onChangeText={(text) => handleAdditionalInputChange(day, index, text)}
                                                        underlineColorAndroid="transparent"
                                                        editable={false}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}

                                    {additionalInputs[day].length < 4 && (
                                        <TouchableOpacity onPress={() => addAdditionalInput(day)} style={styles.addButton}>
                                            <Text style={styles.addButtonText}>+ Add</Text>
                                        </TouchableOpacity>
                                    )} */}
                                    {index < Object.keys(selectedTimes).length - 1 && <View style={styles.horizontalLineD} />}
                                </View>
                            ))}
                            {isTimePickerVisible && (
                                <DateTimePicker
                                    value={selectedTimes[selectedDay][selectedType] ? moment(selectedTimes[selectedDay][selectedType], 'h:mm A').toDate() : new Date()} // Updated line
                                    mode="time" // Set mode to time
                                    display="default"
                                    onChange={(event, time) => handleTimeChange(event, time, selectedType === 'from' ? selectedDayFromIndex : selectedDayToIndex)} // Pass the appropriate index based on selected type
                                />
                            )}


                            <TouchableOpacity
                                style={[commonStyles.button]}
                                onPress={() => {
                                    navigation.navigate('ClinicProfileCompletion3');
                                    console.log('ProfileCompletion21');
                                }}
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

    horizontalLineD: {
        width: '100%',
        height: 1,
        marginBottom: 16,
        marginTop: 6,
        //marginHorizontal: 10,
        backgroundColor: '#979797',
    },
    horizontalLine: {
        width: '20%',
        height: 5,
        marginBottom: height * 0.03,
        //marginHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#979797',
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
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: 16,
        paddingBottom: 100,
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
        marginTop: 32,
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
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    inputContainerT: {
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: 40,
        width: 85,
        //paddingHorizontal: 10,
        marginLeft: 10,
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
        alignSelf: 'center',
        textAlign: 'center',
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        //flex: 1
        width: '100%'
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
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    addButtonText: {
        fontSize: 14,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        lineHeight: 20
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
    checkboxImage: {
        height: 18,
        width: 18,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        //flexWrap: 'wrap',
        marginVertical: 12,
        paddingRight: 18,
        // paddingLeft: moderateScale(18),
    },
    hoveredCheckboxContainer: {
        backgroundColor: '#E8F8FF',
    },
    servicesContainer11: {
        //paddingHorizontal: moderateScale(18),
    },
    dayRow: {
        flexDirection: 'row', // Ensure items are laid out horizontally
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },

    dayLabel: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Mukta-Bold',
    },

});

export default ClinicProfileCompletion2;
