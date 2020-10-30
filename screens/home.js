import React, {useState} from 'react';
import { View, Image } from 'react-native';
import {StyleSheet, Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { globalStyles } from '../styles/global';

export default function Home({ navigation }) {

	const Register = () => {
		navigation.push('Register');
	}

	const Login = () => {
		navigation.push('Index');
	}

	return(

		<Container style={globalStyles.contenedor}>
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

			<View style={ globalStyles.contenido }>
				<Form>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							placeholder="Email"
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							secureTextEntry={true}
							placeholder="Password"
						/>
					</Item>

					<Button
					onPress={Login}
					style={globalStyles.boton}
				>
					<Text
						style={globalStyles.botonTexto}
					> Login </Text>
				</Button>

				<Text 
					style={globalStyles.enlace}
				style={globalStyles.createaccount} onPress={Register}> Create Account </Text>
				</Form>

			</View>



			
		</Container>

		)
}

