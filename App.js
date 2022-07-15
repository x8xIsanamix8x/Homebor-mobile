import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './routes/loginStack';


enableScreens()

const AuthStack = createStackNavigator();

export default () => (
  
  <Navigator />
)