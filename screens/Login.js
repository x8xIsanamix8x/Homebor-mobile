import React from 'react'
import { View, Image } from 'react-native'
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base'
import globalStyles from '../styles/global';
import { Font, AppLoading } from "expo";


const Login = ({navigation}) => {

	return ( 
		<Container style={ globalStyles.contenedor } >

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
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							secureTextEntry={true}
							placeholder="Password"
						/>
					</Item>
				</Form>

				<Button
					onPress={ () => navigation.navigate("CrearCuenta") }
					style={globalStyles.boton}
				>
					<Text
						style={globalStyles.botonTexto}
					> Login </Text>
				</Button>

				<Text 
					style={globalStyles.enlace}
					style={globalStyles.createaccount}> Create Account </Text>


			</View>
		</Container>
	);
}

export default Login;