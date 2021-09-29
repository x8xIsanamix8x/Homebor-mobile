import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, Text, RefreshControl, Modal, TouchableHighlight, StyleSheet, Alert } from 'react-native';
import { Container, Button, H1, H2, Input, Form, Item } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';


class Studentinfo extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		  loading : true,
		  refreshing: false,
		  modalVisible : false, 
		  setModalVisible : false, 

		}
	  }
	
	  async componentDidMount(){

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('didFocus', () => {
			this.onRefresh()
		  });

        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)

        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

        let student = await api.getStudentnot(this.state.idnoti)
		this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name})
		console.log(this.state.info)

		this.setState({modalVisible : false, setModalVisible : false})

		  console.log(this.state.mail)

		let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
		this.setState({ reportstatus : studentreportstatus.data})
		console.log(this.state.reportstatus)
		
		if(!this.state.reportstatus.length){
			this.setState({ statusre : 'null'})
			console.log('hola')
			console.log(this.state.statusre)
		}else{
			this.setState({ statusre : studentreportstatus.data[0].status})
			console.log('chao')
			console.log(this.state.statusre)
		}
		
	  }

	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        refresh = async() => {
            let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})
			//console.log(userLogin)

			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name})
			console.log(this.state.info)

			this.setState({modalVisible : false, setModalVisible : false})

			console.log(this.state.mail)

			let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
			this.setState({ reportstatus : studentreportstatus.data})
			console.log(this.state.reportstatus)
			
			if(!this.state.reportstatus.length){
				this.setState({ statusre : 'null'})
				console.log('hola')
				console.log(this.state.statusre)
			}else{
				this.setState({ statusre : studentreportstatus.data[0].status})
				console.log('chao')
				console.log(this.state.statusre)
			}
            
          }

		  back = async() => {
			this.props.navigation.navigate('Notifications')
		  }

		  modalopen = async() => {
			  this.setState({modalVisible : true, setModalVisible : true})
		  }

		  modalclose = async() => {
			this.setState({modalVisible : false, setModalVisible : false})
		  }

		  modalnotify = async() => {
			console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
			api.reportStudent(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
			this.setState({modalVisible : false, setModalVisible : false})
			this.onRefresh()
		  }

		  

	render() {
		let modalVisible = this.state.modalVisible;
		let setModalVisible = this.state.setModalVisible;
		let statusre = this.state.statusre;

	return ( 
		
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
			<Container style={ globalStyles.contenedor} >
				<ScrollView nestedScrollEnabled={true} >
					<Card>
						<H1 style={ globalStyles.infomaintitle}>{item.name_s} {item.l_name_s}</H1>
					</Card>

					{/*Personal Information*/}
					<View>
						<Text style={ globalStyles.infotitle}>Personal Information</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ item.mail_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Mail</Text>
								{item.mail_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.mail_s}</Text>
								}
                    	</View>
                        <View style={ item.num_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Phone Number</Text>
								{item.num_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.num_s}</Text>
								}
                    	</View>
                        <View style={ item.db_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Age</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.db_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_s}</Text>
								}
                        </View>
                        <View style={ item.gen_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Gender</Text>
								{item.gen_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.gen_s}</Text>
								}
                    	</View>
                    	<View style={ item.nacionality == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Nacionality</Text>
								{item.nacionality == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.nacionality}</Text>
								}
                    	</View>
                        <View style={ item.city == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Origin City</Text>
								{item.city == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.city}</Text>
								}
                    	</View>
                        <View style={ item.lang_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Origin Language</Text>
								{item.lang_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.lang_s}</Text>
								}
                    	</View>
                        <View style={ item.passport == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Passport</Text>
								{item.passport == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.passport}</Text>
								}
                    	</View>
					</View>

                    {/*Preferences Information*/}
					<View>
						<Text style={ globalStyles.infotitle}>Preferences Information</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ item.smoke_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Smoke</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.smoke_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.smoke_s}</Text>
								}
                        </View>
                    	<View style={ item.pets == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Pets</Text>
								{item.pets == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.pets}</Text>
								}
                    	</View>
                        <View style={ item.food == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Food</Text>
								{item.food == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.food}</Text>
								}
                    	</View>
					</View>

                    {/*Academy Preferences*/}
					<View>
						<Text style={ globalStyles.infotitle}>Academy Information</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ item.name_a == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Academy Name</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.name_a == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.name_a}</Text>
								}
                        </View>
                    	<View style={ item.city_a == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>City</Text>
								{item.city_a == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.city_a}</Text>
								}
                    	</View>
                        <View style={ item.dir_a == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Academy Address </Text>
								{item.dir_a == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.dir_a}</Text>
								}
                    	</View>
                        <View style={ item.type_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Type of Student</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.type_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.type_s}</Text>
								}
                        </View>
                    	<View style={ item.firstd == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Start Date</Text>
								{item.firstd == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.firstd}</Text>
								}
                    	</View>
                        <View style={ item.lastd == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>End Date </Text>
								{item.lastd == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.lastd}</Text>
								}
                    	</View>
					</View>

                    {/*Reservation Details*/}
					<View>
						<Text style={ globalStyles.infotitlereport}>Reservation Details</Text>
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
									<Text style={globalStyles.subtstudentModalR}>Student Name</Text>
									<Text style={globalStyles.textstudentModalR}>{item.name_s} {item.l_name_s}</Text>
									<Text style={globalStyles.subtroomModalR}>Rooms</Text>
									<Text style={globalStyles.textroomModalR}>{item.bedrooms}</Text>
								</View>
								<Form>

								<View style={globalStyles.pickerviewModalR}>
									<Picker
										style={globalStyles.pickerModalR}
										selectedValue={this.state.report == 'NULL' ? "Report Tilte" : this.state.report}
										onValueChange={(report) => this.setState({report})}>
											<Picker.Item label="Report Tilte" value="Male" />
											<Picker.Item label="Cancel Reservation" value="Cancel Reservation" /> 
											<Picker.Item label="Report Issue" value="Report Issue"/>
									</Picker>
								</View>

								<View>
								<Item inlineLabel last style={globalStyles.input} >
												<Input
													placeholder="Describe the problem. No special characters"
													multiline={true}
													numberOfLines={4} 
													onChangeText={ (des) => this.setState({des}) }
													
												/>
								</Item>
								</View>
								</Form>
								<Text style={globalStyles.titleModalR}>*The report will reach your agency and then take the pertinent actions*</Text>

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
						<TouchableOpacity
							onPress={() => Alert.alert("This student is already reported")}>
							<AntDesign name="check" style={globalStyles.formReport} />
						</TouchableOpacity> : 
						<TouchableOpacity
							onPress={() => this.modalopen()}>
							<AntDesign name="form" style={globalStyles.formReport} />
						</TouchableOpacity>}
						
						<View style={ globalStyles.hr} />
						
		
                        <View style={ item.bedrooms == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Room to occupy</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.bedrooms == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.bedrooms}</Text>
								}
                        </View>
                    	<View style={ item.start == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Arrive Date</Text>
								{item.start == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.start}</Text>
								}
                    	</View>
                        <View style={ item.end_ == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Last Date</Text>
								{item.end_ == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.end_}</Text>
								}
                    	</View>
					</View>

                    {/*Emergency Contact */}
					<View>
						<Text style={ globalStyles.infotitle}>Emergency Contact</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ item.cont_name == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>Contact Name</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.cont_name == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.cont_name} {item.cont_lname}</Text>
								}
                        </View>
                    	<View style={ item.cell_s == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Alternative Contact</Text>
								{item.cell_s == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.cell_s}</Text>
								}
                    	</View>
                        <View style={ item.num_conts == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Emergency Contact</Text>
								{item.num_conts == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.num_conts}</Text>
								}
                    	</View>
					</View>			
			


                    {/*Special Diet*/}
					<View>
                    <Text style={ item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.infotitle}>Special Diet</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ globalStyles.infoadditional}>
							<View style={ item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.checked}>Vegetarians</Text>
							<View style={item.halal == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.halal == "no" ? globalStyles.hideContents : globalStyles.checked}>Halal (Muslims)</Text>
							<View style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.checked}>Kosher (Jews)</Text>
							<View style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.checked}>Lactose Intolerant</Text>
							<View style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.checked}>Gluten Free Diet</Text>
							<View style={item.pork == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.pork == "no" ? globalStyles.hideContents : globalStyles.checked}>No Pork</Text>
							<View style={item.none == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.none == "no" ? globalStyles.hideContents : globalStyles.checked}>None</Text>
						</View>
					</View>

                    
					<View style={ globalStyles.hr} />

				



					<Button
                        success
                        bordered
                        onPress={this.back}
                        style={globalStyles.botonbackStu}>
						<Text style={globalStyles.botonTexto}>Go Back</Text>
                    </Button>

				</ScrollView>
				
			</Container>
			
		)}
		>

		</FlatList>
	)
};


}

export default Studentinfo;