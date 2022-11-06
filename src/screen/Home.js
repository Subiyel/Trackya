import React, { useState, useContext } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText }  from '../components';
// import { u } from "../util/utilities";
import { Provider, connect } from 'react-redux';
// import AppStateProvider from "../../AppState";
// import { ApiConstants } from "../api/ApiConstants";
// import Api from "../api/Api";
// import * as types from "../store/actions/types";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
// const myIcon = <Icon name="rocket" size={30} color="#900" />;


function Home({ route, appReducer, dispatch, navigation }) {
  
  

  const [email, setEmail] = useState('');
  // const theme = useContext(AppStateProvider);
  // console.log("Colors: ", theme)


      return (

        <View style={styles.container}>
          <View style={styles.containerWrapper}>

              <MyText style={{ textAlign: 'center', color:'#000', width: '100%', marginTop: 100 }}>Home</MyText>

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
        backgroundColor: "#FFFFFF"
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
    
    
    const HomeContainer = connect(state => ({ appReducer: state }))(Home);
    export default HomeContainer