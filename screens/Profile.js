import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, Text } from 'react-native';
import { Container, Button, H1 } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import { Font, AppLoading } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';


class Profile extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		}
	  }
	
	  async componentDidMount(){
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data })
		console.log(this.state.info)
	  }

	render() {

	return ( 
		
		<FlatList
		data={this.state.info}
		keyExtractor={item => `${item.info}`}
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
                        <View style={ globalStyles.infocol2left}>
							<Text style={ globalStyles.infosubtitle}>House Name</Text>
                            <Text>{item.h_name}</Text>
                        </View>
                        <View style={ globalStyles.infocol2right}>
                            <Text style={ globalStyles.infosubtitle}>Phone Number</Text>
                            <Text>{item.num}</Text>
                    	</View>
                    	<View style={ globalStyles.infocol2left}>
                        	<Text style={ globalStyles.infosubtitle}>Room</Text>
                        	<Text>{item.room}</Text>
                    	</View>
					</View>

					{/*Location*/}
					<View>
						<Text style={ globalStyles.infotitle}>Location</Text>
						<View style={ globalStyles.hr} />
							<View style={ globalStyles.infocol2left}>
								<Text style={ globalStyles.infosubtitle}>Direction</Text>
								<Text>{item.dir}</Text>
							</View>
						<View style={ globalStyles.infocol2right}>
							<Text style={ globalStyles.infosubtitle}>City</Text>
							<Text>{item.city}</Text>
						</View>
						<View style={ globalStyles.infocol2left}>
							<Text style={ globalStyles.infosubtitle}>State</Text>
							<Text>{item.state}</Text>
						</View>
						<View style={ globalStyles.infocol2right}>
							<Text style={ globalStyles.infosubtitle}>Postal Code</Text>
							<Text>{item.p_code}</Text>
						</View>
					</View>

					{/*Gallery*/}
					<View>
						<Text style={ globalStyles.infotitle}>Gallery</Text>
						<View style={ globalStyles.hr} />
						<View>
							<Image style={ globalStyles.image} source={{ uri: `http://homebor.com/${item.phome}` }}></Image>
						</View>						
					</View>

					{/*Additional Information */}
					<View>
						<Text style={ globalStyles.infotitle}>Additional Information</Text>
						<View style={ globalStyles.hr} />
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Description</Text>
							<Text>{item.des}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Number of Family Members</Text>
							<Text>{item.num_mem}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background</Text>
							<Text>{item.backg}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Language</Text>
							<Text>{item.backl}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Academy Preference</Text>
							<Text>{item.name}, {item.dir_a}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Gender Preference</Text>
							<Text>{item.g_pre}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Age Preference</Text>
							<Text>{item.ag_pre}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Status</Text>
							<Text>{item.status}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Alternative Phone</Text>
							<Text>{item.cell}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Smokers Politics</Text>
							<Text>{item.smoke}</Text>
						</View>
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Special Diet</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Vegetarians</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Halal (Muslims)</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Kosher (Jews)</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Lactose Intolerant</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Gluten Free Diet</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>No Pork</Text>
							<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>None</Text>
						</View>
				</View>

				{/*Pet Info*/}
				<View>
					<Text style={ globalStyles.infotitle}>Pets Information</Text>
					<View style={ globalStyles.hr} />
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Pets</Text>
						<Text>{item.pet}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Number of Pets</Text>
						<Text>{item.pet_num}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Type of Pets</Text>
						<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Dogs</Text>
						<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Cats</Text>
						<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>Others</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Type of Pets</Text>
						<Text>{item.type_pet}</Text>
					</View>
				</View>

				{/*Main Contact Info*/}
				<View>
					<Text style={ globalStyles.infotitle}>Main Contact Info</Text>
					<View style={ globalStyles.hr} />
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Name</Text>
						<Text>{item.name_h}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Last Name</Text>
						<Text>{item.l_name_h}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
						<Text>{item.db}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Gender</Text>
						<Text>{item.gender}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
						<Text>{item.db_law}</Text>
					</View>
					<View style={ globalStyles.infoadditional}>
						<Text style={ globalStyles.infosubtitle}>Background Law</Text>
					</View>
				</View>

				{/*Family Information*/}
				<View>
					<Text style={ globalStyles.infotitle}>Family Information</Text>
						<View style={ globalStyles.hr} />
						
						{/*Member 1*/}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 1:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name1}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname1}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db1}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender1}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re1}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf1}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>
                
						{/*Member 2 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 2:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name2}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname2}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db2}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender2}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re2}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf2}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

                {/*Member 3 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 3:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name3}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname3}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db3}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender3}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re3}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf3}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

						{/*Member 4 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 4:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name4}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname4}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db4}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender4}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re4}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf4}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

						{/*Member 5 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 5:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name5}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname5}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db5}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender5}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re5}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf5}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

						{/*Member 6 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 6:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name6}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname6}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db6}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender6}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re6}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf6}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

						{/*Member 7 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 7:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name7}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname7}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db7}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender7}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re7}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf7}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>

						{/*Member 8 */}
						<Card>
						<Text style={ globalStyles.infotitle}>Member 8:</Text>
							<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Name</Text>
							<Text>{item.f_name8}</Text>
							</View>
								<View style={ globalStyles.infoadditional}>
								<Text style={ globalStyles.infosubtitle}>Last Name</Text>
								<Text>{item.f_lname8}</Text>
								</View>
									<View style={ globalStyles.infoadditional}>
									<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
									<Text>{item.db8}</Text>
									</View>
												<View style={ globalStyles.infoadditional}>
												<Text style={ globalStyles.infosubtitle}>Gender</Text>
												<Text>{item.gender8}</Text>
												</View>
													<View style={ globalStyles.infoadditional}>
													<Text style={ globalStyles.infosubtitle}>Relation</Text>
													<Text>{item.re8}</Text>
													</View>
								<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
							<Text>{item.db_lawf8}</Text>
						</View>
					
						<View style={ globalStyles.infoadditional}>
							<Text style={ globalStyles.infosubtitle}>Background Law</Text>
						</View>
                        </Card>


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