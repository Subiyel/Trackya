import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CircleBack(props) {

  return (
  	<TouchableOpacity style={[styles.container,{...props.Style}]} onPress={()=> props.goBack()}>

        <Icon name="chevron-back" size={16} color="#000000" style={{ marginTop: 0.5 }} />
       
       

    </TouchableOpacity>
  );
  }


  const styles = StyleSheet.create({
    container:{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#19826d',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        left: 18,
        zIndex: 100
    }
  });

