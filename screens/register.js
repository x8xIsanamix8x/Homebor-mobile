import React from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast, TouchableWithoutFeedback, Keyboard } from 'native-base';
import { globalStyles } from '../styles/global';

export default function Register({ navigation }) {

	const pressHandler = () => {
		navigation.goBack();
	}

	return(
		<Container style={ globalStyles.contenedor }>

			<View  style={ globalStyles.contenido }>
				<H1 style={ globalStyles.titulo }>Join our HOMESTAY community</H1>
			

				<Form>
					<Item inlineLabel last style={globalStyles.input} >
						<Input 
							placeholder="Name"
							onChangeText={ texto => guardarNombre(texto) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input 
							placeholder="Last Name"
							onChangeText={ texto => guardarLastname(texto) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							placeholder="Email"
							onChangeText={ texto => guardarEmail(texto) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							secureTextEntry={true} 
							placeholder="Password"
							onChangeText={ texto => guardarPassword(texto) }
						/>
					</Item>
				</Form>
			<Button
						
                        //onPress={ () => handleSubmit() }
						onPress={pressHandler}
					>
						<Text
							style={globalStyles.botonTexto}
						> Sing Up </Text>
					</Button>
		</View>

			</Container>
		)
}

