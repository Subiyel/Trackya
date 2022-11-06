import React from 'react';
import { Text, Platform, View, Image, TouchableOpacity } from 'react-native';


export default function MyButton(props) {
  return (
  	<TouchableOpacity
    //  rippleColor={props.rippleColor}
    //  onPress={()=> {  ReactNativeHapticFeedback.trigger(hapticTriggerType, options); props.onPress()}}
     onPress={() => props.onPress() }
     disabled={ props.isLoading } 
  	 style={[
      { 
      backgroundColor: 'white', 
      width: '100%', 
      padding: 5, 
      borderRadius: 4, 
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#19826d', 
      }, 
      props.buttonStyle ]}
  	>
      { props.isLoading ?
        <Image style={{ width: 40, height: 25, }}  source={ require('../assets/img/loader.gif') } />
        :
    		<Text style={[{ textAlign: 'center', color: '#FFF' }, props.labelStyle ]}>{props.label}</Text>
      }
    </TouchableOpacity>
  );
}





