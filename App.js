import 'react-native-gesture-handler';
import React from 'react';
import {  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './views/Login';
import CrearCuenta from './views/CrearCuenta';
import Calendar from './views/Calendar';
import { Root } from 'native-base';
import { CalendarList } from 'react-native-calendars';


const App = () => {
  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title:"Login",
              headerShown:false
            }}
            />

            <Stack.Screen
            name="CrearCuenta"
            component={CrearCuenta}
            options={{
              title:"Register",
              headerStyle:{
                backgroundColor: '#232159'
              },
              headerTintColor:'#fff',
              headerTitleStyle:{
                fontWright:'bold'
              }
            }}
            />

            <Stack.Screen
            name="Calendar"
            component={Calendar}
            options={{
              title:"Calendar",
              headerStyle:{
                backgroundColor: '#232159'
              },
              headerTintColor:'#fff',
              headerTitleStyle:{
                fontWright:'bold'
              }
            }}
            />

          </Stack.Navigator>
        </NavigationContainer>


      </Root>
    </>
  );
};

export default App;
