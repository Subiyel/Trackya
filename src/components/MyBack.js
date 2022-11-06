import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MyBack(props) {

  return (
  	<TouchableOpacity style={[styles.container,{...props.Style}]} onPress={()=> props.goBack()}>

        <Icon name="chevron-back" size={16} color="#000000" style={{ marginTop: 0.5 }} />
       
        <MyText {...props} style={[ styles.label , props.labelStyle ]}>
            Back
        </MyText>

    </TouchableOpacity>
  );
  }


  const styles = StyleSheet.create({
    container:{
        width: 53,
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15
        // justifyContent: 'space-between',
    },
    logo: {
        //  marginTop: 62, 
         height: 24, 
         width: 80 
    },
    label: {
        fontSize: 14, 
        color: '#000000',
        marginLeft: 2
    }
  });

