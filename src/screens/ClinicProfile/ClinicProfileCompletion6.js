/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
    FlatList,
    Picker,
    PixelRatio
} from 'react-native';
import CustomYearPicker from '../../components/CustomYearPicker';
import CustomMonthPicker from '../../components/CustomMonthPicker';
import commonStyles from '../../components/CommonStyles';
import Animation from '../../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import { ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const ClinicProfileCompletion6 = ({ navigation, route }) => {

    const { cl_id } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate an asynchronous operation (e.g., fetching data) before rendering the profile screen
        const fakeAsyncOperation = async () => {
            // Add any asynchronous logic here if needed
            // For now, just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set loading state to false after the delay
            setIsLoading(false);
        };

        // Execute the fakeAsyncOperation
        fakeAsyncOperation();
    }, []);



    const currentStep = 6; // For example, current step is 4
    const totalSteps = 9; // Total number of steps

    const progressPercentage = (currentStep / totalSteps) * 100; // Calculate progress percentage
    console.log("Progress Percentage:", progressPercentage);

   
     const [dentistsInputs, setDentistsInputs] = useState([]);
    const [selectedDentists, setSelectedDentists] = useState([]);
     const [chiefDentistsInputs, setChiefDentistsInputs] = useState([]);
    const [selectedChiefDentists, setSelectedChiefDentists] = useState([]);
    const [teamsInputs, setTeamsInputs] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [branchesInputs, setBranchesInputs] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);


    const handleAddDentistInput = () => {
        if (dentistsInputs.length < 1) {
            navigation.navigate('SelectDentist', { onSelectDentist: handleSelectDentist });
        }
    };

    const handleSelectDentist = (dentist) => {
        setSelectedDentists([...selectedDentists, dentist.name]);
        setDentistsInputs([...dentistsInputs, '']);
    };

    const handleRemoveDentistInput = (indexToRemove) => {
        const updatedDentists = selectedDentists.filter((_, index) => index !== indexToRemove);
        setSelectedDentists(updatedDentists);

        const updatedInputs = dentistsInputs.filter((_, index) => index !== indexToRemove);
        setDentistsInputs(updatedInputs);
    };

    const handleAddChiefDentistInput = () => {
        if (chiefDentistsInputs.length < 1) {
            navigation.navigate('SelectCDentist', { onSelectChiefDentist: handleSelectChiefDentist });
        }
    };

    const handleSelectChiefDentist = (chiefDentist) => {
        setSelectedChiefDentists([...selectedChiefDentists, chiefDentist.name]);
        setChiefDentistsInputs([...chiefDentistsInputs, '']);
    };

    const handleRemoveChiefDentistInput = (indexToRemove) => {
        const updatedChiefDentists = selectedChiefDentists.filter((_, index) => index !== indexToRemove);
        setSelectedChiefDentists(updatedChiefDentists);

        const updatedInputs = chiefDentistsInputs.filter((_, index) => index !== indexToRemove);
        setChiefDentistsInputs(updatedInputs);
    };

    const handleAddTeamsInput = () => {
        if (teamsInputs.length < 5) {
            navigation.navigate('SelectTeams', { onSelectTeams: handleSelectTeams });
        }
    };

    const handleSelectTeams = (teams) => {
        setSelectedTeams([...selectedTeams, teams.name]);
        setTeamsInputs([...teamsInputs, '']);
    };

    const handleRemoveTeamsInput = (indexToRemove) => {
        const updatedTeams = selectedTeams.filter((_, index) => index !== indexToRemove);
        setSelectedTeams(updatedTeams);

        const updatedInputs = teamsInputs.filter((_, index) => index !== indexToRemove);
        setTeamsInputs(updatedInputs);
    };

    const handleAddBranchesInput = () => {
        if (branchesInputs.length < 5) {
            navigation.navigate('SelectBranches', { onSelectBranches: handleSelectBranches });
        }
    };

    const handleSelectBranches = (branches) => {
        setSelectedBranches([...selectedBranches, branches.name]);
        setBranchesInputs([...branchesInputs, '']);
    };

    const handleRemoveBranchesInput = (indexToRemove) => {
        const updatedBranches = selectedBranches.filter((_, index) => index !== indexToRemove);
        setSelectedBranches(updatedBranches);

        const updatedInputs = branchesInputs.filter((_, index) => index !== indexToRemove);
        setBranchesInputs(updatedInputs);
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                    <Animation />
                </View>

            ) : (
                <View style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                        <View style={styles.contentContainer}>
                            <View style={styles.headerTextContainer}>
                                <Text style={[commonStyles.headerText1BL, {
                                    marginBottom: 6, textAlign: 'center'
                                }]}>Step 6 - Clinic Details</Text>
                                <Text style={[commonStyles.headerText2BL, {
                                    textAlign: 'center', paddingHorizontal: width * 0.02
                                }]}>Choose your career category and unlock endless possibilities.</Text>
                                {/* <Image source={require('../../../assets/img/Prog2.png')} style={commonStyles.progImage} /> */}
                                <ProgressBar
                                    progress={progressPercentage / 100}
                                    color="#00B0FF"
                                    style={commonStyles.progImage}
                                />
                            </View>
 <View style={styles.inputContainerWithLabel}>
                                <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                    Founders <Text style={styles.requiredIndicator}>*</Text>
                                </Text>
                                {dentistsInputs.map((value, index) => (
                                    <View key={index} style={styles.inputContainer1}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="Select Dentist"
                                            placeholderTextColor="#979797"
                                            value={selectedDentists[index] ? selectedDentists[index] : ''}
                                            editable={false}
                                        />
                                        <TouchableOpacity onPress={() => handleRemoveDentistInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                            <Image
                                                source={require('../../../assets/img/close.png')} // Close image for removing dentist input
                                                style={styles.closeImage}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                                {dentistsInputs.length < 1 && (
                                    <TouchableOpacity onPress={handleAddDentistInput} style={styles.inputContainer1}>
                                        <Text style={styles.inputsP}>Add Founder</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                                <View style={styles.inputContainerWithLabel}>
                                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                        Chief Dentist <Text style={styles.requiredIndicator}>*</Text>
                                    </Text>
                                    {chiefDentistsInputs.map((value, index) => (
                                        <View key={index} style={styles.inputContainer1}>
                                            <TextInput
                                                style={styles.inputs}
                                                placeholder="Select Chief Dentist"
                                                placeholderTextColor="#979797"
                                                value={selectedChiefDentists[index] ? selectedChiefDentists[index] : ''}
                                                editable={false}
                                            />
                                            <TouchableOpacity onPress={() => handleRemoveChiefDentistInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                                <Image
                                                    source={require('../../../assets/img/close.png')} // Close image for removing dentist input
                                                    style={styles.closeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {chiefDentistsInputs.length < 1 && (
                                        <TouchableOpacity onPress={handleAddChiefDentistInput} style={styles.inputContainer1}>
                                            <Text style={styles.inputsP}>Add Chief Dentist</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                <View style={styles.inputContainerWithLabel}>
                                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                       Teams <Text style={styles.requiredIndicator}>*</Text>
                                    </Text>
                                    {teamsInputs.map((value, index) => (
                                        <View key={index} style={styles.inputContainer1}>
                                            <TextInput
                                                style={styles.inputs}
                                                placeholder="Select Teams"
                                                placeholderTextColor="#979797"
                                                value={selectedTeams[index] ? selectedTeams[index] : ''}
                                                editable={false}
                                            />
                                            <TouchableOpacity onPress={() => handleRemoveTeamsInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                                <Image
                                                    source={require('../../../assets/img/close.png')} // Close image for removing dentist input
                                                    style={styles.closeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {teamsInputs.length < 5 && (
                                        <TouchableOpacity onPress={handleAddTeamsInput} style={styles.inputContainer1}>
                                            <Text style={styles.inputsP}>Add Teams</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>


                                <View style={styles.inputContainerWithLabel}>
                                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8 }]}>
                                        Branches <Text style={styles.requiredIndicator}>*</Text>
                                    </Text>
                                    {branchesInputs.map((value, index) => (
                                        <View key={index} style={styles.inputContainer1}>
                                            <TextInput
                                                style={styles.inputs}
                                                placeholder="Select Branches"
                                                placeholderTextColor="#979797"
                                                value={selectedBranches[index] ? selectedBranches[index] : ''}
                                                editable={false}
                                            />
                                            <TouchableOpacity onPress={() => handleRemoveBranchesInput(index)} style={styles.closeContainer} activeOpacity={0.8}>
                                                <Image
                                                    source={require('../../../assets/img/close.png')} // Close image for removing dentist input
                                                    style={styles.closeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    {branchesInputs.length < 5 && (
                                        <TouchableOpacity onPress={handleAddBranchesInput} style={styles.inputContainer1}>
                                            <Text style={styles.inputsP}>Add Branches</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* <View style={styles.inputContainerWithLabel}>
                                    <Text style={[commonStyles.headerText4BL, { marginBottom: 8, }]}>
                                        Branches <Text style={styles.requiredIndicator}>*</Text>
                                    </Text>
                                    <View style={styles.inputContainer1}>
                                        <TextInput
                                            style={styles.inputs}
                                            placeholder="Branches"
                                            placeholderTextColor="#979797"
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                </View> */}

                                <TouchableOpacity
                                    style={[commonStyles.button, ]}
                                    onPress={() => {
                                        // navigation.navigate('ClinicProfileCompletion7');
                                        navigation.navigate('ClinicProfileCompletion7', { cl_id: cl_id });
                                        console.log('ProfileCompletion21');
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Text style={commonStyles.buttonText}>Continue</Text>
                                </TouchableOpacity>
                        </View>
                    </ScrollView>
                   
                </View>

            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputsP: {
        marginHorizontal: width * 0.05,
        color: '#979797',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        alignSelf: 'center',
        width: '100%'
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background blur effect
    },
    modalContent: {
        backgroundColor: '#FEFCFC',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%', // Maximum height of 50%
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
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: height * 0.22,
    },
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
        //zIndex: 1,
    },
    headerText1: {
        fontSize: 24,
        fontFamily: 'Mukta-Bold',
        color: '#121212',
        marginBottom: 17,
    },
    headerText2: {
        fontSize: 18,
        color: '#121212',
        fontFamily: 'Mukta-Regular',
        lineHeight: 25,
        textAlign: 'center',
    },
    contentContainer: {
        marginTop: 32,
        //justifyContent: 'center',
        //alignItems: 'center',
        //marginTop: height * 0.00,
    },
    progImage: {
        height: 26,
        width: 311,
        alignSelf: 'center',
        marginBottom: 20,
    },
    inputContainer1: {
        flexDirection: 'row',
        borderColor: '#1C1C1C',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#FEFCFC',
        height: 42,
        width: '100%',
        marginBottom: 16,
        justifyContent: 'space-between',
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
    inputContainerM: {
        flexDirection: 'row',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.015,
        justifyContent: 'space-between',
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    inputContainerC: {
        flexDirection: 'row',
        borderColor: '#494949',
        borderWidth: 0.5,
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: '#F5F5F5',
        height: height * 0.06,
        width: width * 0.9,
        marginBottom: height * 0.025,
        justifyContent: 'space-between',
    },
    inputs: {
        marginLeft: width * 0.04,
        color: '#121212',
        //fontSize: responsiveFontSize(14),
        fontFamily: 'DMSans-Medium',
        flex: 1
    },
    button: {
        alignSelf: 'center',
        height: height * 0.06,
        width: width * 0.9,
        backgroundColor: '#289EF5',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 18,
    },
    modalHeaderText: {
        color: '#121212',
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 10,

    },
    uptoText: {
        color: '#979797',
        fontSize: 16,
        fontFamily: 'Mukta-SemiBold',
        marginLeft: 10,
        //marginBottom: 10
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Mukta-Bold',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalTextarea: {
        height: 134,
        borderColor: '#979797',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.022,
    },
    modalTextareaContainer: {
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#289EF5',
        marginHorizontal: 55,
        borderRadius: 100,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButton: {
        alignSelf: 'flex-end',  // Align to the right side
        marginBottom: 10,  // Add spacing if needed
    },
    addButtonText: {
        color: '#289EF5',  // Use a color that fits your design
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
    },
    dropdownContainer: {
        //width: 330,
        //justifyContent: 'center',
        //alignSelf: 'center',
        position: 'relative',
        marginBottom: 15,
        //zIndex: 2000,
        //paddingHorizontal: width * 0.067,
    },
    inputContainerWithLabel: {
        //paddingHorizontal: width * 0.067,
    },
    label: {
        fontSize: 16,
        color: '#121212',
        marginBottom: 5,
        fontFamily: 'Mukta-Bold',
    },
    requiredIndicator: {
        color: 'red', // Change the color as needed
        fontSize: 16,
        fontFamily: 'Mukta-Bold',
        marginLeft: 5,
    },
    labelD: {
        fontSize: 16,
        color: '#121212',
        marginBottom: 5,
        fontFamily: 'Mukta-Bold',
    },
    closeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 20, // Adjust height if needed
        width: 20, // Adjust width if needed
        marginRight: width * 0.05,
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
    continueButton: {
        position: 'absolute',
        bottom: 30,
    },
    yearDropdown: {
        paddingVertical: 3,
        // paddingHorizontal: width * 0.02,
        borderRadius: 6,
        borderColor: '#289EF5',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: width * 0.1,
        width: width * 0.25,
        backgroundColor: 'rgba(232, 248, 255, 1)'
    },
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#979797',
        borderTopColor: '#979797'
    },
    toggleButton: {
        padding: 10,
    },

    toggleIcon: {
        width: 24,
        height: 24,
    },
});

export default ClinicProfileCompletion6;
