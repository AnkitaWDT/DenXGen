/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, FlatList, TextInput, Platform, Alert, PermissionsAndroid } from 'react-native';
import Navigation from './src/screens/Navigation';
import PushController from './src/components/PushController';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Override default props for Text and TextInput
if (Text.defaultProps) {
  Text.defaultProps.allowFontScaling = false;
} else {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps) {
  TextInput.defaultProps.allowFontScaling = false;
} else {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}


const App = () => {

  useEffect(() => {
    // Check and request permissions when the app is opened
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          // Permission denied, show an alert
          Alert.alert(
            'Permission Denied',
            'Please grant permission to receive notifications in order to use this app.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.NOTIFICATIONS
        );
        if (!granted) {
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'App needs access to notifications.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            // Permission denied, show an alert
            Alert.alert(
              'Permission Denied',
              'Please grant permission to receive notifications in order to use this app.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          }
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    }
  };

  // const checkPermissions = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       const permissionStatus = await check(PERMISSIONS.ANDROID.NOTIFICATION);
  //       if (permissionStatus !== 'granted') {
  //         const result = await request(PERMISSIONS.ANDROID.NOTIFICATION);
  //         if (result !== 'granted') {
  //           // Show an alert or notification prompt to inform the user
  //           Alert.alert(
  //             'Permission Required',
  //             'Please grant permission to access external storage in order to use this app.',
  //             [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  //           );
  //           const status = await check(PERMISSIONS.ANDROID.NOTIFICATION);

  //           if (status !== RESULTS.GRANTED) {
  //             const result = await request(PERMISSIONS.ANDROID.NOTIFICATION);

  //             if (result !== RESULTS.GRANTED) {
  //               console.log('Contacts permission denied');
  //               // Handle permission denied case
  //               return;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error checking permissions:', error);
  //   }
  // };

  return (
    <Fragment>
      <Navigation />
      <PushController />
    </Fragment>
  );
};

export default App;


/* eslint-disable prettier/prettier */
// import React from 'react';
// import { Text, TextInput } from 'react-native'; // Import Text and TextInput from react-native
// import Navigation from './src/screens/Navigation';

// // Override default props for Text and TextInput
// if (Text.defaultProps) {
//   Text.defaultProps.allowFontScaling = false;
// } else {
//   Text.defaultProps = {};
//   Text.defaultProps.allowFontScaling = false;
// }

// if (TextInput.defaultProps) {
//   TextInput.defaultProps.allowFontScaling = false;
// } else {
//   TextInput.defaultProps = {};
//   TextInput.defaultProps.allowFontScaling = false;
// }

// const App = () => {
//   return (
//     <Navigation />
//   );
// }

// export default App;
