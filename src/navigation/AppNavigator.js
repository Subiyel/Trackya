import * as React from 'react'
import { Text, View, Image } from 'react-native';
import HomeContainer from '../screen/Home';
import LostContainer from '../screen/Lost';
import IntroContainer from '../screen/Intro';
import LoginContainer from '../screen/Login';
import SignupContainer from '../screen/Signup';
import MyItemsContainer from '../screen/MyItems';
import ProfileContainer from '../screen/Profile';
import LandingContainer from '../screen/Landing';
import ActivateContainer from '../screen/Activate';
import ItemDetailContainer from '../screen/ItemDetail';
import VerifyEmailContainer from '../screen/VerifyEmail';
import VerifyOTPContainer from '../screen/VerifyOTP';
import ResetPasswordContainer from '../screen/ResetPassword';
import QrActivateContainer from '../screen/QrActivate';
import LostFormContainer from '../screen/LostForm';
import LostItemsContainer from '../screen/LostItems';
import MarkLostContainer from '../screen/MarkLost';
import TrackerContainer from '../screen/Tracker';
import ContactUsContainer from '../screen/ContactUs';
import AlertsContainer from '../screen/Alerts';
import WebsiteContainer from '../screen/Website';
import AboutContainer from '../screen/About';
import WebStoreContainer from '../screen/WebStore';
import FAQsContainer from '../screen/FAQs';
import DeleteAccountContainer from "../screen/DeleteAccount";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const primaryColor = "#19826d"

function PayScreen() {
	return (
	  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text>In Progress!</Text>
	  </View>
	);
  }




function BottomTabs() {
	return (
		<Tab.Navigator
		screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: primaryColor,
            tabBarInactiveTintColor: "#000000",
            tabBarActiveBackgroundColor: "#FFFFFF",
            tabBarInactiveBackgroundColor: "#FFFFFF",
            tabBarStyle: [
                {
                "display": "flex"
                },
                null
            ],
			tabBarIcon: ({ focused, color, size }) => {
			  let imgPath = "";
			  let width = 17
			  let height = 17	
			  if (route.name === 'Home') {
				imgPath = require('../assets/img/MenuIcons/home.png');
			  } else if (route.name === 'QR') {
				imgPath =  require('../assets/img/MenuIcons/QR.png');
				width = 35; height = 35;
			  } else if (route.name === 'Profile') {
                width = 15; height = 15;
				imgPath =  require('../assets/img/MenuIcons/user.png');
			  }
  
			  // You can return any component that you like here!
			  return <Image source={ imgPath } style={{ width: width, height: height, tintColor: focused ? primaryColor : '#000000' }} />;
			},
            
		  })}
		>
			<Tab.Screen name="Home" component={HomeScreenStack} />
			<Tab.Screen name="QR" component={QrActivateContainer} />
			<Tab.Screen name="Profile" component={ProfileContainer} />
  		</Tab.Navigator>
	);
  }


  function HomeScreenStack() {
	return (
	  <HomeStack.Navigator screenOptions={{ headerShown : false }}>
		
		<HomeStack.Screen name="HomeScreen" component={HomeContainer} />
    <HomeStack.Screen name="MyItems" component={MyItemsContainer} />
    <HomeStack.Screen name="ItemDetail" component={ItemDetailContainer} />
    <HomeStack.Screen name="ActivateScreen" component={ActivateContainer} />
    <HomeStack.Screen name="LostItems" component={LostItemsContainer} />
    <HomeStack.Screen name="MarkLost" component={MarkLostContainer} />
    <HomeStack.Screen name="Tracker" component={TrackerContainer} />
    <HomeStack.Screen name="QrActivate" component={QrActivateContainer} />
    <HomeStack.Screen name="ContactUs" component={ContactUsContainer} />
    <HomeStack.Screen name="Alerts" component={AlertsContainer} />
    <HomeStack.Screen name="Website" component={WebsiteContainer} />
    <HomeStack.Screen name="About" component={AboutContainer} />
    <HomeStack.Screen name="WebStore" component={WebStoreContainer} />
    <HomeStack.Screen name="FAQs" component={FAQsContainer} />
    <HomeStack.Screen name="Delete" component={DeleteAccountContainer} />
    
    
	  </HomeStack.Navigator>
	);
  }

AppNavigator = (props) => {
    // const isAuth = useSelector(state => state.appReducer.isLoggedIn);
        return(	
            <NavigationContainer>
                <Stack.Navigator  screenOptions={{ headerShown : false }}>
    
                
                
                {/* { 	isAuth ? 
                    <Stack.Screen name="HomeScreen">
                        {props => <BottomTabs {...props} videoIntent={videoIntent} />}
                    </Stack.Screen>
                : */}
                    <Stack.Screen name="Intro"  component={IntroContainer} />
                    <Stack.Screen name="Lost"  component={LostContainer} />
                    <Stack.Screen name="Login"  component={LoginContainer} />
                    <Stack.Screen name="Signup"  component={SignupContainer} />
                    <Stack.Screen name="Landing"  component={LandingContainer} />
                    <Stack.Screen name="VerifyEmail"  component={VerifyEmailContainer} />
                    <Stack.Screen name="VerifyOTP"  component={VerifyOTPContainer} />
                    <Stack.Screen name="ResetPassword"  component={ResetPasswordContainer} />
                    <Stack.Screen name="LostForm"  component={LostFormContainer} />
                    <Stack.Screen name="BottomTabs" component={BottomTabs} />
                    
                {/* } */}
    
    
                </Stack.Navigator>
            </NavigationContainer>
     )
    }

export default AppNavigator;