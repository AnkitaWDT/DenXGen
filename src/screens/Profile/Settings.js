/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';


const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={commonStyles.wrapT}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Settings</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 9,
                        borderWidth: 1,
                        borderRadius: 24,
                        borderColor: '#289EF5',
                        marginBottom: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 51,
                        backgroundColor: '#fff'
                    }}
                >
                    {/* Left side image and text */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={commonStyles.headerText4BL}>Change Phone Number</Text>
                                <Image source={require('../../../assets/img/RightView.png')} style={{ width: 24, height: 24 }} />

                            </View>

                        </View>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 9,
                        borderWidth: 1,
                        borderRadius: 24,
                        borderColor: '#289EF5',
                        marginBottom: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: 51,
                        backgroundColor: '#FEFCFC'
                    }}
                >
                    {/* Left side image and text */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, paddingVertical: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <Text style={commonStyles.headerText4BL}>Delete Account</Text>
                                <Image source={require('../../../assets/img/RightView.png')} style={{ width: 24, height: 24 }} />
                            </View>

                        </View>
                    </View>

                </TouchableOpacity>
            </ScrollView>
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
    }
});


export default Settings;
