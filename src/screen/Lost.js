import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, Linking, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack, MyBioLogin }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


function Lost({ route, appReducer, dispatch, navigation }) {
  


  const [isLoading, setLoading] = useState(false);
 
  const onSuccess = (e) => {
      console.error('QR Code: ', e)
  };

  
      return (

        <View style={styles.container}>



            <QRCodeScanner
                onRead={onSuccess}
                showMarker={true}
                cameraStyle={{ flex: 1, height: '100%' }}
                topViewStyle={{ flex: 0, height: 0 }}
                bottomViewStyle={{ flex: 0, height: 0 }}
                cameraContainerStyle={{ flex: 1, height: '100%', marginTop: 0, marginBottom: 0 }}
            />

            <View style={styles.topView}>
                <View style={styles.row1}>
                     <Icon name="close" size={26} color="#FFF" />
                     <MyText style={styles.centerText}> Scan QR Code </MyText>
                     <View />
                 </View>
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
      
    centerText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        marginRight: 20
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },

    topView: {
        width: '100%',
        position: 'absolute',
        top: 5,
        paddingHorizontal: 20,
        paddingTop: 10
    }
      

    })
    
    
    const LostContainer = connect(state => ({ appReducer: state }))(Lost);
    export default LostContainer