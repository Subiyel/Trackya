import React, { useState, useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, Dimensions, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyImage, MyText, AppIconBtn, EnableFaceID }  from '../components';
import { u } from "../util/Utilities";
import { Provider, connect } from 'react-redux';
import Overlay from 'react-native-modal-overlay';
import { useIsFocused } from "@react-navigation/native";
// import { Icon } from 'react-native-vector-icons/Icon';
// import AppStateProvider from "../../AppState";
import { ApiConstants } from "../api/ApiConstants";
import Api from "../api/Api";
import * as types from "../store/actions/types";
import Icon from 'react-native-vector-icons/Feather';
import { variable } from '../util/Variables';
const primary = "#19826d"

function Home({ route, appReducer, dispatch, navigation }) {
  
  
  const isFocused = useIsFocused();
  const [faceIDvisible, toggleFaceIDvisible] = useState(false);
  const [activateOtpVisible, toggleActivateOpts] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [lostCount, setLostCount] = useState(0);
  const [myItems, setMyItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [biometricType, setBiometricType] = useState('Face_ID');
  // const theme = useContext(AppStateProvider);
  // console.log("Colors: ", theme)


    useEffect(() => {
        if (isFocused) {
          console.log(appReducer.appReducer)
          checkFaceID()
          // fetchMyItems()
        }
    }, [isFocused]);



    const fetchMyItems = async () => {
      setLoading(true)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.FETCH_ITEMS, null, "GET", appReducer.appReducer.authToken)
      setLoading(false)
      console.log(res)

      if (res && res.data) {
        setMyItems(res.data)
        let i = 0
        res.data.map((item)=> {
          if (item.status == "Active"){
            i++
          }
        })
        setActiveCount(i)
      }
    }



    const activateOptions = (option) => {
      toggleActivateOpts(false)
      if (option == 1) {
        alert("Comming Soon")
      } else {
        navigation.navigate('ActivateScreen')
      }
    }


    const checkFaceID = async () => {
      console.log("1..")
      if(appReducer.appReducer.showFaceID){ //,,..
        console.log("checking for FaceID..")
        let { isSupported, type } = await u.checkDeviceBiometrics()
        console.log("isSupported, type",isSupported, type)
        if (isSupported) {
          setBiometricType(type)
          toggleFaceIDvisible(true)
        }
      }
    }


    const closeFaceID = () => {
      toggleFaceIDvisible(false)
      dispatch({ type: types.FACE_ID_POPUP })
    }


    const enableFaceID = () => {
      
      setLoading(true)
      u.triggerBiometric().then((resultObject) => {
        u.getDevicePublicKey().then((key) => {
          let data = {
            user_id: appReducer.appReducer.id,
            type: biometricType,
            hash_id: key+"_"+appReducer.appReducer.id,
            status: 1
          }
        
          setLoading(false)
          closeFaceID()
          savePublicKey(data)
        })  
      }).catch(() => {
        setLoading(false)
        alert("Error: Couldnot enable Biometric Login")
      })
    }


    const savePublicKey = async (data) => {
      console.log("Data: ", data)
      const res = await Api(ApiConstants.BASE_URL + ApiConstants.PUBLIC_KEY, data, "POST", appReducer.appReducer.authToken)
      dispatch({ type: types.ENABLE_FACE_ID, data })
      console.log(res)
    }



      return (

     <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.h1}>Welcome,</Text>
          <Text style={styles.h2}>{appReducer.appReducer.name}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.iconTxt}>Logout</Text>
            <Icon style={styles.icon} name="arrow-right-circle" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bookingCountContainer}>
        <Text style={styles.bookingCountTxt}>
          Welcome to our lost & found platform.
        </Text>
      </View>

      <View style={styles.flexRow}>
        <AppIconBtn
          type="feather"
          icon="location"
          text="Tracker"
          onPress={() => navigation.navigate("Tracker")}
        />
      </View>

      {/* <AppBannerTitle text="Quick Access" icon="gesture-tap-button" /> */}

      <View style={styles.flexRow}>
        <AppIconBtn
          type="feather"
          icon="send"
          text="Activate"
          onPress={() => navigation.navigate("ActivateScreen")}
        />
        <AppIconBtn
          type="feather"
          icon="list"
          text="My Items"
          onPress={() => navigation.navigate("MyItems", {items: myItems})}
        />
      </View>

      <View style={styles.flexRow}>
        <AppIconBtn
          type="feather"
          icon="notifications"
          text="Alerts"
          onPress={() => navigation.navigate("Alerts")}
        />
        <AppIconBtn
          type="feather"
          icon="list"
          text="Lost Items"
          onPress={() => navigation.navigate("LostItems")}
        />

        <AppIconBtn
          type="feather"
          icon="person-add-outline"
          text="Support"
          onPress={() => navigation.navigate("ContactUs")}
        />

        <Overlay
          onClose={() => toggleActivateOpts(false)}
          visible={activateOtpVisible}
          childrenWrapperStyle={{ borderRadius: 12 }}
          closeOnTouchOutside
        >
          <MyText
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            Please select Activation Method
          </MyText>

          <View style={[styles.row1, { width: "90%", marginTop: 20 }]}>
            <TouchableOpacity onPress={() => activateOptions(1)}>
              <View style={styles.btn}>
                <Image
                  source={require("../assets/img/MenuIcons/QR.png")}
                  style={{ height: 90, width: 90 }}
                  resizeMode={"contain"}
                />
              </View>
              <MyText style={styles.Txt}>Scan QR Code</MyText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => activateOptions(2)}>
              <View style={styles.btn}>
                <Image
                  source={require("../assets/img/form.png")}
                  style={{ height: 90, width: 90 }}
                  resizeMode={"contain"}
                />
              </View>
              <MyText style={styles.Txt}>Manually Enter</MyText>
            </TouchableOpacity>
          </View>
        </Overlay>

        <EnableFaceID
          onContinue={() => enableFaceID()}
          isLoading={isLoading}
          isVisible={faceIDvisible}
          onClose={() => closeFaceID()}
        />
      </View>
    </View>
      )
    }
    







    const styles = StyleSheet.create({
      
      
      wrapper: {
        flex: 1,
        backgroundColor: variable.background,
      },
    
      header: {
        height: 110,
        flexDirection: "row",
        backgroundColor: variable.primary,
      },
      welcomeContainer: {
        flex: 1.5,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      },
      h1: {
        fontSize: 18,
        color: variable.white,
        paddingRight: 2,
      },
      h2: {
        fontSize: 18,
        fontWeight: "500",
        color: variable.white,
        paddingLeft: "35%",
      },
    
      iconWrapper: {
        flex: 1,
        justifyContent: "center",
      },
      iconContainer: {
        backgroundColor: variable.secondary,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: "center",
        justifyContent: "center",
        borderLeftWidth: 0.1,
        borderBottomWidth: 0.1,
        borderTopWidth: 0.1,
        borderColor: variable.black,
        shadowColor: variable.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      iconTxt: {
        color: variable.white,
        fontWeight: "500",
        paddingRight: 2,
        fontSize: variable.lgFontSize,
      },
      icon: {
        color: variable.white,
        paddingLeft: 2,
        fontSize: variable.lgFontSize,
      },
    
      bookingCountContainer: {
        backgroundColor: variable.secondary,
        shadowColor: variable.black,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 3,
        borderBottomWidth: 1,
        borderBottomColor: variable.secondary,
      },
      bookingCountTxt: {
        color: variable.white,
        fontWeight: "700",
        fontSize: variable.lgFontSize,
        padding: 5,
        textAlign: "center",
      },
    
      flexRow: {
        flexDirection: "row",
      },
    
      btn: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#222",
        padding: 10,
      },
    
      Txt: {
        marginTop: 10,
        textAlign: "center",
      },
   



    })
    
    
    const HomeContainer = connect(state => ({ appReducer: state }))(Home);
    export default HomeContainer