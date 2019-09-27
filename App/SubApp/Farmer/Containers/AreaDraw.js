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

import FarmerSignupActions from 'Redux/FarmerSignupRedux';
import {
  moderateScale,
  calcPolygonSize,
  calcPolygonCenter,
  normalizeAreaSize
} from 'Lib';
import { Colors, Images, Fonts } from 'Themes';
import { ButtonPrimary, ButtonCircle } from 'Components';
import {
  HeaderWhite,
  AreaDrawInfo,
  AreaDrawControl,
  AreaDrawInfoWrapper,
  withLocationListener
} from 'CommonFarmer';
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
      centerPos: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      isAllowedZoom: false,
      isMapReady: false,
      isFinished: false,
      selectedPolygonIndex: -1,
      polygonAreaSize: -1,
      polygonCenterPoint: null,
    };
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
    const { centerPos, isAllowedZoom, editing, isFinished } = this.state;
    if (!isAllowedZoom || isFinished) return;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [centerPos],
        },
        polygonAreaSize: -1,
      });
      return;
    }
    const newCoordinates = editing.coordinates.concat(centerPos);
    const polygonCenterPoint = calcPolygonCenter(newCoordinates);
    this.setState({
      editing: {
        ...editing,
        coordinates: newCoordinates,
      },
      polygonAreaSize: normalizeAreaSize(
        calcPolygonSize(newCoordinates), 'm2', 'ha'
      ) || '',
      polygonCenterPoint,
    });
  };
  
  handleDrawingFinish = () => {
    const { polygons, editing, polygonAreaSize } = this.state;
    const { storeFarmerArea } = this.props;
    storeFarmerArea({
      polygon: editing.coordinates,
      size: polygonAreaSize,
    });
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      isFinished: true,
    }, () => {
      const { navigation } = this.props;
      navigation.navigate('AreaType');
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
      polygonAreaSize,
      polygonCenterPoint,
    } = this.state;
    const { refreshLocation, locationCurrent } = this.props;
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
          {editing
            ? (
              <Fragment>
              <Polygon
                key={editing.id}
                coordinates={editing.coordinates}
                strokeColor={Colors.polygon_border}
                fillColor={Colors.polygon_fill_light}
                strokeWidth={1}
              />
              {polygonCenterPoint && (
                <Marker
                  coordinate={{
                    latitude: polygonCenterPoint.latitude,
                    longitude: polygonCenterPoint.longitude
                  }}
                  trackViewChanges={false}
                  anchor={{x: 0.4, y: 1.05}}
                  centerOffset={{x: 0, y: -40}}
                  >
                  <Text
                    style={{
                      ...Fonts.TITLE_HEADER__BOLD,
                      color: Colors.white,
                      textShadowColor: 'rgba(0, 0, 0, 0.5)',
                      textShadowOffset: {width: -3, height: 3},
                      textShadowRadius: 3,
                      elevation: 10,
                    }}
                    numberOfLines={2}>
                    {polygonAreaSize}
                  </Text>
                </Marker>
              )}
              </Fragment>
            )
            : (<View />)
          }
          {isAllowedZoom
            ? (
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
            )
            : (<View />)
          }
        </MapView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: moderateScale(10),
          }}
        >
          <HeaderWhite />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(15),
          }}
        >
          <AreaDrawInfo 
            isVisible={!isAllowedZoom}
            autoZoomIn={() => this.autoZoomIn()}
          />
          <AreaDrawControl
            isVisible={isAllowedZoom}
            isPolygonSelected={selectedPolygonIndex >= 0}
            removePolygon={() => this.removePolygon()}
            zoomToLocation={() => this.zoomToLocation()}
            handleDrawing={() => this.handleDrawing()}
            handleDrawingFinish={() => this.handleDrawingFinish()}
          />
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
  appState: string,
  locationEnabled: bool,
  locationCurrent: object,
  locationError: string,
  locationName: oneOfType([ string, array ]),
  isListening: bool,
  refreshLocation: func,
  storeFarmerArea: func,
};

const mapDispatchToProps = dispatch => ({
  storeFarmerArea: area => dispatch(
    FarmerSignupActions.storeFarmerArea(area)
  ),
});

export default connect(null, mapDispatchToProps)(withLocationListener(AreaDraw));