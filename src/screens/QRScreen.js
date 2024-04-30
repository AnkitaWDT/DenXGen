/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import commonStyles from '../components/CommonStyles';
import { useFocusEffect } from '@react-navigation/native';
import Animation from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale } from 'react-native-size-matters';
import axios from 'axios';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const QRScreen = ({ navigation, route }) => {
    const [opacity, setOpacity] = useState(new Animated.Value(1));
    const [isExpanded, setIsExpanded] = useState(false);
    const [rotation] = useState(new Animated.Value(0));

    const rotateImage = () => {
        Animated.timing(rotation, {
            toValue: 1,
            duration: 5000, // 5 seconds
            useNativeDriver: true,
        }).start(() => {
            // Animation finished
            Animated.timing(rotation, {
                toValue: 0,
                duration: 0, // Instantly revert
                useNativeDriver: true,
            }).start(() => {
                // Set state to collapse the expanded view
                setIsExpanded(false);
            });
        });
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });


    
    // const handleSwapPress = () => {
    //     setProfileImage(
    //         profileImage === require('../../assets/img/Profile.png')
    //             ? require('../../assets/img/DentalD.png')
    //             : require('../../assets/img/Profile.png')
    //     );
    //     setTitle(
    //         title === 'Dr. Naina Swaroop'
    //             ? 'ZeNiL Dental Studio'
    //             : 'Dr. Naina Swaroop'
    //     );
    //     setSubtitle(
    //         subtitle === 'Root canal Specialist'
    //             ? 'Plastic and Cosmetic Surgeon'
    //             : 'Root canal Specialist'
    //     );
    //     // // Fade out animation
    //     // Animated.timing(opacity, {
    //     //     toValue: 0,
    //     //     duration: 300, // Adjust duration as needed
    //     //     easing: Easing.linear, // Adjust easing as needed
    //     //     useNativeDriver: true, // For better performance
    //     // }).start(() => {
    //     //     // After fade out animation, update content and fade in
    //     //     setProfileImage(
    //     //         profileImage === require('../../assets/img/Profile.png')
    //     //             ? require('../../assets/img/DentalD.png')
    //     //             : require('../../assets/img/Profile.png')
    //     //     );
    //     //     setTitle(
    //     //         title === 'Dr. Naina Swaroop'
    //     //             ? 'ZeNiL Dental Studio'
    //     //             : 'Dr. Naina Swaroop'
    //     //     );
    //     //     setSubtitle(
    //     //         subtitle === 'Root canal Specialist'
    //     //             ? 'Plastic and Cosmetic Surgeon'
    //     //             : 'Root canal Specialist'
    //     //     );

    //     //     // Fade in animation
    //     //     Animated.timing(opacity, {
    //     //         toValue: 1,
    //     //         duration: 300, // Adjust duration as needed
    //     //         easing: Easing.linear, // Adjust easing as needed
    //     //         useNativeDriver: true, // For better performance
    //     //     }).start();
    //     // });
    // };

    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
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

            // Return a cleanup function (optional)
            return () => {
                // You can perform cleanup here if needed
            };
        }, [])
    );
    




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
    

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const [prid, setPrid] = useState(null);
    const [prName, setPrName] = useState('');
    const [prPic, setPrPic] = useState('');

    const fetchData = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);
            setPrid(id);
            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getvic-ax.php?prid=${id}`);
            const data = await response.json();
            setPrName(data.data.name);
            setPrPic(data.data.profile_pic)
            //setDefaultName({ name: data.data.name, profile_pic: data.data.profile_pic, id: data.data.id });
        } catch (error) {
            console.error('Error fetching default name:', error);
        }
    };


    const deviceWidth = Dimensions.get('window').width;
    const deviceHeight = Dimensions.get('window').height;

    const [modalVisible, setModalVisible] = useState(false);

    const handleSwapPress = () => {
        // Toggle the modal visibility state
        setModalVisible(!modalVisible);
    };

    const [selectedItem, setSelectedItem] = useState({
        type: 'My Account',
        id: prid,
        name: prName,
        profilePic: prPic
    });

    const [activeItem, setActiveItem] = useState('');
    const [defaultName, setDefaultName] = useState({ name: '', profile_pic: '' });
    //const [profilePic, setProfilePic] = useState('');

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('Root canal Specialist');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        setActiveItem(prName);
        setTitle(prName);
    }, [prName]);

    useEffect(() => {
        setProfilePic(prPic);
    }, [prPic]);

    
    const handleItemSelection = async (name, profilePic, type, id) => {
        setSelectedItem({ name, profilePic, type }); // Update selected item
        setModalVisible(false);
        setActiveItem(name);
        setTitle(name); // Update title
        //setProfilePic(profilePic ? { uri: profilePic } : require('../../assets/img/Profile.png'));


    };

console.log('Active Item:', activeItem);
    console.log('Active profileImage:', profilePic);


    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Animation />
            ) : (
                    <View style={{ flex: 1 }}>
                        <View style={styles.container1}>
                            <View style={commonStyles.wrapT}>
                                <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                                 onPress={() => navigation.navigate('HomeScreen')}>
                                    <Image
                                        source={require('../../assets/img/Back.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                                <Text style={commonStyles.backText}></Text>
                                <TouchableOpacity
                                    style={commonStyles.backContainer1} activeOpacity={0.8}
                                    onPress={handleSwapPress}
                                >
                                    <Image
                                        source={require('../../assets/img/swap.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                          
                            <View style={styles.subContainer}>
                                <View style={commonStyles.logoIcon}>
                                    <Image
                                        source={require('../../assets/img/DenXGenLogo.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={styles.scannerIcon}>
                                    <Image
                                        source={require('../../assets/img/QRCode.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={styles.blueContainer}>
                                    <Animated.View style={{ opacity }}>
                                        <TouchableOpacity
                                            //style={styles.profileIcon1}
                                            activeOpacity={0.8}
                                            onPress={() => navigation.navigate('PersonalProfile')}
                                        >
                                            <Image
                                                source={{ uri: profilePic }}
                                                style={styles.profileIcon1}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.titleContainer}>
                                            <Text style={styles.title}>{title}</Text>
                                            <Text style={styles.subtitle}>{subtitle}</Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>
                        </ScrollView>
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
                                            onPress={() => handleItemSelection(prName, prPic, 'My Account', prid)}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {prPic ? (
                                                    <Image
                                                        source={{ uri: prPic }}
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
                                                            {prName ? prName.charAt(0).toUpperCase() : ''}
                                                        </Text>
                                                    </View>
                                                )}
                                                <Text style={[commonStyles.headerText2BL, { marginHorizontal: height * 0.02 }]}>
                                                    {prName}
                                                </Text>
                                            </View>
                                            {/* Check if this is the active item, and display DotActive accordingly */}
                                            {activeItem === prName ? (
                                                <View style={commonStyles.activeIcon}>
                                                    <Image
                                                        source={require('../../assets/img/DotActive.png')}
                                                        style={commonStyles.icon}
                                                    />
                                                </View>
                                            ) : (
                                                <View style={commonStyles.activeIcon}>
                                                    <Image
                                                        source={require('../../assets/img/Active.png')}
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
                                                                    source={require('../../assets/img/DotActive.png')}
                                                                    style={commonStyles.icon}
                                                                />
                                                            </View>
                                                        ) : (
                                                            <View style={commonStyles.activeIcon}>
                                                                <Image
                                                                    source={require('../../assets/img/Active.png')}
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
                                                                    source={require('../../assets/img/DotActive.png')}
                                                                    style={commonStyles.icon}
                                                                />
                                                            </View>
                                                        ) : (
                                                            <View style={commonStyles.activeIcon}>
                                                                <Image
                                                                    source={require('../../assets/img/Active.png')}
                                                                    style={commonStyles.icon}
                                                                />
                                                            </View>
                                                        )}
                                                    </TouchableOpacity>
                                                ))}
                                                {clinicData.length > 0 && <View style={{ height: 1, backgroundColor: '#ccc', marginBottom: 10, marginTop: 5 }} />}
                                            </>
                                        )}


                                    </ScrollView>

                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                </View>
    
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingTop: 10,
        //paddingHorizontal: 20,
    },
    container1: {
        paddingHorizontal: 20,
    },
    subContainer: {
        marginVertical: 6,
    },
    blueContainer: {
        backgroundColor: 'rgba(40, 158, 245, 0.8)', // semi-transparent blue color
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '10%',
        height: '100%',
        justifyContent: 'flex-start',
        marginTop: '5%',
        paddingBottom: 30
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        color: '#FEFCFC',
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'DMSans-Medium',
    },
    scannerIcon: {
        height: height * 0.3,
        width: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: height * 0.05,
    },
    profileIcon1: {
        height: height * 0.25, 
        width: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 1
    },
    subtitle: {
        color: '#FEFCFC',
        fontSize: 21,
        fontWeight: '400',
         fontFamily: 'DMSans-Medium',
    },
    scrollView: {
        flexGrow: 1,
        marginTop: 10
    },
    expandedImageContainer: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // semi-transparent black overlay
        zIndex: 1,
    },
});

export default QRScreen;
