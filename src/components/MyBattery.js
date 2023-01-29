import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MyBattery(props) {

const batteryColor = () => {
    var c = "#19826d"
    if (props.percentage) {
        if (props.percentage <= 50){
            c = "#d9b91a"
        } 
        
        if (props.percentage <= 20){
            c = "#d10804"
        }
    }
    return c
}

  return (
  	<TouchableOpacity style={[styles.container,{...props.Style}]} >

        <View style={styles.batteryBox}>
            <View style={{ 
                height: 10,
                width: props.percentage + "%",
                backgroundColor: batteryColor(),
                alignSelf: 'flex-start',
                borderRadius: 1
             }} />
        </View>

        <View style={styles.tip} />

        <MyText {...props} style={[ styles.label , props.labelStyle ]}>
            {props.percentage}%
        </MyText>

    </TouchableOpacity>
  );
  }


  const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 57,
    },
    label: {
        fontSize: 13, 
        color: '#222',
        marginLeft: 8,
    },

    batteryBox: {
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 2,
        height: 15,
        width: 40,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    tip: {
        height: 5,
        width: 2,
        marginTop: 5,
        borderTopRightRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: '#000'
    }
  });

