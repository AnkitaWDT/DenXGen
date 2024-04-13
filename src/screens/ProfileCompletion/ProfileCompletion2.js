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
import { API_CONFIG } from '../../API/APIConfig';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ProfileCompletion2 = ({ navigation }) => {

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


    const [servicesData, setServiceData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [otherService, setOtherService] = useState('');
    const [serviceModalVisible, setServiceModalVisible] = useState(false);
    const [showOtherServiceInput, setOtherServiceInput] = useState(false);

    // useEffect(() => {
    //     fetchServiceData();
    // }, []);

    // const fetchServiceData = async () => {
    //     try {
    //         const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getservlist- ax.php');
    //         const data = await response.json();
    //         const storedId = await AsyncStorage.getItem('pr_ty_id');
    //         const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
    //         setServiceData(filteredData);
    //     } catch (error) {
    //         console.error('Error fetching key forte data:', error);
    //     }
    // };


    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`${API_CONFIG.API_DOMAIN}${API_CONFIG.serviceListUrl}`);
                const data = response.data;
                console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    console.log("Filtered data:", filteredData); // Log filtered data

                    const serviceOptions = filteredData.map(item => ({
                        service: item.service,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    console.log("Dropdown options:", serviceOptions); // Log dropdown options

                    setServiceData(serviceOptions);
                } else {
                    console.error('Error fetching service options');
                }
            } catch (error) {
                console.error('Error fetching service options:', error);
            }
        };

        fetchServiceData();
    }, []);

    const handleServiceModal = () => {
        setServiceModalVisible(true);
    };

    const handleCloseServiceModal = () => {
        setServiceModalVisible(false);
    };


    const handleServiceModalSubmit = () => {
        let updatedServices = [...selectedServices];
        const otherIndex = updatedServices.findIndex(service => service.hasOwnProperty('other'));

        if (otherService.trim() !== '') {
            const newOtherService = { other: otherService.trim() };
            if (otherIndex !== -1) {
                // Replace the existing "other" service with the new one
                updatedServices[otherIndex] = newOtherService;
            } else {
                // Add the new "other" service
                updatedServices.push(newOtherService);
            }
        } else {
            // If otherService is empty, remove the "other" service from selectedServices
            if (otherIndex !== -1) {
                updatedServices.splice(otherIndex, 1);
            }
        }

        setSelectedServices(updatedServices);
        console.log('updatedServices', updatedServices)
        setServiceModalVisible(false);
    };


    const toggleService = (id, service) => {

        const isSelected = selectedServices.includes(id);
        setSelectedServices(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedServiceName(isSelected ? [] : [service]);

        // Other logic related to limiting the number of selected services can be added here
        
        // const isSelected = selectedServices.some(item => item.hasOwnProperty(id.toString())); // Check if the service is already selected
        // const updatedServices = isSelected
        //     ? selectedServices.filter(item => !item.hasOwnProperty(id.toString())) // Deselect the service
        //     : [...selectedServices, { [id]: service }]; // Select the service

        // setSelectedServices(updatedServices);

        // // Update selectedServiceName accordingly
        // setSelectedServiceName(isSelected ? '' : service);
    };


    const handleOtherServiceSubmit = () => {
        // Handle submission of other service
        setSelectedServices([...selectedServices, otherService]);
        setOtherService('');
        setOtherServiceInput(false);
    };

    const toggleOtherServiceInput = () => {
        if (showOtherServiceInput) {
            // If the "other" service input is currently shown, hide it
            setOtherService('');
        }
        setOtherServiceInput(!showOtherServiceInput);
    };

    const [specialtiesData, setSpecialtiesData] = useState([]);
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedSpecialityName, setSelectedSpecialityName] = useState('');
    const [otherSpeciality, setOtherSpeciality] = useState('');
    const [specialtiesModalVisible, setSpecialtiesModalVisible] = useState(false);
    const [showOtherSpecialityInput, setShowOtherSpecialityInput] = useState(false);

    useEffect(() => {
        fetchSpecialitiesData();
    }, []);

    const fetchSpecialitiesData = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getspeclist-ax.php');
            const data = await response.json();
            const storedId = await AsyncStorage.getItem('pr_ty_id');
            const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
            setSpecialtiesData(filteredData);
        } catch (error) {
            console.error('Error fetching key forte data:', error);
        }
    };

    const handleSpecialtiesModal = () => {
        setSpecialtiesModalVisible(true);
    };

    const handleCloseSpecialtiesModal = () => {
        setSpecialtiesModalVisible(false);
    };

    const handleSpecialtiesModalSubmit = () => {
        // Include selected specialties
        let updatedSpecialties = [...selectedSpecialties];

        // If otherSpeciality is not empty, include it
        if (otherSpeciality.trim() !== '') {
            updatedSpecialties.push(otherSpeciality.trim());
        }

        // Update the main text input with the combined specialties
        setSelectedSpecialties(updatedSpecialties);

        // Close the modal
        setSpecialtiesModalVisible(false);
    };

    const toggleSpeciality = (id, speciality) => {
        const isSelected = selectedSpecialties.includes(id);
        setSelectedSpecialties(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedSpecialityName(isSelected ? [] : [speciality]);

        //setSelectedSpecialties(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
        // if (selectedSpecialties.includes(speciality)) {
        //     setSelectedSpecialties(selectedSpecialties.filter((item) => item !== speciality));
        // } else {
        //     if (selectedSpecialties.length < 5) {
        //         setSelectedSpecialties([...selectedSpecialties, speciality]);
        //     } else {
        //         ToastAndroid.show('You can select only upto 5 specialties!', ToastAndroid.SHORT);
        //     }
        // }
    };

    const toggleOtherSpecialityInput = () => {
        setShowOtherSpecialityInput(!showOtherSpecialityInput);
    };

    const [keyForteData, setKeyForteData] = useState([]);
    const [selectedKeyForte, setSelectedKeyForte] = useState([]);
    const [selectedKeyForteName, setSelectedKeyForteName] = useState('');
    const [otherKeyForte, setOtherKeyForte] = useState('');
    const [keyForteModalVisible, setKeyForteModalVisible] = useState(false);
    const [showOtherKeyForteInput, setShowOtherKeyForteInput] = useState(false);

    useEffect(() => {
        fetchKeyForteData();
    }, []);

    const fetchKeyForteData = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getkeyforlist-ax.php');
            const data = await response.json();
            const storedId = await AsyncStorage.getItem('pr_ty_id');
            const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
            setKeyForteData(filteredData);
        } catch (error) {
            console.error('Error fetching key forte data:', error);
        }
    };

    const handleKeyForteModal = () => {
        setKeyForteModalVisible(true);
    };

    const handleCloseKeyForteModal = () => {
        setKeyForteModalVisible(false);
    };

    const handleKeyForteModalSubmit = () => {
        // let updatedKeyForte = [...selectedKeyForte];
        // if (otherKeyForte.trim() !== '') {
        //     updatedKeyForte.push(otherKeyForte.trim());
        // }
        // setSelectedKeyForte(updatedKeyForte);
        // setKeyForteModalVisible(false);

        let updatedKeyForte = [...selectedKeyForte];

        // If otherSpeciality is not empty, include it
        if (otherKeyForte.trim() !== '') {
            updatedKeyForte.push(otherKeyForte.trim());
        }

        // let updatedKeyForte = [...selectedKeyForte];

        // // Check if there is already an "other" qualification
        // const otherIndex = updatedKeyForte.findIndex(qual => qual.hasOwnProperty('other'));

        // // If otherQualification is not empty, include it
        // if (otherKeyForte.trim() !== '') {
        //     const newOtherKeyForte = { other: otherKeyForte.trim() };
        //     if (otherIndex !== -1) {
        //         // Replace the existing "other" qualification with the new one
        //         updatedKeyForte[otherIndex] = newOtherKeyForte;
        //     } else {
        //         // Add the new "other" qualification
        //         updatedKeyForte.push(newOtherKeyForte);
        //     }
        // }

        // Close the modal
        setKeyForteModalVisible(false);

        // Update the state with the modified qualifications
        setSelectedKeyForte(updatedKeyForte);
    };

    const toggleKeyForte = (id, keyforte) => {
        const isSelected = selectedKeyForte.includes(id);
        setSelectedKeyForte(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedKeyForteName(isSelected ? [] : [keyforte]);
        //setSelectedKeyForte(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
        // if (selectedKeyForte.includes(keyForte)) {
        //     setSelectedKeyForte(selectedKeyForte.filter((item) => item !== keyForte));
        // } else {
        //     if (selectedKeyForte.length < 5) {
        //         setSelectedKeyForte([...selectedKeyForte, keyForte]);
        //     } else {
        //         ToastAndroid.show('You can select only upto 5 key forte!', ToastAndroid.SHORT);
        //     }
        // }
    };

    const toggleOtherKeyForteInput = () => {
        setShowOtherKeyForteInput(!showOtherKeyForteInput);
    };

    const [qualificationsData, setQualificationsDataData] = useState([]);
    const [selectedQualifications, setSelectedQualifications] = useState([]);
    const [selectedQualificationName, setSelectedQualificationName] = useState('');
    const [otherQualification, setOtherQualification] = useState('');
    const [qualificationsModalVisible, setQualificationsModalVisible] = useState(false);
    const [showOtherQualificationInput, setShowOtherQualificationInput] = useState(false);

    useEffect(() => {
        fetchQualificationsData();
    }, []);

    const fetchQualificationsData = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getqualilist-ax.php');
            const data = await response.json();
            const storedId = await AsyncStorage.getItem('pr_ty_id');
            const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
            setQualificationsDataData(filteredData);
        } catch (error) {
            console.error('Error fetching key forte data:', error);
        }
    };

    const handleQualificationsModal = () => {
        setQualificationsModalVisible(true);
    };

    const handleCloseQualificationsModal = () => {
        setQualificationsModalVisible(false);
    };

    const handleQualificationsModalSubmit = () => {

        let updatedQualifications = [...selectedQualifications];

        // Check if there is already an "other" qualification
        const otherIndex = updatedQualifications.findIndex(qual => qual.hasOwnProperty('other'));

        // If otherQualification is not empty, include it
        if (otherQualification.trim() !== '') {
            const newOtherQualification = { other: otherQualification.trim() };
            if (otherIndex !== -1) {
                // Replace the existing "other" qualification with the new one
                updatedQualifications[otherIndex] = newOtherQualification;
            } else {
                // Add the new "other" qualification
                updatedQualifications.push(newOtherQualification);
            }
        }

     
        // const mixedArray = [{ other: 'value' }];
        // const updated = [...updatedQualifications, ...mixedArray];

        // Close the modal
        setQualificationsModalVisible(false);

        // Update the state with the modified qualifications
        setSelectedQualifications(updatedQualifications);
    };


    const toggleQualification = (id, qualification) => {
        const isSelected = selectedQualifications.includes(id);
        setSelectedQualifications(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedQualificationName(isSelected ? [] : [qualification]);
         //setSelectedQualifications(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
        // if (selectedQualifications.includes(qualification)) {
        //     setSelectedQualifications(selectedQualifications.filter((item) => item !== qualification));
        // } else {
        //     if (selectedQualifications.length < 5) {
        //         setSelectedQualifications([...selectedQualifications, qualification]);
        //     } else {
        //         ToastAndroid.show('You can select only upto 5 qualifications!', ToastAndroid.SHORT);
        //     }
        // }
    };

    const toggleOtherQualificationInput = () => {
        setShowOtherQualificationInput(!showOtherQualificationInput);
    };

    const [licenseNumber, setLicenseNumber] = useState('');
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
    //console.log("Progress Percentage:", progressPercentage);

    const [hoveredItem, setHoveredItem] = useState(null);

    const logData = () => {
        console.log("About Yourself:", textareaValues.aboutYourself);
        console.log("Selected Services:", selectedServices);
        console.log("Selected Specialties:", selectedSpecialties);
        console.log("Selected Key Forte:", selectedKeyForte);
        console.log("Selected Qualifications:", selectedQualifications);
        console.log("License Number:", licenseNumber);
        // Add more data to log if needed
    };

    const handleNext = async () => {
        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);

        const userData = {
            pr_id: parseInt(pr_id),
            about: textareaValues.aboutYourself,
            serv_id: selectedServices,
            spec_id: selectedSpecialties,
            keyf_id: selectedKeyForte,
            qual_id: selectedQualifications,
            license: licenseNumber,
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls2-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            navigation.navigate('NDProfileCompletion3');
            //console.log('Data Added to database');
        } catch (error) {
            console.error('An error occurred:', error);
        }

        //navigation.navigate('NDProfileCompletion3');
    };


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
                                }]}>Professional Details</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Choose your career category and unlock endless possibilities.</Text>
                                {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                    <ProgressBar progress={progressPercentage / 100} color="#00B0FF" style={commonStyles.progImage} />
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
                                    style={styles.inputTA}
                                    placeholder={'Write about yourself...'}
                                    placeholderTextColor={'#979797'}
                                            value={textareaValues['aboutYourself'].substring(0, 40) + (textareaValues['aboutYourself'].length > 40 ? '...' : '')}
                                    underlineColorAndroid="transparent"
                                    editable={false}
                                    selection={{ start: 0, end: 0 }}
                                />
                            </TouchableHighlight>

                            {/* About Yourself Modal */}
                                        <Modal
                                            visible={isAboutModalVisible}
                                            transparent
                                            activeOpacity={1}
                                        onRequestClose={() => closeModalA()} // To handle Android back button
                                        >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContainer}
                                            onPress={() => closeModalA()} // Close the modal when clicking on the background
                                        >
                                            <TouchableOpacity style={styles.modalContent}
                                                activeOpacity={1}
                                                onPress={() => { }}>
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
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                            </Modal>
                        </View>


                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Services you looking for <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={handleServiceModal}  activeOpacity={0.8} style={[styles.inputContainer1 ]}>
                                        <TextInput
                                        style={styles.inputs}
                                            placeholder="Services"
                                            placeholderTextColor="#979797"
                                            // value={selectedServices.join(', ')}
                                            value={selectedServiceName.length > 0 ? selectedServiceName[0] : ''}
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
                                        activeOpacity={1}
                                        onRequestClose={() => setServiceModalVisible(false)} // To handle Android back button
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContainer}
                                            onPress={() => setServiceModalVisible(false)} // Close the modal when clicking on the background
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
                                                    style={{ paddingBottom: showOtherServiceInput ? 0 : height * 0.06 }}
                                                    data={[...servicesData, { id: 'other', service: 'Other' }]} // Add 'Other' as an additional item
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => {
                                                                if (item.id === 'other') {
                                                                    toggleOtherServiceInput();
                                                                } else {
                                                                    toggleService(item.id, item.service);
                                                                }
                                                            }}
                                                            onMouseEnter={() => setHoveredItem(item.service)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedServices.includes(item.service) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === item.service && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={
                                                                        selectedServices.includes(item.id) || (showOtherServiceInput && item.id === 'other')
                                                                            ? require('../../../assets/img/Rect1.png')
                                                                            : require('../../../assets/img/Rect.png')
                                                                    }
                                                                    style={styles.checkboxImage}
                                                                />

                                                                <Text style={selectedServices.includes(item.service) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {item.service}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />
                                                {showOtherServiceInput && (
                                                    <View style={styles.otherContainer1}>
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

                                                {showOtherServiceInput && (
                                                    <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleServiceModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                )}

                                              
                                            </TouchableOpacity>
                                            {showOtherServiceInput ?
                                                null :
                                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={handleServiceModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>}

                                           
                                        </TouchableOpacity>
                                    </Modal>

                            </View>

                            {/* Specialties */}
                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Specialties <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                    <TouchableOpacity onPress={handleSpecialtiesModal} activeOpacity={0.8}  style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Select Specialties"
                                        placeholderTextColor="#979797"
                                        //value={selectedSpecialties.length > 0 ? selectedSpecialties.join(', ') : ''}
                                            value={selectedSpecialityName.length > 0 ? selectedSpecialityName[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedSpecialties.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedSpecialties.filter(speciality => speciality !== 'Other').length + (showOtherSpecialityInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                    <Modal
                                        visible={specialtiesModalVisible}
                                        transparent
                                        activeOpacity={1}
                                        onRequestClose={() => setSpecialtiesModalVisible(false)} // To handle Android back button
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContainer}
                                            onPress={() => setSpecialtiesModalVisible(false)} // Close the modal when clicking on the background
                                        >
                                            <TouchableOpacity style={styles.modalContent}
                                                activeOpacity={1}
                                                onPress={() => { }}>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Tell us your speciality <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                                </Text>
                                                <FlatList
                                                    style={{ paddingBottom: showOtherSpecialityInput ? 0 : height * 0.06 }}
                                                    data={[...specialtiesData, { id: 'other', speciality: 'Other' }]} // Add 'Other' as an additional item
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => {
                                                                if (item.id === 'other') {
                                                                    toggleOtherSpecialityInput();
                                                                } else {
                                                                    toggleSpeciality(item.id, item.speciality);
                                                                }
                                                            }}
                                                            onMouseEnter={() => setHoveredItem(item.speciality)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedSpecialties.includes(item.speciality) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === item.speciality && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={
                                                                        selectedSpecialties.includes(item.id) || (showOtherSpecialityInput && item.id === 'other')
                                                                            ? require('../../../assets/img/Rect1.png')
                                                                            : require('../../../assets/img/Rect.png')
                                                                    }
                                                                    style={styles.checkboxImage}
                                                                />
                                                                <Text style={selectedSpecialties.includes(item.speciality) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {item.speciality}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />
                                                {showOtherSpecialityInput && (
                                                    <View style={[styles.otherContainer1]}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="Other Speciality"
                                                            placeholderTextColor="#979797"
                                                            value={otherSpeciality}
                                                            onChangeText={(text) => setOtherSpeciality(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                )}

                                                {showOtherSpecialityInput && (
                                                    <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleSpecialtiesModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                )}
                                             
                                            </TouchableOpacity>
                                            {showOtherSpecialityInput ?
                                                null :
                                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={handleSpecialtiesModalSubmit}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>}

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
                                            value={selectedKeyForteName.length > 0 ? selectedKeyForteName[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedKeyForte.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedKeyForte.filter(keyForte => keyForte !== 'Other').length + (showOtherKeyForteInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                    <Modal
                                        visible={keyForteModalVisible}
                                        transparent
                                        activeOpacity={1}
                                        onRequestClose={() => setKeyForteModalVisible(false)} // To handle Android back button
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContainer}
                                            onPress={() => setKeyForteModalVisible(false)} // Close the modal when clicking on the background
                                        >
                                            <TouchableOpacity style={styles.modalContent}
                                                activeOpacity={1}
                                                onPress={() => { }}>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Tell us your key forte <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Tell us something about yourself to let users know you better
                                                </Text>
                                                <FlatList
                                                    style={{ paddingBottom: showOtherKeyForteInput ? 0 : height * 0.06 }}
                                                    data={[...keyForteData, { id: 'other', keyforte: 'Other' }]} // Add 'Other' as an additional item
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => {
                                                                if (item.id === 'other') {
                                                                    toggleOtherKeyForteInput();
                                                                } else {
                                                                    toggleKeyForte(item.id, item.keyforte);
                                                                }
                                                            }}
                                                            onMouseEnter={() => setHoveredItem(item.keyforte)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedKeyForte.includes(item.keyforte) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === item.keyforte && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={
                                                                        selectedKeyForte.includes(item.id) || (showOtherKeyForteInput && item.id === 'other')
                                                                            ? require('../../../assets/img/Rect1.png')
                                                                            : require('../../../assets/img/Rect.png')
                                                                    }
                                                                    style={styles.checkboxImage}
                                                                />
                                                                <Text style={selectedKeyForte.includes(item.keyforte) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {item.keyforte}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />

                                                {showOtherKeyForteInput && (
                                                    <View style={[styles.otherContainer1]}>
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

                                                {showOtherKeyForteInput && (
                                                    <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleKeyForteModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                )}

                                            </TouchableOpacity>
                                            {showOtherKeyForteInput ?
                                                null :
                                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03 }]} activeOpacity={0.8} onPress={handleKeyForteModalSubmit}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>}
                                        </TouchableOpacity>
                                    </Modal>
                            </View>

                            {/* Qualifications */}
                            <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                                    Qualifications <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                    <TouchableOpacity onPress={handleQualificationsModal} activeOpacity={0.8}  style={[styles.inputContainer1]}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Select Qualifications"
                                        placeholderTextColor="#979797"
                                        // value={selectedQualifications.length > 0 ? selectedQualifications.join(', ') : ''}
                                            value={selectedQualificationName.length > 0 ? selectedQualificationName[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedQualifications.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedQualifications.filter(qualification => qualification !== 'Other').length + (showOtherQualificationInput ? 1 : 0)} more</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>
                                    <Modal
                                        visible={qualificationsModalVisible}
                                        transparent
                                        activeOpacity={1}
                                        onRequestClose={() => setQualificationsModalVisible(false)} // To handle Android back button
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContainer}
                                            onPress={() => setQualificationsModalVisible(false)} // Close the modal when clicking on the background
                                        >
                                            <TouchableOpacity style={styles.modalContent}
                                                activeOpacity={1}
                                                onPress={() => { }}>
                                                <View style={styles.horizontalLine}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Tell us your qualifications <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                                </Text>
                                                <FlatList
                                                    data={[...qualificationsData, { id: 'other', qualification: 'Other' }]} // Add 'Other' as an additional item
                                                    style={{ paddingBottom: showOtherQualificationInput ? 0 : height * 0.06 }} // Add paddingBottom conditionally
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => {
                                                                if (item.id === 'other') {
                                                                    toggleOtherQualificationInput();
                                                                } else {
                                                                    toggleQualification(item.id, item.qualification);
                                                                }
                                                            }}
                                                            onMouseEnter={() => setHoveredItem(item.qualification)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <View
                                                                style={[
                                                                    styles.checkboxContainer,
                                                                    selectedQualifications.includes(item.qualification) && styles.selectedCheckboxContainer,
                                                                    hoveredItem === item.qualification && styles.hoveredCheckboxContainer,
                                                                ]}
                                                            >
                                                                <Image
                                                                    source={
                                                                        selectedQualifications.includes(item.id) || (showOtherQualificationInput && item.id === 'other')
                                                                            ? require('../../../assets/img/Rect1.png')
                                                                            : require('../../../assets/img/Rect.png')
                                                                    }
                                                                    style={styles.checkboxImage}
                                                                />
                                                                <Text style={selectedQualifications.includes(item.qualification) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                    {item.qualification}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={item => item.id}
                                                />

                                                {showOtherQualificationInput && (
                                                    <View style={styles.otherContainer1}>
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

                                                {showOtherQualificationInput && (
                                                    <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleQualificationsModalSubmit}>
                                                        <Text style={commonStyles.buttonText}>Submit</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </TouchableOpacity>
                                            {showOtherQualificationInput ?
                                                null :
                                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03 }]} activeOpacity={0.8} onPress={handleQualificationsModalSubmit}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>}
                                          
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
                                            value={licenseNumber}
                                            onChangeText={(text) => setLicenseNumber(text)}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>

                                <TouchableOpacity
                                    style={[commonStyles.button, ]}
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
        width:'100%',
        marginBottom: moderateScale(16),
        justifyContent: 'space-between',
    },
    otherContainer1:{
        flexDirection: 'row',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: moderateScale(41),
        width: '100%',
        //  marginBottom: moderateScale(16),
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
    inputTA: {
        marginLeft: width * 0.04,
        marginRight: width * 0.04,
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        flex: 1,
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
    servicesContainer11:{
        //paddingHorizontal: moderateScale(18),
    }

});

export default ProfileCompletion2;
