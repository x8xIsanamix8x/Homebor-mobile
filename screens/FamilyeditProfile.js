import React, {Component, useState} from 'react';
import { View, Image, Platform, Alert, TouchableHighlight, RefreshControl, Dimensions} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Spinner, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';


import globalStyles from '../styles/global';
import Card from '../shared/card';

import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

import { StatusBar } from 'expo-status-bar';

import api from '../api/api';

import NetInfo from "@react-native-community/netinfo";

export default class FamilyEdit extends Component {
  NetInfoSubscription = null;
  constructor(props) {
    super(props);
    this.state = {
      //Variables
      email : '',
      perm : false,
      info : [],
      addmember : 'No',
      refreshing: false,

      //Calendars DATE PICKERS
      date: new Date(),
      mode: 'date',
      show: false,
      datep: new Date(),
      modep: 'datep',
      showp: false,
      date2: new Date(),
      mode2: 'date2',
      show2: false,
      datep2: new Date(),
      modep2: 'datep2',
      showp2: false,
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

      //Variables of collapsibles
      expanded: false,
      expanded2: false,
      expanded3: false,
      expanded4: false,
      expanded5: false,
      expanded6: false,
      expanded7: false,
      expanded8: false,

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

     //Get user variables
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    console.log(userLogin)

    if(this.state.connection_status == true) {
      //Get user profile variables
      let profile = await api.getFamilyinfo(this.state.email,this.state.perm)
      this.setState({ info : profile.data, connection_refreshStatus: false, id: profile.data[0].id_home, idm: profile.data[0].id_m, f_name1 : profile.data[0].f_name1, f_lname1 : profile.data[0].f_lname1, db1 : profile.data[0].db1, gender1 : profile.data[0].gender1, re1 : profile.data[0].re1, db_lawf1 : profile.data[0].db_lawf1, f_name2 : profile.data[0].f_name2, f_lname2 : profile.data[0].f_lname2, db2 : profile.data[0].db2, gender2 : profile.data[0].gender2, re2 : profile.data[0].re2, db_lawf2 : profile.data[0].db_lawf2, f_name3 : profile.data[0].f_name3, f_lname3 : profile.data[0].f_lname3, db3 : profile.data[0].db3, gender3 : profile.data[0].gender3, re3 : profile.data[0].re3, db_lawf3 : profile.data[0].db_lawf3, f_name4 : profile.data[0].f_name4, f_lname4 : profile.data[0].f_lname4, db4 : profile.data[0].db4, gender4 : profile.data[0].gender4, re4 : profile.data[0].re4, db_lawf4 : profile.data[0].db_lawf4, f_name5 : profile.data[0].f_name5, f_lname5 : profile.data[0].f_lname5, db5 : profile.data[0].db5, gender5 : profile.data[0].gender5, re5 : profile.data[0].re5, db_lawf5 : profile.data[0].db_lawf5, f_name6 : profile.data[0].f_name6, f_lname6 : profile.data[0].f_lname6, db6 : profile.data[0].db6, gender6 : profile.data[0].gender6, re6 : profile.data[0].re6, db_lawf6 : profile.data[0].db_lawf6, f_name7 : profile.data[0].f_name7, f_lname7 : profile.data[0].f_lname7, db7 : profile.data[0].db7, gender7 : profile.data[0].gender7, re7 : profile.data[0].re7, db_lawf7 : profile.data[0].db_lawf7, f_name8 : profile.data[0].f_name8, f_lname8 : profile.data[0].f_lname8, db8 : profile.data[0].db8, gender8 : profile.data[0].gender8, re8 : profile.data[0].re8, db_lawf8 : profile.data[0].db_lawf8, occupation_f1 : profile.data[0].occupation_f1, occupation_f2 : profile.data[0].occupation_f2, occupation_f3 : profile.data[0].occupation_f3, occupation_f4 : profile.data[0].occupation_f4, occupation_f5 : profile.data[0].occupation_f5, occupation_f6 : profile.data[0].occupation_f6, occupation_f7 : profile.data[0].occupation_f7, occupation_f8 : profile.data[0].occupation_f8, law : 'Yes', lawf1 : 'Yes', lawf2 : 'Yes', lawf3 : 'Yes', lawf4 : 'Yes', lawf5 : 'Yes', lawf6 : 'Yes', lawf7 : 'Yes', lawf8 : 'Yes', nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law, occupation_m2: profile.data[0].occupation_m, cell: profile.data[0].cell})
      console.log(this.state.info)

      //Variables of collapsibles
      this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false", readyDisplay : true, loading : false})

      if (this.state.f_name1 == 'NULL' && this.state.f_lname1 == 'NULL' && this.state.gender1 == 'NULL' && this.state.db1 == 'NULL' && this.state.re1 == 'NULL' && this.state.db_lawf1 == 'NULL') {
        this.setState({addmember : 'No'})
      } else {
        this.setState({addmember : 'Yes'})
      }
    } else {
      this.setState({connection_refreshStatus: true, readyDisplay : true})
    }

    //Permissions function call to access to the documents of phone
    this.getPermissionAsync();

    this._onFocusListener = this.props.navigation.addListener('focus', () => {
      this.onRefresh()
    });
  }

  //Permissions function to access to the documents of phone
  getPermissionAsync = async () => {
    if (Constants.platform.ios){
        const {status} = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.');
            
        }
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
  }

  refresh = async() => {
      if(this.state.connection_status == true) {
        //Get user variables
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        //Get user profile variables
        let profile = await api.getFamilyinfo(this.state.email,this.state.perm)
        this.setState({ info : profile.data, connection_refreshStatus: false, id: profile.data[0].id_home, idm: profile.data[0].id_m, f_name1 : profile.data[0].f_name1, f_lname1 : profile.data[0].f_lname1, db1 : profile.data[0].db1, gender1 : profile.data[0].gender1, re1 : profile.data[0].re1, db_lawf1 : profile.data[0].db_lawf1, f_name2 : profile.data[0].f_name2, f_lname2 : profile.data[0].f_lname2, db2 : profile.data[0].db2, gender2 : profile.data[0].gender2, re2 : profile.data[0].re2, db_lawf2 : profile.data[0].db_lawf2, f_name3 : profile.data[0].f_name3, f_lname3 : profile.data[0].f_lname3, db3 : profile.data[0].db3, gender3 : profile.data[0].gender3, re3 : profile.data[0].re3, db_lawf3 : profile.data[0].db_lawf3, f_name4 : profile.data[0].f_name4, f_lname4 : profile.data[0].f_lname4, db4 : profile.data[0].db4, gender4 : profile.data[0].gender4, re4 : profile.data[0].re4, db_lawf4 : profile.data[0].db_lawf4, f_name5 : profile.data[0].f_name5, f_lname5 : profile.data[0].f_lname5, db5 : profile.data[0].db5, gender5 : profile.data[0].gender5, re5 : profile.data[0].re5, db_lawf5 : profile.data[0].db_lawf5, f_name6 : profile.data[0].f_name6, f_lname6 : profile.data[0].f_lname6, db6 : profile.data[0].db6, gender6 : profile.data[0].gender6, re6 : profile.data[0].re6, db_lawf6 : profile.data[0].db_lawf6, f_name7 : profile.data[0].f_name7, f_lname7 : profile.data[0].f_lname7, db7 : profile.data[0].db7, gender7 : profile.data[0].gender7, re7 : profile.data[0].re7, db_lawf7 : profile.data[0].db_lawf7, f_name8 : profile.data[0].f_name8, f_lname8 : profile.data[0].f_lname8, db8 : profile.data[0].db8, gender8 : profile.data[0].gender8, re8 : profile.data[0].re8, db_lawf8 : profile.data[0].db_lawf8, occupation_f1 : profile.data[0].occupation_f1, occupation_f2 : profile.data[0].occupation_f2, occupation_f3 : profile.data[0].occupation_f3, occupation_f4 : profile.data[0].occupation_f4, occupation_f5 : profile.data[0].occupation_f5, occupation_f6 : profile.data[0].occupation_f6, occupation_f7 : profile.data[0].occupation_f7, occupation_f8 : profile.data[0].occupation_f8, law : 'Yes', lawf1 : 'Yes', lawf2 : 'Yes', lawf3 : 'Yes', lawf4 : 'Yes', lawf5 : 'Yes', lawf6 : 'Yes', lawf7 : 'Yes', lawf8 : 'Yes', nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law, occupation_m2: profile.data[0].occupation_m, cell: profile.data[0].cell})
        console.log(this.state.info)

        //Variables of collapsibles
        this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false", readyDisplay : true, loading : false})

        if (this.state.f_name1 == 'NULL' && this.state.f_lname1 == 'NULL' && this.state.gender1 == 'NULL' && this.state.db1 == 'NULL' && this.state.re1 == 'NULL' && this.state.db_lawf1 == 'NULL') {
          this.setState({addmember : 'No'})
        } else {
          this.setState({addmember : 'Yes'})
        }
    } else {
        this.setState({connection_refreshStatus: true, readyDisplay : true, loading : false})
    }
  }

  //Group of function to catch the documents from frontend
  _pickImagep = async () => {
    let resultp = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
    });

    console.log(resultp);
    console.log(this.state.email)

    if(!resultp.cancelled) {
        this.setState({
             backfile: resultp.uri,
             namei : resultp.name,
         });


    }
  }

  _pickImage = async () => {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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
        type: "application/pdf",
        copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
          
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

  addmemberButtom = async () => { 
    this.setState({addmember : 'Yes'})
  }

  //Function to call when user submit data to database
  registerbasici = async () => {
    let localUrip = this.state.backfile;
    if (localUrip == null) {} 
    else { this.registerfilep() }
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
    let hname = `${this.state.lnameh}, ${this.state.nameh}`
    api.registerFamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.nameh,this.state.lnameh,this.state.db,this.state.gender,this.state.cell,this.state.occupation_m2,this.state.dblaw,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8, this.state.occupation_f1, this.state.occupation_f2, this.state.occupation_f3, this.state.occupation_f4, this.state.occupation_f5, this.state.occupation_f6, this.state.occupation_f7, this.state.occupation_f8, hname)
  }

  //Group of function to catch files and send to server
  registerfilep = async () => {
    let localUrip = this.state.backfile;

    if (localUrip == null) { this.registerfile1() } 
    else {  
      //Files
      let filenamep = localUrip.split('/').pop();
      let matchp = /\.(\w+)$/.exec(filenamep);
      let typep = matchp ? `image/${matchp[1]}` : `image`;

    
      let dateDocp = new Date()
      let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`

      let formData = new FormData();
      formData.append('backfilep', {uri: localUrip, name: Platform.OS === 'android' ? 'documentbackgroundlawf1'+XDAYp+".pdf" : filenamep, type: Platform.OS === 'android' ? "application/pdf" : typep});
      
      console.log('Comprobante de envio')
      console.log(formData);
      
      

      console.log(JSON.stringify({ email: this.state.email}));

      //Variables
      let email = this.state.email;
      let id = this.state.id;
      let law = this.state.law;

      return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&law=${law}`, {
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
          }
          else {
            Alert.alert('Error with background check file of Main Propietor upload')
          }
        });
    }
  };

  registerfile1 = async () => {
      let localUri = this.state.backfilef1;

      if (localUri == null) { this.registerfile2() } 
      else {  
        //Files
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let dateDoc = new Date()
        let XDAY= dateDoc.getMonth()<9 ? dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef1', {uri: localUri, name: Platform.OS === 'android' ? 'documentbackgroundlawf1'+XDAY+".pdf" : filename, type: Platform.OS === 'android' ? "application/pdf" : type});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc2 = new Date()
        let XDAY2= dateDoc2.getMonth()<9 ? dateDoc2.getDate()<=9 ? `${dateDoc2.getFullYear()}-0${dateDoc2.getMonth() + 1}-0${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : `${dateDoc2.getFullYear()}-0${dateDoc2.getMonth() + 1}-${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : dateDoc2.getDate()<=9 ? `${dateDoc2.getFullYear()}-${dateDoc2.getMonth() + 1}-0${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : `${dateDoc2.getFullYear()}-${dateDoc2.getMonth() + 1}-${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef2', {uri: localUri2, name: Platform.OS === 'android' ? 'documentbackgroundlawf2'+XDAY2+".pdf" : filename2, type: Platform.OS === 'android' ? "application/pdf" : type2});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

      
        let dateDoc3 = new Date()
        let XDAY3= dateDoc3.getMonth()<9 ? dateDoc3.getDate()<=9 ? `${dateDoc3.getFullYear()}-0${dateDoc3.getMonth() + 1}-0${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : `${dateDoc3.getFullYear()}-0${dateDoc3.getMonth() + 1}-${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : dateDoc3.getDate()<=9 ? `${dateDoc3.getFullYear()}-${dateDoc3.getMonth() + 1}-0${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : `${dateDoc3.getFullYear()}-${dateDoc3.getMonth() + 1}-${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef3', {uri: localUri3, name: Platform.OS === 'android' ? 'documentbackgroundlawf3'+XDAY3+".pdf" : filename3, type: Platform.OS === 'android' ? "application/pdf" : type3});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc4 = new Date()
        let XDAY4= dateDoc4.getMonth()<9 ? dateDoc4.getDate()<=9 ? `${dateDoc4.getFullYear()}-0${dateDoc4.getMonth() + 1}-0${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : `${dateDoc4.getFullYear()}-0${dateDoc4.getMonth() + 1}-${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : dateDoc4.getDate()<=9 ? `${dateDoc4.getFullYear()}-${dateDoc4.getMonth() + 1}-0${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : `${dateDoc4.getFullYear()}-${dateDoc4.getMonth() + 1}-${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef4', {uri: localUri4, name: Platform.OS === 'android' ? 'documentbackgroundlawf4'+XDAY4+".pdf" : filename4, type: Platform.OS === 'android' ? "application/pdf" : type4});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc5 = new Date()
        let XDAY5= dateDoc5.getMonth()<9 ? dateDoc5.getDate()<=9 ? `${dateDoc5.getFullYear()}-0${dateDoc5.getMonth() + 1}-0${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : `${dateDoc5.getFullYear()}-0${dateDoc5.getMonth() + 1}-${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : dateDoc5.getDate()<=9 ? `${dateDoc5.getFullYear()}-${dateDoc5.getMonth() + 1}-0${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : `${dateDoc5.getFullYear()}-${dateDoc5.getMonth() + 1}-${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef5', {uri: localUri5, name: Platform.OS === 'android' ? 'documentbackgroundlawf5'+XDAY5+".pdf" : filename5, type: Platform.OS === 'android' ? "application/pdf" : type5});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc6 = new Date()
        let XDAY6= dateDoc6.getMonth()<9 ? dateDoc6.getDate()<=9 ? `${dateDoc6.getFullYear()}-0${dateDoc6.getMonth() + 1}-0${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : `${dateDoc6.getFullYear()}-0${dateDoc6.getMonth() + 1}-${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : dateDoc6.getDate()<=9 ? `${dateDoc6.getFullYear()}-${dateDoc6.getMonth() + 1}-0${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : `${dateDoc6.getFullYear()}-${dateDoc6.getMonth() + 1}-${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef6', {uri: localUri6, name: Platform.OS === 'android' ? 'documentbackgroundlawf6'+XDAY6+".pdf" : filename6, type: Platform.OS === 'android' ? "application/pdf" : type6});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc7 = new Date()
        let XDAY7= dateDoc7.getMonth()<9 ? dateDoc7.getDate()<=9 ? `${dateDoc7.getFullYear()}-0${dateDoc7.getMonth() + 1}-0${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : `${dateDoc7.getFullYear()}-0${dateDoc7.getMonth() + 1}-${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : dateDoc7.getDate()<=9 ? `${dateDoc7.getFullYear()}-${dateDoc7.getMonth() + 1}-0${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : `${dateDoc7.getFullYear()}-${dateDoc7.getMonth() + 1}-${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef7', {uri: localUri7, name: Platform.OS === 'android' ? 'documentbackgroundlawf7'+XDAY7+".pdf" : filename7, type: Platform.OS === 'android' ? "application/pdf" : type7});
        
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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

        let dateDoc8 = new Date()
        let XDAY8= dateDoc8.getMonth()<9 ? dateDoc8.getDate()<=9 ? `${dateDoc8.getFullYear()}-0${dateDoc8.getMonth() + 1}-0${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : `${dateDoc8.getFullYear()}-0${dateDoc8.getMonth() + 1}-${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : dateDoc8.getDate()<=9 ? `${dateDoc8.getFullYear()}-${dateDoc8.getMonth() + 1}-0${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : `${dateDoc8.getFullYear()}-${dateDoc8.getMonth() + 1}-${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilef8', {uri: localUri8, name: Platform.OS === 'android' ? 'documentbackgroundlawf8'+XDAY8+".pdf" : filename8, type: Platform.OS === 'android' ? "application/pdf" : type8});

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
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
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

  setDatep = (event, datep) => {
    datep = datep || this.state.datep;

    this.setState({
      showp: Platform.OS === 'ios' ? true : false,
      datep,
    });

    const dateYp = new Date(datep.setDate(datep.getDate()));
    let YDAYp= dateYp.getMonth()<9 ? dateYp.getDate()<=9 ? `${dateYp.getFullYear()}-0${dateYp.getMonth() + 1}-0${dateYp.getDate()}` : `${dateYp.getFullYear()}-0${dateYp.getMonth() + 1}-${dateYp.getDate()}` : dateYp.getDate()<=9 ? `${dateYp.getFullYear()}-${dateYp.getMonth() + 1}-0${dateYp.getDate()}` : `${dateYp.getFullYear()}-${dateYp.getMonth() + 1}-${dateYp.getDate()}`
    this.setState({db : YDAYp})
    
  }

  closedatepickerIOSp = () => {
    this.setState({
      showp: Platform.OS === 'ios' ? false : false,
    });

  }

  showp = modep => {
    this.setState({
      showp: true,
      modep,
    });
  }

  datepickerp = () => {
    this.showp('date');
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

  setDatep2 = (event, datep2) => {
    datep2 = datep2 || this.state.datep2;

    this.setState({
      showp2: Platform.OS === 'ios' ? true : false,
      datep2,
    });

    const dateYp2 = new Date(datep2.setDate(datep2.getDate()));
    let YDAYp2= dateYp2.getMonth()<9 ? dateYp2.getDate()<=9 ? `${dateYp2.getFullYear()}-0${dateYp2.getMonth() + 1}-0${dateYp2.getDate()}` : `${dateYp2.getFullYear()}-0${dateYp2.getMonth() + 1}-${dateYp2.getDate()}` : dateYp2.getDate()<=9 ? `${dateYp2.getFullYear()}-${dateYp2.getMonth() + 1}-0${dateYp2.getDate()}` : `${dateYp2.getFullYear()}-${dateYp2.getMonth() + 1}-${dateYp2.getDate()}`
    this.setState({dblaw : YDAYp2})
    
  }

  closedatepickerIOSp2 = () => {
    this.setState({
      showp2: Platform.OS === 'ios' ? false : false,
    });

  }

  showp2 = modep2 => {
    this.setState({
      showp2: true,
      modep2,
    });
  }

  datepickerp2 = () => {
    this.showp2('date');
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

    //Variables to get files from frontend
    let { backfile } = this.state;
    let { namei } = this.state;
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

    let { showp, datep, modep } = this.state;
    let { showp2, datep2, modep2 } = this.state;
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
      <NativeBaseProvider>
        <StatusBar style="light" translucent={true} />
        <View>
          {this.state.readyDisplay == false && (
              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                          <View style={globalStyles.skeletonMarginProfileText}>
                              <HStack space="2" alignItems="center">
                                  <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                              </HStack>
                          </View>
                          <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                              <View style={globalStyles.skeletonMarginProfileText}>
                                  <HStack space="2" alignItems="center">
                                      <Skeleton size="5" rounded="full" />
                                      <Skeleton h="3" flex="2" rounded="full" />
                                  </HStack>
                              </View>
                              <Skeleton.Text px="5" />
                              <Skeleton.Text px="5" my="4" />
                              <Skeleton.Text px="5" my="4" />
                          </VStack>
                          <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                      </VStack>
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
                            keyExtractor={item => `${item.info}`}
                            ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                            nestedScrollEnabled={true}
                            bounces={false}
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
                                  <View style={globalStyles.contenido}>
                                    <View style={globalStyles.marginTopRequiredFields}>
                                      <Heading size='xl'style={ globalStyles.titulo }>Family Information</Heading>
                                    </View>

                                    <FormControl>
                                      {/*Propietor Information*/}
                                      <Card>
                                        {(Dimensions.get('window').width < 414) && (
                                          <Stack alignItems="center" width="100%">
                                            <HStack alignItems="center">
                                                <VStack width="90%">
                                                    <View>
                                                      <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>My Information</Heading>
                                                    </View>  
                                                </VStack>
                                                <Center size="12" width="10%">
                                                    <Image
                                                        source={require("../assets/img/editIcons/profile2-64.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconsNativeBase}
                                                    />
                                                </Center>
                                            </HStack>
                                          </Stack>
                                        )}
                                        {(Dimensions.get('window').width >= 414) && (
                                            <Stack alignItems="center">
                                              <HStack alignItems="center">
                                                <Center width="30%">
                                                  <View>
                                                    <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>My Information</Heading>
                                                  </View> 
                                                </Center>
                                                <Center size="12">
                                                  <Image
                                                        source={require("../assets/img/editIcons/profile2-64.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconsNativeBase}
                                                  />
                                                </Center>
                                              </HStack>
                                            </Stack>
                                        )}

                                        <Stack inlineLabel last style={globalStyles.input}>
                                          <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                            <Input 
                                                defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                                onChangeText={ (nameh) => this.setState({nameh}) }
                                                placeholder="e.g. Eva"
                                                style={ globalStyles.inputedit}
                                            />
                                        </Stack>
  
  
                                        <Stack inlineLabel last style={globalStyles.input}>
                                          <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                            <Input 
                                                  defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                                  onChangeText={ (lnameh) => this.setState({lnameh}) }
                                                  placeholder="e.g. Smith"
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
                                                          style={globalStyles.DatesinputRLelements}
                                                          onPress={this.datepickerp}>
                                                          <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                          </TouchableOpacity>
                                                      }
                                                      style={ globalStyles.inputedit}
                                                      placeholder="Message"
                                                      value={this.state.db == 'NULL' ? '' : this.state.db}
                                                      onChangeText={ (db) => this.setState({db}) }
                                                  />
                                              </Stack> 
                                                  
                                            </View>
                                              { showp && Platform.OS != 'ios' && 
                                                <DateTimePicker 
                                                  value={datep}
                                                  mode={modep}
                                                  is24Hour={true}
                                                  display="default"
                                                  onChange={this.setDatep} />
                                              }
                                              { showp && Platform.OS === 'ios' && 
                                                <View>
                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                  <DateTimePicker
                                                    textColor="black"
                                                    value={datep}
                                                    mode={modep}
                                                    is24Hour={true}
                                                    display="spinner"
                                                    onChange={this.setDatep} />

                                                  <TouchableHighlight
                                                  style={globalStyles.StudentopenButtonReply}
                                                  onPress={() => this.closedatepickerIOSp()}>
                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                  </TouchableHighlight>
                                                </View>
                                              }
                                          </View>

                                          </Stack>
                                            <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>
          
                                            <View style={globalStyles.editMargintop}>
                                                <Picker
                                                    style={globalStyles.pickerBasicinfo}
                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepickerp2}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.dblaw == 'NULL' ? '' : this.state.dblaw}
                                                            onChangeText={ (dblaw) => this.setState({dblaw}) }
                                                        />
                                                    </Stack> 
                                                  
                                                  </View>
                                                    { showp2 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
                                                        value={datep2}
                                                        mode={modep2}
                                                        display="default"
                                                        onChange={this.setDatep2} />
                                                    }
                                                    { showp2 && Platform.OS === 'ios' && 
                                                      <View>
                                                        <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                        <DateTimePicker
                                                          textColor="black"
                                                          value={datep2}
                                                          mode={modep2}
                                                          is24Hour={true}
                                                          display="spinner"
                                                          onChange={this.setDatep2} />

                                                        <TouchableHighlight
                                                        style={globalStyles.StudentopenButtonReply}
                                                        onPress={() => this.closedatepickerIOSp2()}>
                                                          <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                        </TouchableHighlight>
                                                      </View>
                                                    }
                                                  </View>
                                            </Stack>
                                             
                                            <Text style={ globalStyles.infotitle}>Background Check</Text>
  
                                            <TouchableOpacity onPress={()=>this._pickImagep()}>
                                                <Card style={globalStyles.shadowbox}>
                                                  <Heading size='md' style={globalStyles.butonfiledit}> Touch to upload file </Heading>
                                                        <View style={ globalStyles.underlinig }/>
                                                            {backfile == undefined ?
                                                            <Text></Text>
                                                            :<Text style={globalStyles.uploadFile}>{namei}</Text>}
                                                </Card>
                                            </TouchableOpacity>
                
                                      </Card>

                                      {/*Member 1 */}

                                      {/*Member 1 */}
  
                                      {this.state.addmember == 'Yes' ?
                                        <View>
                                          <Card>
                                            <Collapse style={globalStyles.show} isExpanded={this.state.expanded} onToggle={(isExpanded)=>this.setState({expanded: isExpanded})}>
                                              <CollapseHeader>
                                                <View>                        
                                                  { this.state.expanded === false ?
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
                                                </View>
                                              </CollapseHeader>
                                              <CollapseBody>
                                                                                           
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                      <Input 
                                                        defaultValue={item.f_name1 == 'NULL' ? '' : item.f_name1}
                                                        onChangeText={ (f_name1) => this.setState({f_name1}) }
                                                        placeholder="e.g. Melissa"
                                                        style={ globalStyles.inputedit}
                                                        />
                                                </Stack>
                                                  
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                      <Input 
                                                          defaultValue={item.f_lname1 == 'NULL' ? '' : item.f_lname1}
                                                          onChangeText={ (f_lname1) => this.setState({f_lname1}) }
                                                          placeholder="e.g. Smith"
                                                          style={ globalStyles.inputedit}
                                                      />
                                                </Stack>
                                                  
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                          <Input
                                                              isReadOnly={true}
                                                              InputRightElement={
                                                                  <TouchableOpacity
                                                                  style={globalStyles.DatesinputRLelements}
                                                                  onPress={this.datepicker}>
                                                                  <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                  </TouchableOpacity>
                                                              }
                                                              style={ globalStyles.inputedit}
                                                              placeholder="Message"
                                                              value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                                              onChangeText={ (db1) => this.setState({db1}) }
                                                          />
                                                      </Stack> 
                                            
                                                    </View>
                                                      { show && Platform.OS != 'ios' && 
                                                        <DateTimePicker 
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
                                                            textColor="black"
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
                                                  
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>
    
                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.gender1 == 'NULL' ? "Select"  : this.state.gender1}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(gender1) => this.setState({gender1})}>
                                                              <Picker.Item label="Select" value="NULL" />
                                                              <Picker.Item label="Male" value="Male" /> 
                                                              <Picker.Item label="Female" value="Female" />
                                                              <Picker.Item label="Private" value="Private" />
                                                      </Picker>
                                                  </View>
                                                                                              
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                    <View style={globalStyles.editMargintop}>
                                                        <Picker
                                                            style={globalStyles.pickerBasicinfo} 
                                                            selectedValue={this.state.re1 == 'NULL' ? "Select"  : this.state.re1}
                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                          <Input
                                                              placeholder="e.g. Lawyer" 
                                                              defaultValue={item.occupation_f1 == 'NULL' ? '' : item.occupation_f1}
                                                              onChangeText={ (occupation_f1) => this.setState({occupation_f1}) }
                                                              style={ globalStyles.inputedit}
                                                          />
                                                    </Stack>
                                                  
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                      <View>
                                                        <View>
                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                              <Input
                                                                  isReadOnly={true}
                                                                  InputRightElement={
                                                                      <TouchableOpacity
                                                                      style={globalStyles.DatesinputRLelements}
                                                                      onPress={this.datepicker2}>
                                                                      <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                      </TouchableOpacity>
                                                                  }
                                                                  style={ globalStyles.inputedit}
                                                                  placeholder="Message"
                                                                  value={this.state.db_lawf1 == 'NULL' ? '' : this.state.db_lawf1}
                                                                  onChangeText={ (db_lawf1) => this.setState({db_lawf1}) }
                                                              />
                                                          </Stack> 
                                                  
                                                        </View>
                                                        { show2 && Platform.OS != 'ios' && 
                                                            <DateTimePicker 
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
                                                              textColor="black"
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
                                                                                        
                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>
                                                  
                                                      <TouchableOpacity onPress={()=>this._pickImage()}>
                                                          <Card style={globalStyles.shadowbox}>
                                                            <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                  <View style={ globalStyles.underlinig }/>
                                                                      {backfilef1 == undefined ?
                                                                      <Text></Text>
                                                                      :<Text style={globalStyles.uploadFile}>{nameif1}</Text>}
                                                          </Card>
                                                      </TouchableOpacity>
                                                                                                      
                                                                                            
                                                  </CollapseBody>
                                                                                    
                                                </Collapse>
                                                                                
                                          </Card>
                                        </View> 
                                      : 
                                        <View></View>
                                      }
                                                  
                                      {/*Member 2 */}
                                                  
                                      {this.state.f_name1 != 'NULL' || this.state.f_lname1 != 'NULL' || this.state.db1 != 'NULL' || this.state.db_lawf1 != 'NULL' || this.state.gender1 != 'NULL' || this.state.re1 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded2} onToggle={(isExpanded)=>this.setState({expanded2: isExpanded})}>
                                            <CollapseHeader>
                                              <View>
                                                { this.state.expanded2 === false ?
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 2{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                  </TouchableOpacity>
                                                :
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        {'       '}Family Member 2{'       '}
                                                        <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                  </TouchableOpacity>
                                                }
                                              </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                                                               
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name2 == 'NULL' ? '' : item.f_name2}
                                                      onChangeText={ (f_name2) => this.setState({f_name2}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>
                                                  
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname2 == 'NULL' ? '' : item.f_lname2}
                                                        onChangeText={ (f_lname2) => this.setState({f_lname2}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>
                                                  
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                <View>
                                                  <View>
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <Input
                                                          isReadOnly={true}
                                                          InputRightElement={
                                                              <TouchableOpacity
                                                              style={globalStyles.DatesinputRLelements}
                                                              onPress={this.datepicker3}>
                                                              <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                              </TouchableOpacity>
                                                          }
                                                          style={ globalStyles.inputedit}
                                                          placeholder="Message"
                                                          value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                                          onChangeText={ (db2) => this.setState({db2}) }
                                                      />
                                                    </Stack> 
                                                      
                                                  </View>
                                                    { show3 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.gender2 == 'NULL' ? "Select"  : this.state.gender2}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(gender2) => this.setState({gender2})}>
                                                            <Picker.Item label="Select" value="NULL" />
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Private" value="Private" />
                                                    </Picker>
                                                </View>
                                              
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.re2 == 'NULL' ? "Select"  : this.state.re2}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                  <Input
                                                      placeholder="e.g. Lawyer" 
                                                      defaultValue={item.occupation_f2 == 'NULL' ? '' : item.occupation_f2}
                                                      onChangeText={ (occupation_f2) => this.setState({occupation_f2}) }
                                                      style={ globalStyles.inputedit}
                                                  />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                <View>
                                                  <View>
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker4}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.db_lawf2 == 'NULL' ? '' : this.state.db_lawf2}
                                                            onChangeText={ (db_lawf2) => this.setState({db_lawf2}) }
                                                        />
                                                    </Stack> 
                                                              
                                                  </View>
                                                    { show4 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                                          
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                <TouchableOpacity onPress={()=>this._pickImage2()}>
                                                    <Card style={globalStyles.shadowbox}>
                                                      <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                            <View style={ globalStyles.underlinig }/>
                                                                {backfilef2 == undefined ?
                                                                <Text></Text>
                                                                :<Text style={globalStyles.uploadFile}>{nameif2}</Text>}
                                                    </Card>
                                                </TouchableOpacity>
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                                                                        
                                      }
                                                  
                                      {/*Member 3 */}
                                                  
                                      {this.state.f_name2 != 'NULL' || this.state.f_lname2 != 'NULL' || this.state.db2 != 'NULL' || this.state.db_lawf2 != 'NULL' || this.state.gender2 != 'NULL' || this.state.re2 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded3} onToggle={(isExpanded)=>this.setState({expanded3: isExpanded})}>
                                            <CollapseHeader>
                                              <View>
                                                { this.state.expanded3 === false ?
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 3{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                  </TouchableOpacity>
                                                :
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 3{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                  </TouchableOpacity>
                                                }
                                              </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                                                              
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name3 == 'NULL' ? '' : item.f_name3}
                                                      onChangeText={ (f_name3) => this.setState({f_name3}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname3 == 'NULL' ? '' : item.f_lname3}
                                                        onChangeText={ (f_lname3) => this.setState({f_lname3}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                          <Input
                                                              isReadOnly={true}
                                                              InputRightElement={
                                                                  <TouchableOpacity
                                                                  style={globalStyles.DatesinputRLelements}
                                                                  onPress={this.datepicker5}>
                                                                  <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                  </TouchableOpacity>
                                                              }
                                                              style={ globalStyles.inputedit}
                                                              placeholder="Message"
                                                              value={this.state.db3 == 'NULL' ? '' : this.state.db3}
                                                              onChangeText={ (db3) => this.setState({db3}) }
                                                          />
                                                      </Stack> 
                                                      
                                                    </View>
                                                    { show5 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.gender3 == 'NULL' ? "Select"  : this.state.gender3}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(gender3) => this.setState({gender3})}>
                                                              <Picker.Item label="Select" value="NULL" />
                                                              <Picker.Item label="Male" value="Male" /> 
                                                              <Picker.Item label="Female" value="Female" />
                                                              <Picker.Item label="Private" value="Private" />
                                                      </Picker>
                                                  </View>
                                              
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.re3 == 'NULL' ? "Select"  : this.state.re3}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                      <Input
                                                          placeholder="e.g. Lawyer" 
                                                          defaultValue={item.occupation_f3 == 'NULL' ? '' : item.occupation_f3}
                                                          onChangeText={ (occupation_f3) => this.setState({occupation_f3}) }
                                                          style={ globalStyles.inputedit}
                                                      />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                          <Input
                                                              isReadOnly={true}
                                                              InputRightElement={
                                                                  <TouchableOpacity
                                                                  style={globalStyles.DatesinputRLelements}
                                                                  onPress={this.datepicker6}>
                                                                  <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                  </TouchableOpacity>
                                                              }
                                                              style={ globalStyles.inputedit}
                                                              placeholder="Message"
                                                              value={this.state.db_lawf3 == 'NULL' ? '' : this.state.db_lawf3}
                                                              onChangeText={ (db_lawf3) => this.setState({db_lawf3}) }
                                                          />
                                                      </Stack> 
                                              
                                                    </View>
                                                    { show6 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                            textColor="black"
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

                                                            
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                  <TouchableOpacity onPress={()=>this._pickImage3()}>
                                                    <Card style={globalStyles.shadowbox}>
                                                      <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                            <View style={ globalStyles.underlinig }/>
                                                                {backfilef3 == undefined ?
                                                                <Text></Text>
                                                                :<Text style={globalStyles.uploadFile}>{nameif3}</Text>}
                                                    </Card>
                                                  </TouchableOpacity>
                                                                                                        
                                                                                              
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                      }
                                                  
                                      {/*Member 4 */}
                                                  
                                      {this.state.f_name3 != 'NULL' || this.state.f_lname3 != 'NULL' || this.state.db3 != 'NULL' || this.state.db_lawf3 != 'NULL' || this.state.gender3 != 'NULL' || this.state.re3 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded4} onToggle={(isExpanded)=>this.setState({expanded4: isExpanded})}>
                                            <CollapseHeader>
                                                <View>
                                                  { this.state.expanded4 === false ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                              {'       '}Family Member 4{'       '}
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                    </TouchableOpacity>
                                                  :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 4{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                    </TouchableOpacity>
                                                  }
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>                                                 
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name4 == 'NULL' ? '' : item.f_name4}
                                                      onChangeText={ (f_name4) => this.setState({f_name4}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname4 == 'NULL' ? '' : item.f_lname4}
                                                        onChangeText={ (f_lname4) => this.setState({f_lname4}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                          <Input
                                                              isReadOnly={true}
                                                              InputRightElement={
                                                                  <TouchableOpacity
                                                                  style={globalStyles.DatesinputRLelements}
                                                                  onPress={this.datepicker7}>
                                                                  <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                  </TouchableOpacity>
                                                              }
                                                              style={ globalStyles.inputedit}
                                                              placeholder="Message"
                                                              value={this.state.db4 == 'NULL' ? '' : this.state.db4}
                                                              onChangeText={ (db4) => this.setState({db4}) }
                                                          />
                                                      </Stack> 
                                                    
                                                    </View>
                                                    { show7 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.gender4 == 'NULL' ? "Select"  : this.state.gender4}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(gender4) => this.setState({gender4})}>
                                                            <Picker.Item label="Select" value="NULL" />
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Private" value="Private" />
                                                    </Picker>
                                                </View>
                                              
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.re4 == 'NULL' ? "Select"  : this.state.re4}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                        <Input
                                                            placeholder="e.g. Lawyer" 
                                                            defaultValue={item.occupation_f4 == 'NULL' ? '' : item.occupation_f4}
                                                            onChangeText={ (occupation_f4) => this.setState({occupation_f4}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                  </Stack>

                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                            <View>
                                                              <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                  <Input
                                                                      isReadOnly={true}
                                                                      InputRightElement={
                                                                          <TouchableOpacity
                                                                          style={globalStyles.DatesinputRLelements}
                                                                          onPress={this.datepicker8}>
                                                                          <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                          </TouchableOpacity>
                                                                      }
                                                                      style={ globalStyles.inputedit}
                                                                      placeholder="Message"
                                                                      value={this.state.db_lawf4 == 'NULL' ? '' : this.state.db_lawf4}
                                                                      onChangeText={ (db_lawf4) => this.setState({db_lawf4}) }
                                                                  />
                                                                </Stack> 
                                                                
                                                              </View>
                                                                { show8 && Platform.OS != 'ios' && 
                                                                  <DateTimePicker 
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
                                                                        textColor="black"
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

                                                          
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                          <TouchableOpacity onPress={()=>this._pickImage4()}>
                                                              <Card style={globalStyles.shadowbox}>
                                                                <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                      <View style={ globalStyles.underlinig }/>
                                                                          {backfilef4 == undefined ?
                                                                          <Text></Text>
                                                                          :<Text style={globalStyles.uploadFile}>{nameif4}</Text>}
                                                              </Card>
                                                          </TouchableOpacity>
                                                                                                            
                                                                                             
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                      }
                                                  
                                      {/*Member 5 */}
                                                  
                                      {this.state.f_name4 != 'NULL' || this.state.f_lname4 != 'NULL' || this.state.db4 != 'NULL' || this.state.db_lawf4 != 'NULL' || this.state.gender4 != 'NULL' || this.state.re4 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded5} onToggle={(isExpanded)=>this.setState({expanded5: isExpanded})}>
                                            <CollapseHeader>
                                              <View>
                                                { this.state.expanded5 === false ?
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 5{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                  </TouchableOpacity>
                                                :
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 5{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                  </TouchableOpacity>
                                                }
                                              </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                                                                     
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name5 == 'NULL' ? '' : item.f_name5}
                                                      onChangeText={ (f_name5) => this.setState({f_name5}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname5 == 'NULL' ? '' : item.f_lname5}
                                                        onChangeText={ (f_lname5) => this.setState({f_lname5}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                <View>
                                                  <View>
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker9}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.db5 == 'NULL' ? '' : this.state.db5}
                                                            onChangeText={ (db5) => this.setState({db5}) }
                                                        />
                                                    </Stack> 
                                                
                                                  </View>
                                                  { show9 && Platform.OS != 'ios' && 
                                                    <DateTimePicker 
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
                                                        textColor="black"
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

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.gender5 == 'NULL' ? "Select"  : this.state.gender5}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(gender5) => this.setState({gender5})}>
                                                            <Picker.Item label="Select" value="NULL" />
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Private" value="Private" />
                                                    </Picker>
                                                </View>
                                              
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.re5 == 'NULL' ? "Select"  : this.state.re5}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                        <Input
                                                            placeholder="e.g. Lawyer" 
                                                            defaultValue={item.occupation_f5 == 'NULL' ? '' : item.occupation_f5}
                                                            onChangeText={ (occupation_f5) => this.setState({occupation_f5}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                  </Stack>

                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                    <View>
                                                      <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.DatesinputRLelements}
                                                                    onPress={this.datepicker10}>
                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db_lawf5 == 'NULL' ? '' : this.state.db_lawf5}
                                                                onChangeText={ (db_lawf5) => this.setState({db_lawf5}) }
                                                            />
                                                        </Stack> 
                                                      
                                                      </View>
                                                      { show10 && Platform.OS != 'ios' && 
                                                        <DateTimePicker 
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
                                                            textColor="black"
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

                                                          
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                    <TouchableOpacity onPress={()=>this._pickImage5()}>
                                                      <Card style={globalStyles.shadowbox}>
                                                        <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                              <View style={ globalStyles.underlinig }/>
                                                                  {backfilef5 == undefined ?
                                                                  <Text></Text>
                                                                  :<Text style={globalStyles.uploadFile}>{nameif5}</Text>}
                                                      </Card>
                                                    </TouchableOpacity>
  
                                                                              
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                      }
                                                  
                                      {/*Member 6 */}
                                                  
                                      {this.state.f_name5 != 'NULL' || this.state.f_lname5 != 'NULL' || this.state.db5 != 'NULL' || this.state.db_lawf5 != 'NULL' || this.state.gender5 != 'NULL' || this.state.re5 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded6} onToggle={(isExpanded)=>this.setState({expanded6: isExpanded})}>
                                            <CollapseHeader>
                                              <View>
                                                { this.state.expanded6 === false ?
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                    <Text style={globalStyles.buttonTextroom}>
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 6{'       '}
                                                        <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    </Text>
                                                  </TouchableOpacity>
                                                :
                                                  <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 6{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                  </TouchableOpacity>
                                                }
                                              </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                             
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name6 == 'NULL' ? '' : item.f_name6}
                                                      onChangeText={ (f_name6) => this.setState({f_name6}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname6 == 'NULL' ? '' : item.f_lname6}
                                                        onChangeText={ (f_lname6) => this.setState({f_lname6}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker11}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.db6 == 'NULL' ? '' : this.state.db6}
                                                            onChangeText={ (db6) => this.setState({db6}) }
                                                        />
                                                      </Stack> 
                                                
                                                    </View>
                                                    { show11 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo} 
                                                      selectedValue={this.state.gender6 == 'NULL' ? "Select"  : this.state.gender6}
                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                      onValueChange={(gender6) => this.setState({gender6})}>
                                                          <Picker.Item label="Select" value="NULL" />
                                                          <Picker.Item label="Male" value="Male" /> 
                                                          <Picker.Item label="Female" value="Female" />
                                                          <Picker.Item label="Private" value="Private" />
                                                  </Picker>
                                              </View>
                                              
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo} 
                                                      selectedValue={this.state.re6 == 'NULL' ? "Select"  : this.state.re6}
                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                    <Input
                                                        placeholder="e.g. Lawyer" 
                                                        defaultValue={item.occupation_f6 == 'NULL' ? '' : item.occupation_f6}
                                                        onChangeText={ (occupation_f6) => this.setState({occupation_f6}) }
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                <View>
                                                                    <View>
                                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                                            <Input
                                                                                isReadOnly={true}
                                                                                InputRightElement={
                                                                                    <TouchableOpacity
                                                                                    style={globalStyles.DatesinputRLelements}
                                                                                    onPress={this.datepicker12}>
                                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                    </TouchableOpacity>
                                                                                }
                                                                                style={ globalStyles.inputedit}
                                                                                placeholder="Message"
                                                                                value={this.state.db_lawf6 == 'NULL' ? '' : this.state.db_lawf6}
                                                                                onChangeText={ (db_lawf6) => this.setState({db_lawf6}) }
                                                                            />
                                                                        </Stack> 
                                                                
                                                                      </View>
                                                                      { show12 && Platform.OS != 'ios' && 
                                                                        <DateTimePicker 
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
                                                                            textColor="black"
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

                                                          
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                          <TouchableOpacity onPress={()=>this._pickImage6()}>
                                                              <Card style={globalStyles.shadowbox}>
                                                                <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                      <View style={ globalStyles.underlinig }/>
                                                                          {backfilef6 == undefined ?
                                                                          <Text></Text>
                                                                          :<Text style={globalStyles.uploadFile}>{nameif6}</Text>}
                                                              </Card>
                                                          </TouchableOpacity>
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                        
                                      }

                                      {/*Member 7 */}
                                      {this.state.f_name6 != 'NULL' || this.state.f_lname6 != 'NULL' || this.state.db6 != 'NULL' || this.state.db_lawf6 != 'NULL' || this.state.gender6 != 'NULL' || this.state.re6 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded7} onToggle={(isExpanded)=>this.setState({expanded7: isExpanded})}>
                                            <CollapseHeader>
                                                <View>
                                                  { this.state.expanded7 === false ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                              {'       '}Family Member 7{'       '}
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                    </TouchableOpacity>
                                                  :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                          {'       '}Family Member 7{'       '}
                                                          <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                    </TouchableOpacity>
                                                  }
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>                                                  
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name7 == 'NULL' ? '' : item.f_name7}
                                                      onChangeText={ (f_name7) => this.setState({f_name7}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname7 == 'NULL' ? '' : item.f_lname7}
                                                        onChangeText={ (f_lname7) => this.setState({f_lname7}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                <View>
                                                  <View>
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                      <Input
                                                          isReadOnly={true}
                                                          InputRightElement={
                                                              <TouchableOpacity
                                                              style={globalStyles.DatesinputRLelements}
                                                              onPress={this.datepicker13}>
                                                              <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                              </TouchableOpacity>
                                                          }
                                                          style={ globalStyles.inputedit}
                                                          placeholder="Message"
                                                          value={this.state.db7 == 'NULL' ? '' : this.state.db7}
                                                          onChangeText={ (db7) => this.setState({db7}) }
                                                      />
                                                    </Stack> 
                                              
                                                    </View>
                                                      { show13 && Platform.OS != 'ios' && 
                                                        <DateTimePicker 
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
                                                            textColor="black"
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
                                                  

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo} 
                                                      selectedValue={this.state.gender7 == 'NULL' ? "Select"  : this.state.gender7}
                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                      onValueChange={(gender7) => this.setState({gender7})}>
                                                          <Picker.Item label="Select" value="NULL" />
                                                          <Picker.Item label="Male" value="Male" /> 
                                                          <Picker.Item label="Female" value="Female" />
                                                          <Picker.Item label="Private" value="Private" />
                                                  </Picker>
                                                </View>
                                              
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.re7 == 'NULL' ? "Select"  : this.state.re7}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                        <Input
                                                            placeholder="e.g. Lawyer" 
                                                            defaultValue={item.occupation_f7 == 'NULL' ? '' : item.occupation_f7}
                                                            onChangeText={ (occupation_f7) => this.setState({occupation_f7}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                  </Stack>

                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                            <View>
                                                              <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                  <Input
                                                                      isReadOnly={true}
                                                                      InputRightElement={
                                                                          <TouchableOpacity
                                                                          style={globalStyles.DatesinputRLelements}
                                                                          onPress={this.datepicker14}>
                                                                          <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                          </TouchableOpacity>
                                                                      }
                                                                      style={ globalStyles.inputedit}
                                                                      placeholder="Message"
                                                                      value={this.state.db_lawf7 == 'NULL' ? '' : this.state.db_lawf7}
                                                                      onChangeText={ (db_lawf7) => this.setState({db_lawf7}) }
                                                                  />
                                                                </Stack> 
                                                              
                                                              </View>
                                                              { show14 && Platform.OS != 'ios' && 
                                                                <DateTimePicker 
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
                                                                      textColor="black"
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

                                                          
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                        <TouchableOpacity onPress={()=>this._pickImage7()}>
                                                            <Card style={globalStyles.shadowbox}>
                                                              <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                    <View style={ globalStyles.underlinig }/>
                                                                        {backfilef7 == undefined ?
                                                                        <Text></Text>
                                                                        :<Text style={globalStyles.uploadFile}>{nameif7}</Text>}
                                                            </Card>
                                                        </TouchableOpacity>
                                                                                                                  
                                                                                                        
                                                                              
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                      }
                                                  
                                                  
                                      {/*Member 8 */}
                                                  
                                      {this.state.f_name7 != 'NULL' || this.state.f_lname7 != 'NULL' || this.state.db7 != 'NULL' || this.state.db_lawf7 != 'NULL' || this.state.gender7 != 'NULL' || this.state.re7 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded8} onToggle={(isExpanded)=>this.setState({expanded8: isExpanded})}>
                                            <CollapseHeader>
                                                <View>
                                                  { this.state.expanded8 === false ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                                      <Text style={globalStyles.buttonTextroom}>
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                              {'       '}Family Member 8{'       '}
                                                          <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                      </Text>
                                                    </TouchableOpacity>
                                                  :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                            {'       '}Family Member 8{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                  }
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                                                                         
                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name8 == 'NULL' ? '' : item.f_name8}
                                                      onChangeText={ (f_name8) => this.setState({f_name8}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname8 == 'NULL' ? '' : item.f_lname8}
                                                        onChangeText={ (f_lname8) => this.setState({f_lname8}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker15}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.db8 == 'NULL' ? '' : this.state.db8}
                                                            onChangeText={ (db8) => this.setState({db8}) }
                                                        />
                                                      </Stack> 
                                          
                                                    </View>
                                                    { show15 && Platform.OS != 'ios' && 
                                                      <DateTimePicker 
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
                                                          textColor="black"
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

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.gender8 == 'NULL' ? "Select"  : this.state.gender8}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(gender8) => this.setState({gender8})}>
                                                            <Picker.Item label="Select" value="NULL" />
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Private" value="Private" />
                                                    </Picker>
                                                </View>
                                              
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.re8 == 'NULL' ? "Select"  : this.state.re8}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
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
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                    <Input
                                                        placeholder="e.g. Lawyer" 
                                                        defaultValue={item.occupation_f8 == 'NULL' ? '' : item.occupation_f8}
                                                        onChangeText={ (occupation_f8) => this.setState({occupation_f8}) }
                                                        style={ globalStyles.inputedit}
                                                    />
                                              </Stack>

                                              <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                  <View>
                                                    <View>
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker16}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.db_lawf8 == 'NULL' ? '' : this.state.db_lawf8}
                                                            onChangeText={ (db_lawf8) => this.setState({db_lawf8}) }
                                                        />
                                                      </Stack> 
                                                    
                                                      </View>
                                                        { show16 && Platform.OS != 'ios' && 
                                                          <DateTimePicker 
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
                                                                textColor="black"
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

                                                        
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                <TouchableOpacity onPress={()=>this._pickImage8()}>
                                                    <Card style={globalStyles.shadowbox}>
                                                      <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                            <View style={ globalStyles.underlinig }/>
                                                                {backfilef8 == undefined ?
                                                                <Text></Text>
                                                                :<Text style={globalStyles.uploadFile}>{nameif8}</Text>}
                                                    </Card>
                                                </TouchableOpacity>
                                                                                                                    
                                                                                                           
                                                                              
                                            </CollapseBody>
                                                                                    
                                          </Collapse>
                                        </Card>
                                      :
                                        <View></View>
                                      }

                                      {this.state.f_name1 == 'NULL' && this.state.f_lname1 == 'NULL' && this.state.db1 == 'NULL' && this.state.db_lawf1 == 'NULL' && this.state.gender1 == 'NULL' && this.state.re1 == 'NULL' && this.state.addmember != 'Yes' ?
                                        <Button
                                        success
                                        bordered
                                        onPress={this.addmemberButtom}
                                        style={globalStyles.botonedit}
                                        >

                                            <Text style={globalStyles.botonTexto}> + Add a Member</Text>
                                        </Button>
                                      :
                                      this.state.connection_status ?
                                        <View>
                                            <Button
                                            success
                                            bordered
                                            onPress={this.registerbasici}
                                            style={globalStyles.botonedit}
                                            >

                                                <Text style={globalStyles.botonTexto}> Submit </Text>
                                            </Button>
                                        </View> 
                                      :
                                        <View >
                                          <Button
                                            success
                                            bordered
                                            onPress={() => this.noInternetConnection()}
                                            style={globalStyles.botonedit}
                                            >

                                              <Text style={globalStyles.botonTexto}> Submit </Text>
                                          </Button>
                                        </View> 
                                      }                           
                                    </FormControl>
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