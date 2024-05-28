/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import commonStyles from '../components/CommonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectBranches = ({ route, navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedBranches, setSelectedBranches] = useState(null); // State to track selected dentist
    const [clinics, setClinics] = useState([]);
    const [offices, setOffices] = useState([]);

    useEffect(() => {
        const fetchClinicsAndOffices = async () => {
            try {
                const pr_id = await AsyncStorage.getItem('pr_id');
                //const pr_id = 4;
            
                const clinicsResponse = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getcliniclist-ax.php?pr_id=${pr_id}`);
                const clinicsData = await clinicsResponse.json();
                console.log(clinicsData.data);
                const officesResponse = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getofficelist-ax.php?pr_id=${pr_id}`);
                const officesData = await officesResponse.json();
                console.log(officesData.data);

                // setClinics(clinicsData.data);
                // setOffices(officesData.data);

                const activeClinics = (clinicsData.data || []).filter(clinic => clinic.status === "1");
                const activeOffices = (officesData.data || []).filter(office => office.status === "1");
                
                setClinics(activeClinics);
                setOffices(activeOffices);
                
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };

        fetchClinicsAndOffices();
    }, []);

    const branches = [
        { id: 1, name: 'Dr. John Smith', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', qualification: 'Dental Surgeon' },
        { id: 2, name: 'Dr. Emily Johnson', image: require('../../assets/img/Profile.png'), qualification: 'Orthodontist' },
        { id: 3, name: 'Dr. Michael Davis', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU', qualification: 'Periodontist' },
        { id: 4, name: 'Dr. Sarah Brown', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', qualification: 'Endodontist' },
        { id: 5, name: 'Dr. David Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww', qualification: 'Prosthodontist' },
        // Add more dentists as needed
    ];

    const handleBranchesSelect = (branches) => {
        setSelectedBranches(branches); // Update selected dentist
    };

    const handleSubmit = () => {
        if (selectedBranches) {
            const onSelectBranches = route.params.onSelectBranches;
            onSelectBranches(selectedBranches);
            navigation.goBack();
        }
    };

    return (
        // <SafeAreaView style={styles.container}>
        //     <View>
        //         {/* Header */}
        //         <View style={commonStyles.wrapT}>
        //             <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
        //                 <Image source={require('../../assets/img/Back.png')} style={commonStyles.icon} />
        //             </TouchableOpacity>
        //             <Text style={commonStyles.backText}>Select Teams</Text>
        //             <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
        //                 <Image source={require('../../assets/img/Option.png')} style={commonStyles.icon} />
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     <ScrollView style={styles.subContainer}>
        //         <View style={commonStyles.searchBarContainer}>
        //             <View style={commonStyles.leftContainer}>
        //                 <View style={commonStyles.backContainerSearch}>
        //                     <Image source={require('../../assets/img/Search.png')} style={commonStyles.icon} />
        //                 </View>
        //                 <TextInput
        //                     style={commonStyles.searchInput}
        //                     placeholder="Search"
        //                     placeholderTextColor='grey'
        //                     value={searchText}
        //                     onChangeText={setSearchText}
        //                 />
        //             </View>
        //             <View style={commonStyles.backContainerFilter}>
        //                 <Image source={require('../../assets/img/filter.png')} style={commonStyles.icon} />
        //             </View>
        //         </View>
        //         {branches
        //             .filter((branches) => branches.name.toLowerCase().includes(searchText.toLowerCase()))
        //             .map((branches, index) => (
        //                 <TouchableOpacity key={index} onPress={() => handleBranchesSelect(branches)}>
        //                     <View style={styles.card}>
        //                         <Image source={branches.image} style={styles.image} />
        //                         <View style={styles.textContainer}>
        //                             <Text style={styles.name}>{branches.name}</Text>
        //                             <Text style={styles.qualification}>{branches.qualification}</Text>
        //                         </View>
        //                         {/* Conditional rendering based on whether the dentist is selected or not */}
        //                         {selectedBranches && selectedBranches.id === branches.id ? (
        //                             <Image source={require('../../assets/img/DotActive.png')} style={styles.indicator} />
        //                         ) : (
        //                             <Image source={require('../../assets/img/Active.png')} style={styles.indicator} />
        //                         )}
        //                     </View>
        //                 </TouchableOpacity>
        //             ))}
        //     </ScrollView>
        //     <TouchableOpacity
        //         style={[commonStyles.button, styles.continueButton]}
        //         onPress={handleSubmit}
        //         activeOpacity={0.8}
        //     >
        //         <Text style={commonStyles.buttonText}>Submit</Text>
        //     </TouchableOpacity>

        // </SafeAreaView>
        <SafeAreaView style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/img/Back.png')} style={commonStyles.icon} />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Select Branches</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                        <Image source={require('../../assets/img/Option.png')} style={commonStyles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
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
                <View>
                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>My Clinics</Text>
                    {clinics.length === 0 ? (
                        <Text style={styles.noDataText}>No Clinics Found</Text>
                    ) : (
                        clinics
                            .filter((clinic) => clinic.name.toLowerCase().includes(searchText.toLowerCase()))
                            .map((clinic, index) => (
                                <TouchableOpacity key={index} onPress={() => handleBranchesSelect(clinic)}>
                                    <View style={styles.card}>
                                        <Image source={{ uri: clinic.profile_pic || 'https://via.placeholder.com/46' }} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>{clinic.name || 'No Name'}</Text>
                                        </View>
                                        {selectedBranches && selectedBranches.cl_id === clinic.cl_id ? (
                                            <Image source={require('../../assets/img/DotActive.png')} style={styles.indicator} />
                                        ) : (
                                            <Image source={require('../../assets/img/Active.png')} style={styles.indicator} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))
                    )}
                    <View style={{ height: 1, backgroundColor: '#ccc', marginBottom: 20, marginTop: 15 }} />
                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>My Offices</Text>
                    {offices.length === 0 ? (
                        <Text style={styles.noDataText}>No Offices Found</Text>
                    ) : (
                        offices
                            .filter((office) => office.name.toLowerCase().includes(searchText.toLowerCase()))
                            .map((office, index) => (
                                <TouchableOpacity key={index} onPress={() => handleBranchesSelect(office)}>
                                    <View style={styles.card}>
                                        <Image source={{ uri: office.profile_pic || 'https://via.placeholder.com/46' }} style={styles.image} />
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>{office.name || 'No Name'}</Text>
                                         </View>
                                        {selectedBranches && selectedBranches.off_id === office.off_id ? (
                                            <Image source={require('../../assets/img/DotActive.png')} style={styles.indicator} />
                                        ) : (
                                            <Image source={require('../../assets/img/Active.png')} style={styles.indicator} />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))
                    )}
                </View>
            </ScrollView>
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

export default SelectBranches;