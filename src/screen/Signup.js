import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, KeyboardAvoidingView, TouchableHighlight, TouchableOpacity, Image, TextInput, Dimensions, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { u } from "../util/Utilities";
import { Provider, connect } from 'react-redux';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import {CountryPicker} from "react-native-country-codes-picker";
import * as types from "../store/actions/types";
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import Icon from 'react-native-vector-icons/Ionicons';
const width = Dimensions.get('window').width;


function Signup({ route, appReducer, dispatch, navigation }) {
  
  
  const [countryCode, setCountryCode] = useState('+92');
  const [countryPicker, setCountryPicker] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [passVisible, togglePass] = useState(false);
  const [emailErr, toggleEmailErr] = useState(false);
  const firstRef = useRef(0);
  const phoneRef = useRef(0);
  const lastRef = useRef(0);
  const emailRef = useRef(0);
  const passRef = useRef(0); 
  const confirmRef = useRef(0);
 

  const revealPassword = () => {
    togglePass(!passVisible)
  }

  const validateForm = () => {
    if (u.isNullorEmpty(email)){
      alert("Email is mandatory")
    } else if (u.isNullorEmpty(password)){
      alert("Password is mandatory")
    } else if (u.isNullorEmpty(firstName)){
      alert("Name is mandatory")
    } else if (u.isNullorEmpty(lastName)){
      alert("Name is mandatory")
    } else if (u.isNullorEmpty(phone)){
      alert("Name is mandatory")
    } else {
      signupUser()
    }
  }

  const signupUser = async () => {
    let data = {
      "name": firstName + " " + lastName,
      "email": email,
      "phone": countryCode + "" + phone,
      "password": password,
      "fcm_token": appReducer.appReducer.fcmToken
    }
  
    setLoading(true)
    const res = await Api(ApiConstants.BASE_URL + ApiConstants.SIGNIN, data, "POST")
    setLoading(false)
    
    if (res && res.status == "success"){
      let data = {...res.data}
      console.log("Signup:\n", data)
      dispatch({ type: types.SIGNUP, data })
      navigation.navigate("BottomTabs")
    } else if (res && res.message) {
      alert(res.message)
    } else {
      alert("Network Error")
    }
  }
  
      return (

        <KeyboardAvoidingView keyboardVerticalOffset={Platform.select({ ios: 30, android: 50 })} behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
          <MyBack  {...navigation} />
          <ScrollView>
          <View style={styles.containerWrapper}>
          
          
              <Image source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} />
              <MyText style={styles.txt1}>Create your account</MyText>
              <MyText style={styles.txt2}>SignUp</MyText>


              <View style={styles.row1}>
              <View style={styles.halfView}> 
                <MyText style={ styles.fieldText }>First Name</MyText>   
                <TextInput ref={ firstRef } value={ firstName } placeholder={"First Name"} onChangeText={(text)=> setFirstName(text) } style={ firstName == '' ? styles.otp : styles.otpFilled } onBlur={()=> firstRef.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>

              <View style={styles.halfView}> 
                <MyText style={ styles.fieldText }>Last Name</MyText>   
                <TextInput ref={ lastRef } value={ lastName } placeholder={"Last Name"} onChangeText={(text)=> setLastName(text) } style={ lastName == '' ? styles.otp : styles.otpFilled } onBlur={()=> lastRef.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>
            </View>

              <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Your Email</MyText>   
                    <TextInput ref={ emailRef } value={ email } placeholder={"Email"} onChangeText={(text)=> setEmail(text) } autoCapitalize='none' style={ email == '' ? styles.otp : styles.otpFilled } onBlur={()=> { toggleEmailErr(false); emailRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                    {/* { emailErr && <MyText style={styles.errMsg}>An account with this email already exists</MyText> } */}
                </View>
            </View>


              <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Your Password</MyText>   
                    <View style={{ flexDirection:'row', alignItems:'center' }}> 
                      <TextInput ref={ passRef } value={ password } secureTextEntry={!passVisible} autoCapitalize='none' placeholder={"Password"} onChangeText={(text)=> setPassword(text) } style={ password == '' ? styles.otp : styles.otpFilled } onBlur={()=> passRef.current.setNativeProps({style:{borderColor: "black"}})} />
                          <TouchableHighlight onPress={()=> revealPassword()} style={{ height: 35, width: 33, position: 'absolute', right: 10, top: 4, elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                          <Icon name={ passVisible ? "eye-off" : "eye" } size={14} color="#000"/>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>

            <BoxPasswordStrengthDisplay wrapperStyle={{ marginTop: 10 }} password={ password } minLength={3} width={ width - 80 } />



            <View style={styles.row1}>

                <View style={styles.view20}> 
                    <MyText style={ styles.fieldText }>Country</MyText>   
                    <TouchableOpacity style={styles.codeButton} onPress={()=> setCountryPicker(true)}>
                      <MyText style={styles.codeTxt}>{countryCode}</MyText>
                    </TouchableOpacity>
                </View>

                <View style={styles.view80}> 
                    <MyText style={ styles.fieldText }>Phone</MyText>   
                    <TextInput ref={ phoneRef }  keyboardType = 'numeric'  value={ phone } placeholder={"Phone No"} onChangeText={(text)=> setPhone(text) } style={ phone == '' ? styles.otp : styles.otpFilled } onBlur={()=> {  phoneRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                </View>
            </View>


            <CountryPicker
              initialState={'United'}
              enableModalAvoiding={true}
              show={countryPicker}
              pickerButtonOnPress={(item) => { console.log("item====> ", item)
                setCountryCode(item.dial_code);
                setCountryPicker(false);
              }}
            />


            <MyButton isLoading={isLoading} onPress={()=> validateForm()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Register'} />



            <View style={{ flexDirection:'row', alignItems:'center', alignSelf:'center', marginBottom: 40 }}>
            <MyText style={styles.alreadyTxt}>Already Have an Account?</MyText>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}><MyText style={styles.loginTxt}>Login instead</MyText></TouchableOpacity>
            </View>

          </View>
          </ScrollView>
        </KeyboardAvoidingView>
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

      logo: { 
        height: 70,
        width: 160,
        marginTop: 20,
        alignSelf: 'center',
        marginRight: 30
      },
      codeButton:{
        padding: 5,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#babab8'
      },
      codeTxt: {
        fontSize: 14
      },

      txt1: {
        fontSize: 22,
        fontWeight: '200',
        marginTop: 30,
        color: '#616160'
      },

      txt2: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30
      },

      otp: {
        height: 40,
        borderRadius: 2,
        borderColor: "#babab8",
        width: '100%',
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: "#babab8",
      },
    
      otpFilled: {
        height: 40,
        borderRadius: 2,
        width: '100%',
        borderColor: "#babab8",
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: '#000000'
      },

      

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
      },

      text2:{
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 14,
        marginTop: 24
      },
      textSubmit:{
        fontSize: 16,
        color:'#000000',
      },
      signUpTxt: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#000000',
          textAlign: 'center',
          marginTop: 5
      },
      detailTxt: {
        fontSize: 14,
        color: '#00000060',
        textAlign: 'center',
        marginTop: 16,
        // marginBottom: 24
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
      view80:{
        width: '75%',
      },
      view20:{
        width: '15%',
      },
      buttonSubmit:{
        marginTop: 40,
        borderRadius: 2,
        borderColor: '#00000010',
        alignSelf: 'center',
        width:'100%',
        height: 40
      },
      submitTxt: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      alreadyTxt: {
        color: '#000000',
        fontSize: 16,
        marginTop: 48,
        textAlign: 'center'
      },

      loginTxt: {
        color: '#000000',
        fontSize: 16,
        marginTop: 48,
        marginLeft: 8,
        fontWeight: 'bold'
      },
      errMsg: { 
        marginTop: 2, 
        color: '#5A1233',  
        fontSize: 12
      },

      forgotTxt: {
        color: '#000000',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
      },
      forgotLabel: {
        color: '#000000',
        fontSize: 16,
        marginTop: 10,
        marginLeft: 5,
        fontWeight: 'bold'
      },

      forgotTxt: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
        color: '#616160'
      }

    })
    
    
    const SignupContainer = connect(state => ({ appReducer: state }))(Signup);
    export default SignupContainer