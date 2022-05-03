import React, {Component, useState, useEffect} from 'react';
import { View, Image, Platform,  TouchableHighlight, Alert } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Heading, Icon, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

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

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Basicinfo extends Component {
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],

                //Calendars DATE PICKERS
                date: new Date(),
                mode: 'date',
                show: false,
                date2: new Date(),
                mode2: 'date2',
                show2: false,
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
        this.setState({ info : profile.data, hname : profile.data[0].h_name, num : profile.data[0].num, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, id : profile.data[0].id_home, idm : profile.data[0].id_m, nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law, h_type : profile.data[0].h_type, m_city : profile.data[0].m_city, cell : profile.data[0].cell, occupation_m2 : profile.data[0].occupation_m})
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
            type: "application/pdf",
            copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
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
            console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.h_type,this.state.m_city,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.cell, this.state.occupation_m2, this.state.dblaw)
            this.registerbasici2()
        }
        else {
          //File
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let dateDoc = new Date()
          let XDAY= dateDoc.getMonth()<9 ? dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}`

          let formData = new FormData();
          formData.append('backfile', {uri: localUri, name: Platform.OS === 'android' ? 'documentbackgroundlaw'+XDAY+".pdf" : filename, type: Platform.OS === 'android' ? "application/pdf" : type});

          console.log('Comprobante de envio')
          console.log(formData);
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let hname = this.state.hname;
          let num = this.state.num;
          let h_type = this.state.h_type;
          let m_city = this.state.m_city;
          let dir = this.state.dir;
          let cities = this.state.cities;
          let states = this.state.states;
          let p_code = this.state.p_code;
          let idm = this.state.idm; 
          let nameh = this.state.nameh; 
          let lnameh = this.state.lnameh;
          let db = this.state.db;
          let gender = this.state.gender;
          let cell = this.state.cell;
          let occupation_m2 = this.state.occupation_m2; 
          let dblaw = this.state.dblaw;

          return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&h_type=${h_type}&m_city=${m_city}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&cell=${cell}&occupation_m2=${occupation_m2}&dblaw=${dblaw}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Submitted')
                //this.props.navigation.navigate('Galleryhouse')
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
        let h_type = this.state.h_type;
        let m_city = this.state.m_city;
        let dir = this.state.dir;
        let cities = this.state.cities;
        let states = this.state.states;
        let p_code = this.state.p_code;
        let idm = this.state.idm; 
        let nameh = this.state.nameh; 
        let lnameh = this.state.lnameh;
        let db = this.state.db;
        let gender = this.state.gender;
        let cell = this.state.cell;
        let occupation_m2 = this.state.occupation_m2;
        let dblaw = this.state.dblaw;

        return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&h_type=${h_type}&m_city=${m_city}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&cell=${cell}&occupation_m2=${occupation_m2}&dblaw=${dblaw}`, {
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

    setDate = (event, date) => {
      date = date || this.state.date;
  
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        date,
      });

      const dateY = new Date(date.setDate(date.getDate()));
      let YDAY= dateY.getMonth()<9 ? dateY.getDate()<=9 ? `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-${dateY.getDate()}` : dateY.getDate()<=9 ? `${dateY.getFullYear()}-${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-${dateY.getMonth() + 1}-${dateY.getDate()}`
      this.setState({db : YDAY})
      
    }

    closedatepickerIOS = () => {
      this.setState({
        show: Platform.OS === 'ios' ? false : false,
      });

    }
  
    show = mode => {
      this.setState({
        show: true,
        mode,
      });
    }
  
    datepicker = () => {
      this.show('date');
    }

    setDate2 = (event, date2) => {
      date2 = date2 || this.state.date2;
  
      this.setState({
        show2: Platform.OS === 'ios' ? true : false,
        date2,
      });

      const dateY2 = new Date(date2.setDate(date2.getDate()));
      let YDAY2= dateY2.getMonth()<9 ? dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-${dateY2.getDate()}` : dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-${dateY2.getDate()}`
      this.setState({dblaw : YDAY2})
      
    }

    closedatepickerIOS2 = () => {
      this.setState({
        show2: Platform.OS === 'ios' ? false : false,
      });

    }
  
    show2 = mode2 => {
      this.setState({
        show2: true,
        mode2,
      });
    }
  
    datepicker2 = () => {
      this.show2('date');
    }

  render() {
    //Variables
    let { backfile } = this.state;
    let { namei } = this.state;
    let { show, date, mode } = this.state;
    let { show2, date2, mode2 } = this.state;

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
              <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
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
                                        placeholder="e.g. John Smith Residence"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Phone Number *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.num == 'NULL' ? '' : item.num}
                                      onChangeText={ (num) => this.setState({num}) }
                                      placeholder="e.g. 55575846"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>
                            </Stack>

                            <FormControl.Label style={ globalStyles.infotitle}>Type of Residence</FormControl.Label>

                                        
                              <View style={{marginTop: '-10%'}}>
                                  <Picker
                                      style={globalStyles.pickerBasicinfoResidence}
                                      itemStyle={{fontSize: 18}} 
                                      selectedValue={this.state.h_type == 'NULL' ? "Select"  : this.state.h_type}
                                      onValueChange={(h_type) => this.setState({h_type})}>
                                          <Picker.Item label="Select" value="NULL" />
                                          <Picker.Item label="House" value="House" /> 
                                          <Picker.Item label="Apartment" value="Apartment" />
                                          <Picker.Item label="Condominium" value="Condominium" />
                                  </Picker>
                              </View>

                          </Card>

                          {/*Location*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Location</Heading>
                                
                                <Image source={require("../assets/location-16.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconLoc}/>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Main City *</FormControl.Label>

                                        
                              <View style={{marginTop: '-10%'}}>
                                  <Picker
                                      style={globalStyles.pickerBasicinfo}
                                      itemStyle={{fontSize: 18}} 
                                      selectedValue={this.state.m_city == 'NULL' ? "Select"  : this.state.m_city}
                                      onValueChange={(m_city) => this.setState({m_city})}>
                                          <Picker.Item label="Select" value="NULL" />
                                          <Picker.Item label="Toronto" value="Toronto" /> 
                                          <Picker.Item label="Montreal" value="Montreal" />
                                          <Picker.Item label="Ottawa" value="Ottawa" />
                                          <Picker.Item label="Quebec" value="Quebec" />
                                          <Picker.Item label="Calgary" value="Calgary" />
                                          <Picker.Item label="Vancouver" value="Vancouver" />
                                          <Picker.Item label="Victoria" value="Victoria" />
                                  </Picker>
                              </View>


                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Address *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                      onChangeText={ (dir) => this.setState({dir}) }
                                      placeholder="e.g. Av, Street, etc."
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>City *</FormControl.Label>
                                  <Input 
                                        defaultValue={item.city == 'NULL' ? '' : item.city}
                                        onChangeText={ (cities) => this.setState({cities}) }
                                        placeholder="e.g. Davenport"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>State / Province *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.state == 'NULL' ? '' : item.state}
                                      onChangeText={ (states) => this.setState({states}) }
                                      placeholder="e.g. Ontario"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Postal Code *</FormControl.Label>
                                  <Input 
                                      defaultValue={item.p_code == 'NULL' ? '' : item.p_code}
                                      onChangeText={ (p_code) => this.setState({p_code}) }
                                      placeholder="No Special Characters"
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
                                      placeholder="e.g. Eva"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Last Name *</FormControl.Label>
                                  <Input 
                                        defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                        onChangeText={ (lnameh) => this.setState({lnameh}) }
                                        placeholder="e.g. Smith"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Date of Birth *</FormControl.Label>
                                  <View>
                                            <View>
                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <Input
                                                    isReadOnly={true}
                                                    InputRightElement={
                                                        <TouchableOpacity
                                                        style={globalStyles.ReportFeedbackRLelements}
                                                        onPress={this.datepicker}>
                                                        <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                        </TouchableOpacity>
                                                    }
                                                    style={ globalStyles.inputedit}
                                                    placeholder="Message"
                                                    value={this.state.db == 'NULL' ? '' : this.state.db}
                                                    onChangeText={ (db) => this.setState({db}) }
                                                />
                                            </Stack> 
                                    
                                            </View>
                                                { show && Platform.OS != 'ios' && <DateTimePicker 
                                                            value={date}
                                                            mode={mode}
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={this.setDate} />
                                                }
                                                { show && Platform.OS === 'ios' && 
                                                          <View>
                                                            <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                            <DateTimePicker 
                                                              value={date}
                                                              mode={mode}
                                                              is24Hour={true}
                                                              display="spinner"
                                                              onChange={this.setDate} />

                                                            <TouchableHighlight
                                                            style={globalStyles.StudentopenButtonReply}
                                                            onPress={() => this.closedatepickerIOS()}>
                                                              <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                            </TouchableHighlight>
                                                          </View>
                                                }
                                    </View>
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
                                <FormControl.Label style={ globalStyles.infotitle}>Phone Number</FormControl.Label>
                                  <Input 
                                        defaultValue={item.cell == 'NULL' ? '' : item.cell}
                                        onChangeText={ (cell) => this.setState({cell}) }
                                        placeholder="e.g. 55578994"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Occupation</FormControl.Label>
                                  <Input 
                                        defaultValue={item.occupation_m == 'NULL' ? '' : item.occupation_m}
                                        onChangeText={ (occupation_m2) => this.setState({occupation_m2}) }
                                        placeholder="e.g. Lawyer"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Date of Background Check</FormControl.Label>
                                  <View>
                                            <View>
                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <Input
                                                    isReadOnly={true}
                                                    InputRightElement={
                                                        <TouchableOpacity
                                                        style={globalStyles.ReportFeedbackRLelements}
                                                        onPress={this.datepicker2}>
                                                        <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                        </TouchableOpacity>
                                                    }
                                                    style={ globalStyles.inputedit}
                                                    placeholder="Message"
                                                    value={this.state.dblaw == 'NULL' ? '' : this.state.dblaw}
                                                    onChangeText={ (dblaw) => this.setState({dblaw}) }
                                                />
                                            </Stack> 
                                    
                                            </View>
                                                { show2 && Platform.OS != 'ios' && <DateTimePicker 
                                                            value={date2}
                                                            mode={mode2}
                                                            display="default"
                                                            onChange={this.setDate2} />
                                                }
                                                { show2 && Platform.OS === 'ios' && 
                                                          <View>
                                                            <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                            <DateTimePicker 
                                                              value={date2}
                                                              mode={mode2}
                                                              is24Hour={true}
                                                              display="spinner"
                                                              onChange={this.setDate2} />

                                                            <TouchableHighlight
                                                            style={globalStyles.StudentopenButtonReply}
                                                            onPress={() => this.closedatepickerIOS2()}>
                                                              <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                            </TouchableHighlight>
                                                          </View>
                                                }
                                    </View>
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

                          <Button
                          success
                          bordered
                          onPress={this.registerbasici}
                          style={globalStyles.botonedit}
                      >

                          <Text
                                  style={globalStyles.botonTexto}
                                  
                          > Submit </Text>
                    </Button>  
                        </FormControl>
                    </View>
                    
                </ScrollView>
                </KeyboardAwareScrollView>
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}