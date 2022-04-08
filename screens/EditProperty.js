import React, {Component, useState, useEffect} from 'react';
import { View, ScrollView, Image, Platform, Alert, TouchableHighlight} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Spinner, Checkbox, Icon  } from 'native-base'

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import CollapsibleList from "react-native-collapsible-list";

import globalStyles from '../styles/global';
import Card from '../shared/card';

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';

const Tabs = createBottomTabNavigator();

export default function EditProperty() {
  return(

    <Tabs.Navigator screenOptions={{
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#232159'
      }
    }}>
      <Tabs.Screen name="EditBasic" component={BasicEdit} options={{title: 'Basic Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/disponibilidad-16.png')
        : require('../assets/disponibilidad-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditGallery" component={GalleryEdit} options={{title: 'Gallery', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/gallery-16.png')
        : require('../assets/gallery-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditAdditional" component={AdditionalEdit} options={{title: 'Additional Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/additional-16.png')
        : require('../assets/additional-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditFamily" component={FamilyEdit} options={{title: 'Family Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/family-16.png')
        : require('../assets/family-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>
      
    </Tabs.Navigator>

)
}


class BasicEdit extends Component {
  
    constructor(props){ 
		super(props); 
			this.state = {
                //Profile Variables 
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
        //Get user 
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        //Get user profile data
        let profile = await api.getBasicdata(this.state.email,this.state.perm)
		this.setState({ info : profile.data, hname : profile.data[0].h_name, num : profile.data[0].num, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, id : profile.data[0].id_home, idm : profile.data[0].id_m, nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law})
		console.log(this.state.info)

        //Permissions function call to access to the documents of phone 
        this.getPermissionAsync();
    }

    //Permissions function to access to the documents of phone 
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    //Function to select documents from phone
    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
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

    //Register to database Function asyncronus
    registerbasici = async () => {
        //Get file variable
        let localUri = this.state.backfile;
        
        //If user don't submit any file them the register function will be doing in api
        if (localUri == null || localUri == '') {
            console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
            //api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
        }
        else {
          //If user submit file the function will be doing here.
          
          //File
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let formData = new FormData();
          formData.append('backfile', { uri: localUri, name: filename, type });

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

          //Function to submit from database
          return await fetch(`https://homebor.com/basiceditapp.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Update')
              }
              else {
                Alert.alert('Error')
    
              }
            });
        }  
    };

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



	render(){

        //Variables to get file from frontend
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
                                  <FormControl.Label style={ globalStyles.infotitle}>House Name</FormControl.Label>
                                    <Input 
                                          defaultValue={item.h_name == 'NULL' ? '' : item.h_name}
                                          onChangeText={ (hname) => this.setState({hname}) }
                                          style={ globalStyles.inputedit}
                                      />
                                </Stack>
  
  
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>Phone Number</FormControl.Label>
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
                                  <FormControl.Label style={ globalStyles.infotitle}>Direction</FormControl.Label>
                                    <Input 
                                        defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                        onChangeText={ (dir) => this.setState({dir}) }
                                        style={ globalStyles.inputedit}
                                    />
                                </Stack>
  
  
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>City</FormControl.Label>
                                    <Input 
                                          defaultValue={item.city == 'NULL' ? '' : item.city}
                                          onChangeText={ (cities) => this.setState({cities}) }
                                          style={ globalStyles.inputedit}
                                      />
                                </Stack>
  
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>State / Province</FormControl.Label>
                                    <Input 
                                        defaultValue={item.state == 'NULL' ? '' : item.state}
                                        onChangeText={ (states) => this.setState({states}) }
                                        style={ globalStyles.inputedit}
                                    />
                                </Stack>
  
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>Postal Code</FormControl.Label>
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
                                                      style={globalStyles.editiconProEditProperty}/>
                              </View>
  
                              <Stack >
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                    <Input 
                                        defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                        onChangeText={ (nameh) => this.setState({nameh}) }
                                        style={ globalStyles.inputedit}
                                    />
                                </Stack>
  
  
                                <Stack inlineLabel last style={globalStyles.input}>
                                  <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                    <Input 
                                          defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                          onChangeText={ (lnameh) => this.setState({lnameh}) }
                                          style={ globalStyles.inputedit}
                                      />
                                </Stack>

                                
                                  <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
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
                                    
                                <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                        
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
                          </FormControl>
                          <Button
                                success
                                bordered
                                onPress={this.registerbasici}
                                style={globalStyles.botonedit}
                                >

                                <Text style={globalStyles.botonTexto}> Update </Text>

                            </Button>
                      </View>
                  </ScrollView>
              
              </NativeBaseProvider>
          )}> 
      </FlatList>
    );
  }
  }

class GalleryEdit extends Component {
  
  constructor(props){ 
		super(props); 
			this.state = {
                //User Variables 
                email : '',
                perm : false,
                info : [],

                //Default Image
                imagehome: "http://homebor.com/assets/img/empty.png",
                imageliving: "http://homebor.com/assets/img/empty.png",
                imagefamily: "http://homebor.com/assets/img/empty.png",
                imagekitchen: "http://homebor.com/assets/img/empty.png",
                imagedining: "http://homebor.com/assets/img/empty.png",
                imagecommon1: "http://homebor.com/assets/img/empty.png",
                imagecommon2: "http://homebor.com/assets/img/empty.png",
                imagebath1: "http://homebor.com/assets/img/empty.png",
                imagebath2: "http://homebor.com/assets/img/empty.png",
                imagebath3: "http://homebor.com/assets/img/empty.png",
                imagebath4: "http://homebor.com/assets/img/empty.png",
			} 
	} 
    
    

    async componentDidMount(){
        //Get user 
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        //Get photos from profile user
        let profile = await api.getGalleryPhotos(this.state.email,this.state.perm)
		this.setState({ info : profile.data, id: profile.data[0].id_home, idm: profile.data[0].id_m, photo0: 'Yes', photo1: 'Yes', photo2: 'Yes', photo3: 'Yes', photo4: 'Yes', photo5: 'Yes', photo6: 'Yes', photo7: 'Yes', photo8: 'Yes', photo9: 'Yes', photo10: 'Yes', photo11: 'Yes' })
		console.log(this.state.info)

        //Permissions function call to access to the gallery of phone 
        this.getPermissionAsync();


    };

    //Permissions function to access to the gallery of phone 
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    //This group of functions is used to ask to user which way prefer to catch the images, from the gallery or from the camera
    _Alerthome = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera(),},
              {text: 'Folder', onPress: () => this._pickImage()},
            ],
            { cancelable: true }
          )
    }

    _Alertliving = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera2(),},
              {text: 'Folder', onPress: () => this._pickImage2()},
            ],
            { cancelable: true }
          )
    }

    _Alertfamily = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera3(),},
              {text: 'Folder', onPress: () => this._pickImage3()},
            ],
            { cancelable: true }
          )
    }

    _Alertkitchen = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera4(),},
              {text: 'Folder', onPress: () => this._pickImage4()},
            ],
            { cancelable: true }
          )
    }

    _Alertdining = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera5(),},
              {text: 'Folder', onPress: () => this._pickImage5()},
            ],
            { cancelable: true }
          )
    }

    _Alertcommon1 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera6(),},
              {text: 'Folder', onPress: () => this._pickImage6()},
            ],
            { cancelable: true }
          )
    }

    _Alertcommon2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera7(),},
              {text: 'Folder', onPress: () => this._pickImage7()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath1 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera8(),},
              {text: 'Folder', onPress: () => this._pickImage8()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera9(),},
              {text: 'Folder', onPress: () => this._pickImage9()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera10(),},
              {text: 'Folder', onPress: () => this._pickImage10()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath4 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera11(),},
              {text: 'Folder', onPress: () => this._pickImage11()},
            ],
            { cancelable: true }
          )
    }


    //_pickImageCamera is a group of functions to catch the images from the camera.
    //_pickImage is a group of functions to catch the images from the gallery folder.
    _pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 imagehome: result.uri
             });


        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 imagehome: result.uri
             });


        }
    }

    _pickImage2 = async () => {
        let result2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                imageliving: result2.uri
             });


        }
    }

    _pickImageCamera2 = async () => {
        let result2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                imageliving: result2.uri
             });


        }
    }

    _pickImage3 = async () => {
        let result3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3);

        if(!result3.cancelled) {
            this.setState({
                imagefamily: result3.uri
             });


        }
    }

    _pickImageCamera3 = async () => {
        let result3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3);

        if(!result3.cancelled) {
            this.setState({
                imagefamily: result3.uri
             });


        }
    }

    _pickImage4 = async () => {
        let result4 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4);

        if(!result4.cancelled) {
            this.setState({
                imagekitchen: result4.uri
             });


        }
    }

    _pickImageCamera4 = async () => {
        let result4 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4);

        if(!result4.cancelled) {
            this.setState({
                imagekitchen: result4.uri
             });


        }
    }

    _pickImage5 = async () => {
        let result5 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5);

        if(!result5.cancelled) {
            this.setState({
                imagedining: result5.uri
             });


        }
    }

    _pickImageCamera5 = async () => {
        let result5 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5);

        if(!result5.cancelled) {
            this.setState({
                imagedining: result5.uri
             });


        }
    }

    _pickImage6 = async () => {
        let result6 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6);

        if(!result6.cancelled) {
            this.setState({
                imagecommon1: result6.uri
             });


        }
    }

    _pickImageCamera6 = async () => {
        let result6 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6);

        if(!result6.cancelled) {
            this.setState({
                imagecommon1: result6.uri
             });


        }
    }

    _pickImage7 = async () => {
        let result7 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7);

        if(!result7.cancelled) {
            this.setState({
                imagecommon2: result7.uri
             });


        }
    }

    _pickImageCamera7 = async () => {
        let result7 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7);

        if(!result7.cancelled) {
            this.setState({
                imagecommon2: result7.uri
             });


        }
    }

    _pickImage8 = async () => {
        let result8 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8);

        if(!result8.cancelled) {
            this.setState({
                imagebath1: result8.uri
             });


        }
    }

    _pickImageCamera8 = async () => {
        let result8 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8);

        if(!result8.cancelled) {
            this.setState({
                imagebath1: result8.uri
             });


        }

    }

    _pickImage9 = async () => {
        let result9 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result9);

        if(!result9.cancelled) {
            this.setState({
                imagebath2: result9.uri
             });


        }
    }

    _pickImageCamera9 = async () => {
        let result9 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result9);

        if(!result9.cancelled) {
            this.setState({
                imagebath2: result9.uri
             });


        }
    }

    _pickImage10 = async () => {
        let result10 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result10);

        if(!result10.cancelled) {
            this.setState({
                imagebath3: result10.uri
             });


        }
    }

    _pickImageCamera10 = async () => {
        let result10 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result10);

        if(!result10.cancelled) {
            this.setState({
                imagebath3: result10.uri
             });


        }
    }

    _pickImage11 = async () => {
        let result11 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result11);

        if(!result11.cancelled) {
            this.setState({
                imagebath4: result11.uri
             });


        }
    }

    _pickImageCamera11 = async () => {
        let result11 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result11);

        if(!result11.cancelled) {
            this.setState({
                imagebath4: result11.uri
             });


        }
    }

    //Function call to register the images to database 
    registerbasici = async () => {
        let localUri = this.state.imagehome;
        if (localUri == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile1() }
        let localUri2 = this.state.imageliving;
        if (localUri2 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile2() }
        let localUri3 = this.state.imagefamily;
        if (localUri3 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile3() }
        let localUri4 = this.state.imagekitchen;
        if (localUri4 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile4() }
        let localUri5 = this.state.imagedining;
        if (localUri5 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile5() }
        let localUri6 = this.state.imagecommon1;
        if (localUri6 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile6() }
        let localUri7 = this.state.imagecommon2;
        if (localUri7 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile7() }
        let localUri8 = this.state.imagebath1;
        if (localUri8 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile8() }
        let localUri9 = this.state.imagebath2;
        if (localUri9 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile9() }
        let localUri10 = this.state.imagebath3;
        if (localUri10 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile10() }
        let localUri11 = this.state.imagebath4;
        if (localUri11 == "http://homebor.com/assets/img/empty.png") {} 
        else { this.registerfile11() }
        this.registerlog()
    }

    
    //Functions to register the images to database
    registerfile1 = async () => {
        //Variable of image
        let localUri = this.state.imagehome;

        //if user don't submit this images them go to the next function
        if (localUri == null) { this.registerfile2() } 
        else {  
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo', { uri: localUri, name: filename, type });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo1 = this.state.photo1;

          //call to the api to register the images
          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo1=${photo1}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with frontage photo upload')
              }
            });
        }
    };

    registerfile2 = async () => {
        let localUri2 = this.state.imageliving;

        if (localUri2 == null) { this.registerfile3() } 
        else {  
          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2', { uri: localUri2, name: filename2, type : type2 });

          console.log('Comprobante de envio 2')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo2 = this.state.photo2;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo2=${photo2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with living room photo upload')
              }
            });
        }
    };

    registerfile3 = async () => {
        let localUri3 = this.state.imagefamily;

        if (localUri3 == null) { this.registerfile4() } 
        else {  
          //Files
          let filename3 = localUri3.split('/').pop();
          let match3 = /\.(\w+)$/.exec(filename3);
          let type3 = match3 ? `image/${match3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3', { uri: localUri3, name: filename3, type : type3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo3 = this.state.photo3;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo3=${photo3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with family photo upload')
              }
            });
        }
    };

    registerfile4 = async () => {
        let localUri4 = this.state.imagekitchen;

        if (localUri4 == null) { this.registerfile5() } 
        else {  
          //Files
          let filename4 = localUri4.split('/').pop();
          let match4 = /\.(\w+)$/.exec(filename4);
          let type4 = match4 ? `image/${match4[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4', { uri: localUri4, name: filename4, type : type4 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo4 = this.state.photo4;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo4=${photo4}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with kitchen photo upload')
              }
            });
        }
    };

    registerfile5 = async () => {
        let localUri5 = this.state.imagedining;

        if (localUri5 == null) { this.registerfile6() } 
        else {  
          //Files
          let filename5 = localUri5.split('/').pop();
          let match5 = /\.(\w+)$/.exec(filename5);
          let type5 = match5 ? `image/${match5[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo5', { uri: localUri5, name: filename5, type : type5 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo5 = this.state.photo5;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo5=${photo5}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with dining photo upload')
              }
            });
        }
    };

    registerfile6 = async () => {
        let localUri6 = this.state.imagecommon1;

        if (localUri6 == null) { this.registerfile7() } 
        else {  
          //Files
          let filename6 = localUri6.split('/').pop();
          let match6 = /\.(\w+)$/.exec(filename6);
          let type6 = match6 ? `image/${match6[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo6', { uri: localUri6, name: filename6, type : type6 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo6 = this.state.photo6;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo6=${photo6}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with house area 3 photo upload')
              }
            });
        }
    };

    registerfile7 = async () => {
        let localUri7 = this.state.imagecommon2;

        if (localUri7 == null) { this.registerfile8() } 
        else {  
          //Files
          let filename7 = localUri7.split('/').pop();
          let match7 = /\.(\w+)$/.exec(filename7);
          let type7 = match7 ? `image/${match7[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo7', { uri: localUri7, name: filename7, type : type7 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo7 = this.state.photo7;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo7=${photo7}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with house area 4 photo upload')
              }
            });
        }
    };

    registerfile8 = async () => {
        let localUri8 = this.state.imagebath1;

        if (localUri8 == null) { this.registerfile9() } 
        else {  
          //Files
          let filename8 = localUri8.split('/').pop();
          let match8 = /\.(\w+)$/.exec(filename8);
          let type8 = match8 ? `image/${match8[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo8', { uri: localUri8, name: filename8, type : type8 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo8 = this.state.photo8;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo8=${photo8}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 1 photo upload')
              }
            });
        }
    };

    registerfile9 = async () => {
        let localUri9 = this.state.imagebath2;

        if (localUri9 == null) { this.registerfile10() } 
        else {  
          //Files
          let filename9 = localUri9.split('/').pop();
          let match9 = /\.(\w+)$/.exec(filename9);
          let type9 = match9 ? `image/${match9[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo9', { uri: localUri9, name: filename9, type : type9 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo9 = this.state.photo9;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo9=${photo9}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 2 photo upload')
              }
            });
        }
    };


    registerfile10 = async () => {
        let localUri10 = this.state.imagebath3;

        if (localUri10 == null) { this.registerfile11() } 
        else {  
          //Files
          let filename10 = localUri10.split('/').pop();
          let match10 = /\.(\w+)$/.exec(filename10);
          let type10 = match10 ? `image/${match10[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo10', { uri: localUri10, name: filename10, type : type10 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo10 = this.state.photo10;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo10=${photo10}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 3 photo upload')
              }
            });
        }
    };

    registerfile11 = async () => {
        let localUri11 = this.state.imagebath4;

        if (localUri11 == null) { } 
        else {  
          //Files
          let filename11 = localUri11.split('/').pop();
          let match11 = /\.(\w+)$/.exec(filename11);
          let type11 = match11 ? `image/${match11[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo11', { uri: localUri11, name: filename11, type : type11 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo11 = this.state.photo11;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo11=${photo11}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 4 photo upload')
              }
            });
        }
    };

    registerlog = async () => {

          let eMail = this.state.email;
          let id = this.state.id;
          let photo0 = this.state.photo0;
          let idm = this.state.idm;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo0=${photo0}&idm=${idm}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Data Uploaded Successfully')
              }
              else {
                Alert.alert('Error')
              }
            });
    };

	render(){

        //Variables to get default images
        let { imagehome } = this.state;
        let { imageliving } = this.state;
        let { imagefamily } = this.state;
        let { imagekitchen } = this.state;
        let { imagedining } = this.state;
        let { imagecommon1 } = this.state;
        let { imagecommon2 } = this.state;
        let { imagebath1 } = this.state;
        let { imagebath2 } = this.state;
        let { imagebath3 } = this.state;
        let { imagebath4 } = this.state;

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
                 <ScrollView horizontal={true}>
                    {/*Frontage Photo*/}

                    <TouchableOpacity onPress={()=>this._Alerthome()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Frontage Photo </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagehome == `http://homebor.com/assets/img/empty.png` ?
                                            item.phome == "NULL" ?
                                            <Image source={{uri: imagehome}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.phome}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagehome}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Living Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertliving()}>
                            <Card style={globalStyles.shadowbox}>
                              <Heading size='md' style={globalStyles.titlegalleryedit}> Living Room Photo </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imageliving == `http://homebor.com/assets/img/empty.png` ?
                                            item.pliving == "NULL" ?
                                            <Image source={{uri: imageliving}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pliving}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imageliving}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Family Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertfamily()}>
                                <Card style={globalStyles.shadowbox}>
                                  <Heading size='md' style={globalStyles.titlegalleryedit}> Family Picture </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagefamily == `http://homebor.com/assets/img/empty.png` ?
                                            item.fp == "NULL" ?
                                            <Image source={{uri: imagefamily}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.fp}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagefamily}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>

                        <ScrollView horizontal={true}>

                            {/*Kitchen Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertkitchen()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Kitchen </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagekitchen == `http://homebor.com/assets/img/empty.png` ?
                                            item.parea1 == "NULL" ?
                                            <Image source={{uri: imagekitchen}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea1}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagekitchen}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Dining Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertdining()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Dining Room</Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagedining == `http://homebor.com/assets/img/empty.png` ?
                                            item.parea2 == "NULL" ?
                                            <Image source={{uri: imagedining}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea2}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagedining}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*House Area 3 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertcommon1()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 3 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagecommon1 == `http://homebor.com/assets/img/empty.png` ?
                                            item.parea3 == "NULL" ?
                                            <Image source={{uri: imagecommon1}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea3}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagecommon1}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*House Area 4 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertcommon2()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 4 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagecommon2 == `http://homebor.com/assets/img/empty.png` ?
                                            item.parea4 == "NULL" ?
                                            <Image source={{uri: imagecommon2}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea4}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagecommon2}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>

                        <ScrollView horizontal={true}>

                            {/*Bathroom 1 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath1()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 1</Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath1 == `http://homebor.com/assets/img/empty.png` ?
                                            item.pbath1 == "NULL" ?
                                            <Image source={{uri: imagebath1}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath1}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagebath1}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 2 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath2()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 2 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath2 == `http://homebor.com/assets/img/empty.png` ?
                                            item.pbath2 == "NULL" ?
                                            <Image source={{uri: imagebath2}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath2}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagebath2}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 3 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath3()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 3 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath3 == `http://homebor.com/assets/img/empty.png` ?
                                            item.pbath3 == "NULL" ?
                                            <Image source={{uri: imagebath3}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath3}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagebath3}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 4 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath4()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 4 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath4 == `http://homebor.com/assets/img/empty.png` ?
                                            item.pbath4 == "NULL" ?
                                            <Image source={{uri: imagebath4}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath4}`}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                            :
                                            <Image source={{uri: imagebath4}}
                                            style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>
                        <View style={ globalStyles.contenido}>
                        
                                <Button
                                success
                                bordered
                                onPress={this.registerbasici}
                                style={globalStyles.botonedit}
                            >

                                <Text style={globalStyles.botonTexto}> Update </Text>
                            </Button>
                        </View>
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}

}

class AdditionalEdit extends Component {

  constructor(props){ 
		super(props); 
			this.state = {
                //User Variables 
                email : '',
                perm : false,
                info : [],
                itemVegetarian : false,
                itemHalal : false,
                itemKosher : false,
                itemLactose : false,
                itemGluten : false,
                itemPork : false,
                itemNone : false,
                itemDog : false,
                itemCat : false,
                itemOther : false,
			} 
	} 

  async componentDidMount(){
        
    //Get user variables
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    console.log(userLogin)
    
    //Get user profile data variables
    let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
    this.setState({ info : profile})
    console.log(this.state.info)

    //Get user profile data variables to determinate states for checkbox
    let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
    this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, status : profile2.data[0].status, cell : profile2.data[0].cell, smoke : profile2.data[0].smoke, pet : profile2.data[0].pet, pet_num : profile2.data[0].pet_num, type_pet : profile2.data[0].type_pet, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, dog : profile2.data[0].dog, cat : profile2.data[0].cat, other : profile2.data[0].other, vegetarians : profile2.data[0].vegetarians, halal : profile2.data[0].halal, kosher : profile2.data[0].kosher, lactose : profile2.data[0].lactose, gluten : profile2.data[0].gluten, pork : profile2.data[0].pork, none : profile2.data[0].none})

    //Checkboxes conditions
    if (this.state.dog == 'yes') {
        this.setState({itemDog : true})
    } else {
        this.setState({itemDog : false}) 
    }
    if (this.state.cat == 'yes') {
        this.setState({itemCat : true})
    } else {
        this.setState({itemCat : false}) 
    }
    if (this.state.other == 'yes') {
        this.setState({itemOther : true})
    } else {
        this.setState({itemOther : false}) 
    }
    if (this.state.vegetarians == 'yes') {
        this.setState({itemVegetarian : true})
    } else {
        this.setState({itemVegetarian : false}) 
    }
    if (this.state.halal == 'yes') {
        this.setState({itemHalal : true})
    } else {
        this.setState({itemHalal : false}) 
    }
    if (this.state.kosher == 'yes') {
        this.setState({itemKosher : true})
    } else {
        this.setState({itemKosher : false}) 
    }
    if (this.state.lactose == 'yes') {
        this.setState({itemLactose : true})
    } else {
        this.setState({itemLactose : false}) 
    }
    if (this.state.gluten == 'yes') {
        this.setState({itemGluten : true})
    } else {
        this.setState({itemGluten : false}) 
    }
    if (this.state.pork == 'yes') {
        this.setState({itemPork : true})
    } else {
        this.setState({itemPork : false}) 
    }
    if (this.state.none == 'yes') {
        this.setState({itemNone : true})
    } else {
        this.setState({itemNone : false}) 
    }

}


//Function to register data to database
registerbasici = async () => {
    console.log(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.email, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
    api.registeradditionalinfo(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
}

  render() {

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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={ globalStyles.contenido } >
                        <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                        

                        <FormControl>

                          {/*Additional Information*/}

                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Additional Information</Heading>
                                
                                <Image source={require("../assets/additional-info-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconAdd}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Description</FormControl.Label>
                                  <Input 
                                      multiline={true}
                                      numberOfLines={4} 
                                      defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                      onChangeText={ (des) => this.setState({des}) }
                                      style={ globalStyles.inputedit}
                                    />
                              </Stack>

                              <View inlineLabel last style={globalStyles.hideContents} >
                                <Input 
                                    defaultValue={item.data.mail_h}
                                    onChangeText={ (email) => this.setState({email}) }
                                    style={ globalStyles.inputedit}
                                />
                              </View>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Family Members</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.num_mem == '0' ? '' : item.data.num_mem}
                                      onChangeText={ (num_mem) => this.setState({num_mem}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                      onChangeText={ (backg) => this.setState({backg}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background Language</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                      onChangeText={ (backl) => this.setState({backl}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Academy Preference</FormControl.Label>

                                <Picker
                                            style={{ height: 100, width: '95%', marginLeft: '5%', marginTop: (Platform.OS === 'ios') ? '-5%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                            selectedValue={this.state.a_pre}
                                            itemStyle={{fontSize: 14}}
                                            onValueChange={(a_pre) => this.setState({a_pre})}>
                                                {!item.academy ? null : item.academy.map(academy =>
                                                <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                )} 
                                </Picker>

                                <FormControl.Label style={ globalStyles.infotitle}>Gender Preference</FormControl.Label> 

                                  <View style={{marginTop: '-10%'}}>
                                      <Picker
                                          style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '10%' : 100 : 0}} 
                                          selectedValue={this.state.g_pre}
                                          itemStyle={{fontSize: 18}} 
                                          onValueChange={(g_pre) => this.setState({g_pre})}>
                                              <Picker.Item label="Male" value="Male" /> 
                                              <Picker.Item label="Female" value="Female" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                  </View>

                                  <FormControl.Label style={ globalStyles.infotitle}>Age Preference</FormControl.Label> 

                                    <View style={{marginTop: '-10%'}}>
                                      <Picker
                                          style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                          selectedValue={this.state.ag_pre}
                                          itemStyle={{fontSize: 18}} 
                                          onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                              <Picker.Item label="Teenager" value="Teenager" /> 
                                              <Picker.Item label="Adult" value="Adult" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                    </View>

                                    <FormControl.Label style={ globalStyles.infotitle}>Status</FormControl.Label>

                                      <View style={{marginTop: '-10%'}}>
                                          <Picker
                                              style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                              selectedValue={this.state.status}
                                              itemStyle={{fontSize: 18}} 
                                              onValueChange={(status) => this.setState({status})}>
                                                  <Picker.Item label="Avalible" value="Avalible" /> 
                                                  <Picker.Item label="Occupied" value="Occupied" />
                                          </Picker>
                                      </View> 

                                      <FormControl.Label style={ globalStyles.infotitle}>Smoker Politics</FormControl.Label>

                                        <View style={{marginTop: '-10%'}}>
                                          <Picker
                                              style={{ height: 100, width: '80%', marginLeft: '10%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '1%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                              selectedValue={this.state.smoke}
                                              itemStyle={{fontSize: 18}} 
                                              onValueChange={(smoke) => this.setState({smoke})}>
                                                  <Picker.Item label="Select" value="NULL" />
                                                  <Picker.Item label="Outside-Ok" value="Outside-Ok" /> 
                                                  <Picker.Item label="Inside-Ok" value="Inside-Ok" />
                                                  <Picker.Item label="Strincly Non-Smooking" value="Strincly Non-Smooking" />
                                          </Picker>
                                        </View> 

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Cellphone</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.cell == 'NULL' ? '' : item.data.cell}
                                      onChangeText={ (cell) => this.setState({cell}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Special Diet</FormControl.Label>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                  <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemVegetarian} onPress={() => this.setState({ itemVegetarian: !this.state.itemVegetarian })} aria-label="Close"/>
                                  <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Vegetarian</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemHalal} onPress={() => this.setState({ itemHalal: !this.state.itemHalal })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Halal (Muslims)</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemKosher} onPress={() => this.setState({ itemKosher: !this.state.itemKosher })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Kosher (Jews)</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemLactose} onPress={() => this.setState({ itemLactose: !this.state.itemLactose })} aria-label="Close"/>
                                    <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Lactose Intolerant</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemGluten} onPress={() => this.setState({ itemGluten: !this.state.itemGluten })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Gluten Free Diet</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemPork} onPress={() => this.setState({ itemPork: !this.state.itemPork })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>No Pork</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemNone} onPress={() => this.setState({ itemNone: !this.state.itemNone })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>None</Text>
                                </View>


                            </Stack>            

                          </Card>

                          {/*Pets Information*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Pets Information</Heading>
                                
                                <Image source={require("../assets/pets-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconPet}/>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Pets</FormControl.Label>

                            <Picker
                                style={{ height: 100, width: '70%', marginLeft: '15%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-20%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                selectedValue={this.state.pet}
                                itemStyle={{fontSize: 18}} 
                                onValueChange={(pet) => this.setState({pet})}>
                                    <Picker.Item label="Yes" value="Yes" /> 
                                    <Picker.Item label="No" value="No" />
                            </Picker>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Pets</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.pet_num == '0' ? '' : item.data.pet_num}
                                      onChangeText={ (pet_num) => this.setState({pet_num}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>

                                  <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemDog} onPress={() => this.setState({ itemDog: !this.state.itemDog })} aria-label="Close"/>
                                      <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Dogs</Text>
                                  </View>

                                  <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemCat} onPress={() => this.setState({ itemCat: !this.state.itemCat })} aria-label="Close"/>
                                      <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Cats</Text>
                                  </View>

                                  <View style={{flexDirection: "row"}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemOther} onPress={() => this.setState({ itemOther: !this.state.itemOther })} aria-label="Close"/>
                                      <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Others</Text>
                                  </View>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>
                                  <Input 
                                        defaultValue={item.data.type_pet == 'NULL' ? '' : item.data.type_pet}
                                        onChangeText={ (type_pet) => this.setState({type_pet}) }
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                            </Stack>

                          </Card>

                        </FormControl>

                        <Button
                            success
                            bordered
                            onPress={this.registerbasici}
                            style={globalStyles.botonedit}
                            >

                            <Text style={globalStyles.botonTexto}> Update </Text>
                        </Button>
                    </View>
                </ScrollView>
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}

class FamilyEdit extends Component {
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
                date3: new Date(),
                mode3: 'date3',
                show3: false,
                date4: new Date(),
                mode4: 'date4',
                show4: false,
                date5: new Date(),
                mode5: 'date5',
                show5: false,
                date6: new Date(),
                mode6: 'date6',
                show6: false,
				        date7: new Date(),
                mode7: 'date7',
                show7: false,
                date8: new Date(),
                mode8: 'date8',
                show8: false,
                date9: new Date(),
                mode9: 'date9',
                show9: false,
                date10: new Date(),
                mode10: 'date10',
                show10: false,
                date11: new Date(),
                mode11: 'date11',
                show11: false,
                date12: new Date(),
                mode12: 'date12',
                show12: false,
                date13: new Date(),
                mode13: 'date13',
                show13: false,
                date14: new Date(),
                mode14: 'date14',
                show14: false,
                date15: new Date(),
                mode15: 'date15',
                show15: false,
                date16: new Date(),
                mode16: 'date16',
                show16: false,
				
			} 
	} 

    async componentDidMount(){
        
        //Get user variables
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)

        //Get user profile variables
        let profile = await api.getFamilyinfo(this.state.email,this.state.perm)
		this.setState({ info : profile.data, id: profile.data[0].id_home, idm: profile.data[0].id_m, f_name1 : profile.data[0].f_name1, f_lname1 : profile.data[0].f_lname1, db1 : profile.data[0].db1, gender1 : profile.data[0].gender1, re1 : profile.data[0].re1, db_lawf1 : profile.data[0].db_lawf1, f_name2 : profile.data[0].f_name2, f_lname2 : profile.data[0].f_lname2, db2 : profile.data[0].db2, gender2 : profile.data[0].gender2, re2 : profile.data[0].re2, db_lawf2 : profile.data[0].db_lawf2, f_name3 : profile.data[0].f_name3, f_lname3 : profile.data[0].f_lname3, db3 : profile.data[0].db3, gender3 : profile.data[0].gender3, re3 : profile.data[0].re3, db_lawf3 : profile.data[0].db_lawf3, f_name4 : profile.data[0].f_name4, f_lname4 : profile.data[0].f_lname4, db4 : profile.data[0].db4, gender4 : profile.data[0].gender4, re4 : profile.data[0].re4, db_lawf4 : profile.data[0].db_lawf4, f_name5 : profile.data[0].f_name5, f_lname5 : profile.data[0].f_lname5, db5 : profile.data[0].db5, gender5 : profile.data[0].gender5, re5 : profile.data[0].re5, db_lawf5 : profile.data[0].db_lawf5, f_name6 : profile.data[0].f_name6, f_lname6 : profile.data[0].f_lname6, db6 : profile.data[0].db6, gender6 : profile.data[0].gender6, re6 : profile.data[0].re6, db_lawf6 : profile.data[0].db_lawf6, f_name7 : profile.data[0].f_name7, f_lname7 : profile.data[0].f_lname7, db7 : profile.data[0].db7, gender7 : profile.data[0].gender7, re7 : profile.data[0].re7, db_lawf7 : profile.data[0].db_lawf7, f_name8 : profile.data[0].f_name8, f_lname8 : profile.data[0].f_lname8, db8 : profile.data[0].db8, gender8 : profile.data[0].gender8, re8 : profile.data[0].re8, db_lawf8 : profile.data[0].db_lawf8, lawf1 : 'Yes', lawf2 : 'Yes', lawf3 : 'Yes', lawf4 : 'Yes', lawf5 : 'Yes', lawf6 : 'Yes', lawf7 : 'Yes', lawf8 : 'Yes'})
		console.log(this.state.info)

        //Permissions function call to access to the documents of phone
        this.getPermissionAsync();

        //Variables of collapsibles
        this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false"})
    }

    //Permissions function to access to the documents of phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    //Group of function to catch the documents from frontend
    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 backfilef1: result.uri,
                 nameif1 : result.name,
             });


        }
    }

    _pickImage2 = async () => {
        let result2 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                 backfilef2: result2.uri,
                 nameif2 : result2.name,
             });


        }
    }

    _pickImage3 = async () => {
        let result3 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3);
        console.log(this.state.email)

        if(!result3.cancelled) {
            this.setState({
                 backfilef3: result3.uri,
                 nameif3 : result3.name,
             });


        }
    }

    _pickImage4 = async () => {
        let result4 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4);
        console.log(this.state.email)

        if(!result4.cancelled) {
            this.setState({
                 backfilef4: result4.uri,
                 nameif4 : result4.name,
             });


        }
    }

    _pickImage5 = async () => {
        let result5 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5);
        console.log(this.state.email)

        if(!result5.cancelled) {
            this.setState({
                 backfilef5: result5.uri,
                 nameif5 : result5.name,
             });


        }
    }

    _pickImage6 = async () => {
        let result6 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6);
        console.log(this.state.email)

        if(!result6.cancelled) {
            this.setState({
                 backfilef6: result6.uri,
                 nameif6 : result6.name,
             });


        }
    }

    _pickImage7 = async () => {
        let result7 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7);
        console.log(this.state.email)

        if(!result7.cancelled) {
            this.setState({
                 backfilef7: result7.uri,
                 nameif7 : result7.name,
             });


        }
    }

    _pickImage8 = async () => {
        let result8 = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8);
        console.log(this.state.email)

        if(!result8.cancelled) {
            this.setState({
                 backfilef8: result8.uri,
                 nameif8 : result8.name,
             });


        }
    }

    //Function to call when user submit data to database
    registerbasici = async () => {
        let localUri = this.state.backfilef1;
        if (localUri == null) {} 
        else { this.registerfile1() }
        let localUri2 = this.state.backfilef2;
        if (localUri2 == null) {} 
        else { this.registerfile2() }
        let localUri3 = this.state.backfilef3;
        if (localUri3 == null) {} 
        else { this.registerfile3() }
        let localUri4 = this.state.backfilef4;
        if (localUri4 == null) {} 
        else { this.registerfile4() }
        let localUri5 = this.state.backfilef5;
        if (localUri5 == null) {} 
        else { this.registerfile5() }
        let localUri6 = this.state.backfilef6;
        if (localUri6 == null) {} 
        else { this.registerfile6() }
        let localUri7 = this.state.backfilef7;
        if (localUri7 == null) {} 
        else { this.registerfile7() }
        let localUri8 = this.state.backfilef8;
        if (localUri8 == null) {} 
        else { this.registerfile8() }
        console.log(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8)
        api.registerfamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1,this.state.db_lawf1,this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3,this.state.db_lawf3,this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4,this.state.db_lawf4,this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5,this.state.db_lawf5,this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6,this.state.db_lawf6,this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7,this.state.db_lawf7,this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8,this.state.db_lawf8)
        this.props.navigation.navigate('Calendar')
    }

    
    //Group of function to catch files and send to server
    registerfile1 = async () => {
        let localUri = this.state.backfilef1;

        if (localUri == null) { this.registerfile2() } 
        else {  
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef1', { uri: localUri, name: filename, type });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf1 = this.state.lawf1;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf1=${lawf1}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 1 upload')
              }
            });
        }
    };

    registerfile2 = async () => {
        let localUri2 = this.state.backfilef2;

        if (localUri2 == null) { this.registerfile3() }
        else { 
          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef2', { uri: localUri2, name: filename2, type: type2 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf2 = this.state.lawf2;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf2=${lawf2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 2 upload')
              }
            });
        }
    };

    registerfile3 = async () => {
        let localUri3 = this.state.backfilef3;

        if (localUri3 == null) { this.registerfile4() }
        else { 
          //Files
          let filename3 = localUri3.split('/').pop();
          let match3 = /\.(\w+)$/.exec(filename3);
          let type3 = match3 ? `image/${match3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef3', { uri: localUri3, name: filename3, type: type3 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf3 = this.state.lawf3;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf3=${lawf3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 3 upload')
              }
            });
        }
    };

    registerfile4 = async () => {
        let localUri4 = this.state.backfilef4;

        if (localUri4 == null) { this.registerfile5() }
        else { 
          //Files
          let filename4 = localUri4.split('/').pop();
          let match4 = /\.(\w+)$/.exec(filename4);
          let type4 = match4 ? `image/${match4[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef4', { uri: localUri4, name: filename4, type: type4 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf4 = this.state.lawf4;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf4=${lawf4}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 4 upload')
              }
            });
        }
    };

    registerfile5 = async () => {
        let localUri5 = this.state.backfilef5;

        if (localUri5 == null) { this.registerfile6() }
        else { 
          //Files
          let filename5 = localUri5.split('/').pop();
          let match5 = /\.(\w+)$/.exec(filename5);
          let type5 = match5 ? `image/${match5[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef5', { uri: localUri5, name: filename5, type: type5 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf5 = this.state.lawf5;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf5=${lawf5}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 5 upload')
              }
            });
        }
    };

    registerfile6 = async () => {
        let localUri6 = this.state.backfilef6;

        if (localUri6 == null) { this.registerfile7() }
        else { 
          //Files
          let filename6 = localUri6.split('/').pop();
          let match6 = /\.(\w+)$/.exec(filename6);
          let type6 = match6 ? `image/${match6[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef6', { uri: localUri6, name: filename6, type: type6 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf6 = this.state.lawf6;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf6=${lawf6}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 6 upload')
              }
            });
        }
    };


    registerfile7 = async () => {
        let localUri7 = this.state.backfilef7;

        if (localUri7 == null) { this.registerfile8() }
        else { 
          //Files
          let filename7 = localUri7.split('/').pop();
          let match7 = /\.(\w+)$/.exec(filename7);
          let type7 = match7 ? `image/${match7[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef7', { uri: localUri7, name: filename7, type: type7 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf7 = this.state.lawf7;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf7=${lawf7}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 7 upload')
              }
            });
        }
    };

    registerfile8 = async () => {
        let localUri8 = this.state.backfilef8;

        if (localUri8 == null) { 
            console.log(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8)
            api.registerfamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1,this.state.db_lawf1,this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3,this.state.db_lawf3,this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4,this.state.db_lawf4,this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5,this.state.db_lawf5,this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6,this.state.db_lawf6,this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7,this.state.db_lawf7,this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8,this.state.db_lawf8) 
        }
        else { 
          //Files
          let filename8 = localUri8.split('/').pop();
          let match8 = /\.(\w+)$/.exec(filename8);
          let type8 = match8 ? `image/${match8[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('backfilef8', { uri: localUri8, name: filename8, type: type8 });
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf8 = this.state.lawf8;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf8=${lawf8}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                }
              else {
                Alert.alert('Error with background check file 8 upload')
              }
            });
        }
    };

    //Group of functions to changes the arrows of collapsibles
    collapse1 = async() => {
        this.setState({collapse1 : "true"})
    }

    collapsehide1 = async() => {
        this.setState({collapse1 : "false"})
    }

    collapse2 = async() => {
        this.setState({collapse2 : "true"})
    }

    collapsehide2 = async() => {
        this.setState({collapse2 : "false"})
    }

    collapse3 = async() => {
        this.setState({collapse3 : "true"})
    }

    collapsehide3 = async() => {
        this.setState({collapse3 : "false"})
    }

    collapse4 = async() => {
        this.setState({collapse4 : "true"})
    }

    collapsehide4 = async() => {
        this.setState({collapse4 : "false"})
    }

    collapse5 = async() => {
        this.setState({collapse5 : "true"})
    }

    collapsehide5 = async() => {
        this.setState({collapse5 : "false"})
    }

    collapse6 = async() => {
        this.setState({collapse6 : "true"})
    }

    collapsehide6 = async() => {
        this.setState({collapse6 : "false"})
    }

    collapse7 = async() => {
        this.setState({collapse7 : "true"})
    }

    collapsehide7 = async() => {
        this.setState({collapse7 : "false"})
    }

    collapse8 = async() => {
        this.setState({collapse8 : "true"})
    }

    collapsehide8 = async() => {
        this.setState({collapse8 : "false"})
    }

    setDate = (event, date) => {
        date = date || this.state.date;
    
        this.setState({
          show: Platform.OS === 'ios' ? true : false,
          date,
        });

        const dateY = new Date(date.setDate(date.getDate()));
        let YDAY= dateY.getMonth()<9 ? dateY.getDate()<=9 ? `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-${dateY.getDate()}` : dateY.getDate()<=9 ? `${dateY.getFullYear()}-${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-${dateY.getMonth() + 1}-${dateY.getDate()}`
        this.setState({db1 : YDAY})
        
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
        this.setState({db_lawf1 : YDAY2})
        
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

      setDate3 = (event, date3) => {
        date3 = date3 || this.state.date3;
    
        this.setState({
          show3: Platform.OS === 'ios' ? true : false,
          date3,
        });
    
        const dateY3 = new Date(date3.setDate(date3.getDate()));
        let YDAY3= dateY3.getMonth()<9 ? dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-${dateY3.getDate()}` : dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-${dateY3.getDate()}`
        this.setState({db2 : YDAY3})
        
      }

      closedatepickerIOS3 = () => {
        this.setState({
          show3: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show3 = mode3 => {
        this.setState({
          show3: true,
          mode3,
        });
      }
    
      datepicker3 = () => {
        this.show3('date');
      }

      setDate4 = (event, date4) => {
        date4 = date4 || this.state.date4;
    
        this.setState({
          show4: Platform.OS === 'ios' ? true : false,
          date4,
        });
    
        const dateY4 = new Date(date4.setDate(date4.getDate()));
        let YDAY4= dateY4.getMonth()<9 ? dateY4.getDate()<=9 ? `${dateY4.getFullYear()}-0${dateY4.getMonth() + 1}-0${dateY4.getDate()}` : `${dateY4.getFullYear()}-0${dateY4.getMonth() + 1}-${dateY4.getDate()}` : dateY4.getDate()<=9 ? `${dateY4.getFullYear()}-${dateY4.getMonth() + 1}-0${dateY4.getDate()}` : `${dateY4.getFullYear()}-${dateY4.getMonth() + 1}-${dateY4.getDate()}`
        this.setState({db_lawf2 : YDAY4})
        
      }

      closedatepickerIOS4 = () => {
        this.setState({
          show4: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show4 = mode4 => {
        this.setState({
          show4: true,
          mode4,
        });
      }
    
      datepicker4 = () => {
        this.show4('date');
      }

      setDate5 = (event, date5) => {
        date5 = date5 || this.state.date5;
    
        this.setState({
          show5: Platform.OS === 'ios' ? true : false,
          date5,
        });
    
        const dateY5 = new Date(date5.setDate(date5.getDate()));
        let YDAY5= dateY5.getMonth()<9 ? dateY5.getDate()<=9 ? `${dateY5.getFullYear()}-0${dateY5.getMonth() + 1}-0${dateY5.getDate()}` : `${dateY5.getFullYear()}-0${dateY5.getMonth() + 1}-${dateY5.getDate()}` : dateY5.getDate()<=9 ? `${dateY5.getFullYear()}-${dateY5.getMonth() + 1}-0${dateY5.getDate()}` : `${dateY5.getFullYear()}-${dateY5.getMonth() + 1}-${dateY5.getDate()}`
        this.setState({db3 : YDAY5})
        
      }

      closedatepickerIOS5 = () => {
        this.setState({
          show5: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show5 = mode5 => {
        this.setState({
          show5: true,
          mode5,
        });
      }
    
      datepicker5 = () => {
        this.show5('date');
      }

      setDate6 = (event, date6) => {
        date6 = date6 || this.state.date6;
    
        this.setState({
          show6: Platform.OS === 'ios' ? true : false,
          date6,
        });
    
        const dateY6 = new Date(date6.setDate(date6.getDate()));
        let YDAY6= dateY6.getMonth()<9 ? dateY6.getDate()<=9 ? `${dateY6.getFullYear()}-0${dateY6.getMonth() + 1}-0${dateY6.getDate()}` : `${dateY6.getFullYear()}-0${dateY6.getMonth() + 1}-${dateY6.getDate()}` : dateY6.getDate()<=9 ? `${dateY6.getFullYear()}-${dateY6.getMonth() + 1}-0${dateY6.getDate()}` : `${dateY6.getFullYear()}-${dateY6.getMonth() + 1}-${dateY6.getDate()}`
        this.setState({db_lawf3 : YDAY6})
        
      }

      closedatepickerIOS6 = () => {
        this.setState({
          show6: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show6 = mode6 => {
        this.setState({
          show6: true,
          mode6,
        });
      }
    
      datepicker6 = () => {
        this.show6('date');
      }

      setDate7 = (event, date7) => {
        date7 = date7 || this.state.date7;
    
        this.setState({
          show7: Platform.OS === 'ios' ? true : false,
          date7,
        });
    
        const dateY7 = new Date(date7.setDate(date7.getDate()));
        let YDAY7= dateY7.getMonth()<9 ? dateY7.getDate()<=9 ? `${dateY7.getFullYear()}-0${dateY7.getMonth() + 1}-0${dateY7.getDate()}` : `${dateY7.getFullYear()}-0${dateY7.getMonth() + 1}-${dateY7.getDate()}` : dateY7.getDate()<=9 ? `${dateY7.getFullYear()}-${dateY7.getMonth() + 1}-0${dateY7.getDate()}` : `${dateY7.getFullYear()}-${dateY7.getMonth() + 1}-${dateY7.getDate()}`
        this.setState({db4 : YDAY7})
        
      }

      closedatepickerIOS7 = () => {
        this.setState({
          show7: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show7 = mode7 => {
        this.setState({
          show7: true,
          mode7,
        });
      }
    
      datepicker7 = () => {
        this.show7('date');
      }

      setDate8 = (event, date8) => {
        date8 = date8 || this.state.date8;
    
        this.setState({
          show8: Platform.OS === 'ios' ? true : false,
          date8,
        });
    
        const dateY8 = new Date(date8.setDate(date8.getDate()));
        let YDAY8= dateY8.getMonth()<9 ? dateY8.getDate()<=9 ? `${dateY8.getFullYear()}-0${dateY8.getMonth() + 1}-0${dateY8.getDate()}` : `${dateY8.getFullYear()}-0${dateY8.getMonth() + 1}-${dateY8.getDate()}` : dateY8.getDate()<=9 ? `${dateY8.getFullYear()}-${dateY8.getMonth() + 1}-0${dateY8.getDate()}` : `${dateY8.getFullYear()}-${dateY8.getMonth() + 1}-${dateY8.getDate()}`
        this.setState({db_lawf4 : YDAY8})
        
      }

      closedatepickerIOS8 = () => {
        this.setState({
          show8: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show8 = mode8 => {
        this.setState({
          show8: true,
          mode8,
        });
      }
    
      datepicker8 = () => {
        this.show8('date');
      }

      setDate9 = (event, date9) => {
        date9 = date9 || this.state.date9;
    
        this.setState({
          show9: Platform.OS === 'ios' ? true : false,
          date9,
        });
    
        const dateY9 = new Date(date9.setDate(date9.getDate()));
        let YDAY9= dateY9.getMonth()<9 ? dateY9.getDate()<=9 ? `${dateY9.getFullYear()}-0${dateY9.getMonth() + 1}-0${dateY9.getDate()}` : `${dateY9.getFullYear()}-0${dateY9.getMonth() + 1}-${dateY9.getDate()}` : dateY9.getDate()<=9 ? `${dateY9.getFullYear()}-${dateY9.getMonth() + 1}-0${dateY9.getDate()}` : `${dateY9.getFullYear()}-${dateY9.getMonth() + 1}-${dateY9.getDate()}`
        this.setState({db5 : YDAY9})
        
      }

      closedatepickerIOS9 = () => {
        this.setState({
          show9: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show9 = mode9 => {
        this.setState({
          show9: true,
          mode9,
        });
      }
    
      datepicker9 = () => {
        this.show9('date');
      }

      setDate10 = (event, date10) => {
        date10 = date10 || this.state.date10;
    
        this.setState({
          show10: Platform.OS === 'ios' ? true : false,
          date10,
        });
    
        const dateY10 = new Date(date10.setDate(date10.getDate()));
        let YDAY10= dateY10.getMonth()<9 ? dateY10.getDate()<=9 ? `${dateY10.getFullYear()}-0${dateY10.getMonth() + 1}-0${dateY10.getDate()}` : `${dateY10.getFullYear()}-0${dateY10.getMonth() + 1}-${dateY10.getDate()}` : dateY10.getDate()<=9 ? `${dateY10.getFullYear()}-${dateY10.getMonth() + 1}-0${dateY10.getDate()}` : `${dateY10.getFullYear()}-${dateY10.getMonth() + 1}-${dateY10.getDate()}`
        this.setState({db_lawf5 : YDAY10})
        
      }

      closedatepickerIOS10 = () => {
        this.setState({
          show10: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show10 = mode10 => {
        this.setState({
          show10: true,
          mode10,
        });
      }
    
      datepicker10 = () => {
        this.show10('date');
      }

      setDate11 = (event, date11) => {
        date11 = date11 || this.state.date11;
    
        this.setState({
          show11: Platform.OS === 'ios' ? true : false,
          date11,
        });
    
        const dateY11 = new Date(date11.setDate(date11.getDate()));
        let YDAY11= dateY11.getMonth()<9 ? dateY11.getDate()<=9 ? `${dateY11.getFullYear()}-0${dateY11.getMonth() + 1}-0${dateY11.getDate()}` : `${dateY11.getFullYear()}-0${dateY11.getMonth() + 1}-${dateY11.getDate()}` : dateY11.getDate()<=9 ? `${dateY11.getFullYear()}-${dateY11.getMonth() + 1}-0${dateY11.getDate()}` : `${dateY11.getFullYear()}-${dateY11.getMonth() + 1}-${dateY11.getDate()}`
        this.setState({db6 : YDAY11})
        
      }

      closedatepickerIOS11 = () => {
        this.setState({
          show11: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show11 = mode11 => {
        this.setState({
          show11: true,
          mode11,
        });
      }
    
      datepicker11 = () => {
        this.show11('date');
      }

      setDate12 = (event, date12) => {
        date12 = date12 || this.state.date12;
    
        this.setState({
          show12: Platform.OS === 'ios' ? true : false,
          date12,
        });
    
        const dateY12 = new Date(date12.setDate(date12.getDate()));
        let YDAY12= dateY12.getMonth()<9 ? dateY12.getDate()<=9 ? `${dateY12.getFullYear()}-0${dateY12.getMonth() + 1}-0${dateY12.getDate()}` : `${dateY12.getFullYear()}-0${dateY12.getMonth() + 1}-${dateY12.getDate()}` : dateY12.getDate()<=9 ? `${dateY12.getFullYear()}-${dateY12.getMonth() + 1}-0${dateY12.getDate()}` : `${dateY12.getFullYear()}-${dateY12.getMonth() + 1}-${dateY12.getDate()}`
        this.setState({db_lawf6 : YDAY12})
        
      }

      closedatepickerIOS12 = () => {
        this.setState({
          show12: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show12 = mode12 => {
        this.setState({
          show12: true,
          mode12,
        });
      }
    
      datepicker12 = () => {
        this.show12('date');
      }

      setDate13 = (event, date13) => {
        date13 = date13 || this.state.date13;
    
        this.setState({
          show13: Platform.OS === 'ios' ? true : false,
          date13,
        });
    
        const dateY13 = new Date(date13.setDate(date13.getDate()));
        let YDAY13= dateY13.getMonth()<9 ? dateY13.getDate()<=9 ? `${dateY13.getFullYear()}-0${dateY13.getMonth() + 1}-0${dateY13.getDate()}` : `${dateY13.getFullYear()}-0${dateY13.getMonth() + 1}-${dateY13.getDate()}` : dateY13.getDate()<=9 ? `${dateY13.getFullYear()}-${dateY13.getMonth() + 1}-0${dateY13.getDate()}` : `${dateY13.getFullYear()}-${dateY13.getMonth() + 1}-${dateY13.getDate()}`
        this.setState({db7 : YDAY13})
        
      }

      closedatepickerIOS13 = () => {
        this.setState({
          show13: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show13 = mode13 => {
        this.setState({
          show13: true,
          mode13,
        });
      }
    
      datepicker13 = () => {
        this.show13('date');
      }

      setDate14 = (event, date14) => {
        date14 = date14 || this.state.date14;
    
        this.setState({
          show14: Platform.OS === 'ios' ? true : false,
          date14,
        });
    
        const dateY14 = new Date(date14.setDate(date14.getDate()));
        let YDAY14= dateY14.getMonth()<9 ? dateY14.getDate()<=9 ? `${dateY14.getFullYear()}-0${dateY14.getMonth() + 1}-0${dateY14.getDate()}` : `${dateY14.getFullYear()}-0${dateY14.getMonth() + 1}-${dateY14.getDate()}` : dateY14.getDate()<=9 ? `${dateY14.getFullYear()}-${dateY14.getMonth() + 1}-0${dateY14.getDate()}` : `${dateY14.getFullYear()}-${dateY14.getMonth() + 1}-${dateY14.getDate()}`
        this.setState({db_lawf7 : YDAY14})
        
      }

      closedatepickerIOS14 = () => {
        this.setState({
          show14: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show14 = mode14 => {
        this.setState({
          show14: true,
          mode14,
        });
      }
    
      datepicker14 = () => {
        this.show14('date');
      }

      setDate15 = (event, date15) => {
        date15 = date15 || this.state.date15;
    
        this.setState({
          show15: Platform.OS === 'ios' ? true : false,
          date15,
        });
    
        const dateY15 = new Date(date15.setDate(date15.getDate()));
        let YDAY15= dateY15.getMonth()<9 ? dateY15.getDate()<=9 ? `${dateY15.getFullYear()}-0${dateY15.getMonth() + 1}-0${dateY15.getDate()}` : `${dateY15.getFullYear()}-0${dateY15.getMonth() + 1}-${dateY15.getDate()}` : dateY15.getDate()<=9 ? `${dateY15.getFullYear()}-${dateY15.getMonth() + 1}-0${dateY15.getDate()}` : `${dateY15.getFullYear()}-${dateY15.getMonth() + 1}-${dateY15.getDate()}`
        this.setState({db8 : YDAY15})
        
      }

      closedatepickerIOS15 = () => {
        this.setState({
          show15: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show15 = mode15 => {
        this.setState({
          show15: true,
          mode15,
        });
      }
    
      datepicker15 = () => {
        this.show15('date');
      }

      setDate16 = (event, date16) => {
        date16 = date16 || this.state.date16;
    
        this.setState({
          show16: Platform.OS === 'ios' ? true : false,
          date16,
        });
    
        const dateY16 = new Date(date16.setDate(date16.getDate()));
        let YDAY16= dateY16.getMonth()<9 ? dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-${dateY16.getDate()}` : dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-${dateY16.getDate()}`
        this.setState({db_lawf8 : YDAY16})
        
      }

      closedatepickerIOS16 = () => {
        this.setState({
          show16: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show16 = mode16 => {
        this.setState({
          show16: true,
          mode16,
        });
      }
    
      datepicker16 = () => {
        this.show16('date');
      }

	render(){

        //Variables to get files from frontend
        let { backfilef1 } = this.state;
        let { nameif1 } = this.state;
        let { backfilef2 } = this.state;
        let { nameif2 } = this.state;
        let { backfilef3 } = this.state;
        let { nameif3 } = this.state;
        let { backfilef4 } = this.state;
        let { nameif4 } = this.state;
        let { backfilef5 } = this.state;
        let { nameif5 } = this.state;
        let { backfilef6 } = this.state;
        let { nameif6 } = this.state;
        let { backfilef7 } = this.state;
        let { nameif7 } = this.state;
        let { backfilef8 } = this.state;
        let { nameif8 } = this.state;

        //Variables of collapsibles
        let collapse1 = this.state.collapse1
        let collapse2 = this.state.collapse2
        let collapse3 = this.state.collapse3
        let collapse4 = this.state.collapse4
        let collapse5 = this.state.collapse5
        let collapse6 = this.state.collapse6
        let collapse7 = this.state.collapse7
        let collapse8 = this.state.collapse8

        let { show, date, mode } = this.state;
        let { show2, date2, mode2 } = this.state;
        let { show3, date3, mode3 } = this.state;
        let { show4, date4, mode4 } = this.state;
        let { show5, date5, mode5 } = this.state;
        let { show6, date6, mode6} = this.state;
        let { show7, date7, mode7 } = this.state;
        let { show8, date8, mode8 } = this.state;
        let { show9, date9, mode9 } = this.state;
        let { show10, date10, mode10 } = this.state;
        let { show11, date11, mode11 } = this.state;
        let { show12, date12, mode12 } = this.state;
        let { show13, date13, mode13 } = this.state;
        let { show14, date14, mode14 } = this.state;
        let { show15, date15, mode15 } = this.state;
        let { show16, date16, mode16 } = this.state;

  return (
    <FlatList
        data={this.state.info}
        keyExtractor={item => `${item.info}`}
        renderItem={({item}) => (
            <NativeBaseProvider>
                <ScrollView 
                    nestedScrollEnabled={true} 
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}>
                      <View style={ globalStyles.contenido } >
                        <Heading size='xl'style={ globalStyles.titulo }>Family Information</Heading>
                       
                      

                      <FormControl>


                        {/*Member 1 */}


                        <Card>
                              <CollapsibleList
                                  numberOfVisibleItems={0}
                                  wrapperStyle={globalStyles.show}
                                  buttonContent={
                                      this.state.collapse1 === "false" ?
                                      <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                          <Text style={globalStyles.buttonTextroom}>
                                              <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                  {'       '}Family Member 1{'       '}
                                              <AntDesign name="down" style={globalStyles.arrowLeft} />
                                          </Text>
                                      </TouchableOpacity>
                                      :
                                      <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                          <Text style={globalStyles.buttonTextroom}>
                                              <AntDesign name="up" style={globalStyles.arrowLeft} />
                                              {'       '}Family Member 1{'       '}
                                              <AntDesign name="up" style={globalStyles.arrowLeft} />
                                          </Text>
                                      </TouchableOpacity>
                                  }
                                  >
                                  <View style={{flexDirection: 'row'}}>
                                      <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 1</Heading>
                                      
                                      <Image source={require("../assets/profile2-64.png")}
                                              resizeMode="contain"
                                              style={globalStyles.editiconFamily}/>
                                      
                                  </View>
                                  <Stack >
                                    <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                        <Input
                                          multiline={false} 
                                          defaultValue={item.f_name1 == 'NULL' ? '' : item.f_name1}
                                          onChangeText={ (f_name1) => this.setState({f_name1}) }
                                          style={ globalStyles.inputedit}
                                          />
                                    </Stack>

                                    <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                        <Input 
                                            defaultValue={item.f_lname1 == 'NULL' ? '' : item.f_lname1}
                                            onChangeText={ (f_lname1) => this.setState({f_lname1}) }
                                            style={ globalStyles.inputedit}
                                        />
                                    </Stack>

                                    <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
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
                                                        value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                                        onChangeText={ (db1) => this.setState({db1}) }
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

                                    <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                          <View style={{marginTop: '-10%'}}>
                                              <Picker
                                                  style={globalStyles.pickerBasicinfo} 
                                                  selectedValue={this.state.gender1 == 'NULL' ? "Select"  : this.state.gender1}
                                                  itemStyle={{fontSize: 18}} 
                                                  onValueChange={(gender1) => this.setState({gender1})}>
                                                      <Picker.Item label="Select" value="NULL" />
                                                      <Picker.Item label="Male" value="Male" /> 
                                                      <Picker.Item label="Female" value="Female" />
                                                      <Picker.Item label="Private" value="Private" />
                                              </Picker>
                                          </View>
                                    
                                          <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                              <View style={{marginTop: '-10%'}}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo} 
                                                      selectedValue={this.state.re1 == 'NULL' ? "Select"  : this.state.re1}
                                                      itemStyle={{fontSize: 18}} 
                                                      onValueChange={(re1) => this.setState({re1})}>
                                                          <Picker.Item label="Select" value="NULL" />
                                                          <Picker.Item label="Dad" value="Dad" /> 
                                                          <Picker.Item label="Mom" value="Mom" />
                                                          <Picker.Item label="Son" value="Son" />
                                                          <Picker.Item label="Daughter" value="Daughter" />
                                                          <Picker.Item label="Grandparents" value="Grandparents" />
                                                          <Picker.Item label="Others" value="Others" />
                                                  </Picker>
                                              </View>

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
                                                                value={this.state.db_lawf1 == 'NULL' ? '' : this.state.db_lawf1}
                                                                onChangeText={ (db_lawf1) => this.setState({db_lawf1}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show2 && Platform.OS != 'ios' && <DateTimePicker 
                                                            value={date2}
                                                            mode={mode2}
                                                            is24Hour={true}
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

                                          <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                            <TouchableOpacity onPress={()=>this._pickImage()}>
                                                <Card style={globalStyles.shadowbox}>
                                                  <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                        <View style={ globalStyles.underlinig }/>
                                                            {backfilef1 == undefined ?
                                                            <Text></Text>
                                                            :<Text style={globalStyles.uploadFile}>{nameif1}</Text>}
                                                </Card>
                                            </TouchableOpacity>
                                  </Stack>
           
                              </CollapsibleList>
                          </Card>

                          {/*Member 2 */}

                          {this.state.f_name1 != 'NULL' || this.state.f_lname1 != 'NULL' || this.state.db1 != 'NULL' || this.state.db_lawf1 != 'NULL' || this.state.gender1 != 'NULL' || this.state.re1 != 'NULL' ?
                            <Card>
                                  <CollapsibleList
                                      numberOfVisibleItems={0}
                                      wrapperStyle={globalStyles.show}
                                      buttonContent={
                                          this.state.collapse2 === "false" ?
                                          <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse2}>
                                              <Text style={globalStyles.buttonTextroom}>
                                                  <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                      {'       '}Family Member 2{'       '}
                                                  <AntDesign name="down" style={globalStyles.arrowLeft} />
                                              </Text>
                                          </TouchableOpacity>
                                          :
                                          <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide2}>
                                              <Text style={globalStyles.buttonTextroom}>
                                                  <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                  {'       '}Family Member 2{'       '}
                                                  <AntDesign name="up" style={globalStyles.arrowLeft} />
                                              </Text>
                                          </TouchableOpacity>
                                      }
                                      >
                                      <View style={{flexDirection: 'row'}}>
                                          <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 2</Heading>
                                          
                                          <Image source={require("../assets/profile2-64.png")}
                                                  resizeMode="contain"
                                                  style={globalStyles.editiconFamily}/>
                                          
                                      </View>
                                      <Stack >
                                        <Stack inlineLabel last style={globalStyles.input}>
                                          <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                            <Input 
                                              defaultValue={item.f_name2 == 'NULL' ? '' : item.f_name2}
                                              onChangeText={ (f_name2) => this.setState({f_name2}) }
                                              style={ globalStyles.inputedit}
                                              />
                                        </Stack>

                                        <Stack inlineLabel last style={globalStyles.input}>
                                          <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                            <Input 
                                                defaultValue={item.f_lname2 == 'NULL' ? '' : item.f_lname2}
                                                onChangeText={ (f_lname2) => this.setState({f_lname2}) }
                                                style={ globalStyles.inputedit}
                                            />
                                        </Stack>

                                        <Stack inlineLabel last style={globalStyles.input}>
                                          <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                          <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker3}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                                                onChangeText={ (db2) => this.setState({db2}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show3 && Platform.OS != 'ios' && <DateTimePicker 
                                                            value={date3}
                                                            mode={mode3}
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={this.setDate3} />
                                                        }
                                                        { show3 && Platform.OS === 'ios' && 
                                                                  <View>
                                                                    <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                    <DateTimePicker 
                                                                      value={date3}
                                                                      mode={mode3}
                                                                      is24Hour={true}
                                                                      display="spinner"
                                                                      onChange={this.setDate3} />

                                                                    <TouchableHighlight
                                                                    style={globalStyles.StudentopenButtonReply}
                                                                    onPress={() => this.closedatepickerIOS3()}>
                                                                      <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                    </TouchableHighlight>
                                                                  </View>
                                                        }
                                                </View>
                                        </Stack>

                                        <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                              <View style={{marginTop: '-10%'}}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo} 
                                                      selectedValue={this.state.gender2 == 'NULL' ? "Select"  : this.state.gender2}
                                                      itemStyle={{fontSize: 18}} 
                                                      onValueChange={(gender2) => this.setState({gender2})}>
                                                          <Picker.Item label="Select" value="NULL" />
                                                          <Picker.Item label="Male" value="Male" /> 
                                                          <Picker.Item label="Female" value="Female" />
                                                          <Picker.Item label="Private" value="Private" />
                                                  </Picker>
                                              </View>
                                        
                                              <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                  <View style={{marginTop: '-10%'}}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.re2 == 'NULL' ? "Select"  : this.state.re2}
                                                          itemStyle={{fontSize: 18}} 
                                                          onValueChange={(re2) => this.setState({re2})}>
                                                              <Picker.Item label="Select" value="NULL" />
                                                              <Picker.Item label="Dad" value="Dad" /> 
                                                              <Picker.Item label="Mom" value="Mom" />
                                                              <Picker.Item label="Son" value="Son" />
                                                              <Picker.Item label="Daughter" value="Daughter" />
                                                              <Picker.Item label="Grandparents" value="Grandparents" />
                                                              <Picker.Item label="Others" value="Others" />
                                                      </Picker>
                                                  </View>

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
                                                                            onPress={this.datepicker4}>
                                                                            <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db_lawf2 == 'NULL' ? '' : this.state.db_lawf2}
                                                                        onChangeText={ (db_lawf2) => this.setState({db_lawf2}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show4 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date4}
                                                                      mode={mode4}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate4} />
                                                                  }
                                                                  { show4 && Platform.OS === 'ios' && 
                                                                            <View>
                                                                              <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                              <DateTimePicker 
                                                                                value={date4}
                                                                                mode={mode4}
                                                                                is24Hour={true}
                                                                                display="spinner"
                                                                                onChange={this.setDate4} />

                                                                              <TouchableHighlight
                                                                              style={globalStyles.StudentopenButtonReply}
                                                                              onPress={() => this.closedatepickerIOS4()}>
                                                                                <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                              </TouchableHighlight>
                                                                            </View>
                                                                  }
                                                        </View>
                                                    </Stack>

                                              <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                <TouchableOpacity onPress={()=>this._pickImage2()}>
                                                    <Card style={globalStyles.shadowbox}>
                                                      <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                            <View style={ globalStyles.underlinig }/>
                                                                {backfilef2 == undefined ?
                                                                <Text></Text>
                                                                :<Text style={globalStyles.uploadFile}>{nameif2}</Text>}
                                                    </Card>
                                                </TouchableOpacity>
                                      </Stack>
              
                                  </CollapsibleList>
                              </Card>
                              :
                              <View></View>
                              
                              }

                              {/*Member 3 */}

                              {this.state.f_name2 != 'NULL' || this.state.f_lname2 != 'NULL' || this.state.db2 != 'NULL' || this.state.db_lawf2 != 'NULL' || this.state.gender2 != 'NULL' || this.state.re2 != 'NULL' ?
                                <Card>
                                    <CollapsibleList
                                        numberOfVisibleItems={0}
                                        wrapperStyle={globalStyles.show}
                                        buttonContent={
                                            this.state.collapse3 === "false" ?
                                            <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse3}>
                                                <Text style={globalStyles.buttonTextroom}>
                                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        {'       '}Family Member 3{'       '}
                                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                </Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide3}>
                                                <Text style={globalStyles.buttonTextroom}>
                                                    <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                    {'       '}Family Member 3{'       '}
                                                    <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        >
                                        <View style={{flexDirection: 'row'}}>
                                            <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 3</Heading>
                                            
                                            <Image source={require("../assets/profile2-64.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconFamily}/>
                                            
                                        </View>
                                        <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                <Input 
                                                defaultValue={item.f_name3 == 'NULL' ? '' : item.f_name3}
                                                onChangeText={ (f_name3) => this.setState({f_name3}) }
                                                style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                <Input 
                                                    defaultValue={item.f_lname3 == 'NULL' ? '' : item.f_lname3}
                                                    onChangeText={ (f_lname3) => this.setState({f_lname3}) }
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                            <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker5}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db3 == 'NULL' ? '' : this.state.db3}
                                                                onChangeText={ (db3) => this.setState({db3}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show5 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date5}
                                                                      mode={mode5}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate5} />
                                                                  }
                                                                  { show5 && Platform.OS === 'ios' && 
                                                                            <View>
                                                                              <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                              <DateTimePicker 
                                                                                value={date5}
                                                                                mode={mode5}
                                                                                is24Hour={true}
                                                                                display="spinner"
                                                                                onChange={this.setDate5} />

                                                                              <TouchableHighlight
                                                                              style={globalStyles.StudentopenButtonReply}
                                                                              onPress={() => this.closedatepickerIOS5()}>
                                                                                <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                              </TouchableHighlight>
                                                                            </View>
                                                                  }
                                                </View>
                                            </Stack>

                                            <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                <View style={{marginTop: '-10%'}}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.gender3 == 'NULL' ? "Select"  : this.state.gender3}
                                                        itemStyle={{fontSize: 18}} 
                                                        onValueChange={(gender3) => this.setState({gender3})}>
                                                            <Picker.Item label="Select" value="NULL" />
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Private" value="Private" />
                                                    </Picker>
                                                </View>
                                            
                                                <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                    <View style={{marginTop: '-10%'}}>
                                                        <Picker
                                                            style={globalStyles.pickerBasicinfo} 
                                                            selectedValue={this.state.re3 == 'NULL' ? "Select"  : this.state.re3}
                                                            itemStyle={{fontSize: 18}} 
                                                            onValueChange={(re3) => this.setState({re3})}>
                                                                <Picker.Item label="Select" value="NULL" />
                                                                <Picker.Item label="Dad" value="Dad" /> 
                                                                <Picker.Item label="Mom" value="Mom" />
                                                                <Picker.Item label="Son" value="Son" />
                                                                <Picker.Item label="Daughter" value="Daughter" />
                                                                <Picker.Item label="Grandparents" value="Grandparents" />
                                                                <Picker.Item label="Others" value="Others" />
                                                        </Picker>
                                                    </View>

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
                                                                                onPress={this.datepicker6}>
                                                                                <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                </TouchableOpacity>
                                                                            }
                                                                            style={ globalStyles.inputedit}
                                                                            placeholder="Message"
                                                                            value={this.state.db_lawf3 == 'NULL' ? '' : this.state.db_lawf3}
                                                                            onChangeText={ (db_lawf3) => this.setState({db_lawf3}) }
                                                                        />
                                                                    </Stack> 
                                                            
                                                                    </View>
                                                                    { show6 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date6}
                                                                      mode={mode6}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate6} />
                                                                      }
                                                                      { show6 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date6}
                                                                                    mode={mode6}
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate6} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS6()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                            </View>
                                                        </Stack>

                                                <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                    <TouchableOpacity onPress={()=>this._pickImage3()}>
                                                        <Card style={globalStyles.shadowbox}>
                                                        <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                <View style={ globalStyles.underlinig }/>
                                                                    {backfilef3 == undefined ?
                                                                    <Text></Text>
                                                                    :<Text style={globalStyles.uploadFile}>{nameif3}</Text>}
                                                        </Card>
                                                    </TouchableOpacity>
                                        </Stack>
                
                                    </CollapsibleList>
                                </Card>
                                :<View></View>
                                }

                              {/*Member 4 */}

                              {this.state.f_name3 != 'NULL' || this.state.f_lname3 != 'NULL' || this.state.db3 != 'NULL' || this.state.db_lawf3 != 'NULL' || this.state.gender3 != 'NULL' || this.state.re3 != 'NULL' ?
                                <Card>
                                        <CollapsibleList
                                            numberOfVisibleItems={0}
                                            wrapperStyle={globalStyles.show}
                                            buttonContent={
                                                this.state.collapse4 === "false" ?
                                                <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse4}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 4{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide4}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        {'       '}Family Member 4{'       '}
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                </TouchableOpacity>
                                            }
                                            >
                                            <View style={{flexDirection: 'row'}}>
                                                <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 4</Heading>
                                                
                                                <Image source={require("../assets/profile2-64.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconFamily}/>
                                                
                                            </View>
                                            <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                <Input 
                                                    defaultValue={item.f_name4 == 'NULL' ? '' : item.f_name4}
                                                    onChangeText={ (f_name4) => this.setState({f_name4}) }
                                                    style={ globalStyles.inputedit}
                                                    />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                <Input 
                                                    defaultValue={item.f_lname4 == 'NULL' ? '' : item.f_lname4}
                                                    onChangeText={ (f_lname4) => this.setState({f_lname4}) }
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                                <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker7}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db4 == 'NULL' ? '' : this.state.db4}
                                                                onChangeText={ (db4) => this.setState({db4}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                          { show7 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date7}
                                                                      mode={mode7}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate7} />
                                                                      }
                                                                      { show7 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date7}
                                                                                    mode={mode7}
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate7} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS7()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                </View>
                                            </Stack>

                                            <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                    <View style={{marginTop: '-10%'}}>
                                                        <Picker
                                                            style={globalStyles.pickerBasicinfo} 
                                                            selectedValue={this.state.gender4 == 'NULL' ? "Select"  : this.state.gender4}
                                                            itemStyle={{fontSize: 18}} 
                                                            onValueChange={(gender4) => this.setState({gender4})}>
                                                                <Picker.Item label="Select" value="NULL" />
                                                                <Picker.Item label="Male" value="Male" /> 
                                                                <Picker.Item label="Female" value="Female" />
                                                                <Picker.Item label="Private" value="Private" />
                                                        </Picker>
                                                    </View>
                                            
                                                    <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                        <View style={{marginTop: '-10%'}}>
                                                            <Picker
                                                                style={globalStyles.pickerBasicinfo} 
                                                                selectedValue={this.state.re4 == 'NULL' ? "Select"  : this.state.re4}
                                                                itemStyle={{fontSize: 18}} 
                                                                onValueChange={(re4) => this.setState({re4})}>
                                                                    <Picker.Item label="Select" value="NULL" />
                                                                    <Picker.Item label="Dad" value="Dad" /> 
                                                                    <Picker.Item label="Mom" value="Mom" />
                                                                    <Picker.Item label="Son" value="Son" />
                                                                    <Picker.Item label="Daughter" value="Daughter" />
                                                                    <Picker.Item label="Grandparents" value="Grandparents" />
                                                                    <Picker.Item label="Others" value="Others" />
                                                            </Picker>
                                                        </View>

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
                                                                                onPress={this.datepicker8}>
                                                                                <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                </TouchableOpacity>
                                                                            }
                                                                            style={ globalStyles.inputedit}
                                                                            placeholder="Message"
                                                                            value={this.state.db_lawf4 == 'NULL' ? '' : this.state.db_lawf4}
                                                                            onChangeText={ (db_lawf4) => this.setState({db_lawf4}) }
                                                                        />
                                                                    </Stack> 
                                                            
                                                                    </View>
                                                                    { show8 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date8}
                                                                      mode={mode8}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate8} />
                                                                      }
                                                                      { show8 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date8}
                                                                                    mode={mode8}
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate8} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS8()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                            </View>
                                                        </Stack>

                                                    <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                    <TouchableOpacity onPress={()=>this._pickImage4()}>
                                                        <Card style={globalStyles.shadowbox}>
                                                            <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                <View style={ globalStyles.underlinig }/>
                                                                    {backfilef4 == undefined ?
                                                                    <Text></Text>
                                                                    :<Text style={globalStyles.uploadFile}>{nameif4}</Text>}
                                                        </Card>
                                                    </TouchableOpacity>
                                            </Stack>
                    
                                        </CollapsibleList>
                                    </Card>
                                    :<View></View>
                                    }

                                {/*Member 5 */}

                                {this.state.f_name4 != 'NULL' || this.state.f_lname4 != 'NULL' || this.state.db4 != 'NULL' || this.state.db_lawf4 != 'NULL' || this.state.gender4 != 'NULL' || this.state.re4 != 'NULL' ?
                                  <Card>
                                        <CollapsibleList
                                            numberOfVisibleItems={0}
                                            wrapperStyle={globalStyles.show}
                                            buttonContent={
                                                this.state.collapse5 === "false" ?
                                                <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse5}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 5{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide5}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        {'       '}Family Member 5{'       '}
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                </TouchableOpacity>
                                            }
                                            >
                                            <View style={{flexDirection: 'row'}}>
                                                <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 5</Heading>
                                                
                                                <Image source={require("../assets/profile2-64.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconFamily}/>
                                                
                                            </View>
                                            <Stack >
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                  <Input 
                                                    defaultValue={item.f_name5 == 'NULL' ? '' : item.f_name5}
                                                    onChangeText={ (f_name5) => this.setState({f_name5}) }
                                                    style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                  <Input 
                                                      defaultValue={item.f_lname5 == 'NULL' ? '' : item.f_lname5}
                                                      onChangeText={ (f_lname5) => this.setState({f_lname5}) }
                                                      style={ globalStyles.inputedit}
                                                  />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                                <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker9}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db5 == 'NULL' ? '' : this.state.db5}
                                                                onChangeText={ (db5) => this.setState({db5}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show9 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date9}
                                                                      mode={mode9}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate9} />
                                                                      }
                                                                      { show9 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date9}
                                                                                    mode={mode9}
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate9} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS9()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                </View>
                                              </Stack>

                                              <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                    <View style={{marginTop: '-10%'}}>
                                                        <Picker
                                                            style={globalStyles.pickerBasicinfo} 
                                                            selectedValue={this.state.gender5 == 'NULL' ? "Select"  : this.state.gender5}
                                                            itemStyle={{fontSize: 18}} 
                                                            onValueChange={(gender5) => this.setState({gender5})}>
                                                                <Picker.Item label="Select" value="NULL" />
                                                                <Picker.Item label="Male" value="Male" /> 
                                                                <Picker.Item label="Female" value="Female" />
                                                                <Picker.Item label="Private" value="Private" />
                                                        </Picker>
                                                    </View>
                                              
                                                    <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                        <View style={{marginTop: '-10%'}}>
                                                            <Picker
                                                                style={globalStyles.pickerBasicinfo} 
                                                                selectedValue={this.state.re5 == 'NULL' ? "Select"  : this.state.re5}
                                                                itemStyle={{fontSize: 18}} 
                                                                onValueChange={(re5) => this.setState({re5})}>
                                                                    <Picker.Item label="Select" value="NULL" />
                                                                    <Picker.Item label="Dad" value="Dad" /> 
                                                                    <Picker.Item label="Mom" value="Mom" />
                                                                    <Picker.Item label="Son" value="Son" />
                                                                    <Picker.Item label="Daughter" value="Daughter" />
                                                                    <Picker.Item label="Grandparents" value="Grandparents" />
                                                                    <Picker.Item label="Others" value="Others" />
                                                            </Picker>
                                                        </View>

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
                                                                                onPress={this.datepicker10}>
                                                                                <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                </TouchableOpacity>
                                                                            }
                                                                            style={ globalStyles.inputedit}
                                                                            placeholder="Message"
                                                                            value={this.state.db_lawf5 == 'NULL' ? '' : this.state.db_lawf5}
                                                                            onChangeText={ (db_lawf5) => this.setState({db_lawf5}) }
                                                                        />
                                                                    </Stack> 
                                                            
                                                                    </View>
                                                                    { show10 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date10}
                                                                      mode={mode10}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate10} />
                                                                      }
                                                                      { show10 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date10}
                                                                                    mode={mode10} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate10} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS10()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                            </View>
                                                          </Stack>

                                                    <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                      <TouchableOpacity onPress={()=>this._pickImage5()}>
                                                          <Card style={globalStyles.shadowbox}>
                                                            <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                  <View style={ globalStyles.underlinig }/>
                                                                      {backfilef5 == undefined ?
                                                                      <Text></Text>
                                                                      :<Text style={globalStyles.uploadFile}>{nameif5}</Text>}
                                                          </Card>
                                                      </TouchableOpacity>
                                            </Stack>
                    
                                        </CollapsibleList>
                                    </Card>
                                    :<View></View>
                                    }

                                    {/*Member 6 */}

                                    {this.state.f_name5 != 'NULL' || this.state.f_lname5 != 'NULL' || this.state.db5 != 'NULL' || this.state.db_lawf5 != 'NULL' || this.state.gender5 != 'NULL' || this.state.re5 != 'NULL' ?
                                    <Card>
                                            <CollapsibleList
                                                numberOfVisibleItems={0}
                                                wrapperStyle={globalStyles.show}
                                                buttonContent={
                                                    this.state.collapse6 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse6}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Family Member 6{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide6}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 6{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                }
                                                >
                                                <View style={{flexDirection: 'row'}}>
                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 6</Heading>
                                                    
                                                    <Image source={require("../assets/profile2-64.png")}
                                                            resizeMode="contain"
                                                            style={globalStyles.editiconFamily}/>
                                                    
                                                </View>
                                                <Stack >
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_name6 == 'NULL' ? '' : item.f_name6}
                                                        onChangeText={ (f_name6) => this.setState({f_name6}) }
                                                        style={ globalStyles.inputedit}
                                                        />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname6 == 'NULL' ? '' : item.f_lname6}
                                                        onChangeText={ (f_lname6) => this.setState({f_lname6}) }
                                                        style={ globalStyles.inputedit}
                                                    />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                                    <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker11}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db6 == 'NULL' ? '' : this.state.db6}
                                                                onChangeText={ (db6) => this.setState({db6}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show11 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date11}
                                                                      mode={mode11}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate11} />
                                                                      }
                                                                      { show11 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date11}
                                                                                    mode={mode11} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate11} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS11()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                </View>
                                                </Stack>

                                                <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                        <View style={{marginTop: '-10%'}}>
                                                            <Picker
                                                                style={globalStyles.pickerBasicinfo} 
                                                                selectedValue={this.state.gender6 == 'NULL' ? "Select"  : this.state.gender6}
                                                                itemStyle={{fontSize: 18}} 
                                                                onValueChange={(gender6) => this.setState({gender6})}>
                                                                    <Picker.Item label="Select" value="NULL" />
                                                                    <Picker.Item label="Male" value="Male" /> 
                                                                    <Picker.Item label="Female" value="Female" />
                                                                    <Picker.Item label="Private" value="Private" />
                                                            </Picker>
                                                        </View>
                                                
                                                        <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                            <View style={{marginTop: '-10%'}}>
                                                                <Picker
                                                                    style={globalStyles.pickerBasicinfo} 
                                                                    selectedValue={this.state.re6 == 'NULL' ? "Select"  : this.state.re6}
                                                                    itemStyle={{fontSize: 18}} 
                                                                    onValueChange={(re6) => this.setState({re6})}>
                                                                        <Picker.Item label="Select" value="NULL" />
                                                                        <Picker.Item label="Dad" value="Dad" /> 
                                                                        <Picker.Item label="Mom" value="Mom" />
                                                                        <Picker.Item label="Son" value="Son" />
                                                                        <Picker.Item label="Daughter" value="Daughter" />
                                                                        <Picker.Item label="Grandparents" value="Grandparents" />
                                                                        <Picker.Item label="Others" value="Others" />
                                                                </Picker>
                                                            </View>

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
                                                                                    onPress={this.datepicker12}>
                                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                    </TouchableOpacity>
                                                                                }
                                                                                style={ globalStyles.inputedit}
                                                                                placeholder="Message"
                                                                                value={this.state.db_lawf6 == 'NULL' ? '' : this.state.db_lawf6}
                                                                                onChangeText={ (db_lawf6) => this.setState({db_lawf6}) }
                                                                            />
                                                                        </Stack> 
                                                                
                                                                        </View>
                                                                        { show12 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date12}
                                                                      mode={mode12}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate12} />
                                                                      }
                                                                      { show12 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date12}
                                                                                    mode={mode12} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate12} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS12()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                                </View>
                                                            </Stack>

                                                        <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                        <TouchableOpacity onPress={()=>this._pickImage6()}>
                                                            <Card style={globalStyles.shadowbox}>
                                                                <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                    <View style={ globalStyles.underlinig }/>
                                                                        {backfilef6 == undefined ?
                                                                        <Text></Text>
                                                                        :<Text style={globalStyles.uploadFile}>{nameif6}</Text>}
                                                            </Card>
                                                        </TouchableOpacity>
                                                </Stack>
                        
                                            </CollapsibleList>
                                        </Card>
                                        :<View></View>}


                                    {/*Member 7 */}

                                    {this.state.f_name6 != 'NULL' || this.state.f_lname6 != 'NULL' || this.state.db6 != 'NULL' || this.state.db_lawf6 != 'NULL' || this.state.gender6 != 'NULL' || this.state.re6 != 'NULL' ?
                                    <Card>
                                          <CollapsibleList
                                              numberOfVisibleItems={0}
                                              wrapperStyle={globalStyles.show}
                                              buttonContent={
                                                  this.state.collapse7 === "false" ?
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse7}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                              {'       '}Family Member 7{'       '}
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                  </TouchableOpacity>
                                                  :
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide7}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 7{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                  </TouchableOpacity>
                                              }
                                              >
                                              <View style={{flexDirection: 'row'}}>
                                                  <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 7</Heading>
                                                  
                                                  <Image source={require("../assets/profile2-64.png")}
                                                          resizeMode="contain"
                                                          style={globalStyles.editiconFamily}/>
                                                  
                                              </View>
                                              <Stack >
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name7 == 'NULL' ? '' : item.f_name7}
                                                      onChangeText={ (f_name7) => this.setState({f_name7}) }
                                                      style={ globalStyles.inputedit}
                                                      />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname7 == 'NULL' ? '' : item.f_lname7}
                                                        onChangeText={ (f_lname7) => this.setState({f_lname7}) }
                                                        style={ globalStyles.inputedit}
                                                    />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                                  <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker13}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db7 == 'NULL' ? '' : this.state.db7}
                                                                onChangeText={ (db7) => this.setState({db7}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show13 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date13}
                                                                      mode={mode13}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate13} />
                                                                      }
                                                                      { show13 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date13}
                                                                                    mode={mode13} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate13} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS13()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                </View>
                                                </Stack>

                                                <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                      <View style={{marginTop: '-10%'}}>
                                                          <Picker
                                                              style={globalStyles.pickerBasicinfo} 
                                                              selectedValue={this.state.gender7 == 'NULL' ? "Select"  : this.state.gender7}
                                                              itemStyle={{fontSize: 18}} 
                                                              onValueChange={(gender7) => this.setState({gender7})}>
                                                                  <Picker.Item label="Select" value="NULL" />
                                                                  <Picker.Item label="Male" value="Male" /> 
                                                                  <Picker.Item label="Female" value="Female" />
                                                                  <Picker.Item label="Private" value="Private" />
                                                          </Picker>
                                                      </View>
                                                
                                                      <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                          <View style={{marginTop: '-10%'}}>
                                                              <Picker
                                                                  style={globalStyles.pickerBasicinfo} 
                                                                  selectedValue={this.state.re7 == 'NULL' ? "Select"  : this.state.re7}
                                                                  itemStyle={{fontSize: 18}} 
                                                                  onValueChange={(re7) => this.setState({re7})}>
                                                                      <Picker.Item label="Select" value="NULL" />
                                                                      <Picker.Item label="Dad" value="Dad" /> 
                                                                      <Picker.Item label="Mom" value="Mom" />
                                                                      <Picker.Item label="Son" value="Son" />
                                                                      <Picker.Item label="Daughter" value="Daughter" />
                                                                      <Picker.Item label="Grandparents" value="Grandparents" />
                                                                      <Picker.Item label="Others" value="Others" />
                                                              </Picker>
                                                          </View>

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
                                                                                    onPress={this.datepicker14}>
                                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                    </TouchableOpacity>
                                                                                }
                                                                                style={ globalStyles.inputedit}
                                                                                placeholder="Message"
                                                                                value={this.state.db_lawf7 == 'NULL' ? '' : this.state.db_lawf7}
                                                                                onChangeText={ (db_lawf7) => this.setState({db_lawf7}) }
                                                                            />
                                                                        </Stack> 
                                                                
                                                                        </View>
                                                                        { show14 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date14}
                                                                      mode={mode14}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate14} />
                                                                      }
                                                                      { show14 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date14}
                                                                                    mode={mode14} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate14} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS14()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                                </View>
                                                            </Stack>

                                                      <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                        <TouchableOpacity onPress={()=>this._pickImage7()}>
                                                            <Card style={globalStyles.shadowbox}>
                                                              <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                    <View style={ globalStyles.underlinig }/>
                                                                        {backfilef7 == undefined ?
                                                                        <Text></Text>
                                                                        :<Text style={globalStyles.uploadFile}>{nameif7}</Text>}
                                                            </Card>
                                                        </TouchableOpacity>
                                              </Stack>
                      
                                          </CollapsibleList>
                                      </Card>
                                      :<View></View>}


                                      {/*Member 8 */}

                                      {this.state.f_name7 != 'NULL' || this.state.f_lname7 != 'NULL' || this.state.db7 != 'NULL' || this.state.db_lawf7 != 'NULL' || this.state.gender7 != 'NULL' || this.state.re7 != 'NULL' ?
                                        <Card>
                                              <CollapsibleList
                                                  numberOfVisibleItems={0}
                                                  wrapperStyle={globalStyles.show}
                                                  buttonContent={
                                                      this.state.collapse8 === "false" ?
                                                      <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse8}>
                                                          <Text style={globalStyles.buttonTextroom}>
                                                              <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                  {'       '}Family Member 8{'       '}
                                                              <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                          </Text>
                                                      </TouchableOpacity>
                                                      :
                                                      <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide8}>
                                                          <Text style={globalStyles.buttonTextroom}>
                                                              <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                              {'       '}Family Member 8{'       '}
                                                              <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          </Text>
                                                      </TouchableOpacity>
                                                  }
                                                  >
                                                  <View style={{flexDirection: 'row'}}>
                                                      <Heading size='md' style={ globalStyles.infomaintitledit}>Family Member 8</Heading>
                                                      
                                                      <Image source={require("../assets/profile2-64.png")}
                                                              resizeMode="contain"
                                                              style={globalStyles.editiconFamily}/>
                                                      
                                                  </View>
                                                  <Stack >
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                                        <Input 
                                                          defaultValue={item.f_name8 == 'NULL' ? '' : item.f_name8}
                                                          onChangeText={ (f_name8) => this.setState({f_name8}) }
                                                          style={ globalStyles.inputedit}
                                                          />
                                                    </Stack>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                                        <Input 
                                                            defaultValue={item.f_lname8 == 'NULL' ? '' : item.f_lname8}
                                                            onChangeText={ (f_lname8) => this.setState({f_lname8}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                    </Stack>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                                      <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={this.datepicker15}>
                                                                    <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db8 == 'NULL' ? '' : this.state.db8}
                                                                onChangeText={ (db8) => this.setState({db8}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                          { show15 && Platform.OS != 'ios' && <DateTimePicker 
                                                                      value={date15}
                                                                      mode={mode15}
                                                                      is24Hour={true}
                                                                      display="default"
                                                                      onChange={this.setDate15} />
                                                                      }
                                                                      { show15 && Platform.OS === 'ios' && 
                                                                                <View>
                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                  <DateTimePicker 
                                                                                    value={date15}
                                                                                    mode={mode15} 
                                                                                    is24Hour={true}
                                                                                    display="spinner"
                                                                                    onChange={this.setDate15} />

                                                                                  <TouchableHighlight
                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                  onPress={() => this.closedatepickerIOS15()}>
                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                  </TouchableHighlight>
                                                                                </View>
                                                                      }
                                                </View>
                                                    </Stack>

                                                    <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                          <View style={{marginTop: '-10%'}}>
                                                              <Picker
                                                                  style={globalStyles.pickerBasicinfo} 
                                                                  selectedValue={this.state.gender8 == 'NULL' ? "Select"  : this.state.gender8}
                                                                  itemStyle={{fontSize: 18}} 
                                                                  onValueChange={(gender8) => this.setState({gender8})}>
                                                                      <Picker.Item label="Select" value="NULL" />
                                                                      <Picker.Item label="Male" value="Male" /> 
                                                                      <Picker.Item label="Female" value="Female" />
                                                                      <Picker.Item label="Private" value="Private" />
                                                              </Picker>
                                                          </View>
                                                    
                                                          <FormControl.Label style={ globalStyles.infotitle}>Relation</FormControl.Label>

                                                              <View style={{marginTop: '-10%'}}>
                                                                  <Picker
                                                                      style={globalStyles.pickerBasicinfo} 
                                                                      selectedValue={this.state.re8 == 'NULL' ? "Select"  : this.state.re8}
                                                                      itemStyle={{fontSize: 18}} 
                                                                      onValueChange={(re8) => this.setState({re8})}>
                                                                          <Picker.Item label="Select" value="NULL" />
                                                                          <Picker.Item label="Dad" value="Dad" /> 
                                                                          <Picker.Item label="Mom" value="Mom" />
                                                                          <Picker.Item label="Son" value="Son" />
                                                                          <Picker.Item label="Daughter" value="Daughter" />
                                                                          <Picker.Item label="Grandparents" value="Grandparents" />
                                                                          <Picker.Item label="Others" value="Others" />
                                                                  </Picker>
                                                              </View>

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
                                                                                        onPress={this.datepicker16}>
                                                                                        <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                                                                                        </TouchableOpacity>
                                                                                    }
                                                                                    style={ globalStyles.inputedit}
                                                                                    placeholder="Message"
                                                                                    value={this.state.db_lawf8 == 'NULL' ? '' : this.state.db_lawf8}
                                                                                    onChangeText={ (db_lawf8) => this.setState({db_lawf8}) }
                                                                                />
                                                                            </Stack> 
                                                                    
                                                                            </View>
                                                                            { show16 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date16}
                                                                              mode={mode16}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate16} />
                                                                              }
                                                                              { show16 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker 
                                                                                            value={date16}
                                                                                            mode={mode16} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate16} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS16()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                    </View>
                                                                </Stack>

                                                          <FormControl.Label style={ globalStyles.infotitle}>Background Check</FormControl.Label>

                                                            <TouchableOpacity onPress={()=>this._pickImage8()}>
                                                                <Card style={globalStyles.shadowbox}>
                                                                  <Heading size='md' style={ globalStyles.infomaintitledit}> Touch to upload file </Heading>
                                                                        <View style={ globalStyles.underlinig }/>
                                                                            {backfilef8 == undefined ?
                                                                            <Text></Text>
                                                                            :<Text style={globalStyles.uploadFile}>{nameif8}</Text>}
                                                                </Card>
                                                            </TouchableOpacity>
                                                  </Stack>
                          
                                              </CollapsibleList>
                                          </Card>
                                          :<View></View>}
                      </FormControl>

                      <Button
                            success
                            bordered
                            onPress={this.registerbasici}
                            style={globalStyles.botonedit}
                            >

                            <Text style={globalStyles.botonTexto}> Update </Text>
                        </Button>
                            </View>
                 
                </ScrollView>
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}