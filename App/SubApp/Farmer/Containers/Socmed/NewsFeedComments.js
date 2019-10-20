import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { CommentItem } from './Components';

class NewsFeedComments extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <CommentItem
          content="ini komentar"
          name="Edi anto"
          commentedDate="2019-08-20 00:00:00"
        />
        <CommentItem
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
          name="Anji"
          commentedDate="2019-10-20 00:00:00"
        />
      </ScrollView>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedComments);
