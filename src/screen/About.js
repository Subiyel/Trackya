import React, { useState,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyWebview, ShimmerList, MyHeader }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import Api from "../api/Api";

function About({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [appData, setAppData] = useState('');

    useEffect(() => {
      if (isFocused) {
        fetchHTML()
      }
  }, [isFocused]);


  const fetchHTML = async () => {
        setLoading(true)
        const res = await Api(ApiConstants.BASE_URL + ApiConstants.ABOUT_APP, null, "GET", appReducer.appReducer.authToken)
        setLoading(false)
        console.log(res)
        if (res && res.data) {
            setAppData(res.data)
        }
  }
  
      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="" />
  
          <View style={styles.containerWrapper}>
          
          { isLoading &&
                  <View style={{ flex: 1 }}>
                    <ShimmerList />
                    <ShimmerList /> 
                  </View> 
          }

          <MyWebview content={{ html: appData.content }}/>


            

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
        flex: 1,
        
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
    
    
    const AboutContainer = connect(state => ({ appReducer: state }))(About);
    export default AboutContainer