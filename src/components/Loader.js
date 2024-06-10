/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation() {
    const animationRef = useRef(null);

    useEffect(() => {
        animationRef.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer}>
            {/* <LottieView
                ref={animationRef}
                source={require('../../assets/img/loader.json')}
                style={styles.animation}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: 200, // Adjust the width and height based on your animation's dimensions
        height: 200,
    },
});
