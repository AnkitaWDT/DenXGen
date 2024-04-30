/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationItem from '../../components/NotificationItem';

const Notifications = ({ navigation }) => {

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
        { id: 2, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
        { id: 3, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
        { id: 4, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
        { id: 5, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
        { id: 6, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
        { id: 7, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
        { id: 8, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
    ]);

    const markAsRead = (id) => {
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        );
        setNotifications(updatedNotifications);
    };

    
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
                    <TouchableOpacity onPress={() => markAsRead(notification.id)} activeOpacity={0.8}>
                        <NotificationItem
                            title={notification.title}
                            time={notification.time}
                            isRead={notification.isRead}
                        />
                        {index < notifications.length - 1 && <View style={styles.separator} />}
                    </TouchableOpacity>
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
