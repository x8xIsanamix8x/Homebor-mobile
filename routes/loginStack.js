import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications';

import EditPropertyTwo from '../screens/EditPropertyTwo';

import Loading from '../container/loading';

import Header from '../styles/header';

const LoginStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title:"Login",
              headerShown:false
        }
    },
    CrearCuenta: {
        screen: CrearCuenta,
        navigationOptions: {
            title:"Register",
              headerStyle:{
                backgroundColor: '#232159'
              },
            headerTintColor:'#fff'
        }
    },
    EditPropertyTwoStack: {
      screen: EditPropertyTwo
    },
});

const CalendarStack = createStackNavigator({
  Calendar
},{headerMode: 'none'});

const SwitchNavigator = createSwitchNavigator({
  UserLogin: LoginStack,
  Loading,
  Calendar : CalendarStack 
},
{initialRouteName : 'UserLogin'

})


export default createAppContainer(SwitchNavigator);