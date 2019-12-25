import React, { Component, Fragment } from 'react';
import { ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as Progress from 'react-native-progress';
import { DotIndicator } from 'react-native-indicators';
import { withNavigation } from 'react-navigation';
import { Mutation } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';
import moment from 'moment';

import { SIGNUP_FARMER } from 'GraphQL/Farmer/Mutation';
import { getFarmerSignupData, getFarmerSignupImages, getAreas } from 'Redux/FarmerSignupRedux';
import { getUserId } from 'Redux/SessionRedux';
import { Images, Colors, Fonts } from 'Themes';
import {
  moderateScale,
  screenWidth,
  screenHeight,
  saveBase64AsImage,
  combineFilenameMime,
} from 'Lib';

class FinalConfirm extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }
  
  submit = async mutate => {
    const { signupData, signupImages } = this.props;
    let variables = {};
    let images = [];
    for (const key in signupImages) {
      let value = signupImages[key];
      if (signupImages.hasOwnProperty(key)) {
        const { mime, data } = value || {};
        const imagePath = await saveBase64AsImage(data, key, mime);
        const imageName = `${moment().format('YYYYMMDDHHmmss')}_${key}`;
        images.push(
          new ReactNativeFile({
            uri: 'file:///'+imagePath,
            name: combineFilenameMime(imageName, mime),
            type: mime
          })
        )
      }
    }
    variables = Object.assign({}, {data: signupData} , {images});
    mutate({
      variables,
      context: {
        hasUpload: true,
      }
    });
  };
  
  onUploadCompleted = () => {
    this.openFarmerSubApp();
  };
  
  openFarmerSubApp = () => {
    const { navigation } = this.props;
    navigation.navigate('SopFarmer');
  };
  
  onUploadError = (error) => {
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: '10%',
            marginHorizontal: moderateScale(30),
            textAlign: 'center',
            lineHeight: 30,
            ...Fonts.TITLE_HEADER__BOLD,
            color: Colors.veggie_dark,
          }}
        >
          Tekan logo untuk bergabung dengan keluarga besar MHI...
        </Text>
        <Mutation
          mutation={SIGNUP_FARMER}
          onCompleted={this.onUploadCompleted}
          onError={this.onUploadError}
          awaitRefetchQueries={true}
          ignoreResults={false}
          errorPolicy='all'>
          { (mutate, {loading, error, data}) => {
            return (
              <Fragment>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: '25%',
                    width: moderateScale(screenWidth * 0.8),
                    height: moderateScale(screenHeight * 0.5),
                    borderRadius: moderateScale(screenWidth * 0.4),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={async () => this.submit(mutate)}
                >
                  <Image
                    source={Images.mhi}
                    style={{
                      width: moderateScale(screenWidth * 0.7),
                      height: moderateScale(screenHeight * 0.4),
                    }}
                  />
                  <Progress.Circle
                    size={moderateScale(screenWidth * 0.8)}
                    thickness={7}
                    showsText={false}
                    progress={0.6}
                    strokeCap='square'
                    color={Colors.veggie_dark}
                    textStyle={Fonts.TITLE_HEADER__NORMAL}
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
                <DotIndicator
                  count={4}
                  size={7}
                  color={Colors.veggie_dark}
                  animationDuration={800}
                  style={{
                    position: 'absolute',
                    bottom: '8%',
                  }}
                />
              </Fragment>
            );
          }}
        </Mutation>
      </ScrollView>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  areas: getAreas(),
  signupData: getFarmerSignupData(),
  signupImages: getFarmerSignupImages(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(FinalConfirm));
