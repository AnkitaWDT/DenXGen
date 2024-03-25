/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
import commonStyles from './CommonStyles';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const CustomCheckbox = ({ options, onSelect, selectedValues, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();
    const [searchInput, setSearchInput] = useState('');

    const handleSelect = (value) => {
        const isSelected = selectedValues.includes(value);
        const newSelectedValues = isSelected
            ? selectedValues.filter((item) => item !== value)
            : [...selectedValues, value];

        onSelect(newSelectedValues);
        //setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (text) => {
        setSearchInput(text);
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchInput.toLowerCase())
    );

    const sortedOptions = filteredOptions.sort((a, b) => a.label.localeCompare(b.label));

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>
                    {selectedValues.length > 0 ? (
                        options.find((option) => option.value === selectedValues[0])?.label
                    ) : (
                        <Text style={{ color: '#979797' }}>{placeholder}</Text>
                    )}
                </Text>

                <View style={commonStyles.dropdownIcon}>
                    <Image
                        source={require('../../assets/img/ddown.png')}
                        style={commonStyles.icon}
                    />
                </View>
            </TouchableOpacity>
            {isOpen && (
                <View ref={dropdownRef} style={styles.dropdownList}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Find Languages"
                        placeholderTextColor='#979797'
                        value={searchInput}
                        onChangeText={handleSearch}
                    />
                    <ScrollView style={styles.scrollContainer} nestedScrollEnabled={true}>
                        {sortedOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={[
                                    styles.dropdownItem,
                                    selectedValues.includes(option.value) && styles.selectedItem, // Apply selected item style
                                ]}
                                onPress={() => handleSelect(option.value)}
                            >
                                <View style={styles.selectedItemRow}>
                                    <Text style={styles.selectedItemText}>{option.label}</Text>
                                    {selectedValues.includes(option.value) && (
                                        // Display an image for the selected item
                                        <Image
                                            source={require('../../assets/img/selected.png')}
                                            style={styles.selectedItemImage}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                  
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
        //width: 330,
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 2000,
    },
    dropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        height: height * 0.06,
        width: width * 0.9,
        paddingHorizontal: width * 0.05,
        //marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    dropdownHeaderText: {
        color: '#121212',
        fontFamily: 'DMSans-Medium',
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    dropdownList: {
        //marginTop: 10, // Adjust this value based on your UI
        backgroundColor: '#f5f5f5',
        borderColor: '#121212',
        borderWidth: 0.5,
        borderRadius: 8,
        zIndex: 3000,
        maxHeight: 500, // Set a maximum height for the dropdown list
    },
    scrollContainer: {
        maxHeight: 200, // Set a maximum height for the scrollable area
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
        justifyContent: 'space-between'
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
    searchInput:{
        paddingHorizontal: 10,
        color: '#000',
    }
});


export default CustomCheckbox;
