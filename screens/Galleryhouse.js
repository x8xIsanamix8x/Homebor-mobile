import React, {Component, useState, useEffect} from 'react';
import { View, Text, Image, Alert} from 'react-native'
import { NativeBaseProvider, Button, Heading, Icon, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';
import { StatusBar } from 'expo-status-bar';

import { FontAwesome } from '@expo/vector-icons';

import api from '../api/api';

import NetInfo from "@react-native-community/netinfo";

export default class Galleryhouse extends Component {
   NetInfoSubscription = null;
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],

                //Default Image
                imagehome: require('../assets/img/empty/vacios-homebor-casa.png'),
                imageliving: require('../assets/img/empty/vacios-homebor-sala.png'),
                imagefamily: require('../assets/img/empty/vacios-homebor-familia.png'),
                imagekitchen: require('../assets/img/empty/vacios-homebor-cocina.png'),
                imagedining: require('../assets/img/empty/vacios-homebor-comedor.png'),
                imagecommon1: require('../assets/img/empty/vacios-homebor-areas-recreativas.png'),
                imagecommon2: require('../assets/img/empty/vacios-homebor-areas-recreativas.png'),
                imagebath1: require('../assets/img/empty/vacios-homebor-bath.png'),
                imagebath2: require('../assets/img/empty/vacios-homebor-bath.png'),
                imagebath3: require('../assets/img/empty/vacios-homebor-bath.png'),
                imagebath4: require('../assets/img/empty/vacios-homebor-bath.png'),

                //Internet Connection
                connection_status: false,
                clockrun : false,
			} 
	} 
    
    

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
          )
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        //Get user profile (In this file all must be NULL and with that we can put the fields empty in frontend)
        let profile = await api.getGalleryPhotos(this.state.email,this.state.perm)
		this.setState({ info : profile.data, id: profile.data[0].id_home, idm: profile.data[0].id_m, photo0: 'Yes', photo1: 'Yes', photo2: 'Yes', photo3: 'Yes', photo4: 'Yes', photo5: 'Yes', photo6: 'Yes', photo7: 'Yes', photo8: 'Yes', photo9: 'Yes', photo10: 'Yes', photo11: 'Yes' })
		console.log(this.state.info)

        //Permissions function call
        this.getPermissionAsync();
    };

    //Permissions function to access to the gallery in the phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.'); 
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
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
            { cancelable: false }
          )
    }


    //Function to catch image from frontend
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
        //Functions call to register the images to database
        let localUri = this.state.imagehome;
        if (localUri == require('../assets/img/empty/vacios-homebor-casa.png')) {} 
        else { this.registerfile1() }
        let localUri2 = this.state.imageliving;
        if (localUri2 == require('../assets/img/empty/vacios-homebor-sala.png')) {} 
        else { this.registerfile2() }
        let localUri3 = this.state.imagefamily;
        if (localUri3 == require('../assets/img/empty/vacios-homebor-familia.png')) {} 
        else { this.registerfile3() }
        let localUri4 = this.state.imagekitchen;
        if (localUri4 == require('../assets/img/empty/vacios-homebor-cocina.png')) {} 
        else { this.registerfile4() }
        let localUri5 = this.state.imagedining;
        if (localUri5 == require('../assets/img/empty/vacios-homebor-comedor.png')) {} 
        else { this.registerfile5() }
        let localUri6 = this.state.imagecommon1;
        if (localUri6 == require('../assets/img/empty/vacios-homebor-areas-recreativas.png')) {} 
        else { this.registerfile6() }
        let localUri7 = this.state.imagecommon2;
        if (localUri7 == require('../assets/img/empty/vacios-homebor-areas-recreativas.png')) {} 
        else { this.registerfile7() }
        let localUri8 = this.state.imagebath1;
        if (localUri8 == require('../assets/img/empty/vacios-homebor-bath.png')) {} 
        else { this.registerfile8() }
        let localUri9 = this.state.imagebath2;
        if (localUri9 == require('../assets/img/empty/vacios-homebor-bath.png')) {} 
        else { this.registerfile9() }
        let localUri10 = this.state.imagebath3;
        if (localUri10 == require('../assets/img/empty/vacios-homebor-bath.png')) {} 
        else { this.registerfile10() }
        let localUri11 = this.state.imagebath4;
        if (localUri11 == require('../assets/img/empty/vacios-homebor-bath.png')) {} 
        else { this.registerfile11() }
        if (localUri == require('../assets/img/empty/vacios-homebor-casa.png') && localUri2  == require('../assets/img/empty/vacios-homebor-sala.png') && localUri3  == require('../assets/img/empty/vacios-homebor-familia.png') && localUri4  == require('../assets/img/empty/vacios-homebor-cocina.png') && localUri5  == require('../assets/img/empty/vacios-homebor-comedor.png') && localUri6  == require('../assets/img/empty/vacios-homebor-areas-recreativas.png') && localUri7  == require('../assets/img/empty/vacios-homebor-areas-recreativas.png') && localUri8  == require('../assets/img/empty/vacios-homebor-bath.png') && localUri9  == require('../assets/img/empty/vacios-homebor-bath.png') && localUri10  == require('../assets/img/empty/vacios-homebor-bath.png') && localUri11  == require('../assets/img/empty/vacios-homebor-bath.png')){
        this.props.navigation.navigate('Familyinfo')
        }else {
            this.registerlog()
        }
    }

    
    //Functions to register the images to database
    registerfile1 = async () => {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo1=${photo1}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo2=${photo2}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo3=${photo3}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo4=${photo4}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo5=${photo5}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo6=${photo6}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo7=${photo7}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo8=${photo8}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo9=${photo9}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo10=${photo10}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo11=${photo11}`, {
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

          return await fetch(`https://homebor.com/galleryregisterapp.php?email=${eMail}&id=${id}&photo0=${photo0}&idm=${idm}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Data Uploaded Successfully')
                this.props.navigation.navigate('Familyinfo')
              }
              else {
                Alert.alert('Error')
              }
            });
    };

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
      }
    
      Clock = () => {
        this.timerHandle = setTimeout (() => {
          this.setState({clockrun : false});
          this.timerHandle = 0;
        }, 5000)
      }

      noInternetConnection = () => {
        Alert.alert('There is no internet connection, connect and try again.')
      }
    
      componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;
      }

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
                <StatusBar style="light" translucent={true} />
                    <Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
                        <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
                        <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2}  justifyContent="center">
                            <Text color="error.600" fontWeight="medium">
                            <AlertNativeBase.Icon />
                            <Text> No Internet Connection</Text>
                            </Text>
                        </HStack>
                        </VStack>
                        </AlertNativeBase>
                    </Slide>
                    
                    <View style={globalStyles.marginTopRequiredFields}>
                        <Heading size='xl'style={ globalStyles.titulo }>House Gallery</Heading>
                    </View>
                 <ScrollView horizontal={true}>
                    {/*Frontage Photo*/}

                    <TouchableOpacity onPress={()=>this._Alerthome()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Frontage Photo </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagehome == require('../assets/img/empty/vacios-homebor-casa.png') ?
                                            item.phome == "NULL" ?
                                            <Image source={imagehome}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.phome}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagehome}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Living Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertliving()}>
                            <Card style={globalStyles.shadowbox}>
                              <Heading size='md' style={globalStyles.titlegalleryedit}> Living Room Photo </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imageliving == require('../assets/img/empty/vacios-homebor-sala.png') ?
                                            item.pliving == "NULL" ?
                                            <Image source={imageliving}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pliving}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imageliving}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Family Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertfamily()}>
                                <Card style={globalStyles.shadowbox}>
                                  <Heading size='md' style={globalStyles.titlegalleryedit}> Family Picture </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagefamily == require('../assets/img/empty/vacios-homebor-familia.png') ?
                                            item.fp == "NULL" ?
                                            <Image source={imagefamily}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.fp}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagefamily}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>

                        <ScrollView horizontal={true}>

                            {/*Kitchen Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertkitchen()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Kitchen</Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagekitchen == require('../assets/img/empty/vacios-homebor-cocina.png') ?
                                            item.parea1 == "NULL" ?
                                            <Image source={imagekitchen}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea1}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagekitchen}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Dining Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertdining()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Dining Room</Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagedining == require('../assets/img/empty/vacios-homebor-comedor.png') ?
                                            item.parea2 == "NULL" ?
                                            <Image source={imagedining}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea2}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagedining}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*House Area 3 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertcommon1()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 3 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagecommon1 == require('../assets/img/empty/vacios-homebor-areas-recreativas.png') ?
                                            item.parea3 == "NULL" ?
                                            <Image source={imagecommon1}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea3}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagecommon1}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*House Area 4 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertcommon2()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 4 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagecommon2 == require('../assets/img/empty/vacios-homebor-areas-recreativas.png') ?
                                            item.parea4 == "NULL" ?
                                            <Image source={imagecommon2}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.parea4}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagecommon2}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>

                        <ScrollView horizontal={true}>

                            {/*Bathroom 1 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath1()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 1</Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath1 == require('../assets/img/empty/vacios-homebor-bath.png') ?
                                            item.pbath1 == "NULL" ?
                                            <Image source={imagebath1}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath1}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagebath1}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 2 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath2()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 2 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath2 == require('../assets/img/empty/vacios-homebor-bath.png') ?
                                            item.pbath2 == "NULL" ?
                                            <Image source={imagebath2}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath2}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagebath2}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 3 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath3()}>
                            <Card style={globalStyles.shadowbox}>
                                <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 3 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath3 == require('../assets/img/empty/vacios-homebor-bath.png') ?
                                            item.pbath3 == "NULL" ?
                                            <Image source={imagebath3}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath3}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagebath3}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                            {/*Bathroom 4 Photo*/}

                            <TouchableOpacity onPress={()=>this._Alertbath4()}>
                                <Card style={globalStyles.shadowbox}>
                                    <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 4 </Heading>
                                        <View style={ globalStyles.underlinig }/>
                                            {imagebath4 == require('../assets/img/empty/vacios-homebor-bath.png') ?
                                            item.pbath4 == "NULL" ?
                                            <Image source={imagebath4}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: `http://homebor.com/${item.pbath4}`}}
                                            style={globalStyles.ImageGalleryedit} />
                                            :
                                            <Image source={{uri: imagebath4}}
                                            style={globalStyles.ImageGalleryedit} />}
                                </Card>
                            </TouchableOpacity>

                        </ScrollView>

                        {this.state.connection_status ? <View>
            
                            <Button
                                success
                                bordered
                                onPress={this.registerbasici}
                                style={globalStyles.botoneditRequiredFields}
                                >

                                <Text
                                        style={globalStyles.botonTexto}
                                        
                                > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
                            </Button> 

                            </View> : <View>

                                <Button
                                    success
                                    bordered
                                    onPress={() => this.noInternetConnection()}
                                    style={globalStyles.botoneditRequiredFields}
                                    >

                                    <Text
                                            style={globalStyles.botonTexto}
                                            
                                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
                                </Button> 

                            </View>

                        }
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}