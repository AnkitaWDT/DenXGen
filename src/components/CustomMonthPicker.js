/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomMonthPicker = ({ onSelectMonth, onClose }) => {
    const months = Array.from({ length: 12 }, (_, index) => new Date(0, index + 1).toLocaleString('en', { month: 'short' }));
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        
    };

    const applySelectedMonth = () => {
        if (selectedMonth !== null) {
            onSelectMonth(selectedMonth); 
            onClose();
        }
    };

    const renderMonthGrid = () => {
        return (
            <View style={styles.monthGrid}>
                {months.map((month) => (
                    <TouchableOpacity
                        key={month}
                        style={[
                            styles.monthItem,
                            month === selectedMonth ? styles.selectedMonth : null,
                        ]}
                        onPress={() => handleMonthSelect(month)}
                    >
                        <Text style={[month === selectedMonth ? styles.selectedMonthText : styles.defaultMonthText]}>{month}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
                <View style={styles.scrollView}>
                    <View style={styles.pickerContainer}>
                        {renderMonthGrid()}

                        <View style={styles.buttonContainer}>

                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Text style={{ color: '#000' }}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={applySelectedMonth}>
                                <Text style={{ color: '#fff' }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        width: '80%',
        alignSelf: 'center',
    },
    monthGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    monthItem: {
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 50,
    },
    selectedMonth: {
        backgroundColor: '#289EF5',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#F4F5F6',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.35,
        borderRadius: 999
    },
    applyButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#289EF5',
        width: width * 0.35,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginHorizontal: 8,
    },
    selectedMonthText: {
        color: '#fff',
        fontSize: 15
    },
    defaultMonthText: {
        color: '#000',
        fontSize: 15
    },
});

export default CustomMonthPicker;
    