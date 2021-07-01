import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Button, H1, Input, Form, Item, Toast, TouchableWithoutFeedback, Keyboard } from 'native-base'
import globalStyles from '../styles/global';
import { Component } from 'react';

import api from '../api/api';

class CrearCuenta extends Component {

	constructor(props){ 
		super(props); 
			this.state = { 
				name : '', 
				lastname : '', 
				email : '', 
				password : '' 
			} 
	}
	

	register = () => api.registerData(this.state.name,this.state.lastname,this.state.email,this.state.password)


    render(){


        return(

            <Container style={ globalStyles.contenedor }>

			<View style={ globalStyles.contenido } >
				<H1 style={ globalStyles.titulo }>Join our HOMESTAY community</H1>
			

				<Form>
					<Item inlineLabel last style={globalStyles.input} >
						<Input 
							placeholder="Name"
							onChangeText={ (name) => this.setState({name}) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input 
							placeholder="Last Name"
							onChangeText={ (lastname) => this.setState({lastname}) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							placeholder="Email"
							onChangeText={ (email) => this.setState({email}) }
						/>
					</Item>
					<Item inlineLabel last style={globalStyles.input} >
						<Input
							secureTextEntry={true} 
							placeholder="Password"
							onChangeText={ (password) => this.setState({password}) }
						/>
					</Item>
				</Form>

				<Button
					success
					bordered
					onPress={this.register}
					style={globalStyles.boton}
				>

					<Text
							style={globalStyles.botonTexto}
					> Sing Up </Text>
				</Button>


			</View>

		</Container>

        );

    }

}

export default CrearCuenta;