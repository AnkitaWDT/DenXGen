/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import TabBarAdvancedButton from '../../components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';
import CustomPopup from '../../components/CustomPopup';
import LoginScreen from '../Login/LoginScreen';
import OTPScreen from '../Login/OTPScreen';
import WelcomeScreen from '../WelcomeScreen';
import ProfileCompletion1 from '../ProfileCompletion/ProfileCompletion1';
import HomePage from './HomePage';
import MyProfile from '../Profile/MyProfile';
import Connections from '../Connection/Connections';
import ProfileCompletion5 from '../ProfileCompletion/ProfileCompletion5';
import ProfileCompletion8 from '../ProfileCompletion/ProfileCompletion8';
import NDProfileCompletion2 from '../NonDental/NDProfileCompletion2';
import Explore from '../Explore/Explore';
import QRScreen from '../QRScreen';

const BottomBar = createBottomTabNavigator();


const HomeScreen = ({ barColor, route }) => {
    const navigation = useNavigation(); // Hook to get navigation object
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (route.params?.fromWelcomeScreen) {
                e.preventDefault();
                setShowPopup(true);
            }
        });

        return unsubscribe;
    }, [navigation, route]);

    const handleContinue = () => {
        setShowPopup(false); // Hide the popup
        //navigation.dispatch(e.data.action); // Continue with the navigation action
    };

    const handleSkip = () => {
        setShowPopup(false); // Hide the popup
        // Perform any action needed after skipping the popup
    };

    return (
        <View style={styles.container}>
            {/* Your BottomTabNavigator content */}
            <BottomBar.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarShowIcon: true, // showIcon is now tabBarShowIcon
                    tabBarStyle: {
                        ...styles.navigator,
                        borderTopWidth: 1,
                        borderTopColor: '#FEFCFC',
                        elevation: 5,
                        shadowColor: 'transparent',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    },
                    //tabBarStyle: [styles.navigator, { backgroundColor: '#fff' }], // Change the backgroundColor to white
                    tabBarItemStyle: {
                        backgroundColor: '#fff', // Change the backgroundColor to white
                    },
                }}
            >
                <BottomBar.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBarIconContainer}>
                                <Image
                                    source={
                                        focused
                                            ? require('../../../assets/img/Home.png') // Change the image for the active state
                                            : require('../../../assets/img/HomeA.png')
                                    }
                                    resizeMode="contain"
                                    style={styles.tabBarIcon}
                                />
                            </View>
                        ),
                    }}
                />
                <BottomBar.Screen
                    name="Explore"
                    component={Explore}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBarIconContainer}>
                                <Image
                                    source={
                                        focused
                                            ? require('../../../assets/img/CategoryA.png') // Change the image for the active state
                                            : require('../../../assets/img/Category.png')
                                    }
                                    resizeMode="contain"
                                    style={styles.tabBarIcon}
                                />
                            </View>
                        ),
                    }}
                />
                <BottomBar.Screen
                    name="QRScreen"
                    component={QRScreen}
                    options={{
                        tabBarButton: (props) => (
                            <TabBarAdvancedButton bgColor={barColor} {...props} />
                        ),
                        tabBarStyle: { display: "none" },
                    }}
                />
                <BottomBar.Screen
                    name="Connections"
                    component={Connections}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBarIconContainer}>
                                <Image
                                    source={
                                        focused
                                            ? require('../../../assets/img/ConnectA.png')
                                            : require('../../../assets/img/Connect.png')
                                    }
                                    resizeMode="contain"
                                    style={styles.tabBarIcon}
                                />
                            </View>
                        ),
                    }}
                />
                <BottomBar.Screen
                    name="Profile"
                    component={MyProfile}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.tabBarIconContainer}>
                                <Image
                                    source={
                                        focused
                                            ? require('../../../assets/img/GroupA.png') // Change the image for the active state
                                            : require('../../../assets/img/Group.png')
                                    }
                                    resizeMode="contain"
                                    style={styles.tabBarIcon}
                                />
                            </View>
                        ),
                    }}
                />

            </BottomBar.Navigator>

            {/* Popup component */}
            <CustomPopup
                visible={showPopup}
                onClose={() => setShowPopup(false)}
                onContinue={handleContinue}
                onSkip={handleSkip}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    navigatorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2.22,
    },
    navigator: {
        borderTopWidth: 0,
        backgroundColor: 'transparent',
        elevation: 30,
    },
    xFillLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 34,
    },
    tabBarIconContainer: {
        width: 24, // Set your desired width
        height: 24, // Set your desired height
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: '100%', // Make sure the image takes the full width of the container
        height: '100%', // Make sure the image takes the full height of the container
    },
});

export default HomeScreen;
