import React, { useState } from 'react';
import {View, Button, Text, Dimensions, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Toast, Spinner} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {onSignIn} from '../../../_services';
import {
  Content,
  SText,
  StyledButton,
  LogoImg,
  SNInput,
  colors,
} from '../../../Components/styledComponents';
import {Item, Input, Icon, Label} from 'native-base';
import {PersonIcon, LockIcon, AtIcon} from '../../../Components/icons';
import {APIS, request, toastDefault} from '../../../_services';
import {login} from '../../../_store/actions/authActions';
import { LostCoinIcon } from '../../../Components/Vectors';

const {height, width} = Dimensions.get('window');
const logo = require('../../../assets/img/logo.png');

const Login = props => {
  const {navigation, dispatch, userInfo} = props;
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const signIn = async user => {
    await onSignIn(user);
    navigation.navigate('SignedIn');
  };

  const handleSubmit = async () => {
    navigation.navigate('SignedIn');
    // const {
    //   baseUrl,
    //   login: {method, path},
    // } = APIS;
    // console.log(path);
    // const submitUrl = `${baseUrl}${path}`;

    // setLoading(true);
    // const response = await request(method, submitUrl, {email, password});
    // console.log(response, method, submitUrl, {email, password});
    // if (response.access_token) {
    //   Toast.show({
    //     ...toastDefault,
    //     text: 'You have successfully logged in',
    //     type: 'success',
    //   });
    //   setLoading(false);
    //   dispatch(login({...response, isLoggedin: true}));
    //   await signIn(JSON.stringify(response));
    // } else {
    //   Toast.show({
    //     ...toastDefault,
    //     text: 'Invalid username or password',
    //     type: 'danger',
    //   });
    // }
    // setLoading(false);
  };

  return (
    // <View style={{backgroundColor: 'blue', flex: 1, justifyContent:'center'}}>
    //   <Text>Login</Text>
    //   <Button onPress={() => signIn('user')} title="Login" />
    // </View>
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: colors.secondary,
      }}>
    <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      <Content flex={0.3} justify="space-evenly">
        <LogoImg source={logo} width={width * 0.7} resizeMode="contain" />
      </Content>
      <Content flex={0.3} width="85%">
        <Item style={{marginBottom: 15}} floatingLabel>
          {/* <AtIcon color={colors.primary} size={30} /> */}
          <Label style={{color: '#ffffff'}}>Phone</Label>
          <Input
            placeholder="Phone"
            keyboardType="number-pad"
            textContentType="telephoneNumber"
            style={{color: '#ffffff'}}
            onChangeText={text => setPhone(text)}
            value={phone}
          />
        </Item>
        <Item floatingLabel>
          {/* <LockIcon color={colors.primary} size={30} /> */}
          <Label style={{color: '#ffffff'}}>Password</Label>
          <Input
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            style={{color: '#ffffff'}}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </Item>
      </Content>
      <Content flex={0.2} justify="space-evenly">
        <StyledButton
          bg={colors.primary}
          curved
          shadow
          width="85%"
          height={65}
          onPress={() => handleSubmit()}>
          {loading ? (
            <Spinner color="#ffffff" />
          ) : (
            <SText size="24px" weight="700" color="#ffffff">
              LOGIN
            </SText>
          )}
        </StyledButton>
        <StyledButton
          width="auto"
          height="auto"
          onPress={() => navigation.navigate('SignUp')}>
          <SText size="15px" weight="700" color={colors.primary}>
            Forgot Password
          </SText>
        </StyledButton>
        <View style={{ flexDirection: 'row'}}>
          <SText size="15px" color="#ffffff" hmargin={5}>
            Don't have an account?
          </SText>
          <StyledButton
            width="auto"
            height="auto"
            onPress={() => navigation.navigate('SignUp')}>
            <SText size="15px" weight="700" color={colors.primary}>
              Sign Up
            </SText>
          </StyledButton>
        </View>
      </Content>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  // userData: state.userData,
});

export default connect(mapStateToProps)(Login);
