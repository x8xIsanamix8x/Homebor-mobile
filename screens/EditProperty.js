import React, {Component, useState} from 'react'; 
import { View, Text, ScrollView } from 'react-native'
import { Container, Button, H1, Input, Form, Item, Toast, TouchableWithoutFeedback, Keyboard } from 'native-base'
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';


import api from '../api/api';

export default class EditProperty extends Component {

    constructor(props){ 
		super(props); 
			this.state = { 
                email : '',
                perm : false,

                hname : '',
                num : '',
                room : '',
                //address : '',
                //city : '',
                //state : '',
                //postalcode : '',
				
			} 
	} 

    async componentDidMount(){
    
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        

    }


    registerbasici = () => api.registerbasicinformation(this.state.hname,this.state.num,this.state.room)

	render(){
    
        return ( 
		
		<Container style={ globalStyles.contenedor }>

            <ScrollView>

                <View style={ globalStyles.contenido } >
                
                    <H1 style={ globalStyles.titulobasic }>Basic Information</H1>

                    <Form>
                        <Item inlineLabel last style={globalStyles.input} >
                            <Input 
                                placeholder="House Name"
                                onChangeText={ (hname) => this.setState({hname}) }
                            />
                        </Item>
                        <Item inlineLabel last style={globalStyles.input} >
                            <Input 
                                placeholder="Phone Number"
                                onChangeText={ (num) => this.setState({num}) }
                            />
                        </Item>

                        <View style={globalStyles.cardrooms}>

                            <Text style={ globalStyles.infotitle}>Rooms</Text>

                        <Picker
                            selectedValue={this.state.room}
                            onValueChange={(itemValue, itemIndex) =>
                            this.setState({ room: itemValue })
                            }

                        itemStyle={{color:'black', fontSize:17,}}>

                            <Picker.Item label="Select the amount of room" value=""/>
                            <Picker.Item label="1" value="1"/>
                            <Picker.Item label="2" value="2"/>
                            <Picker.Item label="3" value="3"/>
                            <Picker.Item label="4" value="4"/>
                            <Picker.Item label="5" value="5"/>
                            <Picker.Item label="6" value="6"/>
                            <Picker.Item label="7" value="7"/>
                            <Picker.Item label="8" value="8"/>

                        </Picker>
                        </View>

                        
                    </Form>

                    <Button
					success
					bordered
					onPress={this.registerbasici}
					style={globalStyles.boton}
				>

					<Text
							style={globalStyles.botonTexto}
					> Continue... </Text>
				    </Button>

                </View>

            </ScrollView>

		</Container>
	);
}
}