import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './routes/loginStack';


import Login from './screens/Login';
import CrearCuenta from './screens/CrearCuenta'
import Calendar from './screens/Calendar'
import Additionalregister from './screens/Additionalregister'
import Basicinfo from './screens/Basicinfo'
import Galleryhouse from './screens/Galleryhouse'
import Roomregister from './screens/Roomregister'
import Familyinfo from './screens/Familyinfo';
import Studentnot from './screens/Studentnot'
import Studentinfo from './screens/StudentInfo'
import ReportFeedback from './screens/ReportFeedback'
import Loading from './container/loading'

const AuthStack = createStackNavigator();

export default () => (
  
  <Navigator />
)