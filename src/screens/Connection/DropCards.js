/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, TextInput, SafeAreaView, StyleSheet, Image, PixelRatio, Dimensions } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Contacts from 'react-native-contacts';
import Animation from '../../components/Loader';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { Tabs, Tab } from 'native-base'; 

const { width, height } = Dimensions.get('window');
const responsiveFontSize = (size) => {
    const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};


const DropCards = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [contacts, setContacts] = useState([]);
    const tabs = ['Professionals', 'Clinics', 'Others', 'Office'];

    const data = [
        // Data for Tab 1
        [
            {
                id: 1, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 2, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 3, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
            },
            {
                id: 4, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 5, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
            },
            {
                id: 6, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 7, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 8, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
        ],
        // Data for Tab 2
        [
            {
                id: 1, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 2, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
            },
            {
                id: 3, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 4, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 5, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 6, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 2
            },
            {
                id: 7, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
        ],

        // Data for Tab 3
        [
            {
                id: 1, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 2, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 3, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 4, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 5, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
        ],


        // Data for Tab 4
        [
            {
                id: 1, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                //image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 2, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 3, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
            {
                id: 4, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 1
            },
            {
                id: 5, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                //image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 2
            },
            {
                id: 6, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHxFVs25QxhqeWwnKvnc6OateNXW_0EH7VAQ&usqp=CAU',
                gender: 2
            },
            {
                id: 7, title: 'Ankita Iyer', description: 'Bachelors in Dental Technicians..', star: '4.8', location: 'Ghatkopar, India',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
                gender: 1
            },
        ],

    ];

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


    const handleTabPress = (index) => {
        setActiveTab(index);
    };

    const handleSearch = (query) => {
        // Handle the search logic based on the query
        setSearchQuery(query);
    };

    const openContactDetails = (contact) => {
        console.log(JSON.stringify(contact));
        Contacts.openExistingContact(contact);
    };

    //  <Checkbox
    //                 isChecked={checkboxStates[item.id]?.isChecked || false}
    //                 onPress={() => handleCheckboxChange(item.id, item.name)}
    //             />
    // {/* <Text style={styles.optionText}>{item.name}</Text> */}

    const truncateText = (text, maxWidth, fontSize) => {
        const ellipsisWidth = 30; // Width of the ellipsis
        const maxTextWidth = maxWidth - ellipsisWidth;

        if (!text) {
            return '';
        }

        let width = 0;
        let truncatedText = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charWidth = measureCharWidth(char, fontSize);

            if (width + charWidth <= maxTextWidth) {
                width += charWidth;
                truncatedText += char;
            } else {
                break;
            }
        }

        if (text.length > truncatedText.length) {
            truncatedText += '...';
        }

        return truncatedText;
    };

    const measureCharWidth = (char, fontSize) => {
        // Assuming a constant width for each character for simplicity
        // You may want to use a more accurate method for precise measurement
        const charWidth = fontSize * 0.6; // Adjust this factor based on your font and styling
        return charWidth;
    };

    const renderItem = ({ item, index }) => {

        const truncatedTitle = truncateText(item.title, width * 0.65, 17);
        const truncatedDescription = truncateText(item.description, width * 0.65, 15);


        console.log('Original title:', item.title);
        console.log('Truncated title:', truncatedTitle);

        console.log('Original description:', item.description);
        console.log('Truncated description:', truncatedDescription);

        let imageUrl;
        if (item.image) {
            imageUrl = item.image;
        } else {
            if (item.gender === 1) {
                imageUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADAQAAIBAwMEAQEFCQAAAAAAAAABAgMEEQUhMRJBUWETcSJSYoHwJCUyNDZCU5Gx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3DkoAAGLeSoCgACMJFAAEyEAwUACNk5MgAAJkA1kJYKAAAAGLZkAIlgoIwDYSCQYEnOMIuU2kly2aFfU4ReKMer29ka17dzrSlDZU4vjyagHtUuq9RvNRpS5S2RIXFaCSjVnhcLJ5ADajqFzHmal6aRs2+pKc8VoqK+8vJzBwB9JGSlFNPKfdFOLp9x8NXpk/sz2+h2WA5CWAkUARsNhICgAAgCN4AoIkUAa1/UVO1m+7WF+ZsNmlqv8rv95YA5AAAAIAABnwAzud2wmp2tNrOyw8+ThHZ0t/si9SYG4CNlAiRQRvADJTHGQBWwl5GCgARsIBg09WTdqsLiSybppatKStkovGZYYHHHIAAFIAYQAA7OmbWi9ybOMdjSm3bYfEZNIDcSKAAIkUAAAAI2UncCLcyBGwDNXUl1Wk/TTX+zaPG8g521SMVltbAcEFaxzyQCZyVDAABsZ3AA7emx6bOHvLZxDvWkXC1pxfPSB7NhLyEu5QABjyBU8gJYKBEUEbAoIuSgADHkDiX8ei7qLs31L8zXOpqtHMI1UuNpHMAgGQAADA2NPh13UE1lLdndOdpNBxhKrLmey+h0QADInkA0UAADEAVvBFuXBQABMgHuVAAScVOLjJZT2aPn7in8NedJPKi9mfQTajFtvCXJ8/WqfLVnPtJ5QHmAADPW1o/PXhTb2fJ5HrbVPirwn2T3+gHfilGKjFYSWEikTUkmuHwNwJyzIAAYmQAiQKAOdb3VSWtXVrKWadOlCUV08Zznc6JyrX+or3Z7W9P+7bl9v12OowHJUa1S9oUnhzy/EdzWqar/jpZ9tgdI8a1xTorM5Jeu5yat/cVOJ9K/Ca27eW8sDbu72Vf7MV00/HdmoAAfAQKAJkMcgblleyo4hPMqfbyjq0q1Oss05JnzxU2nlNp+gPo8kOLTv7iDx19S/Esm1T1RcVKT+sWB0ga9O9oVOJ4fiSwezeeOAMsgiQA51vP9+XMOhJujBuW2ZLtnbtv379jHU7luXwwey/i9+jzhOnS1y8l0S61bwbk2999kv13Zpybk3JvLbywIAUCABgMgJAAAAGNwAAAzuAAAAM6WmXLz8NR5+63/wAOaZQk4SUlynlAfRgwpzU6cZriSyAONd01DULuom8zp00+OzNVlAAAAHwRFAFIABCgAUxZQAAABhAAAAB2tOfVawz2ygAB/9k='; // Replace DEFAULT_MALE_IMAGE_URL with the URL of your default male image
            } else {
                imageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANcAAACUCAMAAAA3b0xFAAAAMFBMVEX29va4uLjq6uqxsbH6+vrKysrX19e1tbW8vLze3t7z8/PFxcXv7+/k5OTT09POzs6cN24OAAADy0lEQVR4nO2c23KjMAxAAQvfjf//b2tI0rRpAF8yWNrVedinbMdnZGTZFgwDwzC0gVd6D+gTwOBN1OqJnuVkB+JuYM2shBp/IZQznraYcepFaiNFTVqyZmDn8Z3VZja6iagYTDtODwxJMQh7sfp+ziRBMQgnVutkJBixSZ97jWMgJ+bOZuGGnnqPswyIWVqjmnuPtAiYRJYWudzhMrUShNZnMPlaaqHjZfOSxg1NplQsCVeCTMBsZjK8T0Tnew84E5+1JD8nIpHF+bwwfAkYlVRvCr0W23vEecxlXqOj4WXLHq8EjSIxu4Z6oELvIecAptiLxAoGBbXhHU3Cq1hrFAQSR/4W5QmF8wCQhVl+9ZoJeJU/XiQesMLi8B4w9GekYGq88O9Vcg9sXnC9x32GL9kqP9HIJ2LOKe9bsO9VlqpwpUyPe2muyoYbqDfNULil/BGwpffYj4C6rLGiMU/EitrwgUA8ESsXr3vA8HoN9VaYNyswNYQL8WalZovyA4fVq+R26A1oM2L5AdtvkB63Qd5V+T5IM32rl0aaOJrjxV6XAvXF/AbaQw4ovUj5je49/j1OG9iOw4V0Gq40zESFdPVagVC/T8F8qQItiQNxPV94YU4mYI11b+/h7/DP1oeyTWuMSL0qz0QfoO2xbDm1Wb2Q9nHYtjIKbcdeqxfWxrbm5wvpJVhhO+VfkObDzFcB9kG6fqX9V5MW2oPsxvoQ8ZVlS7gEzmy4UtWT8g3ecNVfV6ZpiDUbDnU9Xw8E4uONpvtKxF4tF0XKoX1f2zdtwNSC9UTKu/ppuL75i7Z92Zq3b2FnWYmIc/e1AYPUY7Fb+g96Qf56GwxhdqvbaqePCmGt7z/TbjYWbdL4BsAHI5dFGhPkgVgM6Wcy/Sx4Kl93uH1iI/0bDrzk7VMcFD/HcVRXYS7fzzh6z1IhPaXJ4LgMxt2Zt0sKxllPrByoJIwnYFK6P1vI3Cx7j7OQtWPvfHlWaM/WdoAlt1JUeLu9/lJygS4ClQUMvCw559DLRMAMYIqlx6N6xm6Wqt6qjmylDdZ6HsD6EFXtzlIJFzyqz5vdylc7bV9hq7TaEHqWwQ4YvkyXRmCnEIKMrlHqFjSlXZTp7022p1vKEYvT+rZBbJZ6qI3bX3QxdJqU4OP4+qW8D5Ke1Nijcc8vH4vRvlq8/OjNnBa1n0Bc2/oAEDOq2g9wdUtHa0cDTq/mhiH2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/2Yi/SXuIqru1z8NNV4H33l2H+W74AIQo8Ck+dyoUAAAAASUVORK5CYII='; // Replace DEFAULT_FEMALE_IMAGE_URL with the URL of your default female image
            }
        }

        return (
            <View>
                {/* Content row with text and button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ProfileScreen')}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}
                >
                    {/* Left side text and image */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Image */}
                        <Image
                            source={{ uri: imageUrl }}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />

                        {/* Text */}
                        <View style={{ flexDirection: 'column', }}>
                            <Text style={[commonStyles.headerText4BL, {}]}>{truncatedTitle}</Text>
                            <Text style={[commonStyles.headerText5G, {}]}>{truncatedDescription}</Text>
                        </View>
                    </View>

                    {/* Right side button */}
                    <TouchableOpacity
                        style={{
                            paddingVertical: 4,
                            paddingHorizontal: width * 0.01,
                            borderRadius: 24,
                            borderColor: '#289EF5',
                            borderWidth: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: width * 0.2,
                        }}
                        onPress={() => {
                            // Handle button press logic here
                        }}
                    >
                        <Text style={{
                            fontSize: responsiveFontSize(14),
                            alignSelf: 'center',
                            color: '#289EF5',
                            paddingHorizontal: 4,
                            textAlign: 'center',
                            fontFamily: 'DMSans-Medium',
                            lineHeight: height * 0.028 //28
                        }}>Unblock</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* Horizontal line */}
                <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 4 }} />
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>

            {isLoading ? (
                <Animation />
            ) : (
                <View>
                    <View>
                        <View style={commonStyles.wrapT}>
                            <TouchableOpacity style={commonStyles.backContainer} activeOpacity={0.8}
                                onPress={() => navigation.goBack()}>
                                <Image
                                    source={require('../../../assets/img/Back.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                            <Text style={commonStyles.backText}>Blocked Accounts</Text>
                            <TouchableOpacity style={commonStyles.backContainer1} activeOpacity={0.8}>
                                <Image
                                    source={require('../../../assets/img/Option.png')}
                                    style={commonStyles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* 

              <View style={commonStyles.searchBarContainer}>
                <View style={commonStyles.leftContainer}>
                  <View style={commonStyles.backContainerSearch}>
                    <Image
                      source={require('../../assets/img/Search.png')}
                      style={commonStyles.icon}
                    />
                  </View>
                  <TextInput
                    style={commonStyles.searchInput}
                    placeholder="Search"
                    placeholderTextColor='grey'
                    value={searchQuery}
                    onChangeText={handleSearch}
                  />
                </View>

                <View style={commonStyles.backContainerFilter}>
                  <Image
                    source={require('../../assets/img/filter.png')}
                    style={commonStyles.icon}
                  />
                </View>

              </View> */}
                    </View>


                    {/* Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {tabs.map((tab, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    height: height * 0.04,
                                    backgroundColor: activeTab === index ? "#289EF5" : '#E8F8FF',
                                    opacity: activeTab === index ? 1 : 1,
                                    borderRadius: 6,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginVertical: height * 0.02,
                                    marginRight: 12,
                                    paddingHorizontal: height * 0.01,
                                }}
                                onPress={() => handleTabPress(index)}
                                activeOpacity={0.8}
                            >
                                <Text style={{
                                    fontSize: responsiveFontSize(15),
                                    alignSelf: 'center',
                                    color: activeTab === index ? 'rgba(255, 255, 255, 1)' : '#289EF5',
                                    paddingHorizontal: 5,
                                    textAlign: 'center',
                                    fontFamily: 'DMSans-Medium',
                                    lineHeight: height * 0.028 //28
                                }}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={data[activeTab].filter((item) =>
                                item.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </ScrollView>
                </View>
            )}
            {/* Search Bar */}

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
    wrapT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
        //paddingHorizontal: 20,
    },
    backContainer: {
        height: 16,
        width: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    backContainer1: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    backText: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'black',
        paddingHorizontal: 5,
        textAlign: 'center',
        fontFamily: 'Mukta-Regular',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    searchBarContainer: {
        //marginHorizontal: 30,
        marginVertical: 15,
        paddingHorizontal: 15,
        //backgroundColor: '#ffffff',
        borderRadius: 30,
        borderWidth: 1,
        height: '10%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#289EF5'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000000',
    },
    backContainerSearch: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    backContainerFilter: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
});

export default DropCards;
