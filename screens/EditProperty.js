import React, {Component, useState, useEffect} from 'react';
import {Image, View, Text} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import globalStyles from '../styles/global';

import BasicEdit from "../screens/BasiceditProfile"
import GalleryEdit from "../screens/GalleryEditProfile"
import AdditionalEdit from "../screens/AdditionaleditProfile"
import FamilyEdit from "../screens/FamilyeditProfile"

const Tabs = createBottomTabNavigator();

export default function EditProperty() {
  return(

    

    <Tabs.Navigator screenOptions={{
      lazy : true,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#232159',
      },   
    }}>
      <Tabs.Screen name="EditBasic" component={BasicEdit} options={{title: 'Basic Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/editIcons/disponibilidad-16.png')
        : require('../assets/img/editIcons/disponibilidad-gris-64.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
          return(
            text ? 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabText}>Basic Info</Text>
              </View> 
              : 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabTextGray}>Basic Info</Text>
              </View> 
          )
      }}}/>

      <Tabs.Screen name="EditGallery" component={GalleryEdit} options={{title: 'Gallery', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/editIcons/gallery-16.png')
        : require('../assets/img/editIcons/gallery-gris-64.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
          return(
            text ? 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabText}>Gallery</Text>
              </View> 
              : 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabTextGray}>Gallery</Text>
              </View> 
          )
      }}}/>

      <Tabs.Screen name="EditAdditional" component={AdditionalEdit} options={{title: 'Additional Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/editIcons/additional-16.png')
        : require('../assets/img/editIcons/additional-gris-64.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
          return(
            text ? 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabText}>Additional Info</Text>
              </View> 
              : 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabTextGray}>Additional Info</Text>
              </View> 
          )
      }}}/>

      <Tabs.Screen name="EditFamily" component={FamilyEdit} options={{title: 'My Family', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/img/editIcons/family-16.png')
        : require('../assets/img/editIcons/family-member-64.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabiconNativeBase}/>
        )}, tabBarLabel: ({focused}) => { const text = focused
          return(
            text ? 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabText}>My Family</Text>
              </View> 
              : 
              <View style={globalStyles.TabTextTablet}>
                <Text style={globalStyles.TabTextGray}>My Family</Text>
              </View> 
          )
      }}}/>

      
      
    </Tabs.Navigator>

  )
}