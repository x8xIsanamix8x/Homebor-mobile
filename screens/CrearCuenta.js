import React from 'react'
import { View, Text, Alert } from 'react-native'
import { Container, Button, H1, Input, Form, Item } from 'native-base'
import globalStyles from '../styles/global';
import { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
	

	register = async () => {
		let email = this.state.email
		let password = this.state.password

		//Api of user duplicated validation
		return await fetch(`https://homebor.com/validationusersapp.php?email=${email}&password=${password}`, {
                method: 'POST',
                header: {
                    'Content-Type': 'multipart/form-data'
                },
              }).then(res => res.json())
                .catch(error => console.error('Error', error))
                .then(response => {
                  if (response.status == 1) {
					Alert.alert('Este Usuario ya existe')
                  }
                  else {
					this.register2()
                  }
				});
	}

	register2 = async () => {
		//Api of register
		let name = this.state.name
		let lastname = this.state.lastname
		let email = this.state.email
		let password = this.state.password

		return await fetch(`https://homebor.com/registerApp.php?name=${name}&lastname=${lastname}&email=${email}&password=${password}`, {
				method: 'POST',
				header: {
					'Content-Type': 'multipart/form-data'
				},
			  }).then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
				  if (response.status == 1) {
					Alert.alert('Register Successfully')
					let userLogin = {
						email : this.state.email,
						perm : true
					}
					AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
					this.props.navigation.navigate('Basicinfo')
				  }
				  else {
					Alert.alert('Error on Register')
				  }
				});
	}


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