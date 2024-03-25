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


const NDProfileCompletion2 = ({ navigation }) => {

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

    const [specialtiesData] = useState([
        'Assist dentists during procedures',
        'Take dental X-rays',
        'Prepare patients for treatment',
        'Provide chairside assistance',
        'Educate patients on oral hygiene practices',
        'Fabricate dental prosthetics - Crowns, bridges',
        'Fabricate dental prosthetics - Dentures',
        'Fabricate dental prosthetics - Orthodontic appliances',
        'Fabricate dental prosthetics - Implant Prosthesis',
        'Manage appointments',
        'Handle patient inquiries',
        'Maintain patient records',
        'Clean, sterilize, and maintain dental instruments and equipment',
        'Repair Dental Equipment',
        'Take dental X-rays and assist in diagnostic imaging procedures',
        'Oversee daily operations of the dental office',
        'Manage staff',
        'Manage finances',
        'Marketing',
        'Assist patients in understanding treatment plans',
        'Schedule appointments',
        'Coordinate care between different dental providers',
    ]);


    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [otherSpecialty, setOtherSpecialty] = useState('');
    const [specialtiesModalVisible, setSpecialtiesModalVisible] = useState(false);
    const [showOtherSpecialtyInput, setShowOtherSpecialtyInput] = useState(false);

    const handleSpecialtiesModal = () => {
        setSpecialtiesModalVisible(true);
    };

    const handleCloseSpecialtiesModal = () => {
        setSpecialtiesModalVisible(false);
    };

    const handleSpecialtiesModalSubmit = () => {
        // Include selected specialties
        let updatedSpecialties = [...selectedSpecialties];

        // If otherSpecialty is not empty, include it
        if (otherSpecialty.trim() !== '') {
            updatedSpecialties.push(otherSpecialty.trim());
        }

        // Update the main text input with the combined specialties
        setSelectedSpecialties(updatedSpecialties);

        // Close the modal
        setSpecialtiesModalVisible(false);
    };

    const toggleSpecialty = (specialty) => {
        if (selectedSpecialties.includes(specialty)) {
            setSelectedSpecialties(selectedSpecialties.filter((item) => item !== specialty));
        } else {
            if (selectedSpecialties.length < 5) {
                setSelectedSpecialties([...selectedSpecialties, specialty]);
            } else {
                ToastAndroid.show('You can select only upto 5 specialties!', ToastAndroid.SHORT);
            }
        }
    };

    const toggleOtherSpecialtyInput = () => {
        setShowOtherSpecialtyInput(!showOtherSpecialtyInput);
    };

    const [keyForteData] = useState([
        'Implants',
        'Braces',
        'Oral Surgery',
        'Cosmetic Dentistry',
        'Endodontics',
    ]);

    const [selectedKeyForte, setSelectedKeyForte] = useState([]);
    const [otherKeyForte, setOtherKeyForte] = useState('');
    const [keyForteModalVisible, setKeyForteModalVisible] = useState(false);
    const [showOtherKeyForteInput, setShowOtherKeyForteInput] = useState(false);

    const handleKeyForteModal = () => {
        setKeyForteModalVisible(true);
    };

    const handleCloseKeyForteModal = () => {
        setKeyForteModalVisible(false);
    };

    const handleKeyForteModalSubmit = () => {
        // Include selected key forte
        let updatedKeyForte = [...selectedKeyForte];

        // If otherKeyForte is not empty, include it
        if (otherKeyForte.trim() !== '') {
            updatedKeyForte.push(otherKeyForte.trim());
        }

        // Update the main text input with the combined key forte
        setSelectedKeyForte(updatedKeyForte);

        // Close the modal
        setKeyForteModalVisible(false);
    };

    const toggleKeyForte = (keyForte) => {
        if (selectedKeyForte.includes(keyForte)) {
            setSelectedKeyForte(selectedKeyForte.filter((item) => item !== keyForte));
        } else {
            if (selectedKeyForte.length < 5) {
                setSelectedKeyForte([...selectedKeyForte, keyForte]);
            } else {
                ToastAndroid.show('You can select only upto 5 key forte!', ToastAndroid.SHORT);
            }
        }
    };

    const toggleOtherKeyForteInput = () => {
        setShowOtherKeyForteInput(!showOtherKeyForteInput);
    };

    const [qualificationsData] = useState([
        'DDS',
        'DMD',
        'PhD',
        'MS',
        'MD',
        'MPH',
    ]);

    const [selectedQualifications, setSelectedQualifications] = useState([]);
    const [otherQualification, setOtherQualification] = useState('');
    const [qualificationsModalVisible, setQualificationsModalVisible] = useState(false);
    const [showOtherQualificationInput, setShowOtherQualificationInput] = useState(false);

    const handleQualificationsModal = () => {
        setQualificationsModalVisible(true);
    };

    const handleCloseQualificationsModal = () => {
        setQualificationsModalVisible(false);
    };

    const handleQualificationsModalSubmit = () => {
        // Include selected qualifications
        let updatedQualifications = [...selectedQualifications];

        // If otherQualification is not empty, include it
        if (otherQualification.trim() !== '') {
            updatedQualifications.push(otherQualification.trim());
        }

        // Update the main text input with the combined qualifications
        setSelectedQualifications(updatedQualifications);

        // Close the modal
        setQualificationsModalVisible(false);
    };

    const toggleQualification = (qualification) => {
        if (selectedQualifications.includes(qualification)) {
            setSelectedQualifications(selectedQualifications.filter((item) => item !== qualification));
        } else {
            if (selectedQualifications.length < 5) {
                setSelectedQualifications([...selectedQualifications, qualification]);
            } else {
                ToastAndroid.show('You can select only upto 5 qualifications!', ToastAndroid.SHORT);
            }
        }
    };

    const toggleOtherQualificationInput = () => {
        setShowOtherQualificationInput(!showOtherQualificationInput);
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

    const currentStep = 2; // For example, current step is 4
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
                                }]}>Step 2- Professional Details</Text>
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
                                {/* <Modal visible={serviceModalVisible} transparent>
                                    <TouchableWithoutFeedback onPress={() => setServiceModalVisible(false)}>
                                        <View style={styles.modalContainer}>
                                            <TouchableWithoutFeedback>
                                                <View style={styles.modalContent}>
                                                    <View style={styles.horizontalLine}></View>
                                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                        Tell us your services <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                    </Text>
                                                        <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                        Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                                    </Text>
                                                    <View style={styles.servicesContainer}>
                                                        {servicesData.map((service) => (
                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                key={service}
                                                                style={[
                                                                    styles.serviceButton,
                                                                    selectedServices.includes(service) && styles.selectedServiceButton,
                                                                ]}
                                                                onPress={() => toggleService(service)}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.serviceButtonText,
                                                                        selectedServices.includes(service) && styles.selectedServiceButtonText,
                                                                    ]}
                                                                >
                                                                    {service}
                                                                </Text>
                                                                {selectedServices.includes(service) && (
                                                                    <TouchableOpacity
                                                                        activeOpacity={0.8}
                                                                        style={styles.closeButton}
                                                                        onPress={() => toggleService(service)}
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
                                                                showOtherServiceInput && styles.selectedServiceButton,
                                                            ]}
                                                                activeOpacity={0.8}
                                                            onPress={toggleOtherInput}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.serviceButtonText,
                                                                    showOtherServiceInput && styles.selectedServiceButtonText,
                                                                ]}
                                                            >
                                                                Other
                                                            </Text>
                                                            {showOtherServiceInput && (
                                                                <TouchableOpacity
                                                                    style={styles.closeButton}
                                                                    onPress={toggleOtherInput}
                                                                        activeOpacity={0.8}
                                                                >
                                                                    <Image
                                                                        source={require('../../../assets/img/close.png')}
                                                                        style={styles.closeImage}
                                                                    />
                                                                </TouchableOpacity>
                                                            )}
                                                        </TouchableOpacity>
                                                    </View>
                                                    {showOtherServiceInput && (
                                                        <View style={styles.inputContainer1}>
                                                            <TextInput
                                                                style={styles.inputs}
                                                                placeholder="Other Service"
                                                                placeholderTextColor="#979797"
                                                                value={otherService}
                                                                onChangeText={(text) => setOtherService(text)}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    )}
                                                        <TouchableOpacity style={[commonStyles.button]} activeOpacity={0.8}  onPress={handleServiceModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal> */}
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

                            {/* Specialties */}
                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Specialties <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <TouchableOpacity onPress={handleSpecialtiesModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Select Specialties"
                                        placeholderTextColor="#979797"
                                        //value={selectedSpecialties.length > 0 ? selectedSpecialties.join(', ') : ''}
                                        value={selectedSpecialties.length > 0 ? selectedSpecialties[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedSpecialties.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedSpecialties.filter(specialty => specialty !== 'Other').length + (showOtherSpecialtyInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                <Modal
                                    visible={specialtiesModalVisible}
                                    transparent
                                    onRequestClose={() => setSpecialtiesModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setSpecialtiesModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Tell us your speciality <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <View style={styles.servicesContainer11}>
                                                {specialtiesData.map((specialty) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={specialty}
                                                        onPress={() => toggleSpecialty(specialty)}
                                                        onMouseEnter={() => setHoveredItem(specialty)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedSpecialties.includes(specialty) && styles.selectedCheckboxContainer,
                                                                hoveredItem === specialty && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={selectedSpecialties.includes(specialty) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedSpecialties.includes(specialty) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {specialty}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={toggleOtherSpecialtyInput}
                                                    onMouseEnter={() => setHoveredItem('Other')}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkboxContainer,
                                                            showOtherSpecialtyInput && styles.selectedCheckboxContainer,
                                                            hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={showOtherSpecialtyInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                            style={styles.checkboxImage}
                                                        />
                                                        <Text style={showOtherSpecialtyInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {showOtherSpecialtyInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Specialty"
                                                        placeholderTextColor="#979797"
                                                        value={otherSpecialty}
                                                        onChangeText={(text) => setOtherSpecialty(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}
                                            <TouchableOpacity style={[commonStyles.button, { marginBottom: 20 }]} activeOpacity={0.8} onPress={handleSpecialtiesModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            {/* Key Forte */}
                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Key Forte <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <TouchableOpacity onPress={handleKeyForteModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Select Key Forte"
                                        placeholderTextColor="#979797"
                                        // value={selectedKeyForte.length > 0 ? selectedKeyForte.join(', ') : ''}
                                        value={selectedKeyForte.length > 0 ? selectedKeyForte[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedKeyForte.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedKeyForte.filter(keyForte => keyForte !== 'Other').length + (showOtherKeyForteInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                {/* <Modal visible={keyForteModalVisible} transparent>
                                    <TouchableWithoutFeedback onPress={() => handleCloseKeyForteModal()}>
                                        <View style={styles.modalContainer}>
                                            <TouchableWithoutFeedback >
                                                <View style={styles.modalContent}>
                                                    <View style={styles.horizontalLine}></View>
                                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                        Tell us your key forte <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                    </Text>
                                                    <View style={styles.servicesContainer}>
                                                        {keyForteData.map((keyForte) => (
                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                key={keyForte}
                                                                style={[
                                                                    styles.serviceButton,
                                                                    selectedKeyForte.includes(keyForte) && styles.selectedServiceButton,
                                                                ]}
                                                                onPress={() => toggleKeyForte(keyForte)}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.serviceButtonText,
                                                                        selectedKeyForte.includes(keyForte) && styles.selectedServiceButtonText,
                                                                    ]}
                                                                >
                                                                    {keyForte}
                                                                </Text>
                                                                {selectedKeyForte.includes(keyForte) && (
                                                                    <TouchableOpacity
                                                                        activeOpacity={0.8}
                                                                        style={styles.closeButton}
                                                                        onPress={() => toggleKeyForte(keyForte)}
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
                                                                showOtherKeyForteInput && styles.selectedServiceButton,
                                                            ]}
                                                                activeOpacity={0.8}
                                                            onPress={toggleOtherKeyForteInput}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.serviceButtonText,
                                                                    showOtherKeyForteInput && styles.selectedServiceButtonText,
                                                                ]}
                                                            >
                                                                Other
                                                            </Text>
                                                            {showOtherKeyForteInput && (
                                                                <TouchableOpacity
                                                                    style={styles.closeButton}
                                                                    onPress={toggleOtherKeyForteInput}
                                                                        activeOpacity={0.8}
                                                                >
                                                                    <Image
                                                                        source={require('../../../assets/img/close.png')}
                                                                        style={styles.closeImage}
                                                                    />
                                                                </TouchableOpacity>
                                                            )}
                                                        </TouchableOpacity>
                                                    </View>
                                                    {showOtherKeyForteInput && (
                                                        <View style={styles.inputContainer1}>
                                                            <TextInput
                                                                style={styles.inputs}
                                                                placeholder="Other Key Forte"
                                                                placeholderTextColor="#979797"
                                                                value={otherKeyForte}
                                                                onChangeText={(text) => setOtherKeyForte(text)}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    )}
                                                        <TouchableOpacity style={[commonStyles.button]} activeOpacity={0.8} onPress={handleKeyForteModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal> */}
                                <Modal
                                    visible={keyForteModalVisible}
                                    transparent
                                    onRequestClose={() => setKeyForteModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setKeyForteModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Tell us your key forte <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <View style={styles.servicesContainer11}>
                                                {keyForteData.map((keyForte) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={keyForte}
                                                        onPress={() => toggleKeyForte(keyForte)}
                                                        onMouseEnter={() => setHoveredItem(keyForte)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedKeyForte.includes(keyForte) && styles.selectedCheckboxContainer,
                                                                hoveredItem === keyForte && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={selectedKeyForte.includes(keyForte) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedKeyForte.includes(keyForte) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {keyForte}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={toggleOtherKeyForteInput}
                                                    onMouseEnter={() => setHoveredItem('Other')}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkboxContainer,
                                                            showOtherKeyForteInput && styles.selectedCheckboxContainer,
                                                            hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={showOtherKeyForteInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                            style={styles.checkboxImage}
                                                        />
                                                        <Text style={showOtherKeyForteInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {showOtherKeyForteInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Key Forte"
                                                        placeholderTextColor="#979797"
                                                        value={otherKeyForte}
                                                        onChangeText={(text) => setOtherKeyForte(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}
                                            <TouchableOpacity style={[commonStyles.button, { marginBottom: 20 }]} activeOpacity={0.8} onPress={handleKeyForteModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            {/* Qualifications */}
                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Qualifications <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <TouchableOpacity onPress={handleQualificationsModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Select Qualifications"
                                        placeholderTextColor="#979797"
                                        // value={selectedQualifications.length > 0 ? selectedQualifications.join(', ') : ''}
                                        value={selectedQualifications.length > 0 ? selectedQualifications[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedQualifications.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedQualifications.filter(qualification => qualification !== 'Other').length + (showOtherQualificationInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                {/* <Modal visible={qualificationsModalVisible} transparent>
                                    <TouchableWithoutFeedback onPress={() => handleCloseQualificationsModal()}>
                                        <View style={styles.modalContainer}>
                                            <TouchableWithoutFeedback >
                                                <View style={styles.modalContent}>
                                                    <View style={styles.horizontalLine}></View>
                                                  <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                        Tell us your qualifications <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                    </Text>
                                                    <View style={styles.servicesContainer}>
                                                        {qualificationsData.map((qualification) => (
                                                            <TouchableOpacity
                                                                key={qualification}
                                                                style={[
                                                                    styles.serviceButton,
                                                                    selectedQualifications.includes(qualification) && styles.selectedServiceButton,
                                                                ]}
                                                                activeOpacity={0.8}
                                                                onPress={() => toggleQualification(qualification)}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        styles.serviceButtonText,
                                                                        selectedQualifications.includes(qualification) && styles.selectedServiceButtonText,
                                                                    ]}
                                                                >
                                                                    {qualification}
                                                                </Text>
                                                                {selectedQualifications.includes(qualification) && (
                                                                    <TouchableOpacity
                                                                        style={styles.closeButton}
                                                                        onPress={() => toggleQualification(qualification)}
                                                                        activeOpacity={0.8}
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
                                                                showOtherQualificationInput && styles.selectedServiceButton,
                                                            ]}
                                                            activeOpacity={0.8}
                                                            onPress={toggleOtherQualificationInput}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.serviceButtonText,
                                                                    showOtherQualificationInput && styles.selectedServiceButtonText,
                                                                ]}
                                                            >
                                                                Other
                                                            </Text>
                                                            {showOtherQualificationInput && (
                                                                <TouchableOpacity
                                                                    style={styles.closeButton}
                                                                    onPress={toggleOtherQualificationInput}
                                                                    activeOpacity={0.8}
                                                                >
                                                                    <Image
                                                                        source={require('../../../assets/img/close.png')}
                                                                        style={styles.closeImage}
                                                                    />
                                                                </TouchableOpacity>
                                                            )}
                                                        </TouchableOpacity>
                                                    </View>
                                                    {showOtherQualificationInput && (
                                                        <View style={styles.inputContainer1}>
                                                            <TextInput
                                                                style={styles.inputs}
                                                                placeholder="Other Qualification"
                                                                placeholderTextColor="#979797"
                                                                value={otherQualification}
                                                                onChangeText={(text) => setOtherQualification(text)}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    )}
                                                        <TouchableOpacity style={[commonStyles.button]} activeOpacity={0.8}  onPress={handleQualificationsModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal> */}
                                <Modal
                                    visible={qualificationsModalVisible}
                                    transparent
                                    onRequestClose={() => setQualificationsModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.modalContainer}
                                        onPress={() => setQualificationsModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Tell us your qualifications <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <View style={styles.servicesContainer11}>
                                                {qualificationsData.map((qualification) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        key={qualification}
                                                        onPress={() => toggleQualification(qualification)}
                                                        onMouseEnter={() => setHoveredItem(qualification)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedQualifications.includes(qualification) && styles.selectedCheckboxContainer,
                                                                hoveredItem === qualification && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={selectedQualifications.includes(qualification) ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                                style={styles.checkboxImage}
                                                            />
                                                            <Text style={selectedQualifications.includes(qualification) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {qualification}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={toggleOtherQualificationInput}
                                                    onMouseEnter={() => setHoveredItem('Other')}
                                                    onMouseLeave={() => setHoveredItem(null)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.checkboxContainer,
                                                            showOtherQualificationInput && styles.selectedCheckboxContainer,
                                                            hoveredItem === 'Other' && styles.hoveredCheckboxContainer,
                                                        ]}
                                                    >
                                                        <Image
                                                            source={showOtherQualificationInput ? require('../../../assets/img/Rect1.png') : require('../../../assets/img/Rect.png')}
                                                            style={styles.checkboxImage}
                                                        />
                                                        <Text style={showOtherQualificationInput ? commonStyles.headerText4B : commonStyles.headerText4BL}>Other</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {showOtherQualificationInput && (
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Other Qualification"
                                                        placeholderTextColor="#979797"
                                                        value={otherQualification}
                                                        onChangeText={(text) => setOtherQualification(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            )}
                                            <TouchableOpacity style={[commonStyles.button, { marginBottom: 20 }]} activeOpacity={0.8} onPress={handleQualificationsModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </Modal>
                            </View>

                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    License Number <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                <View style={styles.inputContainer1}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="License Number"
                                        placeholderTextColor="#979797"
                                        //value={selectedEmail}
                                        //onChangeText={(text) => setSelectedEmail(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                                <TouchableOpacity
                                    style={[commonStyles.button, ]}
                                    onPress={() => {
                                        navigation.navigate('NDProfileCompletion3');
                                        console.log('ProfileCompletion21');
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Text style={commonStyles.buttonText}>Continue</Text>
                                </TouchableOpacity>
                            {/* 
   
                        <TouchableOpacity
                                style={[commonStyles.button, { marginBottom: moderateScale(50), }]}
                            onPress={() => {
                                navigation.navigate('ProfileCompletion3');
                                console.log('ProfileCompletion21');
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={commonStyles.buttonText}>Continue</Text>
                        </TouchableOpacity> */}

                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={[commonStyles.button, styles.continueButton]}
                        onPress={() => {
                            navigation.navigate('NDProfileCompletion3');
                            console.log('ProfileCompletion21');
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={commonStyles.buttonText}>Continue</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
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

export default NDProfileCompletion2;
