import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Pdf from 'react-native-pdf';

import { getSelectedListId } from 'Redux/ListRedux';
import { Images, Colors } from 'Themes';
import { moderateScale, screenWidth } from 'Lib';
import { ButtonCircle } from 'Components';

class SopViewer extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
  onExitPage = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { listId: url } = this.props;
    return (
      <View
        style={{
          flex:1,
        }}
      >
        <Pdf
          source={{ uri: url }}
          onLoadComplete={(numberOfPages,filePath)=>{
              console.tron.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page,numberOfPages)=>{
              console.tron.log(`current page: ${page}`);
          }}
          onError={(error)=>{
              console.tron.log(error);
          }}
          enablePaging
          onPageSingleTap={page => {
            console.tron.log(error);
          }}
          style={{
            flex:1,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(20),
            alignItems: 'center',
            width: screenWidth,
          }}
        >
          <ButtonCircle 
            onPress={this.onExitPage}
            icon={Images.cross}
            colors={[ Colors.disabled_light, Colors.disabled_dark ]}
          />
        </View>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SopViewer);
