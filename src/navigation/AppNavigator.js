import * as React from 'react'
import { Text, View, Image } from 'react-native';
import HomeContainer from '../screen/Home';
import LoginContainer from '../screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

AppNavigator = (props) => {
    const isAuth = useSelector(state => state.appReducer.isLoggedIn);
    const videoIntent = props.video
    console.log("isLoggedIn: ", videoIntent)
        return(	
            <NavigationContainer>
                <Stack.Navigator  screenOptions={{ headerShown : false }}>
    
                
                
                {/* { 	isAuth ? 
                    <Stack.Screen name="HomeScreen">
                        {props => <BottomTabs {...props} videoIntent={videoIntent} />}
                    </Stack.Screen>
                : */}
                    <Stack.Screen name="Home"  component={HomeContainer} />
                    <Stack.Screen name="Login"  component={LoginContainer} />
                {/* } */}
    
    
                </Stack.Navigator>
            </NavigationContainer>
     )
    }