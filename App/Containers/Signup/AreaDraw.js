import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  Marker,
} from 'react-native-maps';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';
import { HeaderWhite, AreaDrawInfoWrapper } from './Common';
import { getSelectedListId } from 'Redux/ListRedux';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -8.209091;
const LONGITUDE = 113.696251;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class AreaDraw extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      header: null,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      polygons: [],
      editing: null,
      creatingHole: false,
      pivotMarkerLoc: {
        latitude: -8.209091,
        longitude: 113.696251,
      },
    };
  }

  finish() {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes,
          },
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  }
  
  onRegionChange = region => {
    const { latitude, longitude } = region || {};
    this.setState({ pivotMarkerLoc: { latitude, longitude } });
  };

  render() {
    const {
      region,
      pivotMarkerLoc: {
        latitude: pivotLat,
        longitude: pivotLng,
      } = {}
    } = this.state;
    const { listId: title } = this.props;
    const mapOptions = {
      scrollEnabled: true,
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={region}
          onRegionChange={this.onRegionChange}
          onPress={e => this.onPress(e)}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
          <Marker
            key='pivot-marker'
            coordinate={{
              latitude: pivotLat,
              longitude: pivotLng,
            }}
            trackViewChanges={false}
            anchor={{x: 0.4, y: 1.05}}
            centerOffset={{x: 0, y: -40}}
          >
            <Image
              source={Images.pin_marker}
              style={{
                width: moderateScale(50),
                height: moderateScale(50),
              }}
            />
          </Marker>
        </MapView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: moderateScale(10),
          }}
        >
          <HeaderWhite title={title} />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(15),
          }}
        >
          <AreaDrawInfoWrapper>
          </AreaDrawInfoWrapper>
        </View>
        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Selesai</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

AreaDraw.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

AreaDraw.propTypes = {
  listId: string,
};

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
});

export default connect(mapStateToProps, null)(AreaDraw);