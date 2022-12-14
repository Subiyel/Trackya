import React, { useState,useRef,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, Dimensions, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyBack }  from '../components';
import { u } from "../util/Utilities";
import { Provider, connect } from 'react-redux';
import {CountryPicker} from "react-native-country-codes-picker";
import * as types from "../store/actions/types";
import { ApiConstants } from "../api/ApiConstants";
import ApiFormData from "../api/ApiFromData";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSelector from 'react-native-modal-selector'
import { useIsFocused } from "@react-navigation/native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const width = Dimensions.get('window').width;


function LostForm({ route, appReducer, dispatch, navigation }) {
  

  const [productType, setProductType] = useState('Smart Tag');

  const [qrCode1, setQrCode1] = useState('');
  const [qrCode2, setQrCode2] = useState('');
  const [qrCode3, setQrCode3] = useState('');

  const [itemDesc, setItemDesc] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [imageType, setImageType] = useState(null);

  
  const [countryCode, setCountryCode] = useState('+44');
  const [countryPicker, setCountryPicker] = useState(false);

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
  const firstRef = useRef(0);
  const lastRef = useRef(0);
  const emailRef = useRef(0);
  const itemDesRef = useRef(0);
  const isFocused = useIsFocused();




    useEffect(() => {
        if (isFocused) {
            console.log(route.params)
            if(route.params.code && route.params.code.length > 8) {
                setQrCode1(route.params.code.substring(0,5))
                setQrCode2(route.params.code.substring(5,10))
                setQrCode3(route.params.code.substring(10,15))
            } else {
                alert("Qr Code is not valid")
            }
        }
    }, [isFocused]);



    const clearFields = () => {
      setQrCode1("")
      setQrCode2("")
      setQrCode3("")
      setFirstName("")
      setLastName("")
      setPhone("")
      setImagePath("")
      setImageType("")
      setItemDesc("")
    }


    const openCamera = async () => {
      const options = {
        mediaType: "photo"
      }
      const result = await launchCamera(options);
      console.log(result)
      if (result && result.assets && result.assets.length > 0) {
        setImagePath(result.assets[0].uri)
        setImageType(result.assets[0].type)
      }
    }



    const validateForm = () => {
        if (u.isNullorEmpty(email)){
        alert("Email is mandatory")
        }  else {
        submitReport()
        }
    }

    const submitReport = async () => {

      const form = new FormData();

      if(!u.isNullorEmpty(imagePath)){
        form.append('image', {
          uri: imagePath,
          type: imageType,
          name: imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length),
        })
      }

      form.append("uid", route.params.code)
      form.append("first_name", firstName)
      form.append("last_name", lastName)
      form.append("email", email)
      form.append("phone", countryCode + "" + phone)
      form.append("message", itemDesc)
      
      
        console.log("FormData: ", form)
        setLoading(true)
        const res = await ApiFormData(ApiConstants.BASE_URL + ApiConstants.LOST_ITEM, form, "POST")
        setLoading(false)
        console.log("Response:\n", res)
        
        if (res && res.status == "success" && res.message) {
        alert(res.message)
        clearFields()
        } else if (res && res.message) {
        alert(res.message)
        } else {
        alert("Network Error")
        }
    }
  
      return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
          <MyBack  {...navigation} />
          <ScrollView>
          <View style={styles.containerWrapper}>
          
          
              {/* <MyImage source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} /> */}
              <MyText style={styles.txt1}>Please enter below details to</MyText>
              <MyText style={styles.txt2}>Report Found</MyText>


                


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
                    <MyText style={ styles.fieldText }>Your Email</MyText>   
                    <TextInput ref={ emailRef } value={ email } placeholder={"Email"} onChangeText={(text)=> setEmail(text) } style={ email == '' ? styles.otp : styles.otpFilled } onBlur={()=> { emailRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                    {/* { emailErr && <MyText style={styles.errMsg}>An account with this email already exists</MyText> } */}
                </View>
            </View>


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
                    <MyText style={ styles.fieldText }>Message</MyText>   
                    <TextInput ref={ itemDesRef } value={ itemDesc } placeholder={"Description here"} onChangeText={(text)=> setItemDesc(text) } style={ itemDesc == '' ? styles.otp : styles.otpFilled } onBlur={()=> { itemDesRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                    {/* { emailErr && <MyText style={styles.errMsg}>An account with this email already exists</MyText> } */}
                </View>
            </View>


      
            <View style={styles.row1}>

                <View style={styles.view20}> 
                    <MyText style={ styles.fieldText }>Country</MyText>   
                    <TouchableOpacity style={styles.codeButton} onPress={()=> setCountryPicker(true)}>
                    <MyText style={styles.codeTxt}>{countryCode}</MyText>
                    </TouchableOpacity>
                </View>

                <View style={styles.view80}> 
                    <MyText style={ styles.fieldText }>Phone</MyText>   
                    <TextInput keyboardType = 'numeric' ref={ phoneRef } value={ phone } placeholder={"Phone No"} onChangeText={(text)=> setPhone(text) } style={ phone == '' ? styles.otp : styles.otpFilled } onBlur={()=> {  phoneRef.current.setNativeProps({style:{borderColor: "black"}})}} />
                </View>

            </View>


            <CountryPicker
              show={countryPicker}
              initialState={'United'}
              enableModalAvoiding={true}
              pickerButtonOnPress={(item) => { console.log("item====> ", item)
              setCountryCode(item.dial_code);
              setCountryPicker(false);
              }}
            />


            <View style={styles.row1}>

                <View style={styles.fullView}> 
                    <MyText style={ styles.fieldText }>Upload Image (Optional)</MyText>   
                    <TouchableOpacity style={styles.codeButton} onPress={()=> openCamera()}>
                      <MyText style={styles.codeTxt}>Upload</MyText>
                    </TouchableOpacity>
                </View>

            </View>


            <TouchableOpacity onPress={()=> openCamera() } style={styles.coverButton}>
             { imagePath == null ?
                <View style={{ justifyContent: 'center',  }}>
                    <Icon name={ "camera" } size={23} color="#00000060" style={{ alignSelf: 'center' }} />
                    <MyText style={{ color: "#00000060", marginTop: 5 }}>Add Photo</MyText>
                </View>
                : 
                <Image source={{ uri: imagePath }}  style={{ width: '100%', height: 150 }} />
                }
            </TouchableOpacity>  
           


            <MyButton isLoading={isLoading} onPress={()=> validateForm()} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Activate'} />



        

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
        marginHorizontal: 25,
        paddingBottom: 100,

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
      },

      coverButton: {
        backgroundColor: '#e8e8e8',
        height: 150,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    })
    
    
    const LostFormContainer = connect(state => ({ appReducer: state }))(LostForm);
    export default LostFormContainer