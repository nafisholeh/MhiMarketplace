import React, { Component } from 'react'
import { Alert, ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { object } from 'prop-types'
import { Query } from 'react-apollo'

import { FETCH_PRODUCT_DETAIL } from 'GraphQL/Product/Query'
import { getUser } from 'Redux/SessionRedux';

import { Images, Metrics } from 'Themes'
import { OptimizedList } from 'Components'
import { parseToRupiah, calcDiscount } from 'Lib'
import styles from './Styles'

class Detail extends Component {
  
  _onAddCart = () => {
    const { user } = this.props;
    if (!user) {
      Alert.alert(
        'Belum terdaftar',
        'Silahkan login terlebih dahulu sebelum memesan',
        [
          {text: 'OK', onPress: this.openSignin, },
        ],
        {cancelable: false},
      );
    }
  }
  
  openSignin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  }
  
  render () {
    const { navigation: { state: { params: { data: { _id } }}} } = this.props;
    console.tron.log('Detail render', this.props.user)
    return (
      <View style={{flex: 1}}>
        <Query 
          variables={{ _id: _id }}
          query={FETCH_PRODUCT_DETAIL}>
          {({ loading, error, data, refetch }) => {
            console.tron.log('Detail ', loading, error, data)
            if(loading) {
              return <View></View>;
            } else if(error) {
              return <View></View>;
            } else {
              const { product } = data;
              const { title, description, stock, unit, photo, price, discount, expired_date, minimum_order } = product;
              return (
                <View style={styles.container}>
                  <Image source={{ uri: photo }} style={{ width: Metrics.deviceWidth, height: 200 }} />

                  <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    { discount &&
                      <Text style={{ fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{parseToRupiah(price)}</Text>
                    }
                    <Text style={{ marginTop: 3, marginRight: 5, fontWeight: 'bold' }}>{parseToRupiah(price)}</Text>
                    <Text style={{ marginTop: 3, fontWeight: 'bold' }}>{parseToRupiah(calcDiscount(price, discount))}</Text>
                    {/* { discount &&
                      <Text style={{ marginTop: 3, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{parseToRupiah(price)}</Text>
                    }
                    { !discount &&
                      <Text style={{ marginTop: 3, marginRight: 5, fontWeight: 'bold' }}>{parseToRupiah(price)}</Text>
                    }
                    { discount &&
                      <Text style={{ marginTop: 3, fontWeight: 'bold' }}>{parseToRupiah(calcDiscount(price, discount))}</Text>
                    } */}
                  </View>
                  <Text>{stock} {unit}</Text>
                  <Text style={{ marginTop: 25 }}>{description}</Text>
                  
                  <TouchableOpacity
                    onPress={() => this._onAddCart()}
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, width: Metrics.deviceWidth, height: 50, backgroundColor: 'gray',
                      alignItems: 'center', justifyContent: 'center'
                    }}
                    >
                    <Text style={{color: 'white'}}>
                      Pesan Sekarang
                    </Text>
                  </TouchableOpacity>
                  
                </View>
              )
            }
          }}
        </Query>
      </View>
    )
  }
}

Detail.propTypes = {
  user: object,
}

const mapStateToProps = createStructuredSelector({
  user: getUser()
});

export default connect(mapStateToProps, null)(Detail);