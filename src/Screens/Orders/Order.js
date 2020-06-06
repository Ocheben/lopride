import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Linking,
  Platform,
  View,
  StyleSheet,
  BackHandler,
  StatusBar,
  Modal,
} from 'react-native';
import {Spinner, Toast} from 'native-base';
import {
  Content,
  ContentB,
  LogoImg,
  SText,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {
  KekeIcon,
  PhoneIcon,
  GasCylinder,
  PriceTagIcon,
} from '../../Components/icons';
import {Rating, GiveRating} from '../../Components/Components';
import NumberFormat from 'react-number-format';
import {APIS, requestJwt, toastDefault} from '../../_services';
import {getOrders} from '../../_store/actions/userActions';

const avatar = require('../../assets/img/avatar.png');
const {height, width} = Dimensions.get('window');

const statusColors = ['#ff1744', colors.primary, '#1b5e20'];
const statusMessages = ['Queued', 'In Progress', 'Delivered'];

const OrderItem = ({navigation, userInfo, dispatch, userData}) => {
  const {token} = userInfo;
  const {orders} = userData;
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const orderinfo = navigation.getParam('orderInfo');
  const makeCall = () => {
    let phoneNumber = '';
    const androidPrefix = 'tel:${';
    const iosPrefix = 'telprompt:${';

    if (Platform.OS === 'android') {
      phoneNumber = androidPrefix + '09025605555' + '}';
    } else {
      phoneNumber = iosPrefix + '09025605555' + '}';
    }

    Linking.openURL(phoneNumber);
  };

  const selectedOrder =
    orders.find(order => order.buyid === orderinfo.buyid) || {};
  const orderInfo = {
    ...selectedOrder,
    date: selectedOrder.dateordered || '',
    price: selectedOrder.price ? parseInt(selectedOrder.price, 10) : 0,
    size: selectedOrder.buyingsize ? selectedOrder.buyingsize + ' kg' : '',
    status:
      selectedOrder.orderstatus && selectedOrder.orderstatus !== null
        ? parseInt(selectedOrder.orderstatus, 10)
        : 0,
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
      dispatch(getOrders(token));
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
    <Content align="center" justify="center">
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <ContentB justify="space-between" height={height / 2}>
        <Content horizontal width="70%">
          <Content horizontal justify="center">
            <GasCylinder
              size="20px"
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <SText size="20px" color={colors.dark}>
              {orderInfo.size}
            </SText>
          </Content>
          <Content horizontal justify="center">
            <PriceTagIcon
              size="20px"
              color={colors.primary}
              style={{marginRight: 10}}
            />
            <NumberFormat
              value={parseInt(orderInfo.totalprice || 0, 10)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'\u20A6'}
              renderText={value => (
                <SText size="20px" color={colors.dark}>
                  {value}
                </SText>
              )}
            />
          </Content>
        </Content>
        <SText
          size="25px"
          weight="700"
          bmargin={10}
          color={statusColors[orderInfo.status]}>
          {statusMessages[orderInfo.status]}
        </SText>
        <Content horizontal align="center" justify="center">
          <StyledButton
            bg="#00a651"
            width="80%"
            curved
            shadow
            onPress={completerOrder}
            disabled={confirmed || orderInfo.status !== 1}>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                CONFIRM DELIVERY
              </SText>
            )}
          </StyledButton>
        </Content>
      </ContentB>
    </Content>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: width * 0.2,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(OrderItem);
