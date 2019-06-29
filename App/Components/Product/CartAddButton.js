import React from 'react'
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from 'react-native-svg'

const CartAddButton = ({ isError }) => isError ? (
  <Svg height={32} width={32} overflow="visible">
    <Circle cx={16} cy={16} r={16} fill="#d72828" />
    <Path d="M14.5 25h3v-3h-3v3zm0-19v13h3V6h-3z" fill="#e6e6e6" />
  </Svg>
) : (
  <Svg width={26} height={26}>
    <Defs>
      <LinearGradient
        id="prefix__a"
        x1={0.5}
        x2={0.5}
        y2={1}
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
      <Path
        data-name="Path 1403"
        d="M239.25 936.75h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5h1.5v4.5h4.5z"
        fill="#fff"
      />
      <Path data-name="Path 1404" d="M225 927h18v18h-18z" fill="none" />
    </G>
  </Svg>
)

export default CartAddButton;
