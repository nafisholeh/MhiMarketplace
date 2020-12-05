import React, { Component } from 'react';
import { View } from 'react-native';
import RNShake from 'react-native-shake';
import Modal from 'react-native-modal';

import { Colors, METRICS } from 'Themes';
import { ButtonTertier, InputText } from 'Components';

export default class AppConfigSettings extends Component {
  state = {
    visible: true,
    url: '',
  };

  componentWillMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.setState({ visible: true });
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent');
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  dismissModal = () => {
    this.setState({ visible: false });
  };

  updateServer = () => {};

  onChangeText = (value, stateName) => {
    this.setState({ [stateName]: value });
  };

  render() {
    const { visible, url } = this.state;
    return (
      <View>
        <Modal
          isVisible={visible}
          swipeThreshold={40}
          swipeDirection="down"
          onSwipeComplete={this.dismissModal}
          onBackdropPress={this.dismissModal}
          onBackButtonPress={this.dismissModal}
          onModalShow={this.showModal}
          backdropColor={Colors.disabled_dark}
          backdropOpacity={0.4}
        >
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              paddingHorizontal: METRICS.EXTRA_LARGE_V2,
              backgroundColor: Colors.WHITE,
            }}
          >
            <InputText
              name="url"
              title="alamat server baru"
              value={url}
              onChangeText={this.onChangeText}
            ></InputText>
            <ButtonTertier
              isAccentButton
              onPress={this.updateServer}
              title="Ganti Server"
            ></ButtonTertier>
          </View>
        </Modal>
      </View>
    );
  }
}
