import React, { Component } from 'react';
import { Alert, AppState, View } from 'react-native';
import PropTypes from 'prop-types';
// import Geocoder from 'react-native-geocoder';
import GPSState from 'react-native-gps-state';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import {
  extractAdministrativeName,
  reportSentryError,
  getStateFromAsyncStorage,
  setStateFromAsyncStorage,
} from 'Lib';
import AppConfig from 'Config/AppConfig';
var _ = require('lodash')

export default function withLocationListener(
  WrappedComponent,
  Options = {
    /*
    ** repeat: always listen whenever user's location is changed
    ** once: listen once
    */
    mode: 'repeat',
  }
) {
  class LocationListener extends Component {
    
    static navigationOptions = ({navigation}) => {
      const {params = {}} = navigation.state
      return {
        header: null,
      }
    };

    constructor (props) {
      super(props)
      this.state = {
        appState: AppState.currentState,
        locationEnabled: true,
        locationCurrent: {
          latitude: null,
          longitude: null,
        },
        locationError: null,
        locationName: null,
        isListening: false,
      }
      this._checkLocationPermission()
      this._onLocationProviderChange()
    }

    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      navigator.geolocation.clearWatch(this.watchId)          // berhenti menunggu lokasi baru dari gps
      GPSState.removeListener();
    }

    // mendeteksi perubahan status aplikasi yaitu background, inactive, foreground
    _handleAppStateChange = (nextAppState) => {
      const { appState } = this.state;
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        this._checkLocationPermission()                       // handle jika user merubah ijin akses lokasi dari hal setting
      }
      this.setState({ appState: nextAppState })
    }

    // cek apa user sudah mengijinkan akses ke location provider atau belum
    async _checkLocationPermission() {
      let locationPermission = await getStateFromAsyncStorage('location_permission');
      
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(response => {
        if(!_.isNil(locationPermission) && response === RESULTS.GRANTED){
          this.setState({ locationEnabled: true })
          this._checkLocationProviderStatus()         // minta user utk menghidupkan gps/location service
        } else if (
          !_.isNil(locationPermission)
          && (response === RESULTS.BLOCKED || response === RESULTS.DENIED)
        ) {
            this.setState({ locationEnabled: false })
            this._useDefaultLocation() 
        } else {
            setStateFromAsyncStorage('location_permission', true)
            this.setState({ locationEnabled: false })
            this._requestLocationAccessPermission()    
        }
      })
      .catch(error => {
        reportSentryError(this, '_checkLocationPermission error', error)
      })
    }

    // minta ijin ke user utk akses location provider
    _requestLocationAccessPermission() {
      request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
        {
          rationale: {
            title: 'MHI ijin akses lokasi',
            message:
              'MHI perlu akses mengenai lokasi Anda ' +
              'agar bisa memberikan jadwal sholat yang lebih akurat',
          },
        }
      )
      .then(response => {
        if(response === RESULTS.GRANTED) {
          this.setState({ locationEnabled: true })
          this._checkLocationProviderStatus()         // minta user utk menghidupkan gps/location service
        } else {
          this.setState({ locationEnabled: false })
          this._useDefaultLocation()
        }
      })
      .catch(error => {
        reportSentryError(this, '_requestLocationAccessPermission error', error)
      })
    }

    // terpanggil setiap ada perubahan ijin akses atau status dari location provider
    _onLocationProviderChange() {
      GPSState
      .addListener((status) => {
    		switch(status){
          case GPSState.AUTHORIZED:             // akses location provider diijinkan Android
          case GPSState.AUTHORIZED_ALWAYS:      // akses location provider diijinkan iOS
          case GPSState.AUTHORIZED_WHENINUSE:   // akses location provider diijinkan iOS
            this.setState({ locationEnabled: true })
            this._startListeningLocationUpdate()
            break
    			case GPSState.RESTRICTED:              // location provider dinonaktifkan
            this.setState({ locationEnabled: false })
            this._requestLocationProviderEnabled()
            break
    			case GPSState.DENIED:                  // akses location provider tidak diijinkan
            this.setState({ locationEnabled: false })
            this._useDefaultLocation()
    				break
          case GPSState.NOT_DETERMINED:          // user belum memberi kepastian apakah diberi ijin utk akses location provider atau tidak
            this.setState({ locationEnabled: false })
            this._requestLocationAccessPermission()
    				break
          default:
            this._useDefaultLocation()
            break
    		}
    	})
    }

    // cek apa location provider status sedang aktif atau tidak
    _checkLocationProviderStatus() {
      GPSState
      .getStatus()
      .then(status => {
        switch(status) {
          case GPSState.AUTHORIZED:             // akses location provider diijinkan Android
          case GPSState.AUTHORIZED_ALWAYS:      // akses location provider diijinkan iOS
          case GPSState.AUTHORIZED_WHENINUSE:   // akses location provider diijinkan iOS
            this.setState({ locationEnabled: true })
            this._startListeningLocationUpdate()
            break
          case GPSState.RESTRICTED:              // location provider dinonaktifkan
            this.setState({ locationEnabled: false })
            this._requestLocationProviderEnabled()
            break
          case GPSState.NOT_DETERMINED:          // user belum memberi kepastian apakah diberi ijin utk akses location provider atau tidak
            this.setState({ locationEnabled: false })
            this._requestLocationAccessPermission()
            break
          default:
            this._useDefaultLocation()
            break
        }
      })
    }

    // minta ijin untuk mengaktifkan location provider melalui panel setting di hp
    _requestLocationProviderEnabled() {
      Alert.alert(
        'Aktifkan GPS',
        'MHI meminta ijin untuk mengaktifkan GPS pada HP ini',
        [
          {text: 'Tidak', onPress: () => {}},
          {text: 'Ya', onPress: () => GPSState.openSettings()},
        ],
        { cancelable: false }
      )
    }

    // menunggu lokasi user terlacak
    _startListeningLocationUpdate() {
      const { locationEnabled } = this.state;
      const { mode } = this.props;
      if(!locationEnabled) {
        reportSentryError(this, '_startListeningLocationUpdate cant start', this.state)
        return;
      };
      this.setState({ isListening: true });
      let geolocation =
        (mode === 'repeat')
          ? navigator.geolocation.watchPosition
          : navigator.geolocation.getCurrentPosition
      this.watchId = geolocation(
        (position) => {
          this.setState({
            locationCurrent: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            locationError: null,
            isListening: mode === 'repeat',
          });
          // TODO: replace react-native-geocoder, targetSdkVersion must be 26 or higher
          // this._geocodeCurrentLoc(      // translate lat,lng ke nama kota
          //   position.coords.latitude,
          //   position.coords.longitude
          // );
        },
        (error) => {
          this.setState({
            locationError: error.message,
            isListening: false,
          });
          reportSentryError(this, '_startListeningLocationUpdate error', error);
        },
        {
          enableHighAccuracy: true,
          timeout: AppConfig.location.timeout,
          maximumAge: AppConfig.location.maximumAge,
          distanceFilter: AppConfig.location.distanceFilter
        }
      )
    }

    // pakai dummy location, i.e. Indonesia, sebab user tidak mengijinkan akses lokasi
    _useDefaultLocation() {
      const { loc_exist } = this.props;
      if(!loc_exist) {                         // jika tidak ada lokasi sama sekali
        this.setState({ locationName: 'Indonesia' });   // simpan semua kandidat nama lokasi
      }
    }

    // konversi lat lng ke kota/kab/prov/negara
    _geocodeCurrentLoc(lat, lng) {
      // TODO: replace react-native-geocoder, targetSdkVersion must be 26 or higher
      // Geocoder.geocodePosition({ lat:lat, lng:lng })
      // .then(res => {
      //   if(!_.isEmpty(res)) {
      //     let locNames = extractAdministrativeName(res);
      //     this.setState({ locationName: locNames });      // simpan semua kandidat nama lokasi
      //   } else {
      //     this._useDefaultLocation();
      //   }
      // })
      // .catch(err => {
      //   reportSentryError(this, '_geocodeCurrentLoc error', err);
      //   this._useDefaultLocation();
      // })
    }

    render () {
      return (
        <WrappedComponent
          refreshLocation={() => this._checkLocationPermission()}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  return LocationListener;
}