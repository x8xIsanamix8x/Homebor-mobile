import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Header from '../shared/header'

import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta';
import Calendar from '../screens/Calendar';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications';


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
    }
});

const CalendarNavigator = createStackNavigator({
  Calendar
});
const ProfileNavigator = createStackNavigator({
  Profile
});
const NotificationsNavigator = createStackNavigator({
  Notifications
});

const DrawerNavigator = createDrawerNavigator({
  CalendarNavigator
})

const SwitchNavigator = createSwitchNavigator({
  UserLogin: LoginStack,
  Drawer : DrawerNavigator 
},
{initialRouteName : 'UserLogin'
})


export default createAppContainer(SwitchNavigator);