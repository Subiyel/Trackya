import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, ActivityIndicator, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, ShimmerList, MyHeader, MyItem }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import { useIsFocused } from "@react-navigation/native";
import { SwipeListView } from 'react-native-swipe-list-view';


function Alerts({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [alertList, setAlertList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isSubLoading, setSubLoading] = useState(false);

  


    useEffect(() => {
      if (isFocused) {
        fetchLostItems()
      }
    }, [isFocused]);

    
    const fetchLostItems = async () => {
   
            setLoading(true)
            const res = await Api(ApiConstants.BASE_URL + ApiConstants.FETCH_ALERTS, null, "GET", appReducer.appReducer.authToken)
            setLoading(false)
            console.log(res)
            if (res && res.data) {
                setAlertList(res.data)
            }
    }


    const handleTap = (alert) => {
      if (alert.type == "product expiry") {
        if (alert.product_details.expired_near_to_expire) {
          sendSubscriptionEmail(alert)
        }
      }
    }


    const sendSubscriptionEmail = async (item) => {

      let data = {
        user_id: appReducer.appReducer.id,
        product_id: item.product_details.id
      }
  
      setSubLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.SUBSCRIPTION, data, "POST", appReducer.appReducer.authToken)
      setSubLoading(false)
  
      if (res && res.status == "success"){
        // showToast()
        // navigation.goBack(2)
        alert(res.message)
      } else if (res && res.message) {
        alert(res.message)
      } else {
        alert("Network Error")
      }
  
    }

      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="Alerts" />

          <View style={styles.containerWrapper}>
           
           {
            isSubLoading && <ActivityIndicator style={{marginTop: 10, marginBottom: 20}} />
           }

          <SwipeListView
            data={alertList}
            disableRightSwipe
            renderItem={ (data, rowMap) => (
                <TouchableOpacity onPress={()=> handleTap(data.item)} style={styles.rowFront}>
                    <View style={styles.row}>
                        <MyImage source={{ uri: data.item.product_details.image }} style={styles.img} />
                        <View style={styles.section}>
                            <MyText numberOfLines={1} style={styles.title}>{data.item.title}</MyText>
                            <MyText numberOfLines={2} style={styles.qrTxt}>{data.item.content.type}</MyText>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            renderHiddenItem={ (data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <Text>Delete</Text>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
        />

           {
                !isLoading && alertList.length < 1 &&
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
        marginHorizontal: 25,
        paddingTop: 30
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
      backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
    },

    img: {
        height: 40,
        width: 40,
        borderRadius: 6
      },

    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15,
        borderRadius: 10
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },

    section: {
        marginHorizontal: 20,
        width: '70%'
      },

      title: {
        fontSize: 13,
        // fontWeight: 'bold',
        color: '#000'
      },

      desc: {
        fontSize: 12,
        color: '#222',
        marginTop: 1
      },

      
    })
    
    
    const AlertsContainer = connect(state => ({ appReducer: state }))(Alerts);
    export default AlertsContainer