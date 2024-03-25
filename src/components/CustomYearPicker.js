/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomYearPicker = ({ onSelectYear, onClose }) => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(null);
    const [startYear, setStartYear] = useState(currentYear - (currentYear % 20));


    useEffect(() => {
        if (selectedYear !== null) {
            const newStartYear = selectedYear - (selectedYear % 20);
            setStartYear(newStartYear);
        }
    }, [selectedYear]);

    useEffect(() => {
        if (selectedYear !== null) {
            const newStartYear = selectedYear - (selectedYear % 20);
            setSelectedYear(selectedYear);
        }
    }, [selectedYear]);

    const handleYearSelect = (year) => {
        setSelectedYear(year);
    };

    const applySelectedYear = () => {
        if (selectedYear !== null) {
            onSelectYear(selectedYear);
            onClose();
        }
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
        <View style={[styles.yearGrid, { marginBottom: 10 }]}>
            {years.map((year) => (
                <TouchableOpacity
                    key={year}
                    style={[
                        styles.yearItem,
                        year === selectedYear ? styles.selectedYear : styles.defaultYear,
                        year > currentYear ? styles.disabledYear : null,
                    ]}
                    onPress={() => handleYearSelect(year)}
                    disabled={year > currentYear}
                >
                    <Text style={[year === selectedYear ? styles.selectedYearText : styles.defaultYearText]}>
                        {year}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
                <View style={styles.pickerContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.navigationButton} onPress={goBackward}>
                            <Text style={{ color: '#fff' }}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{`${startYear} - ${startYear + 19}`}</Text>
                        <TouchableOpacity style={styles.navigationButton} onPress={goForward}>
                            <Text style={{ color: '#fff' }}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>

                    {renderYearGrid()}

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={{ color: '#000' }}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyButton} onPress={applySelectedYear}>
                            <Text style={{ color: '#fff' }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for the blur effect
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        width: '90%',
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
        backgroundColor: '#289EF5',
        borderRadius: 5,
    },
    yearGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    yearItem: {
        width: '20%', // Each item takes 20% of the container's width
        height: 50,
        //aspectRatio: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 50,
    },

    disabledYear: {
        backgroundColor: '#f2f2f2',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#F4F5F6',
        width: width * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999
    },
    applyButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#289EF5',
        width: width * 0.34,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999
    },
    selectedYear: {
        backgroundColor: '#289EF5',
    },
    defaultYear: {
        backgroundColor: 'transparent',
    },
    selectedYearText: {
        color: '#fff',
        fontSize: 15
    },
    defaultYearText: {
        color: '#000',
        fontSize: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
});

export default CustomYearPicker;
