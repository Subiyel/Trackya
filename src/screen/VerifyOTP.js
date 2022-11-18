import React, { useState, useRef } from 'react'
import { StyleSheet,  View, Platform, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity, Image, TextInput } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { Provider, connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import * as types from "../store/actions/types";
const width = Dimensions.get('window').width;


function VerifyOTP({ route, appReducer, dispatch, navigation }) {
  


  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passVisible, togglePassVisible] = useState(false);
  
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');
  
  let inputRef1 = null;
  let inputRef2 = null;
  let inputRef3 = null;
  let inputRef4 = null;
  let inputRef5 = null;
  let inputRef6 = null;


  const onOtpEnter = (text, index) => {

    switch (index){
      case 1:
        setOtp1(text)
        if (text != ''){
          inputRef2.focus()
        }
      break;

      case 2:
        setOtp2(text)
        if (text != ''){
          inputRef3.focus()
        }
      break;

      case 3:
        setOtp3(text)
        if (text != ''){
          inputRef4.focus()
        }
      break;

      case 4:
        if (text != ''){
          inputRef5.focus()
        }
        setOtp4(text)
      break;

      case 5:
        if (text != ''){
          inputRef6.focus()
        }
        setOtp5(text)
      break;

      case 6:
        setOtp6(text)
      break;


    }
  }

  const verifyOTP = () => {
    
    let otpCode = otp1 + otp2 + otp3 + otp4 + otp5 +otp6
    console.log("otp: ", otpCode)
    if(otpCode.length < 5){
      alert("Please enter complete code")
    } else {
      sendOTP(otpCode)
    }
  }


  const sendOTP = async (otp) => {
    let data = {
      email: route.params.params.email,
      otp: otp
  }
  
    setLoading(true)
    const res = await Api(ApiConstants.BASE_URL + ApiConstants.VERIFY_OTP, data, "POST")
    setLoading(false)

        if(res && res.status == "success" ) {
            console.log("Validated OTP.. ", route)
            navigation.navigate('ResetPassword', data )
        } else if (res && res.status != "success") {
            alert(res.message)
        } else {
            alert("Server Down")
        }
  }

  
  const resendOTP = () => {
    // alert("OTP sent")
  }


      return (

        <ScrollView style={styles.scrollview}>
            {/* <Header title={ appReducer.appReducer.city + ", " + appReducer.appReducer.state }/> */}
            <MyBack  {...navigation} />
           

            <View style={ styles.content1 }>
                <MyText style={ styles.signupText }>Verification Code</MyText>
                <MyText style={ styles.signupText1 }>Enter the verification code we just sent you on your email address</MyText>


              <View style={styles.row1}>
              <TextInput ref={(r) => inputRef1 = r} value={ otp1 } onChangeText={(text)=> onOtpEnter(text, 1) } style={ otp1 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' autoFocus={true}/>
              <TextInput ref={(r) => inputRef2 = r} value={ otp2 } onChangeText={(text)=> onOtpEnter(text, 2) } style={ otp2 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' onKeyPress={({ nativeEvent }) => {nativeEvent.key === 'Backspace' && otp2 == '' && inputRef1.focus() }} />
              <TextInput ref={(r) => inputRef3 = r} value={ otp3 } onChangeText={(text)=> onOtpEnter(text, 3) } style={ otp3 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' onKeyPress={({ nativeEvent }) => {nativeEvent.key === 'Backspace' && otp3 == '' && inputRef2.focus() }} />
              <TextInput ref={(r) => inputRef4 = r} value={ otp4 } onChangeText={(text)=> onOtpEnter(text, 4) } style={ otp4 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' onKeyPress={({ nativeEvent }) => {nativeEvent.key === 'Backspace' && otp4 == '' && inputRef3.focus() }} />
              <TextInput ref={(r) => inputRef5 = r} value={ otp5 } onChangeText={(text)=> onOtpEnter(text, 5) } style={ otp5 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' onKeyPress={({ nativeEvent }) => {nativeEvent.key === 'Backspace' && otp5 == '' && inputRef4.focus() }} />
              <TextInput ref={(r) => inputRef6 = r} value={ otp6 } onChangeText={(text)=> onOtpEnter(text, 6) } style={ otp6 == '' ? styles.otp : styles.otpFilled } maxLength={1} keyboardType = 'numeric' onKeyPress={({ nativeEvent }) => {nativeEvent.key === 'Backspace' && otp6 == '' && inputRef5.focus() }} />
              </View>
                    



                <MyButton label="VERIFY" buttonStyle={{ marginTop: 50, width: '100%' }} labelStyle={{ fontSize: 16, fontWeight: '500' }} isLoading={isLoading} onPress={()=> verifyOTP()} />

                <View style={ styles.footerLogin }>
                  <View style={styles.row}>
                  <MyText style={ styles.footerText1 }>If you didn't recieve code, </MyText>
                  <TouchableOpacity onPress={()=> resendOTP() }>
                  <MyText style={ styles.footerText2 }>Resend</MyText>
                  </TouchableOpacity>
                  </View>
                </View>
           
                
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
      

      content1: {
            marginHorizontal: Platform.OS == "android" ? 15 : 35,
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

    
          subText: {
            fontSize: 14,
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
            fontSize: 14,
            fontWeight: 'bold',
            marginLeft: 8,
          },
    
          tnc2: {
            fontSize: 14,
            color: '#000000',
            textAlign: 'center',
            fontWeight: '500'
          },
    
          footerLogin: {
            alignItems: 'center',
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
            color: '#19826d',
            marginLeft: 2,
          },
    
          TF: {
            height: 40,
            borderColor: '#ffa600',
            width: '100%',
            borderBottomWidth: 1,
            fontSize: 16,
            fontWeight: '400',
            paddingVertical: 10,
            color: '#000000',
            marginTop: 50
          },


          otp: {
            height: 55,
            width:  50,
            backgroundColor: '#FFF',
            fontSize: 25,
            borderWidth: 2,
            borderColor: '#ffa600',
            color: '#222',
            textAlign: 'center',
            borderRadius: 7,
            marginLeft: Platform.OS == "ios" ? 0 : 4
          },
        
          otpFilled: {
            height: 60,
            width:  52,
            borderWidth: 2,
            borderColor: '#0bbd3b',
            color: '#222',
            fontSize: 25,
            textAlign: 'center',
            backgroundColor: '#FFF',
            borderRadius: 7,
            marginLeft: Platform.OS == "ios" ? 0 : 4
          },

          row1: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginHorizontal: 38,
            marginTop: 46,
          },

      
    })
    
    
    const VerifyOTPContainer = connect(state => ({ appReducer: state }))(VerifyOTP);
    export default VerifyOTPContainer