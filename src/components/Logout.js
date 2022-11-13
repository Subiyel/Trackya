import React from 'react';
import { Text, Platform, View, Image, TouchableOpacity } from 'react-native';


export default function Logout(props) {
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
      marginTop: 0,
      borderRadius: 4, 
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#19826d', 
      }, 
      props.buttonStyle ]}
  	>
      
        <View />
    	<Text style={[{ textAlign: 'center', color: '#000', fontWeight: 'bold', marginLeft: 30 }, props.labelStyle ]}>LOGOUT</Text>
        <Image style={{ width: 20, height: 20, tintColor: '#19826d', marginRight: 20 }}  source={ require('../assets/img/logout.png') } />
      
    </TouchableOpacity>
  );
}





