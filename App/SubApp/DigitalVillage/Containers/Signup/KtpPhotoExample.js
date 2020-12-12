import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { withNoHeader } from 'Hoc';
import { NavHeader } from 'common-v3';
import HeaderGradient from './Components/HeaderGradient';

class KtpPhotoExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <HeaderGradient />
        <NavHeader title="Contoh foto KTP" info="2/7" mode="invert" />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default withNoHeader(KtpPhotoExample);
