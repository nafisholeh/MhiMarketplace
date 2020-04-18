import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import MapView, {
  MAP_TYPES,
  Polygon,
  Polyline,
  ProviderPropType,
  Marker,
} from "react-native-maps";
import { connect } from "react-redux";
import { string, bool, object, oneOfType, array, func } from "prop-types";

import FarmerSignupActions from "Redux/FarmerSignupRedux";
import {
  moderateScale,
  calcPolygonSize,
  calcPolygonCenter,
  normalizeAreaSize,
} from "Lib";
import { Colors, Images, FONTS } from "Themes";
import {
  HeaderWhite,
  AreaDrawInfo,
  AreaDrawControl,
  withLocationListener,
} from "CommonFarmer";
import { MAP_DRAW_STATE } from "../../../../Config/AppConfig";

const { width, height } = Dimensions.get("window");

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
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      header: null,
    };
  };

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
      drawingState: MAP_DRAW_STATE.NOT_READY,
      isAllowedZoom: false,
      isMapReady: false,
      isFinished: false,
      selectedPolygonIndex: -1,
      polygonAreaSize: -1,
      polygonCenterPoint: null,
      polygonLastPoint: null,
      polygonFirstPoint: null,
    };
  }

  onRegionChange = (region) => {
    const { latitude, longitude } = region || {};
    this.setState({
      centerPos: { latitude, longitude },
    });
  };

  onRegionChangeComplete = (region) => {
    const { editing, drawingState } = this.state;
    const { coordinates } = editing || {};
    const { longitudeDelta } = region || {};
    const currentZoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
    if (drawingState === MAP_DRAW_STATE.DRAWING_FINISHED) return;
    let newDrawingState = drawingState;
    if (currentZoom >= ZOOM_THRESHOLD) {
      newDrawingState =
        Array.isArray(coordinates) && coordinates.length >= 3
          ? MAP_DRAW_STATE.DRAWING_QUALIFIED
          : MAP_DRAW_STATE.DRAWING;
    } else {
      newDrawingState = MAP_DRAW_STATE.NOT_READY;
    }
    this.setState({ drawingState: newDrawingState });
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
    const {
      centerPos: { latitude, longitude },
    } = this.state;
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
    const { centerPos, drawingState, editing, isFinished } = this.state;
    if (drawingState === MAP_DRAW_STATE.NOT_READY || isFinished) return;
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [centerPos],
        },
        polygonAreaSize: -1,
        polygonLastPoint: centerPos,
        polygonFirstPoint: centerPos,
      });
      return;
    }
    const newCoordinates = editing.coordinates.concat(centerPos);
    const polygonCenterPoint = calcPolygonCenter(newCoordinates);
    const polygonSize = calcPolygonSize(newCoordinates);
    this.setState({
      editing: {
        ...editing,
        coordinates: newCoordinates,
      },
      polygonAreaSizeM2: polygonSize,
      polygonAreaSize: normalizeAreaSize(polygonSize, "m2", "ha") || "",
      polygonCenterPoint,
      polygonLastPoint: centerPos,
      polygonFirstPoint: editing.coordinates[0],
      drawingState:
        newCoordinates.length >= 3
          ? MAP_DRAW_STATE.DRAWING_QUALIFIED
          : MAP_DRAW_STATE.DRAWING,
    });
  };

  handleDrawingFinish = () => {
    const { editing, polygonAreaSizeM2 } = this.state;
    const { storeFarmerArea } = this.props;
    storeFarmerArea({
      polygon: editing.coordinates,
      size: polygonAreaSizeM2,
    });
    this.setState({
      isFinished: true,
      polygonFirstPoint: null,
      polygonLastPoint: null,
      drawingState: MAP_DRAW_STATE.DRAWING_FINISHED,
    });
  };

  ontoNextForm = () => {
    const { navigation } = this.props;
    navigation.navigate("AreaType");
  };

  render() {
    const {
      region,
      centerPos,
      centerPos: { latitude: pivotLat, longitude: pivotLng } = {},
      drawingState,
      editing,
      polygonAreaSize,
      polygonCenterPoint,
      polygonLastPoint,
      polygonFirstPoint,
    } = this.state;
    const { locationCurrent } = this.props;
    const mapOptions = {
      scrollEnabled: true,
    };
    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          onMapReady={() => setTimeout(() => this.onMapReady())}
          provider={this.props.provider}
          style={styles.map}
          mapType={MAP_TYPES.HYBRID}
          initialRegion={region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          {...mapOptions}
        >
          {editing ? (
            <Polygon
              key={editing.id}
              coordinates={editing.coordinates}
              strokeColor={Colors.MAP_AREA_BORDER}
              fillColor={Colors.MAP_AREA}
              strokeWidth={4}
            />
          ) : null}
          {editing && polygonCenterPoint ? (
            <Marker
              coordinate={{
                latitude: polygonCenterPoint.latitude,
                longitude: polygonCenterPoint.longitude,
              }}
              trackViewChanges={false}
              anchor={{ x: 0.4, y: 1.05 }}
              centerOffset={{ x: 0, y: -40 }}
            >
              <Text
                style={{
                  ...FONTS.HEADER_BOLD,
                  color: Colors.white,
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: -3, height: 3 },
                  textShadowRadius: 3,
                  elevation: 10,
                }}
                numberOfLines={2}
              >
                {polygonAreaSize}
              </Text>
            </Marker>
          ) : null}
          {drawingState === MAP_DRAW_STATE.DRAWING ||
          drawingState === MAP_DRAW_STATE.DRAWING_QUALIFIED ? (
            <Marker
              key="pivot-marker"
              coordinate={{
                latitude: pivotLat,
                longitude: pivotLng,
              }}
              trackViewChanges={false}
              anchor={{ x: 0.4, y: 1.05 }}
              centerOffset={{ x: 0, y: -40 }}
            >
              <Image
                source={Images.pin_marker}
                style={{
                  width: moderateScale(50),
                  height: moderateScale(50),
                }}
              />
            </Marker>
          ) : (
            <View />
          )}
          {polygonLastPoint && polygonFirstPoint ? (
            <Polyline
              coordinates={[polygonLastPoint, centerPos, polygonFirstPoint]}
              strokeWidth={2}
              strokeColor={Colors.MAP_AREA}
            />
          ) : null}
        </MapView>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: moderateScale(10),
          }}
        >
          <HeaderWhite />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <AreaDrawInfo
            drawingState={drawingState}
            autoZoomIn={() => this.autoZoomIn()}
            putPivotMarker={() => this.handleDrawing()}
            finishDrawing={() => this.handleDrawingFinish()}
            ontoNextForm={() => this.ontoNextForm()}
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});

AreaDraw.propTypes = {
  appState: string,
  locationEnabled: bool,
  locationCurrent: object,
  locationError: string,
  locationName: oneOfType([string, array]),
  isListening: bool,
  refreshLocation: func,
  storeFarmerArea: func,
};

const mapDispatchToProps = (dispatch) => ({
  storeFarmerArea: (area) =>
    dispatch(FarmerSignupActions.storeFarmerArea(area)),
});

export default connect(
  null,
  mapDispatchToProps
)(withLocationListener(AreaDraw));
