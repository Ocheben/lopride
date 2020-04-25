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
import {onSignOut} from '../../_services';
import {getContri} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {NextIcon, LocationIcon} from '../../Components/icons';
import {RsaIcon} from '../../Components/Vectors';
import Directions from '../../Components/Directions';

const {height, width} = Dimensions.get('window');

const RequestGas = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const cylinderSize = navigation.getParam('cylinderSize') || '12';
  const [formInputs, setFormInputs] = useState({});
  const [accepted, setAccepted] = useState(false);
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
        contentContainerStyle={{flexGrow: 1, width: width}}>
        <View>
          <StatusBar
            backgroundColor={colors.secondary}
            barStyle="light-content"
          />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <SText
              width="100%"
              weight="700"
              uppercase
              size="20px"
              align="center"
              color={colors.light}>
              New request
            </SText>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Gas Cylinder Size
              </SText>
              <SText width="100%" weight="700" size="30px" color={colors.light}>
                12.5 kg
              </SText>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Gas
              </SText>
              <SText width="100%" weight="700" size="30px" color={colors.light}>
                12.5 kg
              </SText>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Pickup Address
              </SText>
              <Content horizontal width="90%">
                <SText
                  width="100%"
                  weight="700"
                  size="30px"
                  color={colors.light}>
                  Aco Estate Phase 2
                </SText>
                <Directions />
              </Content>
            </Content>
            <Content width="90%" vmargin={10} flex={0} align="center">
              <SText width="100%" bmargin={5} size="16px" color={colors.light}>
                Delivery Address
              </SText>
              <Content horizontal width="90%">
                <SText
                  width="100%"
                  weight="700"
                  size="30px"
                  color={colors.light}>
                  Aco Estate Phase 2
                </SText>
                <Directions />
              </Content>
            </Content>
          </View>
        </View>
        <Content width="100%" flex={0} justify="flex-end">
          {accepted ? (
            <StyledButton bg="#00a651" width="100%">
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" weight="700" color="#ffffff">
                  START
                </SText>
              )}
            </StyledButton>
          ) : (
            <Content horizontal align="flex-end">
              <StyledButton
                bg="#b61e23"
                width="50%"
                onPress={() =>
                  navigation.navigate('Home', {amount: formInputs.total})
                }>
                {loading ? (
                  <Spinner color="#ffffff" />
                ) : (
                  <SText size="20px" weight="700" color="#ffffff">
                    DECLINE
                  </SText>
                )}
              </StyledButton>
              <StyledButton
                bg="#00a651"
                width="50%"
                onPress={() => setAccepted(true)}>
                {loading ? (
                  <Spinner color="#ffffff" />
                ) : (
                  <SText size="20px" weight="700" color="#ffffff">
                    ACCEPT
                  </SText>
                )}
              </StyledButton>
            </Content>
          )}
        </Content>
      </KeyboardAwareScrollView>
    </Content>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(RequestGas);
