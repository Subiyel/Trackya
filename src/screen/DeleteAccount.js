import React, { useState,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, MyHeader }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import Api from "../api/Api";
import RNSwipeVerify from 'react-native-swipe-verify'
const { width } = Dimensions.get('window')

function DeleteAccount({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [isSwiped, setSwpied] = useState(false);
  const iconSizeBefore = 20;
  const iconSizeAfter = 20;


  const deleteAccount = async () => {
    let data = {
        "user_id": appReducer.appReducer.id,
      }
    
      setLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.DELETE, data, "POST", appReducer.appReducer.authToken)
      setLoading(false)
      alert("Account Deleted Successfully")
      navigation.navigate("Login")
  }

//     useEffect(() => {
//       if (isFocused) {
//         console.log(appReducer.appReducer)
//       }
//   }, [isFocused]);
  
      return (

        <View style={styles.container}>
        <MyHeader {...navigation} />
        <ScrollView>
          <View style={styles.containerWrapper}>
          
            <View style={styles.box}>
                <View style={styles.trash}><Icon name={'trash'} size={30} color={'#FFF'} /></View>
                <MyText style={styles.deleteTitle}>Delete Account?</MyText>
                <MyText style={styles.deleteTitle2}>You'll permanently lose your account</MyText>
                <View style={{ width: '50%', alignSelf: 'center', marginLeft: 25, marginTop: 7 }}>
                <MyText style={styles.deleteTitle3}>- Profile</MyText>
                <MyText style={styles.deleteTitle3}>- Linked Items</MyText>
                <MyText style={styles.deleteTitle3}>- Order History</MyText>
                </View>

                 {/** Lottie example */}
                <View style={{ marginTop: 35 }}>
                <RNSwipeVerify
                    width={width - 50}
                    buttonSize={50}
                    buttonColor="#6b0303"
                    borderColor="#FFF"
                    backgroundColor="#eb1a4b"
                    textColor="#FFF"
                    borderRadius={30}
                    okButton={{ visible: true, duration: 400 }}
                    onVerified={() => {
                        setSwpied(true)
                        deleteAccount()
                    }}
                    icon={
                    // <View style={{ height: isSwiped ? iconSizeBefore : iconSizeAfter, width: isSwiped ? iconSizeBefore : iconSizeAfter }}>
                        <Icon name={'checkmark-done'} size={isSwiped ? iconSizeBefore : iconSizeAfter} color={'#FFF'} />
                    // </View>
                    }
                >

                    <MyText style={{ color: '#FFF', fontWeight: 'bold' }}>{isSwiped ? 'Deleting' : 'Slide to Delete'}</MyText>

                </RNSwipeVerify>
                </View>
                {/** end Lottie example */}

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
      },

      deleteTitle: {
        fontWeight: 'bold', 
        fontSize: 22, 
        textAlign: 'center',
        marginTop: 40
      },

      deleteTitle2: { 
        fontSize: 15, 
        textAlign: 'center',
        color: '#3b3939',
        marginTop: 19
      },

      deleteTitle3: { 
        fontSize: 14, 
        color: '#3b3939',
        marginTop: 2
      },

      box: {
        backgroundColor: '#FFF', 
        paddingHorizontal: 20,
         marginHorizontal: 0, 
         marginTop: 60,
         paddingTop: 15,
         paddingBottom: 35,
         borderRadius: 20
        },

      trash: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#eb1a4b',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        
      }
      
    })
    
    
    const DeleteAccountContainer = connect(state => ({ appReducer: state }))(DeleteAccount);
    export default DeleteAccountContainer