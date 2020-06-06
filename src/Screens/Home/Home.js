import React, {useState, useEffect} from 'react';
import {Dimensions, Alert, StatusBar, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {onSignOut} from '../../_services';
import PushNotification from 'react-native-push-notification';
import {getDash} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  StyledButton,
  colors,
  LogoImg,
} from '../../Components/styledComponents';
import {TurnOffIcon} from '../../Components/icons';

const {height, width} = Dimensions.get('window');

const Home = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const [cylinder, setCylinder] = useState('');
  const [buyCylinder, setBuyCylinder] = useState(false);
  const {
    loading,
    dashboard: {user, totalContributionsThisYear, lastContribution},
  } = userData;

  useEffect(() => {
    messageListener();
    // checkNotification();
  }, []);

  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  const messageListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.data.buyid) {
        navigation.navigate('RequestGas', {orderInfo: remoteMessage.data});
      } else if (remoteMessage.data.rating) {
        navigation.navigate('Orders');
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          if (remoteMessage.data.buyid) {
            navigation.navigate('RequestGas', {orderInfo: remoteMessage.data});
          } else if (remoteMessage.data.rating) {
            navigation.navigate('Orders');
          }
        }
      });
    messaging().onMessage(message => {
      console.log(JSON.stringify(message), message);
      if (message.data.buyid) {
        navigation.navigate('RequestGas', {orderInfo: message.data});
      } else if (message.data.rating) {
        navigation.navigate('Orders');
      }
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

  return (
    <Content bg="#ffffff">
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <Content flex={2}>
        <TurnOffIcon color="#999999" size={width * 0.5} />
        <SText
          color="#999999"
          width="90%"
          align="center"
          vmargin={20}
          size="24px">
          No Requests at the moment
        </SText>
      </Content>
      {/* <Content justify="center">
        <StyledButton
          bg={colors.primary}
          curved
          width="80%"
          shadow
          onPress={() => console.log(userInfo)}>
          <SText size="20px" weight="700" color="#ffffff">
            REFRESH
          </SText>
        </StyledButton>
      </Content> */}
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Home);
