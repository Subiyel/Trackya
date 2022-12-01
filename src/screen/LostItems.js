import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, ShimmerList, MyHeader, MyItem }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import { useIsFocused } from "@react-navigation/native";


function LostItems({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  


    useEffect(() => {
      if (isFocused) {
        fetchLostItems()
      }
    }, [isFocused]);

    
    const fetchLostItems = async () => {
   
            setLoading(true)
            const res = await Api(ApiConstants.BASE_URL + ApiConstants.FETCH_LOST_ITEMS, null, "GET", appReducer.appReducer.authToken)
            setLoading(false)
            console.log(res)
            if (res && res.data) {
                setItemList(res.data)
            }
    }

      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="Lost Items" />
        <ScrollView>
          <View style={styles.containerWrapper}>
           
           {
              itemList.map((item, index) => {
              return(
                  <MyItem
                    key={index}
                    onPress={()=> console.log(item)}
                    uri={item.register_tag && item.register_tag.image} 
                    title={item.location}
                    type={item.type}
                    desc={item.description}
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
                
              <View style={{ height: 200 }} />
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
    
    
    const LostItemsContainer = connect(state => ({ appReducer: state }))(LostItems);
    export default LostItemsContainer