/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, PixelRatio, Dimensions } from 'react-native';
import React, { useState } from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import AlertPopup from '../../components/AlertPopup';
import Animation from '../../components/Loader';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const EditOfficeProfile = ({ navigation, route }) => {

    const { off_id } = route.params;
    const [showPopup0, setShowPopup0] = useState(false);
    const [showPopup1, setShowPopup1] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(false);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={[commonStyles.wrapT, { paddingHorizontal: 20 }]}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Edit Clinic Profile</Text>
                    <TouchableOpacity style={commonStyles.backContainer1}

                        activeOpacity={0.8}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>
                            <Text style={[commonStyles.headerText11BL, {
                                marginTop: height * 0.015, marginBottom: height * 0.01
                            }]}>Customise your intro</Text>
                            <Text style={[commonStyles.headerText4G, {
                                marginBottom: height * 0.015,
                            }]}>Details you select would be changed</Text>
                        </View>

                    </View>
                </View>

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Basic Info</Text>
                                <TouchableOpacity style={styles.editC}
                                    //onPress={() => navigation.navigate('PersonalDetails')}
                                    onPress={() => setShowPopup0(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/nameE.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Mitali Walawalkar</Text>
                                    <Text style={[commonStyles.headerText5G]}>Name</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/conP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>+91 9876543210</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailE.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>mitali.wdt@gmail.com</Text>
                                    <Text style={[commonStyles.headerText5G]}>Email Address</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/aboutP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>About Yourself</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/aboutP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Establishment Year</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>

                <AlertPopup
                    visible={showPopup0}
                    onRequestClose={() => setShowPopup0(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup0(false);
                        //navigation.navigate('EClinicProfileCompletion1');
                        navigation.navigate('EClinicProfileCompletion1', { off_id: off_id });
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Timings</Text>
                                <TouchableOpacity style={styles.editC}
                                    //onPress={() => navigation.navigate('PersonalDetails')}
                                    onPress={() => setShowPopup2(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/nameE.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Timings</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>

                <AlertPopup
                    visible={showPopup2}
                    onRequestClose={() => setShowPopup2(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup1(false);
                        navigation.navigate('EClinicProfileCompletion2', { off_id: off_id });
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Professional Details</Text>
                                <TouchableOpacity style={styles.editC}
                                    onPress={() => setShowPopup1(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Office/Clinic Pickups & Drops</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            {/* <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Licence Number</Text>
                                    <Text style={[commonStyles.headerText5G]}>AT573899I</Text>
                                </View>
                            </View> */}
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/serP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Services</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/keyP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Treatments</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/keyP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Payment Links</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>


                <AlertPopup
                    visible={showPopup1}
                    onRequestClose={() => setShowPopup1(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup1(false);
                        navigation.navigate('EClinicProfileCompletion5', { off_id: off_id });
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Personal Details</Text>
                                <TouchableOpacity style={styles.editC}
                                    onPress={() => setShowPopup3(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>


                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/aboutP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Founders</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Chief Dentist</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/serP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Teams</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/serP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Branches</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>


                <AlertPopup
                    visible={showPopup3}
                    onRequestClose={() => setShowPopup3(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup3(false);
                        navigation.navigate('NDProfileCompletion5');
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Additional Details</Text>
                                <TouchableOpacity style={styles.editC}
                                    onPress={() => setShowPopup4(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/genderP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Video Links</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Awards</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Publication/ Blog links</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/nameP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Social Media Links</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>

                <AlertPopup
                    visible={showPopup4}
                    onRequestClose={() => setShowPopup4(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup4(false);
                        navigation.navigate('ProfileCompletion8');
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Profile Photo & Banner</Text>
                                <TouchableOpacity style={styles.editC}
                                    onPress={() => setShowPopup5(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/genderP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Banner Image</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Profile Image</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>

                <AlertPopup
                    visible={showPopup5}
                    onRequestClose={() => setShowPopup5(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup5(false);
                        navigation.navigate('EClinicProfileCompletion3', { off_id: off_id });
                    }}
                />


                <View style={{ paddingVertical: height * 0.008, }}></View>
                {/* <View style={styles.horizontalLine}></View> */}
                <View style={styles.shadow}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ borderRadius: 10, paddingHorizontal: 20, }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[commonStyles.headerText11BL, {
                                    marginVertical: height * 0.015,
                                }]}>Gallery</Text>
                                <TouchableOpacity style={styles.editC}
                                    onPress={() => setShowPopup6(true)}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={require('../../../assets/img/EditP.png')}
                                        style={commonStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.horizontalLine}></View>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/genderP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Video (1 Video)</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <View style={styles.imgC}>
                                    <Image
                                        source={require('../../../assets/img/mailPP.png')}
                                        style={commonStyles.icon}
                                    />
                                </View>
                                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                    <Text style={[commonStyles.headerText4BL]}>Clinic Photos (5 Photos)</Text>
                                    <Text style={[commonStyles.headerText5G]}>Add/Edit</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: height * 0.015, }}></View>
                        </View>

                    </View>

                </View>

                <AlertPopup
                    visible={showPopup6}
                    onRequestClose={() => setShowPopup6(false)}
                    title="Do you want to save changes?"
                    message="Do you want to confirm saving this changes to your account?"
                    yesLabel="Yes"
                    noLabel="No"
                    onYesPress={() => {
                        setShowPopup6(false);
                        navigation.navigate('EClinicProfileCompletion7', { off_id: off_id });
                    }}
                />

                <View style={{ paddingVertical: height * 0.008, }}></View>
                <View style={{ marginBottom: height * 0.03, }}></View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,

    },
    shadow: {
        backgroundColor: '#FEFCFC',
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
        marginBottom: 5,
        marginTop: 10
    },
    bottomShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3, // positive value to create shadow at the bottom
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    subContainer: {
        marginVertical: 12,
    },
    header1: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Mukta-SemiBold',
        lineHeight: 28,
    },
    header2: {
        fontSize: 14,
        color: '#979797',
        fontFamily: 'Mukta-Regular',
        lineHeight: 22,
    },
    header3: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'Mukta-SemiBold',
        lineHeight: 22,
    },
    header4: {
        fontSize: 12,
        color: '#979797',
        fontFamily: 'Mukta-Regular',
        lineHeight: 18,
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        //marginVertical: height * 0.01,
        //marginHorizontal: 10,
        backgroundColor: '#979797',
    },
    editC: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    imgC: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 5
        //marginTop: 10
    },
});


export default EditOfficeProfile;
