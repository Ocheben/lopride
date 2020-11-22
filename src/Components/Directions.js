import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  Linking,
  Platform,
  Alert,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import {Item, Label, Input} from 'native-base';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Content, SText, StyledButton, colors} from './styledComponents';
import {LocationIcon, PhoneIcon} from './icons';

const {height, width} = Dimensions.get('window');

const GOOGLE_MAPS_APIKEY = 'AIzaSyBTayi6P01nXEy3AWsf7GoaL7pSpvjSv0E';

const Directions = ({location, address, landmark, phone}) => {
  const [mapReady, setMapReady] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [mlocation, setLocation] = useState({});
  const [region, setRegion] = useState({
    latitude: 9.0765,
    longitude: 7.3986,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userLoc, setUserLoc] = useState({
    latitude: 9.0765,
    longitude: 7.3986,
  });

  useEffect(() => {
    setMapReady(true);
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    } else {
      requestLocationPermission();
    }
    getUserLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App ACCESS_FINE_LOCATION Permission',
          message:
            'Cool Photo App needs access to your ACCESS_FINE_LOCATION ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        let initRegion = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        };
        setUserLoc(initRegion);
        setRegion(prev => ({...prev, ...initRegion}));
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const makeCall = () => {
    let phoneNumber = '';
    const androidPrefix = 'tel:${';
    const iosPrefix = 'telprompt:${';

    if (Platform.OS === 'android') {
      phoneNumber = androidPrefix + phone + '}';
    } else {
      phoneNumber = iosPrefix + phone + '}';
    }

    Linking.openURL(phoneNumber);
  };

  // const onSelectLocation = () => {
  //   selectLocation(id, location, landmark, phone);
  //   setMapOpen(false);
  // };
  return (
    <>
      <StyledButton width="auto" height="auto" onPress={() => setMapOpen(true)}>
        <LocationIcon color={colors.primary} size="30px" />
      </StyledButton>
      <Modal
        animationType="slide"
        transparent={false}
        visible={mapOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={{flexGrow: 1, width: width}}>
          <MapView
            style={{height: height * 0.6, width}}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={region}
            region={region}
            loadingEnabled>
            {mapReady && (
              <>
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
                <MapViewDirections
                  origin={userLoc}
                  destination={location}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="#1e88e5"
                  optimizeWaypoints={true}
                />
              </>
            )}
          </MapView>
          <Content align="center" width="100%">
            {/* <View style={{width: '95%', marginTop: 20}}>
              <Item>
                <Content align="flex-start" bmargin={5}>
                  <TouchableOpacity onPress={() => setSearch()}>
                    <SText
                      color="#555555"
                      sixe="14px"
                      width={width * 0.9}
                      numberOfLines={1}>
                      {location.address || 'Address'}
                    </SText>
                  </TouchableOpacity>
                </Content>
              </Item>
            </View> */}
            <Content horizontal width="90%">
              <LocationIcon size="20px" color={colors.primary} />
              <SText
                size="17px"
                lmargin={5}
                color={colors.light}
                numberOfLines={1}>
                {address}
              </SText>
            </Content>
            <Content horizontal width="95%" justify="flex-start">
              <LocationIcon size="20px" color={colors.primary} />
              <SText
                width="100%"
                size="17px"
                lmargin={5}
                color={colors.light}
                numberOfLines={1}>
                {landmark}
              </SText>
            </Content>
            <Content horizontal width="95%" justify="flex-start">
              <PhoneIcon size="20px" color={colors.primary} />
              <SText
                size="17px"
                lmargin={5}
                color={colors.light}
                numberOfLines={1}>
                {phone}
              </SText>
            </Content>
            <Content
              horizontal
              width="85%"
              align="center"
              justify="space-around">
              <StyledButton
                bg={colors.dark}
                curved
                width="40%"
                height={45}
                onPress={() => setMapOpen(false)}>
                <SText size="16px" weight="700" color="#ffffff">
                  Close
                </SText>
              </StyledButton>
              <StyledButton
                bg={colors.primary}
                curved
                width="40%"
                height={45}
                onPress={() => makeCall()}>
                <SText size="16px" weight="700" color="#ffffff">
                  Call
                </SText>
              </StyledButton>
            </Content>
          </Content>
        </KeyboardAwareScrollView>
      </Modal>
    </>
  );
};

export default Directions;
