import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, RefreshControl, Modal, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import { NativeBaseProvider, Text, Spinner, Heading, Button, Item, FormControl, Input, Stack, Icon } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

export default class Studentinfo extends Component {

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
		  loading : true, 

		  imagereport: 'NULL',
          photo1 : 'yes'
		}
	  }
	
	  async componentDidMount(){

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });

		//Get profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)

		//Get student data from id noti
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

		//Get student data
        let student = await api.getStudentnot(this.state.idnoti)
		this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name})
		console.log(this.state.info)

		//Variables of modal
		this.setState({modalVisible : false, setModalVisible : false})


		//Variables to report student
		let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
		this.setState({ reportstatus : studentreportstatus.data})
		console.log(this.state.reportstatus)
		
		//If the status state of report doesn't exist them the user will made the report
		if(!this.state.reportstatus.length){
			this.setState({ statusre : 'null'})
			console.log('hola')
			console.log(this.state.statusre)
		}else{
			//If the status state of report does exist them the user will not made the report
			this.setState({ statusre : studentreportstatus.data[0].status})
			console.log('chao')
			console.log(this.state.statusre)
		}

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
			//Get user profile
            let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})
			//console.log(userLogin)

			//Get student data from id noti
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			//Get student data
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name})
			console.log(this.state.info)

			//Variables of modal
			this.setState({modalVisible : false, setModalVisible : false})

			//Variables of report
			let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
			this.setState({ reportstatus : studentreportstatus.data})
			console.log(this.state.reportstatus)
			
			//If the status state of report doesn't exist them the user will made the report
			if(!this.state.reportstatus.length){
				this.setState({ statusre : 'null'})
				console.log('hola')
				console.log(this.state.statusre)
			}else{
				//If the status state of report does exist them the user will not made the report
				this.setState({ statusre : studentreportstatus.data[0].status})
				console.log('chao')
				console.log(this.state.statusre)
			}
            
    	}

		  //Go back function
		  back = async() => {
			this.props.navigation.navigate('Notification')
		  }

		  //Open modal function
		  modalopen = async() => {
			  this.setState({modalVisible : true, setModalVisible : true})
		  }

		  //Close modal function
		  modalclose = async() => {
			this.setState({modalVisible : false, setModalVisible : false})
		  }

		  //Report student function
		  modalnotify = async() => {
			let localUri = this.state.imagereport;
			if (localUri == 'NULL') {
				console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
				api.reportStudent(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
				this.setState({modalVisible : false, setModalVisible : false})
				this.props.navigation.navigate('Notification')
            } else {
				this.registerfile1() 
                this.setState({modalVisible : false, setModalVisible : false})
                this.props.navigation.navigate('Notification')
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
      //Variables
		let modalVisible = this.state.modalVisible;
		let setModalVisible = this.state.setModalVisible;
		let statusre = this.state.statusre;
		let { imagereport } = this.state;
    
  return (
	<NativeBaseProvider>
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
            size={RefreshControl.SIZE.LARGE}
        />
        }
        renderItem={({item}) => (
				<View>
                <ScrollView nestedScrollEnabled={true} >
                    <View>
                        <ImageBackground source={{ uri: `http://homebor.com/${item.photo_a}` }} style={item.photo_a == "NULL" ? globalStyles.hide : globalStyles.profileBanner}>
                            <Image
                                style={globalStyles.profileBannerStudent}>
                            </Image>
                        </ImageBackground>

                        <View style={ globalStyles.profileMargins}>
							<Image
								source={{ uri: `http://homebor.com/${item.photo_s}` }}
								resizeMode="contain"
								style={item.photo_s == "NULL" ? globalStyles.hide : globalStyles.profileStudent}>
							</Image>

							{/*Personal Information*/}
							<View style={ item.name_s == "NULL" && item.l_name_s == "NULL" && item.mail_s == "NULL" && item.gen_s == "NULL" && item.db_s == "NULL" && item.nacionality == "NULL" && item.city == "NULL" && item.lang_s == "NULL" && item.passport == "NULL" ? globalStyles.hideContents : globalStyles.show}>
								<Card>
									<View>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Name: </Text> 
												{item.name_s == "NULL" && item.l_name_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>
												}	
											</Text>

										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Mail: </Text> 
												{item.mail_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.mail_s}</Text>
												}	
											</Text>
										
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Phone Number: </Text> 
												{item.num_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.num_s}</Text>
												}	
											</Text>

										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Gender: </Text> 
												{item.gen_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.gen_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Age: </Text> 
												{item.db_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.db_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Nacionality: </Text> 
												{item.nacionality == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.nacionality}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Origin City: </Text> 
												{item.city == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.city}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Origin Language: </Text> 
												{item.lang_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.lang_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitle}>
											<Text style={ globalStyles.infotitle}>Passport: </Text> 
												{item.passport == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.passport}</Text>
												}	
											</Text>
									</View>
								</Card>
							</View>

                                {/*Reservation Details*/}
								<View style={ globalStyles.profileMargins}>
									<View style={ item.bedrooms == "NULL" && item.start == "NULL" && item.end_ == "NULL" ? globalStyles.hideContents : globalStyles.ReservationStudentMarginTop}>
										<View style={{flexDirection: 'row'}}>
												<Heading size='md' style={ globalStyles.infomaintitledit}>Reservation Details</Heading>
										</View>
										
												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Room to occupy: </Text> 
														{item.bedrooms == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.bedrooms}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Arrive Date: </Text> 
														{item.start == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.start}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Last Date: </Text> 
														{item.end_ == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.end_}</Text>
														}	
												</Text>

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
														<View>
															<Text style={globalStyles.subtstudentModalR}>Student Reported:</Text>
															<Text style={globalStyles.textstudentModalR}>{item.name_s} {item.l_name_s}</Text>
														</View>
														<FormControl>
															<View style={globalStyles.pickerviewModalR}>
																<Picker
																	style={globalStyles.pickerModalR}
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
																				style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
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

												{statusre == 'Active' ?
												<TouchableHighlight
												style={globalStyles.reportedButtonReply}
												onPress={() => Alert.alert("This student is already reported")}>
													<Text style={globalStyles.textStyleReply}><AntDesign name="check" style={globalStyles.formReport} />   Student Reported</Text>
												</TouchableHighlight> 
												 : 
												<TouchableHighlight
												style={globalStyles.StudentopenButtonReply}
												onPress={() => this.modalopen()}>
													<Text style={globalStyles.textStyleReply}><AntDesign name="form" style={globalStyles.formReport} />   Report Student</Text>
												</TouchableHighlight>}
													
									</View>
								</View>

								<View style={ globalStyles.hr} />


                                {/*Preferences Information*/}
									<View style={ globalStyles.profileMargins}>
										<View style={ item.smoke_s == "NULL" && item.pets == "NULL" && item.food == "NULL" && item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.show}>
											<View style={{flexDirection: 'row'}}>
														<Heading size='md' style={ globalStyles.infomaintitledit}>Preferences Information</Heading>
											</View>

												<Text style={globalStyles.profiledirtitleStudent}>
														<Text style={ globalStyles.infotitle}>Smoke: </Text> 
															{item.smoke_s == "NULL"
																?
																	<Text></Text>
																:
																	<Text style={globalStyles.varProfile}>{item.smoke_s}</Text>
															}	
													</Text>

													<Text style={globalStyles.profiledirtitleStudent}>
														<Text style={ globalStyles.infotitle}>Pets: </Text> 
															{item.pets == "NULL"
																?
																	<Text></Text>
																:
																	<Text style={globalStyles.varProfile}>{item.pets}</Text>
															}	
													</Text>

													<Text style={globalStyles.profiledirtitleStudent}>
														<Text style={ globalStyles.infotitle}>Food: </Text> 
															{item.food == "NULL"
																?
																	<Text></Text>
																:
																	<Text style={globalStyles.varProfile}>{item.food}</Text>
															}	
													</Text>

													<View style={globalStyles.specialDietrow}>
														<View style={ globalStyles.infoadditionalChecked}>
															<Text style={ item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.infotitle}>Special Diet</Text>
																<View style={ globalStyles.infoadditional}>
																	<View style={ item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Vegetarians</Text></Text>
																	<View style={item.halal == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.halal == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Halal (Muslims)</Text></Text>
																	<View style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Kosher (Jews)</Text></Text>
																	<View style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Lactose Intolerant</Text></Text>
																	<View style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Gluten Free Diet</Text></Text>
																	<View style={item.pork == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.pork == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>No Pork</Text></Text>
																	<View style={item.none == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.none == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>None</Text></Text>
																</View>
														</View>
													</View>
										</View>
									</View>

								<View style={ item.name_a == "NULL" && item.city_a == "NULL" && item.dir_a == "NULL" && item.type_s == "NULL" && item.firstd == "NULL" && item.lastd == "NULL" ? globalStyles.hideContents : globalStyles.show}>
									<Card>
										
										{/*Academy Information*/}
										<View style={{flexDirection: 'row'}}>
													<Heading size='md' style={ globalStyles.infomaintitledit}>Academy Information</Heading>
										</View>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Name: </Text> 
														{item.name_a == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.name_a}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>City: </Text> 
														{item.city_a == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.city_a}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Address: </Text> 
														{item.dir_a == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.dir_a}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Type of Student: </Text> 
														{item.type_s == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.type_s}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Start Date: </Text> 
														{item.firstd == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.firstd}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Last Date: </Text> 
														{item.lastd == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.lastd}</Text>
														}	
												</Text>
									</Card>
								</View>

								
							
									
									{/*Flight Information*/}
									<View style={ item.n_airline == "NULL" && item.n_flight== "NULL" && item.departure_f == "NULL" && item.start == "NULL" ? globalStyles.hideContents : globalStyles.show}>
										<Card>
											<View style={{flexDirection: 'row'}}>
														<Heading size='md' style={ globalStyles.infomaintitledit}>Flight Information</Heading>
											</View>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Booking Confirmation: </Text> 
													{item.n_airline == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.n_airline}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Landing Flight Number: </Text> 
													{item.n_flight == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.n_flight}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Flight Date: </Text> 
													{item.departure_f == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.departure_f}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Arrival Date at the Homestay: </Text> 
													{item.start == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.start}</Text>
													}	
											</Text>
										</Card>
									</View>

									<View style={ item.cont_name == "NULL" && item.cont_lname == "NULL" && item.cell_s == "NULL" && item.num_conts == "NULL" ? globalStyles.hideContents : globalStyles.show}>
										{/*Emergency Contact*/}
										<Card>
											<View style={{flexDirection: 'row'}}>
														<Heading size='md' style={ globalStyles.infomaintitledit}>Emergency Contact</Heading>
											</View>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Contact Name: </Text> 
													{item.cont_name == "NULL" && item.cont_lname == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.cont_name} {item.cont_lname}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Alternative Number: </Text> 
													{item.cell_s == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.cell_s}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudent}>
												<Text style={ globalStyles.infotitle}>Emergency Contact: </Text> 
													{item.num_conts == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.num_conts}</Text>
													}	
											</Text>

										</Card>
									</View>
                            </View>
                    </View>
                    
                </ScrollView>


                <Button
                    success
                    bordered
                    onPress={this.back}
                    style={globalStyles.botoneditProfile}>
                    <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='chevron-left' style={globalStyles.botonTextoDisable}> Go Back</Icon></Text>
                </Button>
				</View>
            
           
                )}> 
    </FlatList>
	</NativeBaseProvider>
    
  );
}
}