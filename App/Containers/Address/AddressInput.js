import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';

import { FETCH_ADDRESS } from 'GraphQL/Address/Query';
import { ADD_ADDRESS, cacheAddAddress } from 'GraphQL/Address/Mutation';
import { Colors, Metrics } from 'Themes';
import styles from './Styles';
import { getUserId } from 'Redux/SessionRedux';

class AddressInput extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Alamat Baru'
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      provinsi: '',
      kota: '',
      kecamatan: '',
      kelurahan: '',
      rtrw: '',
      alamat: '',
      kodepos: ''
    }
  }
  
  validateData = () => {
    const { provinsi, kota, kecamatan, kelurahan, alamat } = this.state; 
    return provinsi && kota && kecamatan && kelurahan && alamat;
  }
  
  uploadAddress = addAddress => {
    if(!this.validateData()) return;
    const {
      provinsi,
      kota,
      kecamatan,
      kelurahan,
      rtrw,
      alamat,
      kodepos
    } = this.state; 
    const { userId } = this.props;
    addAddress({
      variables: {
        user_id: userId,
        data: {
         	alamat,
          rtrw,
          kelurahan,
          kecamatan,
          kota,
          provinsi 
        }
      }
    });
  }
  
  onUploadAddressCompleted = data => {
    const { navigation } = this.props;
    navigation.goBack();
  }
  
  render() {
    const { provinsi, kota, kecamatan, kelurahan, rtrw, alamat, kodepos } = this.state; 
    const { userId } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Mutation
          mutation={ADD_ADDRESS}
          onCompleted={this.onUploadAddressCompleted}
          update={(cache, data) => cacheAddAddress(cache, data, this.state)}
          ignoreResults={false}
          errorPolicy='all'>
          { (addAddress, {loading, error, data}) => {
            return (
              <React.Fragment>
                <ScrollView style={{ flex: 1, paddingHorizontal: Metrics.baseMargin }}>
                  <TextField
                    label='Provinsi'
                    onChangeText={provinsi => this.setState({ provinsi })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._kota.focus()}
                    style={styles.input}
                  />
                  <TextField
                    ref={ref => this._kota = ref}
                    label='Kota/Kabupaten'
                    onChangeText={kota => this.setState({ kota })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._kecamatan.focus()}
                  />
                  <TextField
                    ref={ref => this._kecamatan = ref}
                    label='Kecamatan'
                    onChangeText={kecamatan => this.setState({ kecamatan })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._kelurahan.focus()}
                  />
                  <TextField
                    ref={ref => this._kelurahan = ref}
                    label='Kelurahan'
                    onChangeText={kelurahan => this.setState({ kelurahan })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._rtrw.focus()}
                  />
                  <TextField
                    ref={ref => this._rtrw = ref}
                    label='RT/RW'
                    style={{flex: 1}}
                    onChangeText={rtrw => this.setState({ rtrw })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._alamat.focus()}
                  />
                  <TextField
                    ref={ref => this._alamat = ref}
                    label='Alamat Lengkap'
                    multiline
                    onChangeText={alamat => this.setState({ alamat })}
                    returnKeyType='next'
                    onSubmitEditing={() => this._kodepos.focus()}
                  />
                  <TextField
                    ref={ref => this._kodepos = ref}
                    label='Kodepos'
                    onChangeText={kodepos => this.setState({ kodepos })}
                    returnKeyType='go'
                    onSubmitEditing={this.uploadAddress}
                  />
                </ScrollView>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.uploadAddress(addAddress)}>
                  {loading &&
                    <DotIndicator
                      count={4}
                      size={7}
                      color='white'
                      animationDuration={800}
                    />
                  }
                  {!loading &&
                    <Text style={{ color: 'white' }}>Tambah Alamat</Text>
                  }
                </TouchableOpacity>
              </React.Fragment>
            )
          }}
        </Mutation>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default connect(mapStateToProps, null)(AddressInput);