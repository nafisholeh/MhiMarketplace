import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Button, Text, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import FlexImage from 'react-native-flex-image';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import Grid from 'react-native-grid-component';

import { Colors, Metrics, Images } from 'Themes';
import AppConfig from 'Config/AppConfig';
import ImageFullScreen from '../ImageFullScreen';
import ImageRobust from '../ImageRobust';

class ImageGrid extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      currentImageIndex: 0,
      dataFullScreen: null,
      dataSelected: null,
      dataGrid: null,
      selected: null,
      selectedIndex: null,
      selectMode: false,
      isShowFullImage: false,
      width: (Metrics.deviceWidth / 2) - 30
    }
  }

  componentWillMount() {
    this._onImageChanged(this.props.data)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data) {
      if(nextProps.data !== null) {
        this._onImageChanged(nextProps.data)
      }
    }
  }

  _onImageChanged(data) {
    if (!data) return
    this.setState({
      dataFullScreen: data,
      dataSelected: this._addPropsToData(data),
      dataGrid: this.generateGridData(data),
      selected: this._setupSelectedState(data)
    })
  }

  _setupSelectedState(data) {
    let output = []
    data.map((item, i) => {
      output.push(false)
    })
    return output
  }

  _addPropsToData(data) {
    let output = []
    data.map((item, i) => output.push({ id: i, url: item}))
    return output
  }
  
  generateGridData = data => {
    const { columnTotal } = this.props;
    const output = data.map((item, i) => ({ id: i, url: item}));
    let gridData = [];
    while (output.length > 0) {
      let gridTemp = output.splice(0, output.length > columnTotal ? columnTotal : output.length);
      gridData.push(gridTemp);
    }
    console.log('generateGridData/data/gridData', data, gridData)
    return gridData;
  };

  // jika salah satu image ditekan
  _onPressImage = (item) => {
    if(!this.state.selectMode) {
      this.setState({ isShowFullImage: true, currentImageIndex: item.id })     // tampilkan image dlm tampilan full screen jika ditekan
    } else {
      if(this.props.isEditable) this._updateSelectedStatus(item)                                   // select image
    }
  }

  // menutup tampilan full screen
  _onCloseFullScreen() {
    this.setState({ isShowFullImage: false })
  }

  // select image ketika ditekan agak lama
  _onSelectImage = (item) => {
    if(this.props.isEditable) {
      this._updateSelectedStatus(item)
    }
  }

  // ubah status select/unselect pada image
  _updateSelectedStatus(item) {
    const { selected } = this.state;
    const { id } = item || {};
    this.setState(
      {
        selected: [...selected.slice(0, id - 1), !selected[id], ...selected.slice(id + 1)]
      },
      () => {
        let selected = this._setSelectedIndex()
        this._changePressMode(selected)
      }
    );
  }

  // cari dan simpan index image yang telah diselect
  _setSelectedIndex() {
    let temp = []
    this.state.selected.filter((item, i) => {
      if(item) {
        temp.push(i)
        return true
      } else return false
    })
    this.setState({ selectedIndex: temp })
    return temp
  }

  /*
  * ubah select mode,
  * jika ada yg diselect, maka tekan image lain untuk menselect
  * jika tdk ada yg diselect, maka tekan image akan menampilkan image scr full screen
  */
  _changePressMode(item) {
    this.setState({ selectMode: item.length > 0 ? true : false })
  }

  _onDeleteImage() {
    const { dataFullScreen = [], selectedIndex = [] } = this.state;
    const deleted = selectedIndex.map(index => {
      const deletedItem = dataFullScreen[index];
      dataFullScreen.splice(index, 1);
      return deletedItem;
    });
    this.props.onDeleteImage(index)
    this.setState({
      dataFullScreen: deleted,
      dataSelected: this._addPropsToData(deleted),
      dataGrid: this.generateGridData(deleted),
      selected: this._setupSelectedState(deleted),
      selectMode: false,
    })
  }

  renderItem = item => {
    const { selected = [], width } = this.state;
    const { id = 0, url } = item || {};
    const isSelected = selected[id];
    return (
      <TouchableHighlight
        key={id}
        style={{flex: 1, alignItems:'center', justifyContent:'center'}}
        onPress={() => this._onPressImage(item)}
        onLongPress={() => this._onSelectImage(item)}>
        <View>
          { !isSelected &&
            <ImageRobust
              path={url}
              height={100}
              width={width}
              style={{opacity: 1}} />
          }
          { isSelected &&
            <View>
              <ImageRobust
                path={url}
                height={100}
                width={width}
                style={{opacity: .5}} />
              <Image source={Images.done} style={{position:'absolute', top:5, left:5, width:25, height:25}} />
            </View>
          }
        </View>
      </TouchableHighlight>
    )
  }

  render () {
    const { dataFullScreen, dataSelected, dataGrid, selectMode, isShowFullImage, currentImageIndex } = this.state;
    return (
      <View style={[ styles.mainContainer, this.props.styleContainer ]}>
        { dataGrid &&
          <Grid>
            {dataGrid.map((item, i) => {
              const columns = item.map(n => <Col>{this.renderItem(n)}</Col>);
              return <Row key={i}>{columns}</Row>;
            })}
          </Grid>
        }
        { selectMode &&
          <TouchableOpacity
            onPress={() => this._onDeleteImage()}
          >
            <Text>Hapus</Text>
          </TouchableOpacity>
        }
        <ImageFullScreen
          data={dataFullScreen}
          isShown={isShowFullImage}
          currentImage={currentImageIndex}
          onToggle={this._onCloseFullScreen.bind(this)}
        />
        <ImageRobust
          path='https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F414612%2Fpexels-photo-414612.jpeg%3Fauto%3Dformat%252Ccompress%26cs%3Dtinysrgb%26dpr%3D1%26w%3D500&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeauty%2F&docid=pFs_4Fcq5AgpmM&tbnid=aT1lQMo5nzpYfM%3A&vet=10ahUKEwiCj83N29jiAhWHbn0KHaIcAQ0QMwhTKAEwAQ..i&w=500&h=355&safe=strict&client=safari&bih=837&biw=1440&q=image&ved=0ahUKEwiCj83N29jiAhWHbn0KHaIcAQ0QMwhTKAEwAQ&iact=mrc&uact=8'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContent: {
    flex:1
  },
  imageNormal: {height:100, alignItems:'center', justifyContent:'center', alignSelf:'center'},
  imageSelected: {opacity: .2, height:100, alignItems:'center', justifyContent:'center', alignSelf:'center'},
})

ImageGrid.propTypes = {
  data: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.string ]),
  columnTotal: PropTypes.number,
  isSourceLocal: PropTypes.bool,
  remoteDefaultUrl: PropTypes.string,
  remoteBaseUrl: PropTypes.string,
  navigator: PropTypes.oneOfType([ PropTypes.object, PropTypes.func ]),
  onDeleteImage: PropTypes.func,        // memberitahu parent jika ada image yg terhapus
  isEditable: PropTypes.bool,
  styleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  styleGrid: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

ImageGrid.defaultProps = {
  columnTotal: 2,
  isSourceLocal: false,
  isEditable: true,
}

export default ImageGrid;
