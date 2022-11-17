

import React, { useState, useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity, Image, TextInput } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { Provider, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import * as types from "../store/actions/types";
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
const width = Dimensions.get('window').width;
// var color = colors.Dark;

function ResetPassword({ route, appReducer, dispatch, navigation }) {
  


  const [isLoading, setLoading] = useState(false);


  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passVisible, togglePass] = useState(false);
  const [confirmVisible, toggleConfirm] = useState(false);
  const [emailErr, toggleEmailErr] = useState(false);
  const firstRef = useRef(0);
  const lastRef = useRef(0);
  const emailRef = useRef(0);
  const passRef = useRef(0);
  const confirmRef = useRef(0);

  // const toast = useToast();
console.log("route", route)

  const revealPassword = () => {
    togglePass(!passVisible)
  }

  const revealConfirm = () => {
    toggleConfirm(!confirmVisible)
  }

  const validateForm = () => {

    let flag = true
    
    

     if(password == ""){
      alert('Password Canot be empty')
      flag = false;
    }

    else if(password.length < 5 ){
      alert('Password Canot be less than 5 digits')
      flag = false;
    }

    else if(confirm == ""){
      alert('Confirm Password Canot be empty')
      flag = false;
    }

    else if(confirm != password){
      alert('Passwords does not match')
      flag = false;
    }

      if(flag){
        ResetPassword()
      }
  }

  const ResetPassword = async () => {
        let data = {
            email: route.params.email,
            new_password: password,
            otp: route.params.otp
        }  
        console.log("params: ", data)
        setLoading(true)
        const res = await Api(ApiConstants.BASE_URL + ApiConstants.RESET_PASS, data, "POST")
        setLoading(false)
        if(res && res.status == "success" ){
         alert(res.message)
          navigation.navigate('Login')
        } else if (res && res.status != "success") {
            alert(res.message)
        } else {
            alert("Server Down")
        }
      }
  


      return (

        <ScrollView style={styles.scrollview}>
            {/* <Header title={ appReducer.appReducer.city + ", " + appReducer.appReducer.state }/> */}
            <MyBack  {...navigation} />
           

            <View style={ styles.content1 }>
                <MyText style={ styles.signupText }>Create Password</MyText>
                <MyText style={ styles.signupText1 }>Enter the new password</MyText>


         

                <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Create a password</MyText>   
                    <View style={{ flexDirection:'row', alignItems:'center' }}> 
                      <TextInput ref={ passRef } value={ password } secureTextEntry={!passVisible} placeholder={"Password"} onChangeText={(text)=> setPassword(text) } style={ password == '' ? styles.otp : styles.otpFilled } onBlur={()=> passRef.current.setNativeProps({style:{borderColor: "#000"}})} />
                          <TouchableHighlight onPress={()=> revealPassword()} style={{ height: 35, width: 33, position: 'absolute', right: 10, top: 4, elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                          <Icon name={ passVisible ? "eye-off" : "eye" } size={14} color="#000"/>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>


            
            <BoxPasswordStrengthDisplay wrapperStyle={{ marginTop: 10 }} password={ password } minLength={3} width={ width - 80 } />


            <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Re-enter password</MyText> 
                    <View style={{ flexDirection:'row', alignItems:'center' }}> 
                    <TextInput ref={ confirmRef } value={ confirm } secureTextEntry={!confirmVisible} placeholder={"Password"} onChangeText={(text)=> setConfirm(text) } style={ confirm == '' ? styles.otp : styles.otpFilled } onBlur={()=> confirmRef.current.setNativeProps({style:{borderColor: "#000"}})} />
                    <TouchableHighlight onPress={()=> revealConfirm()} style={{ height: 35, width: 33, position: 'absolute', right: 10, top: 4, elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                    <Icon name={ confirmVisible ? "eye-off" : "eye" } size={14} color="#000"/>
                    </TouchableHighlight>
                    </View> 
                </View>
            </View>


                <MyButton isLoading={isLoading} label="DONE" buttonStyle={{ marginTop: 50, width: '100%' }} labelStyle={{ fontSize: 13, fontWeight: '500' }} onPress={()=> validateForm()} />
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
      content1: {
        marginHorizontal: 35,
      },

      content2: {
        paddingHorizontal: 32
      },

      signupText: {
        fontSize: 24,
        marginTop: 80,
        marginBottom: 10,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000'
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
      },


      footerText2: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7d83ff',
        marginLeft: 2,
      },

     

      signupText1: {
        fontSize: 16,
        marginTop: 20,
        fontWeight: '400',
        textAlign: 'center',
        color: '#000000'
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

      fieldText: {
        fontSize: 12,
        color: '#000000',
        marginBottom: 8
      },
      halfView:{
          width: '47%',
      },
      fullView:{
          width: '100%',
      },

      otp: {
        height: 40,
        borderRadius: 2,
        borderColor: "#000",
        width: '100%',
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: "#000",
      },
    
      otpFilled: {
        height: 40,
        borderRadius: 2,
        width: '100%',
        borderColor: "#000",
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: '#000000'
      },

    })
    
    
    const ResetPasswordContainer = connect(state => ({ appReducer: state }))(ResetPassword);
    export default ResetPasswordContainer;