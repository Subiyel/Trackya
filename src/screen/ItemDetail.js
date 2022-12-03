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
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';


function ItemDetail({ route, appReducer, dispatch, navigation }) {
  

  const [item, setItem] = useState(route.params.item);
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState(route.params.item.title);
  const [desc, setDesc] = useState(route.params.item.description);
  const [passExpiry, setPassExpiry] = useState("");
  const [passNo, setPassNo] = useState("");


  const viewRef = useRef(0); 
  const editRef = useRef(0); 

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Items Details updated!'
    });
  }

  console.log(route.params)

  const markLost = () => {
    navigation.navigate('MarkLost', {item})
  }

  const openEdit = () => {
    viewRef.current.bounceOutLeft().then((end)=>{
      setEditing(true)
      if (route.params.item.type == "Passport Cover") {
        setPassExpiry(route.params.item.passport_expiry_date)
        setPassNo(route.params.item.passport_number)
      }
    })
  }


  const cancelEdit = () => {
    setEditing(false)
    // viewRef.current.bounceInRight() 
  }

  const saveForm = async () => {
    
    let data = {
      title: title,
      // description: desc,
      id: route.params.item.id,
      passport_number: passNo,
      passport_expiry_date: passExpiry
    }

    setLoading(true)
    const res = await Api(ApiConstants.BASE_URL + ApiConstants.UPDATE_ITEM, data, "POST", appReducer.appReducer.authToken)
    setLoading(false)
    
    if (res && res.status == "success"){
      showToast()
      navigation.goBack(2)
    } else if (res && res.message) {
      alert(res.message)
    } else {
      alert("Network Error")
    }

  }

      return (

        <View style={styles.container}>
        <CircleBack {...navigation} />
        <ScrollView>

          <MyImage source={{ uri: item.image }} style={styles.img}  />
          <View style={styles.containerWrapper}>


          { !isEditing ?
            <Animatable.View ref={ viewRef } animation="bounceInLeft" duration={2000} delay={200}>
            <View style={styles.row}>
                <View style={{ marginLeft: 30 }}>
                <QRCode value={item.qr_code} />
                </View>

                <View style={{  marginLeft: 20, width: '40%' }}>
                    <MyText style={styles.title}>{item.title}</MyText>
                    <MyText style={styles.desc}>{item.description}</MyText>
                    <MyStatus state={item.status} StatusStyle={{ marginTop: 9 }} />
                </View>
            </View>   

            <View style={{ marginTop: 30, marginHorizontal: 40 }}>
            
                <View style={[styles.row, {marginBottom: 8 }]}>
                    <MyText style={styles.label}>Expiry:</MyText>
                    <MyText style={styles.expiry}>{item.expiry}</MyText>
                </View>

                <View style={styles.row}>
                    <MyText style={styles.label}>Type:</MyText>
                    <MyText style={styles.expiry}>{item.type}</MyText>
                </View>

                { item.type == "Passport Cover" &&

                  <View>
                    <View style={[styles.row,{ marginTop: 6 }]}>
                      <MyText style={styles.label}>Passport Expiry:</MyText>
                      <MyText style={styles.expiry}>{item.passport_expiry_date}</MyText>
                    </View>
                    
                    <View style={[styles.row,{ marginTop: 6 }]}>
                        <MyText style={styles.label}>Passport Number:</MyText>
                        <MyText style={styles.expiry}>{item.passport_number}</MyText>
                    </View>
                  </View>

                }
            </View>

            <MyButton onPress={()=> openEdit()} label="Edit Details" buttonStyle={{ backgroundColor: '#FFF', marginTop: 80, width: '80%', alignSelf: 'center', borderWidth: 2, borderColor: '#19826d' }} labelStyle={{ color: '#19826d' }} />
            <MyButton onPress={()=> markLost()} label="Mark Item as Lost" buttonStyle={{ marginTop: 20, width: '80%', alignSelf: 'center', borderWidth: 2, borderColor: '#19826d' }} />
            </Animatable.View>
            
            :

              <View ref={ editRef } >
                <View style={styles.formView}>

                    <MyText style={ styles.fieldText }>Title</MyText>  
                    <TextInput value={ title } placeholder={"Title"} onChangeText={(text)=> setTitle(text) } style={ styles.inputField } />
                    
                    {/* <MyText style={ styles.fieldText }>Description</MyText>  
                    <TextInput value={ desc } placeholder={"Description"} onChangeText={(text)=> setDesc(text) } style={ styles.inputField } /> */}
                    { route.params.item.type == "Passport Cover" &&
                      <>
                      <MyText style={ styles.fieldText }>Passport Expiry</MyText>  
                      <TextInput value={ passExpiry } placeholder={"Passport Expiry"} onChangeText={(text)=> setPassExpiry(text) } style={ styles.inputField } />
                      
                      <MyText style={ styles.fieldText }>Passport No#</MyText>  
                      <TextInput value={ passNo } placeholder={"Passport No#"} onChangeText={(text)=> setPassNo(text) } style={ styles.inputField } />
                      </>
                    }
                </View>

                  <MyButton onPress={()=> saveForm() } isLoading={isLoading} label="Save" buttonStyle={{ marginTop: 30, width: '80%', alignSelf: 'center', borderWidth: 2, borderColor: '#19826d' }} />
                  <MyButton onPress={()=> cancelEdit() } label="Cancel" buttonStyle={{ backgroundColor: '#FFF', marginTop: 15, width: '80%', alignSelf: 'center', borderWidth: 2, borderColor: '#19826d' }} labelStyle={{ color: '#19826d' }} />
              </View>

          }

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

      inputField: {
        height: 40,
        borderRadius: 2,
        borderColor: "#babab8",
        width: '100%',
        borderWidth: 1,
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: "#000000",
      },

      fieldText: {
        fontSize: 12,
        color: '#222',
        marginBottom: 5,
        marginLeft: 1,
        marginTop: 18
      },

      formView: {
        backgroundColor: '#FFF',
        paddingTop: 13,
        paddingBottom: 40,
        paddingHorizontal: 35,
        borderRadius: 10,
        marginTop: 10
      },

    })
    
    
    const ItemDetailContainer = connect(state => ({ appReducer: state }))(ItemDetail);
    export default ItemDetailContainer