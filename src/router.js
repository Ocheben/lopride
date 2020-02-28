import React from 'react';
import {Dimensions, View} from 'react-native';
import {Switch} from 'native-base';
import 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Screens/AuthScreens/Login/Login';
import Dashboard from './Screens/Home/Home';
import RequestGas from './Screens/Home/RequestGas';
import Sidebar from './Components/Sidebar';
import Profile from './Screens/Profile/Profile';
import ChangePassword from './Screens/Profile/ChangePassword';
import EditProfile from './Screens/Profile/EditProfile';
import {
  LogoImg,
  BlockView,
  Content,
  colors,
  SText,
} from './Components/styledComponents';
import {GridIcon, MenuIcon, EditIcon, LocationIcon} from './Components/icons';
import SignUp from './Screens/AuthScreens/SignUp/SignUp';
import Pay from './Screens/Home/Pay';
import Rider from './Screens/Home/Rider';
import Landing from './Screens/AuthScreens/Landing/Landing';
import CompleteSignup from './Screens/AuthScreens/SignUp/CompleteSignup';
import { Header } from './Components/Components';

const logo = require('./assets/img/logo.png');
const {height, width} = Dimensions.get('window');

const HomeStack = createStackNavigator({
  Home: {
    screen: Dashboard,
    navigationOptions: ({navigation}) => ({
      headerTitle: <Header navigation={navigation} />,
    }),
  },
  RequestGas: {
    screen: RequestGas,
    navigationOptions: ({navigation}) => ({
      headerTitle: <Header navigation={navigation} />,
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
      headerLeft: null,
    }),
  },
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) => ({
      headerTitle: (
        <Content
          shadow
          justify="flex-start"
          hpadding={12}
          align="center"
          bg={colors.primary}
          vmargin={10}
          height={height / 10}
          horizontal>
          <TouchableOpacity
            style={{width: 40}}
            onPress={() => navigation.openDrawer()}>
            <MenuIcon color="#ffffff" size={20} />
          </TouchableOpacity>
          {
            // <LogoImg source={logo} width={width * 0.3} resizeMode="contain" />
          }
          <SText size="25px" weight="700" color="#ffffff">
            Profile
          </SText>
          <></>
        </Content>
      ),
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Change Password',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#ffffff',
      },
      headerTintColor: '#ffffff',
    }),
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Edit Profile',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#ffffff',
      },
      headerTintColor: '#ffffff',
    }),
  },
});

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

export const SignedIn = createDrawerNavigator(
  {
    Dashboard: {
      screen: HomeStack,
    },
    Profile: {
      screen: ProfileStack,
    },
  },
  {
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
