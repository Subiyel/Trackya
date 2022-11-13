import * as React from 'react'
import { Text, View, Image } from 'react-native';
import HomeContainer from '../screen/Home';
import LoginContainer from '../screen/Login';
import SignupContainer from '../screen/Signup';
import IntroContainer from '../screen/Intro';
import LandingContainer from '../screen/Landing';

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
		<Text>Pay!</Text>
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
			  let width = 20
			  let height = 20	
			  if (route.name === 'HomeScreen') {
				imgPath = require('../assets/img/bioLogin/Face_ID.png');
			  } else if (route.name === 'Saved') {
				imgPath =  require('../assets/img/bioLogin/Face_ID.png');
				width = 15
			  } else if (route.name === 'Pay') {
				imgPath =  require('../assets/img/bioLogin/Face_ID.png');
			  } else if (route.name === 'My Profile') {
				imgPath =  require('../assets/img/bioLogin/Face_ID.png');
			  }
  
			  // You can return any component that you like here!
			  return <Image source={ imgPath } style={{ width: width, height: height, tintColor: focused ? primaryColor : '#000000' }} />;
			},
            
		  })}
		>
			<Tab.Screen name="HomeScreen" component={HomeScreenStack} />
			<Tab.Screen name="Saved" component={PayScreen} />
			<Tab.Screen name="Pay" component={PayScreen} />
			<Tab.Screen name="My Profile" component={PayScreen} />
  		</Tab.Navigator>
	);
  }


  function HomeScreenStack() {
	return (
	  <HomeStack.Navigator screenOptions={{ headerShown : false }}>
		
		<HomeStack.Screen name="Home" component={HomeContainer} />

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
                    <Stack.Screen name="Login"  component={LoginContainer} />
                    <Stack.Screen name="Signup"  component={SignupContainer} />
                    <Stack.Screen name="Landing"  component={LandingContainer} />
                    <Stack.Screen name="BottomTabs" component={BottomTabs} />

                {/* } */}
    
    
                </Stack.Navigator>
            </NavigationContainer>
     )
    }

export default AppNavigator;