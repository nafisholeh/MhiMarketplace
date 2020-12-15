/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { string } from 'prop-types';

import { moderateScale } from 'Lib';
import { COLORS, METRICS, IMAGES } from 'themes-v3';

class Ktp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { parsedNeighborhoodHamlet: '-' };
  }

  componentDidMount = () => {
    this.parseNeighborhoodHamlet();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.neighborhood !== this.props.neighborhood ||
      prevProps.hamlet !== this.props.hamlet
    ) {
      this.parseNeighborhoodHamlet();
    }
  }

  parseNeighborhoodHamlet = () => {
    const { neighborhood, hamlet } = this.props;
    if (!neighborhood && !hamlet) return;

    let parsedValue = `${neighborhood || '-'}/${hamlet || '-'}`;
    this.setState({ parsedNeighborhoodHamlet: parsedValue });
  };

  render() {
    const {
      nik,
      name,
      birthDate,
      gender,
      bloodType,
      address,
      urbanVillage,
      subDistrict,
      religion,
      marriageStatus,
      occupation,
      citizenship,
      expiredDate,
      createdDate,
      createdDistrict,
    } = this.props;
    const { parsedNeighborhoodHamlet } = this.state;
    return (
      <View style={styles.container}>
        <ReactNativeZoomableView
          maxZoom={2.0}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
        >
          <View style={styles.contentWrapper}>
            <View style={styles.headerWrapper}>
              <Text style={styles.fontHeader}>PROVINSI JAWA TIMUR</Text>
              <Text style={styles.fontHeader}>KABUPATEN BLITAR</Text>
            </View>
            <View style={styles.dataWrapper}>
              <View>
                <View style={styles.nikWrapper}>
                  <View style={styles.nikRowWrapper}>
                    <Text style={styles.fontHeader}>NIK</Text>
                  </View>
                  <View>
                    <Text style={styles.fontHeader}>: {nik || '-'}</Text>
                  </View>
                </View>
                <View style={styles.dataRowWrapper}>
                  <View style={styles.dataRowTitleWrapper}>
                    <Text style={styles.fontData}>Nama</Text>
                    <Text style={styles.fontData}>Tempat/Tgl Lahir</Text>
                  </View>
                  <View>
                    <Text style={styles.fontData}>: {name || '-'}</Text>
                    <Text style={styles.fontData}>: {birthDate || '-'}</Text>
                  </View>
                </View>
                <View style={styles.dataRowWrapper}>
                  <View style={styles.dataRowTitleWrapper}>
                    <Text style={styles.fontData}>Jenis Kelamin</Text>
                  </View>
                  <View style={styles.genderAndBloodWrapper}>
                    <Text style={styles.fontDataGender}>: {gender || '-'}</Text>
                    <Text style={styles.fontData}>
                      Gol. Darah: {bloodType || '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.dataRowWrapper}>
                  <View style={styles.dataRowTitleWrapper}>
                    <Text style={styles.fontData}>Alamat</Text>
                    <Text style={styles.fontDataAddress}>RT/RW</Text>
                    <Text style={styles.fontDataAddress}>Kel/Desa</Text>
                    <Text style={styles.fontDataAddress}>Kecamatan</Text>
                  </View>
                  <View>
                    <Text style={styles.fontData}>: {address || '-'}</Text>
                    <Text style={styles.fontData}>
                      : {parsedNeighborhoodHamlet}
                    </Text>
                    <Text style={styles.fontData}>: {urbanVillage || '-'}</Text>
                    <Text style={styles.fontData}>: {subDistrict || '-'}</Text>
                  </View>
                </View>
                <View style={styles.dataRowWrapper}>
                  <View style={styles.dataRowTitleWrapper}>
                    <Text style={styles.fontData}>Agama</Text>
                    <Text style={styles.fontData}>Status Perkawinan</Text>
                    <Text style={styles.fontData}>Pekerjaan</Text>
                    <Text style={styles.fontData}>Kewarganegaraan</Text>
                    <Text style={styles.fontData}>Berlaku Hingga</Text>
                  </View>
                  <View>
                    <Text style={styles.fontData}>: {religion || '-'}</Text>
                    <Text style={styles.fontData}>
                      : {marriageStatus || '-'}
                    </Text>
                    <Text style={styles.fontData}>: {occupation || '-'}</Text>
                    <Text style={styles.fontData}>: {citizenship || '-'}</Text>
                    <Text style={styles.fontData}>: {expiredDate || '-'}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.rightSideWrapper}>
                <View style={styles.photoWrapper}>
                  <Image
                    source={IMAGES.MOZAIC_PHOTO}
                    resizeMode="contain"
                    style={styles.photo}
                  />
                </View>
                <View style={styles.dateWrapper}>
                  <Text style={styles.fontData}>{createdDistrict}</Text>
                  <Text style={styles.fontData}>{createdDate}</Text>
                </View>
              </View>
            </View>
          </View>
        </ReactNativeZoomableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    backgroundColor: COLORS.KTP,
    borderRadius: METRICS.LARGE,
    height: moderateScale(207),
    marginHorizontal: METRICS.LARGE,
  },
  dataRowTitleWrapper: { width: moderateScale(64) },
  dataRowWrapper: { flexDirection: 'row' },
  dataWrapper: {
    flexDirection: 'row',
    marginLeft: moderateScale(15),
  },
  dateWrapper: { alignItems: 'center', marginTop: METRICS.MEDIUM },
  fontData: {
    color: '#223445',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 7,
  },
  fontDataAddress: {
    color: '#223445',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 7,
    paddingLeft: moderateScale(11),
  },
  fontDataGender: {
    color: '#223445',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 7,
    width: moderateScale(74),
  },
  fontHeader: {
    color: '#223445',
    fontFamily: 'OpenSans-Bold',
    fontSize: 10,
  },
  genderAndBloodWrapper: {
    flexDirection: 'row',
    width: moderateScale(123),
  },
  headerWrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: METRICS.MEDIUM,
    marginTop: moderateScale(15),
  },
  nikRowWrapper: { width: moderateScale(45) },
  nikWrapper: { flexDirection: 'row', marginBottom: METRICS.TINY },
  photo: {
    height: moderateScale(96),
    width: moderateScale(77),
  },
  photoWrapper: {
    backgroundColor: '#8ED0E7',
    height: moderateScale(96),
  },
  rightSideWrapper: {
    marginLeft: moderateScale(19),
    paddingTop: moderateScale(6),
    width: moderateScale(77),
  },
});

Ktp.propTypes = {
  address: string,
  birthDate: string,
  bloodType: string,
  gender: string,
  hamlet: string,
  name: string,
  neighborhood: string,
  nik: string,
  urbanVillage: string,
  subDistrict: string,
  religion: string,
  marriageStatus: string,
  occupation: string,
  citizenship: string,
  expiredDate: string,
  createdDate: string,
  createdDistrict: string,
};

export default Ktp;
