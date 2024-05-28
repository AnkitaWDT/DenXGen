/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Image, PixelRatio, Dimensions } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Contacts from 'react-native-contacts';
import Animation from '../../components/Loader';
import LottieView from 'lottie-react-native';
import { moderateScale } from 'react-native-size-matters';
import AlertPopup from '../../components/AlertPopup';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const MyConnections = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);
    const tabs = ['Professionals', 'Clinics', 'Office', 'Others'];

    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopover, setShowPopover] = useState(false);

    const data = [
        // Data for Tab 1
        [
            {
                id: 1, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 2, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
            gender: 1},
            {
                id: 3, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
},
            {
                id: 4, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 5, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
},
            {
                id: 6, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 7, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 8, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
        ],
        // Data for Tab 2
        [
            {
                id: 1, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 2, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
},
            {
                id: 3, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 4, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 5, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 6, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 2
},
            {
                id: 7, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
        ],

        // Data for Tab 3
        [
            {
                id: 1, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 2, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 3, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 4, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 5, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
        ],


        // Data for Tab 4
        [
            {
                id: 1, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1 },
            {
                id: 2, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 3, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
            {
                id: 4, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
},
            {
                id: 5, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                //image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
},
            {
                id: 6, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 2
},
            {
                id: 7, name: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
},
        ],

    ];

    const [professionals, setProfessionals] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [offices, setOffices] = useState([]);
    const [others, setOthers] = useState([]);
    const [keyAssociates, setKeyAssociates] = useState([]);

    useEffect(() => {
        fetchProfessionalsData();
        fetchClinicsData();
        fetchOfficesData();
        fetchOthersData();
        fetchKeyAssociatesData();
    }, []);

    const fetchProfessionalsData = async () => {
        try {
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccconnlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=professionals`);
            const data = await response.json();
            console.log(response);
            console.log(data);

            // Debug: Log the id value
            console.log('ID to filter:', data.pr_id);

            // Filter out items where pr_id matches id (ensure id is a string)
            const filteredData = data.data.filter(item => item.pr_id !== String(data.pr_id));

            setProfessionals(filteredData);
            console.log(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchClinicsData = async () => {
        try {

            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccconnlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=clinics`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            // Filter out items where pr_id matches
            const filteredData = data.data.filter(item => item.cl_id !== String(data.cl_id));

            setClinics(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchOfficesData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccconnlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=offices`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            // Filter out items where pr_id matches
            const filteredData = data.data.filter(item => parseInt(item.pr_id) !== id);

            setOffices(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchOthersData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccconnlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=others`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            // Filter out items where pr_id matches
            const filteredData = data.data.filter(item => parseInt(item.pr_id) !== id);

            setOthers(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchKeyAssociatesData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);

            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getperskeymyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            const filteredData = data.data.filter(item => parseInt(item.pr_id) !== id);

            setKeyAssociates(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };


    const [animationLoaded, setAnimationLoaded] = useState(false);
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationLoaded) {
            animationRef.current?.play();
        }
    }, [animationLoaded]);

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


    const handleTabPress = async (index) => {
        setActiveTab(index);
        console.log('Data for tab', index, ':', data[index]);
        renderTabContent(index);
        renderTabContent(data[index]);
        // setIsLoading(true); // Show loading indicator while fetching data
        // // Fetch or update data based on the selected tab
        // try {
        //     // Simulate fetching data (replace this with actual fetching logic)
        //     await new Promise(resolve => setTimeout(resolve, 10000));
        //     setIsLoading(false); // Hide loading indicator after data is fetched
        // } catch (error) {
        //     console.error("Error fetching data:", error);
        //     setIsLoading(false); // Hide loading indicator if an error occurs
        // }
    };

    const handleSearch = (query) => {
        // Handle the search logic based on the query
        setSearchQuery(query);
    };
    const scrollViewRef = useRef();
    const flatListRef = useRef();

    // const renderTabContent = (index) => {
    //     // Render content for each tab using data[index]
    //     return (
    //         // <FlatList
    //         //     data={data[index]}
    //         //     renderItem={renderItem}
    //         //     keyExtractor={(item) => item.id.toString()}
    //         // />
    //         <FlatList
    //             ref={flatListRef}
    //             data={data[activeTab]}
    //             renderItem={renderItem}
    //             keyExtractor={(item) => item.id.toString()}
    //             refreshing={isLoading}
    //         // onRefresh={() => {
    //         //     setIsLoading(true);
    //         //     setIsLoading(false);
    //         // }}
    //         />

    //     );
    // };

    const renderTabContent = () => {
        if (activeTab === 0) {
            if (professionals.length === 0) {
                return (
                    <View style={styles.animationContainer}>
                        <LottieView
                            ref={animationRef}
                            source={require('../../../assets/img/NoData.json')}
                            style={styles.animation}
                            autoPlay={true} 
                            loop={true} 
                            onLoad={() => setAnimationLoaded(true)} 
                        />
                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={professionals}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.pr_id.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        } 
        else if (activeTab === 1) {
            if (clinics.length === 0) {
                return (
                    <View style={styles.animationContainer}>
                        <LottieView
                            ref={animationRef}
                            source={require('../../../assets/img/NoData.json')}
                            style={styles.animation}
                            autoPlay={true}
                            loop={true}
                            onLoad={() => setAnimationLoaded(true)}
                        />
                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={clinics}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.cl_id.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        } 
        else if (activeTab === 2) {
            if (offices.length === 0) {
                return (
                    <View style={styles.animationContainer}>
                        <LottieView
                            ref={animationRef}
                            source={require('../../../assets/img/NoData.json')}
                            style={styles.animation}
                            autoPlay={true}
                            loop={true}
                            onLoad={() => setAnimationLoaded(true)}
                        />
                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={offices}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.off_id.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        } 
        else if (activeTab === 3) {
            if (others.length === 0) {
                return (
                    <View style={styles.animationContainer}>
                        <LottieView
                            ref={animationRef}
                            source={require('../../../assets/img/NoData.json')}
                            style={styles.animation}
                            autoPlay={true}
                            loop={true}
                            onLoad={() => setAnimationLoaded(true)}
                        />
                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={others}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.pr_id.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        } 
    };


    const openContactDetails = (contact) => {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact);
    };

    //  <Checkbox
    //                 isChecked={checkboxStates[item.id]?.isChecked || false}
    //                 onPress={() => handleCheckboxChange(item.id, item.name)}
    //             />
    // {/* <Text style={styles.optionText}>{item.name}</Text> */}

    const truncateText = (text, maxWidth, fontSize) => {
        const ellipsisWidth = 30; // Width of the ellipsis
        const maxTextWidth = maxWidth - ellipsisWidth;

        if (!text) {
            return '';
        }

        let width = 0;
        let truncatedText = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = measureCharWidth(char, fontSize);

            if (width + charWidth <= maxTextWidth) {
                width += charWidth;
                truncatedText += char;
            } else {
                break;
            }
        }

        if (text.length > truncatedText.length) {
            truncatedText += '...';
        }

        return truncatedText;
    };

    const measureCharWidth = (char, fontSize) => {
        // Assuming a constant width for each character for simplicity
        // You may want to use a more accurate method for precise measurement
        const charWidth = fontSize * 0.6; // Adjust this factor based on your font and styling
        return charWidth;
    };

    const [currentItem, setCurrentItem] = useState(null);
    const [currentContactStatus, setCurrentContactStatus] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [currentAccidty, setCurrentAccidty] = useState(null);
    const [currentContactType, setCurrentContactType] = useState(null);

    const handleCancelPress = (item, contactStatus, id, accidty, contactType) => {
        setCurrentItem(item);
        setCurrentContactStatus(contactStatus);
        setCurrentId(id);
        setCurrentAccidty(accidty);
        setCurrentContactType(contactType);
        setShowPopup1(true);
    };

    const cancelConnectionRequest = async () => {
        const accidtyid = await AsyncStorage.getItem('selected_id');
        const accidtymy = await AsyncStorage.getItem('selected_profile_accidty');
        const actionMap = {
            0: 'connection',
            1: 'keyassociate',
            2: 'empaneled',
            3: 'blocked',
        };
        const action = actionMap[activeTab];

        const url = `https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${accidtyid}&accidty1=${accidtymy}&accid2=${currentId}&accidty2=${currentAccidty}&action=connection`;
        console.log(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            const result = await response.json();
            console.log(`Request cancel successfully`);
        } catch (error) {
            console.error('Error accepting request:', error);
        }

        setShowPopup1(false);
        fetchProfessionalsData();
        fetchClinicsData();
        fetchOfficesData();
        fetchOthersData();
        fetchKeyAssociatesData();
    };

    const handleBlockPress = (item, contactStatus, id, accidty, contactType) => {
        setCurrentItem(item);
        setCurrentContactStatus(contactStatus);
        setCurrentId(id);
        setCurrentAccidty(accidty);
        setCurrentContactType(contactType);
        setShowPopup2(true);
    };

    const blockConnectionRequest = async () => {
        const accidtyid = await AsyncStorage.getItem('selected_id');
        const accidtymy = await AsyncStorage.getItem('selected_profile_accidty');
        const actionMap = {
            0: 'connection',
            1: 'keyassociate',
            2: 'empaneled',
            3: 'blocked',
        };
        const action = actionMap[activeTab];

        const url = `https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidtymy}&accid2=${currentId}&accidty2=${currentAccidty}&action=blocked`;
        console.log(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            const result = await response.json();
            console.log(`Blocked successfully`);
        } catch (error) {
            console.error('Error accepting request:', error);
        }

        setShowPopup2(false);
        fetchProfessionalsData();
        fetchClinicsData();
        fetchOfficesData();
        fetchOthersData();
        fetchKeyAssociatesData();
    };

    const renderItem = ({ item, index }) => {

        const name =
            item.name;

        const contactStatus =
            item.pr_contact_status ||
            item.cl_contact_status ||
            item.off_contact_status ||
            item.contact_status ||
            item.status;

        const contactType =
            item.pr_type ||
            item.cl_type ||
            item.off_type ||
            item.contact_type ||
            item.type;

        const id =
            item.pr_id ||
            item.cl_id ||
            item.off_id ||
            item.contact_id ||
            item.id;

        let accidty;
        if (item.pr_id) {
            accidty = 1;
        } else if (item.cl_id) {
            accidty = 2;
        } else if (item.off_id) {
            accidty = 3;
        } else {
            accidty = item.con_ty;
        }


        const truncatedTitle = truncateText(item.name, width * 0.75, 17);
        const truncatedDescription = truncateText(item.description, width * 0.85, 15);
        // const truncatedDescription = truncateText(item.specList[0].speciality, width * 0.85, 15);

        let imageUrl;
        if (item.profile_pic) {
            imageUrl = item.profile_pic;
        } else {
            if (item.gender === 1) {
                imageUrl = '../../../assets/img/defaultMale.png'; // Path to your default male image
            } else {
                imageUrl = '../../../assets/img/defaultFemale.png'; // Path to your default female image
            }
        }

        const handleNavigation = () => {
            if (activeTab === 0 || activeTab === 3) {
                navigation.navigate('ProfileScreen', { professionalId: item.pr_id });
            } else if (activeTab === 1) {
                navigation.navigate('ClinicProfile', { cl_id: item.cl_id });
            } else if (activeTab === 2) {
                navigation.navigate('OfficeProfile', { off_id: item.off_id });
            }
        };
        return (
            <ScrollView>
                {/* Content row with text and button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleNavigation}
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                >
                    {/* Left side text and image */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        {/* Image */}
                        <Image
                            source={{ uri: item.profile_pic }}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />

                        {/* Text */}
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            {/* <Text style={[commonStyles.headerText4BL, {}]}>{truncatedTitle}</Text> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[commonStyles.headerText4BL, {}]}>{truncatedTitle}</Text>
                                <Popover
                                    placement={PopoverPlacement.LEFT}
                                    visible={showPopover}
                                    onRequestClose={() => setShowPopover(false)}
                                    from={(
                                        <TouchableOpacity style ={{paddingHorizontal: 10}}
                                        >
                                            <Image
                                                source={require('../../../assets/img/ViewM.png')}
                                                style={{ width: 4, height: 18 }}
                                            />
                                        </TouchableOpacity>
                                    )}>
                                    <View style={commonStyles.popover}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleCancelPress(item, contactStatus, id, accidty, contactType);
                                                setShowPopover(false); // Close popover when opening popup
                                            }}
                                            activeOpacity={0.8}>
                                            <View style={commonStyles.popoverItemContainer}>
                                                <Image
                                                    source={require('../../../assets/img/Bookmark.png')}
                                                    style={commonStyles.popoverItemIcon}
                                                />
                                                <Text style={commonStyles.popoverItemText}>Remove</Text>
                                            </View>
                                        </TouchableOpacity>


                                        <AlertPopup
                                            visible={showPopup1}
                                            onRequestClose={() => setShowPopup1(false)}
                                            title="Remove Account"
                                            message="Are you sure you want to remove from connection? "
                                            yesLabel="Yes"
                                            noLabel="No"
                                            onYesPress={() => {
                                                setShowPopup1(false);
                                                cancelConnectionRequest();
                                            }}
                                        />

                                        <TouchableOpacity
                                            onPress={() => {
                                                handleBlockPress(item, contactStatus, id, accidty, contactType);
                                                setShowPopover(false); // Close popover when opening popup
                                            }}
                                            activeOpacity={0.8}>
                                            <View style={commonStyles.popoverItemContainer}>
                                                <Image
                                                    source={require('../../../assets/img/SaveCon.png')}
                                                    style={commonStyles.popoverItemIcon}
                                                />
                                                <Text style={commonStyles.popoverItemText}>Block</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <AlertPopup
                                            visible={showPopup2}
                                            onRequestClose={() => setShowPopup2(false)}
                                            title="Block Account?"
                                            message="Are you sure you want to block this connection? "
                                            yesLabel="Yes"
                                            noLabel="No"
                                            onYesPress={() => {
                                                setShowPopup2(false);
                                                blockConnectionRequest();
                                            }}
                                        />

                                    </View>
                                </Popover>
                            </View>
                            <Text style={[commonStyles.headerText5G, {}]}>{truncatedDescription}</Text>
                        </View>
                    </View>

                    {/* Right side button */}
                    {/* <TouchableOpacity
        style={{
            paddingVertical: 4,
            paddingHorizontal: width * 0.01,
            borderRadius: 24,
            borderColor: '#289EF5',
            borderWidth: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.2,
        }}
        onPress={() => {
            // Handle button press logic here
        }}
    >
        <Text style={{
            fontSize: responsiveFontSize(14),
            alignSelf: 'center',
            color: '#289EF5',
            paddingHorizontal: 5,
            textAlign: 'center',
            fontFamily: 'DMSans-Medium',
            lineHeight: height * 0.028 //28
        }}>Remove</Text>
    </TouchableOpacity> */}
                </TouchableOpacity>


                {/* Horizontal line */}
                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 4 }} />
            </ScrollView>
        );
    };


    return (
        <View style={styles.container}>
            {isLoading ? (
                <Animation />
            ) : (
                <View>
                    <View style={commonStyles.wrapT}>
                        <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                            <Image source={require('../../../assets/img/Back.png')} style={commonStyles.icon} />
                        </TouchableOpacity>
                        <Text style={commonStyles.backText}>My Connections</Text>
                        <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                            <Image source={require('../../../assets/img/Option.png')} style={commonStyles.icon} />
                        </TouchableOpacity>
                    </View>

                    {/* Tabs */}
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {tabs.map((tab, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={{
                                        height: height * 0.04,
                                        backgroundColor: activeTab === index ? "#289EF5" : '#E8F8FF',
                                        opacity: activeTab === index ? 1 : 1,
                                        borderRadius: 6,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginVertical: height * 0.02,
                                        marginRight: 12,
                                        paddingHorizontal: height * 0.01,
                                    }}
                                    onPress={() => handleTabPress(index)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={{
                                        fontSize: responsiveFontSize(15),
                                        alignSelf: 'center',
                                        color: activeTab === index ? 'rgba(255, 255, 255, 1)' : '#289EF5',
                                        paddingHorizontal: 5,
                                        textAlign: 'center',
                                        fontFamily: 'DMSans-Medium',
                                        lineHeight: height * 0.028 //28
                                    }}>{tab}</Text>
                                </TouchableOpacity>

                            </View>
                        ))}
                    </ScrollView> */}

                        <View style={styles.subContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {tabs.map((tab, index) => (
                                    <View key={index}>
                                        <TouchableOpacity
                                            style={{
                                                height: height * 0.04,
                                                backgroundColor: activeTab === index ? "#289EF5" : '#E8F8FF',
                                                opacity: activeTab === index ? 1 : 1,
                                                borderRadius: 6,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginVertical: height * 0.02,
                                                marginRight: 12,
                                                paddingHorizontal: height * 0.01,
                                            }}
                                            onPress={() => handleTabPress(index)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={{
                                                fontSize: responsiveFontSize(15),
                                                alignSelf: 'center',
                                                color: activeTab === index ? 'rgba(255, 255, 255, 1)' : '#289EF5',
                                                paddingHorizontal: 5,
                                                textAlign: 'center',
                                                fontFamily: 'DMSans-Medium',
                                                lineHeight: height * 0.028 //28
                                            }}>{tab}</Text>
                                        </TouchableOpacity>

                                    </View>
                                ))}
                            </ScrollView>

                       
                            <ScrollView
                                style={{ height: height }}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                ref={scrollViewRef}
                                onScroll={event => {
                                    const offsetX = event.nativeEvent.contentOffset.x;
                                    const index = Math.round(offsetX / (width - width * 0.08));
                                    setActiveTab(index);
                                }}
                            >
                                {data[activeTab].length > 0 ? (
                                    tabs.map((tab, index) => (
                                        <View key={index} style={{ width: width - width * 0.08, paddingBottom: 150 }}>
                                            {/* Wrap each tab content with ScrollView */}
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                {renderTabContent(index)}
                                            </ScrollView>
                                        </View>
                                    ))
                                ) : (
                                    <View style={styles.noDataContainer}>
                                        {/* <Image source={require('../../../assets/img/SelectLocation.png')} style={styles.noDataImage} /> */}
                                        <LottieView
                                            ref={animationRef}
                                            source={require('../../../assets/img/loader.json')}
                                            style={styles.animation}
                                        />
                                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    {/* Render FlatList or No Data image */}
                    {/* {data[activeTab].length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <FlatList
                                data={data[activeTab].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                            />
                        </ScrollView>
                    ) : (
                                <View>
                                    <View style={styles.noDataContainer}>
                                      <LottieView
                                            ref={animationRef}
                                            source={require('../../../assets/img/NoData.json')}
                                            style={styles.animation}
                                        />
                                        <Text style={[commonStyles.headerText4BL, {}]}>No Data Found</Text>
                                    </View>
                        </View> 
                    )} */}
                </View>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    noDataContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: height,
        width: width
    },
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.75,
        width: width
    },
    animation: {
        width: 150, // Adjust the width and height based on your animation's dimensions
        height: 150,
    },
    subContainer: {
        // marginBottom: 100,
        // paddingBottom: 50,
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,
        paddingHorizontal: width * 0.04
    },
    wrapT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        //paddingHorizontal: 20,
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
    backText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'black',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    searchBarContainer: {
        //marginHorizontal: 30,
        marginVertical: 15,
        paddingHorizontal: 15,
        //backgroundColor: '#ffffff',
        borderRadius: 30,
        borderWidth: 1,
        height: '10%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#289EF5'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000000',
    },
    backContainerSearch: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    backContainerFilter: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
});




export default MyConnections;
