/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Animation from '../../components/Loader';
import AlertPopup from '../../components/AlertPopup';
import { API_CONFIG } from '../../API/APIConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};



const MyProfile = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

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
            fetchConfigData();

            // Return a cleanup function (optional)
            return () => {
                // You can perform cleanup here if needed
            };
        }, [])
    );

    const [version, setVersion] = useState('');
    const [developerUrl, setDeveloperUrl] = useState('');

    const fetchConfigData = async () => {
        try {
            const response = await fetch(API_CONFIG.CONFIG_FILE);
            const data = await response.json();
            console.log(data);
            const { appversion, developerurl } = data.data;
            setVersion(appversion);
            setDeveloperUrl(developerurl);
        } catch (error) {
            console.error('Error fetching config data:', error);
        }
    };

  const openWebView = (url, pageName) => {
      navigation.navigate('WebViewScreen', { url: developerUrl, pageName: 'WeDevelopTech' });
  };

    const [selectedItem, setSelectedItem] = useState({ name: '', profilePic: '', id: '', type: '' });

    useEffect(() => {
        const fetchSelectedItemData = async () => {
            try {
                const selectedName = await AsyncStorage.getItem('selected_name');
                const selectedProfilePic = await AsyncStorage.getItem('selected_profile_pic');
                const selectedId = await AsyncStorage.getItem('selected_id');
                const type = await AsyncStorage.getItem('selected_type');
                setSelectedItem({ name: selectedName, profilePic: selectedProfilePic, id: selectedId, type: type });
            } catch (error) {
                console.error('Error fetching selected item data:', error);
            }
        };

        const focusListener = navigation.addListener('focus', () => {
            fetchSelectedItemData();
        });

        // Clean up the listener
        return () => {
            focusListener();
        };
    }, []);

    const renderProfileImage = () => {
        if (selectedItem.profilePic) {
            return <Image source={{ uri: selectedItem.profilePic }} style={styles.profileImage} />;
        } else if (selectedItem.name) {
            return (
                <View style={[styles.profileImage, {
                    width: 70,
                    height: 70,
                    borderRadius: 36,
                    backgroundColor: '#E8F8FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#979797' }}>{selectedItem.name.charAt(0).toUpperCase()}</Text>
                </View>
            );
        } else {
            // Handle the case when both profile picture and name are null
            return (
                <View style={styles.profileImage}>
                    <Text style={styles.initials}>NA</Text>
                </View>
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Animation />
            ) : (
                    <View style={{ flex: 1 }}>
                    <View>
                        <View style={commonStyles.wrapT}>
                            <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}>
                                <Image
                                    //source={require('../../../assets/img/Back.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                            <Text style={commonStyles.backText}>My Profile</Text>
                            <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                                <Image
                                    source={require('../../../assets/img/Option.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                        <View>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    // onPress={() => navigation.navigate('PersonalProfile')}                            
                                 style={styles.profileRowContainer}>
                                    <View style={styles.profileImageContainer}>
                                        <Image source={require('../../../assets/img/clinicDefault.jpg')} style={styles.profileImage} />
                                    </View>
                                    <View style={styles.profileInfoContainer}>
                                        <Text style={[commonStyles.headerText0BL, {}]} adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail">Naina Swaroop</Text>
                                        <Text style={[commonStyles.headerText2BL, {
                                            marginVertical: 3,
                                        }]} numberOfLines={1} ellipsizeMode="tail">MDS,BDS ┃ Prosthodontics ┃ 10+ years exp</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        console.log('TouchableOpacity pressed');
                                        console.log('Selected item:', selectedItem);
                                        // Check the selected item type
                                        switch (selectedItem.type) {
                                            case 'My Account':
                                                console.log('Navigating to PersonalProfile');
                                                navigation.navigate('PersonalProfile');
                                                break;
                                            case 'Clinic Account':
                                                console.log('Navigating to MyClinic');
                                                navigation.navigate('MyClinic', { cl_id: selectedItem.id });
                                                break;
                                            case 'Office Account':
                                                console.log('Navigating to My Office');
                                                navigation.navigate('MyOffice', { off_id: selectedItem.id });
                                                // You can choose not to navigate or perform any other action
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                >
                                    <View style={styles.profileRowContainer}>
                                        <View style={styles.profileImageContainer}>
                                            {renderProfileImage()}
                                        </View>
                                        <View style={styles.profileInfoContainer}>
                                            <Text style={[commonStyles.headerText0BL, {}]} adjustsFontSizeToFit numberOfLines={1} ellipsizeMode="tail">{selectedItem.name}</Text>
                                            {/* <Text>Other profile info</Text> */}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                              

                            {/* <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('ManageAddress')}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/img/Address.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
                                    <Text style={styles.leftText}>Address</Text>

                                </View>

                        
                            </TouchableOpacity> */}

                            {/* Horizontal line */}
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                           

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Notifications')}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/img/Notification.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                    <Text style={styles.leftText}>Notifications</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>Block Account</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(02 others)</Text>
                            </View> */}
                                </View>

                                {/* Right side content */}
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                            </TouchableOpacity>

                            {/* Horizontal line */}
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/Rating.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                    <Text style={styles.leftText}>Rate App</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>Receive Request</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(54+ others)</Text>
                            </View> */}

                                </View>

                                {/* Right side content */}
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                            </TouchableOpacity>


                            {/* Horizontal line */}
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/img/About.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                    <Text style={styles.leftText}>About Us</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>Receive Request</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(54+ others)</Text>
                            </View> */}

                                </View>

                                {/* Right side content */}
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                            </TouchableOpacity>


                            {/* Horizontal line */}
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                                <TouchableOpacity
                                    style={styles.CContainer}
                                    activeOpacity={0.8}
                                    //onPress={() => navigation.navigate('PersonalProfile')}
                                >
                                    {/* Left side content */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/Terms.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                        <Text style={styles.leftText}>Terms & Conditions</Text>

                                    </View>

                                </TouchableOpacity>


                                {/* Horizontal line */}
                                <View style={{ height: 1, backgroundColor: '#ccc' }} />
                                {/* Content row with text and button */}
                                <TouchableOpacity
                                    style={styles.CContainer}
                                    activeOpacity={0.8}
                                    //onPress={() => navigation.navigate('EditProfile')}
                                >
                                    {/* Left side content */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/Privacy.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                        <Text style={styles.leftText}>Privacy Policy</Text>

                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>My Connections</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(100+ others)</Text>
                            </View> */}
                                    </View>

                                    {/* Right side content */}
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                                </TouchableOpacity>

                                {/* Horizontal line */}
                                <View style={{ height: 1, backgroundColor: '#ccc' }} />

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Settings')}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../assets/img/Settings.png')}
                                        style={{ width: 24, height: 24, marginRight: 15 }}
                                    />
                                    <Text style={styles.leftText}>
                                        Settings
                                    </Text>
                                </View>
                            </TouchableOpacity>



                            {/* Horizontal line */}
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                            //onPress={() => navigation.navigate('ProfileCompletion')}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../../assets/img/HelpSupport.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                    <Text style={styles.leftText}>Help and Support</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>Receive Request</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(54+ others)</Text>
                            </View> */}

                                </View>

                                {/* Right side content */}
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                            </TouchableOpacity>


                            {/* Horizontal line */}
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                //onPress={() => navigation.navigate('LoginScreen')}
                                onPress={() => setShowPopup(true)}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/logged.png')} style={{ width: 24, height: 24, marginRight: 15 }} />
                                    <Text style={styles.leftText}>Logout</Text>
                                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 250 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', color: 'black', fontFamily: 'Mukta-Regular' }}>Receive Request</Text>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#979797', fontFamily: 'Mukta-Regular' }}>(54+ others)</Text>
                            </View> */}

                                </View>

                                {/* Right side content */}
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginRight: 10 }} />
                        </View> */}
                            </TouchableOpacity>

                            <AlertPopup
                                visible={showPopup}
                                onRequestClose={() => setShowPopup(false)}
                                title="LogOut"
                                message="Do you want to logout from your account?"
                                yesLabel="Yes"
                                noLabel="No"
                                onYesPress={async () => {
                                    setShowPopup(false);
                                    // console.log('Logged Out');
                                    // await AsyncStorage.setItem('userLoggedIn', 'false');
                                    navigation.navigate('LoginScreen'); 
                                    
                                    
                                }}
                            />
                        </View>
                            <View style={styles.bottomContainer}>
                                {/* <Image source={require('../../../assets/img/DenXGenLogo.png')} style={styles.image} /> */}
                                <Text style={styles.leftText1}>App Version {version}</Text>
                                <TouchableOpacity onPress={openWebView}>
                                    <Text style={styles.leftText1}>Developed By <Text style={styles.leftText}>WeDevelopTech</Text></Text>
                                </TouchableOpacity>
                               
                            </View>
                          
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        alignItems: 'center',
        marginTop: 15
    },
    image: {
        width: width * 0.4,
        height: height * 0.07,
        marginTop: height * 0.1,
        //marginTop: 20
    },
    profileRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    profileImageContainer: {
        marginRight: 20,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
    },
    profileInfoContainer: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    subContainer: {
        marginBottom: 15,
        marginTop: 20,
    },
    CContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.015,
        paddingVertical: 6,
    },
    leftText: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: 24
    },
    leftText1: {
        fontSize: 14,
        color: '#979797',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22
    },
});

export default MyProfile;
