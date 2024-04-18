/* eslint-disable prettier/prettier */
// SharedStyles.js
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

// const moderateScale = (size) => {
//     const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
//     const newSize = size * scale;
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

const commonStyles = StyleSheet.create({
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
    locIcon: {
        height: 16,
        width: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // borderWidth: 1, // Example border width
        // borderColor: '#fff', // Example border color
    },
    dropdownIcon: {
        height: 6,
        width: 13,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    activeIcon: {
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    addIcon: {
        width: height * 0.05,  // Adjust the width as needed
        height: height * 0.05, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        //marginRight: 2
    },
    sclIcon: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 15
    },
    notificationIcon: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
marginRight: 12
    },
    profileIcon: {
        height: 33,
        width: 33,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    profileIcon1: {
        height: 187,
        width: 187,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    logoIcon: {
        height: 57,
        width: 182,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    scannerIcon: {
        height: 240,
        width: 223,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 56
    },
    backText: {
        fontSize: 21,
        fontFamily: 'DMSans-SemiBold',
        color: '#121212',
        lineHeight: 24,
        alignSelf: 'center',
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    icon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    searchBarContainer: {
        marginVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
        borderWidth: 1,
        height: 42,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#289EF5',
        backgroundColor: '#ffffff'
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.022, 
        width: '90%'
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
    popover: {
        backgroundColor: '#FEFCFC',
        borderRadius: 10,
        paddingVertical: 8
    },
    popoverItemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 16
    },
    popoverItemIcon: {
        height: 18,
        width: 18,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    popoverItemText: {
        fontSize: 15,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.022, //28
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        height: 50,
        width: 257,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    buttonText: {
        color: '#FEFCFC',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },
    buttonH: {
        alignSelf: 'center',
        height: 50,
        width: width * 0.44,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextH: {
        color: '#FEFCFC',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },
    button1: {
        alignSelf: 'center',
        height: 50,
        width: 257,
        backgroundColor: "#FEFCFC",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.01,
    },
    buttonText1: {
        color: '#289EF5',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },
    buttonS: {
        alignSelf: 'center',
        //height: moderateScale(16),
        width: width * 0.35,
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: width * 0.01,
    },
    buttonTextS: {
        color: '#FEFCFC',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        //lineHeight: 28
    },
    buttonS1: {
        alignSelf: 'center',
        //height: moderateScale(16),
        width: width * 0.35,
        backgroundColor: "#E8F8FF",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#289EF5',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: width * 0.01,
    },
    buttonTextS1: {
        color: '#289EF5',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        //lineHeight: 28
    },
    button1H: {
        alignSelf: 'center',
        height: 50,
        width: width * 0.44,
        backgroundColor: "#E8F8FF",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#289EF5',
        borderWidth: 1
    },
    buttonText1H: {
        color: '#289EF5',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },
    button2H: {
        alignSelf: 'center',
        height: 50,
        width: width * 0.44,
        backgroundColor: "#FEFCFC",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#121212',
        borderWidth: 1
    },
    buttonText2H: {
        color: '#121212',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },
    headerText1W: {
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        color: '#FEFCFC',      
        lineHeight: 28
    },
    headerText1B: {
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        color: '#289EF5',
        lineHeight: 28
    },
    headerText1BL: {
        fontSize: 24,
        fontFamily: 'DMSans-Bold',
        color: '#121212',
        lineHeight:28
    },


    headerText2W: {
        fontSize: 16,
        fontFamily: 'DMSans-Medium',
        color: '#FEFCFC',
        lineHeight: 24
    },
    headerText2B: {
        fontSize: 16,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        lineHeight: 24
    },
    headerText2BL: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: 24
    },

    headerText11BL: {
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
        color: '#121212',
        lineHeight: 26
    },
    headerText0BL: {
        fontSize: 20,
        fontFamily: 'DMSans-Bold',
        color: '#121212',
        lineHeight: 26
    },
    headerText3BL: {
        fontSize: 15,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22
    },
    headerText3B: {
        fontSize: 15,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22
    },
    headerText3G: {
        fontSize: 15,
        color: '#979797',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22
    },
    headerText3W: {
        fontSize: 15,
        color: '#FEFCFC',
        fontFamily: 'DMSans-Medium',
        lineHeight: 22
    },

    headerText5G: {
        fontSize: 14,
        color: '#979797',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },
    headerText5W: {
        fontSize: 14,
        color: '#FEFCFC',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },
    headerText5BL: {
        fontSize: 14,
        color: '#121212',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },
    headerText5B: {
        fontSize:14,
        color: '#289EF5',
        fontFamily: 'DMSans-Medium',
        lineHeight: height * 0.024 //28
    },

    headerText4BL: {
        fontSize: 16,
        color: '#121212',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24
    },
    headerText4G: {
        fontSize: 16,
        color: '#979797',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24
    },
    headerText4B: {
        fontSize: 16,
        color: '#289EF5',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24
    },
    headerText4W: {
        fontSize: 16,
        color: '#FEFCFC',
        fontFamily: 'DMSans-SemiBold',
        lineHeight: 24
    },

    headerText6G: {
        fontSize: 13,
        color: '#979797',
        fontFamily: 'DMSans-Medium',
        lineHeight: 20
    },
    progImage: {
        height: height * 0.009,
        width: width * 0.86,
        alignSelf: 'center',
        marginVertical: height * 0.03,
    },

});

export default commonStyles;
