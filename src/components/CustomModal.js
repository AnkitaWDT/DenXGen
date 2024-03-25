/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';

const CustomModal = ({ isVisible, anchorRef, options, onSelect, onClose }) => {
    return (
        <Popover
            isVisible={isVisible}
            fromView={anchorRef.current}
            onRequestClose={onClose}
            arrowStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            placement="left"
        >
            <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10 }}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={{ paddingVertical: 10, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
                        onPress={() => onSelect(option.value)}
                    >
                        <Text style={{ fontSize: 16, color: '#000' }}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Popover>
    );
};

export default CustomModal;