import React, { Component } from 'react'
import { View } from 'react-native'
import { number, string, object, func, array, oneOfType } from 'prop-types'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
var _ = require('lodash')

class OptimizedList extends Component {
  constructor(props) {
    super(props)
    this.dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    })
    this.layoutProvider = this._getLayoutProvider()
    this.state = {
      data: null
    }
  }
  
  componentDidMount() {
    this._updateData()
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      this._updateData()
    }
  }
  
  _updateData() {
    if(!_.isNil(this.props.data) && !_.isEmpty(this.props.data)) {
      this.setState({
        data: this.dataProvider.cloneWithRows(this.props.data)
      })
    }
  }
  
  _getLayoutProvider() {
    const { itemWidth, itemHeight } = this.props
    return new LayoutProvider(
          () => {
            return 'list'; //Since we have just one view type
          },
          (type, dim, index) => {
            switch (type) {
              case 'list':
                dim.width = itemWidth;
                dim.height = itemHeight;
                break;
              default:
                dim.width = 0;
                dim.heigh = 0;
            }
          }
        );
  }
  
  render() {
    const { renderRow, onEndReached, style } = this.props;
    if(_.isNil(this.state.data)) {
      return <View></View>
    }
    return (
      <RecyclerListView 
        layoutProvider={this.layoutProvider} 
        dataProvider={this.state.data} 
        rowRenderer={renderRow}
        onEndReached={onEndReached}
        {...this.props}
      />
    )
  }
}

OptimizedList.propTypes = {
  itemWidth: number.isRequired,
  itemHeight: number.isRequired,
  data: oneOfType([ object, array ]),
  renderRow: func.isRequired,
  onEndReached: func,
}

OptimizedList.defaultProps = {
  itemWidth: 100,
  itemHeight: 50,
}

export default OptimizedList;