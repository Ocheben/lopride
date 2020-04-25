import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Button,
  Text,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {List, ListItem, Icon, Spinner} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import {onSignOut} from '../../_services';
import {getMissing} from '../../_store/actions/userActions';
import {
  SText,
  Content,
  ContentButton,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {
  NextIcon,
  LocationIcon,
  CorporationIcon,
  EmployeeIcon,
  ContributionIcon,
} from '../../Components/icons';
import {LostCoinIcon} from '../../Components/Vectors';
import {formatDate} from '../../_helpers';
import NoDataIcon from '../../Components/Vectors/NoDataIcon';

const {height, width} = Dimensions.get('window');

const Orders = props => {
  const {navigation, dispatch, userInfo, userData} = props;
  const {missing, loading} = userData;
  const signOut = () => {
    onSignOut();
    navigation.navigate('SignedOut');
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      {loading === 'missingContributions' ? (
        <Content height={height * 0.7} justify="center">
          <Spinner color={colors.primary} />
        </Content>
      ) : (
        <Content justify="space-evenly" vmargin={15} flex={6}>
          <Content height={height * 0.5} justify="center">
            <NoDataIcon size={height * 0.25} color={colors.primary} />
            <SText color={colors.dark} weight="700" size="20px">
              No Order found
            </SText>
          </Content>
          <Content>
            <StyledButton
              bg={colors.primary}
              shadow
              width="50%"
              curved
              onPress={() => navigation.navigate('Home')}>
              <SText size="20px" weight="700" color="#ffffff">
                Order Gas
              </SText>
            </StyledButton>
          </Content>
        </Content>
      )}
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userData: state.userData,
});

export default connect(mapStateToProps)(Orders);
