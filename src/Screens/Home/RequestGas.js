import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import {WebView} from 'react-native-webview';
import {
  List,
  ListItem,
  Icon,
  Toast,
  Spinner,
  Item,
  Picker,
  Label,
  Input,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {onSignOut} from '../../_services';
import {getContri} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {NextIcon, LocationIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';
import Directions from '../../Components/Directions';
import {APIS, requestJwt, toastDefault} from '../../_services';

const {height, width} = Dimensions.get('window');

const RequestGas = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {token} = userInfo;
  const orderInfo = navigation.getParam('orderInfo') || {};
  const [formInputs, setFormInputs] = useState({});
  const [accepted, setAccepted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);

  console.log(orderInfo);

  useEffect(() => {
    messageListener();
  }, []);

  const messageListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      setAccepted(false);
      setCompleted(false);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        setAccepted(false);
        setCompleted(false);
      });
    messaging().onMessage(message => {
      setAccepted(false);
      setCompleted(false);
    });
  };

  const setGasSize = value => {
    const cost = parseInt(value || 0, 10) * 300;
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };
  const pickupLocation = {
    latitude: parseFloat(orderInfo.pickuplatitude || 0),
    longitude: parseFloat(orderInfo.pickuplongitude || 0),
  };
  const deliveryLocation = {
    latitude: parseFloat(orderInfo.deliverylatitude || 0),
    longitude: parseFloat(orderInfo.deliverylongitude || 0),
  };

  const acceptOrder = async () => {
    const {
      baseUrl,
      acceptOrders: {method, path},
    } = APIS;
    const url = baseUrl + path;
    const payload = {
      buyid: parseInt(orderInfo.buyid, 10),
    };
    setLoading(true);
    const response = await requestJwt(method, url, payload, token);
    console.log(payload, url, token, method);
    console.log(response);
    if (response.meta && response.acceptancestatus === 1) {
      Toast.show({
        ...toastDefault,
        text: 'Order Accepted',
        type: 'success',
      });
      setAccepted(true);
    } else {
      Toast.show({
        ...toastDefault,
        text: response.meta.message,
        type: 'danger',
      });
    }
    setLoading(false);
  };

  const completerOrder = async () => {
    const {
      baseUrl,
      completeOrders: {method, path},
    } = APIS;
    const url = baseUrl + path;
    const payload = {
      buyid: parseInt(orderInfo.buyid, 10),
    };
    setLoading(true);
    const response = await requestJwt(method, url, payload, token);
    console.log(payload, url, token, method);
    console.log(response);
    if (response.meta && response.meta.info === 'Request successful') {
      Toast.show({
        ...toastDefault,
        text: 'Order Completed',
        type: 'success',
      });
      setCompleted(true);
    } else {
      Toast.show({
        ...toastDefault,
        text: response.meta ? response.meta.message : 'Unable to complete',
        type: 'danger',
      });
    }
    setLoading(false);
  };
  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          <StatusBar
            backgroundColor={colors.secondary}
            barStyle="light-content"
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <SText
              width="100%"
              weight="700"
              uppercase
              size="20px"
              align="center"
              color={colors.light}>
              New request
            </SText>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Gas Cylinder Size
              </SText>
              <SText width="100%" weight="700" size="30px" color={colors.light}>
                {orderInfo.cylindersize} kg{' '}
                {orderInfo.buycylinder === '0' ? '(Pickup)' : '(Purchase)'}
              </SText>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Gas Volume
              </SText>
              <SText width="100%" weight="700" size="30px" color={colors.light}>
                {orderInfo.buyingsize} kg
              </SText>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Price
              </SText>
              <NumberFormat
                value={parseInt(orderInfo.totalprice || 0, 10)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'\u20A6'}
                renderText={value => (
                  <SText
                    color={colors.light}
                    width="100%"
                    size="30px"
                    weight="700">
                    {value}
                  </SText>
                )}
              />
            </Content>
            {orderInfo.buycylinder === '0' && (
              <Content width="90%" vmargin={10} flex={0} align="center">
                <SText
                  width="100%"
                  bmargin={5}
                  size="16px"
                  color={colors.light}>
                  Pickup Address
                </SText>
                <Content horizontal width="90%">
                  <SText
                    width="100%"
                    weight="500"
                    size="20px"
                    color={colors.light}
                    numberOfLines={1}>
                    {orderInfo.pickupaddress}
                  </SText>
                  <Directions
                    location={pickupLocation}
                    address={orderInfo.pickupaddress}
                    landmark={orderInfo.pickuplandmark}
                    phone={orderInfo.pickupphone || orderInfo.customerphone}
                  />
                </Content>
              </Content>
            )}
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Delivery Address
              </SText>
              <Content horizontal width="90%">
                <SText
                  width="100%"
                  weight="500"
                  size="20px"
                  color={colors.light}
                  numberOfLines={1}>
                  {orderInfo.deliveryaddress}
                </SText>
                <Directions
                  location={deliveryLocation}
                  address={orderInfo.deliveryaddress}
                  landmark={orderInfo.deliverylandmark}
                  phone={orderInfo.deliveryphone || orderInfo.customerphone}
                />
              </Content>
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          {accepted ? (
            <StyledButton
              disabled={completed}
              bg="#00a651"
              width="100%"
              onPress={completerOrder}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" weight="700" color="#ffffff">
                  {completed ? 'Completed' : 'Complete Order'}
                </SText>
              )}
            </StyledButton>
          ) : (
            <Content horizontal align="flex-end">
              <StyledButton bg="#b61e23" width="50%">
                {loadingD ? (
                  <Spinner color="#ffffff" />
                ) : (
                  <SText size="20px" weight="700" color="#ffffff">
                    DECLINE
                  </SText>
                )}
              </StyledButton>
              <StyledButton
                bg="#00a651"
                width="50%"
                onPress={() => acceptOrder()}>
                {loading ? (
                  <Spinner color="#ffffff" />
                ) : (
                  <SText size="20px" weight="700" color="#ffffff">
                    ACCEPT
                  </SText>
                )}
              </StyledButton>
            </Content>
          )}
        </Content>
      </KeyboardAwareScrollView>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(RequestGas);
