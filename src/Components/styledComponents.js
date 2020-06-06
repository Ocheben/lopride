import styled from 'styled-components/native';
import {Input} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

export const colors = {
  // primary: '#37bf86',
  primary: '#fdbd0f',
  dark: '#363636',
  secondary: '#404041',
  light: '#777777',
};

export const Content = styled.View`
  flex: ${props => props.flex || 1};
  background-color: ${props => props.bg || '#00000000'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
  padding-top: ${props => props.tpadding || props.vpadding || 0};
  padding-bottom: ${props => props.bpadding || props.vpadding || 0};
  padding-left: ${props => props.lpadding || props.hpadding || 0};
  padding-right: ${props => props.rpadding || props.hpadding || 0};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.lmargin || props.hmargin || 0};
  margin-right: ${props => props.rmargin || props.hmargin || 0};
  border-radius: ${props => props.borderR || 0};
  border-bottom-left-radius: ${props => props.blRadius || props.borderR || 0};
  border-bottom-right-radius: ${props => props.brRadius || props.borderR || 0};
  border-left-width: ${props => (props.ribbon ? 7 : 0)};
  border-left-color: ${props => (props.ribbon ? colors.primary : '#00000000')};
  box-shadow: ${props =>
    props.shadow ? '0 3px 6px rgba(0,0,0,0.26)' : '0 0px 0px rgba(0,0,0,0.26)'};
  elevation: ${props => (props.shadow ? 5 : 0)};
`;

export const ContentB = styled.View`
  background-color: ${props => props.bg || '#00000000'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
  padding-top: ${props => props.tpadding || props.vpadding || 0};
  padding-bottom: ${props => props.bpadding || props.vpadding || 0};
  padding-left: ${props => props.lpadding || props.hpadding || 0};
  padding-right: ${props => props.rpadding || props.hpadding || 0};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.lmargin || props.hmargin || 0};
  margin-right: ${props => props.rmargin || props.hmargin || 0};
  border-radius: ${props => props.borderR || 0};
  border-bottom-left-radius: ${props => props.blRadius || props.borderR || 0};
  border-bottom-right-radius: ${props => props.brRadius || props.borderR || 0};
  border-left-width: ${props => (props.ribbon ? 7 : 0)};
  border-left-color: ${props => (props.ribbon ? colors.primary : '#00000000')};
  box-shadow: ${props =>
    props.shadow ? '0 3px 6px rgba(0,0,0,0.26)' : '0 0px 0px rgba(0,0,0,0.26)'};
  elevation: ${props => (props.shadow ? 5 : 0)};
`;

export const ContentButton = styled.TouchableOpacity`
  flex: ${props => props.flex || 1};
  background-color: ${props => props.bg || '#00000000'};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || 'auto'};
  flex-direction: ${props => (props.horizontal ? 'row' : 'column')};
  padding-top: ${props => props.tpadding || props.vpadding || 0};
  padding-bottom: ${props => props.bpadding || props.vpadding || 0};
  padding-left: ${props => props.lpadding || props.hpadding || 0};
  padding-right: ${props => props.rpadding || props.hpadding || 0};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.lmargin || props.hmargin || 0};
  margin-right: ${props => props.rmargin || props.hmargin || 0};
  border-radius: ${props => props.borderR || 0};
  border-left-width: ${props => (props.ribbon ? 7 : 0)};
  border-left-color: ${props => (props.ribbon ? colors.primary : '#00000000')};
  box-shadow: ${props =>
    props.shadow ? '0 3px 6px rgba(0,0,0,0.26)' : '0 0px 0px rgba(0,0,0,0.26)'};
  elevation: ${props => (props.shadow ? 5 : 0)};
`;

export const SText = styled.Text`
  text-align: ${props => props.align || 'left'};
  font-size: ${props => props.size || '17px'};
  font-weight: ${props => props.weight || '400'};
  color: ${props => props.color || '#000000'};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.lmargin || props.hmargin || 0};
  margin-right: ${props => props.rmargin || props.hmargin || 0};
  width: ${props => props.width || 'auto'};
`;

export const StyledButton = styled.TouchableOpacity`
  border-radius: ${props => (props.borderR || props.curved ? 10 : 0)};
  width: ${props => (props.width ? props.width : '80%')};
  height: ${props => props.height || 65};
  background-color: ${props => (props.bg ? props.bg : 'transparent')};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.hmargin || 0};
  margin-right: ${props => props.hmargin || 0};
  elevation: ${props => (props.shadow ? 5 : 0)};
`;

export const BlockView = styled.View`
  background-color: ${props => (props.bg ? props.bg : 'transparent')};
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : 'auto')};
  flex: ${props => (props.flex ? props.flex : 1)};
  align-items: ${props => (props.align ? props.align : 'flex-start')};
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  flex-direction: ${props => (props.flexD ? props.flexD : 'column')};
  padding-top: ${props => (props.vpadding ? props.vpadding : 0)};
  padding-bottom: ${props => (props.vpadding ? props.vpadding : 0)};
  padding-left: ${props => (props.hpadding ? props.hpadding : 0)};
  padding-right: ${props => (props.hpadding ? props.hpadding : 0)};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.hmargin || 0};
  margin-right: ${props => props.hmargin || 0};
`;

export const StyledText = styled.Text`
  font-size: ${props => (props.size ? props.size : '25px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 'bold')};
  color: ${props => (props.color ? props.color : '#ffffff')};
  width: ${props => (props.width ? props.width : 'auto')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.hmargin || 0};
  margin-right: ${props => props.hmargin || 0};
`;

export const LogoImg = styled.Image`
  background-color: ${props => (props.bg ? props.bg : 'transparent')};
  height: ${props => (props.height ? props.height : 50)};
  width: ${props => (props.width ? props.width : 'auto')};
  /* padding-top: 20; */
  margin-bottom: ${props => (props.bmargin ? props.bmargin : 0)};
`;

export const SNInput = styled(Input)`
  width: ${props => props.width || '100%'};
  margin-top: ${props => props.tmargin || props.vmargin || 0};
  margin-bottom: ${props => props.bmargin || props.vmargin || 0};
  margin-left: ${props => props.lmargin || props.hmargin || 0};
  margin-right: ${props => props.rmargin || props.hmargin || 0};
  border-radius: ${props => props.borderR || 0};
`;

export const GradientView = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  padding-top: ${props => (props.vpadding ? props.vpadding : 10)};
  padding-bottom: ${props => (props.vpadding ? props.vpadding : 10)};
  padding-left: ${props => (props.hpadding ? props.hpadding : 10)};
  padding-right: ${props => (props.hpadding ? props.hpadding : 10)};
  margin-top: ${props => (props.vmargin ? props.vmargin : 0)};
  margin-bottom: ${props => (props.vmargin ? props.vmargin : 0)};
  margin-left: ${props => (props.hmargin ? props.hmargin : 0)};
  margin-right: ${props => (props.rmargin ? props.rmargin : 0)};
`;
