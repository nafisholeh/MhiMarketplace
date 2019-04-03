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
import { parseToRupiah, calcDiscount, getReadableDate } from 'Lib'
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
    return (
      <View style={{flex: 1}}>
        <Query 
          variables={{ _id: _id }}
          query={FETCH_PRODUCT_DETAIL}>
          {({ loading, error, data, refetch }) => {
            if(loading) {
              return <View></View>;
            } else if(error) {
              return <View></View>;
            } else {
              const { product } = data;
              const { title, description, stock, unit, photo, price, discount, expired_date, minimum_order } = product;
              return (
                <View style={styles.container}>
                  <ScrollView style={styles.scrollView}>
                    <Image source={{ uri: photo }} style={{ width: Metrics.deviceWidth, height: 200 }} />

                    <Text style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 15, fontSize: 20 }}>{title}</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                      { discount &&
                        <Text style={{ marginRight: 5, fontWeight: 'bold', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{parseToRupiah(price)}</Text>
                      }
                      { !discount &&
                        <Text style={{ fontWeight: 'bold' }}>{parseToRupiah(price)}</Text>
                      }
                      { discount &&
                        <Text style={{ fontWeight: 'bold', color: 'red', fontSize: 16 }}>{parseToRupiah(calcDiscount(price, discount))}</Text>
                      }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ marginBottom: 5 }}>Stok: {stock} {unit}</Text>
                      <Text style={{ marginBottom: 5 }}>Min pesan: {minimum_order} {unit}</Text>
                    </View>
                    <Text style={{ marginBottom: 5 }}>Kadaluarsa: {getReadableDate(expired_date, 'DD-MM-YYYY', 'id', 'DD MMM YYYY')}</Text>
                    <Text style={{ marginBottom: 20 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus euismod quis viverra nibh cras. Bibendum ut tristique et egestas. Tristique senectus et netus et malesuada fames ac turpis. Enim ut sem viverra aliquet eget sit amet. Proin sagittis nisl rhoncus mattis rhoncus urna. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Dictumst quisque sagittis purus sit amet volutpat consequat. Ut consequat semper viverra nam libero justo. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. At tellus at urna condimentum mattis pellentesque id nibh tortor. Sit amet nisl suscipit adipiscing bibendum est ultricies. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Congue nisi vitae suscipit tellus mauris a. Quis risus sed vulputate odio ut. Adipiscing vitae proin sagittis nisl rhoncus. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Sapien pellentesque habitant morbi tristique senectus et.</Text>
                  </ScrollView>
                  <TouchableOpacity
                    onPress={() => this._onAddCart()}
                    style={{
                      height: 50, backgroundColor: 'gray',
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