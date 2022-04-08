import React, {Component, useState, useEffect} from 'react';
import { View, ScrollView, Image, Alert} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Icon  } from 'native-base';
import {Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import CollapsibleList from "react-native-collapsible-list";

import DateTimePicker from '@react-native-community/datetimepicker';

import globalStyles from '../styles/global';
import Card from '../shared/card';


import api from '../api/api';


export default class Familyinfo extends Component {
  
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
        this.props.navigation.navigate('Calemdar')
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

        closedatepickerIOS16 = () => {
          this.setState({
            show16: Platform.OS === 'ios' ? false : false,
          });
    
        }
    
        const dateY16 = new Date(date16.setDate(date16.getDate()));
        let YDAY16= dateY16.getMonth()<9 ? dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-${dateY16.getDate()}` : dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-${dateY16.getDate()}`
        this.setState({db_lawf8 : YDAY16})
        
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
                              </Card>:
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
                              </Card>:<View></View>
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
                                </Card>:<View></View>
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
                                    </Card>:<View></View>
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
                                    </Card>:<View></View>}


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

                                    <Text style={globalStyles.botonTexto}> Submit </Text>
                                </Button>
                            </View>
                 
                </ScrollView>
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}