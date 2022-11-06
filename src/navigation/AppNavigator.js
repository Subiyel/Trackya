import * as React from 'react'
import { Text, View, Image } from 'react-native';
import HomeContainer from '../screen/Home';
import LoginContainer from '../screen/Login';
import SignupContainer from '../screen/Signup';
import IntroContainer from '../screen/Intro';
import LandingContainer from '../screen/Landing';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
                    <Stack.Screen name="Home"  component={HomeContainer} />
                    <Stack.Screen name="Login"  component={LoginContainer} />
                    <Stack.Screen name="Signup"  component={SignupContainer} />
                    <Stack.Screen name="Landing"  component={LandingContainer} />
                {/* } */}
    
    
                </Stack.Navigator>
            </NavigationContainer>
     )
    }

export default AppNavigator;