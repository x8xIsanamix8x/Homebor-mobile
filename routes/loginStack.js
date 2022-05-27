import React, { Component} from 'react'
import {Platform} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator } from "@react-navigation/compat";


import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta'
import Calendar from '../screens/Calendar'
import Additionalregister from '../screens/Additionalregister'
import Roomregister from '../screens/Roomregister'
import Basicinfo from '../screens/Basicinfo'
import Galleryhouse from '../screens/Galleryhouse'
import Loading from '../container/loading'
import Familyinfo from '../screens/Familyinfo';

const AuthStack = createStackNavigator();
const AuthStack2 = createStackNavigator();
const LoadStack = createStackNavigator();
const DateStack = createStackNavigator();

function login() {
    return(
        <AuthStack2.Navigator>
            <AuthStack2.Screen name="Login" component={Login} options={{headerShown: false, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}}}/>
            <AuthStack.Screen name="CrearCuenta" component={CrearCuenta} options={{title : "Create Account", headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Additionalregister" component={Additionalregister} options={{title : "Additional Info", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Basicinfo" component={Basicinfo} options={{title : "Basic Info", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Roomregister" component={Roomregister} options={{title : "Rooms Info", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Familyinfo" component={Familyinfo} options={{title : "Family Info", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Galleryhouse" component={Galleryhouse} options={{title : "Gallery", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
        </AuthStack2.Navigator>
    )
}


function load(){
    return (
        <LoadStack.Navigator>       
            <LoadStack.Screen name="Loading" component={Loading} options={{headerShown: false, gestureEnabled: false}}/>
        </LoadStack.Navigator>
    )
}

function Calemdar(){
    
    return (
        <DateStack.Navigator>
            <DateStack.Screen name="Calendar" component={Calendar} options={{headerShown: false, gestureEnabled: false}}/>
        </DateStack.Navigator>
    )
}

const SwitchNavigator= createSwitchNavigator(
    {
        login,
        load: load,
        Calemdar: Calemdar
    },
    {
    initialRouteName:'Login'
    }
);

export default class Navigator extends Component {	
    render() {
    return (
    <NavigationContainer>
       <SwitchNavigator/>
    </NavigationContainer>
            )
        }
}