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


const OfficeProfileCompletion5 = ({ navigation }) => {

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

    const [treatmentsData] = useState([
        'English',
        'Hindi',
        'Marathi',
        'Bengali',
        'Telugu',
        'Tamil',
        'Gujarati',
        'Urdu',
        'Kannada',
        'Odia',
        'Malayalam',
        'Punjabi',
    ]);

    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [otherTreatments, setOtherTreatments] = useState('');
    const [treatmentsModalVisible, setTreatmentsModalVisible] = useState(false);
    const [showOtherTreatmentsInput, setShowOtherTreatmentsInput] = useState(false);

    const handleTreatmentsModal = () => {
        setTreatmentsModalVisible(true);
    };

    const handleCloseTreatmentsModal = () => {
        setTreatmentsModalVisible(false);
    };

    const handleTreatmentsModalSubmit = () => {
        let updatedTreatments = [...selectedTreatments];

        // If otherSpecialty is not empty, include it
        if (otherTreatments.trim() !== '') {
            updatedTreatments.push(otherTreatments.trim());
        }

        // Update the main text input with the combined specialties
        setSelectedTreatments(updatedTreatments);

        // Close the modal
        setTreatmentsModalVisible(false);
    };

    const toggleTreatments = (treatments) => {
        if (selectedTreatments.includes(treatments)) {
            setSelectedTreatments(selectedTreatments.filter((item) => item !== treatments));
        } else {
            if (selectedTreatments.length < 5) {
                setSelectedTreatments([...selectedTreatments, treatments]);
            } else {
                ToastAndroid.show('You can select only upto 5 Treatments!', ToastAndroid.SHORT);
            }
        }
    };

    const toggleOtherTreatmentsInput = () => {
        setShowOtherTreatmentsInput(!showOtherTreatmentsInput);
    };

    const [servicesData] = useState([
        'Dental implant',
        'Root canal',
        'Teeth Whitening',
        'Root canal treatment',
        'Dentures',
        'Teeth cleaning',
        'Dental braces',
    ]);

    const [selectedServices, setSelectedServices] = useState([]);
    const [otherService, setOtherService] = useState('');
    const [serviceModalVisible, setServiceModalVisible] = useState(false);
    const [showOtherServiceInput, setOtherServiceInput] = useState(false);

    const handleServiceModal = () => {
        setServiceModalVisible(true);
    };

    const handleCloseServiceModal = () => {
        setServiceModalVisible(false);
    };

    const handleServiceModalSubmit = () => {
        // Include selected services
        let updatedServices = [...selectedServices];

        // If otherService is not empty, include it
        if (otherService.trim() !== '') {
            updatedServices.push(otherService.trim());
        }

        // Update the main text input with the combined services
        setSelectedServices(updatedServices);

        // Close the modal
        setServiceModalVisible(false);
    };


    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((item) => item !== service));
        } else {
            if (selectedServices.length < 5) {
                setSelectedServices([...selectedServices, service]);
            } else {
                ToastAndroid.show('You can select only upto 5 services!', ToastAndroid.SHORT);
            }
        }
    };

    const handleOtherServiceSubmit = () => {
        // Handle submission of other service
        setSelectedServices([...selectedServices, otherService]);
        setOtherService('');
        setOtherServiceInput(false);
    };

    const toggleOtherInput = () => {
        setOtherServiceInput(!showOtherServiceInput);
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
                                }]}>Step 5 - Office Details</Text>
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
                                     Office / Clinic Pickups & Drops <Text style={styles.requiredIndicator}>*</Text>
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
                                    Treatments Offered <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={handleTreatmentsModal} style={[styles.inputContainer1]} activeOpacity={0.8}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Treatments Offered"
                                        placeholderTextColor="#979797"
                                        // value={selectedServices.join(', ')}
                                        value={selectedTreatments.length > 0 ? selectedTreatments[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedTreatments.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedTreatments.filter(treatments => treatments !== 'Other').length + (showOtherTreatmentsInput ? 1 : 0)}</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>

                                <Modal
                                    visible={treatmentsModalVisible}
                                    transparent
                                    onRequestClose={() => setTreatmentsModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setTreatmentsModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Treatments Offered <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <View style={styles.servicesContainer11}>

                                                {treatmentsData.map((treatments) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={treatments}
                                                        onPress={() => toggleTreatments(treatments)}
                                                        onMouseEnter={() => setHoveredItem(treatments)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedTreatments.includes(treatments) && styles.selectedCheckboxContainer,
                                                                hoveredItem === treatments && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={selectedTreatments.includes(treatments) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedTreatments.includes(treatments) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {treatments}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={toggleOtherTreatmentsInput}
                                                    onMouseEnter={() => setHoveredItem('Other')}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkboxContainer,
                                                            showOtherTreatmentsInput && styles.selectedCheckboxContainer,
                                                            hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={showOtherTreatmentsInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                            style={styles.checkboxImage}
                                                        />
                                                        <Text style={showOtherTreatmentsInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {showOtherTreatmentsInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Treatments"
                                                        placeholderTextColor="#979797"
                                                        value={otherTreatments}
                                                        onChangeText={(text) => setOtherTreatments(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}
                                            <TouchableOpacity style={[commonStyles.button, { marginBottom: 20 }]} activeOpacity={0.8} onPress={handleTreatmentsModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Services you looking for <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={handleServiceModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Services"
                                        placeholderTextColor="#979797"
                                        // value={selectedServices.join(', ')}
                                        value={selectedServices.length > 0 ? selectedServices[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {/* <Text style={styles.totalServiceText}>
                                        +{selectedServices.filter(service => service !== 'Other').length + (showOtherInput ? 1 : 0)}
                                    </Text> */}
                                    {selectedServices.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedServices.filter(service => service !== 'Other').length + (showOtherServiceInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>

                                <Modal
                                    visible={serviceModalVisible}
                                    transparent
                                    onRequestClose={() => setServiceModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setServiceModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Tell us your services <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                            </Text>
                                            <View style={styles.servicesContainer11}>
                                                {servicesData.map((service) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={service}
                                                        onPress={() => toggleService(service)}
                                                        onMouseEnter={() => setHoveredItem(service)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedServices.includes(service) && styles.selectedCheckboxContainer,
                                                                hoveredItem === service && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={selectedServices.includes(service) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedServices.includes(service) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {service}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={toggleOtherInput}
                                                    onMouseEnter={() => setHoveredItem('Other')}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkboxContainer,
                                                            showOtherServiceInput && styles.selectedCheckboxContainer,
                                                            hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={showOtherServiceInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                            style={styles.checkboxImage}
                                                        />
                                                        <Text style={showOtherServiceInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {showOtherServiceInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Services"
                                                        placeholderTextColor="#979797"
                                                        value={otherService}
                                                        onChangeText={(text) => setOtherService(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}
                                            <TouchableOpacity style={[commonStyles.button, { marginBottom: 20 }]} activeOpacity={0.8} onPress={handleServiceModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </Modal>

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
                                        //value={selectedEmail}
                                        //onChangeText={(text) => setSelectedEmail(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>

                                {/* Continue Button */}
                                <TouchableOpacity
                                    style={[commonStyles.button, ]}
                                    onPress={() => {
                                        navigation.navigate('OfficeProfileCompletion6');
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

export default OfficeProfileCompletion5;
