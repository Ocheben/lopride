import React from 'react';
import {Dimensions, Linking, Platform, View, StyleSheet} from 'react-native';
import {
  Content,
  LogoImg,
  SText,
  StyledButton,
  colors,
} from '../../Components/styledComponents';
import {KekeIcon, PhoneIcon} from '../../Components/icons';
import {Rating} from '../../Components/Components';

const avatar = require('../../assets/img/avatar.png');
const {height, width} = Dimensions.get('window');

const Rider = () => {
  const makeCall = () => {
    let phoneNumber = '';
    const androidPrefix = 'tel:${';
    const iosPrefix = 'telprompt:${';

    if (Platform.OS === 'android') {
      phoneNumber = androidPrefix + '09025605555' + '}';
    } else {
      phoneNumber = iosPrefix + '09025605555' + '}';
    }

    Linking.openURL(phoneNumber);
  };
  return (
    <Content align="center" justify="space-between">
      <Content flex={2}>
        <View style={styles.avatarContainer}>
          <LogoImg
            source={avatar}
            width={width * 0.4}
            height={width * 0.4}
            resizeMode="contain"
            style={{alignSelf: 'center'}}
          />
        </View>
        <SText size="32px" color="#333333" weight="700">
          Hassan Musa
        </SText>
      </Content>
      <Content flex={1} horizontal>
        <Content align="center" flex={1} height="100%" justify="space-between">
          <SText color="#6d6e70" size="17px">
            Vehicle type
          </SText>
          <Content justify="space-around">
            <KekeIcon size="60px" />
          </Content>
        </Content>
        <Content height="100%" justify="space-between">
          <SText color="#6d6e70" size="17px">
            License Number
          </SText>
          <Content justify="space-around">
            <SText color="#444444" size="24px" weight="700">
              KUJ 989 AG
            </SText>
          </Content>
        </Content>
      </Content>
      <Content justify="space-between">
        <Rating size={35} rating={4} />
        <Content horizontal>
          <PhoneIcon color="#6d6e70" size={20} />
          <SText hmargin={5} color="#6d6e70" size="17px">
            09025605555
          </SText>
        </Content>
      </Content>
      <StyledButton bg={colors.primary} width="100%" onPress={() => makeCall()}>
        <SText size="20px" weight="700" color="#ffffff">
          Call Rider
        </SText>
      </StyledButton>
    </Content>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: width * 0.2,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
});

export default Rider;
