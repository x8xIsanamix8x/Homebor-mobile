import React, { Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta'
import Calendar from '../screens/Calendar'
import Additionalregister from '../screens/Additionalregister'
import Basicinfo from '../screens/Basicinfo'
import Galleryhouse from '../screens/Galleryhouse'
import Roomregister from '../screens/Roomregister'
import Familyinfo from '../screens/Familyinfo';
import Loading from '../container/loading'

const AuthStack = createStackNavigator();
const AuthStack2 = createStackNavigator();
const LoadStack = createStackNavigator();
const DateStack = createStackNavigator();


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

export default class Navigator extends Component {
    constructor(props){
		super(props);
		this.state={
			email : '',
			password : '',
			refreshing: false,
      
		}
	}

	//If user is login then the first page would be Calendar
	async componentDidMount(){
		let validationLogin = await AsyncStorage.getItem('userLogin')
		if(validationLogin){
			validationLogin = JSON.parse(validationLogin)
			if(validationLogin.perm){
				this.setState({ access : 'true'})
                console.log(this.state.access)
			}else{
				this.setState({ access : 'false'})
                console.log(this.state.access)
			}
		}
		
	}
    render() {
        let access = this.state.access
    return (
    <NavigationContainer>
        <AuthStack2.Navigator>
            <AuthStack2.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <AuthStack.Screen name="CrearCuenta" component={CrearCuenta} options={{title : "Create Account", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Additionalregister" component={Additionalregister} options={{title : "Additional Info", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Basicinfo" component={Basicinfo} options={{title : "Basic Info", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Galleryhouse" component={Galleryhouse} options={{title : "Gallery", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Roomregister" component={Roomregister} options={{title : "Rooms Info", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Familyinfo" component={Familyinfo} options={{title : "Family Info", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack.Screen name="Calendar" component={Calendar} options={{title : "Calendar", headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff'}}/>
            <AuthStack2.Screen name="load" component={load} options={{headerShown: false, gestureEnabled: false}}/>
            <AuthStack2.Screen name="Calemdar" component={Calemdar} options={{headerShown: false, gestureEnabled: false}}/>
        </AuthStack2.Navigator>
    </NavigationContainer>
            )
        }
}