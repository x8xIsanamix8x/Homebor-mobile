import React, {Component, useState, useEffect} from 'react';
import { View, Image, Platform } from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import {Spinner} from 'native-base';
import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

export default class Basicinfo extends Component {
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],
			} 
	} 
    async componentDidMount(){
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        //Get user profile (In this file all must be NULL and with that we can put the fields empty in frontend)
        let profile = await api.getBasicdata(this.state.email,this.state.perm)
		this.setState({ info : profile.data, hname : profile.data[0].h_name, num : profile.data[0].num, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, id : profile.data[0].id_home, idm : profile.data[0].id_m, nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law})
		console.log(this.state.info)

        //Permissions function call
        this.getPermissionAsync();
    }

    //Permissions function to access to the documents in the phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    //Function to catch file from frontend
    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 backfile: result.uri,
                 namei : result.name,
             });


        }
    }

    //Register to database function
    registerbasici = async () => {
        //if the required files are empty then this messages will print on screen
        if (this.state.hname == 'NULL' || this.state.num == 'NULL' || this.state.dir == 'NULL' || this.state.cities == 'NULL' || this.state.states == 'NULL' || this.state.p_code == 'NULL' || this.state.nameh == 'NULL' || this.state.lnameh == 'NULL' || this.state.db == 'NULL' || this.state.gender == 'NULL'){
            Alert.alert('All fields with * are required')
        }else{
            //If all required file are not empty the function to register will start
            this.registerbasici1()
        }
    }

    //Function if user submit file to database
    registerbasici1 = async () => {
        let localUri = this.state.backfile;
        
        if (localUri == null || localUri == '') {
            console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
            this.registerbasici2()
        }
        else {
          //File
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let formData = new FormData();
          formData.append('backfile', { uri: localUri, name: filename, type: type });

          console.log('Comprobante de envio')
          console.log(formData);
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let hname = this.state.hname;
          let num = this.state.num;
          let dir = this.state.dir;
          let cities = this.state.cities;
          let states = this.state.states;
          let p_code = this.state.p_code;
          let idm = this.state.idm; 
          let nameh = this.state.nameh; 
          let lnameh = this.state.lnameh;
          let db = this.state.db;
          let gender = this.state.gender; 
          let dblaw = this.state.dblaw;

          return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Submitted')
                this.props.navigation.navigate('Galleryhouse')
              }
              else {
                Alert.alert('Error')
    
              }
            });
        }  
    };

    //Function if user do not submit file to database
    registerbasici2 = async () => {
        //Variables
        let email = this.state.email;
        let id = this.state.id;
        let hname = this.state.hname;
        let num = this.state.num;
        let dir = this.state.dir;
        let cities = this.state.cities;
        let states = this.state.states;
        let p_code = this.state.p_code;
        let idm = this.state.idm; 
        let nameh = this.state.nameh; 
        let lnameh = this.state.lnameh;
        let db = this.state.db;
        let gender = this.state.gender; 
        let dblaw = this.state.dblaw;

        return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Submitted')
                this.props.navigation.navigate('Galleryhouse')
              }
              else {
                Alert.alert('Error')
    
              }
            });
    }
  render() {
    //Variables
    let { backfile } = this.state;
    let { namei } = this.state;

  return (
    <FlatList
        data={this.state.info}
        extraData={this.state.info}
        keyExtractor={item => `${item.info}`}
        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
        nestedScrollEnabled={true}
        bounces={false}
        renderItem={({item}) => (
            <NativeBaseProvider>
                <ScrollView 
                  nestedScrollEnabled={true} 
                  alwaysBounceHorizontal={false}
                  alwaysBounceVertical={false}
                  bounces={false}>
                    <View style={ globalStyles.contenido } >
                        <Heading size='xl'style={ globalStyles.titulo }>Basic Information</Heading>
                        

                        <FormControl>
                          {/*House Information*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>House Information</Heading>
                                
                                <Image source={require("../assets/disponibilidad-16.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editicon}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>House Name *</FormControl.Label>
                                  <Input 
                                        defaultValue={item.h_name == 'NULL' ? '' : item.h_name}
                                        onChangeText={ (hname) => this.setState({hname}) }
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Phone Number *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.num == 'NULL' ? '' : item.num}
                                      onChangeText={ (num) => this.setState({num}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>
                            </Stack>

                          </Card>

                          {/*Location*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Location</Heading>
                                
                                <Image source={require("../assets/location-16.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconLoc}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Direction *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                      onChangeText={ (dir) => this.setState({dir}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>City *</FormControl.Label>
                                  <Input 
                                        defaultValue={item.city == 'NULL' ? '' : item.city}
                                        onChangeText={ (cities) => this.setState({cities}) }
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>State / Province *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.state == 'NULL' ? '' : item.state}
                                      onChangeText={ (states) => this.setState({states}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Postal Code *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.p_code == 'NULL' ? '' : item.p_code}
                                      onChangeText={ (p_code) => this.setState({p_code}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>
                            </Stack>

                          </Card>

                          {/*Propietor Information*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>My Information</Heading>
                                
                                <Image source={require("../assets/profile2-64.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconPro}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Name *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                      onChangeText={ (nameh) => this.setState({nameh}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Last Name *</FormControl.Label>
                                  <Input 
                                        defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                        onChangeText={ (lnameh) => this.setState({lnameh}) }
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Date of Birth *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.db == 'NULL' ? '' : item.db}
                                      onChangeText={ (db) => this.setState({db}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Gender *</FormControl.Label>

                                        
                              <View style={{marginTop: '-10%'}}>
                                  <Picker
                                      style={globalStyles.pickerBasicinfo}
                                      itemStyle={{fontSize: 18}} 
                                      selectedValue={this.state.gender == 'NULL' ? "Select"  : this.state.gender}
                                      onValueChange={(gender) => this.setState({gender})}>
                                          <Picker.Item label="Select" value="NULL" />
                                          <Picker.Item label="Male" value="Male" /> 
                                          <Picker.Item label="Female" value="Female" />
                                          <Picker.Item label="Private" value="Private" />
                                  </Picker>
                              </View>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Date of Background Check</FormControl.Label>
                                  <Input 
                                      defaultValue={item.db_law == 'NULL' ? '' : item.db_law}
                                      onChangeText={ (dblaw) => this.setState({dblaw}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>
                            </Stack>

                            <Text style={ globalStyles.infotitle}>Background Check</Text>

                              <TouchableOpacity onPress={()=>this._pickImage()}>
                                  <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.butonfiledit}> Touch to upload file </Heading>
                                          <View style={ globalStyles.underlinig }/>
                                              {backfile == undefined ?
                                              <Text></Text>
                                              :<Text style={globalStyles.uploadFile}>{namei}</Text>}
                                  </Card>
                              </TouchableOpacity>

                          </Card>
                        </FormControl>
                    </View>
                </ScrollView>
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}