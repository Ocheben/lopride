/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, Dimensions, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import {onSignOut} from '../_services';
import {BlockView, SText, LogoImg, colors, Content} from './styledComponents';
import {
  DashboardIcon,
  ContributionIcon,
  RequestIcon,
  EnquiryIcon,
  PersonIcon,
  CalculatorIcon,
  LocationIcon,
  LogoutIcon,
  GasCylinder,
  OrderHistoryIcon,
  FeedbackIcon,
  CommentIcon,
  WalletIcon,
} from './icons';

const avatar = require('../assets/img/avatar.png');
const logo = require('../assets/img/logo.png');
const {height, width} = Dimensions.get('window');

const Sidebar = props => {
  // const [userInfo, setUserInfo] = useState({});
  // useEffect(() => {
  //   const getUser = async () => {
  //     const user = await AsyncStorage.getItem('user');
  //     setUserInfo(JSON.parse(user).user);
  //   };
  //   getUser();
  // }, []);
  const {navigation, userData} = props;
  const {
    dashboard: {
      user: {name},
    },
  } = userData;
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  const navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    props.navigation.dispatch(navigateAction);
  };
  return (
    <View style={{backgroundColor: '#ffffff', height: '100%'}}>
      <Content bg={colors.secondary}>
        <LogoImg
          source={logo}
          width={width * 0.4}
          resizeMode="contain"
          style={{alignSelf: 'center'}}
        />
      </Content>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: height * 0.05,
          paddingLeft: width / 20,
          height: height * 0.2,
          alignItems: 'center',
          backgroundColor: colors.primary,
        }}>
        <View
          style={{
            borderRadius: width * 0.075,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          }}>
          <LogoImg
            source={avatar}
            width={width * 0.15}
            height={width * 0.15}
            resizeMode="contain"
          />
        </View>
        <BlockView hmargin={width / 30}>
          <SText color="#444444" size="27px" weight="700">
            Hassan Musa
          </SText>
          <NumberFormat
            value={30000}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'\u20A6'}
            renderText={value => (
              <SText color="#ffffff" size="20px" weight="700">
                {value}
              </SText>
            )}
          />
        </BlockView>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <GasCylinder
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Request
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Contribution')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <ContributionIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Contributions
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <OrderHistoryIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Delivery History
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Enquiry')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <WalletIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Wallet
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <FeedbackIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Feedback
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Pencalc')}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <CommentIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Contact Us
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <BlockView width="100%" hmargin={width / 20} height={height / 15}>
            <Content horizontal justify="flex-start">
              <LogoutIcon
                size="30px"
                color={colors.primary}
                style={{marginRight: 10}}
              />
              <SText color="#444444" size="22px" weight="bold">
                Logout
              </SText>
            </Content>
          </BlockView>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Sidebar);
