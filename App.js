import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './routes/loginStack';


const AuthStack = createStackNavigator();

export default () => (
  
  <Navigator />
)