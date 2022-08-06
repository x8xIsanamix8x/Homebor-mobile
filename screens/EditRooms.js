import React, {Component, useState} from 'react'; 
import { View, ScrollView, Image, Text, RefreshControl, Alert, Dimensions,  Platform  } from 'react-native';
import { NativeBaseProvider, Heading, Spinner, Input, InputLeftAddon, InputGroup, Button, Stack, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Divider } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { AntDesign } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import NetInfo from "@react-native-community/netinfo";

export default class EditRooms extends Component {
    NetInfoSubscription = null;
    
    constructor(props){
        super(props);
        this.state = {
            //Variables
            email : '',
            perm : false,
            info : [],
            refreshing: false,

            //Image by the fould
            imageroom1: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom1_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom1_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom2: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom2_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom2_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom3: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom3_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom3_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom4: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom4_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom4_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom5: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom5_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom5_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom6: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom6_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom6_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom7: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom7_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom7_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            imageroom8: require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom8_2 : require('../assets/img/empty/vacios-homebor-habitacion.png'),
            imageroom8_3 : require('../assets/img/empty/vacios-homebor-habitacion.png'),

            //Variables of collapsibles
            expanded: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
            expanded5: false,
            expanded6: false,
            expanded7: false,
            expanded8: false,

            expandedbed: false,
            expanded2bed: false,
            expanded3bed: false,
            expanded4bed: false,
            expanded5bed: false,
            expanded6bed: false,
            expanded7bed: false,
            expanded8bed: false,

            //Internet Connection
            connection_status: false,
            connection_refreshStatus: false,
            clockrun : false,

            //LoadingFirstTime
            readyDisplay : false
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange)
        
        //Get profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
        
        if(this.state.connection_status == true) {
            //Get profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false, connection_refreshStatus: false, id : profile[0].data.id_home, idm : profile[0].data.id_m, type1 : profile[0].data.type1, bed1 : profile[0].data.bed1, date1 : profile[0].data.date1, bed1_2: profile[0].data.bed1_2, date1_2: profile[0].data.date1_2, bed1_3: profile[0].data.bed1_3, date1_3: profile[0].data.date1_3,  food1 : profile[0].data.food1, aprox1 : profile[0].data.aprox1,  type2 : profile[0].data.type2, bed2 : profile[0].data.bed2, date2 : profile[0].data.date2, bed2_2: profile[0].data.bed2_2, date2_2: profile[0].data.date2_2, bed2_3: profile[0].data.bed2_3, date2_3: profile[0].data.date2_3, food2 : profile[0].data.food2, aprox2 : profile[0].data.aprox2, type3 : profile[0].data.type3, bed3 : profile[0].data.bed3, date3 : profile[0].data.date3, bed3_2: profile[0].data.bed3_2, date3_2: profile[0].data.date3_2, bed3_3: profile[0].data.bed3_3, date3_3: profile[0].data.date3_3, food3 : profile[0].data.food3, aprox3 : profile[0].data.aprox3, type4 : profile[0].data.type4, bed4 : profile[0].data.bed4, date4 : profile[0].data.date4, bed4_2: profile[0].data.bed4_2, date4_2: profile[0].data.date4_2, bed4_3: profile[0].data.bed4_3, date4_3: profile[0].data.date4_3, food4 : profile[0].data.food4, aprox4 : profile[0].data.aprox4, type5 : profile[0].data.type5, bed5 : profile[0].data.bed5, date5 : profile[0].data.date5, bed5_2: profile[0].data.bed5_2, date5_2: profile[0].data.date5_2, bed5_3: profile[0].data.bed5_3, date5_3: profile[0].data.date5_3, food5 : profile[0].data.food5, aprox5 : profile[0].data.aprox5, type6 : profile[0].data.type6, bed6 : profile[0].data.bed6, date6 : profile[0].data.date6, bed6_2: profile[0].data.bed6_2, date6_2: profile[0].data.date6_2, bed6_3: profile[0].data.bed6_3, date6_3: profile[0].data.date6_3, food6 : profile[0].data.food6, aprox6 : profile[0].data.aprox6, type7 : profile[0].data.type7, bed7 : profile[0].data.bed7, date7 : profile[0].data.date7, bed7_2: profile[0].data.bed7_2, date7_2: profile[0].data.date7_2, bed7_3: profile[0].data.bed7_3, date7_3: profile[0].data.date7_3, food7 : profile[0].data.food7, aprox7 : profile[0].data.aprox7, type8 : profile[0].data.type8, bed8 : profile[0].data.bed8, date8 : profile[0].data.date8, bed8_2: profile[0].data.bed8_2, date8_2: profile[0].data.date8_2, bed8_3: profile[0].data.bed8_3, date8_3: profile[0].data.date8_3, food8 : profile[0].data.food8, aprox8 : profile[0].data.aprox8, photo1 : 'Yes' })
            this.setState({ photo1_2 : 'Yes', photo1_3 : 'Yes', photo2 : 'Yes', photo2_2 : 'Yes', photo2_3 : 'Yes', photo3 : 'Yes', photo3_2 : 'Yes', photo3_3 : 'Yes', photo4 : 'Yes', photo4_2 : 'Yes', photo4_3 : 'Yes', photo5 : 'Yes', photo5_2 : 'Yes', photo5_3 : 'Yes', photo6 : 'Yes', photo6_2 : 'Yes', photo6_3 : 'Yes', photo7 : 'Yes', photo7_2 : 'Yes', photo7_3 : 'Yes', photo8 : 'Yes', photo8_2 : 'Yes', photo8_3 : 'Yes', photo0 : 'Yes', readyDisplay : true})
            console.log(this.state.info)
        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Function call to get permissions for access to gallery
        this.getPermissionAsync();

        //Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		});
    }

    //Function to get permissions for access to gallery
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.');
                
            }
        }
    }

    //Group of function to catch images from frontend
    _Alertroom1 = async () => { 
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

    _Alertroom1_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera1_2(),},
              {text: 'Folder', onPress: () => this._pickImage1_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom1_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera1_3(),},
              {text: 'Folder', onPress: () => this._pickImage1_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom2 = async () => { 
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

    _Alertroom2_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera2_2(),},
              {text: 'Folder', onPress: () => this._pickImage2_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom2_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera2_3(),},
              {text: 'Folder', onPress: () => this._pickImage2_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom3 = async () => { 
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

    _Alertroom3_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera3_2(),},
              {text: 'Folder', onPress: () => this._pickImage3_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom3_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera3_3(),},
              {text: 'Folder', onPress: () => this._pickImage3_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom4 = async () => { 
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

    _Alertroom4_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera4_2(),},
              {text: 'Folder', onPress: () => this._pickImage4_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom4_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera4_3(),},
              {text: 'Folder', onPress: () => this._pickImage4_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom5 = async () => { 
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

    _Alertroom5_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera5_2(),},
              {text: 'Folder', onPress: () => this._pickImage5_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom5_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera5_3(),},
              {text: 'Folder', onPress: () => this._pickImage5_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom6 = async () => { 
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

    _Alertroom6_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera6_2(),},
              {text: 'Folder', onPress: () => this._pickImage6_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom6_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera6_3(),},
              {text: 'Folder', onPress: () => this._pickImage6_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom7 = async () => { 
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

    _Alertroom7_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera7_2(),},
              {text: 'Folder', onPress: () => this._pickImage7_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom7_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera7_3(),},
              {text: 'Folder', onPress: () => this._pickImage7_3()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom8 = async () => { 
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

    _Alertroom8_2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera8_2(),},
              {text: 'Folder', onPress: () => this._pickImage8_2()},
            ],
            { cancelable: true }
          )
    }

    _Alertroom8_3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera8_3(),},
              {text: 'Folder', onPress: () => this._pickImage8_3()},
            ],
            { cancelable: true }
          )
    }

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
                 imageroom1: result.uri
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
                 imageroom1: result.uri
             });


        }
    }

    _pickImageCamera1_2 = async () => {
        let result1_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result1_2);
        console.log(this.state.email)

        if(!result1_2.cancelled) {
            this.setState({
                 imageroom1_2: result1_2.uri
             });


        }
    }

    _pickImage1_2 = async () => {
        let result1_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result1_2);
        console.log(this.state.email)

        if(!result1_2.cancelled) {
            this.setState({
                 imageroom1_2: result1_2.uri
             });


        }
    }

    _pickImageCamera1_3 = async () => {
        let result1_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result1_3);
        console.log(this.state.email)

        if(!result1_3.cancelled) {
            this.setState({
                 imageroom1_3: result1_3.uri
             });


        }
    }

    _pickImage1_3 = async () => {
        let result1_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result1_3);
        console.log(this.state.email)

        if(!result1_3.cancelled) {
            this.setState({
                 imageroom1_3: result1_3.uri
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
        console.log(this.state.email)

        if(!result2.cancelled) {
            this.setState({
                 imageroom2: result2.uri
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
        console.log(this.state.email)

        if(!result2.cancelled) {
            this.setState({
                 imageroom2: result2.uri
             });


        }
    }

    _pickImageCamera2_2 = async () => {
        let result2_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2_2);
        console.log(this.state.email)

        if(!result2_2.cancelled) {
            this.setState({
                 imageroom2_2: result2_2.uri
             });


        }
    }

    _pickImage2_2 = async () => {
        let result2_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2_2);
        console.log(this.state.email)

        if(!result2_2.cancelled) {
            this.setState({
                 imageroom2_2: result2_2.uri
             });


        }
    }

    _pickImageCamera2_3 = async () => {
        let result2_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2_3);
        console.log(this.state.email)

        if(!result2_3.cancelled) {
            this.setState({
                 imageroom2_3: result2_3.uri
             });


        }
    }

    _pickImage2_3 = async () => {
        let result2_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2_3);
        console.log(this.state.email)

        if(!result2_3.cancelled) {
            this.setState({
                 imageroom2_3: result2_3.uri
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
        console.log(this.state.email)

        if(!result3.cancelled) {
            this.setState({
                 imageroom3: result3.uri
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
        console.log(this.state.email)

        if(!result3.cancelled) {
            this.setState({
                 imageroom3: result3.uri
             });


        }
    }

    _pickImageCamera3_2 = async () => {
        let result3_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3_2);
        console.log(this.state.email)

        if(!result3_2.cancelled) {
            this.setState({
                 imageroom3_2: result3_2.uri
             });


        }
    }

    _pickImage3_2 = async () => {
        let result3_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3_2);
        console.log(this.state.email)

        if(!result3_2.cancelled) {
            this.setState({
                 imageroom3_2: result3_2.uri
             });


        }
    }

    _pickImageCamera3_3 = async () => {
        let result3_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3_3);
        console.log(this.state.email)

        if(!result3_3.cancelled) {
            this.setState({
                 imageroom3_3: result3_3.uri
             });


        }
    }

    _pickImage3_3 = async () => {
        let result3_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3_3);
        console.log(this.state.email)

        if(!result3_3.cancelled) {
            this.setState({
                 imageroom3_3: result3_3.uri
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
        console.log(this.state.email)

        if(!result4.cancelled) {
            this.setState({
                 imageroom4: result4.uri
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
        console.log(this.state.email)

        if(!result4.cancelled) {
            this.setState({
                 imageroom4: result4.uri
             });


        }
    }

    _pickImageCamera4_2 = async () => {
        let result4_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4_2);
        console.log(this.state.email)

        if(!result4_2.cancelled) {
            this.setState({
                 imageroom4_2: result4_2.uri
             });


        }
    }

    _pickImage4_2 = async () => {
        let result4_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4_2);
        console.log(this.state.email)

        if(!result4_2.cancelled) {
            this.setState({
                 imageroom4_2: result4_2.uri
             });


        }
    }

    _pickImageCamera4_3 = async () => {
        let result4_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4_3);
        console.log(this.state.email)

        if(!result4_3.cancelled) {
            this.setState({
                 imageroom4_3: result4_3.uri
             });


        }
    }

    _pickImage4_3 = async () => {
        let result4_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4_3);
        console.log(this.state.email)

        if(!result4_3.cancelled) {
            this.setState({
                 imageroom4_3: result4_3.uri
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
        console.log(this.state.email)

        if(!result5.cancelled) {
            this.setState({
                 imageroom5: result5.uri
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
        console.log(this.state.email)

        if(!result5.cancelled) {
            this.setState({
                 imageroom5: result5.uri
             });


        }
    }

    _pickImageCamera5_2 = async () => {
        let result5_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5_2);
        console.log(this.state.email)

        if(!result5_2.cancelled) {
            this.setState({
                 imageroom5_2: result5_2.uri
             });


        }
    }

    _pickImage5_2 = async () => {
        let result5_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5_2);
        console.log(this.state.email)

        if(!result5_2.cancelled) {
            this.setState({
                 imageroom5_2: result5_2.uri
             });


        }
    }

    _pickImageCamera5_3 = async () => {
        let result5_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5_3);
        console.log(this.state.email)

        if(!result5_3.cancelled) {
            this.setState({
                 imageroom5_3: result5_3.uri
             });


        }
    }

    _pickImage5_3 = async () => {
        let result5_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5_3);
        console.log(this.state.email)

        if(!result5_3.cancelled) {
            this.setState({
                 imageroom5_3: result5_3.uri
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
        console.log(this.state.email)

        if(!result6.cancelled) {
            this.setState({
                 imageroom6: result6.uri
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
        console.log(this.state.email)

        if(!result6.cancelled) {
            this.setState({
                 imageroom6: result6.uri
             });


        }
    }

    _pickImageCamera6_2 = async () => {
        let result6_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6_2);
        console.log(this.state.email)

        if(!result6_2.cancelled) {
            this.setState({
                 imageroom6_2: result6_2.uri
             });


        }
    }

    _pickImage6_2 = async () => {
        let result6_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6_2);
        console.log(this.state.email)

        if(!result6_2.cancelled) {
            this.setState({
                 imageroom6_2: result6_2.uri
             });


        }
    }

    _pickImageCamera6_3 = async () => {
        let result6_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6_3);
        console.log(this.state.email)

        if(!result6_3.cancelled) {
            this.setState({
                 imageroom6_3: result6_3.uri
             });


        }
    }

    _pickImage6_3 = async () => {
        let result6_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6_3);
        console.log(this.state.email)

        if(!result6_3.cancelled) {
            this.setState({
                 imageroom6_3: result6_3.uri
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
        console.log(this.state.email)

        if(!result7.cancelled) {
            this.setState({
                 imageroom7: result7.uri
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
        console.log(this.state.email)

        if(!result7.cancelled) {
            this.setState({
                 imageroom7: result7.uri
             });


        }
    }

    _pickImageCamera7_2 = async () => {
        let result7_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7_2);
        console.log(this.state.email)

        if(!result7_2.cancelled) {
            this.setState({
                 imageroom7_2: result7_2.uri
             });


        }
    }

    _pickImage7_2 = async () => {
        let result7_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7_2);
        console.log(this.state.email)

        if(!result7_2.cancelled) {
            this.setState({
                 imageroom7_2: result7_2.uri
             });


        }
    }

    _pickImageCamera7_3 = async () => {
        let result7_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7_3);
        console.log(this.state.email)

        if(!result7_3.cancelled) {
            this.setState({
                 imageroom7_3: result7_3.uri
             });


        }
    }

    _pickImage7_3 = async () => {
        let result7_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7_3);
        console.log(this.state.email)

        if(!result7_3.cancelled) {
            this.setState({
                 imageroom7_3: result7_3.uri
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
        console.log(this.state.email)

        if(!result8.cancelled) {
            this.setState({
                 imageroom8: result8.uri
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
        console.log(this.state.email)

        if(!result8.cancelled) {
            this.setState({
                 imageroom8: result8.uri
             });


        }
    }

    _pickImageCamera8_2 = async () => {
        let result8_2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8_2);
        console.log(this.state.email)

        if(!result8_2.cancelled) {
            this.setState({
                 imageroom8_2: result8_2.uri
             });


        }
    }

    _pickImage8_2 = async () => {
        let result8_2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8_2);
        console.log(this.state.email)

        if(!result8_2.cancelled) {
            this.setState({
                 imageroom8_2: result8_2.uri
             });


        }
    }

    _pickImageCamera8_3 = async () => {
        let result8_3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8_3);
        console.log(this.state.email)

        if(!result8_3.cancelled) {
            this.setState({
                 imageroom8_3: result8_3.uri
             });


        }
    }

    _pickImage8_3 = async () => {
        let result8_3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8_3);
        console.log(this.state.email)

        if(!result8_3.cancelled) {
            this.setState({
                 imageroom8_3: result8_3.uri
             });


        }
    }

    //Function call to refresh screen 
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
    }

    //Refresh function
    refresh = async() => {
        if(this.state.connection_status == true) {
            //Get profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, connection_refreshStatus: false, loading : false, id : profile[0].data.id_home, idm : profile[0].data.id_m, type1 : profile[0].data.type1, bed1 : profile[0].data.bed1, date1 : profile[0].data.date1, food1 : profile[0].data.food1, aprox1 : profile[0].data.aprox1, type2 : profile[0].data.type2, bed2 : profile[0].data.bed2, date2 : profile[0].data.date2, food2 : profile[0].data.food2, aprox2 : profile[0].data.aprox2, type3 : profile[0].data.type3, bed3 : profile[0].data.bed3, date3 : profile[0].data.date3, food3 : profile[0].data.food3, aprox3 : profile[0].data.aprox3, type4 : profile[0].data.type4, bed4 : profile[0].data.bed4, date4 : profile[0].data.date4, food4 : profile[0].data.food4, aprox4 : profile[0].data.aprox4, type5 : profile[0].data.type5, bed5 : profile[0].data.bed5, date5 : profile[0].data.date5, food5 : profile[0].data.food5, aprox5 : profile[0].data.aprox5, type6 : profile[0].data.type6, bed6 : profile[0].data.bed6, date6 : profile[0].data.date6, food6 : profile[0].data.food6, aprox6 : profile[0].data.aprox6, type7 : profile[0].data.type7, bed7 : profile[0].data.bed7, date7 : profile[0].data.date7, food7 : profile[0].data.food7, aprox7 : profile[0].data.aprox7, type8 : profile[0].data.type8, bed8 : profile[0].data.bed8, date8 : profile[0].data.date8, food8 : profile[0].data.food8, aprox8 : profile[0].data.aprox8, photo1 : "Yes", photo1_2 : "Yes", photo1_3 : "Yes", photo2 : "Yes", photo2_2 : "Yes", photo2_3 : "Yes", photo3 : "Yes", photo3_2 : "Yes", photo3_3 : "Yes", photo4 : "Yes", photo4_2 : "Yes", photo4_3 : "Yes", photo5 : "Yes", photo5_2 : "Yes", photo5_3 : "Yes", photo6 : "Yes", photo6_2 : "Yes", photo6_3 : "Yes", photo7 : "Yes", photo7_2 : "Yes", photo7_3 : "Yes", photo8 : "Yes", photo8_2 : "Yes", photo8_3 : "Yes", photo0 : "Yes", readyDisplay : true})

            //Function call to get permissions for access to gallery
            this.getPermissionAsync();
        } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }
    }

    //Function to register data to database
    registerbasici = async () => {
        let localUri = this.state.imageroom1;
        if (localUri == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile1() }
        let localUri1_2 = this.state.imageroom1_2;
        if (localUri1_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile1_2() }
        let localUri1_3 = this.state.imageroom1_3;
        if (localUri1_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile1_3() }
        let localUri2 = this.state.imageroom2;
        if (localUri2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile2() }
        let localUri2_2 = this.state.imageroom2_2;
        if (localUri2_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile2_2() }
        let localUri2_3 = this.state.imageroom2_3;
        if (localUri2_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile2_3() }
        let localUri3 = this.state.imageroom3;
        if (localUri3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile3() }
        let localUri3_2 = this.state.imageroom3_2;
        if (localUri3_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile3_2() }
        let localUri3_3 = this.state.imageroom3_3;
        if (localUri3_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile3_3() }
        let localUri4 = this.state.imageroom4;
        if (localUri4 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile4() }
        let localUri4_2 = this.state.imageroom4_2;
        if (localUri4_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile4_2() }
        let localUri4_3 = this.state.imageroom4_3;
        if (localUri4_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile4_3() }
        let localUri5 = this.state.imageroom5;
        if (localUri5 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile5() }
        let localUri5_2 = this.state.imageroom5_2;
        if (localUri5_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile5_2() }
        let localUri5_3 = this.state.imageroom5_3;
        if (localUri5_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile5_3() }
        let localUri6 = this.state.imageroom6;
        if (localUri6 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile6() }
        let localUri6_2 = this.state.imageroom6_2;
        if (localUri6_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile6_2() }
        let localUri6_3 = this.state.imageroom6_3;
        if (localUri6_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile6_3() }
        let localUri7 = this.state.imageroom7;
        if (localUri7 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile7() }
        let localUri7_2 = this.state.imageroom7_2;
        if (localUri7_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile7_2() }
        let localUri7_3 = this.state.imageroom7_3;
        if (localUri7_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile7_3() }
        let localUri8 = this.state.imageroom8;
        if (localUri8 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile8() }
        let localUri8_2 = this.state.imageroom8_2;
        if (localUri8_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile8_2() }
        let localUri8_3 = this.state.imageroom8_3;
        if (localUri8_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else { this.registerfile8_3() }
        console.log(this.state.id,this.state.email, this.state.idm, this.state.type1,this.state.bed1,this.state.date1,this.state.bed1_2,this.state.date1_2,this.state.bed1_3,this.state.date1_3,this.state.food1,this.state.aprox1,this.state.type2,this.state.bed2,this.state.date2,this.state.bed2_2,this.state.date2_2,this.state.bed2_3,this.state.date2_3,this.state.food2,this.state.aprox2,this.state.type3,this.state.bed3,this.state.date3,this.state.bed3_2,this.state.date3_2,this.state.bed3_3,this.state.date3_3,this.state.food3,this.state.aprox3,this.state.type4,this.state.bed4,this.state.date4,this.state.bed4_2,this.state.date4_2,this.state.bed4_3,this.state.date4_3,this.state.food4,this.state.aprox4,this.state.type5,this.state.bed5,this.state.date5,this.state.bed5_2,this.state.date5_2,this.state.bed5_3,this.state.date5_3,this.state.food5,this.state.aprox5,this.state.type6,this.state.bed6,this.state.date6,this.state.bed6_2,this.state.date6_2,this.state.bed6_3,this.state.date6_3,this.state.food6,this.state.aprox6,this.state.type7,this.state.bed7,this.state.date7,this.state.bed7_2,this.state.date7_2,this.state.bed7_3,this.state.date7_3,this.state.food7,this.state.aprox7,this.state.type8,this.state.bed8,this.state.date8,this.state.bed8_2,this.state.date8_2,this.state.bed8_3,this.state.date8_3,this.state.food8,this.state.aprox8,this.state.photo0)
        api.editRoominfo(this.state.id,this.state.email, this.state.idm, this.state.type1,this.state.bed1,this.state.date1,this.state.bed1_2,this.state.date1_2,this.state.bed1_3,this.state.date1_3,this.state.food1,this.state.aprox1,this.state.type2,this.state.bed2,this.state.date2,this.state.bed2_2,this.state.date2_2,this.state.bed2_3,this.state.date2_3,this.state.food2,this.state.aprox2,this.state.type3,this.state.bed3,this.state.date3,this.state.bed3_2,this.state.date3_2,this.state.bed3_3,this.state.date3_3,this.state.food3,this.state.aprox3,this.state.type4,this.state.bed4,this.state.date4,this.state.bed4_2,this.state.date4_2,this.state.bed4_3,this.state.date4_3,this.state.food4,this.state.aprox4,this.state.type5,this.state.bed5,this.state.date5,this.state.bed5_2,this.state.date5_2,this.state.bed5_3,this.state.date5_3,this.state.food5,this.state.aprox5,this.state.type6,this.state.bed6,this.state.date6,this.state.bed6_2,this.state.date6_2,this.state.bed6_3,this.state.date6_3,this.state.food6,this.state.aprox6,this.state.type7,this.state.bed7,this.state.date7,this.state.bed7_2,this.state.date7_2,this.state.bed7_3,this.state.date7_3,this.state.food7,this.state.aprox7,this.state.type8,this.state.bed8,this.state.date8,this.state.bed8_2,this.state.date8_2,this.state.bed8_3,this.state.date8_3,this.state.food8,this.state.aprox8,this.state.photo0)
    }

    //Group of function to update data to database
    registerfile1 = async () => {
        let localUri = this.state.imageroom1;
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo1', { uri: localUri, name: filename, type: type });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo1 = this.state.photo1;
          console.log(this.state.id)

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo1=${photo1}`, {
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
                Alert.alert('Error with room 1 first photo update')
              }
            });
        
    };

    registerfile1_2 = async () => {
        let localUri1_2 = this.state.imageroom1_2;

        if (localUri1_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename1_2 = localUri1_2.split('/').pop();
          let match1_2 = /\.(\w+)$/.exec(filename1_2);
          let type1_2 = match1_2 ? `image/${match1_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo1_2', { uri: localUri1_2, name: filename1_2, type : type1_2 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo1_2 = this.state.photo1_2;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo1_2=${photo1_2}`, {
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
                Alert.alert('Error with room 1 second photo update')
              }
            });
        }
    };

    registerfile1_3 = async () => {
        let localUri1_3 = this.state.imageroom1_3;

        if (localUri1_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
        else {  
          //Files
          let filename1_3 = localUri1_3.split('/').pop();
          let match1_3 = /\.(\w+)$/.exec(filename1_3);
          let type1_3 = match1_3 ? `image/${match1_3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo1_3', { uri: localUri1_3, name: filename1_3, type : type1_3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo1_3 = this.state.photo1_3;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo1_3=${photo1_3}`, {
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
                Alert.alert('Error with room 1 third photo update')
              }
            });
        }
    };

    //ROOM 2
    registerfile2 = async () => {
        let localUri2 = this.state.imageroom2;

        if (localUri2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
        else {  
          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2', { uri: localUri2, name: filename2, type : type2 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo2 = this.state.photo2;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo2=${photo2}`, {
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
                Alert.alert('Error with room 2 first photo update')
              }
            });
        }
    };

    registerfile2_2 = async () => {
        let localUri2_2 = this.state.imageroom2_2;

        if (localUri2_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename2_2 = localUri2_2.split('/').pop();
          let match2_2 = /\.(\w+)$/.exec(filename2_2);
          let type2_2 = match2_2 ? `image/${match2_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2_2', { uri: localUri2_2, name: filename2_2, type : type2_2 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo2_2 = this.state.photo2_2;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo2_2=${photo2_2}`, {
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
                Alert.alert('Error with room 2 second photo update')
              }
            });
        }
    };

    registerfile2_3 = async () => {
        let localUri2_3 = this.state.imageroom2_3;

        if (localUri2_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename2_3 = localUri2_3.split('/').pop();
          let match2_3 = /\.(\w+)$/.exec(filename2_3);
          let type2_3 = match2_3 ? `image/${match2_3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2_3', { uri: localUri2_3, name: filename2_3, type : type2_3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo2_3 = this.state.photo2_3;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo2_3=${photo2_3}`, {
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
                Alert.alert('Error with room 2 third photo update')
              }
            });
        }
    };

    //ROOM 3
    registerfile3 = async () => {
        let localUri3 = this.state.imageroom3;

        if (localUri3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
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

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo3=${photo3}`, {
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
                Alert.alert('Error with room 3 first photo update')
              }
            });
        }
    };

    registerfile3_2 = async () => {
        let localUri3_2 = this.state.imageroom3_2;

        if (localUri3_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename3_2 = localUri3_2.split('/').pop();
          let match3_2 = /\.(\w+)$/.exec(filename3_2);
          let type3_2 = match3_2 ? `image/${match3_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3_2', { uri: localUri3_2, name: filename3_2, type : type3_2 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo3_2 = this.state.photo3_2;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo3_2=${photo3_2}`, {
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
                Alert.alert('Error with room 3 second photo update')
              }
            });
        }
    };

    registerfile3_3 = async () => {
        let localUri3_3 = this.state.imageroom3_3;

        if (localUri3_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename3_3 = localUri3_3.split('/').pop();
          let match3_3 = /\.(\w+)$/.exec(filename3_3);
          let type3_3 = match3_3 ? `image/${match3_3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3_3', { uri: localUri3_3, name: filename3_3, type : type3_3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo3_3 = this.state.photo3_3;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo3_3=${photo3_3}`, {
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
                Alert.alert('Error with room 3 third photo update')
              }
            });
        }
    };

    //ROOM 4
    registerfile4 = async () => {
        let localUri4 = this.state.imageroom4;

        if (localUri4 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
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

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo4=${photo4}`, {
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
                Alert.alert('Error with room 4 first photo update')
              }
            });
        }
    };

    registerfile4_2 = async () => {
        let localUri4_2 = this.state.imageroom4_2;

        if (localUri4_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename4_2 = localUri4_2.split('/').pop();
          let match4_2 = /\.(\w+)$/.exec(filename4_2);
          let type4_2 = match4_2 ? `image/${match4_2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4_2', { uri: localUri4_2, name: filename4_2, type : type4_2 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo4_2 = this.state.photo4_2;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo4_2=${photo4_2}`, {
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
                Alert.alert('Error with room 4 second photo update')
              }
            });
        }
    };

    registerfile4_3 = async () => {
        let localUri4_3 = this.state.imageroom4_3;

        if (localUri4_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
          //Files
          let filename4_3 = localUri4_3.split('/').pop();
          let match4_3 = /\.(\w+)$/.exec(filename4_3);
          let type4_3 = match4_3 ? `image/${match4_3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4_3', { uri: localUri4_3, name: filename4_3, type : type4_3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo4_3 = this.state.photo4_3;

          return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo4_3=${photo4_3}`, {
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
                Alert.alert('Error with room 4 third photo update')
              }
            });
        }
    };

    //ROOM 5
    registerfile5 = async () => {
        let localUri5 = this.state.imageroom5;

        if (localUri5 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
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

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo5=${photo5}`, {
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
                Alert.alert('Error with room 5 first photo update')
            }
            });
        }
    };

    registerfile5_2 = async () => {
        let localUri5_2 = this.state.imageroom5_2;

        if (localUri5_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
        //Files
        let filename5_2 = localUri5_2.split('/').pop();
        let match5_2 = /\.(\w+)$/.exec(filename5_2);
        let type5_2 = match5_2 ? `image/${match5_2[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo5_2', { uri: localUri5_2, name: filename5_2, type : type5_2 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo5_2 = this.state.photo5_2;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo5_2=${photo5_2}`, {
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
                Alert.alert('Error with room 5 second photo update')
            }
            });
        }
    };

    registerfile5_3 = async () => {
        let localUri5_3 = this.state.imageroom5_3;

        if (localUri5_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
        //Files
        let filename5_3 = localUri5_3.split('/').pop();
        let match5_3 = /\.(\w+)$/.exec(filename5_3);
        let type5_3 = match5_3 ? `image/${match5_3[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo5_3', { uri: localUri5_3, name: filename5_3, type : type5_3 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo5_3 = this.state.photo5_3;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo5_3=${photo5_3}`, {
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
                Alert.alert('Error with room 5 third photo update')
            }
            });
        }
    };

    //ROOM 6
    registerfile6 = async () => {
        let localUri6 = this.state.imageroom6;

        if (localUri6 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
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

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo6=${photo6}`, {
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
                Alert.alert('Error with room 6 first photo update')
            }
            });
        }
    };

    registerfile6_2 = async () => {
        let localUri6_2 = this.state.imageroom6_2;

        if (localUri6_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
        //Files
        let filename6_2 = localUri6_2.split('/').pop();
        let match6_2 = /\.(\w+)$/.exec(filename6_2);
        let type6_2 = match6_2 ? `image/${match6_2[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo6_2', { uri: localUri6_2, name: filename6_2, type : type6_2 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo6_2 = this.state.photo6_2;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo6_2=${photo6_2}`, {
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
                Alert.alert('Error with room 6 second photo update')
            }
            });
        }
    };

    registerfile6_3 = async () => {
        let localUri6_3 = this.state.imageroom6_3;

        if (localUri6_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
        else {  
        //Files
        let filename6_3 = localUri6_3.split('/').pop();
        let match6_3 = /\.(\w+)$/.exec(filename6_3);
        let type6_3 = match6_3 ? `image/${match6_3[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo6_3', { uri: localUri6_3, name: filename6_3, type : type6_3 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo6_3 = this.state.photo6_3;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo6_3=${photo6_3}`, {
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
                Alert.alert('Error with room 6 third photo update')
            }
            });
        }
    };

    //ROOM 7
    registerfile7 = async () => {
        let localUri7 = this.state.imageroom7;

        if (localUri7 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
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

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo7=${photo7}`, {
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
                Alert.alert('Error with room 7 first photo update')
            }
            });
        }
    };

    registerfile7_2 = async () => {
        let localUri7_2 = this.state.imageroom7_2;

        if (localUri7_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else {  
        //Files
        let filename7_2 = localUri7_2.split('/').pop();
        let match7_2 = /\.(\w+)$/.exec(filename7_2);
        let type7_2 = match7_2 ? `image/${match7_2[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo7_2', { uri: localUri7_2, name: filename7_2, type : type7_2 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo7_2 = this.state.photo7_2;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo7_2=${photo7_2}`, {
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
                Alert.alert('Error with room 7 second photo update')
            }
            });
        }
    };

    registerfile7_3 = async () => {
        let localUri7_3 = this.state.imageroom7_3;

        if (localUri7_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {  } 
        else {  
        //Files
        let filename7_3 = localUri7_3.split('/').pop();
        let match7_3 = /\.(\w+)$/.exec(filename7_3);
        let type7_3 = match7_3 ? `image/${match7_3[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo7_3', { uri: localUri7_3, name: filename7_3, type : type7_3 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo7_3 = this.state.photo7_3;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo7_3=${photo7_3}`, {
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
                Alert.alert('Error with room 7 third photo update')
            }
            });
        }
    };

    //ROOM 8
    registerfile8 = async () => {
        let localUri8 = this.state.imageroom8;

        if (localUri8 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
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

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo8=${photo8}`, {
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
                Alert.alert('Error with room 8 first photo update')
            }
            });
        }
    };

    registerfile8_2 = async () => {
        let localUri8_2 = this.state.imageroom8_2;

        if (localUri8_2 == require('../assets/img/empty/vacios-homebor-habitacion.png')) { } 
        else {  
        //Files
        let filename8_2 = localUri8_2.split('/').pop();
        let match8_2 = /\.(\w+)$/.exec(filename8_2);
        let type8_2 = match8_2 ? `image/${match8_2[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo8_2', { uri: localUri8_2, name: filename8_2, type : type8_2 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo8_2 = this.state.photo8_2;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo8_2=${photo8_2}`, {
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
                Alert.alert('Error with room 8 second photo update')
            }
            });
        }
    };

    registerfile8_3 = async () => {
        let localUri8_3 = this.state.imageroom8_3;

        if (localUri8_3 == require('../assets/img/empty/vacios-homebor-habitacion.png')) {} 
        else {  
        //Files
        let filename8_3 = localUri8_3.split('/').pop();
        let match8_3 = /\.(\w+)$/.exec(filename8_3);
        let type8_3 = match8_3 ? `image/${match8_3[1]}` : `image`;

        

        let formData = new FormData();
        formData.append('photo8_3', { uri: localUri8_3, name: filename8_3, type : type8_3 });

        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let eMail = this.state.email;
        let id = this.state.id;
        let photo8_3 = this.state.photo8_3;

        return await fetch(`https://homebor.com/editroomapp.php?email=${eMail}&id=${id}&photo8_3=${photo8_3}`, {
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
                Alert.alert('Error with room 8 third photo update')
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

    tryAgainNotConnection = () => {
        this.setState({clockrun : true})
        this.Clock()
    }

    componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;
    }




    render() {

        //Variables for images
        let { imageroom1 } = this.state; 
        let { imageroom1_2 } = this.state;
        let { imageroom1_3 } = this.state;
        let { imageroom2 } = this.state; 
        let { imageroom2_2 } = this.state;
        let { imageroom2_3 } = this.state;
        let { imageroom3 } = this.state; 
        let { imageroom3_2 } = this.state;
        let { imageroom3_3 } = this.state;
        let { imageroom4 } = this.state; 
        let { imageroom4_2 } = this.state;
        let { imageroom4_3 } = this.state;
        let { imageroom5 } = this.state; 
        let { imageroom5_2 } = this.state;
        let { imageroom5_3 } = this.state;
        let { imageroom6 } = this.state; 
        let { imageroom6_2 } = this.state;
        let { imageroom6_3 } = this.state;
        let { imageroom7 } = this.state; 
        let { imageroom7_2 } = this.state;
        let { imageroom7_3 } = this.state;
        let { imageroom8 } = this.state; 
        let { imageroom8_2 } = this.state;
        let { imageroom8_3 } = this.state;

        return (
            <NativeBaseProvider>
                <StatusBar style="light" translucent={true} />
                <View>
                    {this.state.readyDisplay == false && (
                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{  borderColor: "coolGray.200"}}>
                                    <View style={globalStyles.skeletonMarginProfileText}>
                                        <HStack space="2" alignItems="center">
                                            <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                                        </HStack>
                                    </View>
                                    <HStack space="2">
                                        <Skeleton h="90" w="30%" />
                                        <Skeleton h="90" w="30%" />
                                        <Skeleton h="90" w="30%" />
                                    </HStack>
                                    <HStack space="2">
                                        <Skeleton.Text px="5" />
                                    </HStack>
                                        <Skeleton.Text px="5" />
                                        <Skeleton.Text px="5" my="4" />
                                        <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                                </VStack>
                            </Center>
        
                            <Center style={globalStyles.skeletonMarginTop}>
                                <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                            </Center>
                        </View>
                    )}

                    {this.state.readyDisplay == true && (
                        <View>
                        {this.state.connection_refreshStatus != false && (
                            <View>
                            {this.state.refreshing == true && (
                                <View style={globalStyles.spinnerRefreshInternet}>
                                <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
                                </View>
                            )}

                            <Slide in={!this.state.clockrun ? false : true} placement="top">
                                {this.state.connection_status ? 
                                <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
                                    <VStack space={2} flexShrink={1} w="100%">
                                    <HStack flexShrink={1} space={2}  justifyContent="center">
                                        <Text color="esmerald.600" fontWeight="medium">You are connected</Text>
                                    </HStack>
                                    </VStack>
                                </AlertNativeBase>
                                :
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
                                }
                            </Slide>

                            <View style={globalStyles.WelcomeImageMargin}>
                                <Image 
                                resizeMode="cover"
                                source={require('../assets/img/empty/vacios-homebor-antena.png')}
                                style={globalStyles.imageNotInternet}
                                />
                            </View>

                            <View style={globalStyles.WelcomeTextandBoton}>
                                <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                                <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                            </View>

                            {this.state.connection_status ?
                                <View>
                                <Text onPress={this.onRefresh} style={globalStyles.createaccount}> Try Again </Text>
                                </View>
                                :
                                <View>
                                <Text onPress={this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                                </View>
                            }
                            </View>
                        )}
                        </View>
                    )}

                    {this.state.readyDisplay == true && (
                        <View>
                        {this.state.connection_refreshStatus != false && (
                            <View>
                            {this.state.refreshing == true && (
                                <View style={globalStyles.spinnerRefreshInternet}>
                                    <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
                                </View>
                            )}

                            <Slide in={!this.state.clockrun ? false : true} placement="top">
                                {this.state.connection_status ?
                                <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
                                    <VStack space={2} flexShrink={1} w="100%">
                                    <HStack flexShrink={1} space={2}  justifyContent="center">
                                        <Text color="emerald.600" fontWeight="medium">You are connected</Text>
                                    </HStack>
                                    </VStack>
                                </AlertNativeBase>
                                :
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
                                }
                            </Slide>

                            <View style={globalStyles.WelcomeImageMargin}>
                                <Image 
                                resizeMode="cover"
                                source={require('../assets/img/empty/vacios-homebor-antena.png')}
                                style={globalStyles.imageNotInternet} />
                            </View>

                            <View style={globalStyles.WelcomeTextandBoton}>
                                <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                                <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                            </View>

                            {this.state.connection_status ?
                                <View>
                                    <Text onPress={this.onRefresh} style={globalStyles.createaccount}> Try Again </Text>
                                </View>
                            : 
                                <View>
                                    <Text onPress={this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                                </View>
                            }
                            </View>
                        )}

                        {this.state.connection_refreshStatus == false && (
                            <View style={globalStyles.container}>
                                <View>
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
                                            <View>
                                                <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                                                    <View style={ globalStyles.contenido }>
                                                        {/*ROOM 1*/}
                                                        <View style={globalStyles.show}>
                                                            <Card>
                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 1</Heading>
                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit} showsHorizontalScrollIndicator={false}>
                                                                    <Card>
                                                                        <TouchableOpacity onPress={()=>this._Alertroom1()}>

                                                                                {imageroom1 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                item.data.proom1 == "NULL" ?
                                                                                <Image source={imageroom1}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={{uri: `http://homebor.com/${item.data.proom1}`}}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={imageroom1}
                                                                                style={globalStyles.photoEditRoom} />}
                                                        
                                                                        </TouchableOpacity>
                                                                    </Card>
                                                                    <Card>
                                                                        <TouchableOpacity onPress={()=>this._Alertroom1_2()}>

                                                                            {imageroom1_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                            item.data.proom1_2 == "NULL" ?
                                                                            <Image source={imageroom1_2}
                                                                            style={globalStyles.photoEditRoom} />
                                                                            :
                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom1_2}`}}
                                                                            style={globalStyles.photoEditRoom} />
                                                                            :
                                                                            <Image source={imageroom1_2}
                                                                            style={globalStyles.photoEditRoom} />}
                                                                        
                                                                        </TouchableOpacity>
                                                                    </Card>
                                                                    <Card>
                                                                        <TouchableOpacity onPress={()=>this._Alertroom1_3()}>
                                                
                                                                                {imageroom1_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                item.data.proom1_3 == "NULL" ?
                                                                                <Image source={imageroom1_3}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={{uri: `http://homebor.com/${item.data.proom1_3}`}}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={imageroom1_3}
                                                                                style={globalStyles.photoEditRoom} />}

                                                                        </TouchableOpacity>
                                                                    </Card>
                                                                </ScrollView>

                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                    <Stack alignItems="center" width="100%">
                                                                        <HStack alignItems="center">
                                                                            <Center size="16" width="10%">
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.tabicon}
                                                                                />
                                                                            </Center>
                                                                            <VStack width="55%">
                                                                                <View>
                                                                                    <Picker
                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                        selectedValue={this.state.type1 == 'NULL' ? "Select"  : this.state.type1}
                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                        onValueChange={(type1) => this.setState({type1})}>
                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                    </Picker>
                                                                                </View>  
                                                                            </VStack>
                                                                            <Center size="16" width="10%">
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.tabicon}
                                                                                />
                                                                            </Center>
                                                                            <VStack width="35%">
                                                                                <Picker
                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                    selectedValue={this.state.food1 == 'NULL' ? "Select"  : this.state.food1}
                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                    onValueChange={(food1) => this.setState({food1})}>
                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                        <Picker.Item label="No" value="No" />
                                                                                </Picker>
                                                                            </VStack>
                                                                        </HStack>
                                                                    </Stack>

                                                                    {this.state.type1 != 'NULL' && (
                                                                        <View>
                                                                            <Center>
                                                                                <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                            </Center>

                                                                            <Stack alignItems="center">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.date1 == 'NULL' ? "Select"  : this.state.date1}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                onValueChange={(date1) => this.setState({date1})}>
                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                    <Picker.Item label="Available" value="Available" /> 
                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.bed1 == 'NULL' ? "Select"  : this.state.bed1}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(bed1) => this.setState({bed1})}>
                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type1 == 'Share' && (
                                                                                <View>
                                                                                    {/*Bed 1_2 */}
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date1_2 == 'NULL' ? "Select"  : this.state.date1_2}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date1_2) => this.setState({date1_2})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed1_2 == 'NULL' ? "Select"  : this.state.bed1_2}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed1_2) => this.setState({bed1_2})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.bed1_3 == 'NULL' && this.state.date1_3 == 'NULL' ? 
                                                                                        <View>
                                                                                            <Center>
                                                                                                <Collapse isExpanded={this.state.expandedbed} onToggle={(isExpanded)=>this.setState({expandedbed: isExpanded})}>
                                                                                                    <CollapseHeader>
                                                                                                        <View>
                                                                                                            { this.state.expandedbed === false ?
                                                                                                            <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                            <View style={globalStyles.buttonroom}>
                                                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                </Text>
                                                                                                            </View>
                                                                                                        </TouchableOpacity>
                                                                                                        : 
                                                                                                        <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                            <View style={globalStyles.buttonroom}>
                                                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                </Text>
                                                                                                            </View>
                                                                                                        </TouchableOpacity>
                                                                                                            }
                                                                                                        </View>
                                                                                                    </CollapseHeader>
                                                                                                    <CollapseBody>
                                                                                                        {/*Bed 1_3 */}
                                                                                                        <View width="95%">
                                                                                                            <Center>
                                                                                                                <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                            </Center>

                                                                                                            <Stack alignItems="center" ml="5%">
                                                                                                                <HStack alignItems="center">
                                                                                                                    <Center size="16" width="10%">
                                                                                                                        <Image
                                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                            resizeMode="contain"
                                                                                                                            style={globalStyles.tabicon}
                                                                                                                        />
                                                                                                                    </Center>
                                                                                                                    <VStack width="55%">
                                                                                                                        <View>
                                                                                                                            <Picker
                                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                                selectedValue={this.state.date1_3 == 'NULL' ? "Select"  : this.state.date1_3}
                                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                onValueChange={(date1_3) => this.setState({date1_3})}>
                                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                                            </Picker>
                                                                                                                        </View>  
                                                                                                                    </VStack>
                                                                                                                    <Center size="16" width="10%">
                                                                                                                        <Image
                                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                            resizeMode="contain"
                                                                                                                            style={globalStyles.tabicon}
                                                                                                                        />
                                                                                                                    </Center>
                                                                                                                    <VStack width="35%">
                                                                                                                        <Picker
                                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                                            selectedValue={this.state.bed1_3 == 'NULL' ? "Select"  : this.state.bed1_3}
                                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                            onValueChange={(bed1_3) => this.setState({bed1_3})}>
                                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                        </Picker>
                                                                                                                    </VStack>
                                                                                                                </HStack>
                                                                                                            </Stack>
                                                                                                        </View>
                                                                                                    
                                                                                                    </CollapseBody>
                                                                                                </Collapse>
                                                                                            </Center>
                                                                                        </View>
                                                                                    :
                                                                                        <View>
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date1_3 == 'NULL' ? "Select"  : this.state.date1_3}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date1_3) => this.setState({date1_3})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed1_3 == 'NULL' ? "Select"  : this.state.bed1_3}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed1_3) => this.setState({bed1_3})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        </View>
                                                                                    }

                                                                                    
                                                                                </View>
                                                                                
                                                                            )}

                                                                            
                                                                        </View>
                                                                    )}
                                                                </View>
                                                                
                                                                <Center>
                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                </Center>

                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                    <InputGroup
                                                                        w={{
                                                                        base: "80%",
                                                                        md: "285",
                                                                        }}
                                                                    >
                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                        <Input
                                                                        w={{
                                                                            base: "100%",
                                                                            md: "100%",
                                                                        }}
                                                                        defaultValue={item.data.aprox1 == 'NULL' ? '' : item.data.aprox1}
                                                                        onChangeText={ (aprox1) => this.setState({aprox1}) }
                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                        />
                                                                    
                                                                    </InputGroup>
                                                                </VStack>


                                                            </Card>
                                                        </View>

                                                        {/*ROOM 2*/} 
                                                        {this.state.type1 != 'NULL' || this.state.bed1 != 'NULL' || this.state.date1 != 'NULL' || this.state.food1 != 'NULL' || this.state.aprox1 != '0' ?
                                                            this.state.type2 == 'NULL' && this.state.bed2 == 'NULL' && this.state.date2 == 'NULL' && this.state.food2 == 'NULL' && this.state.aprox2 && '0' ?
                                                            <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded2} onToggle={(isExpanded)=>this.setState({expanded2: isExpanded})}>
                                                                <CollapseHeader>
                                                                    <View>
                                                                        { this.state.expanded2 === false ?
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                        <View style={globalStyles.buttonroom}>
                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                            </Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    : 
                                                                    <TouchableOpacity style={globalStyles.buttonroom} >
                                                                        <View style={globalStyles.buttonroom}>
                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                            </Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                        }
                                                                    </View>
                                                                </CollapseHeader>
                                                                <CollapseBody>
                                                                    <View style={globalStyles.show}>
                                                                        <Card>
                                                                            <Heading size='xl' style={ globalStyles.titleRooms}>Room 2</Heading>
                                                                            <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                            <ScrollView horizontal={true} style={ globalStyles.scrollviewedit} showsHorizontalScrollIndicator={false}>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom2()}>
                                            
                                                                                        {imageroom2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom2 == "NULL" ?
                                                                                        <Image source={imageroom2}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom2}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom2}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom2_2()}>
                                                                    
                                                                                        {imageroom2_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom2_2 == "NULL" ?
                                                                                        <Image source={imageroom2_2}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom2_2}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom2_2}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom2_3()}>
                                                                        
                                                                                            {imageroom2_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom2_3 == "NULL" ?
                                                                                            <Image source={imageroom2_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom2_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom2_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                            </ScrollView>


                                                                            <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                <Stack alignItems="center" width="100%">
                                                                                    <HStack alignItems="center">
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="55%">
                                                                                            <View>
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.type2 == 'NULL' ? "Select"  : this.state.type2}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                    onValueChange={(type2) => this.setState({type2})}>
                                                                                                        <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                        <Picker.Item label="Single" value="Single" /> 
                                                                                                        <Picker.Item label="Executive" value="Executive" />
                                                                                                        <Picker.Item label="Share" value="Share" />
                                                                                                </Picker>
                                                                                            </View>  
                                                                                        </VStack>
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="35%">
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.food2 == 'NULL' ? "Select"  : this.state.food2}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                onValueChange={(food2) => this.setState({food2})}>
                                                                                                    <Picker.Item label="-Meals-" value="NULL" />
                                                                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                                                                    <Picker.Item label="No" value="No" />
                                                                                            </Picker>
                                                                                        </VStack>
                                                                                    </HStack>
                                                                                </Stack>
                                                                            </View>
                                                                            
                                                                            <Center>
                                                                                <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                            </Center>

                                                                            <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                <InputGroup
                                                                                    w={{
                                                                                    base: "80%",
                                                                                    md: "285",
                                                                                    }}
                                                                                >
                                                                                    <InputLeftAddon children={"CAD$:"} />
                                                                                    <Input
                                                                                    w={{
                                                                                        base: "100%",
                                                                                        md: "100%",
                                                                                    }}
                                                                                    defaultValue={item.data.aprox2 == 'NULL' ? '' : item.data.aprox2}
                                                                                    onChangeText={ (aprox2) => this.setState({aprox2}) }
                                                                                    style={globalStyles.EditRoomInputWeeklyBar}
                                                                                    />
                                                                                
                                                                                </InputGroup>
                                                                            </VStack>


                                                                        </Card>
                                                                    </View>
                                                                </CollapseBody>
                                                            </Collapse>

                                                            :
                                                                <View style={globalStyles.show}>
                                                                    <Card>
                                                                        <Heading size='xl' style={ globalStyles.titleRooms}>Room 2</Heading>
                                                                        <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                        <ScrollView horizontal={true} style={ globalStyles.scrollviewedit} showsHorizontalScrollIndicator={false}>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom2()}>
                                        
                                                                                    {imageroom2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom2 == "NULL" ?
                                                                                    <Image source={imageroom2}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom2}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom2}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom2_2()}>
                                                                
                                                                                    {imageroom2_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom2_2 == "NULL" ?
                                                                                    <Image source={imageroom2_2}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom2_2}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom2_2}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom2_3()}>
                                                                    
                                                                                        {imageroom2_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom2_3 == "NULL" ?
                                                                                        <Image source={imageroom2_3}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom2_3}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom2_3}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                        </ScrollView>


                                                                        <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                            <Stack alignItems="center" width="100%">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.type2 == 'NULL' ? "Select"  : this.state.type2}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                onValueChange={(type2) => this.setState({type2})}>
                                                                                                    <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                    <Picker.Item label="Single" value="Single" /> 
                                                                                                    <Picker.Item label="Executive" value="Executive" />
                                                                                                    <Picker.Item label="Share" value="Share" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.food2 == 'NULL' ? "Select"  : this.state.food2}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(food2) => this.setState({food2})}>
                                                                                                <Picker.Item label="-Meals-" value="NULL" />
                                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                                <Picker.Item label="No" value="No" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type2 != 'NULL' && (
                                                                                <View>
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date2 == 'NULL' ? "Select"  : this.state.date2}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date2) => this.setState({date2})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed2 == 'NULL' ? "Select"  : this.state.bed2}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed2) => this.setState({bed2})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.type2 == 'Share' && (
                                                                                        <View>
                                                                                            {/*Bed 2_2 */}
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date2_2 == 'NULL' ? "Select"  : this.state.date2_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date2_2) => this.setState({date2_2})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed2_2 == 'NULL' ? "Select"  : this.state.bed2_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed2_2) => this.setState({bed2_2})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>

                                                                                            {this.state.bed2_3 == 'NULL' && this.state.date2_3 == 'NULL' ? 
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Collapse isExpanded={this.state.expanded2bed} onToggle={(isExpanded)=>this.setState({expanded2bed: isExpanded})}>
                                                                                                            <CollapseHeader>
                                                                                                                <View>
                                                                                                                    { this.state.expanded2bed === false ?
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                : 
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                    }
                                                                                                                </View>
                                                                                                            </CollapseHeader>
                                                                                                            <CollapseBody>
                                                                                                                {/*Bed 2_3 */}
                                                                                                                <View width="95%">
                                                                                                                    <Center>
                                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                    </Center>

                                                                                                                    <Stack alignItems="center" ml="5%">
                                                                                                                        <HStack alignItems="center">
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="55%">
                                                                                                                                <View>
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.date2_3 == 'NULL' ? "Select"  : this.state.date2_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(date2_3) => this.setState({date2_3})}>
                                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                                    </Picker>
                                                                                                                                </View>  
                                                                                                                            </VStack>
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="35%">
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.bed2_3 == 'NULL' ? "Select"  : this.state.bed2_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(bed2_3) => this.setState({bed2_3})}>
                                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                </Picker>
                                                                                                                            </VStack>
                                                                                                                        </HStack>
                                                                                                                    </Stack>
                                                                                                                </View>
                                                                                                            
                                                                                                            </CollapseBody>
                                                                                                        </Collapse>
                                                                                                    </Center>
                                                                                                </View>
                                                                                            :
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                    </Center>

                                                                                                    <Stack alignItems="center">
                                                                                                        <HStack alignItems="center">
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="55%">
                                                                                                                <View>
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.date2_3 == 'NULL' ? "Select"  : this.state.date2_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(date2_3) => this.setState({date2_3})}>
                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                    </Picker>
                                                                                                                </View>  
                                                                                                            </VStack>
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="35%">
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.bed2_3 == 'NULL' ? "Select"  : this.state.bed2_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(bed2_3) => this.setState({bed2_3})}>
                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                </Picker>
                                                                                                            </VStack>
                                                                                                        </HStack>
                                                                                                    </Stack>
                                                                                                </View>
                                                                                            }

                                                                                            
                                                                                        </View>
                                                                                        
                                                                                    )}

                                                                                    
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                        
                                                                        <Center>
                                                                            <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                        </Center>

                                                                        <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                            <InputGroup
                                                                                w={{
                                                                                base: "80%",
                                                                                md: "285",
                                                                                }}
                                                                            >
                                                                                <InputLeftAddon children={"CAD$:"} />
                                                                                <Input
                                                                                w={{
                                                                                    base: "100%",
                                                                                    md: "100%",
                                                                                }}
                                                                                defaultValue={item.data.aprox2 == 'NULL' ? '' : item.data.aprox2}
                                                                                onChangeText={ (aprox2) => this.setState({aprox2}) }
                                                                                style={globalStyles.EditRoomInputWeeklyBar}
                                                                                />
                                                                            
                                                                            </InputGroup>
                                                                        </VStack>


                                                                    </Card>
                                                                </View>
                                                            :
                                                                <Text style={ globalStyles.hideContents}></Text>
                                                        }

                                                        {this.state.type2 != 'NULL' || this.state.bed2 != 'NULL' || this.state.date2 != 'NULL' || this.state.food2 != 'NULL' || this.state.aprox2 != '0' ?
                                                            this.state.type3 == 'NULL' && this.state.bed3 == 'NULL' && this.state.date3 == 'NULL' && this.state.food3 == 'NULL' && this.state.aprox3 && '0' ?
                                                            <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded3} onToggle={(isExpanded)=>this.setState({expanded3: isExpanded})}>
                                                                <CollapseHeader>
                                                                    <View>
                                                                        { this.state.expanded3 === false ?
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                        <View style={globalStyles.buttonroom}>
                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                            </Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    : 
                                                                    <TouchableOpacity style={globalStyles.buttonroom} >
                                                                        <View style={globalStyles.buttonroom}>
                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                            </Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                        }
                                                                    </View>
                                                                </CollapseHeader>
                                                                <CollapseBody>
                                                                    <View style={globalStyles.show}>
                                                                        <Card>
                                                                            <Heading size='xl' style={ globalStyles.titleRooms}>Room 3</Heading>
                                                                            <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                            <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3()}>
                                                                    
                                                                                        {imageroom3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3 == "NULL" ?
                                                                                        <Image source={imageroom3}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3_2()}>
                                                                    
                                                                                        {imageroom3_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3_2 == "NULL" ?
                                                                                        <Image source={imageroom3_2}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3_2}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3_2}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3_3()}>
                                                                    
                                                                                        {imageroom3_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3_3 == "NULL" ?
                                                                                        <Image source={imageroom3_3}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3_3}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3_3}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                            </ScrollView>


                                                                            <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                <Stack alignItems="center" width="100%">
                                                                                    <HStack alignItems="center">
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="55%">
                                                                                            <View>
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.type3 == 'NULL' ? "Select"  : this.state.type3}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                    onValueChange={(type3) => this.setState({type3})}>
                                                                                                        <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                        <Picker.Item label="Single" value="Single" /> 
                                                                                                        <Picker.Item label="Executive" value="Executive" />
                                                                                                        <Picker.Item label="Share" value="Share" />
                                                                                                </Picker>
                                                                                            </View>  
                                                                                        </VStack>
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="35%">
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.food3 == 'NULL' ? "Select"  : this.state.food3}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                onValueChange={(food3) => this.setState({food3})}>
                                                                                                    <Picker.Item label="-Meals-" value="NULL" />
                                                                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                                                                    <Picker.Item label="No" value="No" />
                                                                                            </Picker>
                                                                                        </VStack>
                                                                                    </HStack>
                                                                                </Stack>
                                                                            </View>
                                                                            
                                                                            <Center>
                                                                                <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                            </Center>

                                                                            <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                <InputGroup
                                                                                    w={{
                                                                                    base: "80%",
                                                                                    md: "285",
                                                                                    }}
                                                                                >
                                                                                    <InputLeftAddon children={"CAD$:"} />
                                                                                    <Input
                                                                                    w={{
                                                                                        base: "100%",
                                                                                        md: "100%",
                                                                                    }}
                                                                                    defaultValue={item.data.aprox3 == 'NULL' ? '' : item.data.aprox3}
                                                                                    onChangeText={ (aprox3) => this.setState({aprox3}) }
                                                                                    style={globalStyles.EditRoomInputWeeklyBar}
                                                                                    />
                                                                                
                                                                                </InputGroup>
                                                                            </VStack>


                                                                        </Card>
                                                                    </View>
                                                                </CollapseBody>
                                                            </Collapse>

                                                            :
                                                                <View style={globalStyles.show}>
                                                                    <Card>
                                                                        <Heading size='xl' style={ globalStyles.titleRooms}>Room 3</Heading>
                                                                        <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                        <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3()}>
                                                                    
                                                                                        {imageroom3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3 == "NULL" ?
                                                                                        <Image source={imageroom3}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3_2()}>
                                                                    
                                                                                        {imageroom3_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3_2 == "NULL" ?
                                                                                        <Image source={imageroom3_2}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3_2}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3_2}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                                <Card>
                                                                                    <TouchableOpacity onPress={()=>this._Alertroom3_3()}>
                                                                    
                                                                                        {imageroom3_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                        item.data.proom3_3 == "NULL" ?
                                                                                        <Image source={imageroom3_3}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={{uri: `http://homebor.com/${item.data.proom3_3}`}}
                                                                                        style={globalStyles.photoEditRoom} />
                                                                                        :
                                                                                        <Image source={imageroom3_3}
                                                                                        style={globalStyles.photoEditRoom} />}
                                                                                    </TouchableOpacity>
                                                                                </Card>
                                                                            </ScrollView>


                                                                        <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                            <Stack alignItems="center" width="100%">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.type3 == 'NULL' ? "Select"  : this.state.type3}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                onValueChange={(type3) => this.setState({type3})}>
                                                                                                    <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                    <Picker.Item label="Single" value="Single" /> 
                                                                                                    <Picker.Item label="Executive" value="Executive" />
                                                                                                    <Picker.Item label="Share" value="Share" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.food3 == 'NULL' ? "Select"  : this.state.food3}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(food3) => this.setState({food3})}>
                                                                                                <Picker.Item label="-Meals-" value="NULL" />
                                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                                <Picker.Item label="No" value="No" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type3 != 'NULL' && (
                                                                                <View>
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date3 == 'NULL' ? "Select"  : this.state.date3}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date3) => this.setState({date3})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed3 == 'NULL' ? "Select"  : this.state.bed3}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed3) => this.setState({bed3})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.type3 == 'Share' && (
                                                                                        <View>
                                                                                            {/*Bed 3_2 */}
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date3_2 == 'NULL' ? "Select"  : this.state.date3_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date3_2) => this.setState({date3_2})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed3_2 == 'NULL' ? "Select"  : this.state.bed3_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed3_2) => this.setState({bed3_2})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>

                                                                                            {this.state.bed3_3 == 'NULL' && this.state.date3_3 == 'NULL' ? 
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Collapse isExpanded={this.state.expanded3bed} onToggle={(isExpanded)=>this.setState({expanded3bed: isExpanded})}>
                                                                                                            <CollapseHeader>
                                                                                                                <View>
                                                                                                                    { this.state.expanded3bed === false ?
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                : 
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                    }
                                                                                                                </View>
                                                                                                            </CollapseHeader>
                                                                                                            <CollapseBody>
                                                                                                                {/*Bed 3_3 */}
                                                                                                                <View width="95%">
                                                                                                                    <Center>
                                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                    </Center>

                                                                                                                    <Stack alignItems="center" ml="5%">
                                                                                                                        <HStack alignItems="center">
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="55%">
                                                                                                                                <View>
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.date3_3 == 'NULL' ? "Select"  : this.state.date3_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(date3_3) => this.setState({date3_3})}>
                                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                                    </Picker>
                                                                                                                                </View>  
                                                                                                                            </VStack>
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="35%">
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.bed3_3 == 'NULL' ? "Select"  : this.state.bed3_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(bed3_3) => this.setState({bed3_3})}>
                                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                </Picker>
                                                                                                                            </VStack>
                                                                                                                        </HStack>
                                                                                                                    </Stack>
                                                                                                                </View>
                                                                                                            
                                                                                                            </CollapseBody>
                                                                                                        </Collapse>
                                                                                                    </Center>
                                                                                                </View>
                                                                                            :
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                    </Center>

                                                                                                    <Stack alignItems="center">
                                                                                                        <HStack alignItems="center">
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="55%">
                                                                                                                <View>
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.date3_3 == 'NULL' ? "Select"  : this.state.date3_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(date3_3) => this.setState({date3_3})}>
                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                    </Picker>
                                                                                                                </View>  
                                                                                                            </VStack>
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="35%">
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.bed3_3 == 'NULL' ? "Select"  : this.state.bed3_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(bed3_3) => this.setState({bed3_3})}>
                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                </Picker>
                                                                                                            </VStack>
                                                                                                        </HStack>
                                                                                                    </Stack>
                                                                                                </View>
                                                                                            }

                                                                                            
                                                                                        </View>
                                                                                        
                                                                                    )}

                                                                                    
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                        
                                                                        <Center>
                                                                            <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                        </Center>

                                                                        <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                            <InputGroup
                                                                                w={{
                                                                                base: "80%",
                                                                                md: "285",
                                                                                }}
                                                                            >
                                                                                <InputLeftAddon children={"CAD$:"} />
                                                                                <Input
                                                                                w={{
                                                                                    base: "100%",
                                                                                    md: "100%",
                                                                                }}
                                                                                defaultValue={item.data.aprox3 == 'NULL' ? '' : item.data.aprox3}
                                                                                onChangeText={ (aprox3) => this.setState({aprox3}) }
                                                                                style={globalStyles.EditRoomInputWeeklyBar}
                                                                                />
                                                                            
                                                                            </InputGroup>
                                                                        </VStack>


                                                                    </Card>
                                                                </View>
                                                            :
                                                                <Text style={ globalStyles.hideContents}></Text>
                                                        }

                                                        {/*ROOM 4*/}
                                                        {this.state.type3 != 'NULL' || this.state.bed3 != 'NULL' || this.state.date3 != 'NULL' || this.state.food3 != 'NULL' || this.state.aprox3 != '0' ?
                                                            this.state.type4 == 'NULL' && this.state.bed4 == 'NULL' && this.state.date4 == 'NULL' && this.state.food4 == 'NULL' && this.state.aprox4 && '0' ?
                                                                <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded4} onToggle={(isExpanded)=>this.setState({expanded4: isExpanded})}>
                                                                    <CollapseHeader>
                                                                        <View>
                                                                            { this.state.expanded4 === false ?
                                                                            <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        : 
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                            }
                                                                        </View>
                                                                    </CollapseHeader>
                                                                    <CollapseBody>
                                                                        <View style={globalStyles.show}>
                                                                            <Card>
                                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 4</Heading>
                                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom4()}>
                                            
                                                                                            {imageroom4 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom4 == "NULL" ?
                                                                                            <Image source={imageroom4}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom4}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom4}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom4_2()}>
                                                                        
                                                                                            {imageroom4_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom4_2 == "NULL" ?
                                                                                            <Image source={imageroom4_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom4_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom4_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom4_3()}>
                                                                        
                                                                                            {imageroom4_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom4_3 == "NULL" ?
                                                                                            <Image source={imageroom4_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom4_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom4_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>


                                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                    <Stack alignItems="center" width="100%">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.type4 == 'NULL' ? "Select"  : this.state.type4}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                        onValueChange={(type4) => this.setState({type4})}>
                                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.food4 == 'NULL' ? "Select"  : this.state.food4}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(food4) => this.setState({food4})}>
                                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                                        <Picker.Item label="No" value="No" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                </View>
                                                                            
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                                </Center>

                                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                    <InputGroup
                                                                                        w={{
                                                                                        base: "80%",
                                                                                        md: "285",
                                                                                        }}
                                                                                    >
                                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                                        <Input
                                                                                        w={{
                                                                                            base: "100%",
                                                                                            md: "100%",
                                                                                        }}
                                                                                        defaultValue={item.data.aprox4 == 'NULL' ? '' : item.data.aprox4}
                                                                                        onChangeText={ (aprox4) => this.setState({aprox4}) }
                                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                                        />
                                                                                    
                                                                                    </InputGroup>
                                                                                </VStack>


                                                                        </Card>
                                                                    </View>
                                                                    
                                                                    </CollapseBody>
                                                                </Collapse>
                                                            :

                                                                <View style={globalStyles.show}>
                                                                    <Card>
                                                                        <Heading size='xl' style={ globalStyles.titleRooms}>Room 4</Heading>
                                                                        <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                        <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom4()}>
                                        
                                                                                    {imageroom4 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom4 == "NULL" ?
                                                                                    <Image source={imageroom4}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom4}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom4}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom4_2()}>
                                                                
                                                                                    {imageroom4_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom4_2 == "NULL" ?
                                                                                    <Image source={imageroom4_2}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom4_2}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom4_2}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom4_3()}>
                                                                
                                                                                    {imageroom4_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom4_3 == "NULL" ?
                                                                                    <Image source={imageroom4_3}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom4_3}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom4_3}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                        </ScrollView>


                                                                        <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                            <Stack alignItems="center" width="100%">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.type4 == 'NULL' ? "Select"  : this.state.type4}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                onValueChange={(type4) => this.setState({type4})}>
                                                                                                    <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                    <Picker.Item label="Single" value="Single" /> 
                                                                                                    <Picker.Item label="Executive" value="Executive" />
                                                                                                    <Picker.Item label="Share" value="Share" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.food4 == 'NULL' ? "Select"  : this.state.food4}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(food4) => this.setState({food4})}>
                                                                                                <Picker.Item label="-Meals-" value="NULL" />
                                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                                <Picker.Item label="No" value="No" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type4 != 'NULL' && (
                                                                                <View>
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date4 == 'NULL' ? "Select"  : this.state.date4}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date4) => this.setState({date4})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed4 == 'NULL' ? "Select"  : this.state.bed4}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed4) => this.setState({bed4})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.type4 == 'Share' && (
                                                                                        <View>
                                                                                            {/*Bed 4_2 */}
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date4_2 == 'NULL' ? "Select"  : this.state.date4_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date4_2) => this.setState({date4_2})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed4_2 == 'NULL' ? "Select"  : this.state.bed4_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed4_2) => this.setState({bed4_2})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>

                                                                                            {this.state.bed4_3 == 'NULL' && this.state.date4_3 == 'NULL' ? 
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Collapse isExpanded={this.state.expanded4bed} onToggle={(isExpanded)=>this.setState({expanded4bed: isExpanded})}>
                                                                                                            <CollapseHeader>
                                                                                                                <View>
                                                                                                                    { this.state.expanded4bed === false ?
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                : 
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                    }
                                                                                                                </View>
                                                                                                            </CollapseHeader>
                                                                                                            <CollapseBody>
                                                                                                                {/*Bed 4_3 */}
                                                                                                                <View width="95%">
                                                                                                                    <Center>
                                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                    </Center>

                                                                                                                    <Stack alignItems="center" ml="5%">
                                                                                                                        <HStack alignItems="center">
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="55%">
                                                                                                                                <View>
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.date4_3 == 'NULL' ? "Select"  : this.state.date4_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(date4_3) => this.setState({date4_3})}>
                                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                                    </Picker>
                                                                                                                                </View>  
                                                                                                                            </VStack>
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="35%">
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.bed4_3 == 'NULL' ? "Select"  : this.state.bed4_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(bed4_3) => this.setState({bed4_3})}>
                                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                </Picker>
                                                                                                                            </VStack>
                                                                                                                        </HStack>
                                                                                                                    </Stack>
                                                                                                                </View>
                                                                                                            
                                                                                                            </CollapseBody>
                                                                                                        </Collapse>
                                                                                                    </Center>
                                                                                                </View>
                                                                                            :
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                    </Center>

                                                                                                    <Stack alignItems="center">
                                                                                                        <HStack alignItems="center">
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="55%">
                                                                                                                <View>
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.date4_3 == 'NULL' ? "Select"  : this.state.date4_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(date4_3) => this.setState({date4_3})}>
                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                    </Picker>
                                                                                                                </View>  
                                                                                                            </VStack>
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="35%">
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.bed4_3 == 'NULL' ? "Select"  : this.state.bed4_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(bed4_3) => this.setState({bed4_3})}>
                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                </Picker>
                                                                                                            </VStack>
                                                                                                        </HStack>
                                                                                                    </Stack>
                                                                                                </View>
                                                                                            }

                                                                                            
                                                                                        </View>
                                                                                        
                                                                                    )}

                                                                                    
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                        
                                                                        <Center>
                                                                            <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                        </Center>

                                                                        <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                            <InputGroup
                                                                                w={{
                                                                                base: "80%",
                                                                                md: "285",
                                                                                }}
                                                                            >
                                                                                <InputLeftAddon children={"CAD$:"} />
                                                                                <Input
                                                                                w={{
                                                                                    base: "100%",
                                                                                    md: "100%",
                                                                                }}
                                                                                defaultValue={item.data.aprox4 == 'NULL' ? '' : item.data.aprox4}
                                                                                onChangeText={ (aprox4) => this.setState({aprox4}) }
                                                                                style={globalStyles.EditRoomInputWeeklyBar}
                                                                                />
                                                                            
                                                                            </InputGroup>
                                                                        </VStack>


                                                                    </Card>
                                                                </View>
                                                        :

                                                            <Text style={ globalStyles.hideContents}></Text>}

                                                        {/*ROOM 5*/}
                                                        {this.state.type4 != 'NULL' || this.state.bed4 != 'NULL' || this.state.date4 != 'NULL' || this.state.food4 != 'NULL' || this.state.aprox4 != '0' ?
                                                            this.state.type5 == 'NULL' && this.state.bed5 == 'NULL' && this.state.date5 == 'NULL' && this.state.food5 == 'NULL' && this.state.aprox5 && '0' ?
                                                                <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded5} onToggle={(isExpanded)=>this.setState({expanded5: isExpanded})}>
                                                                    <CollapseHeader>
                                                                        <View>
                                                                            { this.state.expanded5 === false ?
                                                                            <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        : 
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                            }
                                                                        </View>
                                                                    </CollapseHeader>
                                                                    <CollapseBody>
                                                                        <View style={globalStyles.show}>
                                                                            <Card>
                                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 5</Heading>
                                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom5()}>
                                                
                                                                                            {imageroom5 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom5 == "NULL" ?
                                                                                            <Image source={imageroom5}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom5}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom5}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom5_2()}>
                                                                        
                                                                                            {imageroom5_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom5_2 == "NULL" ?
                                                                                            <Image source={imageroom5_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom5_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom5_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom5_3()}>
                                                                        
                                                                                            {imageroom5_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom5_3 == "NULL" ?
                                                                                            <Image source={imageroom5_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom5_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom5_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>


                                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                    <Stack alignItems="center" width="100%">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.type5 == 'NULL' ? "Select"  : this.state.type5}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                        onValueChange={(type5) => this.setState({type5})}>
                                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.food5 == 'NULL' ? "Select"  : this.state.food5}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(food5) => this.setState({food5})}>
                                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                                        <Picker.Item label="No" value="No" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                </View>
                                                                            
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                                </Center>

                                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                    <InputGroup
                                                                                        w={{
                                                                                        base: "80%",
                                                                                        md: "285",
                                                                                        }}
                                                                                    >
                                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                                        <Input
                                                                                        w={{
                                                                                            base: "100%",
                                                                                            md: "100%",
                                                                                        }}
                                                                                        defaultValue={item.data.aprox5 == 'NULL' ? '' : item.data.aprox5}
                                                                                        onChangeText={ (aprox5) => this.setState({aprox5}) }
                                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                                        />
                                                                                    
                                                                                    </InputGroup>
                                                                                </VStack>


                                                                            </Card>
                                                                        </View>
                                                                    </CollapseBody>
                                                                </Collapse>
                                                            :
                                                                <View style={globalStyles.show}>
                                                                    <Card>
                                                                        <Heading size='xl' style={ globalStyles.titleRooms}>Room 5</Heading>
                                                                        <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                        <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom5()}>
                                        
                                                                                    {imageroom5 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom5 == "NULL" ?
                                                                                    <Image source={imageroom5}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom5}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom5}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom5_2()}>
                                                                
                                                                                    {imageroom5_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom5_2 == "NULL" ?
                                                                                    <Image source={imageroom5_2}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom5_2}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom5_2}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom5_3()}>
                                                                
                                                                                    {imageroom5_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom5_3 == "NULL" ?
                                                                                    <Image source={imageroom5_3}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom5_3}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom5_3}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                        </ScrollView>

                                                                        <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                            <Stack alignItems="center" width="100%">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.type5 == 'NULL' ? "Select"  : this.state.type5}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                onValueChange={(type5) => this.setState({type5})}>
                                                                                                    <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                    <Picker.Item label="Single" value="Single" /> 
                                                                                                    <Picker.Item label="Executive" value="Executive" />
                                                                                                    <Picker.Item label="Share" value="Share" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.food5 == 'NULL' ? "Select"  : this.state.food5}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(food5) => this.setState({food5})}>
                                                                                                <Picker.Item label="-Meals-" value="NULL" />
                                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                                <Picker.Item label="No" value="No" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type5 != 'NULL' && (
                                                                                <View>
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date5 == 'NULL' ? "Select"  : this.state.date5}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date5) => this.setState({date5})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed5 == 'NULL' ? "Select"  : this.state.bed5}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed5) => this.setState({bed5})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.type5 == 'Share' && (
                                                                                        <View>
                                                                                            {/*Bed 5_2 */}
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date5_2 == 'NULL' ? "Select"  : this.state.date5_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date5_2) => this.setState({date5_2})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed5_2 == 'NULL' ? "Select"  : this.state.bed5_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed5_2) => this.setState({bed5_2})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>

                                                                                            {this.state.bed5_3 == 'NULL' && this.state.date5_3 == 'NULL' ? 
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Collapse isExpanded={this.state.expanded5bed} onToggle={(isExpanded)=>this.setState({expanded5bed: isExpanded})}>
                                                                                                            <CollapseHeader>
                                                                                                                <View>
                                                                                                                    { this.state.expanded5bed === false ?
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                : 
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                    }
                                                                                                                </View>
                                                                                                            </CollapseHeader>
                                                                                                            <CollapseBody>
                                                                                                                {/*Bed 5_3 */}
                                                                                                                <View width="95%">
                                                                                                                    <Center>
                                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                    </Center>

                                                                                                                    <Stack alignItems="center" ml="5%">
                                                                                                                        <HStack alignItems="center">
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="55%">
                                                                                                                                <View>
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.date5_3 == 'NULL' ? "Select"  : this.state.date5_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(date5_3) => this.setState({date5_3})}>
                                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                                    </Picker>
                                                                                                                                </View>  
                                                                                                                            </VStack>
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="35%">
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.bed5_3 == 'NULL' ? "Select"  : this.state.bed5_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(bed5_3) => this.setState({bed5_3})}>
                                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                </Picker>
                                                                                                                            </VStack>
                                                                                                                        </HStack>
                                                                                                                    </Stack>
                                                                                                                </View>
                                                                                                            
                                                                                                            </CollapseBody>
                                                                                                        </Collapse>
                                                                                                    </Center>
                                                                                                </View>
                                                                                            :
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                    </Center>

                                                                                                    <Stack alignItems="center">
                                                                                                        <HStack alignItems="center">
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="55%">
                                                                                                                <View>
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.date5_3 == 'NULL' ? "Select"  : this.state.date5_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(date5_3) => this.setState({date5_3})}>
                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                    </Picker>
                                                                                                                </View>  
                                                                                                            </VStack>
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="35%">
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.bed5_3 == 'NULL' ? "Select"  : this.state.bed5_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(bed5_3) => this.setState({bed5_3})}>
                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                </Picker>
                                                                                                            </VStack>
                                                                                                        </HStack>
                                                                                                    </Stack>
                                                                                                </View>
                                                                                            }

                                                                                            
                                                                                        </View>
                                                                                        
                                                                                    )}

                                                                                    
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                        
                                                                        <Center>
                                                                            <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                        </Center>

                                                                        <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                            <InputGroup
                                                                                w={{
                                                                                base: "80%",
                                                                                md: "285",
                                                                                }}
                                                                            >
                                                                                <InputLeftAddon children={"CAD$:"} />
                                                                                <Input
                                                                                w={{
                                                                                    base: "100%",
                                                                                    md: "100%",
                                                                                }}
                                                                                defaultValue={item.data.aprox5 == 'NULL' ? '' : item.data.aprox5}
                                                                                onChangeText={ (aprox5) => this.setState({aprox5}) }
                                                                                style={globalStyles.EditRoomInputWeeklyBar}
                                                                                />
                                                                            
                                                                            </InputGroup>
                                                                        </VStack>


                                                                    </Card>
                                                                </View>
                                                        :
                                                                <Text style={ globalStyles.hideContents}></Text>
                                                        }

                                                        {/*ROOM 6*/}
                                                        {this.state.type5 != 'NULL' || this.state.bed5 != 'NULL' || this.state.date5 != 'NULL' || this.state.food5 != 'NULL' || this.state.aprox5 != '0' ?
                                                            this.state.type6 == 'NULL' && this.state.bed6 == 'NULL' && this.state.date6 == 'NULL' && this.state.food6 == 'NULL' && this.state.aprox6 && '0' ?
                                                                <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded6} onToggle={(isExpanded)=>this.setState({expanded6: isExpanded})}>
                                                                    <CollapseHeader>
                                                                        <View>
                                                                            { this.state.expanded6 === false ?
                                                                            <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        : 
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                            }
                                                                        </View>
                                                                    </CollapseHeader>
                                                                    <CollapseBody>
                                                                        <View style={globalStyles.show}>
                                                                            <Card>
                                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 6</Heading>
                                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom6()}>
                                                                        
                                                                                            {imageroom6 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom6 == "NULL" ?
                                                                                            <Image source={imageroom6}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom6}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom6}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom6_2()}>
                                                                        
                                                                                            {imageroom6_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom6_2 == "NULL" ?
                                                                                            <Image source={imageroom6_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom6_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom6_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom6_3()}>
                                                                        
                                                                                            {imageroom6_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom6_3 == "NULL" ?
                                                                                            <Image source={imageroom6_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom6_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom6_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>


                                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                    <Stack alignItems="center" width="100%">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.type6 == 'NULL' ? "Select"  : this.state.type6}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                        onValueChange={(type6) => this.setState({type6})}>
                                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.food6 == 'NULL' ? "Select"  : this.state.food6}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(food6) => this.setState({food6})}>
                                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                                        <Picker.Item label="No" value="No" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                </View>
                                                                            
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                                </Center>

                                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                    <InputGroup
                                                                                        w={{
                                                                                        base: "80%",
                                                                                        md: "285",
                                                                                        }}
                                                                                    >
                                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                                        <Input
                                                                                        w={{
                                                                                            base: "100%",
                                                                                            md: "100%",
                                                                                        }}
                                                                                        defaultValue={item.data.aprox6 == 'NULL' ? '' : item.data.aprox6}
                                                                                        onChangeText={ (aprox6) => this.setState({aprox6}) }
                                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                                        />
                                                                                    
                                                                                    </InputGroup>
                                                                                </VStack>


                                                                            </Card>
                                                                        </View>
                                                                    
                                                                    </CollapseBody>
                                                                </Collapse>
                                                            :
                                                            <View style={globalStyles.show}>
                                                                <Card>
                                                                    <Heading size='xl' style={ globalStyles.titleRooms}>Room 6</Heading>
                                                                    <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                    <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                        <Card>
                                                                            <TouchableOpacity onPress={()=>this._Alertroom6()}>
                                                            
                                                                                {imageroom6 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                item.data.proom6 == "NULL" ?
                                                                                <Image source={imageroom6}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={{uri: `http://homebor.com/${item.data.proom6}`}}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={imageroom6}
                                                                                style={globalStyles.photoEditRoom} />}
                                                                            </TouchableOpacity>
                                                                        </Card>
                                                                        <Card>
                                                                            <TouchableOpacity onPress={()=>this._Alertroom6_2()}>
                                                            
                                                                                {imageroom6_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                item.data.proom6_2 == "NULL" ?
                                                                                <Image source={imageroom6_2}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={{uri: `http://homebor.com/${item.data.proom6_2}`}}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={imageroom6_2}
                                                                                style={globalStyles.photoEditRoom} />}
                                                                            </TouchableOpacity>
                                                                        </Card>
                                                                        <Card>
                                                                            <TouchableOpacity onPress={()=>this._Alertroom6_3()}>
                                                            
                                                                                {imageroom6_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                item.data.proom6_3 == "NULL" ?
                                                                                <Image source={imageroom6_3}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={{uri: `http://homebor.com/${item.data.proom6_3}`}}
                                                                                style={globalStyles.photoEditRoom} />
                                                                                :
                                                                                <Image source={imageroom6_3}
                                                                                style={globalStyles.photoEditRoom} />}
                                                                            </TouchableOpacity>
                                                                        </Card>
                                                                    </ScrollView>

                                                                    <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                        <Stack alignItems="center" width="100%">
                                                                            <HStack alignItems="center">
                                                                                <Center size="16" width="10%">
                                                                                    <Image
                                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.tabicon}
                                                                                    />
                                                                                </Center>
                                                                                <VStack width="55%">
                                                                                    <View>
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.type6 == 'NULL' ? "Select"  : this.state.type6}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                            onValueChange={(type6) => this.setState({type6})}>
                                                                                                <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                <Picker.Item label="Single" value="Single" /> 
                                                                                                <Picker.Item label="Executive" value="Executive" />
                                                                                                <Picker.Item label="Share" value="Share" />
                                                                                        </Picker>
                                                                                    </View>  
                                                                                </VStack>
                                                                                <Center size="16" width="10%">
                                                                                    <Image
                                                                                        source={require("../assets/img/roomIcon/food-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.tabicon}
                                                                                    />
                                                                                </Center>
                                                                                <VStack width="35%">
                                                                                    <Picker
                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                        selectedValue={this.state.food6 == 'NULL' ? "Select"  : this.state.food6}
                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                        onValueChange={(food6) => this.setState({food6})}>
                                                                                            <Picker.Item label="-Meals-" value="NULL" />
                                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                                            <Picker.Item label="No" value="No" />
                                                                                    </Picker>
                                                                                </VStack>
                                                                            </HStack>
                                                                        </Stack>

                                                                        {this.state.type6 != 'NULL' && (
                                                                            <View>
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                </Center>

                                                                                <Stack alignItems="center">
                                                                                    <HStack alignItems="center">
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="55%">
                                                                                            <View>
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.date6 == 'NULL' ? "Select"  : this.state.date6}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(date6) => this.setState({date6})}>
                                                                                                        <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                        <Picker.Item label="Available" value="Available" />  
                                                                                                        <Picker.Item label="Occupied" value="Occupied" />
                                                                                                        <Picker.Item label="Disable" value="Disable" />
                                                                                                </Picker>
                                                                                            </View>  
                                                                                        </VStack>
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="35%">
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.bed6 == 'NULL' ? "Select"  : this.state.bed6}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                onValueChange={(bed6) => this.setState({bed6})}>
                                                                                                    <Picker.Item label="-Bed-" value="NULL" />
                                                                                                    <Picker.Item label="Twin" value="Twin" /> 
                                                                                                    <Picker.Item label="Double" value="Double" />
                                                                                                    <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                            </Picker>
                                                                                        </VStack>
                                                                                    </HStack>
                                                                                </Stack>

                                                                                {this.state.type6 == 'Share' && (
                                                                                    <View>
                                                                                        {/*Bed 6_2 */}
                                                                                        <Center>
                                                                                            <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                        </Center>

                                                                                        <Stack alignItems="center">
                                                                                            <HStack alignItems="center">
                                                                                                <Center size="16" width="10%">
                                                                                                    <Image
                                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                        resizeMode="contain"
                                                                                                        style={globalStyles.tabicon}
                                                                                                    />
                                                                                                </Center>
                                                                                                <VStack width="55%">
                                                                                                    <View>
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.date6_2 == 'NULL' ? "Select"  : this.state.date6_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(date6_2) => this.setState({date6_2})}>
                                                                                                                <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                <Picker.Item label="Available" value="Available" />  
                                                                                                                <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                <Picker.Item label="Disable" value="Disable" />
                                                                                                        </Picker>
                                                                                                    </View>  
                                                                                                </VStack>
                                                                                                <Center size="16" width="10%">
                                                                                                    <Image
                                                                                                        source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                        resizeMode="contain"
                                                                                                        style={globalStyles.tabicon}
                                                                                                    />
                                                                                                </Center>
                                                                                                <VStack width="35%">
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.bed6_2 == 'NULL' ? "Select"  : this.state.bed6_2}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(bed6_2) => this.setState({bed6_2})}>
                                                                                                            <Picker.Item label="-Bed-" value="NULL" />
                                                                                                            <Picker.Item label="Twin" value="Twin" /> 
                                                                                                            <Picker.Item label="Double" value="Double" />
                                                                                                            <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                    </Picker>
                                                                                                </VStack>
                                                                                            </HStack>
                                                                                        </Stack>

                                                                                        {this.state.bed6_3 == 'NULL' && this.state.date6_3 == 'NULL' ? 
                                                                                            <View>
                                                                                                <Center>
                                                                                                    <Collapse isExpanded={this.state.expanded6bed} onToggle={(isExpanded)=>this.setState({expanded6bed: isExpanded})}>
                                                                                                        <CollapseHeader>
                                                                                                            <View>
                                                                                                                { this.state.expanded6bed === false ?
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                <View style={globalStyles.buttonroom}>
                                                                                                                    <Text style={globalStyles.buttonTextroom}>
                                                                                                                        <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                    </Text>
                                                                                                                </View>
                                                                                                            </TouchableOpacity>
                                                                                                            : 
                                                                                                            <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                <View style={globalStyles.buttonroom}>
                                                                                                                    <Text style={globalStyles.buttonTextroom}>
                                                                                                                        <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                    </Text>
                                                                                                                </View>
                                                                                                            </TouchableOpacity>
                                                                                                                }
                                                                                                            </View>
                                                                                                        </CollapseHeader>
                                                                                                        <CollapseBody>
                                                                                                            {/*Bed 6_3 */}
                                                                                                            <View width="95%">
                                                                                                                <Center>
                                                                                                                    <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                </Center>

                                                                                                                <Stack alignItems="center" ml="5%">
                                                                                                                    <HStack alignItems="center">
                                                                                                                        <Center size="16" width="10%">
                                                                                                                            <Image
                                                                                                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                resizeMode="contain"
                                                                                                                                style={globalStyles.tabicon}
                                                                                                                            />
                                                                                                                        </Center>
                                                                                                                        <VStack width="55%">
                                                                                                                            <View>
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.date6_3 == 'NULL' ? "Select"  : this.state.date6_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(date6_3) => this.setState({date6_3})}>
                                                                                                                                        <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                        <Picker.Item label="Available" value="Available" />  
                                                                                                                                        <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                        <Picker.Item label="Disable" value="Disable" />
                                                                                                                                </Picker>
                                                                                                                            </View>  
                                                                                                                        </VStack>
                                                                                                                        <Center size="16" width="10%">
                                                                                                                            <Image
                                                                                                                                source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                resizeMode="contain"
                                                                                                                                style={globalStyles.tabicon}
                                                                                                                            />
                                                                                                                        </Center>
                                                                                                                        <VStack width="35%">
                                                                                                                            <Picker
                                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                                selectedValue={this.state.bed6_3 == 'NULL' ? "Select"  : this.state.bed6_3}
                                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                onValueChange={(bed6_3) => this.setState({bed6_3})}>
                                                                                                                                    <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                    <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                    <Picker.Item label="Double" value="Double" />
                                                                                                                                    <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                            </Picker>
                                                                                                                        </VStack>
                                                                                                                    </HStack>
                                                                                                                </Stack>
                                                                                                            </View>
                                                                                                        
                                                                                                        </CollapseBody>
                                                                                                    </Collapse>
                                                                                                </Center>
                                                                                            </View>
                                                                                        :
                                                                                            <View>
                                                                                                <Center>
                                                                                                    <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                </Center>

                                                                                                <Stack alignItems="center">
                                                                                                    <HStack alignItems="center">
                                                                                                        <Center size="16" width="10%">
                                                                                                            <Image
                                                                                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                resizeMode="contain"
                                                                                                                style={globalStyles.tabicon}
                                                                                                            />
                                                                                                        </Center>
                                                                                                        <VStack width="55%">
                                                                                                            <View>
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.date6_3 == 'NULL' ? "Select"  : this.state.date6_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(date6_3) => this.setState({date6_3})}>
                                                                                                                        <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                        <Picker.Item label="Available" value="Available" />  
                                                                                                                        <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                        <Picker.Item label="Disable" value="Disable" />
                                                                                                                </Picker>
                                                                                                            </View>  
                                                                                                        </VStack>
                                                                                                        <Center size="16" width="10%">
                                                                                                            <Image
                                                                                                                source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                resizeMode="contain"
                                                                                                                style={globalStyles.tabicon}
                                                                                                            />
                                                                                                        </Center>
                                                                                                        <VStack width="35%">
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.bed6_3 == 'NULL' ? "Select"  : this.state.bed6_3}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(bed6_3) => this.setState({bed6_3})}>
                                                                                                                    <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                    <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                    <Picker.Item label="Double" value="Double" />
                                                                                                                    <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                            </Picker>
                                                                                                        </VStack>
                                                                                                    </HStack>
                                                                                                </Stack>
                                                                                            </View>
                                                                                        }

                                                                                        
                                                                                    </View>
                                                                                    
                                                                                )}

                                                                                
                                                                            </View>
                                                                        )}
                                                                    </View>
                                                                    
                                                                    <Center>
                                                                        <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                    </Center>

                                                                    <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                        <InputGroup
                                                                            w={{
                                                                            base: "80%",
                                                                            md: "285",
                                                                            }}
                                                                        >
                                                                            <InputLeftAddon children={"CAD$:"} />
                                                                            <Input
                                                                            w={{
                                                                                base: "100%",
                                                                                md: "100%",
                                                                            }}
                                                                            defaultValue={item.data.aprox6 == 'NULL' ? '' : item.data.aprox6}
                                                                            onChangeText={ (aprox6) => this.setState({aprox6}) }
                                                                            style={globalStyles.EditRoomInputWeeklyBar}
                                                                            />
                                                                        
                                                                        </InputGroup>
                                                                    </VStack>


                                                                </Card>
                                                            </View>
                                                        :
                                                            <Text style={ globalStyles.hideContents}></Text>  
                                                        }

                                                        {/*ROOM 7*/}
                                                        {this.state.type6 != 'NULL' || this.state.bed6 != 'NULL' || this.state.date6 != 'NULL' || this.state.food6 != 'NULL' || this.state.aprox6 != '0' ?
                                                            this.state.type7 == 'NULL' && this.state.bed7 == 'NULL' && this.state.date7 == 'NULL' && this.state.food7 == 'NULL' && this.state.aprox7 && '0' ?
                                                                <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded7} onToggle={(isExpanded)=>this.setState({expanded7: isExpanded})}>
                                                                    <CollapseHeader>
                                                                        <View>
                                                                            { this.state.expanded7 === false ?
                                                                            <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        : 
                                                                        <TouchableOpacity style={globalStyles.buttonroom} >
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                            }
                                                                        </View>
                                                                    </CollapseHeader>
                                                                    <CollapseBody>

                                                                        <View style={globalStyles.show}>
                                                                            <Card>
                                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 7</Heading>
                                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7()}>
                                                
                                                                                            {imageroom7 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7 == "NULL" ?
                                                                                            <Image source={imageroom7}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7_2()}>
                                                                        
                                                                                            {imageroom7_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7_2 == "NULL" ?
                                                                                            <Image source={imageroom7_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7_3()}>
                                                                        
                                                                                            {imageroom7_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7_3 == "NULL" ?
                                                                                            <Image source={imageroom7_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>


                                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                    <Stack alignItems="center" width="100%">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.type7 == 'NULL' ? "Select"  : this.state.type7}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                        onValueChange={(type7) => this.setState({type7})}>
                                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.food7 == 'NULL' ? "Select"  : this.state.food7}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(food7) => this.setState({food7})}>
                                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                                        <Picker.Item label="No" value="No" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                </View>
                                                                            
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                                </Center>

                                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                    <InputGroup
                                                                                        w={{
                                                                                        base: "80%",
                                                                                        md: "285",
                                                                                        }}
                                                                                    >
                                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                                        <Input
                                                                                        w={{
                                                                                            base: "100%",
                                                                                            md: "100%",
                                                                                        }}
                                                                                        defaultValue={item.data.aprox7 == 'NULL' ? '' : item.data.aprox7}
                                                                                        onChangeText={ (aprox7) => this.setState({aprox7}) }
                                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                                        />
                                                                                    
                                                                                    </InputGroup>
                                                                                </VStack>


                                                                            </Card>
                                                                        </View>
                                                                    
                                                                    </CollapseBody>
                                                                </Collapse>
                                                            :
                                                                <View style={globalStyles.show}>
                                                                    <Card>
                                                                        <Heading size='xl' style={ globalStyles.titleRooms}>Room 7</Heading>
                                                                        <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                        <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom7()}>
                                        
                                                                                    {imageroom7 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom7 == "NULL" ?
                                                                                    <Image source={imageroom7}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom7}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom7}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom7_2()}>
                                                                
                                                                                    {imageroom7_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom7_2 == "NULL" ?
                                                                                    <Image source={imageroom7_2}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom7_2}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom7_2}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                            <Card>
                                                                                <TouchableOpacity onPress={()=>this._Alertroom7_3()}>
                                                                
                                                                                    {imageroom7_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                    item.data.proom7_3 == "NULL" ?
                                                                                    <Image source={imageroom7_3}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={{uri: `http://homebor.com/${item.data.proom7_3}`}}
                                                                                    style={globalStyles.photoEditRoom} />
                                                                                    :
                                                                                    <Image source={imageroom7_3}
                                                                                    style={globalStyles.photoEditRoom} />}
                                                                                </TouchableOpacity>
                                                                            </Card>
                                                                        </ScrollView>

                                                                        <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                            <Stack alignItems="center" width="100%">
                                                                                <HStack alignItems="center">
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="55%">
                                                                                        <View>
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.type7 == 'NULL' ? "Select"  : this.state.type7}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                onValueChange={(type7) => this.setState({type7})}>
                                                                                                    <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                    <Picker.Item label="Single" value="Single" /> 
                                                                                                    <Picker.Item label="Executive" value="Executive" />
                                                                                                    <Picker.Item label="Share" value="Share" />
                                                                                            </Picker>
                                                                                        </View>  
                                                                                    </VStack>
                                                                                    <Center size="16" width="10%">
                                                                                        <Image
                                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                                            resizeMode="contain"
                                                                                            style={globalStyles.tabicon}
                                                                                        />
                                                                                    </Center>
                                                                                    <VStack width="35%">
                                                                                        <Picker
                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                            selectedValue={this.state.food7 == 'NULL' ? "Select"  : this.state.food7}
                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                            onValueChange={(food7) => this.setState({food7})}>
                                                                                                <Picker.Item label="-Meals-" value="NULL" />
                                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                                <Picker.Item label="No" value="No" />
                                                                                        </Picker>
                                                                                    </VStack>
                                                                                </HStack>
                                                                            </Stack>

                                                                            {this.state.type7 != 'NULL' && (
                                                                                <View>
                                                                                    <Center>
                                                                                        <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                    </Center>

                                                                                    <Stack alignItems="center">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.date7 == 'NULL' ? "Select"  : this.state.date7}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(date7) => this.setState({date7})}>
                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.bed7 == 'NULL' ? "Select"  : this.state.bed7}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(bed7) => this.setState({bed7})}>
                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                    {this.state.type7 == 'Share' && (
                                                                                        <View>
                                                                                            {/*Bed 7_2 */}
                                                                                            <Center>
                                                                                                <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                            </Center>

                                                                                            <Stack alignItems="center">
                                                                                                <HStack alignItems="center">
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="55%">
                                                                                                        <View>
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.date7_2 == 'NULL' ? "Select"  : this.state.date7_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(date7_2) => this.setState({date7_2})}>
                                                                                                                    <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                    <Picker.Item label="Available" value="Available" />  
                                                                                                                    <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                    <Picker.Item label="Disable" value="Disable" />
                                                                                                            </Picker>
                                                                                                        </View>  
                                                                                                    </VStack>
                                                                                                    <Center size="16" width="10%">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.tabicon}
                                                                                                        />
                                                                                                    </Center>
                                                                                                    <VStack width="35%">
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.bed7_2 == 'NULL' ? "Select"  : this.state.bed7_2}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(bed7_2) => this.setState({bed7_2})}>
                                                                                                                <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                <Picker.Item label="Double" value="Double" />
                                                                                                                <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                        </Picker>
                                                                                                    </VStack>
                                                                                                </HStack>
                                                                                            </Stack>

                                                                                            {this.state.bed7_3 == 'NULL' && this.state.date7_3 == 'NULL' ? 
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Collapse isExpanded={this.state.expanded7bed} onToggle={(isExpanded)=>this.setState({expanded7bed: isExpanded})}>
                                                                                                            <CollapseHeader>
                                                                                                                <View>
                                                                                                                    { this.state.expanded7bed === false ?
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                : 
                                                                                                                <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                    <View style={globalStyles.buttonroom}>
                                                                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                                                                            <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                        </Text>
                                                                                                                    </View>
                                                                                                                </TouchableOpacity>
                                                                                                                    }
                                                                                                                </View>
                                                                                                            </CollapseHeader>
                                                                                                            <CollapseBody>
                                                                                                                {/*Bed 7_3 */}
                                                                                                                <View width="95%">
                                                                                                                    <Center>
                                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                    </Center>

                                                                                                                    <Stack alignItems="center" ml="5%">
                                                                                                                        <HStack alignItems="center">
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="55%">
                                                                                                                                <View>
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.date7_3 == 'NULL' ? "Select"  : this.state.date7_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(date7_3) => this.setState({date7_3})}>
                                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                                    </Picker>
                                                                                                                                </View>  
                                                                                                                            </VStack>
                                                                                                                            <Center size="16" width="10%">
                                                                                                                                <Image
                                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                    resizeMode="contain"
                                                                                                                                    style={globalStyles.tabicon}
                                                                                                                                />
                                                                                                                            </Center>
                                                                                                                            <VStack width="35%">
                                                                                                                                <Picker
                                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                                    selectedValue={this.state.bed7_3 == 'NULL' ? "Select"  : this.state.bed7_3}
                                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                    onValueChange={(bed7_3) => this.setState({bed7_3})}>
                                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                </Picker>
                                                                                                                            </VStack>
                                                                                                                        </HStack>
                                                                                                                    </Stack>
                                                                                                                </View>
                                                                                                            
                                                                                                            </CollapseBody>
                                                                                                        </Collapse>
                                                                                                    </Center>
                                                                                                </View>
                                                                                            :
                                                                                                <View>
                                                                                                    <Center>
                                                                                                        <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                    </Center>

                                                                                                    <Stack alignItems="center">
                                                                                                        <HStack alignItems="center">
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="55%">
                                                                                                                <View>
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.date7_3 == 'NULL' ? "Select"  : this.state.date7_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(date7_3) => this.setState({date7_3})}>
                                                                                                                            <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                            <Picker.Item label="Available" value="Available" />  
                                                                                                                            <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                            <Picker.Item label="Disable" value="Disable" />
                                                                                                                    </Picker>
                                                                                                                </View>  
                                                                                                            </VStack>
                                                                                                            <Center size="16" width="10%">
                                                                                                                <Image
                                                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                    resizeMode="contain"
                                                                                                                    style={globalStyles.tabicon}
                                                                                                                />
                                                                                                            </Center>
                                                                                                            <VStack width="35%">
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.bed7_3 == 'NULL' ? "Select"  : this.state.bed7_3}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(bed7_3) => this.setState({bed7_3})}>
                                                                                                                        <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                        <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                        <Picker.Item label="Double" value="Double" />
                                                                                                                        <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                </Picker>
                                                                                                            </VStack>
                                                                                                        </HStack>
                                                                                                    </Stack>
                                                                                                </View>
                                                                                            }

                                                                                            
                                                                                        </View>
                                                                                        
                                                                                    )}

                                                                                    
                                                                                </View>
                                                                            )}
                                                                        </View>
                                                                        
                                                                        <Center>
                                                                            <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                        </Center>

                                                                        <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                            <InputGroup
                                                                                w={{
                                                                                base: "80%",
                                                                                md: "285",
                                                                                }}
                                                                            >
                                                                                <InputLeftAddon children={"CAD$:"} />
                                                                                <Input
                                                                                w={{
                                                                                    base: "100%",
                                                                                    md: "100%",
                                                                                }}
                                                                                defaultValue={item.data.aprox7 == 'NULL' ? '' : item.data.aprox7}
                                                                                onChangeText={ (aprox7) => this.setState({aprox7}) }
                                                                                style={globalStyles.EditRoomInputWeeklyBar}
                                                                                />
                                                                            
                                                                            </InputGroup>
                                                                        </VStack>


                                                                </Card>
                                                            </View>
                                                        :
                                                            <Text style={ globalStyles.hideContents}></Text>  
                                                        }

                                                        {/*ROOM 8*/}
                                                        {this.state.type7 != 'NULL' || this.state.bed7 != 'NULL' || this.state.date7 != 'NULL' || this.state.food7 != 'NULL' || this.state.aprox7 != '0' ?
                                                            this.state.type8 == 'NULL' && this.state.bed8 == 'NULL' && this.state.date8 == 'NULL' && this.state.food8 == 'NULL' && this.state.aprox8 && '0' ?
                                                                <Collapse style={globalStyles.wrapperCollapsibleListEdit} isExpanded={this.state.expanded8} onToggle={(isExpanded)=>this.setState({expanded8: isExpanded})}>
                                                                    <CollapseHeader>
                                                                        <View>
                                                                            { this.state.expanded8 === false ?
                                                                            <TouchableOpacity style={globalStyles.buttonroom}>
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Room
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                        : 
                                                                        <TouchableOpacity style={globalStyles.buttonroom}>
                                                                            <View style={globalStyles.buttonroom}>
                                                                                <Text style={globalStyles.buttonTextroom}>
                                                                                    <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                </Text>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                            }
                                                                        </View>
                                                                    </CollapseHeader>
                                                                    <CollapseBody>
                                                                        <View style={globalStyles.show}>
                                                                            <Card>
                                                                                <Heading size='xl' style={ globalStyles.titleRooms}>Room 8</Heading>
                                                                                <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7()}>
                                                
                                                                                            {imageroom7 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7 == "NULL" ?
                                                                                            <Image source={imageroom7}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7_2()}>
                                                                        
                                                                                            {imageroom7_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7_2 == "NULL" ?
                                                                                            <Image source={imageroom7_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom7_3()}>
                                                                        
                                                                                            {imageroom7_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom7_3 == "NULL" ?
                                                                                            <Image source={imageroom7_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom7_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom7_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>


                                                                                <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                    <Stack alignItems="center" width="100%">
                                                                                        <HStack alignItems="center">
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="55%">
                                                                                                <View>
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.type8 == 'NULL' ? "Select"  : this.state.type8}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                        onValueChange={(type8) => this.setState({type8})}>
                                                                                                            <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                            <Picker.Item label="Single" value="Single" /> 
                                                                                                            <Picker.Item label="Executive" value="Executive" />
                                                                                                            <Picker.Item label="Share" value="Share" />
                                                                                                    </Picker>
                                                                                                </View>  
                                                                                            </VStack>
                                                                                            <Center size="16" width="10%">
                                                                                                <Image
                                                                                                    source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                    resizeMode="contain"
                                                                                                    style={globalStyles.tabicon}
                                                                                                />
                                                                                            </Center>
                                                                                            <VStack width="35%">
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.food8 == 'NULL' ? "Select"  : this.state.food8}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                    onValueChange={(food8) => this.setState({food8})}>
                                                                                                        <Picker.Item label="-Meals-" value="NULL" />
                                                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                                                        <Picker.Item label="No" value="No" />
                                                                                                </Picker>
                                                                                            </VStack>
                                                                                        </HStack>
                                                                                    </Stack>

                                                                                </View>
                                                                            
                                                                                <Center>
                                                                                    <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                                </Center>

                                                                                <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                    <InputGroup
                                                                                        w={{
                                                                                        base: "80%",
                                                                                        md: "285",
                                                                                        }}
                                                                                    >
                                                                                        <InputLeftAddon children={"CAD$:"} />
                                                                                        <Input
                                                                                        w={{
                                                                                            base: "100%",
                                                                                            md: "100%",
                                                                                        }}
                                                                                        defaultValue={item.data.aprox8 == 'NULL' ? '' : item.data.aprox8}
                                                                                        onChangeText={ (aprox8) => this.setState({aprox8}) }
                                                                                        style={globalStyles.EditRoomInputWeeklyBar}
                                                                                        />
                                                                                    
                                                                                    </InputGroup>
                                                                                </VStack>


                                                                            </Card>
                                                                        </View>
                                                                    
                                                                    </CollapseBody>
                                                                </Collapse>
                                                            :
                                                                        <View style={globalStyles.show}>
                                                                        <Card>
                                                                            <Heading size='xl' style={ globalStyles.titleRooms}>Room 8</Heading>
                                                                            <Divider my="1" bg="gray.700" borderWidth="1"/>
                                                                                <ScrollView horizontal={true} style={ globalStyles.scrollviewedit}>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom8()}>
                                                                        
                                                                                            {imageroom8 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom8 == "NULL" ?
                                                                                            <Image source={imageroom8}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom8}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom8}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom8_2()}>
                                                                        
                                                                                            {imageroom8_2 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom8_2 == "NULL" ?
                                                                                            <Image source={imageroom8_2}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom8_2}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom8_2}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                    <Card>
                                                                                        <TouchableOpacity onPress={()=>this._Alertroom8_3()}>
                                                                        
                                                                                            {imageroom8_3 == require('../assets/img/empty/vacios-homebor-habitacion.png') ?
                                                                                            item.data.proom8_3 == "NULL" ?
                                                                                            <Image source={imageroom8_3}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={{uri: `http://homebor.com/${item.data.proom8_3}`}}
                                                                                            style={globalStyles.photoEditRoom} />
                                                                                            :
                                                                                            <Image source={imageroom8_3}
                                                                                            style={globalStyles.photoEditRoom} />}
                                                                                        </TouchableOpacity>
                                                                                    </Card>
                                                                                </ScrollView>

                                                                            <View width={(Dimensions.get('window').width >= 414) ? "90%" : "100%"} style={globalStyles.EditRoomView}>
                                                                                <Stack alignItems="center" width="100%">
                                                                                    <HStack alignItems="center">
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="55%">
                                                                                            <View>
                                                                                                <Picker
                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                    selectedValue={this.state.type8 == 'NULL' ? "Select"  : this.state.type8}
                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14, width: '100%'}}
                                                                                                    onValueChange={(type8) => this.setState({type8})}>
                                                                                                        <Picker.Item label="-Accomodation-" value="NULL" />
                                                                                                        <Picker.Item label="Single" value="Single" /> 
                                                                                                        <Picker.Item label="Executive" value="Executive" />
                                                                                                        <Picker.Item label="Share" value="Share" />
                                                                                                </Picker>
                                                                                            </View>  
                                                                                        </VStack>
                                                                                        <Center size="16" width="10%">
                                                                                            <Image
                                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                                resizeMode="contain"
                                                                                                style={globalStyles.tabicon}
                                                                                            />
                                                                                        </Center>
                                                                                        <VStack width="35%">
                                                                                            <Picker
                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                selectedValue={this.state.food8 == 'NULL' ? "Select"  : this.state.food8}
                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                onValueChange={(food8) => this.setState({food8})}>
                                                                                                    <Picker.Item label="-Meals-" value="NULL" />
                                                                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                                                                    <Picker.Item label="No" value="No" />
                                                                                            </Picker>
                                                                                        </VStack>
                                                                                    </HStack>
                                                                                </Stack>

                                                                                {this.state.type8 != 'NULL' && (
                                                                                    <View>
                                                                                        <Center>
                                                                                            <Text style={globalStyles.EditRoomText}>Bed 1</Text>
                                                                                        </Center>

                                                                                        <Stack alignItems="center">
                                                                                            <HStack alignItems="center">
                                                                                                <Center size="16" width="10%">
                                                                                                    <Image
                                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                        resizeMode="contain"
                                                                                                        style={globalStyles.tabicon}
                                                                                                    />
                                                                                                </Center>
                                                                                                <VStack width="55%">
                                                                                                    <View>
                                                                                                        <Picker
                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                            selectedValue={this.state.date8 == 'NULL' ? "Select"  : this.state.date8}
                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                            onValueChange={(date8) => this.setState({date8})}>
                                                                                                                <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                <Picker.Item label="Available" value="Available" />  
                                                                                                                <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                <Picker.Item label="Disable" value="Disable" />
                                                                                                        </Picker>
                                                                                                    </View>  
                                                                                                </VStack>
                                                                                                <Center size="16" width="10%">
                                                                                                    <Image
                                                                                                        source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                        resizeMode="contain"
                                                                                                        style={globalStyles.tabicon}
                                                                                                    />
                                                                                                </Center>
                                                                                                <VStack width="35%">
                                                                                                    <Picker
                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                        selectedValue={this.state.bed8 == 'NULL' ? "Select"  : this.state.bed8}
                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                        onValueChange={(bed8) => this.setState({bed8})}>
                                                                                                            <Picker.Item label="-Bed-" value="NULL" />
                                                                                                            <Picker.Item label="Twin" value="Twin" /> 
                                                                                                            <Picker.Item label="Double" value="Double" />
                                                                                                            <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                    </Picker>
                                                                                                </VStack>
                                                                                            </HStack>
                                                                                        </Stack>

                                                                                        {this.state.type8 == 'Share' && (
                                                                                            <View>
                                                                                                {/*Bed 7_2 */}
                                                                                                <Center>
                                                                                                    <Text style={globalStyles.EditRoomText}>Bed 2</Text>
                                                                                                </Center>

                                                                                                <Stack alignItems="center">
                                                                                                    <HStack alignItems="center">
                                                                                                        <Center size="16" width="10%">
                                                                                                            <Image
                                                                                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                resizeMode="contain"
                                                                                                                style={globalStyles.tabicon}
                                                                                                            />
                                                                                                        </Center>
                                                                                                        <VStack width="55%">
                                                                                                            <View>
                                                                                                                <Picker
                                                                                                                    style={globalStyles.EditRoomPicker} 
                                                                                                                    selectedValue={this.state.date8_2 == 'NULL' ? "Select"  : this.state.date8_2}
                                                                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                    onValueChange={(date8_2) => this.setState({date8_2})}>
                                                                                                                        <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                        <Picker.Item label="Available" value="Available" />  
                                                                                                                        <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                        <Picker.Item label="Disable" value="Disable" />
                                                                                                                </Picker>
                                                                                                            </View>  
                                                                                                        </VStack>
                                                                                                        <Center size="16" width="10%">
                                                                                                            <Image
                                                                                                                source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                resizeMode="contain"
                                                                                                                style={globalStyles.tabicon}
                                                                                                            />
                                                                                                        </Center>
                                                                                                        <VStack width="35%">
                                                                                                            <Picker
                                                                                                                style={globalStyles.EditRoomPicker} 
                                                                                                                selectedValue={this.state.bed8_2 == 'NULL' ? "Select"  : this.state.bed8_2}
                                                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                onValueChange={(bed8_2) => this.setState({bed8_2})}>
                                                                                                                    <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                    <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                    <Picker.Item label="Double" value="Double" />
                                                                                                                    <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                            </Picker>
                                                                                                        </VStack>
                                                                                                    </HStack>
                                                                                                </Stack>

                                                                                                {this.state.bed8_3 == 'NULL' && this.state.date8_3 == 'NULL' ? 
                                                                                                    <View>
                                                                                                        <Center>
                                                                                                            <Collapse isExpanded={this.state.expanded8bed} onToggle={(isExpanded)=>this.setState({expanded8bed: isExpanded})}>
                                                                                                                <CollapseHeader>
                                                                                                                    <View>
                                                                                                                        { this.state.expanded8bed === false ?
                                                                                                                        <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                        <View style={globalStyles.buttonroom}>
                                                                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                                                                <AntDesign name="pluscircle" style={globalStyles.plus} /> Add Bed
                                                                                                                            </Text>
                                                                                                                        </View>
                                                                                                                    </TouchableOpacity>
                                                                                                                    : 
                                                                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                                                                        <View style={globalStyles.buttonroom}>
                                                                                                                            <Text style={globalStyles.buttonTextroom}>
                                                                                                                                <AntDesign name="upcircle" style={globalStyles.plus} />
                                                                                                                            </Text>
                                                                                                                        </View>
                                                                                                                    </TouchableOpacity>
                                                                                                                        }
                                                                                                                    </View>
                                                                                                                </CollapseHeader>
                                                                                                                <CollapseBody>
                                                                                                                    {/*Bed 7_3 */}
                                                                                                                    <View width="95%">
                                                                                                                        <Center>
                                                                                                                            <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                                        </Center>

                                                                                                                        <Stack alignItems="center" ml="5%">
                                                                                                                            <HStack alignItems="center">
                                                                                                                                <Center size="16" width="10%">
                                                                                                                                    <Image
                                                                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                                        resizeMode="contain"
                                                                                                                                        style={globalStyles.tabicon}
                                                                                                                                    />
                                                                                                                                </Center>
                                                                                                                                <VStack width="55%">
                                                                                                                                    <View>
                                                                                                                                        <Picker
                                                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                                                            selectedValue={this.state.date8_3 == 'NULL' ? "Select"  : this.state.date8_3}
                                                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                            onValueChange={(date8_3) => this.setState({date8_3})}>
                                                                                                                                                <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                                <Picker.Item label="Available" value="Available" />  
                                                                                                                                                <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                                <Picker.Item label="Disable" value="Disable" />
                                                                                                                                        </Picker>
                                                                                                                                    </View>  
                                                                                                                                </VStack>
                                                                                                                                <Center size="16" width="10%">
                                                                                                                                    <Image
                                                                                                                                        source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                                        resizeMode="contain"
                                                                                                                                        style={globalStyles.tabicon}
                                                                                                                                    />
                                                                                                                                </Center>
                                                                                                                                <VStack width="35%">
                                                                                                                                    <Picker
                                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                                        selectedValue={this.state.bed8_3 == 'NULL' ? "Select"  : this.state.bed8_3}
                                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                                        onValueChange={(bed8_3) => this.setState({bed8_3})}>
                                                                                                                                            <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                                            <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                                            <Picker.Item label="Double" value="Double" />
                                                                                                                                            <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                                    </Picker>
                                                                                                                                </VStack>
                                                                                                                            </HStack>
                                                                                                                        </Stack>
                                                                                                                    </View>
                                                                                                                
                                                                                                                </CollapseBody>
                                                                                                            </Collapse>
                                                                                                        </Center>
                                                                                                    </View>
                                                                                                :
                                                                                                    <View>
                                                                                                        <Center>
                                                                                                            <Text style={globalStyles.EditRoomText}>Bed 3</Text>
                                                                                                        </Center>

                                                                                                        <Stack alignItems="center">
                                                                                                            <HStack alignItems="center">
                                                                                                                <Center size="16" width="10%">
                                                                                                                    <Image
                                                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                                                        resizeMode="contain"
                                                                                                                        style={globalStyles.tabicon}
                                                                                                                    />
                                                                                                                </Center>
                                                                                                                <VStack width="55%">
                                                                                                                    <View>
                                                                                                                        <Picker
                                                                                                                            style={globalStyles.EditRoomPicker} 
                                                                                                                            selectedValue={this.state.date8_3 == 'NULL' ? "Select"  : this.state.date8_3}
                                                                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                            onValueChange={(date8_3) => this.setState({date8_3})}>
                                                                                                                                <Picker.Item label="-Disponibility-" value="NULL" />
                                                                                                                                <Picker.Item label="Available" value="Available" />  
                                                                                                                                <Picker.Item label="Occupied" value="Occupied" />
                                                                                                                                <Picker.Item label="Disable" value="Disable" />
                                                                                                                        </Picker>
                                                                                                                    </View>  
                                                                                                                </VStack>
                                                                                                                <Center size="16" width="10%">
                                                                                                                    <Image
                                                                                                                        source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                                        resizeMode="contain"
                                                                                                                        style={globalStyles.tabicon}
                                                                                                                    />
                                                                                                                </Center>
                                                                                                                <VStack width="35%">
                                                                                                                    <Picker
                                                                                                                        style={globalStyles.EditRoomPicker} 
                                                                                                                        selectedValue={this.state.bed8_3 == 'NULL' ? "Select"  : this.state.bed8_3}
                                                                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : (Dimensions.get('window').width >= 414) ? 22 : 14}}
                                                                                                                        onValueChange={(bed8_3) => this.setState({bed8_3})}>
                                                                                                                            <Picker.Item label="-Bed-" value="NULL" />
                                                                                                                            <Picker.Item label="Twin" value="Twin" /> 
                                                                                                                            <Picker.Item label="Double" value="Double" />
                                                                                                                            <Picker.Item label="Bunk" value="Bunk-bed" />
                                                                                                                    </Picker>
                                                                                                                </VStack>
                                                                                                            </HStack>
                                                                                                        </Stack>
                                                                                                    </View>
                                                                                                }

                                                                                                
                                                                                            </View>
                                                                                            
                                                                                        )}

                                                                                        
                                                                                    </View>
                                                                                )}
                                                                            </View>
                                                                            
                                                                            <Center>
                                                                                <Text style={globalStyles.EditRoomText}>Weekly Price</Text>
                                                                            </Center>

                                                                            <VStack mt="5%" style={globalStyles.EditRoomInputWeekly}>
                                                                                <InputGroup
                                                                                    w={{
                                                                                    base: "80%",
                                                                                    md: "285",
                                                                                    }}
                                                                                >
                                                                                    <InputLeftAddon children={"CAD$:"} />
                                                                                    <Input
                                                                                    w={{
                                                                                        base: "100%",
                                                                                        md: "100%",
                                                                                    }}
                                                                                    defaultValue={item.data.aprox8 == 'NULL' ? '' : item.data.aprox8}
                                                                                    onChangeText={ (aprox8) => this.setState({aprox8}) }
                                                                                    style={globalStyles.EditRoomInputWeeklyBar}
                                                                                    />
                                                                                
                                                                                </InputGroup>
                                                                            </VStack>


                                                                    </Card>
                                                                </View>
                                                            :

                                                            <Text style={ globalStyles.hideContents}></Text>  
                                                        }
                                            
                                                        


                                                    </View>
                                                </KeyboardAwareScrollView>
                                            </View>
                                        )}
                                    />

                                    
                                </View>
                            </View>
                        )}
                        </View>
                    )}
                </View>
            </NativeBaseProvider>
        )
    }
}