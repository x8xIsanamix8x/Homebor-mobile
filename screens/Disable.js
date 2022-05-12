import React, {Component, useState} from 'react'; 
import { View, ScrollView, KeyboardAvoidingView, RefreshControl, Alert } from 'react-native';
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Icon, Heading } from 'native-base';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StatusBar } from 'expo-status-bar';

export default class Disable extends Component {

    constructor(props){
		super(props);
		this.state = {
		  //Variables
		  email : '',
		  perm : false,
		  info : [],
          refreshing: false,
		}
	  }
	
	  async componentDidMount(){
		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		});

		//Get users data
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		
		//Get user profile data
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false, idm: profile.data[0].id_m })
		console.log(this.state.idm)
	  }

	  //Function to prepare the refresh on screen when pull up
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

		//Function to refresh the screen
        refresh = async() => {
			//Get users data
			let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})
			
			//Get user profile data
			let profile = await api.getProfile(this.state.email,this.state.perm)
			this.setState({ info : profile.data, loading : false, idm: profile.data[0].id_m })
			console.log(this.state.idm)

          }
		
		//Function to disable user account
		disable = async () => {
			//If user don't submit the required files, this message will appear on screen
			if (!this.state.id || !this.state.reason) {
				Alert.alert("All fields are required to disable disable a user")
			}else{
			//Function to update the database to disable user account
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
        />
        }
        renderItem={({item}) => (
            <NativeBaseProvider>
                <StatusBar style="light" />
                
                <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
                    <ScrollView nestedScrollEnabled={true} >
                        

                        {/*Warning*/}
                        <Heading size='xl' style={ globalStyles.disablebold2}> You are about to disable this account</Heading>
                            <View style={globalStyles.messageDisable}>
                                <View style={globalStyles.disablewarningView}>
                                    <Text style={ globalStyles.disablewarning}>Once a propertie is disable the user will not login in Homebor until his user has been reactivated again. its files, all Information and events will be not removing of the data.{"\n"}</Text>
                                </View>
                            </View>

                        {/*Fields*/}
                            <View style={globalStyles.messageDisable2}>
                                <Text style={ globalStyles.disablebold}>All Fields Required{"\n"}</Text>
                            </View>

                            <View style={globalStyles.contenido}>
                                <View style={globalStyles.disableMargins}>

                            {item.id_home == "NULL"
                                                ?
                                                    <Text></Text>
                                                :
                                                    
                                                    <Text style={ globalStyles.disablewarning}>Please type the following to confirm: <Text style={ globalStyles.disablebold}>{item.id_home}</Text></Text>
                                            }
                            
                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={ globalStyles.contenedor }>
                                    <FormControl>
                                        <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <Input
                                                                onChangeText={(id) => this.setState({id})}
                                                                placeholder='ID'
                                                                style={ globalStyles.inputedit}
                                                            />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.hideContents}>
                                                <Input 
                                                                defaultValue={item.mail_h}
                                                                onChangeText={ (email) => this.setState({email}) }
                                                                style={ globalStyles.inputedit}
                                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.hideContents}>
                                                <Input
                                                                defaultValue={item.id_m}
                                                                onChangeText={ (idm) => this.setState({idm}) }
                                                                style={ globalStyles.inputedit}
                                                                />
                                            </Stack>

                                            <Text style={ globalStyles.disablewarning}>Reason :</Text>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                                    <Input
                                                                        placeholder='Tell us why'
                                                                        onChangeText={(reason) => this.setState({reason})}
                                                                        style={ globalStyles.inputedit}
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
                                        onPress={this.disable}>
                                            <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='user' style={globalStyles.botonTextoDisable}> Disable</Icon></Text>
                                    </Button>
                                </KeyboardAvoidingView>
                                </View>
                            </View>
                    </ScrollView>
                    </KeyboardAwareScrollView>

            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}