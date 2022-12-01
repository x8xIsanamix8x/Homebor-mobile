import React, {Component, useState} from 'react'; 
import {View, Text, Image} from 'react-native';
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
      tabBarActiveBackgroundColor : '#663D90',
      tabBarShowLabel: false,
      tabBarStyle: {
        borderWidth: 0.5,
        borderBottomWidth: 1,
        backgroundColor:'#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderColor: 'transparent',
        overflow: 'hidden',
      }
    }}>

      <Tabs.Screen name="Events" component={YourEvents} options={{title: 'Your Events',  headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/icono-calendario-5.png')
        : require('../assets/img/calendartabicon/icono-calendario-6.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}}}/>

      <Tabs.Screen name="AddEvent" component={ModalScreen} options={{title: 'Add Event', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/icono-calendario-3.png')
        : require('../assets/img/calendartabicon/icono-calendario-4.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}}}/>

      <Tabs.Screen name="Eventshistory" component={Eventshistory} options={{title: 'Events History', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/calendartabicon/icono-calendario-1.png')
        : require('../assets/img/calendartabicon/icono-calendario-2.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconCalendarNativeBase}/>
        )}}}/>

        
      
    </Tabs.Navigator>
    

)
}