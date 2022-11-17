import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, CircleBack, MyStatus }  from '../components';
import { Provider, connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";

function ItemDetail({ route, appReducer, dispatch, navigation }) {
  


  const [item, setItem] = useState(route.params.item);
  console.log(route.params)

  const markLost = () => {
    navigation.navigate('MarkLost', {item})
  }

      return (

        <View style={styles.container}>
        <CircleBack {...navigation} />
        <ScrollView>
          
          
          <MyImage source={{ uri: item.image }} style={styles.img}  />

          <View style={styles.containerWrapper}>

            <View style={styles.row}>
                <View style={{ marginLeft: 30 }}>
                <QRCode value={item.qr_code} />
                </View>

                <View style={{  marginLeft: 20 }}>
                    <MyText style={styles.title}>{item.title}</MyText>
                    <MyText style={styles.desc}>{item.description}</MyText>
                    <MyStatus state={item.status} StatusStyle={{ marginTop: 9 }} />
                </View>

            </View>   


            <View style={{ marginTop: 30, marginHorizontal: 40 }}>
            
                <View style={[styles.row, {marginBottom: 8 }]}>
                    <MyText style={styles.label}>Expiry:</MyText>
                    <MyText style={styles.expiry}>{item.expiry}</MyText>
                </View>

                <View style={styles.row}>
                    <MyText style={styles.label}>Type:</MyText>
                    <MyText style={styles.expiry}>{item.type}</MyText>
                </View>
            </View>


            <MyButton onPress={()=> markLost()} label="Mark Item as Lost" buttonStyle={{ marginTop: 80, width: '80%', alignSelf: 'center' }} />


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
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 50
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
      },

      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },

      desc: {
        marginTop: 5,
        fontSize: 14
      }, 

      expiry: {
        fontSize: 14,
        color: '#222',
        marginLeft: 10
      },

    

      label: {
        fontWeight: 'bold',
        fontSize: 14
      }
    })
    
    
    const ItemDetailContainer = connect(state => ({ appReducer: state }))(ItemDetail);
    export default ItemDetailContainer