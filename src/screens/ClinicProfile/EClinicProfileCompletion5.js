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


const EClinicProfileCompletion5 = ({ navigation, route }) => {

    const { cl_id } = route.params;

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
    const [paymentLink, setPaymentLink] = useState('');


    const [treatmentsData, setTreatmentsData] = useState([]);
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [otherTreatments, setOtherTreatments] = useState('');
    const [treatmentsModalVisible, setTreatmentsModalVisible] = useState(false);
    const [showOtherTreatmentsInput, setShowOtherTreatmentsInput] = useState(false);
    const [selectedTreatmentsName, setSelectedTreatmentsName] = useState('');

    useEffect(() => {
        const fetchTreatmentData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getcltreatmentlist-ax.php`);
                const data = response.data;
                console.log("Fetched data:", data); // Log fetched data
                if (data.code === 1) {
                    const treatmentOptions = data.data.map(item => ({
                        treatment: item.treatment,
                        id: parseInt(item.id)
                    }));
                    setTreatmentsData(treatmentOptions);

                    // if (data.code === 1) {
                    //     // Get the stored pr_ty_id from AsyncStorage
                    //     const storedId = await AsyncStorage.getItem('acc_ty_id');
                    //     console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    //     const filteredData = data.data.filter(item => item.acc_ty_id === storedId);
                    //     console.log("Filtered data:", filteredData); // Log filtered data

                    //     const treatmentOptions = filteredData.map(item => ({
                    //         treatment: item.treatment,
                    //         id: parseInt(item.id) // Parse the id as an integer
                    //     }));

                    //     console.log("Dropdown options:", treatmentOptions); // Log dropdown options

                    //     setTreatmentsData(treatmentOptions);
                } else {
                    console.error('Error fetching service options');
                }
            } catch (error) {
                console.error('Error fetching service options:', error);
            }
        };

        fetchTreatmentData();
    }, []);


    const handleTreatmentsModal = () => {
        setTreatmentsModalVisible(true);
    };

    const handleCloseTreatmentsModal = () => {
        setTreatmentsModalVisible(false);
    };

    // const handleTreatmentsModalSubmit = () => {
    //     let updatedTreatments = [...selectedTreatments];

    //     // If otherSpecialty is not empty, include it
    //     if (otherTreatments.trim() !== '') {
    //         updatedTreatments.push(otherTreatments.trim());
    //     }

    //     // Update the main text input with the combined specialties
    //     setSelectedTreatments(updatedTreatments);

    //     // Close the modal
    //     setTreatmentsModalVisible(false);
    // };

    const handleTreatmentsModalSubmit = () => {
        let updatedTreatments = [...selectedTreatments];
        const otherIndex = updatedTreatments.findIndex(treatment => treatment.hasOwnProperty('other'));

        if (otherTreatments.trim() !== '') {
            const newOtherTreatment = { other: otherTreatments.trim() };
            if (otherIndex !== -1) {
                // Replace the existing "other" service with the new one
                updatedTreatments[otherIndex] = newOtherTreatment;
            } else {
                // Add the new "other" service
                updatedTreatments.push(newOtherTreatment);
            }
        } else {
            // If otherTreatments is empty, remove the "other" service from selectedServices
            if (otherIndex !== -1) {
                updatedTreatments.splice(otherIndex, 1);
            }
        }

        setSelectedTreatments(updatedTreatments);
        console.log('updatedTreatments', updatedTreatments)
        setTreatmentsModalVisible(false);
    };


    const toggleTreatments = (id, treatment) => {

        const isSelected = selectedTreatments.includes(id);
        setSelectedTreatments(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedTreatmentsName(isSelected ? [] : [treatment]);

    };

    const toggleOtherTreatmentsInput = () => {
        if (showOtherTreatmentsInput) {
            // If the "other" service input is currently shown, hide it
            setOtherTreatments('');
        }
        setShowOtherTreatmentsInput(!showOtherTreatmentsInput);
    };

    const [servicesData, setServiceData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [otherService, setOtherService] = useState('');
    const [serviceModalVisible, setServiceModalVisible] = useState(false);
    const [showOtherServiceInput, setOtherServiceInput] = useState(false);


    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getclservicelist-ax.php`);
                const data = response.data;
                console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    const serviceOptions = data.data.map(item => ({
                        service: item.service,
                        id: parseInt(item.id)
                    }));
                    setServiceData(serviceOptions);

                    // if (data.code === 1) {
                    //     // Get the stored pr_ty_id from AsyncStorage
                    //     const storedId = await AsyncStorage.getItem('acc_ty_id');
                    //     console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    //     const filteredData = data.data.filter(item => item.acc_ty_id === storedId);
                    //     console.log("Filtered data:", filteredData); // Log filtered data

                    //     const serviceOptions = filteredData.map(item => ({
                    //         service: item.service,
                    //         id: parseInt(item.id) // Parse the id as an integer
                    //     }));

                    //     console.log("Dropdown options:", serviceOptions); // Log dropdown options

                    //     setServiceData(serviceOptions);
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

    const handleNext = async () => {

        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);
        const acc_ty_id = await AsyncStorage.getItem('acc_ty_id');
        //const cl_id = await AsyncStorage.getItem('cl_id');
        //const id1 = parseInt(cl_id);


        const userData = {
            cl_id: cl_id,
            pr_id: id,
            serv_id: selectedServices,
            tret_id: selectedTreatments,
            payment: paymentLink,
            pi_dr_id: selectedButton === 'button1' ? 1 : 2,
        };

        console.log('User Data:', userData);

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqclinicdtls3-ax.php`, userData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
            navigation.navigate('EditClinicProfile', { cl_id: cl_id })
            //navigation.navigate('ClinicProfileCompletion6');
        } catch (error) {
            console.error('An error occurred:', error);
        }

        // navigation.navigate('ProfileCompletion6');
    };


    const currentStep = 5; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    //console.log("Progress Percentage:", progressPercentage);

    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getclinicvic-ax.php?cl_id=${cl_id}`);
                const data = response.data;

                if (data.code === 1) {
                    const { pi_dr_id, servList, treatmentList, payment } = data.data;

                    // Set pi_dr_id
                    if (pi_dr_id !== '0') {
                        setSelectedButton(pi_dr_id === '1' ? 'button1' : 'button2');
                    }

                    // Set servList
                    if (servList && servList.length > 0) {
                        const selectedServIds = servList.map(item => parseInt(item.serv_id));
                        setSelectedServices(selectedServIds);
                    }

                    // Set treatmentList
                    if (treatmentList && treatmentList.length > 0) {
                        const selectedTretIds = treatmentList.map(item => parseInt(item.tret_id));
                        setSelectedTreatments(selectedTretIds);
                    }

                    // Set payment
                    if (payment) {
                        setPaymentLink(payment);
                    }
                } else {
                    console.error('Error fetching clinic data');
                }
            } catch (error) {
                console.error('Error fetching clinic data:', error);
            }
        };

        fetchData();
    }, [cl_id]);


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
                                }]}>Clinic Details</Text>
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
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8, }]}>
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
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8, }]}>
                                    Treatments Offered <Text style={styles.requiredIndicator}>*</Text>
                                </Text>

                                <TouchableOpacity onPress={handleTreatmentsModal} style={[styles.inputContainer1]} activeOpacity={0.8}>
                                    <TextInput
                                        style={styles.inputs}
                                        placeholder="Treatments Offered"
                                        placeholderTextColor="#979797"
                                        value={selectedTreatmentsName.length > 0 ? selectedTreatmentsName[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {selectedTreatments.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedTreatments.filter(treatment => treatment !== 'Other').length + (showOtherTreatmentsInput ? 1 : 0)}</Text>
                                    ) : (
                                        <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                                    )}
                                </TouchableOpacity>

                                <Modal
                                    visible={treatmentsModalVisible}
                                    transparent
                                    activeOpacity={1}
                                    onRequestClose={() => setTreatmentsModalVisible(false)} // To handle Android back button
                                >
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={styles.modalContainer}
                                        onPress={() => setTreatmentsModalVisible(false)} // Close the modal when clicking on the background
                                    >
                                        <TouchableOpacity style={styles.modalContent}
                                            activeOpacity={1}
                                            onPress={() => { }}>
                                            <View style={styles.horizontalLine}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Treatments Offered <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                            </Text>
                                            <FlatList
                                                style={{ paddingBottom: showOtherTreatmentsInput ? 0 : height * 0.06 }}
                                                data={[...treatmentsData, { id: 'other', treatment: 'Other' }]} // Add 'Other' as an additional item
                                                renderItem={({ item }) => (
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => {
                                                            if (item.id === 'other') {
                                                                toggleOtherTreatmentsInput();
                                                            } else {
                                                                toggleTreatments(item.id, item.treatment);
                                                            }
                                                        }}
                                                        onMouseEnter={() => setHoveredItem(item.treatment)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxContainer,
                                                                selectedTreatments.includes(item.treatment) && styles.selectedCheckboxContainer,
                                                                hoveredItem === item.treatment && styles.hoveredCheckboxContainer,
                                                            ]}
                                                        >
                                                            <Image
                                                                source={
                                                                    selectedTreatments.includes(item.id) || (showOtherTreatmentsInput && item.id === 'other')
                                                                        ? require('../../../assets/img/Rect1.png')
                                                                        : require('../../../assets/img/Rect.png')
                                                                }
                                                                style={styles.checkboxImage}
                                                            />

                                                            <Text style={selectedTreatments.includes(item.treatment) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                                {item.treatment}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                keyExtractor={item => item.id}
                                            />
                                            {showOtherTreatmentsInput && (
                                                <View style={styles.otherContainer1}>
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

                                            {showOtherTreatmentsInput && (
                                                <TouchableOpacity style={[commonStyles.button, {}]} activeOpacity={0.8} onPress={handleTreatmentsModalSubmit}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>
                                            )}


                                        </TouchableOpacity>
                                        {showOtherServiceInput ?
                                            null :
                                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={handleTreatmentsModalSubmit}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>}


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
                                        value={selectedServiceName.length > 0 ? selectedServiceName[0] : ''}
                                        underlineColorAndroid="transparent"
                                        editable={false}
                                    />
                                    {/* <Text style={styles.totalServiceText}>
                                        +{selectedServices.filter(service => service !== 'Other').length + (showOtherInput ? 1 : 0)}
                                    </Text> */}
                                    {selectedServices.length > 0 ? (
                                        <Text style={styles.totalServiceText}>+{selectedServices.filter(service => service !== 'Other').length + (showOtherServiceInput ? 1 : 0)}</Text>
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


                            <TouchableOpacity
                                style={[commonStyles.button]}
                                onPress={handleNext}
                                activeOpacity={0.8}
                            >
                                <Text style={commonStyles.buttonText}>Continue</Text>
                            </TouchableOpacity>


                        </View>
                    </ScrollView>
                    {/* Continue Button */}

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
        marginBottom: 8,
    },
    buttonContainer: {
        marginBottom: 8,
    },
    modalHeaderText: {
        color: '#121212',
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 10,

    },
    otherContainer1: {
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
    }
});

export default EClinicProfileCompletion5;
