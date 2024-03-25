/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import commonStyles from '../../components/CommonStyles';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// const moderateScale = (size) => {
//     const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
//     const newSize = size * scale;
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

const Slide2 = ({ item }) => {
    return (
        <View style={styles.pageContainer}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Image source={item?.headerImage} style={styles.headerImageBackground} />
                <View style={styles.headerTextContainer}>
                    <Text style={[commonStyles.headerText1B, { textTransform: 'uppercase', }]}>Dental School</Text>
                    <View style={styles.horizontalLine} />
                    <Text style={[commonStyles.headerText2BL, { textAlign: 'center', }]}>Professional App for your{"\n"}Dental connections</Text>
                </View>
            </View>

            {/* Slide content */}
            <View style={styles.imageContainer}>
                <Image source={item?.image} style={styles.image} />
            </View>
            {/* <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.subtitle}>{item?.subtitle}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        //paddingHorizontal: 10,
        //paddingTop: 50,
        //marginTop: 120,
        width: width,
        //marginHorizontal: height * 0.02,
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: moderateScale(300),
    },
    headerImage: {
        position: 'absolute', // Position the image behind the header text
        //width: width,
        //height: 70, // Set the fixed height
        resizeMode: 'cover', // Resize the image to cover the container
    },
    headerImageBackground: {
        position: 'absolute',
        top: moderateScale(-62),
        width: width , // Set the width to the screen width
        //height: 333,// Adjust the height as needed
        resizeMode: 'contain',
    },
    horizontalLine: {
        width: width * 0.08,
        borderBottomWidth: 1, // Adjust the line thickness as needed
        borderBottomColor: '#121212',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    headerTextContainer: {
        position: 'absolute',
        marginTop: moderateScale(160),
        marginRight: moderateScale(32),
        width: '100%',
        height: moderateScale(289),
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1, // Ensure the text appears above the background image
    },
    headerText1: {
        fontSize: moderateScale(21),
        fontFamily: 'DMSans-Bold',
        color: '#289EF5', 
        textTransform: 'uppercase',
        lineHeight: 28
    },
    headerText2: {
        fontSize: moderateScale(16),
        textAlign: 'center',
        color: '#121212', 
        fontFamily: 'DMSans-Medium',
        lineHeight: 28
    },
    image: {
        height: height * 0.28,
        //width: moderateScale(343),
        //marginBottom: 30,
        resizeMode: 'contain',
    },
    // title: {
    //     color: '#000000',
    //     fontSize: moderateScale(26),
    //     textAlign: 'center',
    //     marginTop: 30,
    //     fontFamily: 'Mukta-Bold'
    // },
    // subtitle: {
    //     color: 'black',
    //     fontSize: moderateScale(16),
    //     marginTop: 6,
    //     textAlign: 'center',
    //     paddingHorizontal: 30,
    //     fontFamily: 'Mukta-Regular'
    // },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1 // Add this line
    }
});


export default Slide2;