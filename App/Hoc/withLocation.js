import React, { Component } from "react";
import Geolocation from "react-native-geolocation-service";

import { getLocationPermission } from "Lib";
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

    parseLocation = (location) => {
      const { timestamp, coords } = location || {};
      return Object.assign({}, coords, timestamp);
    };

    getLocation = async () => {
      const hasLocationPermission = await getLocationPermission();
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
      const hasLocationPermission = await getLocationPermission();
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
