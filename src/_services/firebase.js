import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
//1
export const checkPermission = async () => {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
};

//3
const getToken = async () => {
  console.log('getting token');
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log(fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

//2
const requestPermission = async () => {
  try {
    await messaging().requestPermission();
    // User has authorised
    getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
};

export const messageListener = async () => {
  firebase.notifications().onNotification(notification => {
    const {title, body} = notification;
    showAlert(title, body);
  });

  // firebase.notifications().onNotificationOpened(notificationOpen => {
  //   const {title, body} = notificationOpen.notification;
  //   showAlert(title, body);
  // });

  const notificationOpen = await firebase
    .notifications()
    .getInitialNotification();
  if (notificationOpen) {
    const {title, body} = notificationOpen.notification;
    showAlert(title, body);
  }

  messaging().onMessage(message => {
    console.log(JSON.stringify(message));
  });
};

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: false},
  );
};
