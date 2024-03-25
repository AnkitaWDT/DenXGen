/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Dimensions,
    PixelRatio
} from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleContainer from '../../components/ToggleContainer';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const locationData = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'Los Angeles' },
    { id: 3, name: 'Chicago' },
    { id: 4, name: 'Mumbai' },
    { id: 5, name: 'Munich' },
    { id: 6, name: 'Mumbaii' },
    // Add more locations as needed
];

const specialtyData = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Orthopedics' },
    { id: 3, name: 'Dermatology' },
    { id: 4, name: 'Pediatrics' },
    { id: 5, name: 'Oncology' },
    // Add more specialties as needed
];

const AutocompleteBox = ({ options, onSelect }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.autocompleteItem,
                options.length === 1 && styles.singleAutocompleteItem,
            ]}
            onPress={() => onSelect(item.name)}
        >
            <Text style={styles.autocompleteItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.autocompleteList}
        />
    );
};

const FiltersScreen = ({ navigation }) => {
    const [locationSearchQuery, setLocationSearchQuery] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);

    const [specialtySearchQuery, setSpecialtySearchQuery] = useState('');
    const [filteredSpecialties, setFilteredSpecialties] = useState([]);

    const handleLocationSearch = (text) => {
        setLocationSearchQuery(text);

        if (text.length > 2) {
            const filteredLocations = locationData.filter((location) =>
                location.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredLocations(filteredLocations);
        } else {
            setFilteredLocations([]);
        }
    };

    const handleSpecialtySearch = (text) => {
        setSpecialtySearchQuery(text);

        if (text.length > 2) {
            const filteredSpecialties = specialtyData.filter((specialty) =>
                specialty.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredSpecialties(filteredSpecialties);
        } else {
            setFilteredSpecialties([]);
        }
    };

    const handleSelectLocation = (location) => {
        setLocationSearchQuery(location);
        setFilteredLocations([]);
    };

    const handleSelectSpecialty = (specialty) => {
        setSpecialtySearchQuery(specialty);
        setFilteredSpecialties([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity
                        style={commonStyles.backContainer}  activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Filters</Text>
                    <TouchableOpacity style={commonStyles.backContainer1}  activeOpacity={0.8}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
               
                {/* Location Search Bar */}
                <View style={styles.searchBarMap}>
                    <View style={commonStyles.leftContainer}>
                        <View style={commonStyles.backContainerSearch}>
                            <Image
                                source={require('../../../assets/img/Location.png')}
                                style={commonStyles.icon}
                            />
                        </View>
                        <TextInput
                            style={commonStyles.searchInput}
                            placeholder="Search by Location"
                            placeholderTextColor="grey"
                            value={locationSearchQuery}
                            onChangeText={handleLocationSearch}
                        />
                    </View>
                </View>
                {filteredLocations.length > 0 && (
                    <AutocompleteBox
                        options={filteredLocations}
                        onSelect={handleSelectLocation}
                    />
                )}

                {/* Specialty Search Bar */}
                <View style={styles.searchBarMap}>
                    <View style={commonStyles.leftContainer}>
                        <View style={commonStyles.backContainerSearch}>
                            <Image
                                source={require('../../../assets/img/Search.png')}
                                style={commonStyles.icon}
                            />
                        </View>
                        <TextInput
                            style={commonStyles.searchInput}
                            placeholder="Search by Specialty"
                            placeholderTextColor="grey"
                            value={specialtySearchQuery}
                            onChangeText={handleSpecialtySearch}
                        />
                    </View>
                </View>
                {filteredSpecialties.length > 0 && (
                    <AutocompleteBox
                        options={filteredSpecialties}
                        onSelect={handleSelectSpecialty}
                    />
                )}

                <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL, {
                       
                    }]}>Availability (open or shut)</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="Open"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Shut"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                    </View>
                </View>
                <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL, {

                    }]}>What are you looking for?</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="Open all week"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Wheel Chair"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Parking"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Wifi"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                    </View>
                </View>
                <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL, {

                    }]}>Years of experience</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="1-5 Years"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="5-10 Years"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="10-15 Years"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="15 Above"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={commonStyles.button1H}>
                        <Text style={commonStyles.buttonText1H}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={commonStyles.buttonH}>
                        <Text style={commonStyles.buttonTextH}>Apply</Text>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    subContainer: {
        marginBottom: 20
    },
    searchBarMap: {
        marginTop: 15,
        paddingHorizontal: 15,
        borderRadius: 24,
        borderWidth: 1,
        height: 42,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#289EF5',
        backgroundColor: '#FEFCFC',
    },
    autocompleteList: {
        backgroundColor: '#FEFCFC',
        borderColor: '#000000',
        borderWidth: 0.5,
        borderRadius: 8,
        marginHorizontal: 15,
        zIndex: 3000,
    },
    autocompleteItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomColor: '#979797',
    },
    singleAutocompleteItem: {
        borderBottomWidth: 0, // Remove bottom border for a single item
        borderRadius: 8,
    },
    autocompleteItemText: {
        fontSize: 16,
        color: '#333333',
    },
    availableC: {
        marginTop: height * 0.03
    },
    line: {
        height: 1,
        backgroundColor: '#979797',
        marginHorizontal: 5
    },
    toggleList: {
        backgroundColor: '#FEFCFC',
        borderColor: '#979797',
        borderWidth: 0.5,
        borderRadius: 8,
        zIndex: 3000,
        marginTop: height * 0.02
    },
    continueButton: {
        backgroundColor: '#289EF5',
        padding: 10,
        borderRadius: 999,
        marginVertical: 10,
        width: '47%',
        height: 43,
    },
    skipButton: {
        backgroundColor: '#FEFCFC',
        borderColor: '#000',
        padding: 10,
        borderWidth: 1,
        borderRadius: 999,
        width: '47%',
        height: 43
    },
    buttonTextC: {
        color: 'white',
        fontWeight: '500',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'Mukta-Regular',
        lineHeight: 23,
        textAlign: 'center',
    },
    buttonTextS: {
        color: '#000',
        fontWeight: '500',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'Mukta-Regular',
        lineHeight: 23,
        textAlign: 'center',
    },
    buttonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginVertical: 30
    },
});

export default FiltersScreen;
