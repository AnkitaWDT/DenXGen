import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomSkeletonLoader = ({ elements }) => {
    return (
        <View style={styles.container}>
            {elements.map((element, index) => (
                <View key={index} style={element.style} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});

export default CustomSkeletonLoader;
