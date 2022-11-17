import React, { useState,useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Overlay from 'react-native-modal-overlay';
import MyText from "./MyText";
import  DynamicPopup  from './DynamicPopup';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function QrScanner(props) {


    const [isInfoVisible, setIsInfoVisible] = useState(false);


    const onSuccess = (e) => {
        console.log('QR Code: ', e)
        props.onQrFound(e.data)
    };

    const onClose = () => {
        setIsInfoVisible(false)
    }

    return (
        <View style={styles.container}>


            <QRCodeScanner
                onRead={(e)=> onSuccess(e)}
                showMarker={true}
                cameraStyle={{ flex: 1, height: '100%' }}
                topViewStyle={{ flex: 0, height: 0 }}
                bottomViewStyle={{ flex: 0, height: 0 }}
                cameraContainerStyle={{ flex: 1, height: '100%', marginTop: 0, marginBottom: 0 }}
            />

            <View style={styles.topView}>
                <View style={styles.row1}>
                     
                     <TouchableOpacity onPress={()=> props.onBack()}>
                        <Icon name="close" size={26} color="#FFF" />
                     </TouchableOpacity> 

                     <MyText style={styles.centerText}> Scan QR Code </MyText>

                     <TouchableOpacity onPress={()=> setIsInfoVisible(true)} style={styles.infoBtn}>
                         <Icon name="information-circle-outline" size={20} color={"#FFF"} />
                     </TouchableOpacity>

                 </View>
            </View>


            <DynamicPopup 
                isVisible={isInfoVisible} 
                title={"Scan QR Code"} 
                onClose={()=> onClose()} 
                imgSrc={ require('../assets/img/qrcode.png') }
                label={"Scan the QR Code on the item to report Lost/Found."}
                onContinue={() => onClose()}
                btnLabel={"Done"}
                />
        </View>

    );
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

});
