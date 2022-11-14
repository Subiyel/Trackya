import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyHeader, MyItem }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";

function MyItems({ route, appReducer, dispatch, navigation }) {
  


  const [password, setPassword] = useState('');

  const DATA = [
      {
        image: "https://picsum.photos/300/200",
        title: "Subial Product1",
        description: "This is my First Product",
        status: "Active"
      },
      {
        image: "https://picsum.photos/300/200",
        title: "Another Product",
        description: "This is my second Product",
        status: "Pending"
      }
  ]
 

      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="My Items" />
        <ScrollView>
          <View style={styles.containerWrapper}>
           
           {
              DATA.map((item, index) => {
              return(
                  <MyItem
                    key={index}
                    onPress={()=> navigation.navigate('ItemDetail', {item})}
                    uri={item.image} 
                    title={item.title}
                    desc={item.description}
                    status={item.status}
                  />
              )
            })
           }
                
                
                

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
        marginHorizontal: 25
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

      
    })
    
    
    const MyItemsContainer = connect(state => ({ appReducer: state }))(MyItems);
    export default MyItemsContainer