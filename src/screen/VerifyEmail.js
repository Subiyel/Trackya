import React, { useState, useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity, Image, TextInput } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { Provider, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import * as types from "../store/actions/types";
import { u } from "../util/Utilities";
const width = Dimensions.get('window').width;


function VerifyEmail({ route, appReducer, dispatch, navigation }) {
  


  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const title = "Forgot Password";
  const subtitle = "Enter the registered email address";
  

  const sendOTP = async () => {

      if(!u.validateEmail(email)){
        alert("Please enter valid email")
      } else {
          
          setLoading(true)
          const res = await Api(ApiConstants.BASE_URL + ApiConstants.VERIFY_EMAIL, {email: email.toLowerCase()}, "POST")
          setLoading(false)

          if(res && res.status && res.status == "success" ){
            console.log("OTP: ", res)
            navigation.navigate('VerifyOTP', {params: {"email": email.toLowerCase()}})
          } else if (res && res.status != "success") {
            alert(res.message)
          } else {
            alert("Server Down")
          }

      }
  }


      return (

        <ScrollView style={styles.scrollview}>
            <MyBack  {...navigation} />
           

            <View style={ styles.content1 }>
                <MyText style={ styles.signupText }>{title}</MyText>
                <MyText style={ styles.signupText1 }>{subtitle}</MyText>
                <MyText style={ styles.signupText2 }>we will email you a code to reset your password</MyText>


                <TextInput 
                    value={ email } 
                    placeholder={"Enter Email address"}
                    placeholderTextColor={ '#FFF' } 
                    onChangeText={(text)=> setEmail(text) } 
                    style={ email == '' ? styles.TF : styles.TF }  
                />
                    



                <MyButton isLoading={isLoading} label="SEND" buttonStyle={{ marginTop: 50, width: '80%' }} labelStyle={{ fontSize: 16, fontWeight: '500' }} isLoading={isLoading} onPress={()=> sendOTP()} />


           
                
              </View>  


        </ScrollView>
      )
    }
    







    const styles = StyleSheet.create({
      scrollview: {
        backgroundColor: '#FFF',
      },
      containerWrapper: {
        marginTop: 8,
        marginHorizontal: 32,
      },
      text1:{
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 64
      },
      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
      },

      content1: {
            marginHorizontal: 35,
            alignItems: 'center',
          },
    
          content2: {
            paddingHorizontal: 32
          },
    
          signupText: {
            fontSize: 24,
            marginTop: 80,
            fontWeight: '500',
            textAlign: 'center',
            color: '#000000'
          },

          signupText1: {
            fontSize: 14,
            marginTop: 40,
            fontWeight: '400',
            textAlign: 'center',
            color: '#000000'
          },

          signupText2: {
            fontSize: 13,
            marginTop: 10,
            marginBottom: 50,
            fontWeight: '400',
            textAlign: 'center',
            color: '#222222'
          },
    
          subText: {
            fontSize: 12,
            color: '#000000',
            textAlign: 'center',
            marginTop: 20
          },
    
          row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          },
    
          tnc1: {
            color: '#000000',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 'bold',
            marginLeft: 8,
          },
    
          tnc2: {
            fontSize: 12,
            color: '#000000',
            textAlign: 'center',
            fontWeight: '500'
          },
    
          footerLogin: {
            marginTop: 15,
            paddingBottom: 35,
            marginLeft: 5
          },
    
          footerText1: {
            textAlign: 'left',
            fontSize: 13,
            fontWeight: 'bold',
            color: '#000000'
          },
    
    
          footerText2: {
            textAlign: 'left',
            fontSize: 13,
            fontWeight: 'bold',
            color: '#7d83ff',
            marginLeft: 2,
          },
    
          TF: {
            height: 40,
            borderColor: '#000000',
            width: '80%',
            borderBottomWidth: 1,
            fontSize: 16,
            fontWeight: '400',
            paddingVertical: 10,
            color: '#000000',
            marginTop: 10,
            textAlign: 'center'
          },

      
    })
    
    
    const VerifyEmailContainer = connect(state => ({ appReducer: state }))(VerifyEmail);
    export default VerifyEmailContainer