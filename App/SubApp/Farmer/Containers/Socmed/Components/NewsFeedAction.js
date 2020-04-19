import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Mutation } from "react-apollo";
import { PulseIndicator } from "react-native-indicators";
import * as Animatable from "react-native-animatable";

import { FONTS, Colors, Images } from "Themes";
import { moderateScale } from "Lib";
import { LIKE, cacheLike, cacheDislike } from "GraphQL/Farmer/Mutation";

class NewsFeedAction extends PureComponent {
  state = {
    isLiked: false,
  };

  componentDidMount() {
    this.handleLikeStatus();
  }

  componentDidUpdate(prevProps) {
    const { likes } = this.props;
    if (prevProps.likes !== likes) {
      this.handleLikeStatus();
    }
  }

  handleLikeStatus = () => {
    const { loggedInUserId, likes = [] } = this.props;
    if (Array.isArray(likes)) {
      this.setState({
        isLiked: likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0,
      });
    }
  };

  renderButton = (title, icon, onPress, noTintColor, isLoading) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: moderateScale(5),
        marginBottom: moderateScale(10),
      }}
    >
      {isLoading ? (
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          duration={500}
          useNativeDriver
          // transition="scale"
        >
          <Image
            source={Images[icon]}
            style={Object.assign(
              {},
              {
                width: moderateScale(20),
                height: moderateScale(20),
                marginRight: moderateScale(5),
              },
              noTintColor ? {} : { tintColor: Colors.ICON }
            )}
          />
        </Animatable.View>
      ) : (
        <Image
          source={Images[icon]}
          style={Object.assign(
            {},
            {
              width: moderateScale(20),
              height: moderateScale(20),
              marginRight: moderateScale(5),
            },
            noTintColor ? {} : { tintColor: Colors.ICON }
          )}
        />
      )}
      <Text
        style={{
          ...FONTS.BODY_NORMAL,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { feedId, loggedInUserId, onComment, showActionBorder } = this.props;
    const { isLiked } = this.state;
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: showActionBorder ? 1 : 0,
          borderBottomColor: Colors.border,
        }}
      >
        <Mutation
          mutation={LIKE}
          update={(cache, data) => {
            if (isLiked) cacheDislike(cache, feedId, loggedInUserId);
            else cacheLike(cache, feedId, loggedInUserId);
          }}
        >
          {(mutate, { loading, error, data }) => {
            const onLikeMutate = () =>
              mutate({
                variables: {
                  elementId: feedId,
                  userId: loggedInUserId,
                  type: "POST",
                  action: isLiked ? "dislike" : "like",
                },
                optimisticResponse: {
                  like: {
                    _id: Math.random() * 1000 * -1,
                    likesPost: [],
                    likesComment: [],
                    likesCommentReply: [],
                    __typename: "like",
                  },
                },
              });
            return this.renderButton(
              "suka",
              isLiked ? "liked" : "like",
              onLikeMutate,
              isLiked,
              loading
            );
          }}
        </Mutation>
        {this.renderButton("balas", "comment", onComment)}
      </View>
    );
  }
}

export default NewsFeedAction;
