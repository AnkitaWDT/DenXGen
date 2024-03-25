/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import commonStyles from './CommonStyles';

const { width, height } = Dimensions.get('window');

const CustomPopup = ({visible, onClose, onContinue, onSkip}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Image
            source={require('../../assets/img/GroupWelcome.png')}
            style={styles.image}
          />
          <Text style={[commonStyles.headerText11BL, { marginVertical: height * 0.01, }]}>Complete your profile</Text>
          <Text style={[commonStyles.headerText4BL, { textAlign: 'center', }]}>Lorem ipsum dolor sit amet consectetur. Aliquet in commodo quam viverra</Text>
                  <View style={{ height: 1, backgroundColor: '#000', marginBottom: 10 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onContinue}
              activeOpacity={0.8}
              style={[commonStyles.buttonH, { marginBottom: height * 0.015 }]}>
              <Text style={commonStyles.buttonTextH}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.8} onPress={onSkip} style={commonStyles.button1H}>
              <Text style={commonStyles.buttonText1H}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

CustomPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.9,
    //height: height * 0.43
  },
  image: {
    width: width * 0.35, 
    height: height * 0.094,
    marginBottom: height * 0.015, 
  },
  title: {
      fontSize: 20,
      color: '#000',
      fontFamily: 'Mukta-SemiBold',
      lineHeight: 25,
      textAlign: 'center',
    marginVertical: height * 0.01,
    fontWeight: '600'
  },
  subtitle: {
      fontSize: 16,
      color: '#000',
      fontFamily: 'Mukta-Regular',
      lineHeight: 21,
      textAlign: 'center',
      fontWeight: '400',
    //marginBottom: 30,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: height * 0.01
  },
  continueButton: {
    backgroundColor: '#289EF5',
    //padding: 10,
    borderRadius: 999,
    width: width * 0.45,
    marginVertical:  10,    
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#fff',
    borderColor: '#289EF5',
    //padding: 10,
    borderWidth: 1,
    borderRadius: 999,
    width: width * 0.45,
    height: height * 0.055,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextC: {
    color: 'white',
    fontWeight: '500',
      alignSelf: 'center',
      fontSize: 15,
      fontFamily: 'Mukta-Regular',
      lineHeight: 23,
      textAlign: 'center',
  },
    buttonTextS: {
        color: '#289EF5',
        fontWeight: '500',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: 'Mukta-Regular',
        lineHeight: 23,
        textAlign: 'center',
    },
});

export default CustomPopup;
