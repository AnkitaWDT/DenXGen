/* eslint-disable prettier/prettier */
// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Slide1 from '../screens/OnBoarding/Slide1';
import Slide2 from '../screens/OnBoarding/Slide2';
import Slide3 from '../screens/OnBoarding/Slide3';
import ContactList from '../screens/Contacts';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                //style: { borderColor: '#011f3b' },
                headerShown: false,
                unmountOnBlur: true,
            })}>
            <Tab.Screen name="Tab1" component={Slide1} />
            <Tab.Screen name="Tab2" component={Slide2} />
            <Tab.Screen name="Tab3" component={Slide3} />
            <Tab.Screen name="Tab4" component={ContactList} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
