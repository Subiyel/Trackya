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

function Store({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [appData, setAppData] = useState('');

    useEffect(() => {
      if (isFocused) {
        // fetchHTML()
      }
  }, [isFocused]);


  
  
      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="Website" />
  
          <View style={styles.containerWrapper}>
          
            <MyWebview content={{ uri: "https://trackya.co.uk/" }}/>

            { isLoading &&
                  <View>
                    <ShimmerList />
                    <ShimmerList /> 
                  </View> 
            }

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
        flex: 1
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
    
    
    const StoreContainer = connect(state => ({ appReducer: state }))(Store);
    export default StoreContainer