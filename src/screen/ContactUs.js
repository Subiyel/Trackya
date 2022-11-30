import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyHeader }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import Api from "../api/Api";

function ContactUs({ route, appReducer, dispatch, navigation }) {
  

  
  const firstRef = useRef(0);
  const phoneRef = useRef(0);
  const emailRef = useRef(0);
  const subjectRef = useRef(0);
  const msgRef = useRef(0);
  
  const isFocused = useIsFocused();
  const [email, setEmail] = useState(appReducer.appReducer.email);
  const [firstName, setFirstName] = useState(appReducer.appReducer.name);
  const [phone, setPhone] = useState(appReducer.appReducer.phone);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setLoading] = useState(false);


    useEffect(() => {
      if (isFocused) {
        console.log(appReducer.appReducer)
      }
  }, [isFocused]);


  const sendMessage = async () => {
    let data = {
        first_name: firstName,
        last_name: "User",
        subject: subject,
        email: email,
        phone: phone,
        message: msg
    }

    setLoading(true)
    const res = await Api(ApiConstants.BASE_URL + ApiConstants.CONTACT_US, data, "POST", appReducer.appReducer.authToken)
    setLoading(false)
    
    if (res && res.status == "success"){
      alert(res.message)
      navigation.goBack()
    } else if (res && res.message) {
      alert(res.message)
    } else {
      alert("Network Error")
    }


  }
  
      return (

        <View style={styles.container}>
        <MyHeader title="Support" {...navigation} />
        <ScrollView>
          <View style={styles.containerWrapper}>
          
            {/* <MyText>Please fill o</MyText> */}
             <View style={styles.formView}>


                <View style={styles.row1}>
                    <View style={styles.halfView}> 
                        <MyText style={ styles.fieldText }>First Name</MyText>   
                        <TextInput ref={ firstRef } value={ firstName } placeholder={"First Name"} onChangeText={(text)=> setFirstName(text) } style={ firstName == '' ? styles.otp : styles.otpFilled } onBlur={()=> firstRef.current.setNativeProps({style:{borderColor: "black"}})} />
                    </View>

                    <View style={styles.halfView}> 
                        <MyText style={ styles.fieldText }>Email</MyText>   
                        <TextInput editable={false} ref={ emailRef } value={ email } placeholder={"Email"} onChangeText={(text)=> setEmail(text) } style={ email == '' ? styles.otp : styles.otpFilled } onBlur={()=> emailRef.current.setNativeProps({style:{borderColor: "black"}})} />
                    </View>
                </View>


                <View style={{ marginTop: 20 }}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Phone</MyText>   
                    <TextInput ref={ phoneRef }  keyboardType = 'numeric' value={ phone } placeholder={"Phone No"} onChangeText={(text)=> setPhone(text) } style={ phone == '' ? styles.otp : styles.otpFilled } onBlur={()=> {  phoneRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                </View>


                <View style={{ marginTop: 20 }}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Subject</MyText>   
                    <TextInput ref={ subjectRef } value={ subject } placeholder={"Subject"} onChangeText={(text)=> setSubject(text) } style={ subject == '' ? styles.otp : styles.otpFilled } onBlur={()=> {  subjectRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                </View>
                </View>



                <View style={{ marginTop: 20 }}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Message</MyText>   
                    <TextInput multiline ref={ msgRef } value={ msg } placeholder={"Message"} onChangeText={(text)=> setMsg(text) } style={ msg == '' ? styles.otpMulti : styles.otpFilledMulti } onBlur={()=> {  msgRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                </View>
                </View>


                <MyButton isLoading={isLoading} onPress={()=> sendMessage()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Update'} />


                </View>



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
        backgroundColor: "#E1E1E1",
      },
      formView: {
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 40
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
      view80:{
        width: '75%',
      },
      view20:{
        width: '15%',
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


      otpMulti: {
        height: 120,
        borderRadius: 2,
        borderColor: "#babab8",
        width: '100%',
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: "#babab8",
        textAlignVertical: "top"
      },
    
      otpFilledMulti: {
        height: 120,
        borderRadius: 2,
        width: '100%',
        borderColor: "#babab8",
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: '#000000',
        textAlignVertical: "top"
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
    })
    
    
    const ContactUsContainer = connect(state => ({ appReducer: state }))(ContactUs);
    export default ContactUsContainer