/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import commonStyles from '../components/CommonStyles';

const SelectCDentist = ({ route, navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedChiefDentist, setSelectedChiefDentist] = useState(null); // State to track selected dentist
    const chiefDentist = [
        { id: 1, name: 'Dr. John Smith', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', qualification: 'Dental Surgeon' },
        { id: 2, name: 'Dr. Emily Johnson', image: require('../../assets/img/Profile.png'), qualification: 'Orthodontist' },
        { id: 3, name: 'Dr. Michael Davis', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', qualification: 'Periodontist' },
        { id: 4, name: 'Dr. Sarah Brown', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', qualification: 'Endodontist' },
        { id: 5, name: 'Dr. David Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', qualification: 'Prosthodontist' },
        // Add more dentists as needed
    ];

    const handleChiefDentistSelect = (chiefDentist) => {
        setSelectedChiefDentist(chiefDentist); // Update selected dentist
    };

    const handleSubmit = () => {
        if (selectedChiefDentist) {
            const onSelectChiefDentist = route.params.onSelectChiefDentist;
            onSelectChiefDentist(selectedChiefDentist);
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* Header */}
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/Back.png')} style={commonStyles.icon} />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Select Dentist</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                        <Image source={require('../../assets/img/Option.png')} style={commonStyles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
                {/* Search Bar */}
                <View style={commonStyles.searchBarContainer}>
                    <View style={commonStyles.leftContainer}>
                        <View style={commonStyles.backContainerSearch}>
                            <Image source={require('../../assets/img/Search.png')} style={commonStyles.icon} />
                        </View>
                        <TextInput
                            style={commonStyles.searchInput}
                            placeholder="Search"
                            placeholderTextColor='grey'
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <View style={commonStyles.backContainerFilter}>
                        <Image source={require('../../assets/img/filter.png')} style={commonStyles.icon} />
                    </View>
                </View>
                {/* Dentists List */}
                {chiefDentist
                    .filter((chiefDentist) => chiefDentist.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map((chiefDentist, index) => (
                        <TouchableOpacity key={index} onPress={() => handleChiefDentistSelect(chiefDentist)}>
                            <View style={styles.card}>
                                <Image source={chiefDentist.image} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}>{chiefDentist.name}</Text>
                                    <Text style={styles.qualification}>{chiefDentist.qualification}</Text>
                                </View>
                                {/* Conditional rendering based on whether the dentist is selected or not */}
                                {selectedChiefDentist && selectedChiefDentist.id === chiefDentist.id ? (
                                    <Image source={require('../../assets/img/DotActive.png')} style={styles.indicator} />
                                ) : (
                                    <Image source={require('../../assets/img/Active.png')} style={styles.indicator} />
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
            {/* Submit Button */}
            <TouchableOpacity
                style={[commonStyles.button, styles.continueButton]}
                onPress={handleSubmit}
                activeOpacity={0.8}
            >
                <Text style={commonStyles.buttonText}>Submit</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    subContainer: {
        marginVertical: 12
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEFCFC',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        borderColor: 'rgba(34, 31, 31, 0.1)',
        borderWidth: 1
    },
    image: {
        width: 46,
        height: 46,
        borderRadius: 30,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-Regular',
        lineHeight: 24
    },
    qualification: {
        fontSize: 15,
        color: '#979797',
        fontFamily: 'DMSans-Regular',
        lineHeight: 22
    },
    indicator: {
        width: 20,
        height: 20,
        marginLeft: 'auto',
    },
    continueButton: {
        position: 'absolute',
        bottom: 30,
    },
});

export default SelectCDentist;