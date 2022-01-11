import React, {Component, useState, useEffect} from 'react';
import { View, ScrollView, Image, Alert} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading  } from 'native-base';
import {Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import CollapsibleList from "react-native-collapsible-list";

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
                                        <Input 
                                                defaultValue={item.db1 == 'NULL' ? '' : item.db1}
                                                onChangeText={ (db1) => this.setState({db1}) }
                                                style={ globalStyles.inputedit}
                                            />
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
                                                      <Input 
                                                      defaultValue={item.db_lawf1 == 'NULL' ? '' : item.db_lawf1}
                                                      onChangeText={ (db_lawf1) => this.setState({db_lawf1}) }
                                                      style={ globalStyles.inputedit}
                                                     />
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
                                            <Input 
                                                    defaultValue={item.db2 == 'NULL' ? '' : item.db2}
                                                    onChangeText={ (db2) => this.setState({db2}) }
                                                    style={ globalStyles.inputedit}
                                                />
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
                                                          <Input 
                                                          defaultValue={item.db_lawf2 == 'NULL' ? '' : item.db_lawf2}
                                                          onChangeText={ (db_lawf2) => this.setState({db_lawf2}) }
                                                          style={ globalStyles.inputedit}
                                                        />
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
                                            <Input 
                                                    defaultValue={item.db3 == 'NULL' ? '' : item.db3}
                                                    onChangeText={ (db3) => this.setState({db3}) }
                                                    style={ globalStyles.inputedit}
                                                />
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
                                                          <Input 
                                                          defaultValue={item.db_lawf3 == 'NULL' ? '' : item.db_lawf3}
                                                          onChangeText={ (db_lawf3) => this.setState({db_lawf3}) }
                                                          style={ globalStyles.inputedit}
                                                        />
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
                                              <Input 
                                                      defaultValue={item.db4 == 'NULL' ? '' : item.db4}
                                                      onChangeText={ (db4) => this.setState({db4}) }
                                                      style={ globalStyles.inputedit}
                                                  />
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
                                                            <Input 
                                                            defaultValue={item.db_lawf4 == 'NULL' ? '' : item.db_lawf4}
                                                            onChangeText={ (db_lawf4) => this.setState({db_lawf4}) }
                                                            style={ globalStyles.inputedit}
                                                          />
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
                                                  <Input 
                                                          defaultValue={item.db5 == 'NULL' ? '' : item.db5}
                                                          onChangeText={ (db5) => this.setState({db5}) }
                                                          style={ globalStyles.inputedit}
                                                      />
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
                                                                <Input 
                                                                defaultValue={item.db_lawf5 == 'NULL' ? '' : item.db_lawf5}
                                                                onChangeText={ (db_lawf5) => this.setState({db_lawf5}) }
                                                                style={ globalStyles.inputedit}
                                                              />
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
                                                  <Input 
                                                          defaultValue={item.db6 == 'NULL' ? '' : item.db6}
                                                          onChangeText={ (db6) => this.setState({db6}) }
                                                          style={ globalStyles.inputedit}
                                                      />
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
                                                                <Input 
                                                                defaultValue={item.db_lawf6 == 'NULL' ? '' : item.db_lawf6}
                                                                onChangeText={ (db_lawf6) => this.setState({db_lawf6}) }
                                                                style={ globalStyles.inputedit}
                                                              />
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
                                                    <Input 
                                                            defaultValue={item.db7 == 'NULL' ? '' : item.db7}
                                                            onChangeText={ (db7) => this.setState({db7}) }
                                                            style={ globalStyles.inputedit}
                                                        />
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
                                                                  <Input 
                                                                  defaultValue={item.db_lawf7 == 'NULL' ? '' : item.db_lawf7}
                                                                  onChangeText={ (db_lawf7) => this.setState({db_lawf7}) }
                                                                  style={ globalStyles.inputedit}
                                                                />
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
                                                        <Input 
                                                                defaultValue={item.db8 == 'NULL' ? '' : item.db8}
                                                                onChangeText={ (db8) => this.setState({db8}) }
                                                                style={ globalStyles.inputedit}
                                                            />
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
                                                                      <Input 
                                                                      defaultValue={item.db_lawf8 == 'NULL' ? '' : item.db_lawf8}
                                                                      onChangeText={ (db_lawf8) => this.setState({db_lawf8}) }
                                                                      style={ globalStyles.inputedit}
                                                                    />
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