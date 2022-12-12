import React, { useState,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyWebview, ShimmerList, MyHeader, MyButton }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import Api from "../api/Api";

function FAQs({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [appData, setAppData] = useState('');
  const [isExpanded, setExpanded] = useState([]);

    useEffect(() => {
      if (isFocused) {
        fetchFAQs()
      }
  }, [isFocused]);


  const fetchFAQs = async () => {
        setLoading(true)
        const res = await Api(ApiConstants.BASE_URL + ApiConstants.FAQS, null, "GET", appReducer.appReducer.authToken)
        setLoading(false)
        console.log(res.data)
        if (res && res.data) {
            setAppData(res.data.reverse())
            setExpanded(Array(res.data.length).fill(false))
        }
  }

  const onClicked = (i) => {
    let arr = [...isExpanded]
    arr.map(()=> false)
    arr[i] = !isExpanded[i]
    setExpanded(arr)
  }

  console.log(isExpanded)
  
return (

<View style={styles.container}>
<MyHeader {...navigation} title="" />
<ScrollView>
    <View style={styles.containerWrapper}>


    <MyText style={styles.title}>Frequently Asked Questions:</MyText>

    <View style={styles.section}>
        {
            appData && appData.length > 0 &&
            appData.map((item, index) => {
                return(  
                <View key={item.id}>
                <TouchableOpacity onPress={()=> onClicked(index)} style={styles.header}>
                    <View style={styles.row1}>
                        <MyText style={styles.question}>{ item.question }</MyText>
                        <Icon name="chevron-down" size={22} color={'#222'} />
                    </View>
                </TouchableOpacity>

                { isExpanded[index] &&
                    <View style={styles.footer}>
                        <MyText style={styles.answer}>{ item.answer }</MyText>
                    </View>
                }

                </View>
                )
            })
        }
    </View>




    { isLoading &&
            <View>
            <ShimmerList />
            <ShimmerList /> 
            </View> 
    }


    <MyButton isLoading={isLoading} onPress={()=> navigation.navigate('ContactUs')} buttonStyle={styles.buttonSubmit} labelStyle={styles.submitTxt} label={'Contact US'} />
    <MyText style={styles.helperText}>Have other Queries? Feel free to reach us out!</MyText>



    <View style={{ height: 100 }} />
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
        flex: 1,
        marginHorizontal: 20
      },

      section: {
        marginTop: 20
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

      header: {
        backgroundColor: '#FFF',
        paddingHorizontal: 25,
        paddingVertical: 18,
        borderRadius: 8,
        marginTop: 12
      },

      question: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#222',
      },

      footer: {
        marginHorizontal: 10,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 25,
        paddingVertical: 18,
        borderRadius: 8,
        marginTop: 12
      },

      answer: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#222',
      },

      title: {
        fontSize: 28,
        marginTop: 30,
        marginHorizontal: 10,
        fontWeight: 'bold'
      },

      buttonSubmit:{
        marginTop: 50,
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

      helperText: {
        marginTop: 10,
        fontSize: 11,
        color: '#777',
        marginLeft: 10,
        textAlign: 'center'
      }
    })

    
    
    const FAQsContainer = connect(state => ({ appReducer: state }))(FAQs);
    export default FAQsContainer