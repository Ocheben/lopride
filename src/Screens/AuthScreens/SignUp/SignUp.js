import React, {useState} from 'react';
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
import {
  PersonIcon,
  LockIcon,
  AtIcon,
  PhoneIcon,
  NextIcon,
} from '../../../Components/icons';
import {APIS, request, toastDefault} from '../../../_services';
import {login} from '../../../_store/actions/authActions';
import {LostCoinIcon} from '../../../Components/Vectors';

const {height, width} = Dimensions.get('window');
const logo = require('../../../assets/img/logo.png');

const SignUp = props => {
  const {navigation, dispatch, userInfo} = props;
  const [loading, setLoading] = useState(false);
  const [rsaPin, setRsaPin] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [sentPhone, setSentPhone] = useState(false);
  const signIn = async user => {
    await onSignIn(user);
    navigation.navigate('SignedIn');
  };

  const initSignup = async () => {
    // navigation.navigate('SignedIn');
    const {
      baseUrl,
      initSignup: {method, path},
    } = APIS;
    console.log(path);
    const submitUrl = `${baseUrl}${path}`;

    setLoading(true);
    const response = await request(method, submitUrl, {phone});
    console.log(response, method, submitUrl, phone);
    if (response.meta && response.meta.status === 200) {
      Toast.show({
        ...toastDefault,
        text: `OTP has been sent to ${phone}`,
        type: 'success',
      });
      setSentPhone(true);
      // dispatch(login({...response, isLoggedin: true}));
      // await signIn(JSON.stringify(response));
    } else {
      Toast.show({
        ...toastDefault,
        text: response.meta ? response.meta.message : 'An error occurred',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    // navigation.navigate('SignedIn');
    const {
      baseUrl,
      verifyOtp: {method, path},
    } = APIS;
    console.log(path);
    const submitUrl = `${baseUrl}${path}`;

    setLoading(true);
    const response = await request(method, submitUrl, {phone, otp});
    console.log(response, method, submitUrl, phone, otp);
    if (response.meta && response.meta.status === 200) {
      Toast.show({
        ...toastDefault,
        text: 'OTP verified',
        type: 'success',
      });
      setSentPhone(true);
      navigation.navigate('CompleteSignup', {phone});
      // dispatch(login({...response, isLoggedin: true}));
      // await signIn(JSON.stringify(response));
    } else {
      Toast.show({
        ...toastDefault,
        text: response.message || 'An error occurred',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
      }}>
      {/* <View style={{width: '100%'}}> */}
      <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
      {/* <View style={{alignItems: 'center', marginTop: 30}}> */}
      <Content flex={0}>
        <LogoImg source={logo} width={width * 0.5} resizeMode="contain" />
      </Content>
      {sentPhone ? (
        <>
          <Content flex={0} width="90%" align="flex-start">
            <SText color="#ffffff" size="32px" align="left" weight="700">
              Verify
            </SText>
          </Content>
          <Content flex={0} width="90%">
            <Item style={{marginBottom: 15}}>
              <LockIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="OTP"
                keyboardType="numeric"
                textContentType="password"
                style={{color: '#ffffff'}}
                placeholderTextColor="#ffffff"
                onChangeText={text => setOtp(text)}
              />
            </Item>
            <SText color="#ffffff" size="14px">
              Check your phone for a six digit code
            </SText>
            <SText color={colors.primary} size="14px">
              Code expires in 3:00
            </SText>
          </Content>
          <Content flex={1} horizontal width="85%" justify="space-between">
            <StyledButton
              curved
              bg={colors.primary}
              width="40%"
              onPress={() => verifyOtp()}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <NextIcon color="#ffffff" size={30} />
              )}
            </StyledButton>
            <StyledButton
              width="auto"
              height="auto"
              onPress={() => initSignup()}>
              <SText size="15px" weight="700" color={colors.primary}>
                RESEND CODE
              </SText>
            </StyledButton>
          </Content>
        </>
      ) : (
        <>
          <Content flex={0} width="90%" align="flex-start">
            <SText color="#ffffff" size="32px" align="left" weight="700">
              Rider
            </SText>
            <SText color="#ffffff" size="19px">
              Sign up {'\n'}Upload document, Get verified{'\n'}Get requests,
              Deliver and Earn
            </SText>
          </Content>
          <Content flex={0} width="90%">
            <Item style={{marginBottom: 15}}>
              <PhoneIcon color={colors.primary} size={30} />
              <SNInput
                floatingLabel
                placeholder="Phone Number"
                keyboardType="numeric"
                style={{color: '#ffffff'}}
                placeholderTextColor="#ffffff"
                onChangeText={text => setPhone(text)}
              />
            </Item>
          </Content>
          <Content flex={1} horizontal width="85%" justify="space-between">
            <StyledButton
              curved
              bg={colors.primary}
              width="40%"
              onPress={() => initSignup()}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <NextIcon color="#ffffff" size={30} />
              )}
            </StyledButton>
            <StyledButton
              width="auto"
              height="auto"
              onPress={() => navigation.navigate('Login')}>
              <SText size="15px" weight="700" color={colors.primary}>
                LOGIN
              </SText>
            </StyledButton>
          </Content>
        </>
      )}
      {/* </View>
      </View> */}
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  // userData: state.userData,
});

export default connect(mapStateToProps)(SignUp);
