import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Modal from "react-native-modal";

import { ViewShadow, ButtonPrimary } from 'Components';
import { NewsFeedDivider } from 'CommonFarmer';
import { moderateScale, screenWidth, screenHeight } from 'Lib';
import { Colors, Fonts, Images } from 'Themes';

class PostFeedModal extends Component {
  state = {
    postContent: '',
    isNeedToPost: false,
  };
  
  onChangeContent = text => {
    this.setState({ postContent: text });
  };
  
  onPostContent = () => {
    const { postContent } = this.state;
    this.setState({ isNeedToPost: false, postContent: '' });
  };
  
  onShowPostModal = () => {
    this.setState({ isNeedToPost: true });
  };
  
  onHidePostModal = () => {
    this.setState({ isNeedToPost: false });
  };

  render() {
    const { postContent, isNeedToPost } = this.state;
    return (
      <View>
        <Text
          style={{
            marginLeft: moderateScale(15),
            marginTop: moderateScale(15),
            marginBottom: moderateScale(12),
            ...Fonts.PAGE_TITLE
          }}
        >
          Komoditasmu
        </Text>
        <TouchableOpacity
          onPress={this.onShowPostModal}
          style={{
            flexDirection: 'row',
            marginHorizontal: moderateScale(15),
            marginBottom: moderateScale(15),
          }}
        >
          <Image
            source={Images.empty_profile}
            style={{
              width: moderateScale(50),
              height: moderateScale(50),
              borderRadius: moderateScale(25),
              marginRight: moderateScale(10)
            }}
          />
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Apa yang anda pikirkan..."
            selectTextOnFocus
            clearTextOnFocus
            value=""
            editable={false}
            selectTextOnFocus={false}
            style={{
              flex: 1,
              ...Fonts.TITLE_NORMAL,
            }}
          />
        </TouchableOpacity>
        <NewsFeedDivider />
        <Modal
          isVisible={isNeedToPost}
          swipeThreshold={40}
          onSwipeComplete={this.onHidePostModal}
          swipeDirection="down"
          onBackdropPress={this.onHidePostModal}
          onBackButtonPress={this.onHidePostModal}
          avoidKeyboard
          backdropColor={Colors.disabled_dark}
          backdropOpacity={0.4}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View
            style={{
              position: 'absolute',
              bottom: -10,
              left: 0, right: 0,
            }}
          >
            <ViewShadow
              width={moderateScale(70)}
              height={4}
              borderRadius={10}
              shadowBorderRadiusAndroid={10}
              shadowRadiusAndroid={10}
              shadowOpacityAndroid={0.09}
              mainColor={Colors.white}
              shadowColor={Colors.brown_light}
              style={{
                marginBottom: moderateScale(10),
              }}
            />
            <ViewShadow
              width={screenWidth}
              height={screenHeight * 0.4}
              borderRadius={13}
              shadowBorderRadiusAndroid={40}
              shadowRadiusAndroid={20}
              shadowOpacityAndroid={0.09}
              mainColor={Colors.white}
              shadowColor={Colors.brown_light}
              styleChildren={{
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(25),
              }}
            >
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Apa yang anda pikirkan..."
                onChangeText={this.onChangeContent}
                onSubmitEditing={this.onPostContent}
                value={postContent}
                style={{
                  flex: 1,
                  marginBottom: moderateScale(70),
                  marginRight: moderateScale(5),
                  borderRadius: moderateScale(10),
                  padding: moderateScale(10),
                  backgroundColor: Colors.white,
                  ...Fonts.TITLE_NORMAL
                }}
                multiline={true}
                textAlignVertical="top"
              />
              <ButtonPrimary
                onPress={this.onPostContent}
                title="Posting"
                style={{
                  position: 'absolute', bottom: moderateScale(25),
                  left: moderateScale(15), right: moderateScale(15),
                  borderRadius: moderateScale(12),
                }}
              />
            </ViewShadow>
          </View>
        </Modal>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFeedModal);
