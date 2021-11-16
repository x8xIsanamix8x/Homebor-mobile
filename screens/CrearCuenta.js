import React, { Component} from 'react'
import { View, Alert, Container, H1, Form, Item  } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box } from 'native-base';

import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CrearCuenta extends Component{

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
  return (
    <NativeBaseProvider>
		<Box style={ globalStyles.contenedor }>
      <View style={ globalStyles.contenido }>
        <Heading size='xl'style={ globalStyles.titulo }>Join our HOMESTAY community</Heading>
        <FormControl>
            <Stack >
              <Stack inlineLabel last style={globalStyles.input}>
                <Input 
                  placeholder="Name"
                  onChangeText={ (name) => this.setState({name}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input 
                  placeholder="Last Name"
                  onChangeText={ (lastname) => this.setState({lastname}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
                placeholder="Email"
                onChangeText={ (email) => this.setState({email}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
                secureTextEntry={true} 
                placeholder="Password"
                onChangeText={ (password) => this.setState({password}) }
                />
              </Stack>
            </Stack>
        </FormControl>
        
		
				<Button 
					success
					bordered
					onPress={this.register}
					style={globalStyles.boton}>
                <Text 
                  onPress={ this.register }
                  style={globalStyles.createaccountButton}> Sing Up </Text>
				  </Button>

      </View>
	  </Box>
    </NativeBaseProvider>
  );
}
}