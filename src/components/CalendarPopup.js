/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

const CustomCalendarPopup = ({ onSelectYear, onClose }) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [startYear, setStartYear] = useState(currentYear - 10); // Initially show 20 years, 10 before and 10 after the current year

    useEffect(() => {
        setStartYear((selectedYear - 1) - (selectedYear - 1) % 20);
    }, [selectedYear]);

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        onClose();
    };

    const goBackward = () => {
        setStartYear(startYear - 20);
    };

    const goForward = () => {
        setStartYear(startYear + 20);
    };

    const renderYearGrid = () => {
        const years = Array.from({ length: 20 }, (_, index) => startYear + index);

        return (
            <View style={styles.yearGrid}>
                {years.map((year) => (
                    <TouchableOpacity
                        key={year}
                        style={[
                            styles.yearItem,
                            year === selectedYear ? styles.selectedYear : null,
                            year > currentYear ? styles.disabledYear : null,
                        ]}
                        onPress={() => handleYearSelect(year)}
                        disabled={year > currentYear}
                    >
                        <Text>{year}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style= {{justifyContent: 'center'}}>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
                        <View style={styles.pickerContainer}>
                            <View style={styles.headerContainer}>
                                <TouchableOpacity style={styles.navigationButton} onPress={goBackward}>
                                    <Text>{'<'}</Text>
                                </TouchableOpacity>
                                <Text style={styles.headerText}>{`${startYear} - ${startYear + 19}`}</Text>
                                <TouchableOpacity style={styles.navigationButton} onPress={goForward}>
                                    <Text>{'>'}</Text>
                                </TouchableOpacity>
                            </View>

                            {renderYearGrid()}

                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
        
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the blur effect
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    scrollView: {
        width: '100%',
    },
    pickerContainer: {
        backgroundColor: '#FEFCFC',
        borderRadius: 10,
        padding: 15,
        width: '80%',
        alignSelf: 'center',
        
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
    },
    navigationButton: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    yearGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    yearItem: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    selectedYear: {
        backgroundColor: 'lightblue',
    },
    disabledYear: {
        backgroundColor: '#ccc',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
});

export default CustomCalendarPopup;
