import React, { Component} from 'react'
import { View, Alert, ImageBackground, TouchableOpacity, Platform, Dimensions, Linking } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box, Icon, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {Picker} from '@react-native-picker/picker';
import Card from '../shared/card';

import Checkbox from 'expo-checkbox';

import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../components/context';

import NetInfo from "@react-native-community/netinfo";



export default class CrearCuenta extends Component{
	NetInfoSubscription = null;
	static contextType = AuthContext 

	constructor(props){ 
		super(props); 
			this.state = { 
				name : '', 
				lastname : '', 
				email : '', 
				password : '',
				isPasswordHide: true, 
				id_m : 'NULL',
				terms : 'no',

				requiredFields : false,

				//Internet Connection
				connection_status: false,
				clockrun : false,
			} 
	}
	
	async componentDidMount(){
		if (this.state.dog == 'yes') {
            this.setState({itemTerms : true})
        } else {
            this.setState({itemTerms : false}) 
        }

		this.NetInfoSubscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
          )
	}

	_handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
      }
    
      Clock = () => {
        this.timerHandle = setTimeout (() => {
          this.setState({clockrun : false});
          this.timerHandle = 0;
        }, 5000)
      }

	register = async () => {
		if (this.state.name == '' || this.state.lastname == '' || this.state.email == '' || this.state.password == '' || this.state.id_m == 'NULL' || this.state.itemTerms == false){
			Alert.alert('All fields are required')
			this.setState({requiredFields : true})
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
		let email = this.state.email.toLowerCase()
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
						email : this.state.email.toLowerCase(),
						perm : true
					}
					AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
					this.context.signUp()
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

	  noInternetConnection = () => {
        Alert.alert('There is no internet connection, connect and try again.')
      }

      componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;
      }

    render(){

  return (
    <NativeBaseProvider>
		<StatusBar style="light" translucent={true} />

			<Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
                <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2}  justifyContent="center">
                    <Text color="error.600" fontWeight="medium">
                    <AlertNativeBase.Icon />
                    <Text> No Internet Connection</Text>
                    </Text>
                </HStack>
                </VStack>
                </AlertNativeBase>
            </Slide>
		<ImageBackground source={require('../assets/BackgroundCrearCuentaHomebor.jpg')} style={globalStyles.ImageBackgroundNoti}>
        <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>

		<ScrollView>
		<View style={globalStyles.viewCrearCuenta}>
		
		<Box style={ globalStyles.contenedor }>
		
      <View style={ globalStyles.contenidoCrearCuenta}>
	  
        
		<Heading size='xl'style={ globalStyles.titulo }>Join to our HOMESTAY community</Heading>
		<FormControl style={globalStyles.formcontrolCrearCuenta}>
            <Stack >
			<FormControl isInvalid={this.state.requiredFields == true && this.state.name == '' && true}>
				<Stack inlineLabel last style={globalStyles.input}>
					<Input
					size="xl"
					style={globalStyles.inputCrearCuenta}
					placeholder="Name"
					variant="rounded"
					placeholderTextColor={this.state.requiredFields == true && "#D81606"} 
					onChangeText={ (name) => this.setState({name}) }
					/>
				</Stack>

			<FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
                This field is required and is empty.
            </FormControl.ErrorMessage>
			</FormControl>

			<FormControl isInvalid={this.state.requiredFields == true && this.state.lastname == '' && true}>
				<Stack inlineLabel last style={globalStyles.input}>
					<Input
					style={globalStyles.inputCrearCuenta}
					size="xl" 
					placeholder="Last Name"
					variant="rounded"
					placeholderTextColor={this.state.requiredFields == true && "#D81606"}
					onChangeText={ (lastname) => this.setState({lastname}) }
					/>
				</Stack>

				<FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
					This field is required and is empty.
				</FormControl.ErrorMessage>
			</FormControl>

			<FormControl isInvalid={this.state.requiredFields == true && this.state.email == '' && true}>
				<Stack inlineLabel last style={globalStyles.input}>
					<Input
					size="xl"
					style={globalStyles.inputCrearCuenta}
					placeholder="Email"
					variant="rounded"
					placeholderTextColor={this.state.requiredFields == true && "#D81606"}
					onChangeText={ (email) => this.setState({email}) }
					/>
				</Stack>

				<FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
					This field is required and is empty.
				</FormControl.ErrorMessage>
			</FormControl>
			
			<FormControl isInvalid={this.state.requiredFields == true && this.state.password == '' && true}>
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
						{this.state.isPasswordHide ?  <Icon as={FontAwesome} name="eye" size="8" style={globalStyles.ReportFeedbackIcons} /> :  <Icon as={FontAwesome} name="eye-slash" size="8" style={globalStyles.ReportFeedbackIcons} />}
					</TouchableOpacity>
					}
					size="xl"
					variant="rounded"
					onChangeText={this.onChangeText}
					placeholder="Password"
					placeholderTextColor={this.state.requiredFields == true && "#D81606"}
					value={this.state.password}
					
					secureTextEntry={this.state.isPasswordHide}
				/>
              </Stack>

			  	<FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
					This field is required and is empty.
				</FormControl.ErrorMessage>
			</FormControl>

            </Stack>
					
				<View style={globalStyles.CardCreateAccount}>
					<Card>

					<FormControl isInvalid={this.state.requiredFields == true && this.state.id_m == 'NULL' && true}>
						<FormControl.Label style={ globalStyles.infotitle}>Select Your Homestay Provider</FormControl.Label>

							<View style={globalStyles.pickerviewCrearCuenta}>
								<Picker
									style={globalStyles.pickerCrearCuenta} 
									selectedValue={this.state.id_m}
									itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}} 
									onValueChange={(id_m) => this.setState({id_m})}>
										<Picker.Item label="Select" value="NULL" /> 
										<Picker.Item label="iHomestay" value="10" /> 
										<Picker.Item label="Other" value="0" />
								</Picker>
							</View>

							<FormControl.ErrorMessage>
								This field is required and is empty.
							</FormControl.ErrorMessage>
					</FormControl>

						<FormControl isInvalid={this.state.requiredFields == true && this.state.itemTerms == false && true}>
							<View style={globalStyles.editSelectsSquare}>
								<Checkbox  value={this.state.itemTerms} onValueChange={(itemTerms) => this.setState({itemTerms})} color={this.state.itemTerms ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
								<Text style={globalStyles.labelSelectEdit}>I Agree With <Text style={globalStyles.labelSelectEditTermsConditions}
									onPress={() => Linking.openURL('https://homebor.com/privacy-policy')}>
										Terms and Conditions
									</Text></Text>
							</View>

							<FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
								You must to be agree with our Terms of Service to continue.
							</FormControl.ErrorMessage>
						</FormControl>
					</Card>
				</View>
 
        	</FormControl>

        
					
			{this.state.connection_status ? <View>
				<Button 
					success
					bordered
					onPress={this.register}
					style={globalStyles.botonCrearCuenta}>
                <Text 
                  onPress={ this.register }
                  style={globalStyles.createaccountButton}> Sign Up </Text>
				  </Button>
				  </View> : <View>

				  <Button 
					success
					bordered
					onPress={() => this.noInternetConnection()}
					style={globalStyles.botonCrearCuenta}>
						<Text 
						onPress={() => this.noInternetConnection()}
						style={globalStyles.createaccountButton}> Sign Up </Text>
				  </Button>

				  </View>}
				 

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