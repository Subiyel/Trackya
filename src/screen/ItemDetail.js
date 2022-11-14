import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, CircleBack, MyBack }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";

function ItemDetail({ route, appReducer, dispatch, navigation }) {
  


  const [item, setItem] = useState(route.params.item);
  console.log(route.params)

      return (

        <View style={styles.container}>
        <CircleBack {...navigation} />
        <ScrollView>
          <View style={styles.containerWrapper}>
          
          <MyImage source={{ uri: item.image }} style={styles.img}  />

          </View>
        </ScrollView>
        </View>
      )
    }
    







    const styles = StyleSheet.create({
      scrollview: {
        backgroundColor: '#000000',
      },
      container: {
        flex: 1,
        backgroundColor: "#E1E1E1",
      },
      containerWrapper: {
        marginHorizontal: 0
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      img: {
        height: 230,
        width: '100%'
      }
    })
    
    
    const ItemDetailContainer = connect(state => ({ appReducer: state }))(ItemDetail);
    export default ItemDetailContainer