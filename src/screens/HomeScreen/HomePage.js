/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Dimensions, ScrollView, ToastAndroid, PermissionsAndroid, PixelRatio, Platform, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import commonStyles from '../../components/CommonStyles';
import CustomPopup from '../../components/CustomPopup';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import Animation from '../../components/Loader';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// const responsiveFontSize = (size) => {
//   const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
//   const newSize = size * scale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };


const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const responsiveFontSize=(size) =>{
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}


const HomePage = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [initialRegion, setInitialRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('My Account');

  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const SCROLL_TRIGGER_POINT = 0.2; // 20%


  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    require('../../../assets/img/BannerHome.jpg'),
    require('../../../assets/img/BannerHome.jpg'),
    require('../../../assets/img/BannerHome.jpg'),
  ];
  const numDots = images.length;

  useEffect(() => {
    async function checkPopup() {
      try {
        const popupShown = await AsyncStorage.getItem('popupShown');
        if (!popupShown) {
          setShowPopup(true);
          setIsPopupVisible(true);
          await AsyncStorage.setItem('popupShown', 'true');
        }
      } catch (error) {
        console.error('Error checking popup:', error);
      }
    }
    checkPopup();
  }, []);

  const handleScroll = async (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const scrollPercentage = offsetY / height;

    try {
      const popupShown = await AsyncStorage.getItem('popupShown');

      if (!popupShown && scrollPercentage >= SCROLL_TRIGGER_POINT) {
        setShowPopup(true);
        setIsPopupVisible(true);

        // Set the AsyncStorage flag when triggered by scrolling
        await AsyncStorage.setItem('popupShown', 'true');
      }
    } catch (error) {
      console.error('Error checking popup:', error);
    }

    setScrollPosition(scrollPercentage);
  };


  // useEffect(() => {
  //   // Immediately show the popup when the component mounts
  //   setShowPopup(true);

  //   // Set up an interval to show the popup every 10 minutes
  //   const intervalId = setInterval(() => {
  //     setShowPopup(true);
  //   }, 10 * 60 * 10000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   if (route.params?.showPopup) {
  //     setShowPopup(true);
  //     setIsPopupVisible(true);
  //   }
  // }, [route.params?.showPopup]);

  const closeModal = () => {
    setShowPopup(false);
    setIsPopupVisible(false);
  };

  const handleContinue = () => {
    // Navigate to another screen
    navigation.navigate('ProfileCompletion2');
    closeModal(); // Close the modal
  };

  const handleSkip = () => {
    setShowPopup(false);
    setIsPopupVisible(false);
  };

  const officeData = [
    {
      id: 1,
      name: 'Abhishek More',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', // URL to the image of the office
      // Other properties specific to each office
    },
    {
      id: 2,
      name: 'Abhishek',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
      // Other properties specific to each office
    },
    // Add more office objects as needed
  ];

  const clinicData = [
    {
      id: 1,
      name: 'Bhaskar Medical Dental',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', // URL to the image of the office
      // Other properties specific to each office
    },
];

  const getModalHeight = () => {
    const buttonHeight = 50; // Height of each button
    const headingHeight = 30; // Height of each heading
    const cardHeight = 180; // Height of each card

    const buttonsCount = 4; // Number of buttons
    const officeCardsCount = officeData.length;
    const clinicCardsCount = clinicData.length;

    const maxModalHeightPercentage = 0.8; // Adjust as needed
    const minModalHeightPercentage = 0.3; // Adjust as needed

    const totalHeight =
      buttonHeight * buttonsCount +
      headingHeight * 2 + // Two headings for office and clinic
      cardHeight * (officeCardsCount + clinicCardsCount);

    const maxModalHeight = Math.min(totalHeight, windowHeight * maxModalHeightPercentage);
    const minModalHeight = Math.max(windowHeight * minModalHeightPercentage, totalHeight + 20); // 20 is the additional margin

    return { minModalHeight, maxModalHeight };
  };

  const windowHeight = Dimensions.get('window').height;

  const [locationName, setLocationName] = useState('Mumbai, Maharashtra');

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

  const handleSearch = (query) => {
    // Handle the search logic based on the query
    setSearchQuery(query);
  };

  const handleLocationPress = async () => {
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //   );
    //   console.log('Location Permission Granted:', granted);

    //   if (granted) {
    //     Geolocation.getCurrentPosition(
    //       async (position) => {
    //         console.log('Position:', position);
    //         const { latitude, longitude } = position.coords;
    //         console.log('Latitude:', latitude);
    //         console.log('Longitude:', longitude);
    //         // Store the current location in AsyncStorage
    //         await AsyncStorage.setItem('latitude', String(latitude));
    //         await AsyncStorage.setItem('longitude', String(longitude));
    //         // Update initialRegion and markerPosition state with current location
    //         setInitialRegion({
    //           latitude: parseFloat(latitude),
    //           longitude: parseFloat(longitude),
    //           latitudeDelta: 0.0922,
    //           longitudeDelta: 0.0421,
    //         });
    //         setMarkerPosition({
    //           latitude: parseFloat(latitude),
    //           longitude: parseFloat(longitude),
    //         });
    //         setIsLoading(false);
    //         // Navigate to the MapScreen
    //         navigation.navigate('MapScreen');
    //       },
    //       (error) => {
    //         console.log('Error:', error);
    //         setIsLoading(false);
    //         ToastAndroid.show('Error getting location', ToastAndroid.SHORT);
    //         console.error(error);
    //       }
    //     );
    //   } else {
    //     setIsLoading(false);
    //     ToastAndroid.show('Location permission denied', ToastAndroid.SHORT);
    //     navigation.navigate('MapScreen');
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    //   console.error('Error requesting location permission:', err);
    // }
  };


  const reverseGeocode = (coordinates) => {
    // Perform reverse geocoding to get the location name based on coordinates
    // Replace the following with your reverse geocoding implementation
    const locationName = `Location at (${coordinates.latitude}, ${coordinates.longitude})`;

    // Update the state with the selected location name
    setLocationName(locationName);
  };

  const truncateText = (text, maxCharacters) => {
    if (text.length <= maxCharacters) {
      return text;
    }
    return text.slice(0, maxCharacters) + '...';
  };

  const [imageDimensions, setImageDimensions] = useState([]);

  const handleImageLoad = (event, index) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    const aspectRatio = imgHeight / imgWidth;
    setImageDimensions(prevState => {
      const updatedDimensions = [...prevState];
      updatedDimensions[index] = {
        width: '100%',
        height: (width) * aspectRatio,
      };
      return updatedDimensions;
    });
  };

    const truncateText1 = (text, maxWidth, fontSize) => {
        const ellipsisWidth = 30; // Width of the ellipsis
        const maxTextWidth = maxWidth - ellipsisWidth;

        if (!text) {
            return '';
        }

        let width = 0;
        let truncatedText1 = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = measureCharWidth(char, fontSize);

            if (width + charWidth <= maxTextWidth) {
                width += charWidth;
                truncatedText1 += char;
            } else {
                break;
            }
        }

        if (text.length > truncatedText1.length) {
            truncatedText1 += '...';
        }

        return truncatedText1;
    };

    const measureCharWidth = (char, fontSize) => {
        // Assuming a constant width for each character for simplicity
        // You may want to use a more accurate method for precise measurement
        const charWidth = fontSize * 0.6; // Adjust this factor based on your font and styling
        return charWidth;
    };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      {isLoading ? (
        <Animation />
      ) : (

      <View style={styles.container}>
        <View style={styles.topView}>

 <View style={styles.locationProfileNotificationRow}>
          <View style={styles.locationContainer}>
           <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLocationPress} activeOpacity={0.8}>
                    <View style={[commonStyles.locIcon, styles.locIconBorder]}>
                  <Image
                    source={require('../../../assets/img/locationW.png')}
                    style={commonStyles.icon}
                  />

                </View>

               
                    <View style={styles.locationContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={[commonStyles.headerText4W, { marginLeft:  moderateScale(8), }]}>Current location</Text>
                        <View style={[commonStyles.locIcon, styles.centered]}>
                          <Image
                            source={require('../../../assets/img/dropdown.png')}
                            style={commonStyles.icon}
                          />
                        </View>
                      </View>
                                          <Text style={[commonStyles.headerText5W, { marginLeft: moderateScale(8), marginTop: moderateScale(2) }]}>{truncateText(locationName, 20)}</Text>
                    </View>

          </TouchableOpacity>

              {/* <Text style={styles.locationTextSub}>{truncateText(locationName, 20)}</Text> */}
          </View>

          <View style={styles.profileNotificationContainer}>
              <TouchableOpacity style={commonStyles.notificationIcon}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Notifications')}>
                <Image
                  source={require('../../../assets/img/notificationW.png')}
                  style={commonStyles.icon}
                />

              </TouchableOpacity>
              <TouchableOpacity style={commonStyles.profileIcon} onPress={() => setModalVisible(true)}>
                <Image
                  source={require('../../../assets/img/ProfileHome.png')}
                  style={commonStyles.icon}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity style={commonStyles.profileIcon} onPress={() => setModalVisible(true)}>
                <SvgXml
                  xml={ProfileHomeSvg} // Pass the imported XML content here
                  width="100%"
                  height="100%"
                  style={commonStyles.icon}
                />
              </TouchableOpacity> */}


          </View>
      </View>
          <View style={commonStyles.searchBarContainer}>
            <View style={commonStyles.leftContainer}>
              <View style={commonStyles.backContainerSearch}>
                <Image
                  source={require('../../../assets/img/Search.png')}
                  style={commonStyles.icon}
                />
              </View>
              <TextInput
                style={commonStyles.searchInput}
                placeholder="Search"
                placeholderTextColor="grey"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            <TouchableOpacity style={commonStyles.backContainerFilter}
              onPress={() => navigation.navigate('FiltersScreen')}>
              <Image
                source={require('../../../assets/img/filter.png')}
                style={commonStyles.icon}
              />
            </TouchableOpacity>

          </View>
        </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={styles.modalContainer}
                onPress={() => setModalVisible(false)}
              >
                <ScrollView style={styles.modalContent}>
                  <View style={styles.horizontalLine}></View>

                  <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.005 }]}>My Account</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      height: height * 0.075,
                    }}
                    onPress={() => {
                      setActiveItem('My Account');
                      setModalVisible(false); // Close the modal after selecting
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww' }} // Assuming image is a URI
                        style={styles.accountImage}
                      />
                      <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>Dr. Mridula Ramankrishna</Text>
                    </View>
                    {/* Check if this is the active item, and display DotActive accordingly */}
                    {activeItem === 'My Account' ? (
                      <View style={commonStyles.activeIcon}>
                        <Image
                          source={require('../../../assets/img/DotActive.png')}
                          style={commonStyles.icon}
                        />
                      </View>
                    ) : (
                      <View style={commonStyles.activeIcon}>
                        <Image
                          source={require('../../../assets/img/Active.png')}
                          style={commonStyles.icon}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={{ height: 1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 5 }} />

                  {officeData.length > 0 && (
                    <>
                      <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.005 }]}>Office Account</Text>
                      {officeData.map((office, index) => (
                        <TouchableOpacity key={index}
                          activeOpacity={0.8}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: height * 0.075,
                          }}
                          onPress={() => {
                            setActiveItem(office.name);
                            setModalVisible(false); // Close the modal after selecting
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={{ uri: office.image }} // Assuming image is a URI
                              style={styles.accountImage}
                            />
                            <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>{office.name}</Text>
                          </View>
                          {/* Check if this is the active item, and display DotActive accordingly */}
                          {activeItem === office.name ? (
                            <View style={commonStyles.activeIcon}>
                              <Image
                                source={require('../../../assets/img/DotActive.png')}
                                style={commonStyles.icon}
                              />
                            </View>
                          ) : (
                            <View style={commonStyles.activeIcon}>
                              <Image
                                source={require('../../../assets/img/Active.png')}
                                style={commonStyles.icon}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                      {officeData.length > 0 && <View style={{ height: 1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 5 }} />}
                    </>
                  )}

                  {clinicData.length > 0 && (
                    <>
                      <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.005 }]}>Clinic Account</Text>
                      {clinicData.map((clinic, index) => (
                        <TouchableOpacity key={index}
                          activeOpacity={0.8}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: height * 0.075,
                          }}
                          onPress={() => {
                            setActiveItem(clinic.name);
                            setModalVisible(false); // Close the modal after selecting
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={{ uri: clinic.image }} // Assuming image is a URI
                              style={styles.accountImage}
                            />
                            <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>{clinic.name}</Text>
                          </View>
                          {/* Check if this is the active item, and display DotActive accordingly */}
                          {activeItem === clinic.name ? (
                            <View style={commonStyles.activeIcon}>
                              <Image
                                source={require('../../../assets/img/DotActive.png')}
                                style={commonStyles.icon}
                              />
                            </View>
                          ) : (
                            <View style={commonStyles.activeIcon}>
                              <Image
                                source={require('../../../assets/img/Active.png')}
                                style={commonStyles.icon}
                              />
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                      {clinicData.length > 0 && <View style={{ height: 1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 5 }} />}
                    </>
                  )}

                  {/* Buttons */}
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: height * 0.02 }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('ClinicProfileCompletion1'); // Navigate to the desired screen
                    }}
                  >
                    <Image
                      source={require('../../../assets/img/AddAcc.png')}
                      style={styles.accountImage}
                    />
                    <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>Create Clinic Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.02 }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('OfficeProfileCompletion1'); // Navigate to the desired screen
                    }}>
                    <Image
                      source={require('../../../assets/img/AddAcc.png')}
                      style={styles.accountImage}
                    />
                    <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>Create Office Profile</Text>
                  </TouchableOpacity>


                </ScrollView>
              </TouchableOpacity>
            </Modal>

            <ScrollView style={styles.subContainer} onScroll={handleScroll} scrollEventThrottle={16}>
              <View style={styles.shadowContainer}>
                <View style={styles.headerContainer}>
                  <Text style={[commonStyles.headerText11BL, { }]}>Hey, Neha Parmar!</Text>
                </View>

                {/* White box with shadow */}
                <View style={styles.boxContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageRow}>
                      <Image source={require('../../../assets/img/ProfilePercent.png')} style={styles.image} />
                      {/* Add more images as needed */}
                    </View>
                    <View style={styles.textColumn}>
                                          <Text style={[commonStyles.headerText4BL, { marginBottom: height * 0.005 }]}>{truncateText1('Complete Profile', width * 0.4, 10)}</Text>
                                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/clock.png')} style={styles.image1} />
                        <Text style={[commonStyles.headerText5G]}>75% completed</Text>
                      </View>
                      {/* <Text style={[commonStyles.headerText5G]}>75 % completed</Text> */}
                    </View>
                  </View>
                  {/* Button */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: width * 0.02,
                      borderRadius: 24,
                      borderColor: '#289EF5',
                      borderWidth: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      position: 'absolute',
                        right: width * 0.02,
                      //width: width * 0.25,
                    }}
                     onPress={() => navigation.navigate('ProfileCompletion2')}
                  >
                    <Text style={{
                      fontSize: responsiveFontSize(14),
                      alignSelf: 'center',
                      color: '#289EF5',
                      paddingHorizontal: 5,
                      textAlign: 'center',
                      fontFamily: 'DMSans-Medium',
                      lineHeight: height * 0.028 //28
                    }}>Complete</Text>
                  </TouchableOpacity>
                </View>


                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{ height: 'auto', }}// Set height to 'auto' to allow dynamic height
                >
                  {images.map((image, index) => (
                    <View key={index} style={{ width: width - moderateScale(32),  height: 'auto' }}>
                      <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                        <Image
                          source={image}
                          style={imageDimensions[index]}
                          resizeMode="cover"
                          onLoad={event => handleImageLoad(event, index)}
                        />
                      </View>
                    </View>
                  ))}
                </ScrollView>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                  {images.map((_, index) => (
                    <View
                      key={index}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: activeIndex === index ? '#000' : '#CCC',
                        marginHorizontal: 4,
                      }}
                    />
                  ))}
                </View> */}


                {/* <View style={styles.eventContainer}>
                  <View style={styles.imageContainer2}>
                    <Image
                      source={require('../../../assets/img/DentalBanner.png')}
                      //source={require('../../../assets/img/EventBanner.png')}
                      style={styles.eventImage}
                      resizeMode="contain"
                    />
                  </View>
                </View> */}

                <View>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Explore</Text>
                    {/* <Text style={[commonStyles.headerText4G]}>See All</Text> */}
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Explore')}
                      activeOpacity={0.8}>
                      <Text style={[commonStyles.headerText5G]}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.boxContainerE}
                      onPress={() => navigation.navigate('Explore', { initialTab: 0 })}
                      activeOpacity={0.8}
                     >
                      <Image source={require('../../../assets/img/ExploreHome.png')} style={styles.imageGrid} />
                      <Text style={[commonStyles.headerText3BL, {
                        marginTop: height * 0.005,
                      }]}
                        numberOfLines={1} ellipsizeMode="tail">Professionals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContainerE} 
                      onPress={() => navigation.navigate('Explore', { initialTab: 1 })}
                      activeOpacity={0.8}
                    >
                      <Image source={require('../../../assets/img/ExploreHome4.png')} style={styles.imageGrid} />
                      <Text style={[commonStyles.headerText3BL, {
                        marginTop: height * 0.005,
                      }]}
                        numberOfLines={1} ellipsizeMode="tail">Clinics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContainerE} 
                      onPress={() => navigation.navigate('Explore', { initialTab: 2 })}
                      activeOpacity={0.8}
                    >
                      <Image source={require('../../../assets/img/ExploreHome2.png')} style={styles.imageGrid} />
                      <Text style={[commonStyles.headerText3BL, {
                        marginTop: height * 0.005,
                      }]}
                        numberOfLines={1} ellipsizeMode="tail">Office</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContainerE} 
                      onPress={() => navigation.navigate('Explore', { initialTab: 3 })}
                      activeOpacity={0.8}
                    >
                      <Image source={require('../../../assets/img/ExploreHome3.png')} style={styles.imageGrid} />
                      <Text style={[commonStyles.headerText3BL, {
                        marginTop: height * 0.005,
                      }]}
                        numberOfLines={1} ellipsizeMode="tail">Others</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                
                
                <View>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Manage Connections</Text>
                    {/* <Text style={[commonStyles.headerText4G]}>See All</Text> */}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Connections')}
                      activeOpacity={0.8}>
                      <Text style={[commonStyles.headerText5G]}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.boxContainer1}
                      onPress={() => navigation.navigate('MyConnections')}
                      activeOpacity={0.8}
                    >
                      <Text style={[commonStyles.headerText3BL, {
                        marginBottom: height * 0.012,
                        textAlign: 'center'
                      }]}
                        numberOfLines={2} ellipsizeMode="tail">My{"\n"}Connection</Text>
                      <Image source={require('../../../assets/img/ManageC.png')} style={styles.imageGridC} />
                    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContainer1}
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('SentReq')}
                    >
                      <Text style={[commonStyles.headerText3BL, {
                        marginBottom: height * 0.012,
                        textAlign: 'center'
                      }]}
                        numberOfLines={2} ellipsizeMode="tail">Sent{"\n"}Requests</Text>
                      <Image source={require('../../../assets/img/ManageC.png')} style={styles.imageGridC} />
                      
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxContainer1}
                      onPress={() => navigation.navigate('ReceivedReq')}
                      activeOpacity={0.8}
                    >
                      <Text style={[commonStyles.headerText3BL, {
                        marginBottom: height * 0.012,
                        textAlign: 'center'
                      }]}
                        numberOfLines={2} ellipsizeMode="tail">Pending{"\n"}Requests</Text>
                      <Image source={require('../../../assets/img/ManageC.png')} style={styles.imageGridC} />
                    
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.boxContainer1}
                      onPress={() => navigation.navigate('BlockAcc')}
                      activeOpacity={0.8}
                    >
                      <Image source={require('../../assets/img/Dummy.png')} style={styles.imageGrid} />
                      <Text style={[commonStyles.headerText3BL, {
                        marginTop: height * 0.005,
                        textAlign: 'center'
                      }]}
                        numberOfLines={2} ellipsizeMode="tail">Blocked{"\n"}Accounts</Text>
                    </TouchableOpacity> */}
                  </View>
                </View>

                <View style={{ width: width - moderateScale(32), height: 'auto', marginBottom: height * 0.015 }}>
                  <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <Image
                      source={require('../../../assets/img/BannerHome.jpg')}
                      style={imageDimensions}
                      resizeMode="cover"

                    />
                  </View>
                </View>

                {/* <View style={{ width: width * 0.903, height: width * 0.36,  marginBottom: height * 0.015}}>
                  <Image
                    source={require('../../assets/img/DentalBanner.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View> */}

                <View style={{ marginBottom: height * 0.01 }}>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Connect by Specialities</Text>
                    {/* <Text style={[commonStyles.headerText4G]}>See All</Text> */}
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {/* Button 1 */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Endodontist</Text>
                    </TouchableOpacity>

                    {/* Button 2 */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Orthodontist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Prosthodontist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Orofacial Pain (OFP)</Text>
                    </TouchableOpacity>


                    {/* Button 2 */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Orofacial Pain (OFP)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Oral Medicine</Text>
                    </TouchableOpacity>

                    {/* Button 2 */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Prosthodontist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Dentist Dnt</Text>
                    </TouchableOpacity>

                    
                    
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Oral and Maxillofacial Radiologist</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Featured Professionals</Text>
                    {/* <Text style={[commonStyles.headerText4G]}>See All</Text> */}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Explore')}
                      activeOpacity={0.8}>
                      <Text style={[commonStyles.headerText5G]}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.gridContainerS}
                  >
                    {/* Box 1 */}
                    <TouchableOpacity
                      style={styles.boxContainerS}
                      onPress={() => navigation.navigate('ProfileScreen')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.contentContainer}>
                        <Image
                          source={require('../../../assets/img/DummyProfile.png')}
                          style={styles.imageGridS}
                        />
                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                          <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                          <Text style={[commonStyles.headerText3BL, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                          <Text style={[commonStyles.headerText3G, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Vikhroli</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Box 2 */}
                    <TouchableOpacity
                      style={styles.boxContainerS}
                      onPress={() => navigation.navigate('ProfileScreen')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.contentContainer}>
                        <Image
                          source={require('../../../assets/img/DummyProfile.png')}
                          style={styles.imageGridS}
                        />
                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                          <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                          <Text style={[commonStyles.headerText3BL, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                          <Text style={[commonStyles.headerText3G, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Vikhroli</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Box 3 */}
                    <TouchableOpacity
                      style={styles.boxContainerS}
                      onPress={() => navigation.navigate('ProfileScreen')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.contentContainer}>
                        <Image
                          source={require('../../../assets/img/DummyProfile.png')}
                          style={styles.imageGridS}
                        />
                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                          <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                          <Text style={[commonStyles.headerText3BL, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                          <Text style={[commonStyles.headerText3G, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Vikhroli</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Box 4 */}
                    <TouchableOpacity
                      style={styles.boxContainerS}
                      onPress={() => navigation.navigate('ProfileScreen')}
                      activeOpacity={0.8}
                    >
                      <View style={styles.contentContainer}>
                        <Image
                          source={require('../../../assets/img/DummyProfile.png')}
                          style={styles.imageGridS}
                        />
                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                          <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                          <Text style={[commonStyles.headerText3BL, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                          <Text style={[commonStyles.headerText3G, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Vikhroli</Text>
                        </View>
                      </View>
                    </TouchableOpacity>

                  </ScrollView>

                </View>

                              <View style={{ marginBottom: moderateScale(200), }}></View> 
                           
              </View>
                        
            </ScrollView>

            {isPopupVisible && (
              <CustomPopup
                visible={isPopupVisible}
                onClose={closeModal}
                onContinue={handleContinue}
                onSkip={handleSkip}
              />
            )}

      </View>

      )}

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 10, // Adjust the border top radius as needed
    overflow: 'hidden', // Ensure content inside the border radius is clipped
  },
  imageGridC: {
    width: 42,
    height: 47,
    resizeMode: 'cover',
  },
  imageGrid:{
    width: 64,
    height: 64,
    resizeMode: 'cover',
  },
  imageContainer2: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  eventContainer: {
    width: '100%',
    borderRadius: 10,
    borderColor: 'black',
    overflow: 'hidden',
    //marginTop: 5,
    aspectRatio: 4 / 3,
  },
  buttonCommonStyles : {
    height: height * 0.04,
    backgroundColor: '#E8F8FF',
    opacity: 1,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: width * 0.012,
    marginRight: width * 0.02,
    paddingHorizontal: width * 0.015,
  },
  textCommonStyles : {
    fontSize: responsiveFontSize(14),
    alignSelf: 'center',
    color: '#289EF5',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontFamily: 'DMSans-Medium',
    lineHeight: height * 0.028, //28
  },
  locIconBorder: {
    borderWidth: 1, // Example border width
    borderColor: '#FEFCFC', // Example border color
    borderRadius: 50, // Example border radius (half of the desired width/height to create a circle)
    width: 30, // Example width to increase the size of the circle
    height: 30, // Example height to increase the size of the circle
    alignItems: 'center', // Center the image horizontally
    justifyContent: 'center', // Center the image vertically
    padding: 5
  },
  modalContent: {
    backgroundColor: '#FEFCFC',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8, // Maximum height of 50%

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
  container: {
    flexGrow: 1,
    backgroundColor: '#FEFCFC',
    //paddingBottom: height * 0.5, 
  },
  topView: {
    //flex: 0.25,
    height: 150,
    backgroundColor: '#289EF5',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  
  locationProfileNotificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileNotificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    // Define other styles for icon if needed
  },
  locationText: {
    marginLeft: 5,

    fontWeight: '400',
    color: '#FEFCFC',
    fontSize: 14,
    fontFamily: 'Mukta-Regular',
    // Define other styles for locationText if needed
  },
  locationTextSub: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FEFCFC',
    fontFamily: 'Mukta-Regular',
  },
  accountText:{
    fontSize: 21,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Mukta-SemiBold',
  },
  accountName: {
    fontSize: 21,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Mukta-Regular',
    marginLeft: 10,
  },
  accountImage: {
    width: height * 0.05,  // Adjust the width as needed
    height: height * 0.05, // Adjust the height as needed
    borderRadius: 36, // Half of width and height to create a circular shape

  },

  subContainer: {
    //marginBottom: height * 0.5, 
    paddingHorizontal: moderateScale(16),
  },
  shadowContainer: {
    flex: 1,
    //paddingTop: 20, // Adjust as needed
  },
  headerContainer: {
    marginBottom: height * 0.015,
  },
  headerContainer1: {
    marginVertical: height * 0.015,
    flexDirection: 'row',
     justifyContent: 'space-between', 
     alignItems: 'center'
  },
  headerContainerE: {
    marginTop: height * 0.015,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gridContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridContainerS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageGridS: {
    width: width * 0.35,
    height: width * 0.3
  },
  boxContainerS: {
    marginRight: 15,
    paddingBottom: width * 0.02,
    //paddingHorizontal: width * 0.025,
    backgroundColor: '#FEFCFC',
    width: width * 0.35,
    // Shadow properties
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Black with opacity 10%
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1, // Full opacity for iOS to work with shadow color
        shadowRadius: 4, // Blur radius
      },
      android: {
        elevation: 2, // Elevation for Android
      },
    }),
    // Additional styles for shadow
    borderRadius: 10,
    marginBottom: height * 0.04,
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxContainerE: {
    paddingBottom: width * 0.02,
    paddingHorizontal: width * 0.025,
    backgroundColor: 'transparent',
    width: width * 0.21,
    //marginBottom: height * 0.01,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxContainer1: {
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.025,
    backgroundColor: '#FEFCFC',
    width:width * 0.28,
    // Shadow properties
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Black with opacity 10%
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1, // Full opacity for iOS to work with shadow color
        shadowRadius: 4, // Blur radius
      },
      android: {
        elevation: 2, // Elevation for Android
      },
    }),
    // Additional styles for shadow
    borderRadius: 10,
    marginBottom: height * 0.04,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxContainer: {
    width: '100%',
    paddingVertical: width * 0.05,
    paddingHorizontal: width * 0.03,
    flexDirection: 'row',
    backgroundColor: '#FEFCFC',
    // Shadow properties
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Black with opacity 10%
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1, // Full opacity for iOS to work with shadow color
        shadowRadius: 4, // Blur radius
      },
      android: {
        elevation: 2, // Elevation for Android
      },
    }),
    // Additional styles for shadow
    borderRadius: 10,
    marginBottom: height * 0.04,
    //marginTop: height * 0.01,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageRow: {
   
    justifyContent: 'center',
  },
  image: {
    width: 52,
    height: 52,
    resizeMode: 'cover',
    borderRadius: 25, // To make it circular
  },
  image1: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
    marginRight: 5
  },
  textColumn: {
    marginLeft: 10, 
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10, // Adjust as needed
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center',
    marginTop: height* 0.015
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: width * 0.05,
    backgroundColor: 'rgba(40, 158, 245, 0.2)',
    marginHorizontal: width * 0.015,
  },

  activeDot: {
    width: 10,
    height: 10,
    borderRadius: width * 0.05,
    backgroundColor: '#289EF5',
    marginHorizontal: width * 0.015,
  },
});

export default HomePage;
