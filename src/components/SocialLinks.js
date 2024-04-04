/* eslint-disable prettier/prettier */
// SocialLink.js

import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import commonStyles from './CommonStyles';

const SocialLink = ({ platform, username }) => {
    const handlePress = async () => {
        let url = '';

        switch (platform) {
            case 'instagram':
                url = `https://www.instagram.com/${username}`;
                break;
            case 'whatsapp':
                url = `https://api.whatsapp.com/send?phone=${username}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/in/${username}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/${username}`;
                break;
            case 'other':
                url = username.startsWith('http') ? username : `https://${username}`;
                break;
            case 'contact':
                url = `tel:${username}`;
                break;
            case 'email':
                url = `mailto:${username}`;
                break;
            default:
                return;
        }

        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error("Error opening URL: ", error);
        }
    };


    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View style={styles.socialLinkContainer}>
                <Image source={getImageSource(platform)} style={styles.socialIcon} />
                <Text style={styles.socialText}>{getDisplayedText(platform, username)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const getImageSource = (platform) => {
    switch (platform) {
        case 'instagram':
            return require('../../assets/img/instagramP.png');
        case 'whatsapp':
            return require('../../assets/img/whatsappP.png');
        case 'linkedin':
            return require('../../assets/img/linkedinP.png');
        case 'facebook':
            return require('../../assets/img/facebookP.png');
        case 'other':
            return require('../../assets/img/websiteP.png');
        case 'contact':
            return require('../../assets/img/conP.png');
        case 'email':
            return require('../../assets/img/mailPP.png');
        default:
            return null;
    }
};

const getDisplayedText = (platform, username) => {
    switch (platform) {
        case 'whatsapp':
            return `whatsapp.com/${username}`;
        default:
            return username;
    }
};

const styles = StyleSheet.create({
    socialLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    socialIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    socialText: {
        ...commonStyles.headerText3BL,
    },
});

export default SocialLink;
