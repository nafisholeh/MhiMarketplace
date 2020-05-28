import React, { Component } from "react";
import { Alert, Platform, Linking, PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";

import { InAppNotification } from "Lib";
import { STRINGS, METRICS } from "Themes";

export default function withLocation(WrappedComponent) {
  class LocationComponent extends Component {
    state = {
      forceLocation: true,
      highAccuracy: true,
      loading: false,
      error: null,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      location: {},
    };

    componentDidMount() {
      this.getLocation();
    }

    componentWillUnmount() {
      this.removeLocationUpdates();
    }

    hasLocationPermissionIOS = async () => {
      const openSetting = () => {
        Linking.openSettings().catch(() => {
          Alert.alert("Unable to open settings");
        });
      };
      const status = await Geolocation.requestAuthorization("whenInUse");

      if (status === "granted") {
        return true;
      }

      if (status === "denied") {
        Alert.alert("Location permission denied");
      }

      if (status === "disabled") {
        Alert.alert(
          `Turn on Location Services to allow the app to determine your location.`,
          "",
          [
            { text: "Go to Settings", onPress: openSetting },
            { text: "Don't Use Location", onPress: () => {} },
          ]
        );
      }

      return false;
    };

    hasLocationPermission = async () => {
      if (Platform.OS === "ios") {
        const hasPermission = await this.hasLocationPermissionIOS();
        return hasPermission;
      }

      if (Platform.OS === "android" && Platform.Version < 23) {
        return true;
      }

      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      console.tron.log("hasLocationPermission/status", status);

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (status === PermissionsAndroid.RESULTS.DENIED) {
        InAppNotification.info(
          STRINGS.LOC_DENIED_POPUP_TITLE,
          STRINGS.LOC_DENIED_POPUP_BODY
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        InAppNotification.info(
          STRINGS.LOC_DENIED_POPUP_TITLE,
          STRINGS.LOC_DENIED_POPUP_BODY
        );
      }

      return false;
    };

    parseLocation = (location) => {
      const { timestamp, coords } = location || {};
      return Object.assign({}, coords, timestamp);
    };

    getLocation = async () => {
      const hasLocationPermission = await this.hasLocationPermission();
      console.tron.log(
        "getLocation/hasLocationPermission",
        hasLocationPermission
      );
      if (!hasLocationPermission) {
        return;
      }

      this.setState({ loading: true }, () => {
        const { highAccuracy, forceLocation, showLocationDialog } = this.state;
        Geolocation.getCurrentPosition(
          (position) => {
            console.tron.log("getLocation/position", position);
            this.setState({
              location: this.parseLocation(position),
              loading: false,
            });
          },
          (error) => {
            console.tron.log("getLocation/error", error);
            this.setState({ error: error, loading: false });
          },
          {
            enableHighAccuracy: highAccuracy,
            timeout: METRICS.GPS_TIMEOUT,
            maximumAge: METRICS.GPS_MAXIMUM_AGE,
            distanceFilter: 0,
            forceRequestLocation: forceLocation,
            showLocationDialog: showLocationDialog,
          }
        );
      });
    };

    getLocationUpdates = async () => {
      const hasLocationPermission = await this.hasLocationPermission();
      console.tron.log(
        "getLocationUpdates/hasLocationPermission",
        hasLocationPermission
      );
      if (!hasLocationPermission) {
        return;
      }

      this.setState({ updatesEnabled: true }, () => {
        const {
          highAccuracy,
          forceLocation,
          showLocationDialog,
          significantChanges,
        } = this.state;
        this.watchId = Geolocation.watchPosition(
          (position) => {
            console.tron.log("getLocationUpdates/position", position);
            this.setState({ location: this.parseLocation(position) });
          },
          (error) => {
            console.tron.log("getLocationUpdates/error", error);
            this.setState({ location: error });
          },
          {
            enableHighAccuracy: highAccuracy,
            distanceFilter: 50,
            interval: METRICS.INTERVAL,
            fastestInterval: METRICS.GPS_FASTEST_INTERVAL,
            forceRequestLocation: forceLocation,
            showLocationDialog: showLocationDialog,
            useSignificantChanges: significantChanges,
          }
        );
      });
    };

    removeLocationUpdates = () => {
      if (this.watchId !== null) {
        Geolocation.clearWatch(this.watchId);
        this.setState({ updatesEnabled: false });
      }
    };

    render() {
      const { location } = this.state;
      return <WrappedComponent {...this.props} userLocation={location} />;
    }
  }
  return LocationComponent;
}
