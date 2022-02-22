import React, { Component} from 'react'
import { View, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Box } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

import api from '../api/api';
import globalStyles from '../styles/global';

export default class Login extends Component {
  constructor(props){
		super(props);
		this.state={
			email : '',
			password : '',
			refreshing: false,
      
		}
	}

	//If user is login then the first page would be Calendar
	async componentDidMount(){
		let validationLogin = await AsyncStorage.getItem('userLogin')
		if(validationLogin){
			validationLogin = JSON.parse(validationLogin)
			if(validationLogin.perm){
				this.props.navigation.navigate('Calemdar')
			}else{
				this.props.navigation.navigate('Login')
			}
		}
		
	}

	register = () => {

		this.props.navigation.navigate('CrearCuenta')
	}

	navegar = async (param) => {
    if (this.state.email == '' || this.state.password == '') {
      Alert.alert('All fields are required') 
    }else {
      if(param=="load"){
        let valLog = await api.valLog(this.state.email,this.state.password)
        if (valLog.status==1){
          let userLogin = {
            email : this.state.email,
            perm : true
          }
          AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
          this.props.navigation.navigate(param)
          console.log(userLogin)
        }else{
          Alert.alert('Seems like user or password are incorrect')
        }
      }else{
        this.props.navigation.navigate(param)
      }
    }
		
	}
  render() {
  return (
    
    <NativeBaseProvider>
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={ globalStyles.contenedor }>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <Image 
              style={ globalStyles.banner}
              source={require('../assets/banner2.jpg')}
            />
          </View>
          <View style={{ flexDirection: 'row', marginLeft : '2%', marginRight : '2%', marginBottom : '20%'}}>
            <Image 
              style={globalStyles.homebor }
              source={require('../assets/homebor1900.png')}
              />
          </View>

          <View style={ globalStyles.contenido } >
          <FormControl>
        <Stack >
          <Stack inlineLabel last style={globalStyles.input}>
            <Input
                size="xl"
                variant="underlined"
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}
              />
          </Stack>
          <Stack inlineLabel last style={globalStyles.input}>
            <Input
                size="xl"
                variant="underlined"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
              />
          </Stack>
        </Stack>
      </FormControl>

      <Button
                  bordered
                  success
                  square
                  block
                  style={globalStyles.boton}
                  onPress={() => this.navegar('load')}

                >
                  <Text
                    style={globalStyles.botonTexto}
                  > Login </Text>
                </Button>

                <Text 
                  style={globalStyles.enlace}
                  onPress={ this.register }
                  style={globalStyles.createaccount}> Create Account </Text>


                
                  
                
          </View>
        </ScrollView>
        
      </KeyboardAvoidingView>
      
    
    </NativeBaseProvider>
   
  );
}
}