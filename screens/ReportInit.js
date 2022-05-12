import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl, Modal, TouchableHighlight, Alert, Platform } from 'react-native'
import { NativeBaseProvider, Text, Spinner, Heading, FormControl, Input, Stack } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';

import globalStyles from '../styles/global';

import {Picker} from '@react-native-picker/picker';

import { StatusBar } from 'expo-status-bar';

export default class Reports extends Component {

    constructor(props){
		super(props);
		this.state = {
          //Variables
		  email : '',
		  perm : false,
		  info : [],
          refreshing: false,

          modalVisible : false, 
		  setModalVisible : false,

          imagereport: 'NULL',
          photo1 : 'yes',

          des : '',
          report : ''
		}
	  }

	  async componentDidMount(){
		//Refresh function when open this screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });
        
        //Get profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        //console.log(userLogin)

        //Get Reports list
		let reportslist = await api.getStudentoreport(this.state.email)
		this.setState({ info : reportslist, loading : false, name_h: reportslist[0].data.name, l_name_h: reportslist[0].data.l_name})
        console.log("nuevo")
        console.log(this.state.info)

        //Variables of modal
		this.setState({modalVisible : false, setModalVisible : false})

        //Permissions function call
        this.getPermissionAsync();
	  }

      //Permissions function to access to the gallery in the phone
	   getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

	  //Refresh call function
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        //Refresh function
        refresh = async() => {
            //Get profile
            let userLogin = await AsyncStorage.getItem('userLogin')
		    userLogin = JSON.parse(userLogin)
		    this.setState({ email : userLogin.email, perm : userLogin.perm})

            //console.log(userLogin)
            
            //Get report list
            let reportslist = await api.getStudentoreport(this.state.email)
            this.setState({ info : reportslist, loading : false, name_h: reportslist[0].data.name, l_name_h: reportslist[0].data.l_name})
            console.log("nuevo")
            console.log(this.state.info)

            //Variables of modal
		    this.setState({modalVisible : false, setModalVisible : false})
          }

          //Function to get report id and take to the screen for that report feedback
		  feedback = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('ReportFeedback')
		}

        InitReport = async () => {
            //this.props.navigation.navigate('ReportInit')
        }

        //Open modal function
		  modalopen = async() => {
            this.setState({modalVisible : true, setModalVisible : true})
        }

        //Close modal function
        modalclose = async() => {
          this.setState({modalVisible : false, setModalVisible : false})
        }

        modalnotify = async () => {
            let email = this.state.email
            let mail = this.state.mail

            console.log(this.state.email, this.state.mail)
    
            //Api of user duplicated validation
            return await fetch(`https://homebor.com/verifyreportapp.php?email=${email}&mail=${mail}`, {
                    method: 'POST',
                    header: {
                        'Content-Type': 'multipart/form-data'
                    },
                  }).then(res => res.json())
                    .catch(error => console.error('Error', error))
                    .then(response => {
                      if (response.status == 1) {
                        Alert.alert(`${this.state.name_s} ${this.state.l_name_s} already has an active report`)
                      }
                      else {
                        this.initReport()
                      }
                    });
        }

        initReport = async() => {
			let localUri = this.state.imagereport;
            if (this.state.des == '' && this.state.report == '' && this.state.imagereport == 'NULL'){
                Alert.alert('All fields are required')
            }else{
                if (localUri == 'NULL') {
                    console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
                    api.reportStudent(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
                    this.setState({modalVisible : false, setModalVisible : false})
                    this.props.navigation.navigate('Reports')
                } else {
                    this.registerfile1() 
                    this.setState({modalVisible : false, setModalVisible : false})
                    this.props.navigation.navigate('Reports')
                }
            }
		  }

          _AlertReport = async () => { 
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
					imagereport: result.uri
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
					imagereport: result.uri
				});


			}
		}

		//Functions to register the images to database
		registerfile1 = async () => {
        
			let localUri = this.state.imagereport;
	
			  //Files
			  let filename = localUri.split('/').pop();
			  let match = /\.(\w+)$/.exec(filename);
			  let type = match ? `image/${match[1]}` : `image`;
	
			
	
			  let formData = new FormData();
			  formData.append('photo', { uri: localUri, name: filename, type: type });
	
			  console.log('Comprobante de envio')
			  console.log(formData);
			  
			  
	
			  console.log(JSON.stringify({ email: this.state.email}));
	
			  //Variables
			  let des = this.state.des
			  let eMail = this.state.email;
			  let idnoti = this.state.idnoti;
			  let name_h = this.state.name_h; 
			  let l_name_h = this.state.l_name_h;
			  let managermail = this.state.managermail;
			  let agency = this.state.agency;
			  let mail = this.state.mail;
			  let report = this.state.report;
			  let bedrooms = this.state.bedrooms;
			  let photo1 = this.state.photo1;
	
			  console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
	
			  return await fetch(`https://homebor.com/reportstudentapp.php?name_h=${name_h}&l_name_h=${l_name_h}&email=${eMail}&managermail=${managermail}&agency=${agency}&mail=${mail}&des=${des}&idnoti=${idnoti}&report=${report}&bedrooms=${bedrooms}&photo1=${photo1}`, {
				method: 'POST',
				body: formData,
				header: {
					'Content-Type': 'multipart/form-data'
				},
			  }).then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
				  if (response.status == 1) {
					console.log('Succesfully')
				  }
				  else {
					console.log('Error')
				  }
				});
		};

  render() {

    let modalVisible = this.state.modalVisible;
	let setModalVisible = this.state.setModalVisible;
    let { imagereport } = this.state;
    
  return (
    <View style={globalStyles.container}>
        <ImageBackground source={require('../assets/BackgroundCrearCuentaHomebor.jpg')} style={globalStyles.ImageBackgroundNoti}>
            <NativeBaseProvider>
                <StatusBar style="light" />
            
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
                            <ScrollView nestedScrollEnabled={true}>
                                {!item.studentslist ? <View><Card><Text style={globalStyles.NotiDont}>You do not have students to report</Text></Card></View> 
                                    :
                                    item.studentslist.map((studentslist) =>
                                     
                                        <View key={studentslist.id}>
                                            <TouchableOpacity key={studentslist.id} onPress={ () =>this.modalopen(
                                                    this.setState({mail : studentslist.user_i_mail, idnoti : studentslist.id_not, agency : studentslist.agency, managermail : studentslist.managermail, name_s : studentslist.name_s, l_name_s : studentslist.l_name_s}, console.log(this.state.mail), console.log(this.state.idnoti), console.log(this.state.agency), console.log(this.state.managermail), console.log(this.state.name_s), console.log(this.state.l_name_s)))}> 
                                                <Card>
                                                    <View style={globalStyles.notiDate}>
                                                        
                                                            <View style={globalStyles.inlineDataReportInit}>
                                                                <Text style={globalStyles.ReportInitBoldText}>{!studentslist.name_s ? null : studentslist.name_s} {!studentslist.l_name_s ? null : studentslist.l_name_s}</Text>
                                                            </View>
                                                            <View style={globalStyles.inlineDataReportInit}>
                                                                <Text style={globalStyles.ReportInitBoldText}>Room Occupied: </Text>
                                                                <Text style={globalStyles.textReports}>{!studentslist.room ? null : studentslist.room}</Text>
                                                            </View>
                                                            <Image                     
                                                                resizeMode="cover"
                                                                source={{ uri: `http://homebor.com/${studentslist.photo}` }}
                                                                style={ globalStyles.ReportInitimageNoti }
                                                            ></Image>
                                                    </View>
                                                </Card>
                                            </TouchableOpacity>  
                                        </View>
                                )
                                }
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    }}>
                                    <View style={globalStyles.centeredViewModal}>
                                    <View style={globalStyles.modalView}>
                                        <Text style={globalStyles.titleModalR}>Report Details</Text>
                                        <FormControl>
                                            <View style={globalStyles.pickerviewModalR}>
                                                <Picker
                                                    style={globalStyles.pickerModalR}
                                                    itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 15}}
                                                    selectedValue={this.state.report == 'NULL' ? "Report Tilte" : this.state.report}
                                                    onValueChange={(report) => this.setState({report})}>
                                                        <Picker.Item label="Report Tilte" value="Male" />
                                                        <Picker.Item label="Cancel Reservation" value="Cancel Reservation" /> 
                                                        <Picker.Item label="Report Situation" value="Report Situation"/>
                                                </Picker>
                                            </View>
                                            <Stack >
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                    <Input
                                                                placeholder="Describe the problem. No special characters"
                                                                multiline={true}
                                                                numberOfLines={4} 
                                                                onChangeText={ (des) => this.setState({des}) }
                                                                style={ globalStyles.inputedit}
                                                                
                                                            />
                                                </Stack>
                                            </Stack>

                                            <View style={globalStyles.buttonsreport}>
                                                <TouchableOpacity onPress={()=>this._AlertReport()}>
                                                    <Card style={globalStyles.shadowbox}>
                                                        <Heading size='md' style={globalStyles.butonfiledit}> Add Report Image</Heading>
                                                            <View style={ globalStyles.underlinig }/>
                                                                {imagereport == 'NULL' ?
                                                                <Text></Text>
                                                                :<Image source={{uri: imagereport}}
                                                                style={globalStyles.ImageReportInit} />}
                                                    </Card>
                                                </TouchableOpacity>
                                            </View>
                                        </FormControl>
                                        
                                            <TouchableHighlight
                                            style={{ ...globalStyles.cancelModalR }}
                                            onPress={() => this.modalclose()}>
                                            <Text style={globalStyles.textStyleModal}>Cancel</Text>
                                            </TouchableHighlight>
                                            
                                            <TouchableHighlight
                                            style={{ ...globalStyles.notifyModalR }}
                                            onPress={() => this.modalnotify()}>
                                            <Text style={globalStyles.textStyleModal}>Notify</Text>
                                            </TouchableHighlight>
                                    </View>
                                    </View>
                                    

                                </Modal>
                                
						</ScrollView>
                          
                    
                )}> 
                </FlatList>
               
            </NativeBaseProvider>
        </ImageBackground>
    </View>
    
  );
}
}