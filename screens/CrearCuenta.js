import React, { Component} from 'react'
import { View, Alert, ImageBackground  } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

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
		if (this.state.name == '' || this.state.lastname == '' || this.state.email == '' || this.state.password == ''){
			Alert.alert('All fields are required')
		} else {
			let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  			if (reg.test(this.state.email) === true) {
				var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
				if (re.test(this.state.password) === true) {
			
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
						Alert.alert(`${this.state.email} is already register`)
					}
					else {
						this.register2()
					}
					});
				
		}
		else {Alert.alert('The password must have 8 to 15 characters, an uppercase, a lowercase, a number and a special character')}
		}
		else {
			Alert.alert('The email must be a valid email address')
		}
	}
	
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
		<ImageBackground source={require('../assets/BackgroundCrearCuentaHomebor.jpg')} style={globalStyles.ImageBackgroundNoti}>
		<ScrollView style={{marginTop : '20%'}} scrollEnabled={false}>
		
		
		<Box style={ globalStyles.contenedor }>
		
      <View style={ globalStyles.contenidoCrearCuenta}>
	  
        <Heading size='xl'style={ globalStyles.titulo }>Join to our HOMESTAY community</Heading>
        <FormControl style={{marginTop : '10%'}}>
            <Stack >
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
				  size="xl"
				  style={globalStyles.inputCrearCuenta}
                  placeholder="Name"
				  variant="rounded"
                  onChangeText={ (name) => this.setState({name}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
				  style={globalStyles.inputCrearCuenta}
				  size="xl" 
                  placeholder="Last Name"
				  variant="rounded"
                  onChangeText={ (lastname) => this.setState({lastname}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
				size="xl"
				style={globalStyles.inputCrearCuenta}
                placeholder="Email"
				variant="rounded"
                onChangeText={ (email) => this.setState({email}) }
                />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <Input
				size="xl"
				style={globalStyles.inputCrearCuenta}
                secureTextEntry={true} 
                placeholder="Password"
				variant="rounded"
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
	 
	  </ScrollView>
	  </ImageBackground>
	 
    </NativeBaseProvider>
  );
}
}