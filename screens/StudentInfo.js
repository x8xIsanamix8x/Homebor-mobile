import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, Text, RefreshControl } from 'react-native';
import { Container, Button, H1, H2 } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';


class Studentinfo extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		  loading : true,
		  refreshing: false,
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
		this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s })
		console.log(this.state.info)
		
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
            this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, room : student.data[0].bedrooms })
            console.log(this.state.info)
            
          }

		  back = () => {
			this.props.navigation.navigate('Notifications')
			}

	render() {

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
						<Text style={ globalStyles.infotitle}>Reservation Details</Text>
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