/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Animation from '../../components/Loader';
import AlertPopup from '../../components/AlertPopup';


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

            // Return a cleanup function (optional)
            return () => {
                // You can perform cleanup here if needed
            };
        }, [])
    );


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
                            <View style={{ height: 1, backgroundColor: '#ccc' }} />

                                <TouchableOpacity
                                    style={styles.CContainer}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('PersonalProfile')}
                                >
                                    {/* Left side content */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/Premium.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
                                        <Text style={styles.leftText}>My Profile</Text>
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
                            {/* Content row with text and button */}
                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/img/EditPro.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
                                    <Text style={styles.leftText}>Edit Profile</Text>

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
                                    <Image source={require('../../../assets/img/Notification.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
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
                                    <Image source={require('../../../assets/img/RateApp.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
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
                                    <Image source={require('../../../assets/img/About.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
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
                                onPress={() => navigation.navigate('Settings')}
                            >
                                {/* Left side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../assets/img/Settings.png')}
                                        style={{ width: 24, height: 24, marginRight: 20 }}
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
                                    <Image source={require('../../../assets/img/HelpSupport.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
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
                                    <Image source={require('../../../assets/img/LogOut.png')} style={{ width: 24, height: 24, marginRight: 20 }} />
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
                                onYesPress={() => {
                                    setShowPopup(false);
                                    navigation.navigate('LoginScreen');
                                }}
                            />

                        </View>
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    subContainer: {
        marginVertical: 15
    },
    CContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.015,
        paddingVertical: 6,
    },
    leftText: {
        fontSize: responsiveFontSize(16),
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
});

export default MyProfile;
