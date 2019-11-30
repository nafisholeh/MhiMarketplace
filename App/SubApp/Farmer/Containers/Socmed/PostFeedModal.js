import React, { Component, Fragment } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import Modal from "react-native-modal";
import { Mutation } from 'react-apollo';
import moment from 'moment';
import { ReactNativeFile } from 'apollo-upload-client';

import { ViewShadow, ButtonPrimary, ImagePicker } from 'Components';
import { Avatar } from 'CommonFarmer';
import { NewsFeedDivider } from './Components';
import {
  moderateScale,
  screenWidth,
  screenHeight,
  getUTCDate,
  combineFilenameMime,
} from 'Lib';
import { Colors, Fonts, Images } from 'Themes';
import { POST_AS_FARMER, cachePostSubmit } from 'GraphQL/Farmer/Mutation';
import { getUserId } from 'Redux/SessionRedux';

class PostFeedModal extends Component {
  state = {
    postContent: '',
    isNeedToPost: false,
    photos: null,
    photosDeleted: [],
    photoSelectedIndex: null,
  };
  
  onChangeContent = text => {
    this.setState({ postContent: text });
  };
  
  onPostContent = mutate => {
    const { postContent, photos } = this.state;
    const { userId } = this.props;
    let variables = {
      data: {
        content: postContent,
        author: userId,
        date_posted: getUTCDate(),
      }
    };
    if (Array.isArray(photos) && photos.length) {
      const images = photos.map((item, index) => {
        const { path, mime } = item || {};
        return new ReactNativeFile({
            uri: path,
            name: combineFilenameMime(
              `${moment().format('YYYYMMDDHHmmss')}_${index}_${userId}`,
              mime
            ),
            type: mime
          });
        }
      );
      variables = Object.assign({}, variables, { images });
    }
    mutate({
      variables,
      context: { hasUpload: true },
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
  
  selectPhoto = index => {
    const { photos, photosDeleted = [], photoSelectedIndex } = this.state;
    if (photoSelectedIndex === index) {
      this.setState({
        photos: [
          ...photos.slice(0, index),
          ...photos.slice(index + 1, photos.length),
        ],
        photosDeleted: Array.isArray(photosDeleted)
          ? photosDeleted.push(index)
          : [index],
        photoSelectedIndex: null,
      });
    } else {
      this.setState({ photoSelectedIndex: index });
    }
  };
  
  onPhotoChange = (name, raw = [], paths = []) => {
    const { [name]: currentPhotos, photosDeleted = [] } = this.state;
    const imageData =
      raw
      .map((item, i) => {
        const [{ mime, path, data }] = raw[i];
        return { mime, path };
      })
      .filter(({ path }) => 
        Array.isArray(photosDeleted)
          ? photosDeleted.findIndex(({ path: curPath }) => curPath === path ) < 0
          : true
      );
    this.setState({ [name]: imageData });
  };

  render() {
    const { postContent, isNeedToPost, photos, photoSelectedIndex } = this.state;
    const isShowPhotos = Array.isArray(photos) && photos.length;
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
              height={screenHeight * 0.5}
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
              update={(cache, data) => cachePostSubmit(cache, data)}
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
                        flex: isShowPhotos ? 1 : 2,
                        marginRight: moderateScale(5),
                        borderRadius: moderateScale(10),
                        padding: moderateScale(10),
                        ...Fonts.TITLE_NORMAL
                      }}
                      multiline={true}
                      textAlignVertical="top"
                    />
                    {isShowPhotos
                      ? (
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          style={{
                            flex: 1,
                          }}
                          contentContainerStyle={{
                            flexGrow: 1,
                          }}
                        >
                          <TouchableWithoutFeedback
                            style={{
                              flex: 1,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              {photos.map((item, index) => {
                                const { path } = item || {};
                                const isSelected = photoSelectedIndex === index;
                                return (
                                  <TouchableOpacity
                                    onPress={() => this.selectPhoto(index)}
                                    style={{
                                      marginRight: moderateScale(7),
                                      borderRadius: moderateScale(10),
                                      backgroundColor: 
                                        isSelected
                                          ? 'rgba(255,255,255,0.8)'
                                          : 'rgba(0,0,0,0)'
                                    }}
                                  >
                                    <Image
                                      key={index}
                                      source={{ uri: path }}
                                      style={{
                                        width: moderateScale(100),
                                        height: moderateScale(70),
                                        borderRadius: moderateScale(10),
                                      }}
                                    />
                                    {isSelected
                                      ? (
                                        <Image
                                          source={Images.delete_flat}
                                          style={{
                                            position: 'absolute',
                                            top: '25%',
                                            left: '35%',
                                            width: moderateScale(30),
                                            height: moderateScale(30),
                                            tintColor: Colors.red,
                                          }}
                                        />
                                      )
                                      : null
                                    }
                                  </TouchableOpacity>
                                );
                              })}
                            </View>
                          </TouchableWithoutFeedback>
                        </ScrollView>
                      )
                      : null
                    }
                    <View
                      style={{
                        flex: 0.5,
                        flexDirection: 'row',
                      }}
                    >
                      <ImagePicker
                        name="photos"
                        onChange={this.onPhotoChange}
                        data={photos}
                        titleBottomSheet='Ambil foto'
                        isMultiplePick={true}
                        isShowCancelButton={false}
                        isShowGallery
                        styleContainer={{
                          marginRight: moderateScale(10),
                        }}
                        isCustomComponent
                        customComponent={
                          (props) => (
                            <TouchableOpacity
                              onPress={() => props.onStartPick()}
                              style={{
                                width: moderateScale(50),
                                height: moderateScale(50),
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: moderateScale(12),
                                backgroundColor: Colors.disabled_light,
                              }}
                            >
                              <Image
                                source={Images.camera}  
                                style={{
                                  width: moderateScale(25),
                                  height: moderateScale(25),
                                  tintColor: Colors.white,
                                }}
                              />
                            </TouchableOpacity>
                          )
                        }
                      />
                      <ButtonPrimary
                        onPress={() => this.onPostContent(mutate)}
                        title="Posting"
                        loading={loading}
                        style={{
                          flex: 1,
                          borderRadius: moderateScale(12),
                        }}
                      />
                    </View>
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
