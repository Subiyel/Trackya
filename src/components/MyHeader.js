import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import MyBack from './MyBack';

export default function MyHeader(props) {

  return (
    <View style={[styles.row1, props.headerStyle]}>
        <MyBack Style={{ marginTop: 0 }} {...props} />
        <MyText style={styles.navTitle}>{props.title}</MyText>
        <View />
    </View>
  );
  }


  const styles = StyleSheet.create({
    row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 12,
      },

      navTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 80
      }
  });

