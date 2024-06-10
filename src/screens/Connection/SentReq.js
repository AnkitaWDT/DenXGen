/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Image, PixelRatio, Dimensions } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Contacts from 'react-native-contacts';
import LottieView from 'lottie-react-native';
import { moderateScale } from 'react-native-size-matters';///
import AlertPopup from '../../components/AlertPopup';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animation from '../../components/Loader';



const { width, height } = Dimensions.get('window');
const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const SkeletonPlaceholder = () => {
    // Create an array with a length of 10 to render 10 placeholders
    const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

    return (
        <>
            {skeletonItems.map((item) => (
                <View key={item} style={styles.skeletonContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10, backgroundColor: '#979797', }} />
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ width: 150, height: 20, marginBottom: 4, backgroundColor: '#979797', }} />
                            <View style={{ width: 100, height: 16, backgroundColor: '#979797', }} />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingVertical: 4,
                            paddingHorizontal: 10,
                            borderRadius: 24,
                            borderColor: '#979797',
                            backgroundColor: '#979797',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 80,
                            height: 30,
                        }}
                    />
                </View>
            ))}
        </>
    );
};



const SentReq = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);
    const tabs = ['Connections', 'Key Associates', 'Empanelled', 'Blocked'];

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
                gender: 1
            },
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


    ];

    const [connections, setConnections] = useState([]);
    const [empanelled, setEmpanelled] = useState([]);
    const [blocked, setBlocked] = useState([]);
    const [keyAssociates, setKeyAssociates] = useState([]);


    useEffect(() => {
        fetchConnectionsData();
        fetchKeyAssociatesData();
        fetchEmpanelledData();
        fetchBlockedData();
    }, []);

    const fetchConnectionsData = async () => {
        try {
            setIsLoading(true); 
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccsentreqlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=connections`);
            const data = await response.json();
            console.log(response);
            console.log(data);

            const dataArray = Object.values(data.data); // Extract values into an array
            console.log('dataArray', dataArray);

            const filteredData = dataArray.filter(item => {
                if ('pr_id' in item && parseInt(item.pr_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('cl_id' in item && parseInt(item.cl_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('off_id' in item && parseInt(item.off_id) !== parseInt(accidtyid)) {
                    return true;
                }
                return false;
            });

            setConnections(filteredData);
            console.log(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Set isLoading to false after data fetching completes (whether successful or not)
        }
    };


    const fetchKeyAssociatesData = async () => {
        try {

            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccsentreqlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=keyassociate`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            const dataArray = Object.values(data.data); // Extract values into an array
            console.log('dataArray', dataArray);

            const filteredData = dataArray.filter(item => {
                if ('pr_id' in item && parseInt(item.pr_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('cl_id' in item && parseInt(item.cl_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('off_id' in item && parseInt(item.off_id) !== parseInt(accidtyid)) {
                    return true;
                }
                return false;
            });


            setKeyAssociates(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchEmpanelledData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccsentreqlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=empaneled`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            const dataArray = Object.values(data.data); // Extract values into an array
            console.log('dataArray', dataArray);

            const filteredData = dataArray.filter(item => {
                if ('pr_id' in item && parseInt(item.pr_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('cl_id' in item && parseInt(item.cl_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('off_id' in item && parseInt(item.off_id) !== parseInt(accidtyid)) {
                    return true;
                }
                return false;
            });

            setEmpanelled(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const fetchBlockedData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getmyaccsentreqlist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=blocked`);
            //https://temp.wedeveloptech.in/denxgen/appdata/getaccconnlist-ax.php?accid=5&accidty=1&action=professionals 
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersmyconnlist-ax.php?pr_id=${id}`);
            const data = await response.json();

            const dataArray = Object.values(data.data); // Extract values into an array
            console.log('dataArray', dataArray);

            const filteredData = dataArray.filter(item => {
                if ('pr_id' in item && parseInt(item.pr_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('cl_id' in item && parseInt(item.cl_id) !== parseInt(accidtyid)) {
                    return true;
                }
                if ('off_id' in item && parseInt(item.off_id) !== parseInt(accidtyid)) {
                    return true;
                }
                return false;
            });

            setBlocked(filteredData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
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

        const url = `https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${accidtyid}&accidty1=${accidtymy}&accid2=${currentId}&accidty2=${currentAccidty}&action=${action}`;
        console.log(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            const result = await response.json();
            console.log(`Request cancel successfully for ${action}`);
        } catch (error) {
            console.error('Error accepting request:', error);
        }

        setShowPopup1(false);
        fetchConnectionsData();
        fetchKeyAssociatesData();
        fetchEmpanelledData();
        fetchBlockedData();
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
            //setIsLoading(false);
        };

        // Execute the fakeAsyncOperation
        fakeAsyncOperation();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Show skeleton for at least 5 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);


    const handleTabPress = async (index) => {
        setActiveTab(index);
        //console.log('Data for tab', index, ':', data[index]);
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


    // const handleAcceptPress = () => {
    //     // Show the popup
    //     console.log('huhdei');
    //     setShowPopup1(true);
    //     // Set the selected professional's id to state
    //     setSelectedProfessionalId(item.pr_id);
    // };

    // const cancelConnectionRequest = async () => {
    //     try {
    //         const pr_id = await AsyncStorage.getItem('pr_id');
    //         const id = parseInt(pr_id);

    //         const accidtyid = await AsyncStorage.getItem('selected_id');
    //         const accidty = await AsyncStorage.getItem('selected_profile_accidty');
    //         const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${selectedProfessionalId}&accidty2=1&action=connection`);

    //         //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${pr_id}&accid2=${selectedProfessionalId}&action=connection`);
    //         const data = await response.json();
    //         console.log(data);
    //         // Check if the request was successful, and update UI accordingly
    //         if (data.code === 1) {
    //             fetchProfessionalsData();
    //             console.log('sent req');
    //             console.log(response);
    //         } else {
    //             // Handle error
    //         }
    //     } catch (error) {
    //         // Handle error
    //         console.error(error);
    //     }
    // };


    const renderTabContent = () => {
        if (activeTab === 0) {
            if (isLoading) {
                // Render Skeleton UI while loading
                return <SkeletonPlaceholder />;
            } else if (connections.length > 0) {
                // Render FlatList with data
                return (
                    <FlatList
                        data={connections}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name.toString()}
                        refreshing={isLoading}
                    />
                );
            } else {
                // Render No Data Found
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
            }
        }

        else if (activeTab === 1) {
            if (keyAssociates.length === 0) {
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
                        data={keyAssociates}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        }
        else if (activeTab === 2) {
            if (empanelled.length === 0) {
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
                        data={empanelled}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name.toString()}
                        refreshing={isLoading}
                    />
                );
            }
        }
        else if (activeTab === 3) {
            if (blocked.length === 0) {
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
                        data={blocked}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name.toString()}
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

    const renderItem = ({ item, index }) => {
        const speciality =
            item.speciality || item.service || null;

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

        const accidty = item.con_ty;


        const truncatedTitle = truncateText(item.name, width * 0.75, 17);
        const truncatedDescription = truncateText(speciality, width * 0.85, 15);
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
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        if ('off_id' in item) {
                            console.log('OfficeProfile');
                            navigation.navigate('OfficeProfile', { off_id: item.off_id });
                        } else if ('cl_id' in item) {
                            console.log('ClinicProfile');
                            navigation.navigate('ClinicProfile', { cl_id: item.cl_id });
                        } else if ('pr_id' in item) {
                            console.log('ProfileScreen');
                            navigation.navigate('ProfileScreen', { professionalId: item.pr_id });
                        }
                    }}
                    //onPress={handleNavigation}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Image
                            source={{ uri: item.profile_pic }}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />

                        <View style={{ flexDirection: 'column', }}>
                            <Text style={[commonStyles.headerText4BL, {}]}>{truncatedTitle}</Text>
                            <Text style={[commonStyles.headerText5G, {}]}>{truncatedDescription}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
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
                        onPress={() => handleCancelPress(item, contactStatus, id, accidty, contactType)}
                    >
                        <Text style={{
                            fontSize: responsiveFontSize(14),
                            alignSelf: 'center',
                            color: '#289EF5',
                            paddingHorizontal: 5,
                            textAlign: 'center',
                            fontFamily: 'DMSans-Medium',
                            lineHeight: height * 0.028 //28
                        }}>Cancel</Text>
                    </TouchableOpacity>

                </TouchableOpacity>

                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 4 }} />

                <AlertPopup
                    visible={showPopup1}
                    onRequestClose={() => setShowPopup1(false)}
                    title="Cancel Request"
                    message="Are you sure you want to cancel request? "
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup1(false);
                        cancelConnectionRequest();
                    }}
                />

            </ScrollView>
        );
    };


    return (
        <View style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/img/Back.png')} style={commonStyles.icon} />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Sent Requests</Text>
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
        </View>

    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(11),
        backgroundColor: '#E0E0E0',
        paddingHorizontal: moderateScale(14),
        borderColor: '#979797',
        borderWidth: 0.2,
        borderRadius: 24,
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    noDataContainer: {
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



export default SentReq;


{/* <ScrollView>
    <TouchableOpacity
        activeOpacity={0.8}
            onPress={handleNavigation}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Image
                source={{ uri: imageUrl }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
            />

            <View style={{ flexDirection: 'column', }}>
                <Text style={[commonStyles.headerText4BL, {}]}>{truncatedTitle}</Text>
                <Text style={[commonStyles.headerText5G, {}]}>{truncatedDescription}</Text>
            </View>
        </View>

        <TouchableOpacity
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
            onPress={handleAcceptPress}
        >
            <Text style={{
                fontSize: responsiveFontSize(14),
                alignSelf: 'center',
                color: '#289EF5',
                paddingHorizontal: 5,
                textAlign: 'center',
                fontFamily: 'DMSans-Medium',
                lineHeight: height * 0.028 //28
            }}>Cancel</Text>
        </TouchableOpacity>

    </TouchableOpacity>

    <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 4 }} />

    <AlertPopup
        visible={showPopup1}
        onRequestClose={() => setShowPopup1(false)}
        title="Cancel Request"
        message="Are you sure you want to cancel connection request? "
        yesLabel="Yes"
        noLabel="No"
        onYesPress={() => {
            setShowPopup1(false);
            cancelConnectionRequest();
        }}
    />

</ScrollView> */}