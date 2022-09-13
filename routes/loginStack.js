import React, { Component, useState, useEffect, useMemo} from 'react'
import {Platform, View, ActivityIndicator} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';

import {AuthContext} from '../components/context'


import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta'
import RecoverPassword from '../screens/RecoverPassword'
import Requiredfields from '../screens/Requiredfields'
import Location from '../screens/Houseinformation';
import Roomregister from '../screens/Roomregister'
import Galleryhouse from '../screens/Galleryhouse'
import Familyinfo from '../screens/Familyinfo';
import Additionalregister from '../screens/Additionalregister'
import Calendar from '../screens/Calendar'
import Loading from '../container/loading'
import {Welcome, Welcome2, Welcome3, Welcome4, Welcome5} from '../screens/Welcome'
import Disablelogin from '../screens/Disablelogin'


const AuthStack = createStackNavigator();
const AuthStack2 = createStackNavigator();
const LoadStack = createStackNavigator();
const DateStack = createStackNavigator();
const DisableStack = createStackNavigator();
const RegisterStack = createStackNavigator();



function load(){
    return (
        <LoadStack.Navigator>       
            <LoadStack.Screen name="Loading" component={Loading} options={{headerShown: false, gestureEnabled: false}}/>
        </LoadStack.Navigator>
    )
}


const Navigator = () => {
    const [userToken, setUserToken] = React.useState('');

    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken('Login');
        },
        signOut: () => {
            setUserToken('');
        },
        signUp: () => {
            setUserToken('Register');
        },
        signDisable: () => {
            setUserToken('Disable');
        },
    }), [])

    
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { userToken != '' ?
                    userToken == 'Login' ?
                    (
                        <DateStack.Navigator>
                            <DateStack.Screen name="Calendar" component={Calendar} options={{headerShown: false, gestureEnabled: false}}/>
                        </DateStack.Navigator>
                    )
                    :
                    userToken == 'Register' ?
                    (
                        <RegisterStack.Navigator>
                            <RegisterStack.Screen name="Welcome" component={Welcome} options={{title : "Welcome", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Requiredfields" component={Requiredfields} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="YourLocation" component={Welcome2} options={{title : "Welcome", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Location" component={Location} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="YourRoom" component={Welcome3} options={{title : "Welcome", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Roomregister" component={Roomregister} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Congratulations" component={Welcome4} options={{title : "Welcome", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Galleryhouse" component={Galleryhouse} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Familyinfo" component={Familyinfo} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="Additionalregister" component={Additionalregister} options={{title : "Register", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                            <RegisterStack.Screen name="EndRegister" component={Welcome5} options={{title : "Welcome", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                        </RegisterStack.Navigator>
                    )
                    : 
                    (
                        <DisableStack.Navigator>
                            <DisableStack.Screen name="Disablelogin" component={Disablelogin} options={{title : "User Disable", headerLeft: ()=> null, headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                        </DisableStack.Navigator>
                    )
                : (
                    <AuthStack2.Navigator>
                        <AuthStack2.Screen name="Loading" component={Loading} options={{headerShown: false, gestureEnabled: false}}/>
                        <AuthStack2.Screen name="Login" component={Login} options={{headerShown: false, gestureEnabled: false, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}}}/>
                        <AuthStack.Screen name="CrearCuenta" component={CrearCuenta} options={{title : "Create Account", headerStyle:{ backgroundColor: '#232159'},  headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                        <AuthStack.Screen name="RecoverPassword" component={RecoverPassword} options={{title : "Forgot Password", headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle: {fontSize : (Platform.isPad === true) ? 24 : 18}, headerTintColor:'#fff'}}/>
                    </AuthStack2.Navigator>
                )
                
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default Navigator;