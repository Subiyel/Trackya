import React from 'react';
import { Text } from 'react-native';

export default function MyText(props) {

  return (
    <Text {...props} style={[  { fontFamily: 'Arial', color: '#000000' }, props.style]} />
  );
}
