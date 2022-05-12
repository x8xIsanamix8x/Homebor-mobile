import React, { Component} from 'react'
import { View, Alert, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box, Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {Picker} from '@react-native-picker/picker';
import Card from '../shared/card';


export default class CrearCuenta extends Component{

	constructor(props){ 
		super(props); 
			this.state = { 
				name : '', 
				lastname : '', 
				email : '', 
				password : '',
				isPasswordHide: true, 
				id_m : 'NULL'
			} 
	}
	

	register = async () => {
		if (this.state.name == '' || this.state.lastname == '' || this.state.email == '' || this.state.password == '' || this.state.id_m == 'NULL'){
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
		let id_m = this.state.id_m

		return await fetch(`https://homebor.com/registerApp.php?name=${name}&lastname=${lastname}&email=${email}&password=${password}&id_m=${id_m}`, {
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

	onChangeText = text => {
		this.setState({
		  password: text
		});
	  };
	
	  changePasswordVisibility = () => {
		this.setState({
		  isPasswordHide: !this.state.isPasswordHide
		});
	  };

    render(){
  return (
    <NativeBaseProvider>
		<ImageBackground source={require('../assets/BackgroundCrearCuentaHomebor.jpg')} style={globalStyles.ImageBackgroundNoti}>
        <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>

		<ScrollView>
		<View style={{marginTop : '10%'}}>
		
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
              <Stack inlineLabel last style={globalStyles.inputpassword}>

				<Input
					style={
					this.state.isPasswordHide
						? globalStyles.inputCrearCuenta
						: [globalStyles.inputCrearCuenta, { color: "#000"}]
					}
					InputRightElement={
					<TouchableOpacity
					style={globalStyles.ReportFeedbackLCrearcuenta}
					onPress={()=>this.changePasswordVisibility()}>
						{this.state.isPasswordHide ?  <Icon as={FontAwesome} name="eye" style={globalStyles.ReportFeedbackIcons} /> :  <Icon as={FontAwesome} name="eye-slash" style={globalStyles.ReportFeedbackIcons} />}
					</TouchableOpacity>
					}
					size="xl"
					variant="rounded"
					onChangeText={this.onChangeText}
					placeholder="Password"
					value={this.state.password}
					
					secureTextEntry={this.state.isPasswordHide}
				/>
              </Stack>
            </Stack>
					
				<View style={globalStyles.CardCreateAccount}>
					<Card>
						<FormControl.Label style={ globalStyles.infotitle}>Select Your Homestay Provider</FormControl.Label>

							<View style={{marginTop: '-10%'}}>
								<Picker
									style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
									selectedValue={this.state.id_m}
									itemStyle={{fontSize: 18}} 
									onValueChange={(id_m) => this.setState({id_m})}>
										<Picker.Item label="Select" value="NULL" /> 
										<Picker.Item label="iHomestay" value="10" /> 
										<Picker.Item label="Other" value="0" />
								</Picker>
							</View>
					</Card>
				</View> 
        	</FormControl>

        
		
				<Button 
					success
					bordered
					onPress={this.register}
					style={globalStyles.botonCrearCuenta}>
                <Text 
                  onPress={ this.register }
                  style={globalStyles.createaccountButton}> Sign Up </Text>
				  </Button>
				 

      </View>
	  
	  </Box>
	  </View>
	  </ScrollView>
	  </KeyboardAwareScrollView>
	  </ImageBackground>
	 
    </NativeBaseProvider>
  );
}
}