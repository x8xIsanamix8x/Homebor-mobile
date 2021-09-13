import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta';
import Calendar from '../screens/Calendar';
import Basicinfo from '../screens/Basicinfo';
import Galleryhouse from '../screens/Galleryhouse';
import Additionalregister from '../screens/Additionalregister';
import Roomregister from '../screens/Roomregister';
import Familyinfo from '../screens/Familyinfo';

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
    Basicinfo: {
      screen: Basicinfo,
      navigationOptions: {
          title:"Basic Info",
          headerStyle:{
            backgroundColor: '#232159'
          },
        headerTintColor:'#fff'
      }
  },
  Galleryhouse: {
    screen: Galleryhouse,
    navigationOptions: {
        title:"Gallery",
        headerStyle:{
          backgroundColor: '#232159'
        },
      headerTintColor:'#fff'
    }
},
Additionalregister: {
  screen: Additionalregister,
  navigationOptions: {
      title:"Additional Info",
      headerStyle:{
        backgroundColor: '#232159'
      },
    headerTintColor:'#fff'
  }
},
Roomregister: {
  screen: Roomregister,
  navigationOptions: {
      title:"Rooms",
      headerStyle:{
        backgroundColor: '#232159'
      },
    headerTintColor:'#fff'
  }
},
Familyinfo: {
  screen: Familyinfo,
  navigationOptions: {
      title:"Family Info",
      headerStyle:{
        backgroundColor: '#232159'
      },
    headerTintColor:'#fff'
  }
},
});

const CalendarStack = createStackNavigator({
  Calendar
},{headerMode: 'none'});

// const DrawerNavigator = createDrawerNavigator({
//   Calendar : {
//     screen : Calendar,
//     navigationOptions: {
//       title:"Calendar"
//     }
//   },
//   Profile : {
//     screen : Profile,
//   },
//   Notifications : {
//     screen : Notifications,
//   }
// });

const SwitchNavigator = createSwitchNavigator({
  UserLogin: LoginStack,
  Loading,
  Calendar : CalendarStack 
},
{initialRouteName : 'UserLogin'

})


export default createAppContainer(SwitchNavigator);