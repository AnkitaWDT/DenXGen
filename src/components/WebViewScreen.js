/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import commonStyles from '../components/CommonStyles';

const { width, height } = Dimensions.get('window');
const minDimension = Math.min(width, height);

const WebViewScreen = ({ navigation, route }) => {
    const { url, pageName } = route.params;
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const renderContent = () => {
        if (!isConnected) {
            return null;
        }

        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={commonStyles.wrapT}>
                        <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                            <Image
                                source={require('../../assets/img/Back.png')}
                                style={commonStyles.icon}
                            />
                        </TouchableOpacity>
                        <Text style={commonStyles.backText}>{pageName}</Text>
                        <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                            <Image
                                source={require('../../assets/img/Option.png')}
                                style={commonStyles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <WebView source={{ uri: url }} />
            </View>
        );

    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: 10
    },
    subContainer: {
        paddingVertical: 10,
        //paddingHorizontal: 20
    },
    topView: {
        backgroundColor: '#000000',
        borderBottomStartRadius: height * 0.04,
        borderBottomEndRadius: height * 0.04,
    },
    wrapT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: width * 0.02,
    },
    backContainer: {
        height: height * 0.02,
        width: height * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    backText: {
        fontSize: height * 0.02,
        marginBottom: 20,
        alignSelf: 'center',
        color: 'white',
        marginTop: height * 0.023,
        paddingHorizontal: width * 0.02,
    },
});

export default WebViewScreen;
