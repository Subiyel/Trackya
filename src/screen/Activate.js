import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Dimensions, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { u } from "../util/Utilities";
import { Provider, connect } from 'react-redux';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import {CountryPicker} from "react-native-country-codes-picker";
import * as types from "../store/actions/types";
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector'

const width = Dimensions.get('window').width;


function Activate({ route, appReducer, dispatch, navigation }) {
  

  const [productType, setProductType] = useState('Smart Tag');

  const [qrCode1, setQrCode1] = useState('TSTS');
  const [qrCode2, setQrCode2] = useState('');
  const [qrCode3, setQrCode3] = useState('');

  const [itemDesc, setItemDesc] = useState('');

  
  const [countryCode, setCountryCode] = useState('+92');
  const [countryPicker, setCountryPicker] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [passVisible, togglePass] = useState(false);
  const qrRef1 = useRef(0);
  const phoneRef = useRef(0);
  const qrRef2 = useRef(0);
  const qrRef3 = useRef(0);
  const itemDesRef = useRef(0);
 
  const PRODUCT_TYPES = [
    { key: 1, label: "Smart Tag"}, 
    { key: 2, label: "Tracker"},
    { key: 3, label: "Passport Cover"}
    ]

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
      "password": password
    }
  
    setLoading(true)
    const res = await Api(ApiConstants.BASE_URL + ApiConstants.SIGNIN, data, "POST")
    setLoading(false)
    
    if (res && res.status == "success"){
      let data = {...res.data}
      console.log("Signup:\n", data)
      dispatch({ type: types.SIGNUP, data })
    } else if (res && res.message) {
      alert(res.message)
    } else {
      alert("Network Error")
    }
  }
  
      return (

        <View style={styles.container}>
          <MyBack  {...navigation} />
          <View style={styles.containerWrapper}>
          
          
              {/* <MyImage source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} /> */}
              <MyText style={styles.txt1}>Please enter below details to</MyText>
              <MyText style={styles.txt2}>Activate</MyText>


                <View style={styles.row1}>
                    <View style={styles.fullView}> 
                        <MyText style={ styles.fieldText }>Please select your product:</MyText>
                        <ModalSelector
                            data={PRODUCT_TYPES}
                            initValue="Smart Tag"
                            supportedOrientations={['portrait']}
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(option)=>{ setProductType(option.label)}}>

                            <TouchableOpacity style={styles.selectorButton} onPress={()=> alert("3")}>
                            <MyText style={styles.selectorTxt}>{productType}</MyText>
                            </TouchableOpacity>
                            
                        </ModalSelector>
                    </View>
                </View>


              <View style={styles.row1}>
              <View style={styles.view30}> 
                <MyText style={ styles.fieldText }>QR Code</MyText>   
                <TextInput ref={ qrRef1 } value={ qrCode1 } placeholder={"QR Code"} onChangeText={(text)=> setQrCode1(text) } style={ qrCode1 == '' ? styles.otp : styles.otpFilled } onBlur={()=> qrRef1.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>

              <View style={styles.view30}> 
                <MyText style={ styles.fieldText }></MyText>   
                <TextInput ref={ qrRef2 } value={ qrCode2 } placeholder={"xxxxx"} onChangeText={(text)=> setQrCode2(text) } style={ qrCode2 == '' ? styles.otp : styles.otpFilled } onBlur={()=> qrRef2.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>

              <View style={styles.view30}> 
                <MyText style={ styles.fieldText }></MyText>   
                <TextInput ref={ qrRef3 } value={ qrCode3 } placeholder={"xxxxx"} onChangeText={(text)=> setQrCode3(text) } style={ qrCode3 == '' ? styles.otp : styles.otpFilled } onBlur={()=> qrRef3.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>
            </View>

              <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Item Description</MyText>   
                    <TextInput ref={ itemDesRef } value={ itemDesc } placeholder={"Description here"} onChangeText={(text)=> setItemDesc(text) } style={ itemDesc == '' ? styles.otp : styles.otpFilled } onBlur={()=> { itemDesRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                    {/* { emailErr && <MyText style={styles.errMsg}>An account with this email already exists</MyText> } */}
                </View>
            </View>


      



            <View style={styles.row1}>

                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Upload Image (Optional)</MyText>   
                    <TouchableOpacity style={styles.codeButton} onPress={()=> alert('4')}>
                      <MyText style={styles.codeTxt}>Upload</MyText>
                    </TouchableOpacity>
                </View>

            </View>


           


            <MyButton isLoading={isLoading} onPress={()=> validateForm()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Activate'} />



           

            {/* <ModalSelector
                    data={PRODUCT_TYPES}
                    initValue="Smart Tag"
                    supportedOrientations={['portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option)=>{ setProductType(option.label)}}>

                <View style={styles.row1}>
                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Business Category</MyText>   
                    
                    <View style={{ flexDirection:'row', alignItems:'center', elevation: 10, zIndex: 100 }}> 
                    <TextInput value={ businessCategory } placeholder={"e.g. Lawyer, Auto Shop, Resturant"} editable={false} style={ businessCategory == '' ? styles.otp : styles.otpFilled }  />
                    <View  style={{ height: 15, width: 18, position: 'absolute', right: 20,  }} >
                    <Icon name={ "arrow-down" } size={14} color="#000"/>
                    </View>
                    </View> 
                </View>
                </View>
            </ModalSelector> */}

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
        borderColor: '#babab8',
        backgroundColor: '#babab8'
      },

      codeTxt: {
        fontSize: 14,
        textAlign: 'center'
      },

      selectorButton:{
        padding: 5,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#babab8',
      },

      selectorTxt: {
        fontSize: 14,
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
      view30:{
        width: '28%',
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
    
    
    const ActivateContainer = connect(state => ({ appReducer: state }))(Activate);
    export default ActivateContainer