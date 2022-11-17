import React, { useState,useRef } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, CircleBack, MyStatus }  from '../components';
import { Provider, connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import Api from "../api/Api";
import DatePicker from 'react-native-date-picker'

function MarkLost({ route, appReducer, dispatch, navigation }) {
  


  const [item, setItem] = useState(route.params.item);
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState("");
  const [date1, setDate1] = useState("");
  const [isLoading, setLoading] = useState(false);
  const locationRef = useRef(0);
  const firstRef = useRef(0);
  const descRef = useRef(0);

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

//   console.log(route.params)

  const markLost = async () => {
    let data = {
        uid: item.qr_code,
        lost_date: date1,
        location: location,
        description: desc
  }

        console.log(data)
        setLoading(true)
        const res = await Api(ApiConstants.BASE_URL + ApiConstants.REPORT_LOST, data, "POST", appReducer.appReducer.authToken)
        setLoading(false)

        if(res && res.status == "success" ){
            alert(res.message)
            navigation.goBack()
        } else {
               alert("Server Down")
        }
  }

      return (

        <View style={styles.container}>
        <CircleBack {...navigation} />
        <ScrollView>
          
          
          <MyImage source={{ uri: item.image }} style={styles.img}  />

          <View style={styles.containerWrapper}>

            <View style={styles.row}>
                <View style={{ marginLeft: 30 }}>
                <QRCode value={item.qr_code} />
                </View>

                <View style={{  marginLeft: 20 }}>
                    <MyText style={styles.title}>{item.title}</MyText>
                    <MyText style={styles.desc}>{item.description}</MyText>
                    <MyStatus state={item.status} StatusStyle={{ marginTop: 9 }} />
                </View>

            </View>   


            <View style={{ marginTop: 30, marginHorizontal: 20, padding: 20, borderRadius: 4, backgroundColor: '#FFF' }}>
            
            <View style={styles.row1}>
              <TouchableOpacity onPress={()=> setOpen(true)} style={styles.halfView}> 
                <MyText style={ styles.fieldText }>First Name</MyText>  
                    <View style={styles.dateBtn}>
                        <MyText>{date1}</MyText>
                    </View> 
              </TouchableOpacity>

              <View style={styles.halfView}> 
                <MyText style={ styles.fieldText }>Location</MyText>   
                <TextInput ref={ locationRef } value={ location } placeholder={"Location"} onChangeText={(text)=> setLocation(text) } style={ location == '' ? styles.otp : styles.otpFilled } onBlur={()=> locationRef.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>
            </View>

            
            <View style={styles.fullView}> 
                <MyText style={ styles.fieldText }>Description</MyText>   
                <TextInput ref={ descRef } value={ desc } placeholder={"Description"} onChangeText={(text)=> setDesc(text) } style={ desc == '' ? styles.otp : styles.otpFilled } onBlur={()=> descRef.current.setNativeProps({style:{borderColor: "black"}})} />
              </View>

            </View>


            <MyButton onPress={()=> markLost()} label="Submit" buttonStyle={{ marginTop: 80, width: '80%', alignSelf: 'center' }} />



                        <DatePicker
                            modal                                                                                                    
                            mode = { "date" }
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                let offset = date.getTimezoneOffset()
                                let yourDate = new Date(date.getTime() - (offset*60*1000))
                                setDate1( yourDate.toISOString().split('T')[0] )
                            }}
                            onCancel={() => {
                            setOpen(false)
                            console.log(date)
                            }}
                        />
            
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
      containerWrapper: {
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 50
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
      },

      img: {
        height: 230,
        width: '100%'
      },

      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },

      desc: {
        marginTop: 5,
        fontSize: 14
      }, 

      expiry: {
        fontSize: 14,
        color: '#222',
        marginLeft: 10
      },

    

      label: {
        fontWeight: 'bold',
        fontSize: 14
      },


      fieldText: {
        fontSize: 12,
        color: '#000000',
        marginBottom: 8
      },
      halfView:{
          width: '47%',
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

      fullView:{
        width: '100%',
        marginTop: 20,
    },

    dateBtn: {
        justifyContent: 'center',
        paddingHorizontal: 10, 
        height: 40,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#babab8'
    }

    })
    
    
    const MarkLostContainer = connect(state => ({ appReducer: state }))(MarkLost);
    export default MarkLostContainer