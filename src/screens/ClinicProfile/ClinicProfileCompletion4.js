/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
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
    PermissionsAndroid,
    Animated
} from 'react-native';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from 'react-native-paper';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const SavedLocationContainer = ({ savedLocations }) => {
    return (
        <View>
            {savedLocations.map((location, index) => (
                <TouchableOpacity key={index} style={styles.savedLocationBox} activeOpacity={0.8}>
                    <View style={styles.buttonContent}>
                        <View style={styles.leftContainer}>
                            <Image source={require('../../../assets/img/CurrentLoc.png')} style={styles.iconImage} />
                            <View>
                                <Text style={commonStyles.headerText4B}>{location.name}</Text>
                            </View>
                        </View>
                        {/* Right side content (location distance) */}
                        <Text style={styles.locationDistance}>{location.distance}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={commonStyles.headerText3BL}>{location.address}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};


const ClinicProfileCompletion4 = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [savedLocations, setSavedLocations] = useState([]);

    // const fetchSavedLocations = async () => {
    //     try {
    //         const response = await axios.get('https://temp.wedeveloptech.in/denxgen/appdata/getpersonaldtls4-ax.php?pr_id=1');
    //         const data = response.data;
    //         if (data && data.data && data.data.length > 0) {
    //             setSavedLocations(data.data.map(location => ({
    //                 loc_one: location.loc_one,
    //                 loc_two: location.loc_two,
    //                 city: location.city,
    //                 state: location.state,
    //                 pincode: location.pincode,
    //                 landmark: location.landmark,
    //                 address: `${location.loc_two}, ${location.city}`,
    //                 name: location.loc_one,
    //             })));
    //         }
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching saved locations:', error);
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     // Fetch saved locations when the component mounts
    //     fetchSavedLocations();
    // }, []);

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

    const [initialRegion, setInitialRegion] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);

    const handleLocationPress = async () => {
        // try {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        //     );
        //     console.log('Location Permission Granted:', granted);

        //     if (granted) {
        //         Geolocation.getCurrentPosition(
        //             async (position) => {
        //                 console.log('Position:', position);
        //                 const { latitude, longitude } = position.coords;
        //                 console.log('Latitude:', latitude);
        //                 console.log('Longitude:', longitude);
        //                 // Store the current location in AsyncStorage
        //                 await AsyncStorage.setItem('latitude', String(latitude));
        //                 await AsyncStorage.setItem('longitude', String(longitude));
        //                 // Update initialRegion and markerPosition state with current location
        //                 setInitialRegion({
        //                     latitude: parseFloat(latitude),
        //                     longitude: parseFloat(longitude),
        //                     latitudeDelta: 0.0922,
        //                     longitudeDelta: 0.0421,
        //                 });
        //                 setMarkerPosition({
        //                     latitude: parseFloat(latitude),
        //                     longitude: parseFloat(longitude),
        //                 });
        //                 setIsLoading(false);
        //                 // Navigate to the MapScreen
        //                 navigation.navigate('MapScreen');
        //             },
        //             (error) => {
        //                 console.log('Error:', error);
        //                 setIsLoading(false);
        //                 ToastAndroid.show('Error getting location', ToastAndroid.SHORT);
        //                 console.error(error);
        //             }
        //         );
        //     } else {
        //         setIsLoading(false);
        //         ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
        //         navigation.navigate('MapScreen');
        //     }
        // } catch (err) {
        //     setIsLoading(false);
        //     console.error('Error requesting location permission:', err);
        // }
    };

    const [houseNumber, setHouseNumber] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [landmark, setLandmark] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const openModal1 = (location) => {
        setSelectedLocation(location); // Set the selected location
        console.log(selectedLocation);
        setHouseNumber(location.loc_one || ''); // Assuming loc_one corresponds to houseNumber
        setArea(location.loc_two || ''); // Assuming loc_two corresponds to area
        setCity(location.city || '');
        setState(location.state || '');
        setPincode(location.pincode || '');
        setLandmark(location.landmark || '');
        setIsModalVisible1(true); // Open the modal
    };


    const closeModal = () => {
        setIsModalVisible(false);
        setIsModalVisible1(false);
        setHouseNumber('');
        setArea('');
        setCity('');
        setState('');
        setPincode('');
        setLandmark('');
    };


    const handleSavedLocationClick = (location) => {
        setSelectedLocation(location); // Set selected location data
        setIsModalVisible(true); // Open the modal
    };

    // Assuming currentStep is the variable holding the current step number
    const currentStep = 4; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    //console.log("Progress Percentage:", progressPercentage);

    const handleSubmit = async () => {
        if (!houseNumber) {
            ToastAndroid.show('Please enter house number.', ToastAndroid.SHORT);
            return;
        }
        if (!area) {
            ToastAndroid.show('Please enter area.', ToastAndroid.SHORT);
            return;
        }
        if (!city) {
            ToastAndroid.show('Please enter city.', ToastAndroid.SHORT);
            return;
        }
        if (!state) {
            ToastAndroid.show('Please enter state.', ToastAndroid.SHORT);
            return;
        }
        if (!pincode) {
            ToastAndroid.show('Please enter pincode.', ToastAndroid.SHORT);
            return;
        }
        if (isNaN(Number(pincode)) || pincode.length !== 6) {
            ToastAndroid.show('Please enter a valid 6-digit pincode.', ToastAndroid.SHORT);
            return;
        }
        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);
        const acc_ty_id = await AsyncStorage.getItem('acc_ty_id');

        // Form data
        const formData = {
            acc_ty_id: parseInt(acc_ty_id),
            pr_id: id,
            loc_one: houseNumber,
            loc_two: area,
            city: city,
            state: state,
            pincode: pincode,
            landmark: landmark || ''
        };

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqbusinessdtls4-ax.php`, formData);

            console.log('dataresponse', response.data);
            //ToastAndroid.show("Product Added Successfully!", ToastAndroid.SHORT);
            console.log('Data Added to database');
        } catch (error) {
            console.error('An error occurred:', error);
        }
        //await fetchSavedLocations();
        // Log the form data
        console.log('Form Data:', formData);
        setIsModalVisible(false);

        // Clear all fields
        setHouseNumber('');
        setArea('');
        setCity('');
        setState('');
        setPincode('');
        setLandmark('');

    };

    const handleUpdate = async () => {

        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);


        const updateData = {
            pr_id: id,
            loc_one: houseNumber,
            loc_two: area,
            city: city,
            state: state,
            pincode: pincode,
            landmark: landmark || ''
        };



        // try {
        //     const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/requpdatepersonaldtls4-ax.php`, updateData);

        //     console.log('dataresponse', response.data);
        //     ToastAndroid.show("Data Added Successfully!", ToastAndroid.SHORT);
        //     console.log('Data Updated to database');
        // } catch (error) {
        //     console.error('An error occurred:', error);
        // }
        // await fetchSavedLocations();
        // Log the form data
        console.log('Form Data:', updateData);
        setIsModalVisible1(false);


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
                                <Text style={[commonStyles.headerText1BL, { marginBottom: moderateScale(6), textAlign: 'center' }]}>
                                    Step 4 - Location
                                </Text>
                                <Text style={[commonStyles.headerText2BL, { textAlign: 'center', paddingHorizontal: width * 0.02 }]}>
                                    Choose your career category and unlock endless possibilities.
                                </Text>
                                {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                />
                            </View>


                            <View style={styles.buttonContainer}>
                                {/* Add Address Button */}
                                <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.8} onPress={openModal}>
                                    <View style={styles.buttonContent}>
                                        <View style={styles.leftContainer}>
                                            <Image source={require('../../../assets/img/AddAddress.png')} style={styles.iconImageAdd} />
                                            <Text style={commonStyles.headerText4B}>Add Address</Text>
                                        </View>
                                        {/* Right side content (right image) */}
                                        <Image source={require('../../../assets/img/ViewMore.png')} style={styles.rightIconImageAdd} />
                                    </View>
                                </TouchableOpacity>
                                <Modal
                                    visible={isModalVisible}
                                    transparent
                                    activeOpacity={1}
                                    onRequestClose={() => closeModal()}
                                >
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={styles.modalContainer}
                                        onPress={() => closeModal()}
                                    >
                                        <TouchableOpacity style={styles.modalContent}
                                            activeOpacity={1}
                                            onPress={() => { }}>
                                            <ScrollView>
                                                <View style={styles.horizontalLineM}></View>
                                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                    Enter your Full Address
                                                </Text>
                                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                    Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                                </Text>

                                                <View style={styles.inputContainerWithLabel}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                        Flat / House no / Floor / Building
                                                    </Text>
                                                    <View style={styles.inputContainer1}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="House Number"
                                                            placeholderTextColor="#979797"
                                                            value={houseNumber}
                                                            onChangeText={text => setHouseNumber(text)}
                                                            underlineColorAndroid="transparent"

                                                        />
                                                    </View>
                                                </View>
                                                <View style={styles.inputContainerWithLabel}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                        Area / Sector / Locality
                                                    </Text>
                                                    <View style={styles.inputContainer1}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="Area / Sector / Locality"
                                                            placeholderTextColor="#979797"
                                                            value={area}
                                                            onChangeText={text => setArea(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                </View>

                                                <View style={styles.inputContainerWithLabel}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                        City
                                                    </Text>
                                                    <View style={styles.inputContainer1}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="City"
                                                            placeholderTextColor="#979797"
                                                            value={city}
                                                            onChangeText={text => setCity(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                </View>

                                                <View style={styles.inputRow}>
                                                    <View style={[styles.inputContainer, {}]}>
                                                        <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>State</Text>
                                                        <View style={[styles.inputContainer1, { width: width * 0.43 }]}>
                                                            <TextInput
                                                                style={[styles.inputs, { textAlign: 'left' }]}
                                                                placeholder="State"
                                                                placeholderTextColor="#979797"
                                                                value={state}
                                                                onChangeText={text => setState(text)}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={[styles.inputContainer, {}]}>
                                                        <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>Pincode</Text>
                                                        <View style={[styles.inputContainer1, { width: width * 0.43 }]}>
                                                            <TextInput
                                                                style={[styles.inputs, { textAlign: 'left' }]}
                                                                placeholder="Pincode"
                                                                placeholderTextColor="#979797"
                                                                value={pincode}
                                                                onChangeText={text => setPincode(text)}
                                                                underlineColorAndroid="transparent"
                                                            />
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={styles.inputContainerWithLabel}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                        Nearby Landmark
                                                    </Text>
                                                    <View style={styles.inputContainer1}>
                                                        <TextInput
                                                            style={styles.inputs}
                                                            placeholder="Nearby Landmark"
                                                            placeholderTextColor="#979797"
                                                            value={landmark}
                                                            onChangeText={text => setLandmark(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                </View>


                                                <TouchableOpacity style={[commonStyles.button]} onPress={handleSubmit} activeOpacity={0.8}>
                                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>

                                {/* Horizontal line */}
                                {/* <View style={styles.horizontalLine} /> */}

                                {/* <TouchableOpacity style={styles.buttonAdd} activeOpacity={0.8} onPress={handleLocationPress}>
                                    <View style={styles.buttonContent}>
                                       
                                        <View style={styles.leftContainer}>
                                            <Image source={require('../../../assets/img/CurrentLoc.png')} style={styles.iconImage} />
                                            <View>
                                                <Text style={commonStyles.headerText4B}>Use Current Location</Text>
                                            </View>
                                           
                                        </View>
                                        <Image source={require('../../../assets/img/ViewMore.png')} style={styles.rightIconImageAdd} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.textContainer}>
                                    <Text style={commonStyles.headerText3BL}>Godrej & boyce Industry, Vikhroli West, Mumbai</Text>
                                </View> */}
                            </View>
                            {savedLocations.length > 0 && (
                                <Text style={[commonStyles.headerText4BL, { alignSelf: 'flex-start', marginTop: moderateScale(24) }]}>Saved Locations</Text>
                            )}
                            {savedLocations.map((location, index) => (
                                <TouchableOpacity key={index} style={styles.savedLocationBox} activeOpacity={0.8} onPress={() => openModal1(location)}>
                                    <View style={styles.buttonContent}>
                                        <View style={styles.leftContainer}>
                                            <Image source={require('../../../assets/img/HomeSaved.png')} style={styles.iconImage} />
                                            <View>
                                                <Text style={commonStyles.headerText4BL}>{location.name}</Text>
                                            </View>
                                        </View>
                                        {/* Right side content (location distance) */}
                                        {/* <Text style={commonStyles.headerText5G}>{location.distance}</Text> */}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={commonStyles.headerText3G}>{location.address}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            <Modal
                                visible={isModalVisible1}
                                transparent
                                activeOpacity={1}
                                onRequestClose={() => closeModal()}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles.modalContainer}
                                    onPress={() => closeModal()}
                                >
                                    <TouchableOpacity style={styles.modalContent}
                                        activeOpacity={1}
                                        onPress={() => { }}>
                                        <ScrollView>
                                            <View style={styles.horizontalLineM}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                                Enter your Full Address
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                            </Text>

                                            <View style={styles.inputContainerWithLabel}>
                                                <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                    Flat / House no / Floor / Building
                                                </Text>
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="House Number"
                                                        placeholderTextColor="#979797"
                                                        value={houseNumber}
                                                        onChangeText={text => setHouseNumber(text)}
                                                        underlineColorAndroid="transparent"

                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.inputContainerWithLabel}>
                                                <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                    Area / Sector / Locality
                                                </Text>
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Area / Sector / Locality"
                                                        placeholderTextColor="#979797"
                                                        value={area}
                                                        onChangeText={text => setArea(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.inputContainerWithLabel}>
                                                <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                    City
                                                </Text>
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="City"
                                                        placeholderTextColor="#979797"
                                                        value={city}
                                                        onChangeText={text => setCity(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            </View>

                                            <View style={styles.inputRow}>
                                                <View style={[styles.inputContainer, {}]}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>State</Text>
                                                    <View style={[styles.inputContainer1, { width: width * 0.43 }]}>
                                                        <TextInput
                                                            style={[styles.inputs, { textAlign: 'left' }]}
                                                            placeholder="State"
                                                            placeholderTextColor="#979797"
                                                            value={state}
                                                            onChangeText={text => setState(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                </View>
                                                <View style={[styles.inputContainer, {}]}>
                                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>Pincode</Text>
                                                    <View style={[styles.inputContainer1, { width: width * 0.43 }]}>
                                                        <TextInput
                                                            style={[styles.inputs, { textAlign: 'left' }]}
                                                            placeholder="Pincode"
                                                            placeholderTextColor="#979797"
                                                            value={pincode}
                                                            onChangeText={text => setPincode(text)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={styles.inputContainerWithLabel}>
                                                <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                                    Nearby Landmark
                                                </Text>
                                                <View style={styles.inputContainer1}>
                                                    <TextInput
                                                        style={styles.inputs}
                                                        placeholder="Nearby Landmark"
                                                        placeholderTextColor="#979797"
                                                        value={landmark}
                                                        onChangeText={text => setLandmark(text)}
                                                        underlineColorAndroid="transparent"
                                                    />
                                                </View>
                                            </View>


                                            <TouchableOpacity style={[commonStyles.button]} onPress={handleUpdate} activeOpacity={0.8}>
                                                <Text style={commonStyles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </Modal>
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={[commonStyles.button, styles.continueButton]}
                        onPress={() => {
                            navigation.navigate('ClinicProfileCompletion5');
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
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: moderateScale(16),
        paddingBottom: moderateScale(100),
    },
    contentContainer: {
        marginTop: moderateScale(32),
        //justifyContent: 'center',
        alignItems: 'center',
        //marginTop: height * 0.00,
    },
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
        //zIndex: 1,
    },
    buttonContainer: {
        borderRadius: 10, // Add border radius
        overflow: 'hidden', // Clip the border radius
        borderWidth: 1, // Add border width if needed
        borderColor: '#ccc', // Border color
        width: '100%',
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        backgroundColor: '#FEFCFC',
    },
    buttonAdd: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 10,
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(10),
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        //paddingHorizontal: moderateScale(12),
        width: '100%',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    iconImage: {
        width: 18,
        height: 18,
        marginRight: moderateScale(10),
    },
    iconImageAdd: {
        width: 18,
        height: 18,
        marginRight: moderateScale(10),
    },
    rightIconImage: {
        width: 6,
        height: 11,
        alignSelf: 'flex-start'
    },
    rightIconImageAdd: {
        width: 6,
        height: 11,

    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%', // Adjust the width as needed
        marginVertical: 10,
        //marginHorizontal: moderateScale(10),
    },
    textContainer: {
        marginLeft: moderateScale(25), // Adjust the margin as needed
        marginTop: moderateScale(5),
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
        //paddingBottom: 30,
    },
    horizontalLineM: {
        width: '20%',
        height: 5,
        marginBottom: height * 0.03,
        //marginHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#979797',
        borderRadius: 10
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
    inputs: {
        marginLeft: width * 0.04,
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        flex: 1
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    continueButton: {
        position: 'absolute',
        bottom: 30,
    },
    savedLocationBox: {
        backgroundColor: '#FEFCFC',
        borderRadius: 10,
        width: '100%',
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(10),
        borderWidth: 1,
        borderColor: '#ccc',
    },
});


export default ClinicProfileCompletion4;
