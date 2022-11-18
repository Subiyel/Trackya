import React, { useState,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyHeader }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import Api from "../api/Api";

function Tracker({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [password, setPassword] = useState('');

    useEffect(() => {
      if (isFocused) {
        console.log(appReducer.appReducer)
      }
  }, [isFocused]);
  
      return (

        <View style={styles.container}>
        <MyHeader {...navigation} title="Tracker" />
        <ScrollView>
          <View style={styles.containerWrapper}>
          
                <View style={styles.flexx}>
                 <MyText>In Progress...</MyText>
                </View>

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
        flex: 1,
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

      flexx: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300
      }
    })
    
    
    const TrackerContainer = connect(state => ({ appReducer: state }))(Tracker);
    export default TrackerContainer