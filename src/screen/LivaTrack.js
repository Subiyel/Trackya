import React, { useState,useEffect } from 'react'
import { StyleSheet,  View, ScrollView, Text, TouchableHighlight, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import  { MyText, MyImage, MyButton, CircleBack, MyBattery }  from '../components';
import { Provider, connect } from 'react-redux';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Icon from 'react-native-vector-icons/Ionicons';
import { u } from "../util/Utilities";
import { ApiConstants } from "../api/ApiConstants";
import * as types from "../store/actions/types";
import { useIsFocused } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import moment from 'moment';

function LiveTrack({ route, appReducer, dispatch, navigation }) {
  

  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

    useEffect(() => {
      if (isFocused) {
        console.log(route.params)
      }
  }, [isFocused]);
  
return (

    <View style={styles.container}>
    <CircleBack {...navigation} />
        <View style={styles.containerWrapper}>
          
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: route.params.tracker.lat,
                    longitude: route.params.tracker.lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ latitude : route.params.tracker.lat , longitude : route.params.tracker.lon }} />
            </MapView>

        </View>

            <View style={styles.bottomSheet}>
            <ScrollView>
            <View style={styles.row1}>
                <MyText style={styles.trackerName}>{route.params.item.title}</MyText>
                <View style={styles.row}>
                    <Image source={ require("../assets/img/live.gif") } style={{ height: 30, width: 30 }} />
                    <MyText style={styles.lastSeen}>{ moment(route.params.tracker.updated_at).fromNow() }</MyText>
                </View>
            </View>    

                <View style={styles.nestedBox}>
                    <View style={styles.detailContainer}>

                    <View style={{ width: '30%',  justifyContent: 'center' }}>
                    <MyImage source={{ uri: route.params.item.image }} style={styles.img} />
                    </View>

                    <View>
                        <View style={styles.row}>
                            <MyText style={styles.titles}>Battery</MyText>
                            <MyBattery percentage={route.params.tracker.battery} />
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>Battery State</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.battery_state}</MyText>
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>State</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.state}</MyText>
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>Pressure</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.pressure}</MyText>
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>Temperature</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.temperature}°C</MyText>
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>Carrier</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.carrier}</MyText>
                        </View>
                        
                        <View style={styles.row}>
                            <MyText style={styles.titles}>Airport Distance</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.airport_distance}</MyText>
                        </View>

                        <View style={styles.row}>
                            <MyText style={styles.titles}>Mobile Country Code</MyText>
                            <MyText style={styles.labels}>{route.params.tracker.mobile_country_code}</MyText>
                        </View>

                        
                    </View>
                    

                    </View>
                </View>
                <View style={{ height: 30 }} />
            </ScrollView>    
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
        backgroundColor: "#E1E1E1",
      },

      row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2
      },

      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      containerWrapper: {
          flex: 0.6,
          justifyContent: 'flex-start',
          alignItems: 'center',
      },

        map: {
          ...StyleSheet.absoluteFillObject,
        },

        bottomSheet: {
            flex: 0.4,
            backgroundColor: '#f5f7f5',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 30,
            paddingHorizontal: 30
        },

        trackerName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 7
        },

        nestedBox: {
            marginTop: 20,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 8,
            backgroundColor: "#FFF",
        },

        img: {
            height: 50,
            width: 50,
            borderRadius: 25
        },

        detailContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            // alignItems: 'center'
        },

        titles: {
            fontWeight: 'bold'
        },

        labels: {
            marginLeft: 10
        },

        lastSeen: {
            fontSize: 10
        }
      
    })
    
    
    const LiveTrackContainer = connect(state => ({ appReducer: state }))(LiveTrack);
    export default LiveTrackContainer