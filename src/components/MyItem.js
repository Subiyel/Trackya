import React from 'react';
import {  StyleSheet, TouchableOpacity, View, Platform, Image } from 'react-native';
import  MyText from './MyText';
import MyBack from './MyBack';
import MyImage from './MyImage';
import MyStatus from './MyStatus';

export default function MyItem(props) {

  return (
    <TouchableOpacity onPress={()=> props.onPress()} style={styles.card}>
    <View style={{ position: 'absolute', top: 10, right: 15 }}><MyStatus state={props.status} /></View>
        <View style={styles.row}>
            <MyImage source={{ uri: props.uri }} style={styles.img} />
            <View style={styles.section}>
                <MyText numberOfLines={1} style={styles.title}><MyText style={styles.boldTxt}>Title:</MyText> {props.title}</MyText>
                <MyText numberOfLines={2} style={styles.qrTxt}><MyText style={styles.boldTxt}>UID:</MyText> {props.qrcode}</MyText>
                <MyText numberOfLines={2} style={styles.desc}><MyText style={styles.boldTxt}>Type:</MyText> {props.type}</MyText>
            </View>
        </View>
    </TouchableOpacity>
  );
  }


  const styles = StyleSheet.create({
    card: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 25,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden'
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      img: {
        height: 60,
        width: 60,
        borderRadius: 6
      },

      section: {
        marginHorizontal: 20,
        width: '70%'
      },

      title: {
        fontSize: 13,
        // fontWeight: 'bold',
        color: '#000',
        overflow: 'hidden'
      },

      desc: {
        fontSize: 12,
        color: '#222',
        marginTop: 1
      },

      qrTxt: {
        fontSize: 12,
        color: '#222',
        marginTop: 4
      },

      boldTxt: {
        fontWeight: 'bold'
      }


  });

