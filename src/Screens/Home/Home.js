import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import firebase from 'react-native-firebase';
import {onSignOut} from '../../_services';
import {getDash} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  StyledButton,
  colors,
  LogoImg,
} from '../../Components/styledComponents';
import {MenuIcon, TurnOffIcon} from '../../Components/icons';
import {formatDate} from '../../_helpers';
import {Spinner, Item, Picker, Icon, CheckBox, Body} from 'native-base';
import {Advert} from '../../Components/Components';

const {height, width} = Dimensions.get('window');
const ad = require('../../assets/img/ad.png');

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
  }, []);
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  const messageListener = async () => {
    firebase.notifications().onNotification(notification => {
      const {title, body} = notification;
      // showAlert(title, body);
      navigation.navigate('RequestGas');
    });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      // const {title, body} = notificationOpen.notification;
      // showAlert(title, body);
      navigation.navigate('RequestGas');
    }

    firebase.messaging().onMessage(message => {
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
      <Content justify="center">
        <StyledButton
          bg={colors.primary}
          curved
          width="80%"
          shadow
          onPress={() =>
            navigation.navigate('RequestGas', {cylinderSize: cylinder})
          }>
          <SText size="20px" weight="700" color="#ffffff">
            REFRESH
          </SText>
        </StyledButton>
      </Content>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Home);
