import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import InputText from './InputText';
import { IMAGES } from 'themes-v3';
import { moderateScale } from 'Lib';
import { func, string } from 'prop-types';

class InputWithClearButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { textTemp: '' };
  }

  onClear = () => {
    this.setState({ textTemp: '' });
  };

  onChange = (text, name) => {
    const { onChangeText } = this.props;
    if (onChangeText) onChangeText(text, name);
    this.setState({ textTemp: text });
  };

  render() {
    const { name } = this.props;
    const { textTemp } = this.state;
    return (
      <View style={styles.container}>
        <InputText
          {...this.props}
          onChangeText={(text) => this.onChange(text, name)}
          value={textTemp}
        />
        <TouchableOpacity onPress={this.onClear} style={styles.iconWrapper}>
          <Image source={IMAGES.CLEAR} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    top: '40%',
  },
});

InputWithClearButton.propTypes = {
  name: string.isRequired,
  onChangeText: func.isRequired,
};

export default InputWithClearButton;
