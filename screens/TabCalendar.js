import React, {Component, useState} from 'react'; 
import {View, Text, Image, Dimensions} from 'react-native';
import globalStyles from '../styles/global';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ModalScreen from '../screens/Addnewevent';
import Eventshistory from '../screens/Eventshistory'
import YourEvents from '../screens/YourEvents'
import YearCalendar from '../screens/YearCalendar';

const Tabs = createBottomTabNavigator();

export default function Calendar2() {
  return(

    
    <Tabs.Navigator initialRouteName={YourEvents} screenOptions={{
      lazy : true,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
        overflow: 'hidden',
      }
    }}>

      <Tabs.Screen name="Events" component={YourEvents} options={{title: 'Your Events', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/calendario-aplicacion.png')
        : require('../assets/img/calendartabicon/calendario-aplicacion-blanco1.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
            return(
              text ? 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextCalendar}>Your Events</Text>
                </View> 
                : 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextGray}>Your Events</Text>
                </View> 
            )
        }}}/>

      <Tabs.Screen name="AddEvent" component={ModalScreen} options={{title: 'Add Event', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/calendario-aplicacion-agregar-blanco.png')
        : require('../assets/img/calendartabicon/calendario-aplicacion-agregar.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
            return(
              text ? 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextCalendar}>Add Event</Text>
                </View> 
                : 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextGray}>Add Event</Text>
                </View> 
            )
        }}}/>

      <Tabs.Screen name="YearCalendar" component={YearCalendar} options={{title: 'Calendar', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/calendario-aplicacion-anual.png')
        : require('../assets/img/calendartabicon/calendario-aplicacion-anual-blanco.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
            return(
              text ? 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextCalendar}>Calendar</Text>
                </View> 
                : 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextGray}>Calendar</Text>
                </View> 
            )
        }}}/>

      <Tabs.Screen name="Eventshistory" component={Eventshistory} options={{title: 'Events History', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/calendario-aplicacion-ver.png')
        : require('../assets/img/calendartabicon/calendario-aplicacion-ver-blanco.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
            return(
              text ? 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextCalendar}>Events History</Text>
                </View> 
                : 
                <View style={(Dimensions.get('window').width >= 414) ? globalStyles.TabTextTablet : globalStyles.show}>
                  <Text style={globalStyles.TabTextGray}>Events History</Text>
                </View> 
            )
        }}}/>

        
      
    </Tabs.Navigator>
    

)
}