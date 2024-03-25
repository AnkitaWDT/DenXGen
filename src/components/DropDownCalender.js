/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput, ScrollView } from 'react-native';
import commonStyles from './CommonStyles';

const Dropdown = ({ label, options, onSelect, selectedValue, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef();

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderText}>
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
                <View ref={dropdownRef} style={styles.dropdownList}>
                    <TextInput
                        placeholder="Search..."
                        style={styles.searchInput}
                        onChangeText={setSearchTerm}
                    />
                    <ScrollView
                        style={styles.scrollView}
                        keyboardShouldPersistTaps="handled" // or "always" depending on your requirement
                    >
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item) => item.value.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownItem,
                                        selectedValue === item.value && styles.selectedItem,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={styles.selectedItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const MonthDropdown = ({ onSelect, selectedValue }) => {
    const months = [
        { label: 'Jan', value: 'Jan' },
        { label: 'Feb', value: 'Feb' },
        { label: 'Mar', value: 'Mar' },
        { label: 'Apr', value: 'Apr' },
        { label: 'May', value: 'May' },
        { label: 'Jun', value: 'Jun' },
        { label: 'Jul', value: 'Jul' },
        { label: 'Aug', value: 'Aug' },
        { label: 'Sep', value: 'Sep' },
        { label: 'Oct', value: 'Oct' },
        { label: 'Nov', value: 'Nov' },
        { label: 'Dec', value: 'Dec' },
    ];

    return (
        <Dropdown
            label="Month"
            options={months}
            selectedValue={selectedValue}
            onSelect={onSelect}
            placeholder="Month"
        />
    );
};

const YearDropdown = ({ onSelect, selectedValue }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1980 + 1 }, (_, index) => {
        const yearValue = currentYear - index;
        return { label: yearValue.toString(), value: yearValue };
    });

    return (
        <Dropdown
            label="Year"
            options={years}
            selectedValue={selectedValue}
            onSelect={onSelect}
            placeholder="Year"
        />
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative',
        zIndex: 1,
        width: 90,
    },
    dropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 0.5,
        borderRadius: 24,
        backgroundColor: '#F4F4F4',
        height: 54,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    dropdownHeaderText: {
        color: '#000000',
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    dropdownList: {
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 8,
        zIndex: 0,
        //maxHeight: 300,
    },
    flatList: {
        maxHeight: 300,
    },
    dropdownItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
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
    selectedItemText: {
        color: '#000',
        marginRight: 10,
    },

    scrollView: {
        maxHeight: 300,
    },
    searchInput: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
});

export { MonthDropdown, YearDropdown };


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
// import CalendarPopup from './CalendarPopup';

// const DropDownCalender = () => {
//     const [isCalendarOpen, setIsCalendarOpen] = useState(false);
//     const [selectedYear, setSelectedYear] = useState(null);

//     const openCalendar = () => {
//         setIsCalendarOpen(true);
//     };

//     const closeCalendar = () => {
//         setIsCalendarOpen(false);
//     };

//     const handleYearSelect = (year) => {
//         setSelectedYear(year);
//         closeCalendar();
//     };

//     return (
//         <View style={styles.dropdownContainer}>
//             <TouchableOpacity onPress={openCalendar} style={styles.dropdownHeader}>
//                 <Text style={styles.dropdownHeaderText}>
//                     {selectedYear ? selectedYear.toString() : 'Year'}
//                 </Text>
//             </TouchableOpacity>

//             <Modal visible={isCalendarOpen} animationType="slide" transparent={true}>
//                 <CalendarPopup
//                     onSelectYear={handleYearSelect}
//                     onClose={closeCalendar}
//                     startYear={1900}
//                     endYear={2100}
//                 />
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     dropdownContainer: {
//         zIndex: 1,
//         width: 200,
//         justifyContent: 'center',
//     },
//     dropdownHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: 'transparent',
//         borderWidth: 0.5,
//         borderRadius: 24,
//         backgroundColor: '#F4F4F4',
//         height: 54,
//         paddingHorizontal: 10,
//         justifyContent: 'center',
//     },
//     dropdownHeaderText: {
//         color: '#000000',
//     },
// });


// export default DropDownCalender
