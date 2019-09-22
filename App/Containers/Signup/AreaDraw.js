import React, { Component, Fragment } from 'react';
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
import { string, bool, object, oneOfType, array, func } from 'prop-types';

import { moderateScale, calcPolygonSize } from 'Lib';
import { Colors, Images } from 'Themes';
import { ButtonPrimary, ButtonCircle } from 'Components';
import {
  HeaderWhite,
  AreaDrawInfoWrapper,
  withLocationListener
} from './Common';
import { getSelectedListId } from 'Redux/ListRedux';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -8.209091;
const LONGITUDE = 113.696251;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const ZOOM_THRESHOLD = 19;
const LAT_DELTA_THRESHOLD = 0.0014199398322549683;
const LNG_DELTA_THRESHOLD = 0.0009096041321754456;
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
      centerPos: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      isAllowedZoom: false,
      isMapReady: false,
      selectedPolygonIndex: -1,
      polygonAreaSize: -1,
    };
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
  
  onRegionChange = region => {
    const { latitude, longitude, longitudeDelta, latitudeDelta } = region || {};
    const currentZoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
    this.setState({
      isAllowedZoom: currentZoom >= ZOOM_THRESHOLD,
      centerPos: { latitude, longitude },
    });
  };
  
  onMapReady = () => {
    this.setState({ isMapReady: true });
  };
  
  zoomToLocation = (latitude, longitude, latitudeDelta, longitudeDelta) => {
    if (!this.map || !latitude || !longitude) return;
    this.map.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: latitudeDelta || LAT_DELTA_THRESHOLD,
        longitudeDelta: longitudeDelta || LNG_DELTA_THRESHOLD,
      },
      1000
    );
  };
  
  autoZoomIn = () => {
    const { centerPos: { latitude, longitude } } = this.state;
    if (!this.map) return;
    this.map.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LAT_DELTA_THRESHOLD,
        longitudeDelta: LNG_DELTA_THRESHOLD,
      },
      1000
    );
  };
  
  handleDrawing = () => {
    const { centerPos, isAllowedZoom, editing, creatingHole } = this.state;
    if (!isAllowedZoom) return;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [centerPos],
          holes: [],
          polygonAreaSize: -1,
        },
      });
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, centerPos],
          polygonAreaSize: calcPolygonSize([...editing.coordinates, centerPos]),
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        centerPos,
      ];
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
          polygonAreaSize: calcPolygonSize([...editing.coordinates]),
        },
      });
    }
  };
  
  handleDrawingFinish = () => {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });
  };
  
  onMapPress = e => {
    
  };
  
  onPolygonPress = e => {
    const { latitude: pivotLat, longitude: pivotLng } = e.nativeEvent.coordinate;
    const { polygons } = this.state;
    const selectedPolygonIndex = polygons.findIndex(({ coordinates }) =>
      coordinates.findIndex(({ latitude, longitude}) =>
        pivotLat === latitude && pivotLng === longitude
      ) > -1
    );
    this.setState({ selectedPolygonIndex });
  };
  
  removePolygon = () => {
    const { polygons, selectedPolygonIndex } = this.state;
    if (selectedPolygonIndex < 0) return;
    this.setState({ 
      polygons: [
        ...polygons.slice(0, selectedPolygonIndex),
        ...polygons.slice(selectedPolygonIndex+1)
      ],
      selectedPolygonIndex: -1,
    });
  };

  render() {
    const {
      region,
      centerPos: {
        latitude: pivotLat,
        longitude: pivotLng,
      } = {},
      isAllowedZoom,
      isMapReady,
      polygons,
      editing,
      selectedPolygonIndex,
    } = this.state;
    const { listId: title, refreshLocation, locationCurrent } = this.props;
    const { latitude: userLat, longitude: userLng } = locationCurrent || {};
    const mapOptions = {
      scrollEnabled: true,
    };
    return (
      <View style={styles.container}>
        <MapView
          ref={map => { this.map = map }}
          onMapReady={() => setTimeout(() => this.onMapReady())}
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={region}
          onRegionChange={this.onRegionChange}
          onPress={this.onMapPress}
          {...mapOptions}
        >
          {polygons.map((polygon, index) => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor={Colors.polygon_border}
              fillColor={
                selectedPolygonIndex === index
                  ? Colors.polygon_fill_light
                  : Colors.polygon_fill_dark
              }
              strokeWidth={selectedPolygonIndex === index ? 4 : 1}
              tappable
              onPress={this.onPolygonPress}
            />
          ))}
          {editing && (
            <Polygon
              key={editing.id}
              coordinates={editing.coordinates}
              holes={editing.holes}
              strokeColor={Colors.polygon_border}
              fillColor={Colors.polygon_fill_light}
              strokeWidth={1}
            >
            </Polygon>
          )}
          {isAllowedZoom && (
            <Marker.Animated
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
            </Marker.Animated>
          )}
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
          {!isAllowedZoom && (
            <AreaDrawInfoWrapper>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: moderateScale(15),
                }}
              >
                <Image
                  source={Images.warning}
                  style={{
                    width: moderateScale(35),
                    height: moderateScale(35),
                    marginBottom: moderateScale(4),
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.68)',
                    textAlign: 'center',
                  }}
                >
                  posisi kamera peta kurang dekat
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <ButtonPrimary 
                  onPress={() => this.autoZoomIn()}
                  title="Zoom-in Otomatis"
                  style={{
                    height: 45,
                    width: '100%'
                  }}
                />
              </View>
            </AreaDrawInfoWrapper>
          )}
          {isAllowedZoom && (
            <AreaDrawInfoWrapper
              height={110}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                {selectedPolygonIndex >= 0
                  ? (
                    <ButtonCircle 
                      onPress={() => this.removePolygon()}
                      icon={Images.delete_flat}
                    />
                  ) 
                  : (
                    <Fragment>
                      <ButtonCircle 
                        onPress={() => this.zoomToLocation(userLat, userLng)}
                        icon={Images.gps}
                        colors={[ Colors.disabled_light, Colors.disabled_dark ]}
                      />
                      <ButtonCircle 
                        onPress={() => this.handleDrawing()}
                        icon={Images.pinned}
                      />
                      <ButtonCircle 
                        onPress={() => this.handleDrawingFinish()}
                        icon={Images.check_flat}
                        colors={[ Colors.red_light, Colors.red ]}
                      />
                    </Fragment>
                  )
                }
              </View>
            </AreaDrawInfoWrapper>
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
  appState: string,
  locationEnabled: bool,
  locationCurrent: object,
  locationError: string,
  locationName: oneOfType([ string, array ]),
  isListening: bool,
  refreshLocation: func,
};

const mapStateToProps = createStructuredSelector({
  listId: getSelectedListId(),
});

export default connect(mapStateToProps, null)(withLocationListener(AreaDraw));