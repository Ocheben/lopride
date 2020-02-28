import React, {useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  View,
  StyleSheet,
  Switch,
} from 'react-native';
import 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  GradientView,
  SText,
  Content,
  LogoImg,
  colors,
} from './styledComponents';
import {GoldStar, NoStar, MenuIcon} from './icons';

const logo = require('../assets/img/logo.png');
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  starContainer: {marginLeft: 5, marginRight: 5},
});

export const Advert = ({img, header}) => (
  <ImageBackground
    source={img}
    style={{height: '100%', width: '100%'}}
    resizeMode="cover">
    <GradientView
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.6)']}>
      <View style={{height: '20%', justifyContent: 'space-between'}}>
        <SText color={colors.primary} size="30px" weight="700">
          {header}
        </SText>
      </View>
    </GradientView>
  </ImageBackground>
);

export const Rating = ({size, rating}) => (
  <View style={{flexDirection: 'row'}}>
    <View style={styles.starContainer}>
      {rating >= 1 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 2 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 3 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 4 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
    <View style={styles.starContainer}>
      {rating >= 5 ? <GoldStar size={size} /> : <NoStar size={size - 2} />}
    </View>
  </View>
);

export const Header = ({navigation}) => {
  const [online, setOnline] = useState(false);
  return (
    <Content
      shadow
      justify="space-between"
      hpadding={12}
      align="center"
      vmargin={10}
      bg={colors.secondary}
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
        <Switch
          value={online}
          style={{borderColor: colors.primary}}
          onValueChange={value => setOnline(value)}
          thumbColor={colors.primary}
          trackColor={{true: colors.primary, false: '#999999'}}
        />
      </View>
    </Content>
  );
};
