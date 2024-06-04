/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, PermissionsAndroid,  ToastAndroid, Modal, Dimensions, TextInput} from 'react-native';
import React, { useState, useEffect } from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { moderateScale } from 'react-native-size-matters';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import CustomPremium from '../../components/CustomPremium';

const { width, height } = Dimensions.get('window');

const ManageAddress = ({ navigation }) => {

    const [initialRegion, setInitialRegion] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [savedLocations, setSavedLocations] = useState([]);

    const fetchSavedLocations = async () => {
        try {
            // Fetch pr_id from AsyncStorage
            const pr_id = await AsyncStorage.getItem('pr_id');
            if (!pr_id) {
                console.error('pr_id not found in AsyncStorage');
                return;
            }
            const id = parseInt(pr_id);

            // Fetch personal details using pr_id
            const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getpersonaldtls4-ax.php?pr_id=${id}`);
            const data = response.data;
            if (data && data.data && data.data.length > 0) {
                setSavedLocations(data.data.map(location => ({
                    loc_one: location.loc_one,
                    loc_two: location.loc_two,
                    city: location.city,
                    state: location.state,
                    pincode: location.pincode,
                    landmark: location.landmark,
                    address: `${location.loc_two}, ${location.city}`,
                    name: location.loc_one,
                    loc_id: location.loc_id
                })));
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching saved locations:', error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        // Fetch saved locations when the component mounts
        fetchSavedLocations();
    }, []);


      const handleLocationPress = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      console.log('Location Permission Granted:', granted);

      if (granted) {
        Geolocation.getCurrentPosition(
          async (position) => {
            console.log('Position:', position);
            const { latitude, longitude } = position.coords;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            // Store the current location in AsyncStorage
            await AsyncStorage.setItem('latitude', String(latitude));
            await AsyncStorage.setItem('longitude', String(longitude));
            // Update initialRegion and markerPosition state with current location
            setInitialRegion({
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setMarkerPosition({
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            });
            setIsLoading(false);
            // Navigate to the MapScreen
            navigation.navigate('MapScreen');
          },
          (error) => {
            console.log('Error:', error);
            setIsLoading(false);
            ToastAndroid.show('Error getting location', ToastAndroid.SHORT);
            console.error(error);
          }
        );
      } else {
        setIsLoading(false);
        ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
        navigation.navigate('MapScreen');
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Error requesting location permission:', err);
    }
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
    const [locationId, setLocationId] = useState();

    const openModal = () => {
        setIsModalVisible(true);
    };

    const openModal1 = (location) => {
        console.log('Location passed to openModal1:', location);

        setSelectedLocation(location); 
        setHouseNumber(location.loc_one || '');
        setArea(location.loc_two || ''); 
        setCity(location.city || '');
        setState(location.state || '');
        setPincode(location.pincode || '');
        setLandmark(location.landmark || '');
        setLocationId(location.loc_id || ''); 

        console.log('Location ID set:', locationId);
        setIsModalVisible1(true); 
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

    const handleUpdate = async () => {
        setIsModalVisible1(false);


        const pr_id = await AsyncStorage.getItem('pr_id');
        const id = parseInt(pr_id);


        const updateData = {
            id: locationId,
            pr_id: id,
            loc_one: houseNumber,
            loc_two: area,
            city: city,
            state: state,
            pincode: pincode,
            landmark: landmark || ''
        };

        console.log('Form Data:', updateData);

        try {
            const locationId = updateData.id; // Use thde id of the selected location
            console.log('locationId', locationId);
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/requpdatepersonaldtls4-ax.php?id=${locationId}`, updateData);
            // const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/requpdatepersonaldtls4-ax.php`, updateData);

            console.log('dataresponse', response.data);
            ToastAndroid.show("Data Updated Successfully!", ToastAndroid.SHORT);
            console.log('Data Updated to database');
        } catch (error) {
            console.error('An error occurred:', error);
        }
        await fetchSavedLocations();
        // Log the form data
        console.log('Form Data:', updateData);
        setIsModalVisible1(false);


    };

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

        // Form data
        const formData = {

            pr_id: id,
            loc_one: houseNumber,
            loc_two: area,
            city: city,
            state: state,
            pincode: pincode,
            landmark: landmark || ''
        };

        try {
            const response = await axios.post(`https://temp.wedeveloptech.in/denxgen/appdata/reqpersonaldtls4-ax.php`, formData);

            console.log('dataresponse', response.data);
            //ToastAndroid.show("Product Added Successfully!", ToastAndroid.SHORT);
            console.log('Data Added to database');
        } catch (error) {
            console.error('An error occurred:', error);
        }
        await fetchSavedLocations();
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

    const [showPremium, setShowPremium] = useState(false);

    const openPremium = () => {
        setShowPremium(true);
    };

    const closePremium = () => {
        setShowPremium(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer}  activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Manage Address</Text>
                    <TouchableOpacity style={commonStyles.backContainer1}  activeOpacity={0.8}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
                <View style={styles.buttonContainer}>
                    {/* Add Address Button */}
                    <TouchableOpacity style={styles.buttonAdd} onPress={openModal}>
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
                    <View style={styles.horizontalLine} />

                    <TouchableOpacity style={styles.buttonAdd} onPress={handleLocationPress}>
                        <View style={styles.buttonContent}>
                            <View style={styles.leftContainer}>
                                <Image source={require('../../../assets/img/CurrentLoc.png')} style={styles.iconImage} />
                                <Text style={commonStyles.headerText4B}>Use Current Location</Text>
                            </View>
                            {/* Right side content (right image) */}
                            <Image source={require('../../../assets/img/ViewMore.png')} style={styles.rightIconImageAdd} />
                        </View>
                    </TouchableOpacity>
                </View>
                {savedLocations.length > 0 && (
                    <Text style={[commonStyles.headerText4BL, { alignSelf: 'flex-start', marginTop: 24 }]}>Saved Locations</Text>
                )}
                {savedLocations.map((location, index) => (
                    <TouchableOpacity key={index} style={styles.savedLocationBox} activeOpacity={0.8} onPress={() => openModal1(location)}>
                        <View style={styles.buttonContent1}>
                            <View style={styles.leftContainer}>
                                <Image source={require('../../../assets/img/HomeSaved.png')} style={styles.iconImage} />
                                <View>
                                    <Text style={commonStyles.headerText4BL}>{location.name}</Text>
                                </View>
                            </View>
                            <Popover
                                placement={PopoverPlacement.LEFT}
                                from={(
                                    <TouchableOpacity
                                        style={commonStyles.backContainer1}
                                    >
                                        <Image
                                            source={require('../../../assets/img/Option.png')}
                                            style={{ width: 20, height: 20, marginLeft: width * 0.02 }}
                                        />
                                    </TouchableOpacity>
                                )}>
                                <View style={styles.popover}>
                                   

                                    <TouchableOpacity onPress={openPremium}>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/SaveCon.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Add To VIC</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      
                                    >
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Spam.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Delete Location</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <CustomPremium
                                    visible={showPremium}
                                    onClose={closePremium}
                                    onContinue={openPremium}
                                    onSkip={closePremium}
                                    mainText="You have reached your limit" // Pass your main text as a prop
                                />
                            </Popover>
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

                {/* <TouchableOpacity
                    style={{
                        paddingHorizontal: 9,
                        borderWidth: 1,
                        borderRadius: 15,
                        borderColor: '#289EF5',
                        marginBottom: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 51,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={{ fontSize: 16, fontWeight: '400', color: 'black', fontFamily: 'Mukta-SemiBold' }}>Delete Account</Text>
                                <Image source={require('../../assets/img/RightView.png')} style={{ width: 24, height: 24 }} />
                            </View>

                        </View>
                    </View>

                </TouchableOpacity> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    subContainer: {
        marginVertical: 12
    },
    buttonContainer: {
        borderRadius: 10, // Add border radius
        overflow: 'hidden', // Clip the border radius
        borderWidth: 1, // Add border width if needed
        borderColor: '#ccc', // Border color
        width: '100%',
        paddingVertical: 10,
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
        marginBottom: 10,
    },
    // leftContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingHorizontal: 20,
    // },
    textContainer: {
        flexDirection: 'column',
    },
    // buttonText: {
    //     fontSize: 17,
    //     fontWeight: '400',
    //     color: 'black',
    //     fontFamily: 'Mukta-Regular',
    // },
    // addressText: {
    //     fontSize: 14,
    //     fontWeight: '400',
    //     color: '#979797',
    //     fontFamily: 'Mukta-Regular',
    // },
    iconImage: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    iconImageAdd: {
        width: 13,
        height: 13,
        marginRight: 10
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
        width: '95%', // Adjust the width as needed
        marginVertical: 10,
        marginHorizontal: 10
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonContent1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        //paddingHorizontal: 20,
        width: '100%',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      
    },
    buttonTextAdd: {
        fontSize: 16,
        fontWeight: '400',
        color: '#289EF5',
        fontFamily: 'Mukta-Medium',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#289EF5',
        fontFamily: 'Mukta-Medium',
        alignSelf: 'flex-start'
    },
    addressText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#979797',
        fontFamily: 'Mukta-Regular',
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
    popover: {
        backgroundColor: '#FEFCFC',
        borderRadius: 10,
        paddingVertical: 8
    },
    popoverItemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 16
    },
    popoverItemIcon: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    popoverItemIcon1: {
        height: 15,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    popoverItemText: {
        fontSize: 15,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22, //28
        marginHorizontal: 10,
        alignSelf: 'center',
    },
});

export default ManageAddress;
