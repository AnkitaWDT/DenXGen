/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Text, Dimensions, TouchableOpacity, Image, ToastAndroid, Modal, TextInput, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import commonStyles from '../../components/CommonStyles';
import Geocoder from 'react-native-geocoding';
import customMarkerImage from '../../../assets/img/LocationPin.png';
import { ScrollView } from 'react-native-gesture-handler';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');


const MapScreen = ({ navigation }) => {
    const [initialRegion, setInitialRegion] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [distance, setDistance] = useState(null);
    const [prevMarkerPosition, setPrevMarkerPosition] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [locationInfo, setLocationInfo] = useState(null);

    const [modalVisibleS, setModalVisibleS] = useState(false);
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [currentLocationInfo, setCurrentLocationInfo] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);

    const [currentLocationName, setCurrentLocationName] = useState('');

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSelectLocation = (data, details) => {
        // ToastAndroid.show(
        //   'Coordinates Updated Successfully!',
        //   ToastAndroid.SHORT,
        //   ToastAndroid.TOP,
        //   25,
        //   50
        // );



        // Extract the selected location details, like latitude and longitude
        const { location } = details.geometry;
        const { lat, lng } = location;
        setMapRegion({
            latitude: lat,
            longitude: lng,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            latitudeDelta: 0.004, // Adjust the latitudeDelta value
            longitudeDelta: 0.004, // Adjust the longitudeDelta value
        });

        // Update the marker position with the selected location
        setMarkerPosition({ latitude: lat, longitude: lng });

        // Optionally, do any other necessary actions with the selected location details

        // You might also want to clear the search text input if needed
        setSearchText('');

        // Close the modal
        setTimeout(() => {
            // Close the modal
            setModalVisibleS(false);
        }, 500);
        closeModal();

        // Optionally, you can also perform any other actions or state updates required after selecting a location
    };


    useEffect(() => {
        fetchCurrentLocationInfo();
    }, []);

    const fetchCurrentLocationInfo = async () => {
        try {
            const latitude = await AsyncStorage.getItem('latitude');
            const longitude = await AsyncStorage.getItem('longitude');

            if (latitude && longitude) {
                Geocoder.init('AIzaSyDGce21Ka5lP7WmaCaAQ2k0O6Zd2aN_fSA');
                const res = await Geocoder.from({ latitude, longitude });

                if (res.results.length > 0) {
                    const addressComponents = res.results[0].address_components;
                    let locationInfo = {
                        political1: '',
                        political2: '',
                        city: '',
                        route: '',
                    };

                    for (let component of addressComponents) {
                        let componentType = component.types[0];
                        let componentName = component.long_name;

                        switch (componentType) {
                            // case 'political':
                            //   locationInfo.political1 = componentName;
                            //   break;
                            // case 'political':
                            //   locationInfo.political2 = componentName;
                            //   break;
                            case 'political':
                                if (!locationInfo.political1) {
                                    locationInfo.political1 = componentName;
                                } else if (!locationInfo.political2) {
                                    locationInfo.political2 = componentName;
                                }
                                break;
                            case 'locality':
                                locationInfo.city = componentName;
                                break;
                            case 'route':
                                locationInfo.route = componentName;
                                break;
                            default:
                                break;
                        }
                    }

                    setCurrentLocationInfo(locationInfo);
                }
            }
        } catch (error) {
            console.error('Error fetching current location info:', error);
        }
    };

    // Function to calculate distance between two points (in meters)
    const calculateDistances = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d * 1000; // Convert to meters
    };


    // Function to filter nearby locations within a certain radius
    // const fetchNearbyLocations = async (currentLocation, markerPosition, radius) => {
    //     try {
    //         const apiKey = 'AIzaSyDGce21Ka5lP7WmaCaAQ2k0O6Zd2aN_fSA';
    //         const { latitude, longitude } = markerPosition;
    //         console.log(markerPosition);
    //         const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=${apiKey}`;

    //         const response = await fetch(apiUrl);
    //         const data = await response.json();
    //         console.log(data);
    //         console.log(apiUrl);


    //         if (data.status === 'OK') {
    //             // Extract relevant information from the API response
    //             const nearbyLocations = data.results.slice(1, 5).map(result => ({
    //                 name: result.name,
    //                 vicinity: result.vicinity,
    //                 location: result.geometry.location,
    //                 distance: calculateDistance(latitude, longitude, result.geometry.location.lat, result.geometry.location.lng)
    //             }));
    //             console.log(nearbyLocations);
    //             return nearbyLocations;
    //         } else {
    //             throw new Error('Failed to fetch nearby locations from the Places API');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching nearby locations:', error);
    //         return [];
    //     }
    // };


    const generateMockNearbyLocations = (markerPosition) => {
        const { latitude, longitude } = markerPosition;
        const nearbyLocations = [];

        // Generate some mock nearby locations
        for (let i = 0; i < 5; i++) {
            const nearbyLocation = {
                name: `Location ${i + 1}`,
                latitude: latitude + (Math.random() - 0.5) / 5000, // Add a small random offset
                longitude: longitude + (Math.random() - 0.5) / 5000, // Add a small random offset
            };
            nearbyLocations.push(nearbyLocation);
        }

        return nearbyLocations;
    };

    const getCurrentLocations = async () => {
        const latitude = parseFloat(await AsyncStorage.getItem('latitude'));
        const longitude = parseFloat(await AsyncStorage.getItem('longitude'));
        return { latitude, longitude };
    };


    // Function to handle opening the modal and filtering nearby locations
    const openModal = async () => {
        const currentLocation = await getCurrentLocations();
        setModalVisibleS(true);
        // const nearbyLocations = await fetchNearbyLocations(currentLocation, markerPosition, 500);
        // setNearbyLocations(nearbyLocations);
    };


    const closeModal = () => {
        setModalVisibleS(false);
    };

    const handleSearch = () => {
        // Implement search functionality based on searchText
    };

    const handleCurrentLocationPress = async () => {
        try {
            const latitude = await AsyncStorage.getItem('latitude');
            const longitude = await AsyncStorage.getItem('longitude');

            if (latitude && longitude) {
                const region = {
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                    // latitudeDelta: 0.0922,
                    // longitudeDelta: 0.0421,
                    latitudeDelta: 0.004, // Adjust the latitudeDelta value
                    longitudeDelta: 0.004, // Adjust the longitudeDelta value
                };
                setMarkerPosition(region);
                setMapRegion(region);
            }

            // Close the modal
            setModalVisibleS(false);
            console.log('closed')
        } catch (error) {
            console.error('Error fetching current location from AsyncStorage:', error);
        }
    };


    useEffect(() => {
        const fetchInitialRegion = async () => {
            try {
                const latitude = await AsyncStorage.getItem('latitude');
                const longitude = await AsyncStorage.getItem('longitude');

                if (latitude && longitude) {
                    const region = {
                        latitude: parseFloat(latitude),
                        longitude: parseFloat(longitude),
                        // latitudeDelta: 0.0922,
                        // longitudeDelta: 0.0421,
                        latitudeDelta: 0.004, // Adjust the latitudeDelta value
                        longitudeDelta: 0.004, // Adjust the longitudeDelta value
                    };
                    setInitialRegion(region);
                    setMarkerPosition(region);
                    setMapRegion(region);
                } else {
                    getCurrentLocation();
                }
            } catch (error) {
                console.error('Error fetching initial region from AsyncStorage:', error);
            }
        };

        fetchInitialRegion();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                const region = {
                    latitude,
                    longitude,
                    // latitudeDelta: 0.0922,
                    // longitudeDelta: 0.0421,
                    latitudeDelta: 0.004, // Adjust the latitudeDelta value
                    longitudeDelta: 0.004, // Adjust the longitudeDelta value
                };
                setInitialRegion(region);
                setMarkerPosition(region);
                setMapRegion(region);
            },
            error => console.error('Error getting current location:', error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d.toFixed(2);
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Update the marker position and calculate distance based on the previous position
    const handleMarkerDragEnd = (e) => {
        console.log('Marker dragged');
        const { latitude, longitude } = e.nativeEvent.coordinate;
        if (markerPosition) {
            console.log('Previous Marker Position:', markerPosition);
            const dist = calculateDistance(
                markerPosition.latitude,
                markerPosition.longitude,
                latitude,
                longitude
            );
            console.log('Distance:', dist);
            setDistance(dist);
        } else {
            console.warn('Previous Marker Position is null');
        }
        setPrevMarkerPosition(markerPosition); // Update the previous marker position
        setMarkerPosition(e.nativeEvent.coordinate);
        setMapRegion(e.nativeEvent.coordinate);
    };

    const handleRegionChangeComplete = (region) => {
        console.log('Region changed:', region);
        const { latitude, longitude } = region;
        if (markerPosition) {
            console.log('Previous Marker Position:', markerPosition);
            const dist = calculateDistance(
                markerPosition.latitude,
                markerPosition.longitude,
                latitude,
                longitude
            );
            console.log('Distance:', dist);
            setDistance(dist);
        } else {
            console.warn('Previous Marker Position is null');
        }
        setPrevMarkerPosition(markerPosition); // Update the previous marker position
        setMarkerPosition(region);
        setMapRegion(region);
    };


    const handleConfirmButtonPress = async () => {
        try {
            await AsyncStorage.setItem('latitude', String(markerPosition.latitude));
            await AsyncStorage.setItem('longitude', String(markerPosition.longitude));
            //Alert.alert('Coordinates Updated Successfully!');
            ToastAndroid.show(
                'Coordinates Updated Successfully!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                25,
                50
            );
            navigation.goBack();
        } catch (error) {
            console.error('Error updating coordinates in AsyncStorage:', error);
            //Alert.alert('Failed to Update Coordinates');
            ToastAndroid.show(
                'Failed to Update Coordinates',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                25,
                50
            );
        }
    };

    useEffect(() => {
        Geocoder.init('AIzaSyDGce21Ka5lP7WmaCaAQ2k0O6Zd2aN_fSA');

        const fetchLocationInfo = async (latitude, longitude) => {
            try {
                const res = await Geocoder.from({ latitude, longitude });

                // Log the entire response to inspect available attributes
                console.log('Geocoder Response:', res);

                if (res.results.length > 0) {
                    const addressComponents = res.results[0].address_components;

                    let locationInfo = {
                        name: '', // Add name property to store the name of the location
                        political1: '',
                        political2: '',
                        city: '',
                        route: '',
                        long: '',
                        components: [], // Store component names and values
                        state: '', // Initialize state property
                        pincode: '' // Initialize pincode property
                    };

                    // Extract address components
                    for (let component of addressComponents) {
                        let componentType = component.types[0];
                        let componentName = component.long_name;
                        let componentLabel = '';

                        switch (componentType) {
                            case 'sublocality':
                                componentLabel = 'Area/Sector/Locality';
                                break;
                            case 'postal_code':
                                componentLabel = 'Pincode';
                                locationInfo.pincode = componentName; // Store pincode separately
                                break;
                            case 'locality':
                                componentLabel = 'City';
                                locationInfo.city = componentName; // Store city separately
                                break;
                            case 'administrative_area_level_1':
                                componentLabel = 'State';
                                locationInfo.state = componentName; // Store state separately
                                break;
                            case 'country':
                                componentLabel = 'Country';
                                break;
                            case 'route':
                                componentLabel = 'Route';
                                locationInfo.route = componentName; // Store route separately
                                break;
                            case 'political':
                                if (!locationInfo.political1) {
                                    locationInfo.political1 = componentName;
                                } else if (!locationInfo.political2) {
                                    locationInfo.political2 = componentName;
                                }
                                break;
                            default:
                                componentLabel = componentType;
                                break;
                        }

                        // Store component name and value
                        locationInfo.components.push({ label: componentLabel, value: componentName });
                    }

                    // Construct long address
                    const longAddressComponents = ['sublocality', 'locality', 'administrative_area_level_1', 'country', 'postal_code'];
                    locationInfo.long = longAddressComponents.map(componentType => locationInfo[componentType]).filter(Boolean).join(', ');

                    // Get the name of the location
                    locationInfo.name = res.results[0].formatted_address;

                    setLocationInfo(locationInfo);
                    console.log('LOG', locationInfo);
                }
            } catch (error) {
                console.error('Error fetching location info:', error);
            }
        };

        if (markerPosition) {
            fetchLocationInfo(markerPosition.latitude, markerPosition.longitude);
        }
    }, [markerPosition]);

    const handleLocationSelection = (location) => {
        // Here you can handle the selection of a nearby location
        // For example, you can close the modal and update the marker position
        setModalVisibleS(false);
        setMarkerPosition({ latitude: location.location.lat, longitude: location.location.lng });

        setSelectedLocation({
            name: location.name,
            vicinity: location.vicinity,
            latitude: location.location.lat,
            longitude: location.location.lng
        });
        setMapRegion({
            latitude: location.location.lat,
            longitude: location.location.lng,
            latitudeDelta: 0.004, // Adjust the latitudeDelta value if needed
            longitudeDelta: 0.004, // Adjust the longitudeDelta value if needed
        });
        //setMapRegion({ latitude: location.location.lat, longitude: location.location.lng });
    };



    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 15 }}>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Select Location</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                        <Image
                            //source={require('../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {initialRegion && (
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    onRegionChangeComplete={handleRegionChangeComplete}
                    region={mapRegion}
                >
                    {markerPosition && (
                        <>
                            <Marker
                                coordinate={markerPosition}
                                draggable
                                onDragEnd={handleMarkerDragEnd}
                                title="Your Marker Title"
                                description="Your Marker Description"
                            // image={customMarkerImage}
                            // style={{ width: 20, height: 20 }} 
                            />
                        </>
                    )}
                </MapView>
            )}
            <View style={{ position: 'absolute', bottom: height * 0.2, alignSelf: 'center' }}>
                <TouchableOpacity
                    style={styles.currentLocationButton}
                    onPress={handleCurrentLocationPress}
                >
                    <Image
                        source={require('../../../assets/img/CurrentLoc.png')}
                        style={styles.currentLocationIcon}
                    />
                    <Text style={styles.currentLocationText}>Use Current Location</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{ position: 'absolute', top: height * 0.06, width: '100%' }}
                onPress={openModal}>
                <View
                    style={{
                        borderRadius: 10,
                        margin: 10,
                        color: '#000',
                        borderColor: '#666',
                        backgroundColor: '#FFF',
                        borderWidth: 1,
                        height: 45,
                        paddingHorizontal: 10,
                        fontSize: 18,
                        justifyContent: 'center'
                    }}
                // placeholder={'Search'}
                // placeholderTextColor={'#666'}
                // onChangeText={text => setSearchText(text)}
                // onSubmitEditing={handleSearch}
                // value={searchText}
                >
                    <Text style={{ fontSize: 16, paddingHorizontal: 10, color: '#000' }}>Search</Text>
                </View>
            </TouchableOpacity>
            <Modal
                visible={modalVisibleS}
                transparent={true}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={styles.modalHeaderText}></Text>
                            <TouchableOpacity onPress={() => setModalVisibleS(false)}>
                                <Image
                                    source={require('../../../assets/img/closeM.png')}
                                    style={styles.closeImage}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* Search for area, street */}
                        {/* <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={'Search for Area, Locality'}
                placeholderTextColor={'#666'}
                onChangeText={text => setSearchText(text)}
                onSubmitEditing={handleSearch}
                value={searchText}
              />
            </View> */}
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                            <GooglePlacesAutocomplete
                                placeholder='Search for Area, Locality'
                                placeholderTextColor='#000'
                                onPress={handleSelectLocation}
                                fetchDetails={true}
                                query={{
                                    key: 'AIzaSyDGce21Ka5lP7WmaCaAQ2k0O6Zd2aN_fSA',
                                    language: 'en',
                                }}
                                timeout={20000}
                                styles={{
                                    textInputContainer: {
                                        borderRadius: 10,
                                        marginVertical: 10,
                                        borderColor: '#666',
                                        backgroundColor: '#FFF',
                                        borderWidth: 1,
                                        height: 46, // Ensure this height is sufficient
                                        paddingHorizontal: 10,
                                        fontSize: 18,
                                        color: '#000',
                                        marginBottom: 20
                                    },
                                    loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                    },
                                    listItemText: {
                                        color: '#000', // Style the text color of list items to black
                                    },
                                    textInput: {
                                        flex: 1,
                                        color: '#000',
                                        placeholderTextColor: '#000',
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                    description: {
                                        color: '#000', // Customize the text color of the list items
                                    },
                                }}
                            />

                            {/* Current location button with location name */}
                            <TouchableOpacity
                                style={styles.currentLocationButtonM}
                                onPress={handleCurrentLocationPress}
                            >
                                <View style={styles.currentLocationContentM}>
                                    <Image
                                        source={require('../../../assets/img/CurrentLoc.png')}
                                        style={styles.currentLocationIconM}
                                    />
                                    <Text style={styles.currentLocationTextM}>Use Current Location</Text>
                                </View>
                                {currentLocationInfo ? (
                                    <Text style={styles.locationName}>
                                        {currentLocationInfo.political1}
                                        {currentLocationInfo.political2 ? `, ${currentLocationInfo.political2}` : ''}
                                        {currentLocationInfo.route ? `, ${currentLocationInfo.route}` : ''}
                                        {currentLocationInfo.city ? `, ${currentLocationInfo.city}` : ''}
                                    </Text>
                                ) : null}
                            </TouchableOpacity>

                            {/* Nearby locations section */}
                            <View>
                                {/* <View>
                                    {nearbyLocations.length > 0 && (
                                        <View style={styles.sectionTitleContainer}>
                                            <View style={styles.horizontalLines} />
                                            <Text style={styles.sectionTitle}>Nearby Locations</Text>
                                            <View style={styles.horizontalLines} />
                                        </View>
                                    )}
                                    {nearbyLocations.map((location, index) => (
                                        <TouchableOpacity key={index} onPress={() => handleLocationSelection(location)}>
                                            <View style={styles.locationContainer}>
                                                <View style={styles.leftColumn}>
                                                    <Image source={require('./../../assets/img/pindrop.png')} style={styles.currentLocationIcon} />
                                                    <Text style={styles.distanceText}>{calculateDistance(markerPosition.latitude, markerPosition.longitude, location.location.lat, location.location.lng)} km</Text>
                                                </View>
                                                <View style={styles.rightColumn}>
                                                    <Text style={styles.locNames}>{location.name}</Text>
                                                    <Text style={styles.locationVicinity}>{location.vicinity}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View> */}

                            </View>

                        </ScrollView>


                    </View>

                </View>
            </Modal>
            <View style={styles.confirmBox}>
                {/* {distance && (
          <View style={styles.distanceContainer}>
            <Marker coordinate={initialRegion}>
              <Text>{`You are ${distance} km away from your current location`}</Text>
            </Marker>
          </View>
        )} */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, width: '100%' }}>
                    {/* Left side text and image */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Image */}
                        <Image
                            source={require('../../../assets/img/pindrop.png')}
                            style={{ width: 15, height: 22, marginRight: 10, alignSelf: 'center' }}
                        />

                        {/* Text */}
                        {/* <View>
              {locationInfo && (
                <>
                  <Text>{locationInfo.short}</Text>
                  <Text style={{ fontSize: 12, fontWeight: '400', color: '#979797', lineHeight: 22, fontFamily: 'Mukta-SemiBold' }}>{locationInfo.long}</Text>
                </>
              )}
            </View> */}
                        <View>
                            {locationInfo && (
                                <>
                                    <Text style={commonStyles.headerText2BL}>{locationInfo.political1}</Text>
                                    <Text style={commonStyles.headerText5G}>{locationInfo.political2}</Text>
                                </>
                            )}
                        </View>


                    </View>

                    {/* Right side button */}
                    <TouchableOpacity
                        style={styles.uploadButtonS}
                        onPress={() => navigation.navigate('ManageAddress')}
                    >
                        <Text style={styles.buttonTextU}>Change</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirmButtonPress} />
        </View> */}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Enter Complete Address</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent
                    activeOpacity={1}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.modalContainer}
                        onPress={() => setModalVisible(false)}
                    >
                        <TouchableOpacity style={styles.modalContent}
                            activeOpacity={1}
                            onPress={() => { }}>
                            <ScrollView>
                              
                                <View style={styles.horizontalLineM}></View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={styles.modalHeaderText}>Enter Complete Address
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Image
                                            source={require('../../../assets/img/closeM.png')}
                                            style={styles.closeImage}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputContainerWithLabel}>
                                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                                        Flat / House no / Floor / Building
                                    </Text>
                                    <View style={styles.inputContainer1}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder=""
                                            placeholderTextColor="#979797"
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
                                            style={[styles.inputs, { textAlign: 'left' }]}
                                            placeholder=""
                                            placeholderTextColor="#979797"
                                            underlineColorAndroid="transparent"
                                            selection={{ start: 0, end: 0 }}
                                            //value="Godrej & Boyce Industry Estate, Vikhroli West, Mumbai"
                                            value={`${locationInfo?.route ? locationInfo.route + ', ' : ''}${locationInfo?.political1 ? locationInfo.political1 + ', ' : ''}${locationInfo?.political2 ? locationInfo.political2 : ''}`}
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
                                            placeholder=""
                                            placeholderTextColor="#979797"
                                            value={`${locationInfo?.city ? locationInfo.city : ''}`}
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
                                                placeholder=""
                                                placeholderTextColor="#000000"
                                                underlineColorAndroid="transparent"
                                                selection={{ start: 0, end: 0 }}
                                                value={locationInfo?.state || ''}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.inputContainer, {}]}>
                                        <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>Pincode</Text>
                                        <View style={[styles.inputContainer1, { width: width * 0.43 }]}>
                                            <TextInput
                                                style={[styles.inputs, { textAlign: 'left' }]}
                                                placeholder=""
                                                placeholderTextColor="#979797"
                                                underlineColorAndroid="transparent"
                                                selection={{ start: 0, end: 0 }}
                                                value={locationInfo?.pincode || ''}
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
                                            placeholder=""
                                            placeholderTextColor="#979797"
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                </View>


                                <TouchableOpacity style={[commonStyles.button]} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

            </View>


        </View>
    );
};

const styles = StyleSheet.create({
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
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    leftColumn: {
        marginRight: 10,
        alignItems: 'center'
    },
    rightColumn: {
        flex: 1,
    },
    locationImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    distanceText: {
        fontSize: 14,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },
    locationVicinity: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24
    },
    locNames: {
        fontSize: 14,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },

    currentLocationButtonM: {
        //flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#289EF5',
        marginBottom: 10
    },
    currentLocationContentM: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentLocationIconM: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    currentLocationTextM: {
        fontSize: 14,
        color: '#289EF5',
        fontFamily: 'DMSans-SemiBold',
        //lineHeight: height * 0.024 //28
    },
    locationName: {
        marginLeft: width * 0.07,
        fontSize: 14,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    horizontalLines: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
        marginLeft: 10, // Adjust spacing as needed
        marginRight: 10, // Adjust spacing as needed
    },

    sectionTitle: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#000',
    },

    searchContainer: {
        borderRadius: 10,
        marginVertical: 10,
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 20
    },
    searchInput: {
        flex: 1,
        color: '#000',
    },
    searchTextContainer: {
        marginTop: 20,
    },
    searchText: {
        fontSize: 16,
        color: '#000',
    },
    currentLocationButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#289EF5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentLocationIcon: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    currentLocationText: {
        fontSize: 14,
        color: '#289EF5',
        fontFamily: 'DMSans-SemiBold',
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    confirmBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.18, // Adjust the height as needed
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        flexDirection: 'column', // Set flexDirection to column
    },
    distanceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Add margin bottom for spacing
    },
    buttonContainer: {
        marginHorizontal: 55,
        height: 45,
        width: '100%',
        backgroundColor: "#289EF5",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonTextU: {
        fontSize: 14,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        textAlign: 'center'
    },
    buttonText: {
        color: '#FEFCFC',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'DMSans-SemiBold',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end', // Change from 'center' to 'flex-end'
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        width: width,
        maxHeight: height * 0.85,
        flex: 1
    },
    modalHeaderText: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24,
        //marginLeft: 10,

    },
    modalButton: {
        backgroundColor: '#289EF5',
        marginHorizontal: 55,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,

    },
    inputContainerWithLinks: {
        paddingHorizontal: 10,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center', // Adjust alignment as per your requirement
    },
    inputContainer: {
        flex: 1,
        alignItems: 'flex-start', // Align children to the start of the container
    },
    label: {
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
        fontFamily: 'Mukta-Regular',
    },
    uptoText: {
        color: '#979797',
        fontSize: 14,
        fontFamily: 'Mukta-Regula4',
        marginLeft: 10,
        //marginBottom: 10
    },
    requiredIndicator: {
        color: 'red', // Change the color as needed
        fontSize: 14,
        fontFamily: 'Mukta-Regula4',
        marginLeft: 5,
    },
    inputContainerLinks: {
        borderColor: '#979797',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        height: height * 0.06,
        width: width * 0.89,
        marginBottom: 15,
        justifyContent: 'center',
    },
    inputContainerLink: {
        borderColor: '#979797',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        height: height * 0.06,
        marginBottom: 15,
        justifyContent: 'center',
    },
    inputs: {
        paddingHorizontal: 15,
        color: '#000',
    },

    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%', // Adjust the width as needed
        marginVertical: 10,
    },
    wrapT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    backContainer: {
        height: 16,
        width: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    backContainer1: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default MapScreen;
