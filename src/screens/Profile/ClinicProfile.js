/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
    PixelRatio, RefreshControl, View, Image, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Text, TouchableWithoutFeedback, Modal, Dimensions, FlatList
} from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Video from 'react-native-video';
import SocialLink from '../../components/SocialLinks';
import { moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Animation from '../../components/Loader';
import AlertPopup from '../../components/AlertPopup';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const ReadMoreText = ({ text, initialLimit }) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const readMoreText = showFullText ? 'Read Less' : 'Read More';

    const textToShow = showFullText ? text : `${text.slice(0, initialLimit)}...`;

    return (
        <View>
            <Text style={[commonStyles.headerText3BL, { textAlign: 'justify' }]}>{textToShow}</Text>
            {text.length > initialLimit && (
                <TouchableOpacity onPress={toggleText}>
                    <Text style={[commonStyles.headerText3BL, { fontFamily: 'DMSans-SemiBold', textAlign: 'right' }]}>{readMoreText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const ClinicProfile = ({ navigation, route }) => {

    const { cl_id } = route.params;
    console.log(cl_id);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        // Perform your refresh logic here, for example fetching new data

        // After the data is refreshed, set refreshing to false
        setRefreshing(false);
    };

    const [editIndex, setEditIndex] = useState(null);

    const [sections, setSections] = useState([
        { id: 1, schoolName: '', graduated: false, fromYear: '', fromMonth: '', toYear: '', toMonth: '', degree: '', },
    ]);
    const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
    const [activeSection, setActiveSection] = useState(1);

    const [selectedFromYears, setSelectedFromYears] = useState({});
    const [selectedToYears, setSelectedToYears] = useState({});
    const [isYearPickerVisible, setYearPickerVisible] = useState(false);
    const [yearPickerType, setYearPickerType] = useState(null);

    const [selectedFromMonths, setSelectedFromMonths] = useState({});
    const [selectedToMonths, setSelectedToMonths] = useState({});
    const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
    const [monthPickerType, setMonthPickerType] = useState(null);

    const [selectedYear, setSelectedYear] = useState(null);

    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const handleImageClick = () => {
        setShowAlert(true);
    };

    const handleConfirm = () => {
        setShowAlert(false);
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            setShowImage(false);
            // Perform navigation or any other action after loading
            // navigation.navigate('ClinicProfileCompletion3');
        }, 2000); // Simulated loading time, replace with actual loading logic
    };

    const handleCancel = () => {
        setShowAlert(false);
    };


    const [clinicData, setClinicData] = useState([]);

    // const [buttonState, setButtonState] = useState('Connect');
    // const [showPopup, setShowPopup] = useState(false);
    // const [showPopup1, setShowPopup1] = useState(false);

    // const handleConnectPress = () => {
    //     if (buttonState === 'Connect') {
    //         setButtonState('Options');
    //     } else {
    //         setButtonState('Connect');
    //     }
    // };

    // const handleOptionPress = (option) => {
    //     if (option === 'Empanel') {
    //         setButtonState('Remove');
    //     } else {
    //         // Handle Message button press
    //     }
    // };


    const [buttonState, setButtonState] = useState('StatusReq');
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopupBlock, setShowPopupBlock] = useState(false);
    const [showPopupEndorse, setShowPopupEndorse] = useState(false);
    const [selectedProfessionalId, setSelectedProfessionalId] = useState(null);

    const [connectionStatus, setConnectionStatus] = useState(null);
    const [connection, setConnection] = useState(null);
    const [prid, setPrid] = useState(null);
    console.log('prid', connection);

    const [keyAssociateStatus, setKeyAssociateStatus] = useState(null);
    const [keyAssociate, setKeyAssociate] = useState(null);

    useEffect(() => {
        fetchConnectionStatus();
        fetchKeyAssociateStatus();
    }, []);




    const fetchConnectionStatus = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            //setPrid(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            setPrid(accidtyid);
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getallconnectionlist-ax.php?selectedid=${accidtyid}&accidty1=${accidty}&accidty2=2`);
            console.log(response);
            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getallclconnectionlist-ax.php?cl_id=${cl_id}`);
            const data = await response.json();
            //console.log(data);
            if (data.code === 1) {
                // Check connection status
                const connection = data.data.find(connection => {
                    if ((connection.reciever === accidtyid && connection.sender === cl_id) ||
                        (connection.sender === accidtyid && connection.reciever === cl_id)) {
                        return true;
                    }
                    return false;
                });

                console.log("Connection:", connection);
                setConnectionStatus(connection.connection);
                setConnection(connection);
                console.log("Connection Status:", connection.connection);


            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };


    const fetchKeyAssociateStatus = async () => {
        try {

            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            setPrid(accidtyid);
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getallkeyassoclist-ax.php?selectedid=${accidtyid}&accidty1=${accidty}&accidty2=1`);
            console.log(response);
            const data = await response.json();
            if (data.code === 1) {
                // Check connection status
                const keyAssociate = data.data.find(keyAssociate => {
                    if ((keyAssociate.reciever === accidtyid && keyAssociate.sender === cl_id) ||
                        (keyAssociate.sender === accidtyid && keyAssociate.reciever === cl_id)) {
                        return true;
                    }
                    return false;
                });

                //console.log("KeyAssociate:", keyAssociate);
                if (keyAssociate) {
                    setKeyAssociateStatus(keyAssociate.keyassociate);
                    setKeyAssociate(keyAssociate);
                    //console.log("Connection Status:", connection.connection);
                } else {
                    console.log("No connection found for professional ID:", cl_id);
                }


            }

        } catch (error) {
            // Handle error
            console.error(error);
        }
    };


    const handleConnectPress = () => {
        if (buttonState === 'Connect') {
            setButtonState('Options');
        } else {
            setButtonState('Connect');
        }
    };

    const handleOptionPress = (option) => {
        if (option === 'Empanel') {
            setButtonState('Remove');
        } else {
            // Handle Message button press
        }
    };

    const cancelConnectionRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=connection`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            if (data.code === 1) {
                setButtonState('Connect');
                console.log('sent req');
                console.log(response);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const cancelKeyAssociateRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqdeletepersconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=keyassociate`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            if (data.code === 1) {
                setButtonState('KeyAssociate');
                console.log('sent req');
                console.log(response);
                console.log(data);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const acceptConnReq = async () => {
        try {
            console.log('clicked')
            const pr_id = await AsyncStorage.getItem('pr_id');
            console.log('pr_id', pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            console.log('accidty', accidty);
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccacceptconn-ax.php?accid1=${accidtyid}&accidty1=2&accid2=${pr_id}&accidty2=${accidty}&action=connection`);
            const data = await response.json();
            // Handle response data as needed
            console.log(response);
            setButtonState('KeyAssociate');
            console.log(data);
            console.log('connected')
            setShowPopup5(false); // Close the popup after making the API call
        } catch (error) {
            console.error('Error sending connection request:', error);
            // Handle error
        }
    };

    const handleAcceptPress = () => {
        // Show the popup
        console.log('huhdei');
        setShowPopup2(true);
        // Set the selected professional's id to state
        setSelectedProfessionalId(cl_id);
    };

    const sendDropCardRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=dropacard`);

            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${pr_id}&accid2=${professionalId}&action=dropacard`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            console.log('drop a card account');
            console.log(response);
            console.log(data);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const sendBlockRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=blocked`);

            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${pr_id}&accid2=${professionalId}&action=blocked`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            console.log('block account');
            console.log(response);
            console.log(data);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const sendEndorseRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=endorsement`);

            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${pr_id}&accid2=${professionalId}&action=endorsement`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            console.log('block account');
            console.log(response);
            console.log(data);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const sendConnectionRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            console.log('accidty', accidty);
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=connection`);
            const data = await response.json();
            // Check if the request was successful, and update UI accordingly
            if (data.code === 1) {
                setButtonState('Remove');
                console.log('sent req');
                console.log(response);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    const sendKeyAssociateRequest = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            const accidty = await AsyncStorage.getItem('selected_profile_accidty');
            const accidtyid = await AsyncStorage.getItem('selected_id');
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${accidtyid}&accidty1=${accidty}&accid2=${cl_id}&accidty2=2&action=keyassociate`);

            //const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/reqaccconn-ax.php?accid1=${pr_id}&accid2=${professionalId}&action=keyassociate`);
            const data = await response.json();
            console.log(data);
            // Check if the request was successful, and update UI accordingly
            if (data.code === 1) {
                setButtonState('RemoveKey');
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchClinicData = async () => {
            try {
                const pr_id = await AsyncStorage.getItem('pr_id');
                const id = parseInt(pr_id);

                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getcliniclist-ax.php?pr_id=${pr_id}`);

                if (response.data && response.data.data) {
                    setClinicData(response.data.data);
                } else {
                    console.log('Empty response or missing data:', response.data);
                    // Handle empty response or missing data
                }
            } catch (error) {
                console.error('Error fetching clinic data:', error);
                // Handle error
            }
        };

        fetchClinicData();
    }, []);


    const toggleModalB = () => {
        setModalVisible(!modalVisible);
    };

    const toggleModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalVisible(!isModalVisible);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const [showAllVid, setShowAllVid] = useState(false);
    const videos = [
        { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
        { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
        { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
    ];
    // const initialVideosToShow = showAllVid ? videos.length : 2;
    const initialVideosToShow = showAllVid ? profileData.vidList.length : 2;

    const handleToggleShowAllVid = () => {
        setShowAllVid(!showAllVid);
    };

    const [showAllAwards, setShowAllAwards] = useState(false);
    const awards = [
        { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
        { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
        { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
    ];
    //const initialAwardsToShow = showAllAwards ? awards.length : 2;
    const initialAwardsToShow = showAllAwards ? profileData.awaList.length : 2;

    const handleToggleShowAllAwards = () => {
        setShowAllAwards(!showAllAwards);
    };

    const [showAllBlog, setShowAllBlog] = useState(false);
    const blog = [
        { id: 1, link: 'https://www.youtube.com/watch?v=video1' },
        { id: 2, link: 'https://www.youtube.com/watch?v=video2' },
        { id: 3, link: 'https://www.youtube.com/watch?v=video3' },
    ];
    //const initialBlogToShow = showAllBlog ? blog.length : 2;
    const initialBlogToShow = showAllBlog ? profileData.pubList.length : 2;

    const handleToggleShowAllBlog = () => {
        setShowAllBlog(!showAllBlog);
    };

    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const [showAllExp, setShowAllExp] = useState(false);

    const toggleShowAllExp = () => {
        setShowAllExp(!showAllExp);
    };

    const [isModalVisibleV, setIsModalVisibleV] = useState(false);

    const toggleModalV = () => {
        setIsModalVisibleV(!isModalVisibleV);
    };
    const closeModalV = () => {
        setIsModalVisibleV(false);
    };

    const [selectedTab, setSelectedTab] = useState(0);
    const [showPlayButton, setShowPlayButton] = useState(false);

    const [modalConnectVisible, setModalConnectVisible] = useState(false);

    const [profileData, setProfileData] = useState(null);
    const [galleryList, setGalleryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getclinicvic-ax.php?cl_id=${cl_id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response);
            const responseBodyText = await response.text(); // Get response body as text
            console.log('Response Body:', responseBodyText); // Log response body
            const data = JSON.parse(responseBodyText); // Try to parse the response body as JSON
            console.log('API Response:', data);
            setProfileData(data.data);
            setGalleryList(data.data.galleryList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };


    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    useEffect(() => {
        //console.log('profileData', JSON.stringify(profileData));
    }, [profileData]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Animation />
            </SafeAreaView>
        );
    }

    const servicesData = profileData ? profileData.servList.map(item => item.service) : [];
    const treatmentsData = profileData ? profileData.treatmentList.map(item => item.treatment) : [];
    // const keyForteData = profileData ? profileData.keyfList.map(item => item.keyforte) : [];
    // const languages = profileData ? profileData.langList.map(lang => lang.language).join(', ') : null;
   


  

    const renderTabContent = () => {
        const minHeight = 200; // Define your minimum height here

        // Common styles for all tabs
        const tabContentStyle = {
            minHeight,
            //borderWidth: 1,
            borderColor: 'gray',
            //padding: 10, 
            marginBottom: 30
        };
        switch (selectedTab) {
            case 0:
                if (galleryList.length === 0 && !profileData.profile_video) {
                    return null; // Don't render anything if both galleryList and profile_video are empty
                }
                return (
                    <ScrollView style={tabContentStyle}>
                        <TouchableOpacity onPress={toggleModalV}>
                            <Video
                                source={profileData && profileData.profile_video ? { uri: profileData.profile_video } : null}
                                style={{ aspectRatio: 3 / 2 }}
                                controls={false}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Modal
                            visible={isModalVisibleV}
                            transparent={true}
                            onRequestClose={closeModalV}
                        >
                            <TouchableWithoutFeedback onPress={closeModalV}>
                                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={closeModalV}>
                                        <Text style={{ color: 'white', fontSize: 20 }}>X</Text>
                                    </TouchableOpacity>

                                    <Video
                                        source={{ uri: profileData && profileData.profile_video ? profileData.profile_video : null }}
                                        style={{ width: width, height: height - 40 }}
                                        controls={true}
                                        resizeMode="contain"
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <View style={styles.imageGrid}>
                            {galleryList.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.imageContainer,
                                        (index + 1) % 3 !== 0 && { marginRight: '5%' }, // Apply marginRight for every third image
                                    ]}
                                    onPress={() => toggleModal(index)}
                                    activeOpacity={0.8}>
                                    <Image
                                        source={{ uri: image.gal_image }}
                                        style={styles.defaultImageU}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            onRequestClose={closeModal}>
                            <TouchableWithoutFeedback onPress={closeModal}>
                                <View
                                    style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                                    {/* Modal content */}
                                    <ScrollView
                                        horizontal
                                        pagingEnabled
                                        showsHorizontalScrollIndicator={false}
                                        onMomentumScrollEnd={event => {
                                            const newIndex = Math.round(
                                                event.nativeEvent.contentOffset.x / width,
                                            );
                                            setSelectedImageIndex(newIndex);
                                        }}
                                        contentContainerStyle={{ flexGrow: 1 }}>
                                        {galleryList.map((image, index) => (
                                            <View key={index} style={{ flex: 1, width: width }}>
                                                <Image
                                                    source={{ uri: image.gal_image }}
                                                    style={{
                                                        width: width,
                                                        height: height,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                        ))}
                                    </ScrollView>
                                    {/* Close button */}
                                    <TouchableOpacity
                                        style={{ position: 'absolute', top: 20, right: 20 }}
                                        onPress={closeModal}>
                                        <Text style={{ color: 'FEFCFC', fontSize: 20 }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                    </ScrollView>
                );
            case 1:
                if (!treatmentsData) {
                    return null; // Don't render anything if both galleryList and profile_video are empty
                }
                return (
                    <ScrollView style={tabContentStyle}>
                        <FlatList
                            data={treatmentsData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <Image
                                        source={require('../../../assets/img/services.png')}
                                        style={{ width: 20, height: 25, marginRight: 10, }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>
                                </View>
                            )}
                        // renderItem={({ item }) => <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>}
                        />
                    </ScrollView>
                );
            case 2:
                if (!servicesData) {
                    return null; // Don't render anything if both galleryList and profile_video are empty
                }
                return (
                    <ScrollView style={tabContentStyle}>
                        <FlatList
                            data={servicesData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                    <Image
                                        source={require('../../../assets/img/services.png')}
                                        style={{ width: 20, height: 25, marginRight: 10, }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>
                                </View>
                            )}
                        // renderItem={({ item }) => <Text style={[commonStyles.headerText3BL, {}]}>{item}</Text>}
                        />
                    </ScrollView>
                );
            case 3:

                return (
                    <ScrollView style={tabContentStyle}>
                        <View>
                            <Text style={[commonStyles.headerText11BL, {
                                //marginVertical: height * 0.01,
                            }]}>Video Links</Text>
                            {profileData.vidList.slice(0, initialVideosToShow).map((video, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Image
                                        source={require('../../../assets/img/videoL.png')}
                                        style={{ width: 22, height: 22, marginRight: 10 }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{video.links}</Text>
                                </View>
                            ))}
                            {!showAllVid && profileData.vidList.length > 2 && (
                                <TouchableOpacity onPress={handleToggleShowAllVid}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                                </TouchableOpacity>
                            )}
                            {showAllVid && (
                                <TouchableOpacity onPress={handleToggleShowAllVid}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.horizontalLine}></View>
                        <View>
                            <Text style={[commonStyles.headerText11BL, {
                                //marginVertical: height * 0.01,
                            }]}>Awards</Text>
                            {profileData.awaList.slice(0, initialAwardsToShow).map((awards, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Image
                                        source={require('../../../assets/img/videoL.png')}
                                        style={{ width: 22, height: 22, marginRight: 10 }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{awards.links}</Text>
                                </View>
                            ))}
                            {!showAllAwards && profileData.awaList.length > 2 && (
                                <TouchableOpacity onPress={handleToggleShowAllAwards}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                                </TouchableOpacity>
                            )}
                            {showAllAwards && (
                                <TouchableOpacity onPress={handleToggleShowAllAwards}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.horizontalLine}></View>
                        <View>
                            <Text style={[commonStyles.headerText11BL, {
                                //marginVertical: height * 0.01,
                            }]}>Blog Links</Text>
                            {profileData.pubList.slice(0, initialBlogToShow).map((blog, index) => (

                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <Image
                                        source={require('../../../assets/img/videoL.png')}
                                        style={{ width: 22, height: 22, marginRight: 10 }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{blog.links}</Text>
                                </View>
                            ))}
                            {!showAllBlog && profileData.pubList.length > 2 && (
                                <TouchableOpacity onPress={handleToggleShowAllBlog}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View More</Text>
                                </TouchableOpacity>
                            )}
                            {showAllBlog && (
                                <TouchableOpacity onPress={handleToggleShowAllBlog}>
                                    <Text style={[commonStyles.headerText3B, { marginVertical: 10 }]}>View Less</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                );
            case 4:
                return (
                    <View>
                        <Text>Content for Tab 5</Text>
                    </View>
                );
            case 5:
                return (
                    <View>
                        <Text>Content for Tab 6</Text>
                    </View>
                );
            default:
                return null;
        }
    };



    return (
        <SafeAreaView style={styles.container}>

            {/* SubContainer with Banner-like Image */}
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={profileData && profileData.profile_banner ? { uri: profileData.profile_banner } : require('../../../assets/img/banner.png')}
                    style={styles.bannerImage}
                >
                    <View style={styles.container1}>
                        <View style={commonStyles.wrapT}>
                            <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                                onPress={() => navigation.goBack()}>
                                <Image
                                    source={require('../../../assets/img/Back.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                            {/* 
                            <Popover
                                placement={PopoverPlacement.LEFT}
                                from={(
                                    <TouchableOpacity
                                        style={commonStyles.backContainer1}
                                    >
                                        <Image
                                            source={require('../../../assets/img/Option.png')}
                                            style={commonStyles.icon}
                                        />
                                    </TouchableOpacity>
                                )}>
                                <View style={styles.popover}>
                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Bookmark.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Save PDF</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/SaveCon.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Save Contact</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Spam.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Report Spam</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Link.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Copy Link</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Popover> */}
                        </View>
                    </View>
                    <View style={styles.profilePicContainer}>
                        {profileData && profileData.profile_pic ? (
                            <Image
                                source={{ uri: profileData.profile_pic }}
                                style={styles.profilePic}
                            />
                        ) : (
                            <Image
                                    source={require('../../../assets/img/defaultOffice2.png')}
                                style={styles.profilePic}
                            />
                        )}
                    </View>

                    <View></View>
                    {/* <View style={styles.textContainer}>
                        <Text style={[commonStyles.headerText1BL, {}]} adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail">Naina Swaroop</Text>
                        <Text style={[commonStyles.headerText2BL, {
                            marginVertical: moderateScale(3),
                        }]} numberOfLines={1} ellipsizeMode="tail">MDS,BDS l Prosthodontics l 10+ years exp</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(10), }}>
                            <Image source={require('../../../assets/img/Location.png')} style={{ width: moderateScale(15), height: moderateScale(17), }} />
                            <Text style={[commonStyles.headerText5BL, {
                                paddingHorizontal: moderateScale(8),
                                lineHeight: moderateScale(18)
                               
                            }]}>Vikhroli, Prosthodntic Care, Mumbai</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(10), }}>
                            <Image source={require('../../../assets/img/languages.png')} style={{ width: moderateScale(15), height: moderateScale(14), }} />
                            <Text style={[commonStyles.headerText5BL, {
                                paddingHorizontal: moderateScale(8),
                                lineHeight: moderateScale(15)

                            }]}>English, Hindi, Marathi</Text>
                        </View>
                        <View>

                        </View>
                
                    </View> */}

                </ImageBackground>
                <View style={styles.subContainer1}>
                    <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText1BL, {}]} adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail">
                            {profileData ? profileData.name : null}
                        </Text>

                        {/* <Text style={[commonStyles.headerText2BL, {
                            marginVertical: 3,
                        }]} numberOfLines={1} ellipsizeMode="tail">{profileData ? profileData.profession : null} ┃ {profileData && profileData.specList.length > 0 ? profileData.specList[0].speciality : null} ┃ {profileData ? profileData.experience : null}</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(10), }}>
                            <Image source={require('../../../assets/img/LocationHome.png')} style={{ width: 15, height: 15, }} />
                            <Text style={[commonStyles.headerText5BL, {
                                paddingHorizontal: 8,
                                lineHeight: 18

                            }]}>Vikhroli, Prosthodntic Care, Mumbai</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(10), }}>
                            <Image source={require('../../../assets/img/languages.png')} style={{ width: 15, height: 15, }} />
                            <Text style={[commonStyles.headerText5BL, {
                                paddingHorizontal: 8,
                                lineHeight: 15

                            }]}>{languages}</Text>
                        </View> */}
                        <View>

                        </View>

                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.containerC}>
                        {/* Left content */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[commonStyles.headerText3BL, { paddingRight: 8 }]}>
                                Key Associate
                            </Text>
                            <Text style={[commonStyles.headerText5G, { textAlign: 'center' }]}>
                                (150+)
                            </Text>
                        </View>

                        <View style={styles.verticleLine}></View>

                        {/* Right content */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Connections')}
                                style={{ flexDirection: 'row', alignItems: 'center', }}
                            >
                                <Text style={[commonStyles.headerText3BL, { paddingRight: 8 }]}>
                                    Connection
                                </Text>
                                <Text style={[commonStyles.headerText5G, { textAlign: 'center' }]}>
                                    (100)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={styles.horizontalLine}></View>

                    {/* <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginVertical: height * 0.005 }}>
                            <View>
                                {buttonState === 'Connect' && (
                                    <TouchableOpacity
                                        style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, }]}
                                        // onPress={handleConnectPress}
                                        onPress={() => setShowPopup1(true)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={commonStyles.buttonTextS}>Connect</Text>
                                    </TouchableOpacity>
                                )}

                                {buttonState === 'Options' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: height * 0.01 }}>

                                        <TouchableOpacity
                                            style={commonStyles.buttonS}
                                            //onPress={() => handleOptionPress('Emphasize')}
                                            onPress={() => setShowPopup(true)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={commonStyles.buttonTextS}>Empanel</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {buttonState === 'Remove' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: height * 0.01 }}>


                                        <TouchableOpacity
                                            style={commonStyles.buttonS1}
                                            onPress={handleConnectPress}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={commonStyles.buttonTextS1}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                style={[commonStyles.buttonS, { marginLeft: height * 0.01 }]}
                                activeOpacity={0.8}
                            >
                                <Text style={commonStyles.buttonTextS}>Key Associate</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setModalConnectVisible(true)}>
                                <Image source={require('../../../assets/img/connections.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
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
                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Bookmark.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Save PDF</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/SaveCon.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Save Contact</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Spam.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Report Spam</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Link.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Copy Link</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Popover>
                         </View>
                    </View>
                    <AlertPopup
                        visible={showPopup1}
                        onRequestClose={() => setShowPopup1(false)}
                        title="Connection Request"
                        message="Do you send Dr. Mridula Radhakrishnan connection request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            setShowPopup1(false);
                            handleConnectPress();
                        }}
                    /> */}

                    {/* <AlertPopup
                        visible={showPopup}
                        onRequestClose={() => setShowPopup(false)}
                        title="Empanelment Request"
                        message="Do you send Dr. Mridula Radhakrishnan empanelment request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            setShowPopup(false);
                            handleOptionPress('Empanel');
                        }}
                    /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginVertical: height * 0.005 }}>
                            <View>
                                {buttonState === 'Connect' && (
                                    <TouchableOpacity
                                        style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, }]}
                                        // onPress={handleConnectPress}
                                        onPress={() => setShowPopup1(true)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={commonStyles.buttonTextS}>Connect</Text>
                                    </TouchableOpacity>
                                )}
                                {buttonState === 'KeyAssociate' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <>
                                            <TouchableOpacity
                                                style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01 }]}
                                                onPress={() => setShowPopup4(true)}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={commonStyles.buttonTextS}>Connected</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                                                onPress={() => setShowPopup(true)}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={commonStyles.buttonTextS}>Key Associate</Text>
                                            </TouchableOpacity>
                                        </>
                                    </View>

                                )}
                                {buttonState === 'Remove' && (
                                    <TouchableOpacity
                                        style={[commonStyles.buttonS1, { marginBottom: height * 0.01, marginTop: height * 0.01, }]}
                                        onPress={() => setShowPopup2(true)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={commonStyles.buttonTextS1}>Cancel Req.</Text>
                                    </TouchableOpacity>
                                )}
                                {buttonState === 'RemoveKey' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <>
                                            <TouchableOpacity
                                                style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01 }]}
                                                onPress={() => setShowPopup4(true)}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={commonStyles.buttonTextS}>Connected</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[commonStyles.buttonS1, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                                                onPress={() => setShowPopup4(true)}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={commonStyles.buttonTextS1}>Cancel Key Req.</Text>
                                            </TouchableOpacity>
                                        </>
                                    </View>

                                )}
                                {buttonState === 'Options' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: height * 0.01 }}>
                                        {/* <TouchableOpacity
                    style={[commonStyles.buttonS1, { marginRight: height * 0.01 }]}
                    onPress={() => handleOptionPress('Message')}
                    activeOpacity={0.8}
                  >
                    <Text style={commonStyles.buttonTextS1}>Message</Text>
                  </TouchableOpacity> */}

                                        <TouchableOpacity
                                            style={commonStyles.buttonS}
                                            //onPress={() => handleOptionPress('Emphasize')}
                                            onPress={() => setShowPopup(true)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={commonStyles.buttonTextS}>Empanel</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {buttonState === 'StatusReq' && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {connectionStatus === '2' && connection ? (
                                            <>
                                                {prid === connection.sender && (
                                                    <TouchableOpacity
                                                        style={[commonStyles.buttonS1, { marginBottom: height * 0.01, marginTop: height * 0.01 }]}
                                                        onPress={() => setShowPopup2(true)}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Text style={commonStyles.buttonTextS1}>Cancel Req.</Text>
                                                    </TouchableOpacity>
                                                )}
                                                {prid === connection.reciever && (
                                                    <TouchableOpacity
                                                        style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01 }]}
                                                        onPress={() => setShowPopup5(true)}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Text style={commonStyles.buttonTextS}>Accept Req</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </>
                                        ) : connectionStatus === '1' ? (
                                            <>
                                                <TouchableOpacity
                                                    style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01 }]}
                                                    onPress={() => setShowPopup2(true)}
                                                    activeOpacity={0.8}
                                                >
                                                    <Text style={commonStyles.buttonTextS}>Connected</Text>
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity
                            style={[commonStyles.buttonS1, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                            onPress={() => setShowPopup(true)}
                            activeOpacity={0.8}
                          >
                            <Text style={commonStyles.buttonTextS1}>Key Assoc.</Text>
                          </TouchableOpacity> */}
                                                {keyAssociateStatus === '0' && (
                                                    <TouchableOpacity
                                                        style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                                                        onPress={() => setShowPopup(true)}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Text style={commonStyles.buttonTextS}>Key Assoc.</Text>
                                                    </TouchableOpacity>
                                                )}
                                                {keyAssociateStatus === '2' && (
                                                    <TouchableOpacity
                                                        style={[commonStyles.buttonS1, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                                                        onPress={() => setShowPopup4(true)}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Text style={commonStyles.buttonTextS1}>Cancel Key Req.</Text>
                                                    </TouchableOpacity>
                                                )}
                                                {keyAssociateStatus === '1' && (
                                                    <TouchableOpacity
                                                        style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, marginLeft: 10 }]}
                                                        onPress={() => setShowPopup4(true)}
                                                        activeOpacity={0.8}
                                                    >
                                                        <Text style={commonStyles.buttonTextS}>Key Associated</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </>
                                        ) : (
                                            <TouchableOpacity
                                                style={[commonStyles.buttonS, { marginBottom: height * 0.01, marginTop: height * 0.01, }]}
                                                onPress={() => setShowPopup1(true)}
                                                activeOpacity={0.8}
                                            >
                                                <Text style={commonStyles.buttonTextS}>Connect</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}


                            </View>
                            {/* <TouchableOpacity
                style={[commonStyles.buttonS, { marginLeft: height * 0.01 }]}
                activeOpacity={0.8}
              >
                <Text style={commonStyles.buttonTextS}>Key Associate</Text>
              </TouchableOpacity> */}

                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setModalConnectVisible(true)}>
                                <Image source={require('../../../assets/img/connections.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
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
                                    {/* <TouchableOpacity
                                        onPress={() => setShowPopupEndorse(true)}>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Endorsement.png')}
                                                style={styles.popoverItemIcon1}
                                            />
                                            <Text style={styles.popoverItemText}>Endorse</Text>
                                        </View>
                                    </TouchableOpacity> */}

                                    <TouchableOpacity>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/SaveCon.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Save Contact</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setShowPopupBlock(true)}
                                    >
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../../assets/img/Spam.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Block Account</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={handleShare}>
                                        <View style={styles.popoverItemContainer}>
                                            <Image
                                                source={require('../../assets/img/Link.png')}
                                                style={styles.popoverItemIcon}
                                            />
                                            <Text style={styles.popoverItemText}>Copy Link</Text>
                                        </View>
                                    </TouchableOpacity> */}
                                </View>
                            </Popover>
                            {/* <Image source={require('../../assets/img/Option.png')} style={{ width: 20, height: 20, marginLeft: width * 0.02 }} /> */}
                        </View>
                    </View>

                    <AlertPopup
                        visible={showPopupBlock}
                        onRequestClose={() => setShowPopupBlock(false)}
                        title="Block Account"
                        message="Are you sure you want to block this account? "
                        yesLabel="Block"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup1(false);
                            // handleConnectPress();
                            setShowPopupBlock(false);
                            sendBlockRequest();
                        }}
                    />

                    <AlertPopup
                        visible={showPopupEndorse}
                        onRequestClose={() => setShowPopupEndorse(false)}
                        title="Endorse Account"
                        message="Are you sure you want to send endorsement to this account? "
                        yesLabel="Endorse"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup1(false);
                            // handleConnectPress();
                            setShowPopupEndorse(false);
                            sendEndorseRequest();
                        }}
                    />


                    <AlertPopup
                        visible={showPopup1}
                        onRequestClose={() => setShowPopup1(false)}
                        title="Connection Request"
                        message="Do you want to send connection request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup1(false);
                            // handleConnectPress();
                            setShowPopup1(false);
                            sendConnectionRequest();
                        }}
                    />

                    <AlertPopup
                        visible={showPopup}
                        onRequestClose={() => setShowPopup(false)}
                        title="Key Associate Request"
                        message="Do you want to send key associate request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup(false);
                            // handleOptionPress('Empanel');
                            setShowPopup(false);
                            sendKeyAssociateRequest();
                        }}
                    />

                    <AlertPopup
                        visible={showPopup2}
                        onRequestClose={() => setShowPopup2(false)}
                        title="Key Associate Request"
                        message="Do you want to cancel connection request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup(false);
                            // handleOptionPress('Empanel');
                            setShowPopup2(false);
                            cancelConnectionRequest();
                        }}
                    />

                    <AlertPopup
                        visible={showPopup4}
                        onRequestClose={() => setShowPopup4(false)}
                        title="Key Associate Request"
                        message="Do you want to cancel key associate request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup(false);
                            // handleOptionPress('Empanel');
                            setShowPopup4(false);
                            cancelKeyAssociateRequest();
                        }}
                    />

                    <AlertPopup
                        visible={showPopup5}
                        onRequestClose={() => setShowPopup5(false)}
                        title="Connection Request"
                        message="Do you want to accept connection request? "
                        yesLabel="Send"
                        noLabel="Cancel"
                        onYesPress={() => {
                            // setShowPopup(false);
                            // handleOptionPress('Empanel');
                            setShowPopup5(false);
                            acceptConnReq();
                        }}
                    />
                    {/* <Modal visible={modalConnectVisible} transparent 
                        onRequestClose={() => setModalConnectVisible(false)}>
                        <TouchableOpacity style={styles.modalContainer} onPress={() => setModalConnectVisible(false)}>
                            <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => { }}>
                                <ScrollView>
                                    <View style={styles.horizontalLineM}></View>
                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                        Contact Information
                                    </Text>
                                    <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                        Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                    </Text>
                                    <View>
                                        <SocialLink platform="contact" username="9876543210" />
                                        <SocialLink platform="email" username="wedeveloptech@gmail.com" />
                                        <SocialLink platform="instagram" username="_wedeveloptech_" />
                                        <SocialLink platform="whatsapp" username="9876543210" />
                                        <SocialLink platform="linkedin" username="wedeveloptech" />
                                        <SocialLink platform="facebook" username="wedeveloptech" />
                                        <SocialLink platform="website" username="https://www.wedeveloptech.com/" />
                                    </View>
                                </ScrollView>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal> */}
                    <Modal
                        visible={modalConnectVisible}
                        transparent
                        onRequestClose={() => setModalConnectVisible(false)}
                    >
                        <TouchableOpacity
                            style={styles.modalContainer}
                            onPress={() => setModalConnectVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}
                            >
                                <ScrollView>
                                    <View style={styles.horizontalLineM}></View>
                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                        Contact Information
                                    </Text>
                                    <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                        Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                    </Text>
                                    <SocialLink platform="email" username={profileData?.email} />
                                    <SocialLink platform="contact" username={profileData?.phoneno} />
                                    <SocialLink platform="contact" username={profileData?.alternate} />
                                    {profileData?.socialList?.map((social, index) => (
                                        Object.entries(social).map(([platform, username]) => (
                                            // Exclude pr_id field and empty usernames
                                            platform !== 'cl_id' && username.trim() !== '' &&
                                            <SocialLink key={platform} platform={platform} username={username} />
                                        ))
                                    ))}
                                </ScrollView>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>

                    <View style={styles.horizontalLine}></View>

                    <View style={styles.containerButton}>
                        {/* ScrollView to contain the buttons */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {/* Button 1 */}
                            <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                                <Text style={[commonStyles.buttonText2H, {}]}>My Clinic</Text>
                                <Image source={require('../../../assets/img/dropdown.png')} style={styles.imageStyle1} />
                            </TouchableOpacity>
                            {/* Button 2 */}
                            <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                                <Text style={[commonStyles.buttonText2H, {}]}>Empanelled Clinic</Text>
                                <Image source={require('../../../assets/img/dropdown.png')} style={styles.imageStyle1} />
                            </TouchableOpacity>
                            {/* Button 3 */}
                            <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                                <Text style={[commonStyles.buttonText2H, {}]}>My Office</Text>
                                <Image source={require('../../../assets/img/dropdown.png')} style={styles.imageStyle1} />
                            </TouchableOpacity>
                            {/* Button 4 */}
                            <TouchableOpacity style={styles.buttonM} activeOpacity={0.8} onPress={toggleModalB}>
                                <Text style={[commonStyles.buttonText2H, {}]}>Associated Offices</Text>
                                <Image source={require('../../../assets/img/dropdown.png')} style={styles.imageStyle1} />
                            </TouchableOpacity>
                        </ScrollView>

                        {/* Modal component */}
                        {/* <Modal visible={modalVisible} transparent>
                            <TouchableWithoutFeedback onPress={() => toggleModalB()}>
                                <View style={styles.modalContainer}>
                                    <TouchableWithoutFeedback>
                                        <ScrollView style={styles.modalContent}>
                                            <View style={styles.horizontalLineM}></View>
                                            <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                               My Clinics
                                            </Text>
                                            <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                                Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    paddingHorizontal: 9,
                                                    borderWidth: 0.5,
                                                    borderRadius: 8,
                                                    borderColor: '#979797',
                                                    marginBottom: 16,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    //height: 80,
                                                    paddingVertical: 8,
                                                    backgroundColor: '#FEFCFC'
                                                }}
                                                activeOpacity={0.8}
                                                onPress={() => navigation.navigate('ClinicProfile')}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={require('../../../assets/img/clinicDefault.jpg')} style={styles.profileImage} />
                                                    <View style={{ flex: 1, }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                            <Text style={[commonStyles.headerText2BL, { lineHeight: 20 }]} numberOfLines={1}>Bhaskar Dental Clinic</Text>
                    
                                                        </View>

                                                        <Text style={[commonStyles.headerText5G, {
                                                            marginVertical: height * 0.01,
                                                        }]} numberOfLines={1}>Implants to Cosmetics</Text>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                                                                <Text style={[commonStyles.headerText5BL, {
                                                                    marginLeft: 4,
                                                                }]} numberOfLines={1}>Ghatkopar, India</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    paddingHorizontal: 9,
                                                    borderWidth: 0.5,
                                                    borderRadius: 8,
                                                    borderColor: '#979797',
                                                    marginBottom: 16,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    //height: 80,
                                                    paddingVertical: 8,
                                                    backgroundColor: '#FEFCFC'
                                                }}
                                                activeOpacity={0.8}
                                                onPress={() => navigation.navigate('ClinicProfile')}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={require('../../../assets/img/clinicDefault1.jpg')} style={styles.profileImage} />
                                                    <View style={{ flex: 1, }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                            <Text style={[commonStyles.headerText2BL, { lineHeight: 20 }]} numberOfLines={1}>Bhaskar Dental Clinic</Text>
                                                        </View>

                                                        <Text style={[commonStyles.headerText5G, {
                                                            marginVertical: height * 0.01,
                                                        }]} numberOfLines={1}>Implants to Cosmetics</Text>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                                                                <Text style={[commonStyles.headerText5BL, {
                                                                    marginLeft:4,
                                                                }]} numberOfLines={1}>Ghatkopar, India</Text>
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal> */}
                        <Modal
                            visible={modalVisible}
                            transparent
                            onRequestClose={toggleModalB}
                        >
                            <TouchableOpacity
                                style={styles.modalContainer}
                                onPress={toggleModalB}
                            >
                                <TouchableOpacity
                                    style={styles.modalContent}
                                    activeOpacity={1}
                                    onPress={() => { }}
                                >
                                    <ScrollView>
                                        <View style={styles.horizontalLineM}></View>
                                        <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                            My Clinics
                                        </Text>
                                        <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                            Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                        </Text>

                                        {clinicData.map(clinic => (
                                            <TouchableOpacity
                                                key={clinic.cl_id}
                                                style={{
                                                    paddingHorizontal: 9,
                                                    borderWidth: 0.5,
                                                    borderRadius: 8,
                                                    borderColor: '#979797',
                                                    marginBottom: 16,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    paddingVertical: 8,
                                                    backgroundColor: '#FEFCFC'
                                                }}
                                                activeOpacity={0.8}
                                                onPress={() => navigation.navigate('MyProfile', { cl_id: clinic.cl_id })}
                                            >

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    {clinic.profile_pic ? (
                                                        <Image
                                                            source={{ uri: clinic.profile_pic }}
                                                            style={styles.profileImage}
                                                        />
                                                    ) : (
                                                        <View style={[styles.profileImage, {
                                                            width: height * 0.09,
                                                            height: height * 0.09,
                                                            borderRadius: 36,
                                                            backgroundColor: '#E8F8FF',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                        }]}>
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>
                                                                {clinic.name ? clinic.name.charAt(0).toUpperCase() : ''}
                                                            </Text>
                                                        </View>
                                                    )}
                                                    {/* <Image source={{ uri: clinic.profile_pic || 'default_image_url' }} style={styles.profileImage} /> */}
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Text style={[commonStyles.headerText2BL, { lineHeight: 20 }]} numberOfLines={1}>{clinic.name}</Text>
                                                        </View>

                                                        <Text style={[commonStyles.headerText5G, { marginVertical: height * 0.01 }]} numberOfLines={1}>Implants to Cosmetics</Text>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Image source={require('../../../assets/img/Location.png')} style={{ width: 10, height: 12 }} />
                                                                <Text style={[commonStyles.headerText5BL, { marginLeft: 4 }]} numberOfLines={1}>Ghatkopar, India</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText11BL, {
                            marginVertical: height * 0.01,
                        }]}>About</Text>
                        {/* <View>
              <Text style={[commonStyles.headerText3BL, {
                textAlign:'justify'
              }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            </View> */}
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {profileData ? (
                                <ReadMoreText
                                    text={profileData.about}
                                    initialLimit={120}
                                />
                            ) : (
                                null
                            )}
                        </View>
                    </View>
                    {/* <View style={styles.horizontalLine}></View> */}
                    {/* <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Contact Info</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.licenceContainer2}>
                                <Image
                                    source={require('../../../assets/img/mailP.png')}
                                    style={commonStyles.icon}
                                />
                            </View>
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText4BL]}>nehaparma@gmail.com</Text>
                                <Text style={[commonStyles.headerText5G]}>Email</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.licenceContainer2}>
                                <Image
                                    source={require('../../../assets/img/contactP1.png')}
                                    style={commonStyles.icon}
                                />
                            </View>
                            <View style={{ marginLeft: 15, alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText4BL]}>+91 9876543210</Text>
                                <Text style={[commonStyles.headerText5G]}>Phone Number</Text>
                            </View>
                        </View>
                    </View> */}

                    <View style={styles.horizontalLine}></View>

                    <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Clinic Timings</Text>
                        {/* <View style={{ marginTop: 10 }}>
                            {profileData && profileData.timeList && profileData.timeList.map((time, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <Image
                                        source={require('../../../assets/img/dot.png')}
                                        style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{time.day} :</Text>
                                    <Text style={[commonStyles.headerText3BL, {}]}>{`${time.start_time} - ${time.end_time}`}</Text>
                                </View>
                            ))}
                        </View> */}

                        {/* <View style={{ marginTop: 10 }}>
                            {profileData && profileData.timeList && profileData.timeList.map((time, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <Image
                                        source={require('../../../assets/img/dot.png')}
                                        style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                    />
                                    <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{time.day} :</Text>
                                    <Text style={[commonStyles.headerText3BL, {}]}>{`${time.start_time.slice(0, 5)} - ${time.end_time.slice(0, 5)}`}</Text>
                                </View>
                            ))}
                        </View> */}

                        <View style={{ marginTop: 10 }}>
                            {profileData && profileData.timeList && profileData.timeList.map((time, index) => {
                                // Function to convert 24-hour time to 12-hour time with AM/PM
                                const convertTo12HourFormat = (timeStr) => {
                                    const [hours, minutes] = timeStr.split(':');
                                    let period = 'AM';
                                    let hour = parseInt(hours, 10);

                                    if (hour >= 12) {
                                        period = 'PM';
                                        if (hour > 12) {
                                            hour -= 12;
                                        }
                                    }
                                    if (hour === 0) {
                                        hour = 12; // 12 AM
                                    }

                                    return `${hour}:${minutes} ${period}`;
                                };

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                        <Image
                                            source={require('../../../assets/img/dot.png')}
                                            style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                        />
                                        <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>{time.day} :</Text>
                                        <Text style={[commonStyles.headerText3BL, {}]}>{`${convertTo12HourFormat(time.start_time)} - ${convertTo12HourFormat(time.end_time)}`}</Text>
                                    </View>
                                );
                            })}
                        </View>


                        {/* <View style={{ marginTop: 10 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <Image
                                    source={require('../../../assets/img/dot.png')}
                                    style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                />
                                <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>Mon - Wed</Text>
                                <Text style={[commonStyles.headerText3BL, {}]}>9:00 AM - 8:00 PM</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <Image
                                    source={require('../../../assets/img/dot.png')}
                                    style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                />
                                <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>Thursday</Text>
                                <Text style={[commonStyles.headerText3BL, {}]}>10:00 AM - 5:00 PM</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: height * 0.005 }}>
                                <Image
                                    source={require('../../../assets/img/dot.png')}
                                    style={{ width: 8, height: 8, marginHorizontal: 10 }}
                                />
                                <Text style={[commonStyles.headerText3BL, { marginRight: 10 }]}>Friday - Saturday</Text>
                                <Text style={[commonStyles.headerText3BL, {}]}>10:00 AM - 8:00 PM</Text>
                            </View>
                        </View> */}
                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.aboutContainer}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Dental Members</Text>
                        <View style={{ marginTop: 10 }}>
                            <View>
                                <Text style={[commonStyles.headerText4BL]}>Chief Dentist</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
                                    activeOpacity={0.8}
                                    style={styles.contentContainer}>
                                    <Image
                                        source={require('../../../assets/img/DummyProfile1.png')}
                                        style={styles.imageGridS}
                                    />
                                    <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                                        <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                                        <Text style={[commonStyles.headerText4G, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={[commonStyles.headerText4BL, { marginTop: 10 }]}>Empanelled Dental Members</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
                                        activeOpacity={0.8}
                                        style={styles.contentContainer}>
                                        <Image
                                            source={require('../../../assets/img/DummyProfile2.png')}
                                            style={styles.imageGridS}
                                        />
                                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                                            <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                                            <Text style={[commonStyles.headerText4G, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
                                        activeOpacity={0.8}
                                        style={styles.contentContainer}>
                                        <Image
                                            source={require('../../../assets/img/DummyProfile3.png')}
                                            style={styles.imageGridS}
                                        />
                                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                                            <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                                            <Text style={[commonStyles.headerText4G, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProfileScreen', { professionalId: 1 })}
                                        activeOpacity={0.8}
                                        style={styles.contentContainer}>
                                        <Image
                                            source={require('../../../assets/img/DummyProfile1.png')}
                                            style={styles.imageGridS}
                                        />
                                        <View style={{ marginTop: height * 0.005, paddingHorizontal: width * 0.01 }}>
                                            <Text style={[commonStyles.headerText4BL, { marginTop: height * 0.005 }]} numberOfLines={1} ellipsizeMode="tail">Dr. Adil Mehta</Text>
                                            <Text style={[commonStyles.headerText4G, {}]} numberOfLines={1} ellipsizeMode="tail">BDS, MDS(Endoden...</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    {/* <View style={[styles.aboutContainer, { marginBottom: 10 }]}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Licence Number</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                            <View style={{ alignSelf: 'center' }}>

                                <Text style={[commonStyles.headerText2BL]}>
                                    {profileData ? profileData.license : null}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.aboutContainer, { marginBottom: 10 }]}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Registration Number</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText2BL]}>
                                    {profileData ? profileData.reg_no : null}
                                </Text>
                            </View>
                        </View>
                    </View> */}

                    <View style={[styles.aboutContainer, {}]}>
                        <Text style={[commonStyles.headerText11BL, {
                            //marginVertical: height * 0.01,
                        }]}>Payment Link</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>

                            <View style={{ alignSelf: 'center' }}>
                                <Text style={[commonStyles.headerText2BL]}>
                                    {profileData ? profileData.payment : null}
                                </Text>
                                {/* <Text style={styles.licText}>Andhra Pradesh State Dental Council</Text> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    {/* <View style={styles.aboutContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[commonStyles.headerText11BL, {}]}>Educational Details</Text>
                        </View>

                        {educationData && educationData.slice(0, showAll ? educationData.length : 2).map((education, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginVertical: 8 }}>
                                <View style={styles.licenceContainer}>
                                    <Image
                                        source={require('../../../assets/img/Education11.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 20, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]} adjustsFontSizeToFit>{education.licNo}</Text>
                                    <Text style={[commonStyles.headerText5G]}>{education.licText}</Text>
                                </View>
                            </View>
                        ))}

                        {!showAll && educationData && educationData.length > 2 && (
                            <View>
                                <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAll} activeOpacity={0.8}>
                                    <Text style={commonStyles.buttonText1}>Show all {educationData.length} educations</Text>
                                    <Image source={require('../../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                                </TouchableOpacity>
                            </View>
                        )}
                        {showAll && (
                            <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAll} activeOpacity={0.8}>
                                <Text style={commonStyles.buttonText1}>Hide all educations</Text>
                                <Image source={require('../../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                            </TouchableOpacity>
                        )}
                    </View> */}

                    {/* 
                    <View style={styles.horizontalLine}></View> */}
                    {/* <View>
                        <View style={styles.aboutContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    //marginVertical: height * 0.01,
                                }]}>Experience</Text>
                            </View>

                            {experienceData && experienceData.slice(0, showAll ? experienceData.length : 2).map((experience, index) => (
                                <View key={index} style={{ flexDirection: 'row', marginVertical: 8 }}>
                                    <View style={styles.licenceContainer}>
                                        <Image
                                            source={require('../../../assets/img/Experience11.png')}
                                            style={commonStyles.icon}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 20, alignSelf: 'center' }}>
                                        <Text style={[commonStyles.headerText4BL]} adjustsFontSizeToFit>{experience.company}</Text>
                                        <Text style={[commonStyles.headerText5G]}>{experience.designation}</Text>
                                    </View>
                                </View>
                            ))}

                            {!showAllExp && experienceData && experienceData.length > 2 && (
                                <View>
                                    <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAllExp} activeOpacity={0.8}>
                                        <Text style={commonStyles.buttonText1}>Show all {experienceData.length} experiences </Text>
                                        <Image source={require('../../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                                    </TouchableOpacity>
                                </View>

                            )}
                            {showAllExp && (
                                <TouchableOpacity style={styles.uploadButtonS} onPress={toggleShowAllExp} activeOpacity={0.8}>
                                    <Text style={commonStyles.buttonText1}>Hide all experiences</Text>
                                    <Image source={require('../../../assets/img/RightArrow.png')} style={styles.imageStyle} />
                                </TouchableOpacity>
                            )}
                        </View>

                    </View> */}
                    {/* <View style={styles.horizontalLine}></View> */}
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.staticButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 0 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(0)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 1 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(1)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 2 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(2)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.tabText, selectedTab === 2 && styles.selectedTabText]}>Publications</Text>
                        </TouchableOpacity>
                    </ScrollView> */}

                    <ScrollView style={styles.tabContainer} horizontal showsHorizontalScrollIndicator={false} >
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 0 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(0)}
                            activeOpacity={0.8}
                        >

                            <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 1 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(1)}
                            activeOpacity={0.8}
                        >

                            <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Treatments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 2 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(2)}
                            activeOpacity={0.8}
                        >

                            <Text style={[styles.tabText, selectedTab === 2 && styles.selectedTabText]}>Services</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 3 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(3)}
                            activeOpacity={0.8}
                        >

                            <Text style={[styles.tabText, selectedTab === 3 && styles.selectedTabText]}>Key Forte</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 4 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(4)}
                            activeOpacity={0.8}
                        >

                            <Text style={[styles.tabText, selectedTab === 4 && styles.selectedTabText]}>Publications</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
              style={[styles.tabItem, selectedTab === 4 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(4)}
            >
              <Text style={[styles.tabText, selectedTab === 4 && styles.selectedTabText]}>Tab 5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabItem, selectedTab === 5 && styles.selectedTabItem]}
              onPress={() => setSelectedTab(5)}
            >
              <Text style={[styles.tabText, selectedTab === 5 && styles.selectedTabText]}>Tab 6</Text>
            </TouchableOpacity> */}
                    </ScrollView>

                    {/* Bottom section to show selected tab content */}
                    <View style={styles.selectedTabContent}>
                        {/* Render selected tab content */}
                        {renderTabContent()}
                    </View>

                    {/* Tabs */}
                    {/* <ScrollView style={styles.tabContainer} horizontal showsHorizontalScrollIndicator={false} >
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 0 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(0)}
                            activeOpacity={0.8}
                        >
                            {selectedTab === 0 ? (
                                <Image source={require('../../../assets/img/gallery-white.png')} style={styles.tabImage} />
                            ) : (
                                <Image source={require('../../../assets/img/gallery-blue.png')} style={styles.tabImage} />
                            )}
                            <Text style={[styles.tabText, selectedTab === 0 && styles.selectedTabText]}>Social Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 1 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(1)}
                            activeOpacity={0.8}
                        >
                            {selectedTab === 1 ? (
                                <Image source={require('../../../assets/img/gallery-white.png')} style={styles.tabImage} />
                            ) : (
                                <Image source={require('../../../assets/img/gallery-blue.png')} style={styles.tabImage} />
                            )}
                            <Text style={[styles.tabText, selectedTab === 1 && styles.selectedTabText]}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 2 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(2)}
                            activeOpacity={0.8}
                        >
                            {selectedTab === 2 ? (
                                <Image source={require('../../../assets/img/gallery-white.png')} style={styles.tabImage} />
                            ) : (
                                <Image source={require('../../../assets/img/gallery-blue.png')} style={styles.tabImage} />
                            )}
                            <Text style={[styles.tabText, selectedTab === 2 && styles.selectedTabText]}>Publications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 3 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(3)}
                            activeOpacity={0.8}
                        >
                            {selectedTab === 3 ? (
                                <Image source={require('../../../assets/img/gallery-white.png')} style={styles.tabImage} />
                            ) : (
                                <Image source={require('../../../assets/img/gallery-blue.png')} style={styles.tabImage} />
                            )}
                            <Text style={[styles.tabText, selectedTab === 3 && styles.selectedTabText]}>Services</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabItem, selectedTab === 4 && styles.selectedTabItem]}
                            onPress={() => setSelectedTab(4)}
                            activeOpacity={0.8}
                        >
                            {selectedTab === 4 ? (
                                <Image source={require('../../../assets/img/gallery-white.png')} style={styles.tabImage} />
                            ) : (
                                <Image source={require('../../../assets/img/gallery-blue.png')} style={styles.tabImage} />
                            )}
                            <Text style={[styles.tabText, selectedTab === 4 && styles.selectedTabText]}>More</Text>
                        </TouchableOpacity>

                    </ScrollView> */}

                    {/* Render selected tab content */}
                    {/* {renderTabContent()} */}

                </View>

            </ScrollView>

            {showImage && (
                <TouchableOpacity
                    onPress={handleImageClick}
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        right: 20,
                    }}
                >
                    <Image
                        source={require('../../../assets/img/DropCard.png')}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
            )}

            <AlertPopup
                visible={showAlert}
                onRequestClose={() => setShowAlert(false)}
                title="Drop a Card"
                message="Do you really want to send drop card?"
                yesLabel="Yes"
                noLabel="No"
                onYesPress={handleConfirm}
                onNoPress={handleCancel}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        borderRadius: 10, // Adjust the border top radius as needed
        overflow: 'hidden',
        marginVertical: 10,
        width: width * 0.3,
        justifyContent: 'center',
        alignItems: 'center'

    },
    imageGridS: {
        width: width * 0.2,
        height: width * 0.2
    },
    staticButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 8,
        backgroundColor: '#FFF',
        paddingVertical: 1,
        marginBottom: height * 0.03,
        borderWidth: 1, // Add border top
        borderColor: '#ccc', // Border color
        borderRadius: 10,
        marginTop: 2
    },
    selectedTabText: {
        alignSelf: 'center',
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontSize: responsiveFontSize(15),
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    tabImage: {
        width: 17,
        height: 15,
    },
    tabText: {
        fontSize: responsiveFontSize(15),
        alignSelf: 'center',
        color: '#121212',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'DMSans-Medium',
        paddingVertical: 1,
        lineHeight: height * 0.028 //28
    },
    selectedTabItem: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#289EF5',
        opacity: 1,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: height * 0.005,
        marginRight: 12,  // Adjust this value
        paddingHorizontal: height * 0.01,
        marginBottom: height * 0.03,
    },
    tabItem: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#E8F8FF',
        opacity: 1,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: height * 0.005,
        marginRight: 12,  // Adjust this value
        paddingHorizontal: height * 0.01,
        marginBottom: height * 0.03,
    },
    tabContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    imageStyle: {
        width: 17,
        height: 15,
        marginLeft: 10
    },
    imageStyle1: {
        width: 20,
        height: 15,
        marginLeft: 5
    },
    uploadButtonS: {
        //padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextU: {
        color: '#289EF5',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Mukta-SemiBold',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        //paddingVertical: 6,
        //paddingHorizontal: 20
    },
    container1: {
        paddingHorizontal: 20,
        marginTop: 10
    },
    subContainer: {
        //marginTop: 6,
        //marginBottom: 30
    },
    subContainer1: {
        marginTop: 30,
        paddingHorizontal: 16,
    },
    bannerImage: {
        width: '100%',
        height: 141, // Height adjusted to maintain a 16:9 aspect ratio
        //aspectRatio: 16 / 9, // Set aspect ratio to maintain 16:9 aspect ratio
        resizeMode: 'cover',
        position: 'relative',
    },

    profilePicContainer: {
        position: 'absolute',
        top: '40%', // Adjust this value to control the overlap
        left: 20, // Adjust this value to control the position
        borderWidth: 3,
        borderColor: '#FEFCFC',
        borderRadius: 75, // Half of the width and height to make it circular
        overflow: 'hidden',
    },
    profilePic: {
        width: 110,
        height: 110,
        resizeMode: 'cover',
    },
    textContainer: {
        position: 'absolute',
        top: '130%',
        left: 0,
        right: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,// Adjust the background color and opacity
    },
    titleText: {
        color: '#000',
        fontSize: 24,
        fontFamily: 'Mukta-Bold',
        lineHeight: 30,
    },
    subtitleText: {
        color: '#000',
        fontSize: 17,
        lineHeight: 22,
        fontFamily: 'Mukta-Medium'
    },
    collapsedText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Mukta-Regular',
        lineHeight: 21,
    },
    collapsedTextT: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Mukta-Regular',
    },
    subtitle1Text: {
        color: '#000',
        fontSize: 14,
    },
    button: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,

    },
    buttonR: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.43,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,

    },
    buttonRE: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.43,
        backgroundColor: "#FFF",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderColor: "#289EF5",
        borderWidth: 1

    },
    buttonM: {
        //alignSelf: 'center',
        // height: height * 0.06,
        // backgroundColor: "#FFF",
        // borderRadius: 8,
        // borderBottomLeftRadius: 10,
        // //justifyContent: "center",
        // alignItems: "center",
        // marginVertical: 10,
        flexDirection: 'row',
        // paddingLeft: 10, // Adjust this value as needed for spacing
        alignSelf: 'center',
        //height: moderateScale(16),
        backgroundColor: "#FFF",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#979797',
        borderWidth: 0.5,
        paddingVertical: 6,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.03,
        marginRight: 10
    },
    buttonTextM: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    buttonTextE: {
        color: '#289EF5',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    rowsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    rowContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '18%', // Adjust the width as needed
        marginBottom: 10,
    },
    rowImage: {
        width: 47,
        height: 47,
        borderRadius: 30, // Half of the width and height to make it circular
        marginBottom: 5,
    },
    rowName: {
        color: '#000',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Mukta-Regular',
        textAlign: 'center',
    },
    containerC: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10// Add horizontal padding to ensure elements don't stick to the edges
    },
    verticleLine: {
        height: '80%', // Adjust height as needed
        width: 1,
        backgroundColor: '#979797',
        //marginHorizontal: moderateScale(10), // Add horizontal margin to space it out from text
    },

    horizontalLine: {
        width: '100%',
        height: 1,
        marginVertical: 12,
        //marginHorizontal: 10,
        backgroundColor: '#979797',
    },
    aboutContainer: {
        marginVertical: 2
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginBottom: 5,
        fontFamily: 'Mukta-Medium',
    },

    licenceContainer: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //marginTop: 10
    },
    licenceContainer1: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //marginTop: 10
    },
    licenceContainer2: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //marginTop: 10
    },
    licNo: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Mukta-Medium',
        lineHeight: 21,
    },
    licText: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'Mukta-Regular',
        lineHeight: 21,
    },
    licText1: {
        fontSize: 12,
        color: '#979797',
        fontFamily: 'Mukta-Regular',
        lineHeight: 21,
    },
    licA: {
        fontSize: 14,
        color: '#494949',
        lineHeight: 19,
        fontFamily: 'Mukta-Regular',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end', // Change from 'center' to 'flex-end'
        alignItems: 'center',
    },
    containerButton: {
        marginVertical: height * 0.01,
    },
    // modalContainer: {
    //     width: '100%',
    //     maxHeight: '90%',
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 10,
    //     padding: 20,
    //     alignSelf: 'flex-end', // Set to 'flex-end' to start the modal from the bottom
    // },

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
    inputContainerC: {
        borderRadius: 24,
        backgroundColor: 'transparent',
        height: 54,
        flexDirection: 'row'
    },
    modalHeaderText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 10,
        marginBottom: 10
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#979797',
        borderTopColor: '#979797'
    },
    toggleLabel: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Mukta-Bold',
    },

    toggleButton: {
        padding: 10,
    },
    toggleIcon: {
        width: 24,
        height: 24,
    },
    dropdownContainer: {
        //justifyContent: 'center',
        //alignSelf: 'center',
        position: 'relative',
        marginVertical: 10,

    },
    labelC: {
        fontSize: 16,
        color: '#000',
        marginRight: 5,
        fontFamily: 'Mukta-Bold',
        marginTop: 12
    },
    labelD: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Mukta-Bold',
    },
    yearDropdown: {
        borderWidth: 1,
        borderColor: '#F4F4F4',
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#F4F4F4', // Background color
        width: 100, // Adjust the width as needed
        alignItems: 'center',
        justifyContent: 'center',
        height: 54,
    },
    inputM: {
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#979797',

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
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginVertical: 20,
    },
    imageContainer: {
        width: '30%',
        height: '30%',
        aspectRatio: 1,
        position: 'relative',
        marginVertical: 7,
    },
    defaultImageU: {
        flex: 1,
        width: '100%',
    },
    headerText3BL: {
        fontSize: 15,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.022, //28
        marginTop: 20,
        paddingTop: 20
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
    profileImage: {
        height: height * 0.09,
        width: height * 0.09,
        borderRadius: 36,
        marginRight: 10
    },
});

export default ClinicProfile;
