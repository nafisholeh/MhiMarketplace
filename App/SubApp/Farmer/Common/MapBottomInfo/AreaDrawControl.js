import React, { PureComponent, Fragment } from 'react';
import { View } from 'react-native';

import { ButtonCircle } from 'Components';
import { Images, Colors } from 'Themes';
import AreaDrawInfoWrapper from './AreaDrawInfoWrapper';

class AreaDrawControl extends PureComponent {
  render() {
    const {
      isVisible,
      isPolygonSelected,
      removePolygon,
      zoomToLocation,
      handleDrawing,
      handleDrawingFinish
    } = this.props;
    if (!isVisible) return (<View />);
    return (
      <AreaDrawInfoWrapper
        height={110}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {isPolygonSelected
            ? (
              <ButtonCircle 
                onPress={() => removePolygon()}
                icon={Images.delete_flat}
              />
            ) 
            : (
              <Fragment>
                <ButtonCircle 
                  onPress={() => zoomToLocation(userLat, userLng)}
                  icon={Images.gps}
                  colors={[ Colors.disabled_light, Colors.disabled_dark ]}
                />
                <ButtonCircle 
                  onPress={() => handleDrawing()}
                  icon={Images.pinned}
                />
                <ButtonCircle 
                  onPress={() => handleDrawingFinish()}
                  icon={Images.check_flat}
                  colors={[ Colors.red_light, Colors.red ]}
                />
              </Fragment>
            )
          }
        </View>
      </AreaDrawInfoWrapper>
    )
  }
}

export default AreaDrawControl;
