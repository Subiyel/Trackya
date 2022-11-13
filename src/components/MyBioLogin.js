import React from 'react';
import { Text, Platform, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import style from 'react-native-password-strength-meter/src/style';


export default function MyBioLogin(props) {
  return (
  	<TouchableOpacity
     onPress={() => props.onPress() }
     disabled={ props.isLoading } 
  	 style={[
      { 
      backgroundColor: 'white', 
      width: '70%', 
      padding: 5, 
      borderRadius: 12, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#19826d',
      alignSelf: 'center',
      marginTop: 15,
      paddingHorizontal: 20,
      paddingVertical: 20
      }, 
      props.buttonStyle ]}
  	>
      { props.isLoading ?
        <Image style={{ width: 50, height: 50, }}  source={ require('../assets/img/bioLogin/FaceLoading.gif') } />
        :
    		<Image style={styles.faceIDimg}  source={ require('../assets/img/bioLogin/Face_ID.png') } />
      }

      <Text style={styles.txt1}>Sign-in with Face ID</Text>
      <Text style={styles.txt2}>Look directly at your front camera to use Face ID</Text>

    </TouchableOpacity>
  );
}





const styles = StyleSheet.create({
  faceIDimg: {
    tintColor: '#FFFFFF',
    width: 50, 
    height: 50, 
    marginTop: 0
  },
  txt1: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 10
  },
  txt2: {
    fontSize: 10,
    color: '#e1e1e1e1',
    textAlign: 'center',
    marginTop: 5
  }
});