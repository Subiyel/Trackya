import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack, MyBioLogin }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import Toast from 'react-native-toast-message';

function Login({ route, appReducer, dispatch, navigation }) {
  


  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isBioLoading, setBioLoading] = useState(false);
  const [passVisible, togglePass] = useState(false);
  const [emailErr, toggleEmailErr] = useState(false);
  const emailRef = useRef(0);
  const passRef = useRef(0);  


  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Login Successfully 👋'
    });
  }
  
  const revealPassword = () => {
    togglePass(!passVisible)
  }

  const validateForm = () => {
    if (u.isNullorEmpty(email)){
      alert("Email is mandatory")
    } else if (u.isNullorEmpty(password)){
      alert("Password is mandatory")
    } else {
      let params = {
        "password": password,
        "email": email,
        "type": ""
      }
      loginUser(params)
    }
  }

  const loginUser = async (params) => {

      setLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.LOGIN, params, "POST")
      setLoading(false)
      
      if (res && res.status == "success"){
        let data = {...res.data}
        console.log("Login:\n\n\n", data)
        // showToast()
        dispatch({ type: types.LOGIN, data })
        navigation.navigate("BottomTabs")
      } else if (res && res.message) {
        alert(res.message)
      } else {
        alert("Network Error")
      }


  }

  const biometricLogin = async () => {

    setTimeout(()=> {
      setBioLoading(false)
    }, 3000)

    console.log("FaceID Login")
    setBioLoading(true)
    let { isSupported, type } = await u.checkDeviceBiometrics()
    if (isSupported) {
      sendBiometricLogin(type)
    }
      
  }

  const sendBiometricLogin = (biometricType) => {
  // const rnBiometrics = new ReactNativeBiometrics()
  //   rnBiometrics.biometricKeysExist().then((resultObject) => {
  //   const { keysExist } = resultObject

  //   if (keysExist) {
  //     console.log('Keys exist', resultObject)
  //   } else {
  //     console.log('Keys do not exist or were deleted')
  //   }
  // })

    u.triggerBiometric().then((resultObject) => {
      let params = {
        type: biometricType,
        hash_id: appReducer.appReducer.publicToken,
      }
      loginUser(params)  
    }).catch(() => {
      setLoading(false)
      alert("Biometric Auth Failed")
    })


  }
  
      return (

        <View style={styles.container}>
        <ScrollView>
          <MyBack  {...navigation} />
          <View style={styles.containerWrapper}>
          
          
              <Image source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} />
              <MyText style={styles.txt1}>Proceed with your</MyText>
              <MyText style={styles.txt2}>Login</MyText>


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
                      <TextInput ref={ passRef } value={ password } secureTextEntry={!passVisible} placeholder={"Password"} autoCapitalize='none' onChangeText={(text)=> setPassword(text) } style={ password == '' ? styles.otp : styles.otpFilled } onBlur={()=> passRef.current.setNativeProps({style:{borderColor: "black"}})} />
                          <TouchableHighlight onPress={()=> revealPassword()} style={{ height: 35, width: 33, position: 'absolute', right: 10, top: 4, elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                          <Icon name={ passVisible ? "eye-off" : "eye" } size={14} color="#000"/>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={()=> navigation.navigate('VerifyEmail')} style={{ justifyContent: 'flex-end' }}>
            <MyText style={styles.forgotTxt}>Forgot Password?</MyText>
            </TouchableOpacity>

            <MyButton isLoading={isLoading} onPress={()=> validateForm()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Login'} />

            <MyText style={styles.txt3}>OR SIGN IN WITH</MyText>

            <MyBioLogin isLoading={isBioLoading} onPress={()=> biometricLogin()} />

            <View style={{ flexDirection:'row', alignItems:'center', alignSelf:'center' }}>
            <MyText style={styles.alreadyTxt}>Don’t have an account?</MyText>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}><MyText style={styles.loginTxt}>Sign Up</MyText></TouchableOpacity>
            </View>

          </View>
          </ScrollView>
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

      logo: { 
        height: 100,
        width: 360,
        marginTop: 10,
        alignSelf: 'center',
        marginRight: 20
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

      txt1: {
        fontSize: 22,
        fontWeight: '200',
        marginTop: 10,
        color: '#616160'
      },

      txt2: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
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
      buttonSubmit:{
        marginTop: 30,
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
        marginTop: 32,
        textAlign: 'center'
      },

      loginTxt: {
        color: '#000000',
        fontSize: 16,
        marginTop: 32,
        marginLeft: 8,
        fontWeight: 'bold'
      },
      errMsg: { 
        marginTop: 2, 
        color: '#5A1233',  
        fontSize: 12
      },

      
      forgotTxt: {
        fontSize: 11,
        textAlign: 'right',
        marginTop: 10,
        color: '#616160'
      },

      txt3: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 15,
        color: '#616160'
      }

    })
    
    
    const LoginContainer = connect(state => ({ appReducer: state }))(Login);
    export default LoginContainer