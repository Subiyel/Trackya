import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, Linking, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack, QrScanner }  from '../components';
import { Provider, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";


function Lost({ route, appReducer, dispatch, navigation }) {
  
    

  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  var qrRefParent = useRef(0);

  useEffect(() => {
    if (isFocused) {
      console.log("Activating Scanner..")
      qrRefParent.reactivate()
    }
  }, [isFocused]);
 
  const onQRdetect = (code) => {
      let arr = code.split("https://trackya.co.uk/return/")
      console.log("split: ", arr)
      if (arr.length > 0) {
        showToast(arr[1])
        navigation.navigate('LostForm', {code: arr[1]})
      } else {
        alert("QR code not valid")
        navigation.goBack()
      }
  };

  const showToast = (code) => {
    Toast.show({
      type: 'success',
      text1: 'QR Detected',
      text2: code
    });
  }

  
      return (

        <View style={styles.container}>



            <QrScanner 
                qrRef = {(ref) => qrRefParent = ref }
                onQrFound={(code) => onQRdetect(code)}
                onBack={() => navigation.goBack() } 
            />

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
        marginLeft: 20
    },

    infoBtn: {
        backgroundColor: "#19826d",
        padding: 10,
        borderRadius: 8
    }
      

    })
    
    
    const LostContainer = connect(state => ({ appReducer: state }))(Lost);
    export default LostContainer