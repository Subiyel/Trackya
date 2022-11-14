import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyImage, MyText, ListButton }  from '../components';
// import { u } from "../util/utilities";
import { Provider, connect } from 'react-redux';
import Overlay from 'react-native-modal-overlay';
import { useIsFocused } from "@react-navigation/native";
// import { Icon } from 'react-native-vector-icons/Icon';
// import AppStateProvider from "../../AppState";
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import * as types from "../store/actions/types";
import Icon from 'react-native-vector-icons/FontAwesome';
const primary = "#19826d"

function Home({ route, appReducer, dispatch, navigation }) {
  
  
  const isFocused = useIsFocused();
  const [activateOtpVisible, toggleActivateOpts] = useState(false);
  const [myItems, setMyItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const theme = useContext(AppStateProvider);
  // console.log("Colors: ", theme)


    useEffect(() => {
        if (isFocused) {
          console.log(appReducer.appReducer)
          fetchMyItems()
        }
    }, [isFocused]);



    const fetchMyItems = async () => {
      setLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.FETCH_ITEMS, null, "GET", appReducer.appReducer.authToken)
      setLoading(false)
      setMyItems(res)
      console.log("res::: ", res)
    }



    const activateOptions = (option) => {
      toggleActivateOpts(false)
      if (option == 1) {
        alert("Comming Soon")
      } else {
        navigation.navigate('ActivateScreen')
      }
    }


      return (

        <View style={styles.container}>
          <View style={styles.containerWrapper}>


              <View style={styles.card}>
                <View style={styles.row1}>
                    <View>

                      <View style={styles.row}>
                        <MyText style={styles.welcome}>Welcome</MyText>
                        <MyText style={styles.username}>{appReducer.appReducer.name}</MyText>
                      </View>

                      <MyText style={styles.txt1}>To Trackya Dashboard</MyText>

                    </View>

                      <MyImage source={ require('../assets/img/logo.png') } style={styles.logo} resizeMode={'contain'} />
                  </View>
              </View>


              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <View style={styles.row1}>
              
                  {/* ======= Orders ====== */}
                    <View style={styles.countBox1}>
                          <View style={styles.row}>
                                <Image source={ require('../assets/img/orders.png') } style={styles.boxImg} />
                                <View style={styles.txtView}>
                                  <MyText style={styles.boxValue}>2</MyText>
                                  <MyText style={styles.boxLabel}>Orders</MyText>
                                </View>
                          </View>
                    </View>

                  {/* ======= Active ====== */}
                    <View style={styles.countBox2}>
                          <View style={styles.row}>
                                <Image source={ require('../assets/img/active.png') } style={styles.boxImg} />
                                <View style={styles.txtView}>
                                  <MyText style={styles.boxValue}>3</MyText>
                                  <MyText style={styles.boxLabel}>Active</MyText>
                                </View>
                          </View>
                    </View>

                  {/* ======= Lost ====== */}
                    <View style={styles.countBox3}>
                          <View style={styles.row}>
                                <Image source={ require('../assets/img/lost.png') } style={styles.boxImg} />
                                <View style={styles.txtView}>
                                  <MyText style={styles.boxValue}>0</MyText>
                                  <MyText style={styles.boxLabel}>Lost</MyText>
                                </View>
                          </View>
                    </View>

              </View>
              </View>

            <View style={{ marginTop: 70, marginHorizontal: 20 }}>

                  <View style={[styles.row1, { marginTop: 20 }]}>
                      <ListButton onPress={()=> toggleActivateOpts(true)} label="Activate" />
                      <ListButton onPress={()=> alert("Comming Soon")} label="Orders" />
                  </View>

                  <View style={[styles.row1, { marginTop: 20 }]}>
                      <ListButton onPress={()=> navigation.navigate('MyItems')} label="My Items" />
                      <ListButton onPress={()=> alert("Comming Soon")} label="Lost Items" />
                  </View>

                  <View style={[styles.row1, { marginTop: 20 }]}>
                      <ListButton onPress={()=> alert("Comming Soon")} label="Transactions" />
                      <ListButton onPress={()=> alert("Comming Soon")} label="Address" />
                  </View>


            </View>




            <Overlay onClose={()=> toggleActivateOpts(false)} visible={activateOtpVisible} childrenWrapperStyle={{ borderRadius: 12 }} closeOnTouchOutside>
              <MyText style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Please select Activation Method</MyText>
              
              <View style={[styles.row1, { width: '90%', marginTop: 20 }]}>
                <TouchableOpacity onPress={()=> activateOptions(1)}>
                <View style={styles.btn}>
                    <Image source={ require("../assets/img/MenuIcons/QR.png") } style={{ height: 90, width: 90,  }} resizeMode={'contain'} />
                </View>   
                <MyText style={styles.Txt}>Scan QR Code</MyText>  
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> activateOptions(2)}>
                <View style={styles.btn}> 
                    <Image source={ require("../assets/img/form.png") } style={{ height: 90, width: 90,  }} resizeMode={'contain'} /> 
                </View>
                <MyText style={styles.Txt}>Manually Enter</MyText>
                </TouchableOpacity>

              </View>

              
            </Overlay>


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
        backgroundColor: "#E1E1E1"
      },
      containerWrapper: {
        flex: 1,
        marginTop: 35,
        // justifyContent: 'space-between',
      },

      logo: { 
        height: 45,
        width: 180,
        marginTop: 0,
        alignSelf: 'center',
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },

      card: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 8,
        marginTop: 0,
        marginHorizontal: 20
      },

      welcome: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000000'
      },

      username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primary,
        marginLeft: 5
      },

      txt1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f1f1f',
        marginTop: 4
      },

      countBox1: {
        padding: 10,
        width: '29%',
        height: 60,
        borderRadius: 8,
        backgroundColor: '#c30ec9'
      },

      countBox2: {
        padding: 10,
        width: '29%',
        height: 60,
        borderRadius: 8,
        backgroundColor: primary
      },

      countBox3: {
        padding: 10,
        width: '29%',
        height: 60,
        borderRadius: 8,
        backgroundColor: '#fa7a1e'
      },

      boxImg: {
        height: 22,
        width: 22,
        tintColor: '#FFFFFF'
      },

      boxValue: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold'
      },

      boxLabel: {
        fontSize: 13,
        color: '#FFFFFF',
        textAlign: 'center'
      },

      txtView: {
        marginLeft: 7
      },

      btn: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#222',
        padding: 10,
      },
    
      Txt: {
        marginTop: 10,
        textAlign: 'center',
    
      }



    })
    
    
    const HomeContainer = connect(state => ({ appReducer: state }))(Home);
    export default HomeContainer