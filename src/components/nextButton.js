/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, {useEffect, useRef} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import AntDesign from "react-native-vector-icons/AntDesign"

export default function NextButton(percentage) {

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start()
    };

  return (
      <View style={styles.container}>
          <Svg width={size} height={size} fill= '#ffffff'>
          <G rotation= "-90" origin={center}>
                  <Circle stroke='#E6E7E8' cx={center} cy={center} r={radius} strokeWidth={strokeWidth}
                  />
                  <Circle
                  ref={progressRef}
                      stroke='#F4338F'
                      cx={center}
                      cy={center}
                      r={radius}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (circumference * 25) / 100}
                  />
          </G>
      </Svg>     
      <TouchableOpacity style= {styles.button} activeOpacity={0.6}>
      <AntDesign name= "arrowright" size={32} color="#fff"/>
      </TouchableOpacity>   
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#f4338f',
        borderRadius: 100,
        padding: 20
    }
});