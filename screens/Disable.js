import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, Text, KeyboardAvoidingView, RefreshControl, TextInput, Alert } from 'react-native';
import { Container, Button, H1, H2, Input, Form, Item, Icon } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import { Font, AppLoading } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {Spinner} from 'native-base';
import CollapsibleList from "react-native-collapsible-list";
import { AntDesign } from '@expo/vector-icons';


class Disable extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		  loading : true,
		  refreshing: false,
		  id: '',
		  reason: '',
		  idm: '',
		}
	  }
	
	  async componentDidMount(){
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false, idm: profile.data[0].id_m })
		console.log(this.state.idm)
	  }

	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        refresh = async() => {
            let profile = await api.getProfile(this.state.email,this.state.perm)
			this.setState({ info : profile.data, loading : false, idm: profile.data[0].id_m })
			//console.log(this.state.info)
          }
		
		disable = async () => {
			if (!this.state.id || !this.state.reason) {
				Alert.alert("All fields are required to disable disable a user")
			}else{
			console.log(this.state.id,this.state.email,this.state.idm,this.state.reason)
			api.disableUser(this.state.id,this.state.email,this.state.idm,this.state.reason)
			this.props.navigation.navigate('Logout')
			}
		}



		


	render() {

	return ( 
		
		<FlatList
		data={this.state.info}
		extraData={this.state.info}
		ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
		keyExtractor={item => `${item.info}`}
		nestedScrollEnabled={true}
        refreshControl={
            <RefreshControl
               enabled={true}
               refreshing={this.state.refreshing}
               onRefresh={this.onRefresh}
               tintColor="purple"
               colors={["purple","purple"]}
               size={RefreshControl.SIZE.LARGE}
           />
        }
		renderItem={({item}) => (
			<Container style={ globalStyles.contenedor} >
				
				<ScrollView nestedScrollEnabled={true} >
					<Card>
						<H1 style={ globalStyles.disabletitle}>Disable Account</H1>
					</Card>

					{/* Basic Information*/}
					<View style={globalStyles.messageDisable}>
						<View style={globalStyles.disablewarningView}>
							<Text><Icon name='cog' style={ globalStyles.disablewarning}> You are about to disable this account</Icon></Text>
							<Text style={ globalStyles.disablewarning}>{"\n"}Once a propertie is disable the user will not login in Homebor until his user has been reactivated again. its files, all Information and events will be not removing of the data.{"\n"}</Text>
						</View>
					</View>
					<View style={globalStyles.messageDisable2}>
					<Text style={ globalStyles.disablebold}>All Fields Required{"\n"}</Text>
						{item.id_home == "NULL"
									?
										<Text></Text>
									:
										
										<Text style={ globalStyles.disablewarning}>Please type the following to confirm: <Text style={ globalStyles.disablebold}>{item.id_home}</Text></Text>
								}
					
						<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={ globalStyles.contenedor }>

						<Form>
						<Item inlineLabel last style={globalStyles.input} >
										<Input
											onChangeText={(id) => this.setState({id})}
											placeholder='ID'
										/>
									</Item>
									<Item inlineLabel last style={globalStyles.hideContents} >
									<Input 
                                    defaultValue={item.mail_h}
                                    onChangeText={ (email) => this.setState({email}) }
                                	/>
									</Item>
									<Item inlineLabel last style={globalStyles.hideContents} >
									<Input
									defaultValue={item.id_m}
									onChangeText={ (idm) => this.setState({idm}) }
                                	/>
									</Item>
									<Text style={ globalStyles.disablebold}>Reason</Text>
									<Item inlineLabel last style={globalStyles.input} >
										<Input
											placeholder='Tell us why'
											onChangeText={(reason) => this.setState({reason})}
										/>
									</Item>

						</Form>
						<Button
							bordered
							success
							square
							block
							style={globalStyles.boton}
							onPress={this.disable}
							>
								<Text
									style={globalStyles.botonTexto}
								><Icon name='person' style={globalStyles.botonTexto}> Disable</Icon></Text>
							</Button>
					</KeyboardAvoidingView>
				</View>



				</ScrollView>
				
			</Container>
			
		)}
		>

		</FlatList>
	)
};


}

export default Disable;