/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    PixelRatio
} from 'react-native';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import SwipeButton from 'rn-swipe-button';
import thumbIcon from '../../../assets/img/arrow-left.png';
import { moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff' };

const slides = [
    {
        id: '1',
        component: Slide1,
        headerImage: require('../../../assets/img/Curve1.png'),
        headerText: 'Header Text 1',
        image: require('../../../assets/img/OnBoard1.png'),
        title: 'Purchase Online !!',
        subtitle: 'Lorem ipsum dolor sit amet consectetur. Proin lobortis pretium vital',
    },
    {
        id: '2',
        component: Slide2,
        headerImage: require('../../../assets/img/Curve2.png'),
        headerText: 'Header Text 1',
        image: require('../../../assets/img/OnBoard2.png'),
        title: 'Purchase Online !!',
        subtitle: 'Lorem ipsum dolor sit amet consectetur. Proin lobortis pretium vital',
    },
    {
        id: '3',
        component: Slide3,
        headerImage: require('../../../assets/img/Curve3.png'),
        headerText: 'Header Text 1',
        image: require('../../../assets/img/OnBoard3.png'),
        title: 'Purchase Online !!',
        subtitle: 'Lorem ipsum dolor sit amet consectetur. Proin lobortis pretium vital',
    },
];

// const Slide = ({ item }) => {
//     return (
//         <View style={styles.pageContainer}>
//             <View style={styles.imageContainer}>
//                 <Image
//                     source={item?.image}
//                     style={styles.image}
//                 />
//             </View>
//             <Text style={styles.title}>{item?.title}</Text>
//             <Text style={styles.subtitle}>{item?.subtitle}</Text>
//         </View>
//     );
// };

// const moderateScale = (size) => {
//     const scale = Math.min(width / 320, 1); // Adjust 320 to a suitable base width
//     const newSize = size * scale;
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
// };

const OnBoardScreen = ({ navigation }) => {
    
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = React.useRef();


    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex < slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        }
        else {
            navigation.navigate('LoginScreen'); 
        }
    };


    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

    const handleSwipeSuccess = () => {
        navigation.navigate('LoginScreen');
        console.log('ProfileCompletion')
        // Show the custom popup when the swipe is successful
        //setIsPopupVisible(true);
    };

    const Footer = () => {
    return (
        <View
            style={{
                height: moderateScale(180),
                paddingHorizontal: moderateScale(20),
                //paddingVertical: 10,
                flexDirection: 'row', // Use flexDirection to align items horizontally
                justifyContent: 'center', // Align items with space between them
                alignItems: 'center',
            }}>
            {/* Render indicator */}
            {currentSlideIndex === slides.length - 1 ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={goToNextSlide}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.dotsContainer}>
                    {slides.map((_, i) => (
                        <View key={i} style={i === currentSlideIndex ? styles.activeDot : styles.dot} />
                    ))}
                </View>
            )}
        </View>
    );
};


    return (
        <View style={styles.container}>

            <FlatList
                ref={ref}
                contentContainerStyle={{ width: width * slides.length }}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                renderItem={({ item }) => {
                    const SlideComponent = item.component;
                    return <SlideComponent item={item} />;
                }}
                keyExtractor={(item) => item.id}
            />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFCFC',
        height: height
        //marginVertical: 20,
        //flexGrow: 1,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Align dots to the left
        alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        height: moderateScale(50),
        width: moderateScale(257),
        backgroundColor: "#289EF5",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: moderateScale(18),
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: moderateScale(16),
        fontFamily: 'DMSans-Bold',
        lineHeight: 28
    },

    // dotsContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    dot: {
        width: 10,
        height: 10,
        borderRadius: width * 0.05,
        backgroundColor: 'rgba(40, 158, 245, 0.2)', 
        marginHorizontal: moderateScale(10),
    },

    activeDot: {
        width: 10,
        height: 10,
        borderRadius: width * 0.05,
        backgroundColor: '#289EF5',
        marginHorizontal: moderateScale(10),
    },
});
export default OnBoardScreen;