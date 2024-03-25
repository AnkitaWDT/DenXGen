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


const Slide3 = ({ item }) => {


    return (
        <View style={styles.pageContainer}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Image source={item?.headerImage} style={styles.headerImageBackground} />
                <View style={styles.headerTextContainer}>
                    <Text style={[commonStyles.headerText1W, { textTransform: 'uppercase', }]}>Dental Community</Text>
                    <View style={styles.horizontalLine} />
                    <Text style={[commonStyles.headerText2W, { textAlign: 'right' }]}>Professional App for your{"\n"}Dental internships</Text>
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
        //marginLeft: 22,
        
    },
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: moderateScale(300),
        //marginLeft: 5
    },
    headerImage: {
        position: 'absolute', // Position the image behind the header text
        //width: width * 2,
        //height: 70, // Set the fixed height
        resizeMode: 'cover', // Resize the image to cover the container
    },
    headerImageBackground: {
        position: 'absolute',
        top: moderateScale(-62),
        width: width, // Set the width to the screen width 
        //height: 333, // Adjust the height as needed
        resizeMode: 'contain',
    },
    horizontalLine: {
        width: width * 0.08,
        borderBottomWidth: 1, // Adjust the line thickness as needed
        borderBottomColor: '#FEFCFC', 
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    headerTextContainer: {
        position: 'absolute',
        marginTop: moderateScale(100),
        marginLeft: moderateScale(32),
        paddingHorizontal: moderateScale(20),
        width: '100%',
        height: moderateScale(289),
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex: 1, // Ensure the text appears above the background image
    },
    headerText1: {
        fontSize: moderateScale(21),
        fontFamily: 'DMSans-Bold',
        color: '#FEFCFC', 
        textTransform: 'uppercase',
        lineHeight: 28
    },
    headerText2: {
        fontSize: moderateScale(16),
        fontFamily: 'DMSans-Medium',
        textAlign: 'right',
        color: '#FEFCFC', 
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
    //     //fontWeight: '700',
    //     textAlign: 'center',
    //     marginTop: 30,
    //     fontFamily: 'Mukta-Bold'
    // },
    // subtitle: {
    //     color: 'black',
    //     fontSize: moderateScale(16),
    //     //fontSize: 16,
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

export default Slide3;