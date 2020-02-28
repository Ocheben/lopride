import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {WebView} from 'react-native-webview';
import {
  List,
  ListItem,
  Icon,
  Spinner,
  Item,
  Picker,
  Label,
  Input,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  SText,
  Content,
  LogoImg,
  ContentButton,
  StyledButton,
  colors,
} from '../../../Components/styledComponents';

const {height, width} = Dimensions.get('window');
const logo = require('../../../assets/img/logo.png');

const CompleteSignup = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const cylinderSize = navigation.getParam('cylinderSize') || '12';
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormInputs(prev => ({...prev, cylinderSize: cylinderSize}));
  }, [cylinderSize]);

  const setGasSize = value => {
    const cost = parseInt(value || 0, 10) * 300;
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{
          flexGrow: 1,
          width: width,
          backgroundColor: colors.secondary,
        }}>
        <View>
          <StatusBar
            backgroundColor={colors.secondary}
            barStyle="light-content"
          />
          <View style={{alignItems: 'center', marginTop: 30}}>
            <Content flex={1}>
              <LogoImg source={logo} width={width * 0.5} resizeMode="contain" />
            </Content>
            <Content flex={1} vmargin={10}>
              <SText color="#ffffff" size="16px">
                Complete your account information
              </SText>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Name</Label>
                <Input
                  name="name"
                  keyboardType="default"
                  textContentType="name"
                  style={{color:'#ffffff'}}
                  value={formInputs.name || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      name: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Email</Label>
                <Input
                  name="email"
                  style={{color:'#ffffff'}}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={formInputs.email || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      email: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Vehicle Documents</Label>
                <Input
                  name="vehicle"
                  style={{color:'#ffffff'}}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={formInputs.vehicle || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      vehicle: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Driver's License</Label>
                <Input
                  name="driver"
                  style={{color:'#ffffff'}}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={formInputs.driver || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      driver: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Password</Label>
                <Input
                  name="password"
                  style={{color:'#ffffff'}}
                  keyboardType="default"
                  textContentType="password"
                  secureTextEntry
                  value={formInputs.password || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      password: text,
                    }))
                  }
                />
              </Item>
            </Content>
            <Content
              width="90%"
              vmargin={10}
              flex={0}
              justify="flex-start"
              horizontal>
              <Item floatingLabel>
                <Label style={{color:'#ffffff'}}>Password</Label>
                <Input
                  name="confirmPassword"
                  style={{color:'#ffffff'}}
                  keyboardType="default"
                  textContentType="password"
                  secureTextEntry
                  value={formInputs.conformPassword || ''}
                  onChangeText={text =>
                    setFormInputs(prev => ({
                      ...prev,
                      confirmPassword: text,
                    }))
                  }
                />
              </Item>
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0}>
          <StyledButton
            bg={colors.primary}
            curved
            shadow
            width="90%"
            onPress={() => navigation.navigate('SignedIn')}>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                Sign Up
              </SText>
            )}
          </StyledButton>
        </Content>
      </KeyboardAwareScrollView>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(CompleteSignup);
