import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Item} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Content, SText} from './styledComponents';

const {height, width} = Dimensions.get('window');

const ImageSelector = ({name, onSelect}) => {
  const [imgText, setImgText] = useState('');
  const [imgName, setImgName] = useState(null);
  const openPicker = () => {
    const options = {
      title: 'Select Image',
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {data, fileName} = response;
        setImgText(`data:image/jpeg;base64,${data}`);
        setImgName(fileName);
        onSelect(data);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };
  return (
    <Item>
      <Content align="flex-start" tmargin={15}>
        <TouchableOpacity onPress={() => openPicker(true)}>
          <SText
            color="#ffffff"
            sixe="14px"
            width={width * 0.9}
            numberOfLines={1}>
            {imgName || name}
          </SText>
        </TouchableOpacity>
      </Content>
    </Item>
  );
};

export default ImageSelector;
