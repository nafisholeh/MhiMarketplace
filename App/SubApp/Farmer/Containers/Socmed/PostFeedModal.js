import React, { Component, Fragment } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Modal from "react-native-modal";
import { Mutation } from 'react-apollo';
import moment from 'moment';

import { ViewShadow, ButtonPrimary } from 'Components';
import { Avatar } from 'CommonFarmer';
import { NewsFeedDivider } from './Components';
import { moderateScale, screenWidth, screenHeight } from 'Lib';
import { Colors, Fonts, Images } from 'Themes';
import { POST_AS_FARMER } from 'GraphQL/Farmer/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class PostFeedModal extends Component {
  state = {
    postContent: '',
    isNeedToPost: false,
  };
  
  onChangeContent = text => {
    this.setState({ postContent: text });
  };
  
  onPostContent = mutate => {
    const { postContent } = this.state;
    const { userId } = this.props;
    mutate({
      variables: {
        data: {
          content: postContent,
          author: "5d8fc089043c4772aa81fa65",
          date_posted: moment.utc(new Date()).local().format("YYYY-MM-DD HH:mm:ss")
        }
      }
    });
    this.setState({ isNeedToPost: false, postContent: '' });
  };
  
  onPostSuccess = data => {
    
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
          <Avatar style={{ marginRight: moderateScale(10) }} />
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
            <Mutation
              mutation={POST_AS_FARMER}
              onCompleted={this.onPostSuccess}
              onError={error => {
                console.tron.log('postAsFarmer/onError', error)
              }}
              ignoreResults={false}
              errorPolicy='all'>
              { (mutate, {loading, error, data}) => {
                return (
                  <Fragment>
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
                      onPress={() => this.onPostContent(mutate)}
                      title="Posting"
                      loading={loading}
                      style={{
                        position: 'absolute', bottom: moderateScale(25),
                        left: moderateScale(15), right: moderateScale(15),
                        borderRadius: moderateScale(12),
                      }}
                    />
                  </Fragment>
                );
              }}
            </Mutation>
            </ViewShadow>
          </View>
        </Modal>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFeedModal);
