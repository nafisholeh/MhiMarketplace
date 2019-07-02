import React from 'react'
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from 'react-native-svg'

const CartSubtractButton = props => (
  <Svg width={26} height={26} {...props}>
    <Defs>
      <LinearGradient
        id="prefix__a"
        x1={0.5}
        x2={0.5}
        y2={20}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#a8de1c" />
        <Stop offset={1} stopColor="#50ac02" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 2188" transform="translate(-221 -923)">
      <Circle
        data-name="Ellipse 78"
        cx={13}
        cy={13}
        r={13}
        transform="translate(221 923)"
        fill="url(#prefix__a)"
      />
      <G fill="none">
        <Path data-name="Path 1404" d="M225 927h18v18h-18z" />
        <Path
          data-name="Line 213"
          stroke="#fff"
          strokeWidth={2}
          d="M228.5 936.5h12"
        />
      </G>
    </G>
  </Svg>
)

export default CartSubtractButton
