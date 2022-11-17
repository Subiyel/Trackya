import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import Overlay from 'react-native-modal-overlay';
import MyText from "./MyText";
import  MyButton  from './MyButton';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function DynamicPopup(props) {



    return (
        <Overlay visible={props.isVisible}  childrenWrapperStyle={{ borderRadius: 6 }}>
           
            <View style={styles.row1}>
              <View />
              <MyText style={ styles.title }>{props.title}</MyText>
              <TouchableOpacity onPress={()=> props.onClose()}>
              <Icon name="close" size={18} color="#000" />
              </TouchableOpacity>
            </View>

            <Image style={styles.faceIDimg}  source={ props.imgSrc }  />
            <MyText style={{ marginTop: 20, textAlign: 'center' }}>{props.label}</MyText> 
            <MyButton isLoading={props.isLoading}  onPress={()=> { props.onContinue() }} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={props.btnLabel} />
       
        </Overlay>
    );
  }

  const styles = StyleSheet.create({
    title: {
        marginLeft: 25,
        fontSize: 18,
        fontWeight: 'bold'
    },

    faceIDimg: {
      marginTop: 20,
      height: 100,
      width: 100,
    },

    row1: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    buttonSubmit:{
        marginTop: 30,
        borderRadius: 2,
        borderColor: '#00000010',
        alignSelf: 'center',
        width:'100%',
        height: 40
        },

});
