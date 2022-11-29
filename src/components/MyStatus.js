import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MyStatus(props) {

    var color = "#FFD900"

    if (props.state == "Active") {
        color = "#19826d"
    } else if (props.state == "Lost") {
      color = "#ff471a"
    }

  return (
        <View style={[styles.status, { backgroundColor: color }, props.StatusStyle]}>
            <MyText style={styles.txt}>{props.state}</MyText>
        </View>
  );
  }


  const styles = StyleSheet.create({
    status: {
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderWidth: 0,
        borderColor: '#000',
        borderRadius: 10,
      },

      txt: {
        fontSize: 11,
        textAlign: 'center',
        color: '#FFF'
      }
  });

