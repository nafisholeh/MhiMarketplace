import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { string } from 'prop-types';

import { Colors } from 'Themes';
import { moderateScale } from 'Lib';
import { Avatar } from 'CommonFarmer';

class CommentInput extends Component {
  state = {
    comment: '',
  };
  
  onChangeComment = text => {
    this.setState({ comment: text });
  };
  
  onSubmitComment = () => {
    const { onSubmitComment } = this.props;
    const { comment } = this.state;
    if (onSubmitComment) {
      onSubmitComment(comment);
    }
  };

  render() {
    const { comment } = this.state;
    const { photo, style } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: moderateScale(10),
          marginRight: moderateScale(5),
          marginBottom: moderateScale(10),
          ...style
        }}
      >
        <Avatar
          size="small"
          source={photo}
          style={{ marginRight: moderateScale(10) }}
        />
        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Balas postingan..."
          onChangeText={this.onChangeComment}
          onSubmitEditing={this.onSubmitComment}
          value={comment}
          multiline={true}
          style={{
            flex: 1,
            marginRight: moderateScale(5),
            borderWidth: 0.7,
            borderRadius: moderateScale(10),
            borderColor: Colors.border,
          }}
        />
      </View>
    )
  };
}

export default CommentInput;
