import React, { Component} from 'react'
import { View, Alert, ImageBackground, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box, Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';

import { FontAwesome } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default class RecoverPassword extends Component{

	constructor(props){ 
		super(props); 
			this.state = { 
				email : '', 
				password : '',
				isPasswordHide: true, 
                isPasswordHide2: true, 

                status : 1,
			} 
	}

    async componentDidMount(){
		 //Refresh when is another event
         this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});
	}

    onRefresh = async () => {
        this.setState({ email: '', password: '', password2: '', status: 1})
    }
	
    valEmail = async () => {
        if (this.state.email == ''){
			Alert.alert('All fields are required')
		} else {
            let email = this.state.email

            return await fetch(`https://homebor.com/validationuserrecoverpasswordapp.php?email=${email}`, {
					method: 'POST',
					header: {
						'Content-Type': 'multipart/form-data'
					},
				}).then(res => res.json())
					.catch(error => console.error('Error', error))
					.then(response => {
					if (response.status == 1) {
						this.changeStatus()
					}
					else {
                        Alert.alert(`We sorry, this user is not registered to any user.`)
					}
					});
        }
    }

    changeStatus = async () => {
        this.setState({status: 2});
    }

    changepass = async () => {
        if (this.state.password == '' || this.state.password2 == '' ){
            Alert.alert('All fields are required')
        } else {
            if (this.state.password != this.state.password2){
                Alert.alert('Seems like those passwords are different')
            } else {
                var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
				if (re.test(this.state.password) === true) {
                    
                    let email = this.state.email
                    let password = this.state.password

                    //Api of user duplicated validation
                    return await fetch(`https://homebor.com/recoverchangepasswordapp.php?email=${email}&password=${password}`, {
                            method: 'POST',
                            header: {
                                'Content-Type': 'multipart/form-data'
                            },
                        }).then(res => res.json())
                            .catch(error => console.error('Error', error))
                            .then(response => {
                            if (response.status == 1) {
                                Alert.alert(`You can access now we your new password`)
                                this.props.navigation.navigate('Login')
                            }
                            else {
                                Alert.alert(`Error changing your password`)
                            }
                            });

                } else {
                    Alert.alert('The password must have 8 to 15 characters, an uppercase, a lowercase, a number and a special character')
                }

            }
         }
    }

	
	onChangeText = text => {
		this.setState({
		  password: text
		});
	  };

      onChangeText2 = text => {
		this.setState({
		  password2: text
		});
	  };
	
	  changePasswordVisibility = () => {
		this.setState({
		  isPasswordHide: !this.state.isPasswordHide
		});
	  };

      changePasswordVisibility2 = () => {
		this.setState({
		  isPasswordHide2: !this.state.isPasswordHide2
		});
	  };

    render(){
  return (
    <NativeBaseProvider>
		<View style={globalStyles.BackgroundNoti}>
        <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>

		<ScrollView>
		<View style={globalStyles.viewCrearCuenta}>
		
		<Box style={ globalStyles.contenedor }>
		
      <View style={ globalStyles.contenidoCrearCuenta}>
	  
		{this.state.status == 1 ? <View>
            <Text style={ globalStyles.ReportsTextDate}>Please enter your email and we will send you instructions on how to reset your password.</Text>
                <FormControl style={globalStyles.formcontrolCrearCuenta}>
                    <Stack >
                        <Stack inlineLabel last style={globalStyles.input}>
                            <Input
                            size="xl"
                            style={globalStyles.inputCrearCuenta}
                            placeholder="Email"
                            variant="underlined"
                            onChangeText={ (email) => this.setState({email}) }
                            />
                        </Stack>
                    </Stack>	
                </FormControl>

        
		
				<Button 
					success
					bordered
					onPress={this.valEmail}
					style={globalStyles.botonCrearCuenta}>
                <Text 
                  onPress={ this.valEmail }
                  style={globalStyles.createaccountButton}> Reset Password </Text>
				  </Button>

        </View> : <View>
            <Text style={globalStyles.ReportsTextDate}>Please enter your new password.</Text>
                <FormControl style={globalStyles.formcontrolCrearCuenta}>
                    <Stack >
                        <Stack inlineLabel last style={globalStyles.input}>
                            <Input
                                style={
                                this.state.isPasswordHide
                                ? globalStyles.inputLogin
                                : [{ color: "#000"}]
                                }
                                InputRightElement={
                                <TouchableOpacity
                                style={globalStyles.ReportFeedbackLLogin}
                                onPress={()=>this.changePasswordVisibility()}>
                                    {this.state.isPasswordHide ?  <Icon as={FontAwesome} name="eye" size="8" style={globalStyles.ReportFeedbackIcons} /> :  <Icon as={FontAwesome} name="eye-slash" size="8" style={globalStyles.ReportFeedbackIcons} />}
                                </TouchableOpacity>
                                }
                                size="xl"
                                variant="underlined"
                                onChangeText={this.onChangeText}
                                placeholder="Password"
                                value={this.state.password}
                                secureTextEntry={this.state.isPasswordHide}
                            />
                        </Stack>
                        <Stack inlineLabel last style={globalStyles.input}>
                            <Input
                                style={
                                this.state.isPasswordHide2
                                ? globalStyles.inputLogin
                                : [{ color: "#000"}]
                                }
                                InputRightElement={
                                <TouchableOpacity
                                style={globalStyles.ReportFeedbackLLogin}
                                onPress={()=>this.changePasswordVisibility2()}>
                                    {this.state.isPasswordHide2 ?  <Icon as={FontAwesome} name="eye" size="8" style={globalStyles.ReportFeedbackIcons} /> :  <Icon as={FontAwesome} name="eye-slash" size="8" style={globalStyles.ReportFeedbackIcons} />}
                                </TouchableOpacity>
                                }
                                size="xl"
                                variant="underlined"
                                onChangeText={this.onChangeText2}
                                placeholder="Repeat Password"
                                value={this.state.password2}
                                secureTextEntry={this.state.isPasswordHide2}
                            />
                        </Stack>
                    </Stack>	
                </FormControl>

        
        
                <Button 
                    success
                    bordered
                    onPress={this.changepass}
                    style={globalStyles.botonCrearCuenta}>
                <Text 
                    onPress={ this.changepass }
                    style={globalStyles.createaccountButton}> Reset Password </Text>
                    </Button>
        </View>
        }
				 

      </View>
	  
	  </Box>
	  </View>
	  </ScrollView>
	  </KeyboardAwareScrollView>
	  </View>
	 
    </NativeBaseProvider>
  );
}
}