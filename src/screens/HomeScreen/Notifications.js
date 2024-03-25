/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationItem from '../../components/NotificationItem';

const Notifications = ({ navigation }) => {

    const notifications = [
        { id: 1, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM', isRead: true },
        { id: 2, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM', isRead: false },
        { id: 3, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM', isRead: false },
        { id: 4, title: 'Another notification', time: 'Yesterday at 3:30 PM', isRead: false },
        { id: 5, title: 'Another notification', time: 'Yesterday at 3:30 PM', isRead: true },
        { id: 6, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM', isRead: true },
        { id: 7, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM', isRead: false },
        { id: 8, title: 'Another notification', time: 'Yesterday at 3:30 PM', isRead: false },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={[commonStyles.wrapT, { paddingHorizontal: 20 }]}>
                    <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/img/Back.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                    <Text style={commonStyles.backText}>Notifications</Text>
                    <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                        <Image
                            source={require('../../../assets/img/Option.png')}
                            style={commonStyles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.subContainer}>
                <View style={{ height: 1, backgroundColor: '#ccc' }} />
                {/* Render the list of notifications */}
                {notifications.map((notification, index) => (
                    <View key={notification.id}>
                        <NotificationItem
                            title={notification.title}
                            time={notification.time}
                            isRead={notification.isRead}
                        />
                        {index < notifications.length - 1 && <View style={styles.separator} />}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FEFCFC',
        paddingVertical: 10,
        //paddingHorizontal: 20
    },
    subContainer: {
        marginVertical: 12,
        marginBottom: 40
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
export default Notifications;
