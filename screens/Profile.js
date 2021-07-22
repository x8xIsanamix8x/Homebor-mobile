import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, Text, RefreshControl } from 'react-native';
import { Container, Button, H1, H2 } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import { Font, AppLoading } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import {Spinner} from 'native-base';


class Profile extends Component { 

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
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false })
		//console.log(this.state.info)
	  }

	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        refresh = async() => {
            let profile = await api.getProfile(this.state.email,this.state.perm)
			this.setState({ info : profile.data, loading : false })
			//console.log(this.state.info)
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
						<H1 style={ globalStyles.infomaintitle}>Home Information</H1>
					</Card>

					{/* Basic Information*/}
					<View>
						<Text style={ globalStyles.infotitle}>Basic Information</Text>
                    	<View style={ globalStyles.hr} />
                        <View style={ item.h_name == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							{/*if para condicionar estilos */}
							<Text style={ globalStyles.infosubtitle}>House Name</Text>
                            	{/*If para condicionar etiquetas, si una etiqueta esta dentro de este if no se puede agregar dentro de la etiqueta un style */}
								{item.h_name == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.h_name}</Text>
								}
                        </View>
                        <View style={ item.num == "NULL" ? globalStyles.hide : globalStyles.infocol2right}>
                            <Text style={ globalStyles.infosubtitle }>Phone Number</Text>
                            	{item.num == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.num}</Text>
								}
                    	</View>
                    	<View style={ item.room == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle }>Room</Text>
								{item.room == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.room}</Text>
								}
                    	</View>
					</View>

					{/*Location*/}
					<View>
						<Text style={ globalStyles.infotitle}>Location</Text>
						<View style={ globalStyles.hr} />
							<View style={ item.dir == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
								<Text style={ globalStyles.infosubtitle }>Direction</Text>
								{item.dir == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.dir}</Text>
								}
							</View>
						<View style={ item.city == "NULL" ? globalStyles.hide : globalStyles.infocol2right}>
							<Text style={ globalStyles.infosubtitle }>City</Text>
								{item.city == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.city}</Text>
								}
						</View>
						<View style={ item.state == "NULL" ? globalStyles.hide : globalStyles.infocol2left}>
							<Text style={ globalStyles.infosubtitle }>State</Text>
								{item.state == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.room}</Text>
								}
						</View>
						<View style={ item.p_code == "NULL" ? globalStyles.hide : globalStyles.infocol2right}>
							<Text style={ globalStyles.infosubtitle }>Postal Code</Text>
								{item.p_code == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.p_code}</Text>
								}
						</View>
					</View>

					{/*Gallery*/}
					<View>
						<Text style={ globalStyles.infotitle}>Gallery</Text>
						<View style={ globalStyles.hr} />

						{/*PHOTO HOME */}
						<View style={item.phome == "NULL" ? globalStyles.hideContents : globalStyles.show}>
							<Card style={item.phome == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
								<H2 style={ item.phome == "NULL" ? globalStyles.hide : globalStyles.infosubtitle2 }>Frontage Photo</H2>
								<View style={ item.phome == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
								<Image
                    				source={{ uri: `http://homebor.com/${item.phome}` }}
                    				resizeMode="contain"
                    				style={item.phome == "NULL" ? globalStyles.hide : globalStyles.imageprofile}
                    			></Image>
							</Card>
						</View>

						{/*PHOTO LIVING ROOM */}
						<View style={item.pliving == "NULL" ? globalStyles.hideContents : globalStyles.show}>
							<Card style={item.pliving == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
								<H2 style={ item.pliving == "NULL" ? globalStyles.hide : globalStyles.infosubtitle2 }>Living Room Photo</H2>
								<View style={ item.pliving == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
								<Image
                    				source={{ uri: `http://homebor.com/${item.pliving}` }}
                    				resizeMode="contain"
                    				style={item.pliving == "NULL" ? globalStyles.hide : globalStyles.imageprofile}
                    			></Image>
							</Card>
						</View>	

						{/*HOUSE AREAS PHOTOS */}
						<View style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
							<Card style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
								<H2 style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.infosubtitle2 }>House Areas Photo</H2>
								<View style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
								{/*If user only has area 1 */}
								<Image
                    				source={{ uri: `http://homebor.com/${item.parea1}` }}
                    				resizeMode="contain"
                    				style={ item.parea1 != "NULL" && item.parea2 == "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                    			></Image>

								{/*If user only has area 1 and 2*/}
								<Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea1}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea2}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>

								{/*If user only has area 1, 2 and 3*/}
								<Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea1}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea2}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea3}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>

								{/*If user has all areas*/}
								<Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea1}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea2}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea3}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.parea4}` }}
										resizeMode="contain"
										style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>
							</Card>
						</View>

						{/*BATHROOM PHOTOS */}
						<View style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
							<Card style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
								<H2 style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.infosubtitle2 }>Bathroom Photo</H2>
								<View style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
								{/*If user only has area 1 */}
								<Image
                    				source={{ uri: `http://homebor.com/${item.pbath1}` }}
                    				resizeMode="contain"
                    				style={ item.pbath1 != "NULL" && item.pbath2 == "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                    			></Image>

								{/*If user only has area 1 and 2*/}
								<Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath1}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath2}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>
	

								{/*If user only has area 1, 2 and 3*/}
								<Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath1}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath2}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath3}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>

								{/*If user has all areas*/}
								<Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath1}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath2}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath3}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
									<View style={globalStyles.slideroomPreview}>
										<Image
										source={{ uri: `http://homebor.com/${item.pbath4}` }}
										resizeMode="contain"
										style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
										></Image>
									</View>
								</Swiper>
							</Card>
						</View>							
					</View>

					

					{/*Additional Information */}
					<View>
						<Text style={ globalStyles.infotitle}>Additional Information</Text>
						<View style={ globalStyles.hr} />
						<View style={ item.des == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Description</Text>
								{item.des == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.des}</Text>
								}
						</View>
						<View style={ item.num_mem == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Number of Family Members</Text>
								{item.num_mem == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.num_mem}</Text>
								}
						</View>
						<View style={ item.backg == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background</Text>
								{item.backg == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.backg}</Text>
								}
						</View>
						<View style={ item.backl == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Background Language</Text>
								{item.backl == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.backl}</Text>
								}
						</View>
						<View style={ item.a_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Academy Preference</Text>
								{item.a_pre == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.name_a}, {item.dir_a}</Text>
								}
						</View>
						<View style={ item.g_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Gender Preference</Text>
								{item.g_pre == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.g_pre}</Text>
								}
						</View>
						<View style={ item.ag_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Age Preference</Text>
								{item.ag_pre == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.ag_pre}</Text>
								}
						</View>
						<View style={ item.status == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Status</Text>
								{item.status == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.status}</Text>
								}
						</View>
						<View style={ item.cell == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Alternative Phone</Text>
								{item.cell == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.cell}</Text>
								}
						</View>
						<View style={ item.smoke == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle }>Smokers Politics</Text>
								{item.smoke == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.smoke}</Text>
								}
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.infosubtitle}>Special Diet</Text>
							<View style={ item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.checked}>Vegetarians</Text>
							<View style={item.halal == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.halal == "no" ? globalStyles.hideContents : globalStyles.checked}>Halal (Muslims)</Text>
							<View style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.checked}>Kosher (Jews)</Text>
							<View style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.checked}>Lactose Intolerant</Text>
							<View style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.checked}>Gluten Free Diet</Text>
							<View style={item.pork == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.pork == "no" ? globalStyles.hideContents : globalStyles.checked}>No Pork</Text>
							<View style={item.none == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.none == "no" ? globalStyles.hideContents : globalStyles.checked}>None</Text>
						</View>
				</View>

				{/*Pet Info*/}
				<View>
					<Text style={ globalStyles.infotitle}>Pets Information</Text>
					<View style={ globalStyles.hr} />
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.pet == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Pets</Text>
							{item.pet == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.pet}</Text>
								}
					</View>
					<View style={ item.pet_num == "0" ? globalStyles.hideContents : globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle }>Number of Pets</Text>
							{item.pet_num == "0"
									?
										<Text></Text>
									:
										<Text>{item.pet_num}</Text>
								}
					</View>
					<View style={ item.dog == "no" && item.cat == "no" && item.other == "no" ? globalStyles.hideContents : globalStyles.infoadditional}>
						<Text style={ item.dog == "no" && item.cat == "no" && item.other == "no" ? globalStyles.hideContents : globalStyles.infosubtitle}>Type of Pets</Text>
						<View style={item.dog == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.dog == "no" ? globalStyles.hideContents : globalStyles.checked}>Dogs</Text>
						<View style={item.cat == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.cat == "no" ? globalStyles.hideContents : globalStyles.checked}>Cats</Text>
						<View style={item.other == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.other == "no" ? globalStyles.hideContents : globalStyles.checked }>Others</Text>
					</View>
					<View style={ item.type_pet == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
						<Text style={ item.type_pet == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Type of Pets</Text>
							{item.type_pet == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.type_pet}</Text>
								}
					</View>
				</View>

				{/*Main Contact Info*/}
				<View>
					<Text style={ globalStyles.infotitle}>Main Contact Info</Text>
					<View style={ globalStyles.hr} />
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.name_h == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
							{item.name_h == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.name_h}</Text>
								}
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.l_name_h == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Last Name</Text>
							{item.l_name_h == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.l_name_h}</Text>
								}
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.db == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
							{item.db == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db}</Text>
								}
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.gender == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Gender</Text>
							{item.gender == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.gender}</Text>
								}
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.db_law == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
							{item.db_law == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_law}</Text>
								}
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ item.db_law == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
					</View>
				</View>

				{/*Family Information*/}
				<View>
					<Text style={ globalStyles.infotitle}>Family Information</Text>
						<View style={ globalStyles.hr} />
						
						{/*Member 1*/}
						<View style={ item.f_name1== "NULL" && item.f_lname1== "NULL" && item.db1== "NULL" && item.gender1== "NULL" && item.re1== "NULL" && item.db_lawf1== "NULL" && item.lawf1== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 1:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name1== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name1 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name1}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname1 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname1}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db1== "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db1}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender1 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender1}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re1 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re1}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf1 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf1}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf1 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>
                
						{/*Member 2*/}
						<View style={ item.f_name2== "NULL" && item.f_lname2== "NULL" && item.db2== "NULL" && item.gender2== "NULL" && item.re2== "NULL" && item.db_lawf2== "NULL" && item.lawf2== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 2:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name2== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name2 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name2}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname2 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname2}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db2 == "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db2}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender2 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender2}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re2 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re2}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf2 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf2}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf2 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

                	{/*Member 3*/}
						<View style={ item.f_name3== "NULL" && item.f_lname3== "NULL" && item.db3== "NULL" && item.gender3== "NULL" && item.re3== "NULL" && item.db_lawf3== "NULL" && item.lawf3== "NULL" ? globalStyles.hideContents : globalStyles.show} >
						<Card>
						<Text style={ globalStyles.infotitle}>Member 3:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name3== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name3 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name3}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname3== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname3 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname3}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db3 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db3== "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db3}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender3 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender3 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender3}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re3 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re3 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re3}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf3 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf3}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

						{/*Member 4*/}
						<View style={ item.f_name4== "NULL" && item.f_lname4== "NULL" && item.db4== "NULL" && item.gender4== "NULL" && item.re4== "NULL" && item.db_lawf4== "NULL" && item.lawf4== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 4:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name4== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name4 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name4}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname4 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname4}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db4== "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db4}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender4 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender4}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re4 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re4}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf4 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf4}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf4 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

						{/*Member 5*/}
						<View style={ item.f_name5== "NULL" && item.f_lname5== "NULL" && item.db5== "NULL" && item.gender5== "NULL" && item.re5== "NULL" && item.db_lawf5== "NULL" && item.lawf5== "NULL" ? globalStyles.hideContents : globalStyles.show} > 
						<Card>
						<Text style={ globalStyles.infotitle}>Member 5:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name5== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name5 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name5}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname5 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname5}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db5== "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db5}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender5 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender5}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re5 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re5}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf5 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf5}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf5 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

						{/*Member 6*/}
						<View style={ item.f_name6== "NULL" && item.f_lname6== "NULL" && item.db6== "NULL" && item.gender6== "NULL" && item.re6== "NULL" && item.db_lawf6== "NULL" && item.lawf6== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 6:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name6== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name6 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name6}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname6 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname6}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db6 == "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db6}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender6 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender6}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re6 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re6}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf6 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf6}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

						{/*Member 7*/}
						<View style={ item.f_name7== "NULL" && item.f_lname7== "NULL" && item.db7== "NULL" && item.gender7== "NULL" && item.re7== "NULL" && item.db_lawf7== "NULL" && item.lawf7== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 7:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name7== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name7 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name7}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname7 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname7}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db7 == "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db7}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender7 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender7}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re7 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re7}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf7 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf7}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf7 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

						{/*Member 8*/}
						<View style={ item.f_name8== "NULL" && item.f_lname8== "NULL" && item.db8== "NULL" && item.gender8== "NULL" && item.re8== "NULL" && item.db_lawf8== "NULL" && item.lawf8== "NULL" ? globalStyles.hideContents : globalStyles.show}>
						<Card>
						<Text style={ globalStyles.infotitle}>Member 8:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ item.f_name8== "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Name</Text>
								{item.f_name8 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_name8}</Text>
								}
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ item.f_lname8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Last Name</Text>
									{item.f_lname8 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.f_lname8}</Text>
									}
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ item.db8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Birth</Text>
										{item.db8 == "NULL"
											?
											<Text></Text>
											:
											<Text>{item.db8}</Text>
										}
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ item.gender8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle}>Gender</Text>
													{item.gender8 == "NULL"
													?
														<Text></Text>
													:
														<Text>{item.gender8}</Text>
													}
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ item.re8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Relation</Text>
														{item.re8 == "NULL"
															?
																<Text></Text>
															:
																<Text>{item.re8}</Text>
														}
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ item.db_lawf8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Date of Background Law</Text>
								{item.db_lawf8 == "NULL"
									?
										<Text></Text>
									:
										<Text>{item.db_lawf8}</Text>
								}
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ item.lawf8 == "NULL" ? globalStyles.hideContents : globalStyles.infosubtitle }>Background Law</Text>
						</View>
                        </Card>
						</View>

				</View>

				<View style={ globalStyles.hr} />



				<Button
					style={globalStyles.botoninfo}
				>
					<Text
						style={globalStyles.botonTextoinfo}
					> Edit Property </Text>
				</Button>



				</ScrollView>
				
			</Container>
			
		)}
		>

		</FlatList>
	)
};


}

export default Profile;