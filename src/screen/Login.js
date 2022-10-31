import React, { useState } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText }  from '../components';
// import { colors } from "../util/constants";
// import { u } from "../util/utilities";
import { Provider, connect } from 'react-redux';
// import { ApiConstants } from "../api/ApiConstants";
// import Api from "../api/Api";
// import * as types from "../store/actions/types";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MIcon from 'react-native-vector-icons/MaterialIcons';


function Login({ route, appReducer, dispatch, navigation }) {
  

  const [email, setEmail] = useState('');
  

      return (

        <View style={styles.container}>
          <View style={styles.containerWrapper}>
          
              <MyText style={{ textAlign: 'center', width: '100%', marginTop: 100 }}>Login</MyText>

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
        backgroundColor: "#FFFFFF",
      },
      containerWrapper: {
        flex: 1,
        marginTop: 35,
        justifyContent: 'space-between',
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },



    })
    
    
    const LoginContainer = connect(state => ({ appReducer: state }))(Login);
    export default LoginContainer