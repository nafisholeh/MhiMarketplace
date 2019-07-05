import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import moment from 'moment';
import { DotIndicator } from 'react-native-indicators';

import { ViewShadow } from 'Components';
import AppConfig from 'Config/AppConfig';
import { Colors, Images } from 'Themes';
import { getIntervalDateToday, moderateScale, screenWidth } from 'Lib';

class DayTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  
  componentDidMount() {
    this.parseTimeline();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.parseTimeline();
    }
  }
  
  parseTimeline = () => {
    const { data: timestamp } = this.props;
    if (!timestamp) return;

    let timeline = [];
    let currentDay = null;
    Object.keys(timestamp).forEach(key => {
      if (
        key === '__typename' ||
        !timestamp[key]
      ) {
        return;
      }
      const date = moment(timestamp[key]).format('YYYY-MM-DD hh:mm:ss');
      if (!currentDay || !moment(currentDay).isSame(date, 'day')) {
        timeline.push({
          title: getIntervalDateToday(date, 'dddd, DD MMMM'),
          lineColor: Colors.text,
          circleSize: 20,
          circleColor: Colors.text,
        });
        currentDay = date;
      }
      timeline.push({
        description: AppConfig.timelineTitle[key],
        title: `${moment(date).format('HH:mm')}`,
        lineColor: Colors.red2,
      });
    });
    this.setState({ data: timeline });
  };
  
  renderDetail = (rowData, sectionID, rowID) => {
    const { title, description, icon } = rowData;
    if (!description) {
      return (
        <View style={{ marginLeft: moderateScale(5), marginTop: -10}}>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 16,
              color: Colors.text,
            }}
          >
            {title}
          </Text>
        </View>
      )
    }
    return (
      <ViewShadow
        width={screenWidth - 120}
        height={50}
        borderRadius={10}
        shadowBorderRadiusAndroid={10}
        shadowRadiusAndroid={7}
        shadowOpacityAndroid={0.09}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{
          alignSelf: 'flex-start',
          marginLeft: moderateScale(5),
          marginTop: -5,
        }}
        styleChildren={{
          padding: moderateScale(5),
        }}
      >
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            fontSize: 14,
            color: Colors.text_light,
            marginBottom: 3,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            fontSize: 14,
            color: Colors.text,
          }}
        >
          {description}
        </Text>
      </ViewShadow>
    );
  };

  render() {
    const { data } = this.state;
    if (Array.isArray(data) && data.length) {
      return (
        <Timeline
          data={data}
          innerCircle={'dot'}
          circleSize={20}
          circleColor={Colors.red2}
          showTime={false}
          style={{ paddingLeft: moderateScale(10) }}
          renderDetail={this.renderDetail}
        />
      );
    }
    return (
      <View style={{ }}>
        <DotIndicator
          count={4}
          size={7}
          color='white'
          animationDuration={800}
        />
      </View>
    );
  }
}

export default DayTimeline;
