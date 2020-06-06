/**
 * @format
 */

import {AppRegistry, DeviceEventEmitter} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const {data} = remoteMessage;
  const {buyingsize, buyid} = data;
  // PushNotification.localNotification({
  //   /* iOS and Android properties */
  //   id: buyid,
  //   title: 'New gas order',
  //   data,
  //   message: `You have a new gas order of ${buyingsize} kg`,
  //   number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //   actions: '["View"]', // (Android only) See the doc for notification actions to know more
  // });
});

// firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () =>
//   console.log('bgMessaging: ', new Date()),
// );
