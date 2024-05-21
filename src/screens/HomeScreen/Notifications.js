/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import commonStyles from '../../components/CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationItem from '../../components/NotificationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({ navigation }) => {

    // const [notifications, setNotifications] = useState([
    //     { id: 1, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
    //     { id: 2, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
    //     { id: 3, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
    //     { id: 4, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
    //     { id: 5, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
    //     { id: 6, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
    //     { id: 7, title: 'Dennis Nedry commented on Isla Nublar SOC2 compliance report', time: 'Last Wednesday at 9:42 AM' },
    //     { id: 8, title: 'Another notification', time: 'Yesterday at 3:30 PM' },
    // ]);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const pr_id = await AsyncStorage.getItem('pr_id');
            const id = parseInt(pr_id);

            const response = await fetch(`https://temp.wedeveloptech.in/denxgen/appdata/getpersnotificationlist-ax.php?pr_id=${id}`);
            const data = await response.json();
            console.log(response);
            console.log(data);
            if (data.code === 1) {
                const sortedData = data.data.sort((a, b) => new Date(b.dateupdated) - new Date(a.dateupdated));

                const formattedData = sortedData.map(notification => ({
                    ...notification,
                    dateupdated: formatDateTime(notification.dateupdated)
                }));

                setNotifications(formattedData);
                console.log(notifications);
            } else {
                console.error('Error fetching notifications:', data.message);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        return `${date}, ${time}`;
    };

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
                {/* {notifications.map((notification, index) => (
                    <TouchableOpacity onPress={() => markAsRead(notification.id)} activeOpacity={0.8}>
                        <NotificationItem
                            title={notification.title}
                            time={notification.time}
                            isRead={notification.isRead}
                        />
                        {index < notifications.length - 1 && <View style={styles.separator} />}
                    </TouchableOpacity>
                ))} */}
                {notifications.map((notification, index) => (
                    <TouchableOpacity key={notification.id} onPress={() => markAsRead(notification.id)} activeOpacity={0.8}>
                        <NotificationItem
                            title={notification.content}
                            time={notification.dateupdated}
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
