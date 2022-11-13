import React from 'react';
import { Text, Platform, View, Image, TouchableOpacity } from 'react-native';


export default function ListButton(props) {
  return (
  	<TouchableOpacity
    //  rippleColor={props.rippleColor}
    //  onPress={()=> {  ReactNativeHapticFeedback.trigger(hapticTriggerType, options); props.onPress()}}
     onPress={() => props.onPress() }
     disabled={ props.isDisabled } 
  	 style={[
      { 
      backgroundColor: 'white', 
      width: '47%', 
      padding: 8, 
      borderRadius: 4, 
      flexDirection: 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#000', 
      }, 
      props.buttonStyle ]}
  	>
      
    	<Text style={[{ textAlign: 'center', fontWeight: 'bold', color: '#FFF' }, props.labelStyle ]}>{props.label}</Text>
    
    </TouchableOpacity>
  );
}





