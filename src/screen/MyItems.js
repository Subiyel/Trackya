import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, ShimmerList, MyHeader, MyItem }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import { useIsFocused } from "@react-navigation/native";


function MyItems({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [itemList, setItemList] = useState([]);



    useEffect(() => {
      if (isFocused) {
        fetchMyItems()
      }
    }, [isFocused]);



    const fetchMyItems = async () => {
      setLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.FETCH_ITEMS, null, "GET", appReducer.appReducer.authToken)
      setLoading(false)
      console.log(res)
      if (res && res.data) {
        setItemList(res.data)
      }
    }



      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="My Items" />
        <ScrollView>
          <View style={styles.containerWrapper}>
           
           {
              itemList.map((item, index) => {
              return(
                  <MyItem
                    key={index}
                    onPress={()=> navigation.navigate('ItemDetail', {item})}
                    uri={item.image} 
                    title={item.title}
                    desc={item.description}
                    qrcode={item.qr_code}
                    status={item.status}
                  />
              )
            })
           }
                
                {
                  !isLoading && itemList.length < 1 &&
                  <Image source={ require('../assets/img/NRF.png') } style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 200 }} />
                }

                { isLoading &&
                  <View>
                    <ShimmerList />
                    <ShimmerList /> 
                  </View> 
                }  
                
                

                <View style={{ height: 60 }} />
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