/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, PixelRatio } from 'react-native';
import commonStyles from '../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';


const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const DropdownCalendar = ({ options, onSelect, selectedValue, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const handleSelect = (value, id) => {
        onSelect(value, id); // Pass both value and id to onSelect function
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                <Text style={[styles.dropdownHeaderText, !selectedValue && styles.placeholderText]}>
                    {selectedValue || placeholder}
                </Text>
                <View style={commonStyles.dropdownIcon}>
                    <Image
                        source={require('../../assets/img/ddown.png')}
                        style={commonStyles.icon}
                    />
                </View>
            </TouchableOpacity>
            {isOpen && (
                <View
                    ref={dropdownRef}
                    style={[styles.dropdownList, { zIndex: 1000 }]} // Adjust zIndex as needed
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.dropdownItem,
                                selectedValue === option.value && styles.selectedItem,
                            ]}
                            onPress={() => handleSelect(option.value, option.id)}
                        >
                            <View style={styles.selectedItemRow}>
                                <Text style={styles.selectedItemText}>{option.label}</Text>
                                {selectedValue === option.value && (
                                    <Image
                                        source={require('../../assets/img/selected.png')}
                                        style={styles.selectedItemImage}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',       
        alignSelf: 'center',
        zIndex: 2000,
       
    },
    dropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        backgroundColor: '#FEFCFC',
        height: 41,
        width: width * 0.9,
        paddingHorizontal: width * 0.05,
        //marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    dropdownHeaderText: {
        color: '#121212',
        fontFamily: 'DMSans-Medium',
    },
    placeholderText: {
        color: '#979797',
        fontFamily: 'DMSans-Medium',
    },
    label:{
        fontFamily: 'DMSans-Medium',
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    dropdownList: {
        //marginTop: 10, // Adjust this value based on your UI
        backgroundColor: '#fff',
        borderColor: '#121212',
        borderWidth: 0.5,
        borderRadius: 8,
        zIndex: 3000,
        maxHeight: 500, // Set a maximum height for the dropdown list
    },
    dropdownItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontFamily: 'DMSans-Medium',
    },
    selectedItem: {
        paddingHorizontal: 17,
        backgroundColor: '#E8F8FF',
        marginHorizontal: 3,
        borderRadius: 8,
        borderColor: '#289EF5',
        borderWidth: 1,
        marginVertical: 5,
    },
    selectedItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedItemText: {
        color: '#121212',
        marginRight: 10,
        fontFamily: 'DMSans-Medium',
    },
    selectedItemImage: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    },
});

export default DropdownCalendar;
