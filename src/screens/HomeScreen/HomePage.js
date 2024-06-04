/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Dimensions, ScrollView, ToastAndroid, PermissionsAndroid, PixelRatio, Platform, FlatList } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import commonStyles from '../../components/CommonStyles';
import CustomPopup from '../../components/CustomPopup';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import Animation from '../../components/Loader';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';
import AlertPopup from '../../components/AlertPopup';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

  // const [modalVisible, setModalVisible] = useState(false);
  // const [activeItem, setActiveItem] = useState('My Account');

  const [showPopup, setShowPopup] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const SCROLL_TRIGGER_POINT = 0.2; // 20%



  const [activeIndex, setActiveIndex] = useState(0);

  // const images = [
  //   require('../../../assets/img/BannerHome.jpg'),
  //   require('../../../assets/img/BannerHome.jpg'),
  //   require('../../../assets/img/BannerHome.jpg'),
  // ];

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/gethomebanner1-ax.php');
        const data = await response.json();
        if (data && data.code === 1) {
          setImages(data.data.map(item => item.banner));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const [images2, setImages2] = useState([]);

  useEffect(() => {
    const fetchImages2 = async () => {
      try {
        const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/gethomebanner2-ax.php');
        const data = await response.json();
        if (data && data.code === 1) {
          setImages2(data.data.map(item => item.banner));
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages2();
  }, []);

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

  const [activeItem, setActiveItem] = useState('');
  const [defaultName, setDefaultName] = useState({ name: '', profile_pic: '' });
  const [profilePic, setProfilePic] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.POST_NOTIFICATIONS);
    return result;
  };

  const requestPermission = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const requestResult = await requestNotificationPermission();
      if (requestResult !== RESULTS.GRANTED) {
        requestNotificationPermission();
        console.log('Permission not granted');
      }
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    // Fetch the selected profile picture URL from AsyncStorage when the component mounts
    const fetchProfilePic = async () => {
      const pic = await AsyncStorage.getItem('selected_profile_pic');
      setProfilePic(pic);
    };

    // Fetch the default name and set activeItem to "My Account" by default
    const fetchDefaultName = async () => {
      const name = await AsyncStorage.getItem('selected_name');
      setDefaultName({ name });
      setActiveItem(name);
    };

    fetchProfilePic();
    fetchDefaultName();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      // fetchCompletionData();
      fetchPersonalProfileCount();
      fetchClinicProfileCount();
      fetchOfficeProfileCount();
    }, [fetchClinicProfileCount, fetchOfficeProfileCount, fetchPersonalProfileCount])
  );

  const fetchData = async () => {
    try {
      const pr_id = await AsyncStorage.getItem('pr_id');
      const id = parseInt(pr_id);

      const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getvic-ax.php?prid=${id}`);
      const data = await response.json();
      console.log(data.data);
      await AsyncStorage.setItem('selected_id', data.data.id.toString());
      await AsyncStorage.setItem('selected_name', data.data.name);
      await AsyncStorage.setItem('selected_type', 'My Account');
      await AsyncStorage.setItem('selected_profile_accidty', '1');
      await AsyncStorage.setItem('pr_ty_id', data.data.pr_ty_id); 
      await AsyncStorage.setItem('selected_profile_pic', data.data.profile_pic || '');
      setDefaultName({ name: data.data.name, profile_pic: data.data.profile_pic, id:data.data.id });
      setActiveItem(data.data.name);
    } catch (error) {
      console.error('Error fetching default name:', error);
    }
  };

  const scrollViewRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {



        const currentOffset = scrollViewRef.current.contentOffset;
        if (currentOffset) {
          scrollViewRef.current.scrollTo({
            
            x: currentOffset.x + width,
            animated: true,
          });
        }
      }
    }, 3000); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

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

  // const officeData = [
  //   {
  //     id: 1,
  //     name: 'Abhishek More',
  //     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', // URL to the image of the office
  //     // Other properties specific to each office
  //   },
  //   {
  //     id: 2,
  //     name: 'Mitali',
  //     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
  //     // Other properties specific to each office
  //   },
  //   // Add more office objects as needed
  // ];

//   const clinicData = [
//     {
//       id: 1,
//       name: 'Bhaskar Medical Dental',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', // URL to the image of the office
//       // Other properties specific to each office
//     },
// ];

  const [clinicData, setClinicData] = useState([]); // State to hold clinic data

  useEffect(() => {
    // Fetch clinic data from API
    const fetchClinicData = async () => {
      try {

        const pr_id = await AsyncStorage.getItem('pr_id');
        // Parse pr_id to an integer
        const id = parseInt(pr_id);
        // Make GET request to your API endpoint that returns clinic data
        const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getcliniclist-ax.php?pr_id=${id}`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
        // Assuming response.data contains an array of clinic objects
        setClinicData(response.data.data);
        //console.log(clinicData);
        //console.log(clinicData);
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    };

    // Call fetchClinicData when component mounts
    fetchClinicData();
  }, [clinicData]); // Include clinicData in the dependency array

  const [officeData, setOfficeData] = useState([]); // State to hold clinic data

  useEffect(() => {
    // Fetch clinic data from API
    const fetchOfficeData = async () => {
      try {

        const pr_id = await AsyncStorage.getItem('pr_id');
        // Parse pr_id to an integer
        const id = parseInt(pr_id);
        // Make GET request to your API endpoint that returns clinic data
        const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getofficelist-ax.php?pr_id=${id}`); // Replace YOUR_API_ENDPOINT with your actual API endpoint
        // Assuming response.data contains an array of clinic objects
        setOfficeData(response.data.data);
        //console.log(clinicData);
        //console.log(clinicData);
      } catch (error) {
        console.error('Error fetching clinic data:', error);
      }
    };

    // Call fetchClinicData when component mounts
    fetchOfficeData();
  }, [officeData]); // Include clinicData in the dependency array


  const windowHeight = Dimensions.get('window').height;

  const [locationName, setLocationName] = useState('Mumbai, Maharashtra');

  const [isLoading, setIsLoading] = useState(true);

  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const [selectedItem, setSelectedItem] = useState({
    name: '',
    profilePic: '',
    type: ''
  });

  // const handleItemSelection = async (name, profilePic) => {
  //   setActiveItem(name);
  //   setProfilePic(profilePic);
  //   setModalVisible(false);
  //   // Save display_id in AsyncStorage
  //   await AsyncStorage.setItem('display_id', name); // Assuming display_id is the ID you want to save
  //   try {
  //     const storedDisplayId = await AsyncStorage.getItem('display_id');
  //     console.log('Value stored in display_id:', storedDisplayId);
  //   } catch (error) {
  //     console.error('Error retrieving value from AsyncStorage:', error);
  //   }
  // };

  const handleItemSelection = async (name, profilePic, type, id) => {
    setSelectedItem({ name, profilePic, type });
    setModalVisible(false);
    setActiveItem(name);
    setProfilePic(profilePic);

    switch (type) {
      case 'My Account':
        await AsyncStorage.setItem('selected_id', id.toString());
        await AsyncStorage.setItem('selected_name', name);
        await AsyncStorage.setItem('selected_type', type);
        await AsyncStorage.setItem('selected_profile_accidty', '1');
        await AsyncStorage.setItem('selected_profile_pic', profilePic || ''); // Save profile pic URL, or empty string if it's null
        console.log('Selected My Account:', name, profilePic, type); // Log the selected value
        await fetchPersonalProfileCount(id);
        break;
      case 'Clinic Account':
        await AsyncStorage.setItem('selected_id', id.toString());
        await AsyncStorage.setItem('selected_name', name);
        await AsyncStorage.setItem('selected_type', type);
        await AsyncStorage.setItem('selected_profile_accidty', '2');
        await AsyncStorage.setItem('selected_profile_pic', profilePic || ''); // Save profile pic URL, or empty string if it's null
        console.log('Selected Clinic Account:', name, profilePic, type); // Log the selected value
        await fetchClinicProfileCount(id);
        break;
      case 'Office Account':
        await AsyncStorage.setItem('selected_id', id.toString());
        await AsyncStorage.setItem('selected_name', name);
        await AsyncStorage.setItem('selected_type', type);
        await AsyncStorage.setItem('selected_profile_accidty', '3');
        await AsyncStorage.setItem('selected_profile_pic', profilePic || ''); // Save profile pic URL, or empty string if it's null
        console.log('Selected Office Account:', name, profilePic, type); // Log the selected value
        await fetchOfficeProfileCount(id);
        break;
      default:
        break;
    }
  };



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
        width: width - 32,
        height: (width - 32) * aspectRatio, // Dynamically calculate height based on aspect ratio
      };
      return updatedDimensions;
    });
  };
  // const handleImageLoad = (event, index) => {
  //   const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
  //   const aspectRatio = imgHeight / imgWidth;
  //   setImageDimensions(prevState => {
  //     const updatedDimensions = [...prevState];
  //     updatedDimensions[index] = {
  //       width: width - 32,
  //       height: (width) * aspectRatio,
  //     };
  //     return updatedDimensions;
  //   });
  // };

  const [completionData, setCompletionData] = useState(null);

  useEffect(() => {
    //fetchCompletionData();
    fetchPersonalProfileCount();
    fetchClinicProfileCount();
    fetchOfficeProfileCount();
  }, []);

  const fetchPersonalProfileCount= async (id) => {
    try {
      const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersprofilecount-ax.php?pr_id=${id}`);
      const json = await response.json();
      if (json.code === 1) {
        setCompletionData(json.data);
        console.log('Personal Profile Completion Data:', completionData);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching personal profile completion data:', error);
      // Handle error
    }
  };

  const fetchClinicProfileCount = async (id) => {
    try {
      const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getclprofilecount-ax.php?cl_id=${id}`);
      const json = await response.json();
      if (json.code === 1) {
        setCompletionData(json.data);
        console.log('Clinic Profile Completion Data:', completionData);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching clinic profile completion data:', error);
      // Handle error
    }
  };

  const fetchOfficeProfileCount = async (id) => {
    try {
      const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getoffprofilecount-ax.php?off_id=${id}`);
      const json = await response.json();
      if (json.code === 1) {
        setCompletionData(json.data);
        console.log('Office Profile Completion Data:', completionData);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching office profile completion data:', error);
      // Handle error
    }
  };

  // const fetchCompletionData = async () => {
  //   try {

  //     const pr_id = await AsyncStorage.getItem('pr_id');
  //     // Parse pr_id to an integer
  //     const id = parseInt(pr_id);
      
  //     const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersprofilecount-ax.php?pr_id=${id}`);
  //     const json = await response.json();
  //     if (json.code === 1) {
  //       setCompletionData(json.data);
  //       console.log('completionData', completionData);
  //     } else {
  //       // Handle error
  //     }
  //   } catch (error) {
  //     // Handle error
  //     console.error(error);
  //   }
  // };

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

  const [specialtiesData, setSpecialtiesData] = useState([]);

  useEffect(() => {
    fetchSpecialitiesData();
  }, []);

  const fetchSpecialitiesData = async () => {
    try {
      const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getspeclist-ax.php');
      const data = await response.json();
      const storedId = await AsyncStorage.getItem('pr_ty_id');
      console.log('data', data)
      const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
      setSpecialtiesData(data.data);
      console.log('specialtiesData', data.data)
    } catch (error) {
      console.error('Error fetching key forte data:', error);
    }
  };

  const navigateToScreen = (id) => {
    if (!completionData || !completionData.gotosteps) return;

    const gotosteps = parseFloat(completionData.gotosteps);
    let screenName = '';

    switch (selectedItem.type) {
      case 'My Account':
        if (gotosteps >= 2 && gotosteps < 3) {
          screenName = 'ProfileCompletion2';
        } else if (gotosteps >= 3 && gotosteps < 4) {
          screenName = 'NDProfileCompletion3';
        } else if (gotosteps >= 4 && gotosteps < 5) {
          screenName = 'ProfileCompletion4';
        } else if (gotosteps >= 5 && gotosteps < 6) {
          screenName = 'ProfileCompletion5';
        } else if (gotosteps >= 6 && gotosteps < 7) {
          screenName = 'ProfileCompletion6';
        } else if (gotosteps >= 7 && gotosteps < 8) {
          screenName = 'ProfileCompletion7';
        } else if (gotosteps >= 8 && gotosteps < 9) {
          screenName = 'ProfileCompletion8';
        }
        break;
      case 'Clinic Account':
        if (gotosteps >= 2 && gotosteps < 3) {
          screenName = 'ClinicProfileCompletion2';
        } else if (gotosteps >= 3 && gotosteps < 4) {
          screenName = 'ClinicProfileCompletion3';
        } else if (gotosteps >= 4 && gotosteps < 5) {
          screenName = 'ClinicProfileCompletion4';
        } else if (gotosteps >= 5 && gotosteps < 6) {
          screenName = 'ClinicProfileCompletion5';
        } else if (gotosteps >= 6 && gotosteps < 7) {
          screenName = 'ClinicProfileCompletion6';
        } else if (gotosteps >= 7 && gotosteps < 8) {
          screenName = 'ClinicProfileCompletion7';
        } else if (gotosteps >= 8 && gotosteps < 9) {
          screenName = 'ClinicProfileCompletion8';
        }
        break;
      case 'Office Account':
        if (gotosteps >= 2 && gotosteps < 3) {
          screenName = 'OfficeProfileCompletion2';
        } else if (gotosteps >= 3 && gotosteps < 4) {
          screenName = 'OfficeProfileCompletion3';
        } else if (gotosteps >= 4 && gotosteps < 5) {
          screenName = 'OfficeProfileCompletion4';
        } else if (gotosteps >= 5 && gotosteps < 6) {
          screenName = 'OfficeProfileCompletion5';
        } else if (gotosteps >= 6 && gotosteps < 7) {
          screenName = 'OfficeProfileCompletion6';
        } else if (gotosteps >= 7 && gotosteps < 8) {
          screenName = 'OfficeProfileCompletion7';
        } else if (gotosteps >= 8 && gotosteps < 9) {
          screenName = 'OfficeProfileCompletion8';
        }
        break;
      default:
        break;
    }

    if (screenName) {
      if (selectedItem.type === 'Clinic Account') {
        // Assuming 'navigation' is defined elsewhere
        navigation.navigate(screenName, { cl_id: id });
      } 
      else if (selectedItem.type === 'Office Account') {
        // Assuming 'navigation' is defined elsewhere
        navigation.navigate(screenName, { off_id: id });
      } else {
        navigation.navigate(screenName);
      }
    }
    // if (screenName) {
    //   navigation.navigate(screenName);
    // }
  };


  // const navigateToScreen = () => {
  //   // if (!completionData || !completionData.gotosteps) return;

  //   const gotosteps = parseFloat(completionData.gotosteps);
  //   let screenName = '';

  //   if (gotosteps >= 2 && gotosteps < 3) {
  //     screenName = 'ProfileCompletion2';
  //   } else if (gotosteps >= 3 && gotosteps < 4) {
  //     screenName = 'NDProfileCompletion3';
  //   } else if (gotosteps >= 4 && gotosteps < 5) {
  //     screenName = 'ProfileCompletion4';
  //   } else if (gotosteps >= 5 && gotosteps < 6) {
  //     screenName = 'ProfileCompletion5';
  //   } else if (gotosteps >= 6 && gotosteps < 7) {
  //     screenName = 'ProfileCompletion6';
  //   } else if (gotosteps >= 7 && gotosteps < 8) {
  //     screenName = 'ProfileCompletion7';
  //   } else if (gotosteps >= 8 && gotosteps < 9) {
  //     screenName = 'ProfileCompletion8';
  //   }

  //   if (screenName) {
  //     navigation.navigate(screenName);
  //   }
  // };


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
                  source={require('../../../assets/img/notifications.png')}
                  style={commonStyles.icon}
                />

              </TouchableOpacity>
              <TouchableOpacity style={commonStyles.profileIcon} onPress={() => setModalVisible(true)}>
                    {profilePic ? (
                      <Image
                        source={{ uri: profilePic }}
                        style={styles.accountImage}
                      />
                    ) : (
                      <View style={[styles.accountImage, {
                        width: 33,
                        height: 33,
                        borderRadius: 36,
                        backgroundColor: '#E8F8FF',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }]}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>
                          {activeItem ? activeItem.charAt(0).toUpperCase() :
                            (defaultName && defaultName.name) ? defaultName.name.charAt(0).toUpperCase() : ''}
                        </Text>
                      </View>
                    )}
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
                    numberOfLines={1}
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

                  <ScrollView showsVerticalScrollIndicator={false}>
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
                      onPress={() => handleItemSelection(defaultName.name, defaultName.profile_pic, 'My Account', defaultName.id)}
                    // onPress={() => {
                    //   setActiveItem('My Account');
                    //   setModalVisible(false); // Close the modal after selecting
                    // }}
                  >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* {defaultName.profile_pic ? (
                          <Image
                            source={{ uri: defaultName.profile_pic }}
                            style={styles.accountImage}
                          />
                        ) : (
                          <View style={[styles.accountImage, {
                            width: 42,
                            height: 42,
                            borderRadius: 36,
                            backgroundColor: '#E8F8FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }]}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>
                              {defaultName.name.charAt(0).toUpperCase()}
                            </Text>
                          </View>
                        )} */}
                        {defaultName.profile_pic ? (
                          <Image
                            source={{ uri: defaultName.profile_pic }}
                            style={styles.accountImage}
                          />
                        ) : (
                          <View style={[styles.accountImage, {
                            width: 42,
                            height: 42,
                            borderRadius: 36,
                            backgroundColor: '#E8F8FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }]}>
                              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>
                              {defaultName.name ? defaultName.name.charAt(0).toUpperCase() : ''}
                            </Text>
                          </View>
                        )}

                        <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>
                          {defaultName.name}
                        </Text>
                      </View>

                    {/* Check if this is the active item, and display DotActive accordingly */}
                      {activeItem === defaultName.name ? (
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
                          // onPress={() => handleItemSelection(office.name, office.image, 'Office Account', office.id)}
                          onPress={() => {
                            if (office.status === "0") {
                              // If clinic status is 0 (Drafts), navigate to ClinicProfileCompletion with cl_id
                              navigation.navigate('OfficeProfileCompletion1', { off_id: office.off_id });
                            } else {
                              // If clinic status is 1, do something else (not specified in the provided code)
                              // You can add navigation logic or any other action here
                            }
                            handleItemSelection(office.name, office.profile_pic || '', 'Office Account', office.off_id)
                            // setActiveItem(clinic.name);
                            // setModalVisible(false); // Close the modal after selecting
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {office.status === "0" ? (
                              <View style={[styles.accountImage, {
                                width: 42,
                                height: 42,
                                borderRadius: 36,
                                backgroundColor: '#E8F8FF',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }]}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>O</Text>
                              </View>
                            ) : office.profile_pic ? (
                              <Image
                                  source={{ uri: office.profile_pic }}
                                style={styles.accountImage}
                              />
                            ) : (
                              <View style={[styles.accountImage, {
                                width: 42,
                                height: 42,
                                borderRadius: 36,
                                backgroundColor: '#E8F8FF',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }]}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>{office.name.charAt(0).toUpperCase()}</Text>
                              </View>
                            )}
                            
                            <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>
                              {office.status === "0" ? `Office (Drafts)` : office.name}
                            </Text>
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
                        <TouchableOpacity
                          key={index}
                          activeOpacity={0.8}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: height * 0.075,
                          }}
                          onPress={() => {
                            if (clinic.status === "0") {
                              // If clinic status is 0 (Drafts), navigate to ClinicProfileCompletion with cl_id
                              navigation.navigate('ClinicProfileCompletion1', { cl_id: clinic.cl_id });
                            } else {
                              // If clinic status is 1, do something else (not specified in the provided code)
                              // You can add navigation logic or any other action here
                            }
                            handleItemSelection(clinic.name, clinic.profile_pic || '', 'Clinic Account', clinic.cl_id)
                            // setActiveItem(clinic.name);
                            // setModalVisible(false); // Close the modal after selecting
                          }}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {clinic.status === "0" ? (
                              <View style={[styles.accountImage, {
                                width: 42,
                                height: 42,
                                borderRadius: 36,
                                backgroundColor: '#E8F8FF',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }]}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>C</Text>
                              </View>
                            ) : clinic.profile_pic ? (
                              <Image
                                source={{ uri: clinic.profile_pic }}
                                style={styles.accountImage}
                              />
                            ) : (
                              <View style={[styles.accountImage, {
                                width: 42,
                                height: 42,
                                borderRadius: 36,
                                backgroundColor: '#E8F8FF',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }]}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>{clinic.name.charAt(0).toUpperCase()}</Text>
                              </View>
                            )}
                            <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>
                              {clinic.status === "0" ? `Clinic (Drafts)` : clinic.name}
                            </Text>
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
                     
                      setShowPopup1(true);
                      AsyncStorage.setItem('acc_ty_id', '1');
                    }}
                  >
                    <Image
                      source={require('../../../assets/img/AddAcc.png')}
                      style={styles.accountImage}
                    />
                    <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>Create Clinic Profile</Text>
                  </TouchableOpacity>

                  <AlertPopup
                    visible={showPopup1}
                    onRequestClose={() => setShowPopup1(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={async () => {
                      try {

                        const pr_id = await AsyncStorage.getItem('pr_id');
                        const id = parseInt(pr_id);
                        console.log('pr_id',id);

                        // Make API call to fetch cl_id
                        const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqcreateclinic-ax.php?pr_id=${id}`);
                        const data = await response.json();
                        //console.log(data);

                        if (data && data.data && data.data.cl_id) {
                          // Store cl_id in AsyncStorage
                          await AsyncStorage.setItem('cl_id', String(data.data.cl_id));
                          await AsyncStorage.setItem('cl_status', String(data.data.status));
                        }

                        setShowPopup1(false);
                        navigation.navigate('ClinicProfileCompletion1', { cl_id: data.data.cl_id });

                        //navigation.navigate('ClinicProfileCompletion1');
                      } catch (error) {
                        console.error('Error fetching cl_id:', error);
                        // Handle error
                      }
                    
                      // setShowPopup1(false);
                      // AsyncStorage.setItem('acc_ty_id', '1');
                      // navigation.navigate('ClinicProfileCompletion4'); 
                      // setModalVisible(false);
                    }}
                  />
                  

                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.02 }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setShowPopup2(true);
                      AsyncStorage.setItem('acc_ty_id', '2');
                    }}>
                    <Image
                      source={require('../../../assets/img/AddAcc.png')}
                      style={styles.accountImage}
                    />
                    <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>Create Office Profile</Text>
                  </TouchableOpacity>

                    <AlertPopup
                      visible={showPopup2}
                      onRequestClose={() => setShowPopup2(false)}
                      title="Do you want to save changes?"
                      message="Do you want to create an office account?"
                      yesLabel="Yes"
                      noLabel="No"
                      onYesPress={async () => {
                        try {

                          const pr_id = await AsyncStorage.getItem('pr_id');
                          const id = parseInt(pr_id);
                          console.log('pr_id', id);

                          // Make API call to fetch cl_id
                          const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqcreateoffice-ax.php?pr_id=${id}`);
                          const data = await response.json();
                          //console.log(data);

                          if (data && data.data && data.data.off_id) {
                            // Store cl_id in AsyncStorage
                            await AsyncStorage.setItem('off_id', String(data.data.off_id));
                            await AsyncStorage.setItem('off_status', String(data.data.status));
                          }

                          setShowPopup1(false);
                          navigation.navigate('OfficeProfileCompletion1', { off_id: data.data.off_id });

                        } catch (error) {
                          console.error('Error fetching off_id:', error);
                          // Handle error
                        }

                        // setShowPopup1(false);
                        // AsyncStorage.setItem('acc_ty_id', '1');
                        // navigation.navigate('ClinicProfileCompletion4'); 
                        // setModalVisible(false);
                      }}
                    />


                  </ScrollView>

                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>

            <ScrollView style={styles.subContainer} onScroll={handleScroll} scrollEventThrottle={16}>
              <View style={styles.shadowContainer}>
                <View style={styles.headerContainer}>
                  <Text style={[commonStyles.headerText11BL]}>Hey, {activeItem || defaultName.name || ''}!</Text>
                  {/* <Text style={[commonStyles.headerText11BL]}>Hey, {defaultName.name || ''}!</Text> */}
                </View>

                {/* White box with shadow */}
                {completionData && completionData.gotosteps !== null ? (
                <View style={styles.boxContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageRow}>
                      {profilePic ? (
                        <Image
                          source={{ uri: profilePic }}
                          style={styles.accountImage}
                        />
                      ) : (
                        <View style={[styles.accountImage, {
                          width: 42,
                          height: 42,
                          borderRadius: 36,
                          backgroundColor: '#E8F8FF',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }]}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>
                            {activeItem ? activeItem.charAt(0).toUpperCase() :
                              (defaultName && defaultName.name) ? defaultName.name.charAt(0).toUpperCase() : ''}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.textColumn}>
                      <Text style={[commonStyles.headerText4BL, { marginBottom: height * 0.005 }]}>
                        {truncateText1('Complete Profile', width * 0.4, 10)}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/clock.png')} style={styles.image1} />
                        <Text style={[commonStyles.headerText5G]}>
                          {completionData && completionData.count ? `${completionData.count}% completed` : 'Completed'}
                        </Text>

                      </View>
                    </View>
                  </View>
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
                    }}
                      onPress={() => navigateToScreen(selectedItem.id)} 
                    //onPress={() => navigateToScreen()}
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
                ) : null}

                {/* <View style={styles.boxContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageRow}>
                      {profilePic ? (
                        <Image
                          source={{ uri: profilePic }}
                          style={styles.accountImage}
                        />
                      ) : (
                        <View style={[styles.accountImage, {
                          width: 42,
                          height: 42,
                          borderRadius: 36,
                          backgroundColor: '#E8F8FF',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }]}>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#289EF5' }}>
                            {activeItem ? activeItem.charAt(0).toUpperCase() :
                              (defaultName && defaultName.name) ? defaultName.name.charAt(0).toUpperCase() : ''}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.textColumn}>
                      <Text style={[commonStyles.headerText4BL, { marginBottom: height * 0.005 }]}>
                        {truncateText1('Complete Profile', width * 0.4, 10)}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/img/clock.png')} style={styles.image1} />
                        <Text style={[commonStyles.headerText5G]}>
                          {completionData && completionData.count ? `${completionData.count}% completed` : 'Completed'}
                        </Text>

                      </View>
                    </View>
                  </View>
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
                    }}
                    // onPress={() => navigation.navigate('ProfileCompletion2')}
                    onPress={() => navigateToScreen()}
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
                </View> */}

                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{ height: 'auto' }}
                  contentContainerStyle={{ paddingHorizontal: 0 }} // Adjust spacing between images
                  onMomentumScrollEnd={(event) => {
                    // If we've scrolled past the end, jump back to the start
                    if (event.nativeEvent.contentOffset.x >= (images.length - 1) * width) {
                      scrollViewRef.current.scrollTo({ x: 0, animated: false });
                    }
                  }}
                >
                  {images.map((image, index) => (
                    <View key={index} style={{ width: width - 32, height: 'auto', borderRadius: 8, overflow: 'hidden', marginBottom: 10}}>
                      <Image
                        source={{ uri: image }}
                        style={[{ width: '100%', aspectRatio: 16 / 6 }, imageDimensions[index]]}
                        resizeMode="cover"
                        onLoad={event => handleImageLoad(event, index)}
                      />
                    </View>
                  ))}
                </ScrollView>

{/* 
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
                </ScrollView> */}
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
                      <Image source={require('../../../assets/img/Home-My-Connection.png')} style={styles.imageGridC} />
                    
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
                      <Image source={require('../../../assets/img/Home-Sent-Req.png')} style={styles.imageGridC} />
                      
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
                      <Image source={require('../../../assets/img/Home-Req-Pending.png')} style={styles.imageGridC} />
                    
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

                {/* <View style={{ width: width - moderateScale(32), height: 'auto', marginBottom: height * 0.015 }}>
                  <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <Image
                      source={require('../../../assets/img/BannerHome.jpg')}
                      style={imageDimensions}
                      resizeMode="cover"

                    />
                  </View>
                </View> */}

                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={{ height: 'auto' }}
                  contentContainerStyle={{ paddingHorizontal: 0 }} // Adjust spacing between images
                >
                  {images2.map((image, index) => (
                    <View key={index} style={{ width: width - 32, height: 'auto', borderRadius: 8, overflow: 'hidden',  marginBottom: 10}}>
                      <Image
                        source={{ uri: image }}
                        style={[{ width: '100%', aspectRatio: 16 / 6 }, imageDimensions[index]]}
                        resizeMode="cover"
                        onLoad={event => handleImageLoad(event, index)}
                      />
                    </View>
                  ))}
                </ScrollView>

                {/* <View style={{ width: width * 0.903, height: width * 0.36,  marginBottom: height * 0.015}}>
                  <Image
                    source={require('../../assets/img/DentalBanner.png')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View> */}

                {/* <View style={{ marginBottom: height * 0.01 }}>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Connect by Specialities</Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.buttonCommonStyles}
                      onPress={() => navigation.navigate('Explore')}
                    >
                      <Text style={styles.textCommonStyles}>Endodontist</Text>
                    </TouchableOpacity>

                 
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
                </View> */}

                <View style={{ marginBottom: height * 0.01 }}>
                  <View style={styles.headerContainer1}>
                    <Text style={[commonStyles.headerText11BL, {}]}>Connect by Specialities</Text>
                  </View>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {specialtiesData.map(specialty => (
                      <TouchableOpacity
                        key={specialty.id} // Assuming you have an id field in your data
                        activeOpacity={0.8}
                        style={styles.buttonCommonStyles}
                        onPress={() => navigation.navigate('Explore')}
                        //onPress={() => navigation.navigate('Explore', { specialtyId: specialty.id })}
                      >
                        <Text style={styles.textCommonStyles}>{specialty.speciality}</Text>
                      </TouchableOpacity>
                    ))}
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
                      onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
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
                      onPress={() => navigation.navigate('ClinicProfileCompletion6', { cl_id: 1 })}
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
                      onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
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
                      onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
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
    maxHeight: '85%',
    minHeight: 100,
    paddingBottom: 30,
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
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background blur effect
  // },
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
    paddingHorizontal: 16,
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
