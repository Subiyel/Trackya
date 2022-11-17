import React, { useState, useContext } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, FlatList, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage }  from '../components';
// import { u } from "../util/utilities";
import { Provider, connect } from 'react-redux';
// import AppStateProvider from "../../AppState";
import Ion from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const primary = "#19826d"
function Landing({ route, appReducer, dispatch, navigation }) {
  
  

//   const [email, setEmail] = useState('');

      return (

        <View style={styles.container}>
          <View style={styles.containerWrapper}>

          <MyText style={styles.title}>Welcome to</MyText>
          <MyImage source={ require('../assets/img/logo.png') } style={styles.logo} />
          
          <View style={{ marginTop: 50, marginBottom: 20 }}>
            <TouchableOpacity onPress={()=> navigation.navigate('Login') } style={styles.bigButton}>
                    <Icon name="home-outline" size={37} color="#FFF" />
                    <MyText style={styles.btnTxt}>Login / Register</MyText>
            </TouchableOpacity>
           </View>


            <TouchableOpacity onPress={()=> navigation.navigate('LostForm', {code: "TST3518512065"}) } style={styles.bigButton2}>
                    <MIcon name="add-location-alt" size={40} color="#FFF" />
                    <MyText style={styles.btnTxt}>Return / Found</MyText>
            </TouchableOpacity>

          

          </View>
        </View>
      )
    }
    







    const styles = StyleSheet.create({
      
      container: {
        flex: 1,
        backgroundColor: "#FFF"
      },
      containerWrapper: {
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },

      title: {
        fontSize: 20,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
      },

      logo: { 
        height: 50,
        width: 200,
        marginTop: 20,
        alignSelf: 'center'
      },

      btnTxt: {
        color: '#FFF',
        fontSize: 20,
        marginTop: 20
      },

      bigButton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 200,
        width: 350,
        borderRadius: 15,
        backgroundColor: primary
      },

      bigButton2: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 220,
        width: 350,
        borderRadius: 15,
        backgroundColor: '#a6a6a6'
      }

      
    })
    
    
    const LandingContainer = connect(state => ({ appReducer: state }))(Landing);
    export default LandingContainer