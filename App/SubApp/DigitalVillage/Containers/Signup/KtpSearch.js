import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { withNoHeader } from 'Hoc';
import { NavHeader } from 'common-v3';

class KtpSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <NavHeader title="Pendaftaran" info="1/7" />
      </View>
    );
  }
}

export default withNoHeader(KtpSearch);
