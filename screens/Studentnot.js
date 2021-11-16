import React, {Component, useState} from 'react';
import { View, ScrollView, RefreshControl, Image, ImageBackground } from 'react-native';
import { NativeBaseProvider, Text, Spinner, Heading, Button } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';

export default class Studentnot extends Component {

    constructor(props){
		super(props);
		this.state = {
		  //Variables
		  email : '',
		  perm : false,
		  info : [],
		  refreshing: false,
		}
	  }
	
	  async componentDidMount(){

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });

		//Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)

		//Get student info throught id of notification
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

		//Get student info
        let student = await api.getStudentnot(this.state.idnoti)
		this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m})
		console.log(this.state.info)
		
	  }

	  //Function call to refresh
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

		//refresh function
        refresh = async() => {
			//Get user profile
            let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})
			//console.log(userLogin)

			//Get student info throught id of notification
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			//Get student info
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m})
			console.log(this.state.info)
            
          }

		  //Reject student function 
		  reject = async () => {
            console.log(this.state.email, this.state.mail, this.state.idnoti)
			api.rejectStudent(this.state.email, this.state.mail, this.state.idnoti)
			this.props.navigation.navigate('Notification')
			}

		  //Confirm student function
		  confirm = async () => {
			console.log(this.state.email, this.state.mail, this.state.idnoti, this.state.h_name, this.state.name_h, this.state.l_name_h, this.state.start, this.state.name_s, this.state.l_name_s, this.state.bedrooms, this.state.end, this.state.idm)
			api.confirmStudent(this.state.email, this.state.mail, this.state.idnoti, this.state.h_name, this.state.name_h, this.state.l_name_h, this.state.start, this.state.name_s, this.state.l_name_s, this.state.bedrooms, this.state.end, this.state.idm)
			this.props.navigation.navigate('Notification')
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
            <NativeBaseProvider>
                <ScrollView nestedScrollEnabled={true} >
                    <View>
                        <ImageBackground source={{ uri: `http://homebor.com/${item.photo_a}` }} style={item.photo_a == "NULL" ? globalStyles.hide : globalStyles.profileBanner}>
                            <Image
                                style={globalStyles.profileBannerStudent}>
                            </Image>
                        </ImageBackground>
                    </View>

                    <View style={ globalStyles.profileMargins}>
							<Image
								source={{ uri: `http://homebor.com/${item.photo_s}` }}
								resizeMode="contain"
								style={item.photo_s == "NULL" ? globalStyles.hide : globalStyles.profileStudentnot}>
							</Image>

							{/*Personal Information*/}
							<View style={globalStyles.studentnotBasic}>
								<Text style={globalStyles.profiledirtitleStudent}>
									<Text style={ globalStyles.infotitle}>Name: </Text> 
										{item.name_s == "NULL"
											?
												<Text></Text>
											:
												<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>
										}	
									</Text>

								<Text style={globalStyles.profiledirtitleStudent}>
									<Text style={ globalStyles.infotitle}>Gender: </Text> 
										{item.gen_s == "NULL"
											?
												<Text></Text>
											:
												<Text style={globalStyles.varProfile}>{item.gen_s}</Text>
										}	
									</Text>
								<Text style={globalStyles.profiledirtitleStudent}>
									<Text style={ globalStyles.infotitle}>Age: </Text> 
										{item.db_s == "NULL"
											?
												<Text></Text>
											:
												<Text style={globalStyles.varProfile}>{item.db_s}</Text>
										}	
									</Text>
								<Text style={globalStyles.profiledirtitleStudent}>
									<Text style={ globalStyles.infotitle}>Nacionality: </Text> 
										{item.nacionality == "NULL"
											?
												<Text></Text>
											:
												<Text style={globalStyles.varProfile}>{item.nacionality}</Text>
										}	
									</Text>
								<Text style={globalStyles.profiledirtitleStudent}>
									<Text style={ globalStyles.infotitle}>Origin Language: </Text> 
										{item.lang_s == "NULL"
											?
												<Text></Text>
											:
												<Text style={globalStyles.varProfile}>{item.lang_s}</Text>
										}	
									</Text>
							</View>

							<View style={ globalStyles.hr} />

                            {/*Reservation Details*/}
							<View style={ globalStyles.profileMargins}>
								<View>
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
												
												<Button
													success
													bordered
													onPress={this.confirm}
													style={globalStyles.botonconfirmStu}>
													<Text style={globalStyles.botonTexto}> Confirm </Text>
												</Button>

												<Button
													success
													bordered
													onPress={this.reject}
													style={globalStyles.botonrejectStu}>
													<Text style={globalStyles.botonTexto}> Reject </Text>
												</Button>
								</View>
							</View>

                            <View style={ globalStyles.hr} />
								
								{/*Preferences Information*/}
								<View style={ globalStyles.profileMargins}>
									<View style={{flexDirection: 'row'}}>
												<Heading size="md" style={ globalStyles.infomaintitledit}>Preferences Information</Heading>
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

							
						
								
								{/*Flight Information*/}
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
                </ScrollView>
                
                
                    

            
            </NativeBaseProvider>
                )}> 
    </FlatList>
    
  );
}
}