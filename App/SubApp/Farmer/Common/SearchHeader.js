import React, { Component } from "react";
import { View, TouchableOpacity, Image, TextInput } from "react-native";
import { func, string, bool, oneOfType, number } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ApolloClientProvider from "Services/ApolloClientProvider";
import { ViewShadow } from "Components";
import { Images, METRICS, Colors } from "Themes";
import { moderateScale, screenWidth } from "Lib";
import { getUserId } from "Redux/SessionRedux";
import ProductActions, { getTermFilter } from "Redux/ProductRedux";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  componentDidMount() {
    this.initValue();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.termFilter !== this.props.termFilter) {
      this.initValue();
    }
  }

  initValue = () => {
    const { termFilter, onSearch, isResetUponSearch } = this.props;
    if (termFilter && !isResetUponSearch) {
      this.setState({ value: termFilter });
      onSearch(termFilter);
    }
  };

  onChangeText = (value) => {
    const { onSearch } = this.props;
    this.setState({ value }, () => {
      if (value === "" || !value) {
        onSearch(value);
      }
    });
  };

  onSearch = () => {
    const { value } = this.state;
    const { onSearch, isResetUponSearch } = this.props;
    if (isResetUponSearch) {
      this.setState({ value: "" }, () => {
        onSearch(value);
      });
      return;
    }
    onSearch(value);
  };

  render() {
    const { icon, userId, termFilter, style } = this.props;
    const { value } = this.state;
    return (
      <ViewShadow
        width={!userId ? screenWidth - 40 : 275}
        height={50}
        borderRadius={4}
        shadowBorderRadiusAndroid={3}
        shadowRadiusAndroid={18}
        posYAndroid={0.82}
        shadowHorizontalMarginAndroid={0}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={style}
        styleChildren={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: moderateScale(10),
        }}
      >
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Cari SOP..."
          selectTextOnFocus
          returnKeyType="search"
          clearTextOnFocus
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSearch}
          value={value}
          style={{
            flex: 1,
            marginRight: moderateScale(5),
          }}
        />
        <TouchableOpacity onPress={this.onSearch}>
          <Image
            source={Images.search}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              tintColor: Colors.ICON,
            }}
          />
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

SearchHeader.propTypes = {
  icon: oneOfType([string, number]),
  onIconPress: func,
  onSearch: func,
  userId: string,
  filterByTerm: func,
  termFilter: string,
  isResetUponSearch: bool,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  termFilter: getTermFilter(),
});

const mapDispatchToProps = (dispatch) => ({
  filterByTerm: (term) => dispatch(ProductActions.filterByTerm(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);
