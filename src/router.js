import React from 'react';
import {Dimensions, View} from 'react-native';
import {Switch} from 'native-base';
import 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Login from './Screens/AuthScreens/Login/Login';
import Dashboard from './Screens/Home/Home';
import RequestGas from './Screens/Home/RequestGas';
import Sidebar from './Components/Sidebar';
import Profile from './Screens/Profile/Profile';
import ChangePassword from './Screens/Profile/ChangePassword';
import EditProfile from './Screens/Profile/EditProfile';
import Orders from './Screens/Orders/Orders';
import Order from './Screens/Orders/Order';
import {
  LogoImg,
  BlockView,
  Content,
  colors,
  SText,
} from './Components/styledComponents';
import {
  GridIcon,
  MenuIcon,
  EditIcon,
  LocationIcon,
  GasCylinder,
  OrderHistoryIcon,
  PersonIcon,
  LogoutIcon,
  BackArrow,
} from './Components/icons';
import SignUp from './Screens/AuthScreens/SignUp/SignUp';
import Pay from './Screens/Home/Pay';
import Rider from './Screens/Home/Rider';
import Landing from './Screens/AuthScreens/Landing/Landing';
import CompleteSignup from './Screens/AuthScreens/SignUp/CompleteSignup';
import {Header} from './Components/Components';
import {onSignOut} from './_services';

const logo = require('./assets/img/logo.png');
const {height, width} = Dimensions.get('window');

const signOut = async navigation => {
  await onSignOut();
  navigation.navigate('SignedOut');
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Dashboard,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            shadow
            justify="space-between"
            hpadding={12}
            align="center"
            vmargin={10}
            bg={colors.secondary}
            height={height / 10}
            horizontal>
            <View style={{width: 40}}>
              {/* <Switch
                value={false}
                style={{borderColor: colors.primary}}
                // onValueChange={value => setOnline(value)}
                thumbColor={colors.primary}
                trackColor={{true: colors.primary, false: '#999999'}}
              /> */}
            </View>
            <LogoImg
              source={logo}
              width={width * 0.4}
              resizeMode="contain"
              style={{alignSelf: 'center'}}
            />
            <View style={{width: 40, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => signOut(navigation)}>
                <LogoutIcon color={colors.primary} size={25} />
              </TouchableOpacity>
            </View>
          </Content>
        ),
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      }),
    },
    RequestGas: {
      screen: RequestGas,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            justify="space-between"
            shadow
            hpadding={12}
            align="center"
            vmargin={10}
            bg={colors.secondary}
            height={height / 10}
            horizontal>
            <TouchableOpacity
              style={{width: 40}}
              onPress={() => navigation.navigate('Home')}>
              <BackArrow color={colors.primary} size="25px" />
            </TouchableOpacity>
            <LogoImg
              source={logo}
              width={width * 0.4}
              resizeMode="contain"
              style={{alignSelf: 'center'}}
            />
            <View style={{width: 40}} />
          </Content>
        ),
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerLeft: null,
      }),
    },
    Pay: {
      screen: Pay,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            justify="space-between"
            shadow
            hpadding={12}
            align="center"
            vmargin={10}
            bg={colors.secondary}
            height={height / 10}
            horizontal>
            <TouchableOpacity
              style={{width: 40}}
              onPress={() => navigation.openDrawer()}>
              <MenuIcon color="#ffffff" size={20} />
            </TouchableOpacity>
            <LogoImg
              source={logo}
              width={width * 0.4}
              resizeMode="contain"
              style={{alignSelf: 'center'}}
            />
            <View style={{width: 40}}>
              <LocationIcon color={colors.primary} size="25px" />
            </View>
          </Content>
        ),
        headerLeft: null,
      }),
    },
    Rider: {
      screen: Rider,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            justify="space-between"
            shadow
            hpadding={12}
            align="center"
            vmargin={10}
            bg="#ffffff"
            height={height / 10}
            horizontal>
            <TouchableOpacity
              style={{width: 40}}
              onPress={() => navigation.openDrawer()}>
              <MenuIcon color="#ffffff" size={20} />
            </TouchableOpacity>
            <LogoImg
              source={logo}
              width={width * 0.4}
              resizeMode="contain"
              style={{alignSelf: 'center'}}
            />
            <View style={{width: 40}}>
              <LocationIcon color={colors.primary} size="25px" />
            </View>
          </Content>
        ),
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerLeft: null,
      }),
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            shadow
            justify="space-between"
            hpadding={12}
            align="center"
            bg={colors.secondary}
            vmargin={10}
            height={height / 10}
            horizontal>
            <SText size="28px" weight="700" color="#ffffff" hmargin={30}>
              Profile
            </SText>
            <View style={{width: 40, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => signOut(navigation)}>
                <LogoutIcon color={colors.primary} size={25} />
              </TouchableOpacity>
            </View>
          </Content>
        ),
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      }),
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Change Password',
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: '#ffffff',
        },
        headerTintColor: colors.primary,
      }),
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Edit Profile',
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: '#ffffff',
        },
        headerTintColor: colors.primary,
      }),
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);

const OrderStack = createStackNavigator(
  {
    Orders: {
      screen: Orders,
      navigationOptions: ({navigation}) => ({
        headerTitle: (
          <Content
            shadow
            justify="space-between"
            hpadding={12}
            align="center"
            bg={colors.secondary}
            vmargin={10}
            height={height / 10}
            horizontal>
            {/* <View style={{width: 40}} /> */}
            {/* <TouchableOpacity
            style={{width: 40}}
            onPress={() => navigation.openDrawer()}>
            <MenuIcon color="#ffffff" size={20} />
          </TouchableOpacity> */}
            {
              // <LogoImg source={logo} width={width * 0.3} resizeMode="contain" />
            }
            <SText size="28px" weight="700" color="#ffffff" hmargin={30}>
              Orders
            </SText>
            <View style={{width: 40, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => signOut(navigation)}>
                <LogoutIcon color={colors.primary} size={25} />
              </TouchableOpacity>
            </View>
          </Content>
        ),
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      }),
    },
    Order: {
      screen: Order,
      navigationOptions: ({navigation}) => ({
        headerTitle: 'Order',
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          color: '#ffffff',
        },
        headerTintColor: colors.primary,
      }),
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarVisible: navigation.state.index < 1,
    }),
  },
);

const AuthStack = createStackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
      headerStyle: {
        elevation: 0,
      },
    },
  },
  CompleteSignup: {
    screen: CompleteSignup,
    navigationOptions: {
      header: null,
      headerStyle: {
        elevation: 0,
      },
    },
  },
});

// export const SignedIn = createDrawerNavigator(
//   {
//     Dashboard: {
//       screen: HomeStack,
//     },
//     Profile: {
//       screen: ProfileStack,
//     },
//   },
//   {
//     contentComponent: Sidebar,
//     drawerWidth: 300,
//   },
// );

export const SignedIn = createBottomTabNavigator(
  {
    Orders: {
      screen: OrderStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <OrderHistoryIcon
            size={focused ? '35px' : '30px'}
            color={focused ? colors.primary : '#777777'}
          />
        ),
        tabBarLabel: 'Orders',
      },
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <GasCylinder
            size={focused ? '35px' : '30px'}
            color={focused ? colors.primary : '#777777'}
          />
        ),
        tabBarLabel: 'Buy Gas',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <PersonIcon
            size={focused ? '35px' : '30px'}
            color={focused ? colors.primary : '#777777'}
          />
        ),
        tabBarLabel: 'Orders',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: '#444444',
      showLabel: false,
      style: {
        height: 60,
        borderTopWidth: 0,
        borderTopColor: 'red',
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowColor: '#000000',
        shadowOffset: {
          height: -5,
        },
      },
    },
    contentComponent: Sidebar,
    drawerWidth: 300,
  },
);

export const createRootNavigator = (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn,
        },
        SignedOut: {
          screen: AuthStack,
        },
      },
      {
        initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      },
    ),
  );
