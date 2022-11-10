import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { Provider, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';


function Login({ route, appReducer, dispatch, navigation }) {
  


  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [passVisible, togglePass] = useState(false);
  const [emailErr, toggleEmailErr] = useState(false);
  const emailRef = useRef(0);
  const passRef = useRef(0);  

  const revealPassword = () => {
    togglePass(!passVisible)
  }

  const validateForm = () => {
    
  }
  
      return (

        <View style={styles.container}>
          <MyBack  {...navigation} />
          <View style={styles.containerWrapper}>
          
          
              <MyImage source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} />
              <MyText style={styles.txt1}>Proceed with your</MyText>
              <MyText style={styles.txt2}>Login</MyText>


              <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Your Email</MyText>   
                    <TextInput ref={ emailRef } value={ email } placeholder={"Email"} onChangeText={(text)=> setEmail(text) } style={ email == '' ? styles.otp : styles.otpFilled } onBlur={()=> { toggleEmailErr(false); emailRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                    {/* { emailErr && <MyText style={styles.errMsg}>An account with this email already exists</MyText> } */}
                </View>
            </View>


              <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Your Password</MyText>   
                    <View style={{ flexDirection:'row', alignItems:'center' }}> 
                      <TextInput ref={ passRef } value={ password } secureTextEntry={!passVisible} placeholder={"Password"} onChangeText={(text)=> setPassword(text) } style={ password == '' ? styles.otp : styles.otpFilled } onBlur={()=> passRef.current.setNativeProps({style:{borderColor: "black"}})} />
                          <TouchableHighlight onPress={()=> revealPassword()} style={{ height: 35, width: 33, position: 'absolute', right: 10, top: 4, elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                          <Icon name={ passVisible ? "eye-off" : "eye" } size={14} color="#000"/>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>

            <MyButton isLoading={false} onPress={()=> validateForm()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Login'} />

            <MyText style={styles.forgotTxt}>Forgot Password?</MyText>


            <View style={{ flexDirection:'row', alignItems:'center', alignSelf:'center' }}>
            <MyText style={styles.alreadyTxt}>Don’t have an account?</MyText>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}><MyText style={styles.loginTxt}>Sign Up</MyText></TouchableOpacity>
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

      logo: { 
        height: 100,
        width: 360,
        marginTop: 40,
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
        marginTop: 50,
        color: '#616160'
      },

      txt2: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30
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
    
    
    const LoginContainer = connect(state => ({ appReducer: state }))(Login);
    export default LoginContainer