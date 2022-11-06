import React, { useState, useContext } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, FlatList, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText }  from '../components';
// import { u } from "../util/utilities";
import { Provider, connect } from 'react-redux';
// import AppStateProvider from "../../AppState";
import Ion from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
const primary = "#19826d"
function Intro({ route, appReducer, dispatch, navigation }) {
  
  

//   const [email, setEmail] = useState('');


const slides = [
    {
      key: 'one',
      title: 'Use Smart Tags',
      text: 'To never lose your valuables',
      image: require('../assets/img/intro/intro1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Luggage tracker',
      text: 'Real-Time tracking of your lugggages',
      image: require('../assets/img/intro/intro2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Lost Item?',
      text: "Don't Worry! Let us reunite you with your Lugguage",
      image: require('../assets/img/intro/intro4.png'),
      backgroundColor: '#22bcb5',
    }
  ];

const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <Image source={item.image} style={styles.introImg} resizeMode={'contain'} />
      </View>
    );
  }

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={()=> navigation.navigate('Login') } style={styles.buttonCircleDone}>
        <Ion
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </TouchableOpacity>
    );
  };

      return (

        <View style={styles.container}>
          <View style={styles.containerWrapper}>

          <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            activeDotStyle={{ backgroundColor: '#000' }}
        />
          
          </View>
        </View>
      )
    }
    







    const styles = StyleSheet.create({
      
      container: {
        flex: 1,
        // backgroundColor: "#F46"
      },
      containerWrapper: {
        flex: 1,
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },

      buttonCircle: {
        width: 40,
        height: 40,
        marginRight: 10,
        backgroundColor: 'rgba(0, 0, 0, .8)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },

      buttonCircleDone: {
        width: 40,
        height: 40,
        marginRight: 10,
        backgroundColor: primary,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },

      introImg: {
        height: '100%',
        width: '100%',
      },

      title: {
        textAlign: 'center',
        backgroundColor: '#FFF',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
      },

      text: {
        textAlign: 'center',
        backgroundColor: '#FFF',
        color: 'black',
        fontSize: 17
      },

      slide: {
        backgroundColor: '#FFF'
      }



    })
    
    
    const IntroContainer = connect(state => ({ appReducer: state }))(Intro);
    export default IntroContainer