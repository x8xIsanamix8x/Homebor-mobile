import React, { Component } from 'react'
import { View, Image,   Alert, KeyboardAvoidingView, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Button, H1, Input, Form, Item, Toast, Text,} from 'native-base'
import globalStyles from '../styles/global';
import { Font, AppLoading } from "expo";

import api from '../api/api';
import { ScrollView } from 'react-native-gesture-handler';

class Login extends Component {

	constructor(props){
		super(props);
		this.state={
			email : '',
			password : ''
			
		}
	}

	//If user is login then the first page would be Calendar
	async componentDidMount(){
		let validationLogin = await AsyncStorage.getItem('userLogin')
		if(validationLogin){
			validationLogin = JSON.parse(validationLogin)
			if(validationLogin.perm){
				this.props.navigation.navigate('Loading')
			}else{
				this.props.navigation.navigate('Login')
			}
		}
	}

	register = () => {
		this.props.navigation.navigate('CrearCuenta')
	}

	navegar = async (param) => {
		if(param=="Loading"){
			let valLog = await api.valLog(this.state.email,this.state.password)
			if (valLog.status==1){
				let userLogin = {
					email : this.state.email,
					perm : true
				}
				AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
				this.props.navigation.navigate(param)
				console.log(userLogin)
			}else{
				Alert.alert('Error, usuario o clave invalido')
			}
		}else{
			this.props.navigation.navigate(param)
		}
	}

	render(){

		return(

			<Container style={ globalStyles.contenedor } >
 
 				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={ globalStyles.contenedor }>

					<ScrollView style={ globalStyles.contenedor}>

						<View style={{flexDirection: 'row'}}>
								<Image 
									style={globalStyles.banner }
									source={require('../assets/img/banner.jpg')}
								/>
						</View>

						<View style={{flexDirection: 'row'}}>
								<Image 
									style={globalStyles.homebor }
									source={require('../assets/img/homebor.png')}
								/>
						</View>

						<View style={ globalStyles.contenido } >

							<Form>
								<Item inlineLabel last style={globalStyles.input} >
									<Input
										placeholder="Email"
										onChangeText={(email) => this.setState({email})}
									/>
								</Item>
								<Item inlineLabel last style={globalStyles.input} >
									<Input
										secureTextEntry={true}
										placeholder="Password"
										onChangeText={(password) => this.setState({password})}
									/>
								</Item>
							</Form>

							<Button
								bordered
								success
								square
								block
								style={globalStyles.boton}
								onPress={() => this.navegar('Loading')}

							>
								<Text
									style={globalStyles.botonTexto}
								> Login </Text>
							</Button>

							<Text 
								style={globalStyles.enlace}
								onPress={ this.register }
								style={globalStyles.createaccount}> Create Account </Text>


						</View>


					</ScrollView>

				</KeyboardAvoidingView>

			</Container>		


		);

	}



}


export default Login;