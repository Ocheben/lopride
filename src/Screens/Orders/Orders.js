import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, ScrollView, RefreshControl, StatusBar} from 'react-native';
import {List, ListItem, Icon, Spinner} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import {useFocusEffect} from '@react-navigation/native';
import {onSignOut} from '../../_services';
import {getMissing} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentB,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {
  NextIcon,
  LocationIcon,
  CorporationIcon,
  EmployeeIcon,
  ContributionIcon,
  ClockIcon,
  GasCylinder,
  PriceTagIcon,
  BackArrow,
  ForwardArrow,
} from '../../Components/icons';
import {LostCoinIcon} from '../../Components/Vectors';
import {formatDate} from '../../_helpers';
import NoDataIcon from '../../Components/Vectors/NoDataIcon';
import {APIS, requestJwt, toastDefault} from '../../_services';
import {getOrders} from '../../_store/actions/userActions';

const {height, width} = Dimensions.get('window');

// const orderList = [
//   {
//     date: '28th April, 2020 | 12:45 pm',
//     price: 5000,
//     size: '12 kg',
//     status: 2,
//   },
//   {
//     date: '20th April, 2020 | 12:45 pm',
//     price: 5000,
//     size: '12 kg',
//     status: 2,
//   },
// ];

const statusColors = ['#ff1744', colors.primary, '#1b5e20'];
const statusMessages = ['Queued', 'In Progress', 'Delivered'];

const Orders = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {token} = userInfo;
  const {orders} = userData;
  const {missing, loading} = userData;

  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getOrders(token, page));
    console.log('getting');
  }, [page]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log('try again')
  //   }, [])
  // );

  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  const orderList = orders.map(order => ({
    ...order,
    date: order.dateordered || '',
    price: order.price ? parseInt(order.price, 10) : 0,
    size: order.buyingsize ? order.buyingsize + ' kg' : '',
    status:
      order.orderstatus && order.orderstatus !== null
        ? parseInt(order.orderstatus, 10)
        : 0,
  }));
  // const getOrders = async () => {
  //   const {
  //     baseUrl,
  //     getOders: {method, path},
  //   } = APIS;
  //   const url = `${baseUrl}${path}`;
  //   const response = await requestJwt(method, url, {}, token);
  //   console.log(response);
  // };

  return (
    <ScrollView
      contentContainerStyle={{alignItems: 'center', marginTop: 10}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => dispatch(getOrders(token, page))}
          colors={[colors.primary]}
        />
      }>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      {loading === 'orders' ? (
        <Content height={height * 0.7} justify="center">
          <Spinner color={colors.primary} />
        </Content>
      ) : orderList.length > 0 ? (
        <>
          {orderList.map((item, index) => (
            <ContentButton
              key={index}
              onPress={() =>
                navigation.navigate('Order', {
                  orderInfo: item,
                  buyid: item.buyid,
                  page,
                })
              }
              bg="#ffffff"
              ribbon
              vmargin={10}
              vpadding={10}
              shadow
              height={height * 0.22}
              borderR={10}
              width="93%"
              align="flex-start"
              hpadding={width / 20}
              justify="space-around">
              <Content horizontal justify="flex-start">
                <ClockIcon
                  size="20px"
                  color={colors.primary}
                  style={{marginRight: 10}}
                />
                <SText size="20px" color={colors.dark}>
                  {item.date}
                </SText>
              </Content>
              <Content horizontal justify="flex-start">
                <GasCylinder
                  size="20px"
                  color={colors.primary}
                  style={{marginRight: 10}}
                />
                <SText size="20px" color={colors.dark}>
                  {item.size}
                </SText>
              </Content>
              <Content horizontal justify="flex-start">
                <PriceTagIcon
                  size="20px"
                  color={colors.primary}
                  style={{marginRight: 10}}
                />
                <NumberFormat
                  value={parseInt(item.totalprice || 0, 10)}
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
              <SText size="25px" weight="700" color={statusColors[item.status]}>
                {statusMessages[item.status]}
              </SText>
            </ContentButton>
          ))}
          <ContentB bmargin={30} width="60%" horizontal justify="space-between">
            <StyledButton
              bg="#ffffff"
              shadow
              width="20%"
              height={45}
              curved
              disabled={page === 0}
              onPress={() => setPage(prev => prev - 1)}>
              <BackArrow size={20} color={colors.primary} />
            </StyledButton>
            <SText color="#444444" size="18px" weight="700">
              {page + 1}
            </SText>
            <StyledButton
              bg="#ffffff"
              shadow
              width="20%"
              height={45}
              curved
              disabled={orders.length < 20}
              onPress={() => setPage(prev => prev + 1)}>
              <ForwardArrow size={20} color={colors.primary} />
            </StyledButton>
          </ContentB>
        </>
      ) : (
        <Content justify="space-evenly" vmargin={15} flex={6}>
          <Content height={height * 0.5} justify="center">
            <NoDataIcon size={height * 0.25} color={colors.primary} />
            <SText color={colors.dark} weight="700" size="20px">
              No Order found
            </SText>
          </Content>
        </Content>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Orders);
