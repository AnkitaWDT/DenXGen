/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Animation from '../../components/Loader';
import { moderateScale } from 'react-native-size-matters';


const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const Connections = ({ navigation }) => {


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

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <Animation />
            ) : (
                <View>
                    <View>
                        <View style={commonStyles.wrapT}>
                            <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}>
                                <Image
                                    //source={require('../../../assets/img/Back.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                            <Text style={commonStyles.backText}>Connections</Text>
                            <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                                <Image
                                    source={require('../../../assets/img/Option.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView style={styles.subContainer}>
                        <View>
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}
                            <TouchableOpacity
                                style={styles.CContainer}
                                onPress={() => navigation.navigate('MyConnections')}
                                activeOpacity={0.8}
                            >
                                {/* Left side content */}
                                <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/MyConnectCC.png')} style={styles.image} />
                                    <Text style={styles.leftText}>My Connections</Text>
                                </View>

                                {/* Middle content */}
                                <View style={styles.middleContent}>
                                    <Text style={styles.middleText}>(100+ others)</Text>
                                </View>

                                {/* Right side content */}
                                <View style={styles.rightContent}>
                                    <Image source={require('../../../assets/img/ViewAll.png')} style={styles.imageR} />
                                </View>
                            </TouchableOpacity>

                                {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                                <TouchableOpacity
                                    style={styles.CContainer}
                                    onPress={() => navigation.navigate('DropCards')}
                                    activeOpacity={0.8}
                                >
                                    {/* Left side content */}
                                    <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/CardsDropCC.png')} style={styles.image} />
                                        <Text style={styles.leftText}>Cards Dropped</Text>
                                    </View>

                                    {/* Middle content */}
                                    <View style={styles.middleContent}>
                                        <Text style={styles.middleText}>(02 others)</Text>
                                    </View>

                                    {/* Right side content */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                                        <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
                                    </View>
                                </TouchableOpacity>
                            {/* Horizontal line */}
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                            <TouchableOpacity
                                style={styles.CContainer}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('SentReq')}
                            >
                                {/* Left side content */}
                                <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/SentReqCC.png')} style={styles.imageL} />
                                    <Text style={styles.leftText}>Sent Requests</Text>
                                </View>

                                {/* Middle content */}
                                <View style={styles.middleContent}>
                                    <Text style={styles.middleText}>(10+ others)</Text>
                                </View>

                                {/* Right side content */}
                                <View style={styles.rightContent}>
                                    <Image source={require('../../../assets/img/ViewAll.png')} style={styles.imageR} />
                                </View>
                            </TouchableOpacity>

                            {/* Horizontal line */}
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                            <TouchableOpacity
                                style={styles.CContainer}
                                onPress={() => navigation.navigate('ReceivedReq')}
                                activeOpacity={0.8}
                            >
                                {/* Left side content */}
                                <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/PendingReqCC.png')} style={styles.imageL} />
                                    <Text style={styles.leftText}>Pending Requests</Text>
                                </View>

                                {/* Middle content */}
                                <View style={styles.middleContent}>
                                    <Text style={styles.middleText}>(54+ others)</Text>
                                </View>

                                {/* Right side content */}
                                <View style={styles.rightContent}>
                                    <Image source={require('../../../assets/img/ViewAll.png')} style={styles.imageR} />
                                </View>
                            </TouchableOpacity>


                            {/* Horizontal line */}
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                            <TouchableOpacity
                                style={styles.CContainer}
                                onPress={() => navigation.navigate('BlockAcc')}
                                activeOpacity={0.8}
                            >
                                {/* Left side content */}
                                <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/BlockedAccCC.png')} style={styles.imageL} />
                                    <Text style={styles.leftText}>Blocked Account</Text>
                                </View>

                                {/* Middle content */}
                                <View style={styles.middleContent}>
                                    <Text style={styles.middleText}>(02 others)</Text>
                                </View>

                                {/* Right side content */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                                    <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
                                </View>
                            </TouchableOpacity>

                            {/* Horizontal line */}
                            {/* <View style={{ height: 1, backgroundColor: '#ccc' }} /> */}

                                <TouchableOpacity
                                    style={styles.CContainer}
                                    onPress={() => navigation.navigate('Endorsement')}
                                    activeOpacity={0.8}
                                >
                                    {/* Left side content */}
                                    <View style={styles.leftContent}>
                                        <Image source={require('../../../assets/img/Endment.png')} style={styles.imageE} />
                                        <Text style={styles.leftText}>Endorsement</Text>
                                    </View>

                                    {/* Middle content */}
                                    <View style={styles.middleContent}>
                                        <Text style={styles.middleText}>(02 others)</Text>
                                    </View>

                                    {/* Right side content */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                                        <Image source={require('../../../assets/img/ViewAll.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
                                    </View>
                                </TouchableOpacity>
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
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(16),
    },
    subContainer: {
        marginVertical: moderateScale(15),
    },
    CContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateScale(8),
        paddingVertical: moderateScale(11),
        backgroundColor: '#fff',
        paddingHorizontal: moderateScale(14),
        borderColor: '#979797',
        borderWidth: 0.2,
        borderRadius: 24
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 5,
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    imageL: {
        width: 22,
        height: 24,
        marginRight: 15,
    },
    imageE: {
        width: 24,
        height: 20,
        marginRight: 15,
    },
    imageR: {
        width: 18,
        height: 18,
        marginLeft: 12,
    },
    leftText: {
        fontSize: moderateScale(16),
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    middleContent: {
        //flex: 3,
        flex: 2.5,
        alignItems: 'flex-start',
    },
    middleText: {
        fontSize: moderateScale(14),
        color: '#979797',
        fontFamily: 'DMSans-Medium',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
});


export default Connections;