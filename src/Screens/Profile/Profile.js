import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, Dimensions, StatusBar} from 'react-native';
import {
  Content,
  SText,
  StyledButton,
  LogoImg,
  colors,
} from '../../Components/styledComponents';
import {Item, Input, Icon, Label} from 'native-base';
import {
  PersonIcon,
  LockIcon,
  PhoneIcon,
  AtIcon,
  LocationIcon,
  EditIcon,
} from '../../Components/icons';

const {height, width} = Dimensions.get('window');
const avatar = require('../../assets/img/avatar.png');

const Profile = props => {
  const {navigation, userData, userInfo} = props;
  const {name, email, phone} = userInfo;
  return (
    // <View style={{backgroundColor: 'blue', flex: 1, justifyContent:'center'}}>
    //   <Text>Login</Text>
    //   <Button onPress={() => signIn('user')} title="Login" />
    // </View>
    <Content justify="space-between">
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      <Content flex={2} width="100%" justify="flex-start">
        <LogoImg
          source={avatar}
          width={width * 0.3}
          height={height * 0.3}
          resizeMode="contain"
        />
      </Content>
      <Content flex={3} justify="flex-start" width="80%">
        <SText size="30px" weight="700" color="#444444">
          {name}
        </SText>
        {/* <Content horizontal justify="flex-start" align="center">
          <LockIcon
            size="25px"
            color={colors.primary}
            style={{marginRight: 10}}
          />
          <SText size="20px" color={colors.dark}>
            {rsa_pin || ''}
          </SText>
        </Content> */}
        <Content horizontal justify="flex-start" align="center">
          <AtIcon
            size="25px"
            color={colors.primary}
            style={{marginRight: 10}}
          />
          <SText size="20px" color={colors.dark}>
            {email || ''}
          </SText>
        </Content>
        <Content horizontal justify="flex-start">
          <PhoneIcon
            size="25px"
            color={colors.primary}
            style={{marginRight: 10}}
          />
          <SText size="20px" color={colors.dark}>
            {phone || ''}
          </SText>
        </Content>
      </Content>
      <Content flex={2} justify="space-between" width="90%" horizontal>
        <StyledButton
          curved
          shadow
          bg={colors.primary}
          width="45%"
          onPress={() => navigation.navigate('EditProfile')}>
          <Content horizontal>
            <EditIcon size="18px" color="#ffffff" style={{marginRight: 5}} />
            <SText size="13px" color="#ffffff">
              Edit Profile
            </SText>
          </Content>
        </StyledButton>
        <StyledButton
          curved
          shadow
          bg={colors.primary}
          width="45%"
          onPress={() => navigation.navigate('ChangePassword')}>
          <Content horizontal>
            <LockIcon size="18px" color="#ffffff" style={{marginRight: 3}} />
            <SText size="13px" color="#ffffff">
              Change Password
            </SText>
          </Content>
        </StyledButton>
      </Content>
    </Content>
  );
};
const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Profile);
