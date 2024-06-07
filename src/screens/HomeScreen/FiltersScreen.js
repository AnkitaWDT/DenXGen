/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
    PixelRatio,
    Modal
} from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToggleContainer from '../../components/ToggleContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_CONFIG } from '../../API/APIConfig';
import { moderateScale } from 'react-native-size-matters';

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
        setFormData((prevState) => ({ ...prevState, location }));
    };

    const handleSelectSpecialty = (specialty) => {
        setSpecialtySearchQuery(specialty);
        setFilteredSpecialties([]);
        setFormData((prevState) => ({ ...prevState, specialty }));
    };

    const handleToggleChange = (field, value, active) => {
        if (field === 'lookingFor') {
            setFormData((prevState) => {
                const updatedLookingFor = active
                    ? [...prevState.lookingFor, value]
                    : prevState.lookingFor.filter((item) => item !== value);
                return { ...prevState, lookingFor: updatedLookingFor };
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [field]: active ? value : '',
            }));
        }
    };

    const [formData, setFormData] = useState({
        location: '',
        speciality: [],
        services: [],
        keyforte: [],
        experience: [],
        qualifications: [],
        pin: '400031',
        availability: [],
    });

    const handleSubmit = async () => {
        const userData = {
            location: formData.location,
            speciality: formData.speciality,
            services: formData.services,
            keyforte: formData.keyforte,
            experience: formData.experience,
            qualifications: formData.qualifications,
            pin: formData.pin,
        };

        const data={
            speciality: selectedSpecialties,
            services: selectedServices,
            keyforte: selectedKeyForte,
            location: formData.location,
            pin: formData.pin,
            experience: selectedExperience,
            qualifications: selectedQualifications,
            availability: selectedDays.map(day => parseInt(day)),
            action: 'professionals',
        }

        if (selectedOption === 'Professionals') {
            data.action = 'professionals';
        } else if (selectedOption === 'Clinics') {
            data.action = 'clinics';
        } else if (selectedOption === 'Offices') {
            data.action = 'offices';
        } else if (selectedOption === 'Others') {
            data.action = 'others';
        }

        let orderBy = 'location';
        if (selectedSort === 'Locations') {
            orderBy = 'location';
        } else if (selectedSort === 'A-Z') {
            orderBy = 'alphabetically';
        } else if (selectedSort === 'Newest') {
            orderBy = 'newest';
        }

        const selectedDaysString = selectedDays.join(',');

        console.log('formData', data);
        console.log('userData', userData);
        const accidty = await AsyncStorage.getItem('selected_profile_accidty');
        const accidtyid = await AsyncStorage.getItem('selected_id');

        const apiUrl = `https://temp.wedeveloptech.in/denxgen/appdata/getallacountslist-ax.php?accid=${accidtyid}&accidty=${accidty}&action=${data.action}&pin=${data.pin}&orderby=${orderBy}&speciality=${JSON.stringify(data.speciality)}&services=${JSON.stringify(data.services)}&keyforte=${JSON.stringify(data.keyforte)}&experience=${JSON.stringify(data.experience)}&qualifications=${JSON.stringify(data.qualifications)}&availability=${JSON.stringify(data.availability)}`;
        console.log('apiUrl', apiUrl);

        try {
            const response = await fetch(apiUrl);
            const result = await response.json();
            console.log('API response:', result);
            // Handle the API response here
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        navigation.navigate('Explore');
    };

    const [servicesData, setServiceData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [serviceModalVisible, setServiceModalVisible] = useState(false);
    const [showOtherServiceInput, setOtherServiceInput] = useState(false);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(`${API_CONFIG.API_DOMAIN}${API_CONFIG.serviceListUrl}`);
                const data = response.data;
                //console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    //console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    //console.log("Filtered data:", filteredData); // Log filtered data

                    const serviceOptions = filteredData.map(item => ({
                        service: item.service,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    //console.log("Dropdown options:", serviceOptions); // Log dropdown options

                    setServiceData(serviceOptions);
                } else {
                    console.error('Error fetching service options');
                }
            } catch (error) {
                console.error('Error fetching service options:', error);
            }
        };

        fetchServiceData();
    }, []);

    const handleServiceModal = () => {
        setServiceModalVisible(true);
    };

    const handleServiceModalSubmit = () => {
        let updatedServices = [...selectedServices];
      
        setSelectedServices(updatedServices);
        //console.log('updatedServices', updatedServices)
        setServiceModalVisible(false);
    };

    const toggleService = (id, service) => {

        const isSelected = selectedServices.includes(id);
        setSelectedServices(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        setSelectedServiceName(isSelected ? [] : [service]);
    };

       const [specialtiesData, setSpecialtiesData] = useState([]);
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [selectedSpecialityName, setSelectedSpecialityName] = useState('');
    const [specialtiesModalVisible, setSpecialtiesModalVisible] = useState(false);
    const [showOtherSpecialityInput, setShowOtherSpecialityInput] = useState(false);

    useEffect(() => {
        const fetchSpecialitiesData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getspeclist-ax.php`);
                const data = response.data;
                //console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    //console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    //console.log("Filtered data:", filteredData); // Log filtered data

                    const specialityOptions = data.data.map(item => ({
                        speciality: item.speciality,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    //console.log("Dropdown options:", specialityOptions); // Log dropdown options

                    setSpecialtiesData(specialityOptions);
                } else {
                    console.error('Error fetching service options');
                }
            } catch (error) {
                console.error('Error fetching service options:', error);
            }
        };

        fetchSpecialitiesData();
    }, []);

      const handleSpecialtiesModal = () => {
        setSpecialtiesModalVisible(true);
    };

    const handleSpecialtiesModalSubmit = () => {
         let updatedSpecialties = [...selectedSpecialties];

        // Update the main text input with the combined specialties
        setSelectedSpecialties(updatedSpecialties);

        // Close the modal
        setSpecialtiesModalVisible(false);
    };

    const toggleSpeciality = (id, speciality) => {
 const isSelected = selectedSpecialties.includes(id);
        setSelectedSpecialties(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        setSelectedSpecialityName(isSelected ? [] : [speciality]);
    };

    const [keyForteData, setKeyForteData] = useState([]);
    const [selectedKeyForte, setSelectedKeyForte] = useState([]);
    const [selectedKeyForteName, setSelectedKeyForteName] = useState('');
    const [keyForteModalVisible, setKeyForteModalVisible] = useState(false);
    const [showOtherKeyForteInput, setShowOtherKeyForteInput] = useState(false);

    useEffect(() => {
        const fetchKeyForteData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getkeyforlist-ax.php`);
                const data = response.data;
                //console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    //console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    ///console.log("Filtered data:", filteredData); // Log filtered data

                    const keyForteOptions = data.data.map(item => ({
                        keyforte: item.keyforte,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                   // console.log("Dropdown options:", keyForteOptions); // Log dropdown options

                    setKeyForteData(keyForteOptions);
                } else {
                    console.error('Error fetching keyForteOptions options');
                }
            } catch (error) {
                console.error('Error fetching keyForteOptions:', error);
            }
        };

        fetchKeyForteData();
    }, []);

    const handleKeyForteModal = () => {
        setKeyForteModalVisible(true);
    };

    const handleKeyForteModalSubmit = () => {
        let updatedKeyForte = [...selectedKeyForte];

        setKeyForteModalVisible(false);

        // Update the state with the modified qualifications
        setSelectedKeyForte(updatedKeyForte);
    };

    const toggleKeyForte = (id, keyforte) => {
        const isSelected = selectedKeyForte.includes(id);
        setSelectedKeyForte(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedKeyForteName(isSelected ? [] : [keyforte]);
    };

    const [qualificationsData, setQualificationsDataData] = useState([]);
    const [selectedQualifications, setSelectedQualifications] = useState([]);
    const [selectedQualificationName, setSelectedQualificationName] = useState('');
    const [otherQualification, setOtherQualification] = useState('');
    const [qualificationsModalVisible, setQualificationsModalVisible] = useState(false);
    const [showOtherQualificationInput, setShowOtherQualificationInput] = useState(false);


    useEffect(() => {
        const fetchQualificationsData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getqualilist-ax.php`);
                const data = response.data;
                //console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    //console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    //console.log("Filtered data:", filteredData); // Log filtered data

                    const qualificationOptions = data.data.map(item => ({
                        qualification: item.qualification,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    //console.log("Dropdown options:", qualificationOptions); // Log dropdown options

                    setQualificationsDataData(qualificationOptions);
                } else {
                    console.error('Error fetching keyForteOptions options');
                }
            } catch (error) {
                console.error('Error fetching keyForteOptions:', error);
            }
        };

        fetchQualificationsData();
    }, []);

    const handleQualificationsModal = () => {
        setQualificationsModalVisible(true);
    };

    const handleCloseQualificationsModal = () => {
        setQualificationsModalVisible(false);
    };

    const handleQualificationsModalSubmit = () => {

        let updatedQualifications = [...selectedQualifications];

        // Close the modal
        setQualificationsModalVisible(false);

        setSelectedQualifications(updatedQualifications);
    };


    const toggleQualification = (id, qualification) => {
        const isSelected = selectedQualifications.includes(id);
        setSelectedQualifications(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedQualificationName(isSelected ? [] : [qualification]);

    };

    const [experienceData, setExperienceData] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState('');
    const [otherExperience, setOtherExperience] = useState('');
    const [selectedExperienceName, setSelectedExperienceName] = useState('');
    const [experienceModalVisible, setExperienceModalVisible] = useState(false);
    const [showOtherExperienceInput, setShowOtherExperienceInput] = useState(false);


    useEffect(() => {
        const fetchExperienceData = async () => {
            try {
                const response = await axios.get(`https://temp.wedeveloptech.in/denxgen/appdata/getexplist-ax.php`);
                const data = response.data;
               // console.log("Fetched data:", data); // Log fetched data

                if (data.code === 1) {
                    // Get the stored pr_ty_id from AsyncStorage
                    const storedId = await AsyncStorage.getItem('pr_ty_id');
                    //console.log("Stored pr_ty_id:", storedId); // Log stored pr_ty_id

                    const filteredData = data.data.filter(item => item.pr_ty_id === storedId);
                    //console.log("Filtered data:", filteredData); // Log filtered data

                    const experienceOptions = data.data.map(item => ({
                        experience: item.experience,
                        id: parseInt(item.id) // Parse the id as an integer
                    }));

                    //console.log("Dropdown options:", experienceOptions); // Log dropdown options

                    setExperienceData(experienceOptions);
                } else {
                    console.error('Error fetching experience options');
                }
            } catch (error) {
                console.error('Error fetching experience:', error);
            }
        };

        fetchExperienceData();
    }, []);

    const handleExperienceModal = () => {
        setExperienceModalVisible(true);
    };

    const handleCloseExperienceModal = () => {
        setExperienceModalVisible(false);
    };

    const handleExperienceModalSubmit = () => {

        let updatedExperience = [...selectedExperience];

        // Close the modal
        setExperienceModalVisible(false);

        setSelectedQualifications(updatedExperience);
        setExperienceModalVisible(false);
    };


    const toggleExperience = (id, experience) => {
        const isSelected = selectedExperience.includes(id);
        setSelectedExperience(prev => isSelected ? prev.filter(item => item !== id) : [...prev, id]);

        // Update selectedServiceName accordingly
        setSelectedExperienceName(isSelected ? [] : [experience]);
    };
    
    

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const [modalVisibleSort, setModalVisibleSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');

    const handleSortSelect = (option) => {
        setSelectedSort(option);
        //setModalVisibleSort(false);
    };

    const [modalVisibleA, setModalVisibleA] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [daysList, setDaysList] = useState([]);

    // Function to fetch the list of days from the API
    const fetchDaysList = async () => {
        try {
            const response = await fetch('https://temp.wedeveloptech.in/denxgen/appdata/getdayofweek-ax.php');
            const data = await response.json();
            if (data && data.data) {
                setDaysList(data.data);
            }
        } catch (error) {
            console.error('Error fetching days list:', error);
        }
    };

    useEffect(() => {
        fetchDaysList();
    }, []);

    const handleOptionASelect = (id, day) => {
        // Toggle selection of the day
        if (selectedDays.includes(id)) {
            setSelectedDays(selectedDays.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedDays([...selectedDays, id]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity
                        style={commonStyles.backContainer} activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Filters</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8} onPress={() => setModalVisibleSort(true)}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisibleSort}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setModalVisibleSort(false)}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setModalVisibleSort(false)}
                        >
                            <TouchableOpacity style={styles.modalContent} activeOpacity={1}
                                onPress={() => { }}>
                                <View style={{ paddingBottom: height * 0.06 }}>
                                    <View style={styles.horizontalLine}></View>
                                    <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                        Sort By
                                    </Text>
                                    <TouchableOpacity onPress={() => handleSortSelect('Locations')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedSort === 'Locations' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedSort === 'Locations'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedSort === 'Locations' && commonStyles.headerText4B,
                                            ]}>
                                                Locations
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSortSelect('A-Z')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedSort === 'A-Z' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedSort === 'A-Z'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedSort === 'A-Z' && commonStyles.headerText4B,
                                            ]}>
                                                A-Z
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSortSelect('Newest')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedSort === 'Newest' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedSort === 'Newest'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedSort === 'Newest' && commonStyles.headerText4B,
                                            ]}>
                                                Newest
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={() => setModalVisible(false)}>
                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </View>

            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>

                {/* <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL]}>Account Type</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="Professionals"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Clinics"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Offices"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Others"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                    </View>
                </View> */}

              

                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>Account Type</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer1}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Select Account Type"
                            placeholderTextColor="#979797"
                            value={selectedOption}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisible}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setModalVisible(false)}
                    >
                         <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setModalVisible(false)}
                        >
                            <TouchableOpacity style={styles.modalContent} activeOpacity={1}
                                onPress={() => { }}>
                                <View style={{ paddingBottom: height * 0.06 }}>
                                    <View style={styles.horizontalLine}></View>
                                   
                                    <TouchableOpacity onPress={() => handleOptionSelect('Professionals')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedOption === 'Professionals' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedOption === 'Professionals'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedOption === 'Professionals' && commonStyles.headerText4B,
                                            ]}>
                                                Professionals
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelect('Clinics')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedOption === 'Clinics' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedOption === 'Clinics'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedOption === 'Clinics' && commonStyles.headerText4B,
                                            ]}>
                                                Clinics
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelect('Offices')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedOption === 'Offices' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedOption === 'Offices'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedOption === 'Offices' && commonStyles.headerText4B,
                                            ]}>
                                                Offices
                                            </Text>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionSelect('Others')} style={styles.option}>
                                        <View style={[
                                            styles.checkboxContainer,
                                            selectedOption === 'Others' && styles.selectedCheckboxContainer,
                                        ]}>
                                            <Image
                                                source={
                                                    selectedOption === 'Others'
                                                        ? require('../../../assets/img/Rect1.png')
                                                        : require('../../../assets/img/Rect.png')
                                                }
                                                style={styles.checkboxImage}
                                            />

                                            <Text style={[
                                                commonStyles.headerText4BL,
                                                selectedOption === 'Others' && commonStyles.headerText4B,
                                            ]}>
                                                Others
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                              
                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={() => setModalVisible(false)}>
                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>
       
                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                        Services
                    </Text>

                    <TouchableOpacity onPress={handleServiceModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Services"
                            placeholderTextColor="#979797"
                            // value={selectedServices.join(', ')}
                            value={selectedServiceName.length > 0 ? selectedServiceName[0] : ''}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {/* <Text style={styles.totalServiceText}>
                                        +{selectedServices.filter(service => service !== 'Other').length + (showOtherInput ? 1 : 0)}
                                    </Text> */}
                        {selectedServices.length > 0 ? (
                            <Text style={styles.totalServiceText}>+{selectedServices.filter(service => service !== 'Other').length + (showOtherServiceInput ? 1 : 0)} more</Text>
                        ) : (
                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                        )}
                    </TouchableOpacity>
                    <Modal
                        visible={serviceModalVisible}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setServiceModalVisible(false)} // To handle Android back button
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setServiceModalVisible(false)} // Close the modal when clicking on the background
                        >
                            <TouchableOpacity style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}>
                                <View style={styles.horizontalLine}></View>
                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                    Tell us your services <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                </Text>
                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                    Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                </Text>
                                <FlatList
                                    style={{ paddingBottom: height * 0.06 }}
                                    data={[...servicesData]} // Add 'Other' as an additional item
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                toggleService(item.id, item.service);
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.checkboxContainer,
                                                    selectedServices.includes(item.service) && styles.selectedCheckboxContainer,
                                                ]}
                                            >
                                                <Image
                                                    source={
                                                        selectedServices.includes(item.id) || (showOtherServiceInput && item.id === 'other')
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />

                                                <Text style={selectedServices.includes(item.service) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                    {item.service}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={handleServiceModalSubmit}>
                                <Text style={commonStyles.buttonText}>Submit</Text>
                            </TouchableOpacity>


                        </TouchableOpacity>
                    </Modal>

                </View>

                    <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                        Specialities
                    </Text>

                    <TouchableOpacity onPress={handleSpecialtiesModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Specialities"
                            placeholderTextColor="#979797"
                            // value={selectedServices.join(', ')}
                            value={selectedSpecialityName.length > 0 ? selectedSpecialityName[0] : ''}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {/* <Text style={styles.totalServiceText}>
                                        +{selectedServices.filter(service => service !== 'Other').length + (showOtherInput ? 1 : 0)}
                                    </Text> */}
                        {selectedSpecialties.length > 0 ? (
                            <Text style={styles.totalServiceText}>+{selectedSpecialties.filter(speciality => speciality !== 'Other').length + (showOtherSpecialityInput ? 1 : 0)} more</Text>
                        ) : (
                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                        )}
                    </TouchableOpacity>
                    <Modal
                        visible={specialtiesModalVisible}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setSpecialtiesModalVisible(false)} // To handle Android back button
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setSpecialtiesModalVisible(false)} // Close the modal when clicking on the background
                        >
                            <TouchableOpacity style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}>
                                <View style={styles.horizontalLine}></View>
                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                    Tell us your speciality <Text style={commonStyles.headerText3G}> (up to 5)</Text>
                                </Text>
                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                </Text>
                                <FlatList
                                    style={{ paddingBottom: height * 0.06 }}
                                    data={[...specialtiesData, ]} // Add 'Other' as an additional item
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                toggleSpeciality(item.id, item.speciality);
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.checkboxContainer,
                                                    selectedSpecialties.includes(item.speciality) && styles.selectedCheckboxContainer,
                                                ]}
                                            >
                                                <Image
                                                    source={
                                                        selectedSpecialties.includes(item.id) || (showOtherSpecialityInput && item.id === 'other')
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />
                                                <Text style={selectedSpecialties.includes(item.speciality) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                    {item.speciality}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={handleSpecialtiesModalSubmit}>
                                <Text style={commonStyles.buttonText}>Submit</Text>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </Modal>

                </View>

                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                        Key Forte 
                    </Text>
                    <TouchableOpacity onPress={handleKeyForteModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Select Key Forte"
                            placeholderTextColor="#979797"
                            // value={selectedKeyForte.length > 0 ? selectedKeyForte.join(', ') : ''}
                            value={selectedKeyForteName.length > 0 ? selectedKeyForteName[0] : ''}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {selectedKeyForte.length > 0 ? (
                            <Text style={styles.totalServiceText}>+{selectedKeyForte.filter(keyForte => keyForte !== 'Other').length + (showOtherKeyForteInput ? 1 : 0)} more</Text>
                        ) : (
                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                        )}
                    </TouchableOpacity>
                    <Modal
                        visible={keyForteModalVisible}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setKeyForteModalVisible(false)} // To handle Android back button
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setKeyForteModalVisible(false)} // Close the modal when clicking on the background
                        >
                            <TouchableOpacity style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}>
                                <View style={styles.horizontalLine}></View>
                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                    Tell us your key forte <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                </Text>
                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                    Note: Tell us something about yourself to let users know you better
                                </Text>
                                <FlatList
                                    style={{ paddingBottom: showOtherKeyForteInput ? 0 : height * 0.06 }}
                                    data={[...keyForteData, ]} // Add 'Other' as an additional item
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                toggleKeyForte(item.id, item.keyforte);
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.checkboxContainer,
                                                    selectedKeyForte.includes(item.keyforte) && styles.selectedCheckboxContainer,
                                                ]}
                                            >
                                                <Image
                                                    source={
                                                        selectedKeyForte.includes(item.id) || (showOtherKeyForteInput && item.id === 'other')
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />
                                                <Text style={selectedKeyForte.includes(item.keyforte) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                    {item.keyforte}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03 }]} activeOpacity={0.8} onPress={handleKeyForteModalSubmit}>
                                <Text style={commonStyles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>

                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>
                        Qualifications 
                    </Text>
                    <TouchableOpacity onPress={handleQualificationsModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Select Qualifications"
                            placeholderTextColor="#979797"
                            // value={selectedQualifications.length > 0 ? selectedQualifications.join(', ') : ''}
                            value={selectedQualificationName.length > 0 ? selectedQualificationName[0] : ''}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {selectedQualifications.length > 0 ? (
                            <Text style={styles.totalServiceText}>+{selectedQualifications.filter(qualification => qualification !== 'Other').length + (showOtherQualificationInput ? 1 : 0)} more</Text>
                        ) : (
                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                        )}
                    </TouchableOpacity>
                    <Modal
                        visible={qualificationsModalVisible}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setQualificationsModalVisible(false)} // To handle Android back button
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setQualificationsModalVisible(false)} // Close the modal when clicking on the background
                        >
                            <TouchableOpacity style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}>
                                <View style={styles.horizontalLine}></View>
                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                    Tell us your qualifications <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                </Text>
                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                    Note: Type services like Root Canal, Aligners, Oral Surgery, etc to show specialisation you provide.
                                </Text>
                                <FlatList
                                    data={[...qualificationsData,]} // Add 'Other' as an additional item
                                    style={{ paddingBottom: showOtherQualificationInput ? 0 : height * 0.06 }} // Add paddingBottom conditionally
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                toggleQualification(item.id, item.qualification);
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.checkboxContainer,
                                                    selectedQualifications.includes(item.qualification) && styles.selectedCheckboxContainer,
                                                 ]}
                                            >
                                                <Image
                                                    source={
                                                        selectedQualifications.includes(item.id) || (showOtherQualificationInput && item.id === 'other')
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />
                                                <Text style={selectedQualifications.includes(item.qualification) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                    {item.qualification}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03 }]} activeOpacity={0.8} onPress={handleQualificationsModalSubmit}>
                                <Text style={commonStyles.buttonText}>Submit</Text>
                            </TouchableOpacity>

                        </TouchableOpacity>
                    </Modal>
                </View>

                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText4BL, { marginBottom: moderateScale(8), }]}>
                        Experiences <Text style={styles.requiredIndicator}>*</Text>
                    </Text>
                    <TouchableOpacity onPress={handleExperienceModal} activeOpacity={0.8} style={[styles.inputContainer1]}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Select Experiences"
                            placeholderTextColor="#979797"
                            // value={selectedQualifications.length > 0 ? selectedQualifications.join(', ') : ''}
                            value={selectedExperienceName.length > 0 ? selectedExperienceName[0] : ''}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                        {selectedExperience.length > 0 ? (
                            <Text style={styles.totalServiceText}>+{selectedExperience.filter(experience => experience !== 'Other').length + (showOtherExperienceInput ? 1 : 0)} more</Text>
                        ) : (
                            <Image source={require('../../../assets/img/Add.png')} style={styles.closeP} />
                        )}
                    </TouchableOpacity>

                    <Modal
                        visible={experienceModalVisible}
                        transparent
                        onRequestClose={() => setExperienceModalVisible(false)}// To handle Android back button
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.modalContainer}
                            onPress={() => setExperienceModalVisible(false)} // Close the modal when clicking on the background
                        >
                            <TouchableOpacity style={styles.modalContent}
                                activeOpacity={1}
                                onPress={() => { }}>
                                <View style={styles.horizontalLine}></View>
                                <Text style={[commonStyles.headerText4BL, { marginVertical: height * 0.02 }]}>
                                    Tell us your services <Text style={commonStyles.headerText3G}> (upto 5)</Text>
                                </Text>
                                <Text style={[commonStyles.headerText6G, { marginBottom: height * 0.025 }]}>
                                    Note: Type services like Root Canal, Aligners, Oral Surgery,  etc to show specialisation you provide.
                                </Text>
                                <FlatList
                                    style={{ paddingBottom: showOtherExperienceInput ? 0 : 46 }}
                                    data={[...experienceData]} // Add 'Other' as an additional item
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                toggleExperience(item.id, item.experience);
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.checkboxContainer,
                                                    selectedExperience.includes(item.experience) && styles.selectedCheckboxContainer,
                                                ]}
                                            >
                                                <Image
                                                    source={
                                                        selectedExperience.includes(item.id) || (showOtherExperienceInput && item.id === 'other')
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />
                                                <Text style={selectedExperience.includes(item.experience) ? commonStyles.headerText4B : commonStyles.headerText4BL}>
                                                    {item.experience}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.id}
                                />


                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: 20, }]} activeOpacity={0.8} onPress={handleExperienceModalSubmit}>
                                <Text style={commonStyles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>

                </View>

                <View style={styles.inputContainerWithLabel}>
                    <Text style={[commonStyles.headerText3BL, { marginBottom: moderateScale(8), }]}>Availability</Text>
                    <TouchableOpacity onPress={() => setModalVisibleA(true)} style={styles.inputContainer1}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Select Availability"
                            placeholderTextColor="#979797"
                            value={selectedDays.map((selectedId) => daysList.find((day) => day.id === selectedId)?.day).join(', ')}
                            underlineColorAndroid="transparent"
                            editable={false}
                        />
                    </TouchableOpacity>
                    <Modal
                        visible={modalVisibleA}
                        transparent
                        activeOpacity={1}
                        onRequestClose={() => setModalVisibleA(false)}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.modalContainer}
                            onPress={() => setModalVisibleA(false)}
                        >
                            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                <View style={{ paddingBottom: height * 0.06 }}>
                                    <View style={styles.horizontalLine}></View>
                                    {daysList.map((day) => (
                                        <TouchableOpacity key={day.id} onPress={() => handleOptionASelect(day.id, day.day)} style={styles.option}>
                                            <View style={[
                                                styles.checkboxContainer,
                                                selectedDays.includes(day.id) && styles.selectedCheckboxContainer,
                                            ]}>
                                                <Image
                                                    source={
                                                        selectedDays.includes(day.id)
                                                            ? require('../../../assets/img/Rect1.png')
                                                            : require('../../../assets/img/Rect.png')
                                                    }
                                                    style={styles.checkboxImage}
                                                />
                                                <Text style={[
                                                    commonStyles.headerText4BL,
                                                    selectedDays.includes(day.id) && commonStyles.headerText4B,
                                                ]}>
                                                    {day.day}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <TouchableOpacity style={[commonStyles.button, { position: 'absolute', bottom: height * 0.03, }]} activeOpacity={0.8} onPress={() => setModalVisibleA(false)}>
                                    <Text style={commonStyles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>

                {/* <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL]}>Availability (open or shut)</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="Open"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Shut"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('availability', value, active)}
                        />
                    </View>
                </View>
                <View style={styles.availableC}>
                    <Text style={[commonStyles.headerText3BL]}>What are you looking for?</Text>
                    <View style={styles.toggleList}>
                        <ToggleContainer
                            text="Open all week"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('lookingFor', value, active)}
                        />
                        <View style={styles.line} />
                        <ToggleContainer
                            text="Any availability"
                            imageSource1={require('../../../assets/img/Toggle.png')}
                            imageSource2={require('../../../assets/img/ToggleC.png')}
                            onToggle={(value, active) => handleToggleChange('lookingFor', value, active)}
                        />
                    </View>
                </View> */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={commonStyles.button1H}
                        onPress={() => navigation.navigate('Explore')}>
                        <Text style={commonStyles.buttonText1H}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={commonStyles.buttonH}
                        onPress={handleSubmit}>
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

    inputContainerWithLabel: {
        marginTop: height * 0.03
    },
    inputContainer1: {
        flexDirection: 'row',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: moderateScale(41),
        width: '100%',
        //marginBottom: moderateScale(16),
        justifyContent: 'space-between',
    },
    inputs: {
        marginLeft: width * 0.04,
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        flex: 1
    },
    totalServiceText: {
        position: 'absolute',
        right: width * 0.04,
        top: '50%',
        transform: [{ translateY: -10 }],
        color: '#289EF5',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
    },
    closeP: {
        position: 'absolute',
        right: width * 0.04,
        top: '50%',
        transform: [{ translateY: -10 }],
        width: 20,
        height: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background blur effect
    },
    modalContent: {
        backgroundColor: '#FEFCFC',
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: moderateScale(16),
        maxHeight: '95%',
        minHeight: 100,
        paddingBottom: 30,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#12121',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#289EF5',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FEFCFC',
        fontWeight: 'bold',
    },
    image: {
        width: 20,
        height: 20,
        marginRight: width * 0.05,
        alignSelf: 'center',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    serviceButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8F8FF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        marginRight: 10,
    },
    selectedServiceButton: {
        backgroundColor: '#289EF5',
    },
    selectedServiceButtonText: {
        alignSelf: 'center',
        color: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontSize: responsiveFontSize(15),
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    serviceButtonText: {
        fontSize: responsiveFontSize(15),
        alignSelf: 'center',
        color: '#289EF5',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.028 //28
    },
    closeButton: {
        padding: 5,
    },
    closeImage: {
        width: 15,
        height: 15,
    },
    checkboxImage: {
        height: moderateScale(18),
        width: moderateScale(18),

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        //flexWrap: 'wrap',
        marginVertical: moderateScale(12),
        paddingRight: moderateScale(18),

        // paddingLeft: moderateScale(18),
    },
    hoveredCheckboxContainer: {
        backgroundColor: '#E8F8FF',
    },
    servicesContainer11: {
        //paddingHorizontal: moderateScale(18),
    },
    horizontalLine: {
        width: '20%',
        height: 5,
        marginBottom: height * 0.03,
        //marginHorizontal: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#979797',
        borderRadius: 10
    },
});

export default FiltersScreen;
