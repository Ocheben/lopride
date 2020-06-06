import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, StatusBar, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Item, Input, Label, Toast, Spinner} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Content,
  SText,
  StyledButton,
  SNInput,
  colors,
} from '../../Components/styledComponents';
import {MenuIcon} from '../../Components/icons';
import {
  APIS,
  request,
  toastDefault,
  requestJwt,
  onSignOut,
} from '../../_services';
import {getDash} from '../../_store/actions/userActions';

const {height, width} = Dimensions.get('window');

const EditProfile = props => {
  const {navigation, userInfo, userData, dispatch} = props;
  const {name, email, phone, token} = userInfo;

  const [formInputs, setFormInputs] = useState({name, email, phone});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});

  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };
  const submit = async () => {
    const {
      baseUrl,
      editProfile: {method, path},
    } = APIS;
    const url = `${baseUrl}${path}`;
    setLoading(true);
    const response = await requestJwt(method, url, formInputs, token);
    console.log(response, formInputs, url, method);
    if (response.meta && response.meta.status === 200) {
      Toast.show({
        ...toastDefault,
        text: 'You have successfully updated your profile',
        type: 'success',
      });
      signOut();
    } else {
      Toast.show({
        ...toastDefault,
        text: 'Unable to edit profile',
        type: 'danger',
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <View>
        <StatusBar
          backgroundColor={colors.secondary}
          barStyle="light-content"
        />
        <View style={{alignItems: 'center'}}>
          <Content width="90%" vmargin={20} flex={0} align="center">
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                name="name"
                keyboardType="default"
                value={formInputs.name || ''}
                onChangeText={text =>
                  setFormInputs(prev => ({...prev, name: text}))
                }
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={20} flex={0} align="center">
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                name="email"
                keyboardType="email-address"
                value={formInputs.email || ''}
                onChangeText={text =>
                  setFormInputs(prev => ({...prev, email: text}))
                }
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={10} flex={0} align="center">
            <Item floatingLabel>
              <Label>Phone</Label>
              <Input
                name="phone"
                keyboardType="number-pad"
                value={formInputs.phone || ''}
                onChangeText={text =>
                  setFormInputs(prev => ({...prev, phone: text}))
                }
              />
            </Item>
          </Content>
          <Content width="90%" vmargin={30} flex={0} justify="center">
            <StyledButton
              curved
              shadow
              bg={colors.primary}
              width="80%"
              onPress={submit}>
              {loading ? (
                <Spinner color="#ffffff" />
              ) : (
                <SText size="20px" color="#ffffff">
                  Edit
                </SText>
              )}
            </StyledButton>
          </Content>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(EditProfile);
