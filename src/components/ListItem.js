/* eslint-disable prettier/prettier */
// Access Device’s Contact List in React Native App
// https://aboutreact.com/access-contact-list-react-native/

import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Sms from 'react-native-sms'; 
import Communications from 'react-native-communications';
import SendIntentAndroid from 'react-native-send-intent';

const getAvatarInitials = (textString) => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
        textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
};

const ListItem = (props) => {
    const shouldComponentUpdate = () => {
        return false;
    };
    const { item, onPress } = props;

    const handleShareAppLinkMessage = () => {
        const appLink = 'https://www.npmjs.com/package/react-native-contacts';
        const phoneNumber = item.phoneNumbers[0]?.number;

        if (phoneNumber) {
            const smsBody = `Check out our app: ${appLink}`;
            Communications.text(phoneNumber, smsBody);
            console.log('SMS sent successfully');
        } else {
            console.log('Contact does not have a phone number');
        }
    };

    const handleShareAppLinkWapp = () => {
        const appLink = 'https://www.npmjs.com/package/react-native-contacts';
        const phoneNumber = item.phoneNumbers[0]?.number;

        if (phoneNumber) {
            const message = `Check out our app: ${appLink}`;
            const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

            SendIntentAndroid.openAppWithData({
                package: 'com.whatsapp',
                data: whatsappLink,
            })
                .then(isOpened => {
                    if (isOpened) {
                        console.log('WhatsApp opened successfully');
                    } else {
                        console.log('Failed to open WhatsApp');
                    }
                })
                .catch(error => {
                    console.log('Error opening WhatsApp: ', error);
                });
        } else {
            console.log('Contact does not have a phone number');
        }
    };


    return (
        <View>
            <TouchableOpacity onPress={() => onPress(item)}>
                <View style={styles.itemContainer}>
                    <View style={styles.leftElementContainer}>
                        <Avatar
                            img={
                                item.hasThumbnail ?
                                    { uri: item.thumbnailPath } : undefined
                            }
                            placeholder={getAvatarInitials(
                                // `${item.givenName} ${item.familyName}`,
                                `${item.givenName}`
                            )}
                            width={40}
                            height={40}
                        />
                    </View>
                    <View style={styles.rightSectionContainer}>
                        <View style={styles.mainTitleContainer}>
                            <Text
                                style={
                                    styles.titleStyle
                                }>{`${item.givenName} ${item.familyName}`}</Text>
                        </View>
                        <TouchableOpacity onPress={handleShareAppLinkMessage}>
                            <View style={styles.prefixSectionContainer}>
                                <Image
                                    source={require("../../assets/img/ProfileEmail.png")}
                                    style={styles.prefix}
                                />
                        </View>
                           
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleShareAppLinkWapp}>
                            <View style={styles.prefixSectionContainer}>
                                <Image
                                    source={require("../../assets/img/LoginMob.png")}
                                    style={styles.prefix}
                                />
                            </View>

                        </TouchableOpacity>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        minHeight: 44,
        height: 63,
    },
    leftElementContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        paddingLeft: 13,
    },
    rightSectionContainer: {
        marginLeft: 18,
        flexDirection: 'row',
        flex: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#515151',
    },
    prefixSectionContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    mainTitleContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    titleStyle: {
        fontSize: 16,
    },
    prefix: {
        marginRight: 8,
        paddingHorizontal: 10,
        height: 17,
        width: 10,
        resizeMode: "contain",
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(ListItem);

ListItem.propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
};