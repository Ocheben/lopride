import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dimensions, View, StatusBar} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NumberFormat from 'react-number-format';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
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
import {onSignOut} from '../../_services';
import {getContri} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
  LogoImg,
} from '../../Components/styledComponents';
import {NextIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';

const {height, width} = Dimensions.get('window');
const paystackLogo = require('../../assets/img/paystack.png');

const Pay = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const amount = navigation.getParam('amount') || '4000';
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetalis] = useState({});
  const [cardNumber, setCardNumber] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [cvc, setCvc] = useState(null);

  const setGasSize = value => {
    const cost = parseInt(value || 0, 10) * 300;
    setFormInputs(prev => ({...prev, gasSize: value, total: cost.toString()}));
  };

  return (
    <Content justify="space-between">
      <KeyboardAwareScrollView
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View style={{height: height * 0.7, justifyContent: 'center'}}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <View
            style={{
              alignItems: 'center',
              height: height * 0.6,
            }}>
            <Content justify="center" vmargin={10} flex={1}>
              <NumberFormat
                value={parseInt(amount, 10)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'\u20A6'}
                renderText={value => (
                  <SText color="#444444" size="48px" weight="600">
                    {value}
                  </SText>
                )}
              />
              <SText color="#444444" size="48px" />
            </Content>
            <Content width="90%" vmargin={10} flex={1} align="flex-start">
              <SText color="#777777" size="12px">
                Enter Card Information
              </SText>
              <Item>
                <LiteCreditCardInput onChange={setCardDetalis} />
              </Item>
            </Content>
            <Content align="center" vmargin={10} flex={1} justify="center">
              <LogoImg
                source={paystackLogo}
                width={width * 0.8}
                height={90}
                resizeMode="contain"
                style={{alignSelf: 'center'}}
              />
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          <StyledButton
            bg="#00AEEF"
            width="100%"
            onPress={() => navigation.navigate('Rider')}>
            {loading ? (
              <Spinner color="#ffffff" />
            ) : (
              <SText size="20px" weight="700" color="#ffffff">
                PAY
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

export default connect(mapStateToProps)(Pay);
