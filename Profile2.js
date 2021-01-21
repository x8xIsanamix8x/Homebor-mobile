import React, { Component } from 'react';
import { View, Image, ScrollView, Text } from 'react-native';
import { Container, Button, H1 } from 'native-base'
import globalStyles from '../styles/global';
import Card from '../shared/card';
import { Font, AppLoading } from "expo";

export default class Profile extends Component {
	render(){
	  return ( 
		
		<Container style={ globalStyles.contenedor} >
			<ScrollView>
                <Card>
				    <H1 style={ globalStyles.infomaintitle}>Home Information</H1>
                </Card>
				<View>
				<Text style={ globalStyles.infotitle}>Basic Information</Text>
                    <View style={ globalStyles.hr} />
                        <View style={ globalStyles.infocol2left}>
                            <Text style={ globalStyles.infosubtitle}>House Name</Text>
                            <Text>Mansion Lapida</Text>
                        </View>
                            <View style={ globalStyles.infocol2right}>
                                <Text style={ globalStyles.infosubtitle}>Phone Number</Text>
                                <Text>55535341</Text>
                    </View>
                    <View style={ globalStyles.infocol2left}>
                        <Text style={ globalStyles.infosubtitle}>Room</Text>
                        <Text>3</Text>
                    </View>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Location</Text>
				<View style={ globalStyles.hr} />
				<View style={ globalStyles.infocol2left}>
				<Text style={ globalStyles.infosubtitle}>Direction</Text>
				<Text>8 High Point Rd</Text>
				</View>
				<View style={ globalStyles.infocol2right}>
				<Text style={ globalStyles.infosubtitle}>City</Text>
				<Text>Toronto</Text>
				</View>
				<View style={ globalStyles.infocol2left}>
				<Text style={ globalStyles.infosubtitle}>State</Text>
				<Text>Ontario</Text>
				</View>
				<View style={ globalStyles.infocol2right}>
				<Text style={ globalStyles.infosubtitle}>Postal Code</Text>
				<Text>M3B 2A4</Text>
				</View>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Gallery</Text>
				<View style={ globalStyles.hr} />
				<View>
				<Image source={require('../assets/img/profile/k.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/f.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/k.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/b.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/c.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/d.jpg')} style={ globalStyles.image}></Image>
				</View>
				<View>
				<Image source={require('../assets/img/profile/e.jpg')} style={ globalStyles.image}></Image>
				</View>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Additional Information</Text>
				<View style={ globalStyles.hr} />
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Description</Text>
				<Text>Blue House with Red Door.</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Number of Family Members</Text>
				<Text>4</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Background</Text>
				<Text>Canadian</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Background Language</Text>
				<Text>English</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Academy Preference</Text>
				<Text>ILAC</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Gender Preference</Text>
				<Text>Any</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Age Preference</Text>
				<Text>Any</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Status</Text>
				<Text>Avalible</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Cellphone</Text>
				<Text>4554654</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Smokers Politics</Text>
				<Text>Outside-OK</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Special Diet</Text>
				<View style={globalStyles.CircleShape}></View><Text style={globalStyles.checked}>No Pork</Text>
				</View>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Pets Information</Text>
				<View style={ globalStyles.hr} />
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Pets</Text>
				<Text>No</Text>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Main Contact Info</Text>
				<View style={ globalStyles.hr} />
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Name</Text>
				<Text>Homero</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Last Name</Text>
				<Text>Lapida</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
				<Text>01-14-1973</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Gender</Text>
				<Text>Male</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
				<Text>04-07-2020</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Background Law</Text>
				
				</View>
				</View>

				<View>
				<Text style={ globalStyles.infotitle}>Room Information</Text>
				<View style={ globalStyles.hr} />
				<Text style={ globalStyles.infotitle}>Room 1:</Text>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Type Acomodation</Text>
				<Text>Share Acomodation</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Type Bed</Text>
				<Text>Twin</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Food Service</Text>
				<Text>Yes</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Disponibility</Text>
				<Text>Avalible</Text>
				</View>
				<Text style={ globalStyles.infotitle}>Room 2:</Text>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Type Acomodation</Text>
				<Text>Share Acomodation</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Type Bed</Text>
				<Text>Twin</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Food Service</Text>
				<Text>Yes</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Disponibility</Text>
				<Text>Avalible</Text>
				</View>
				</View>

				<View>
                        <Text style={ globalStyles.infotitle}>Family Information</Text>
                            <View style={ globalStyles.hr} />
                            <Card>
                            <Text style={ globalStyles.infotitle}>Member 1:</Text>
                                <View style={ globalStyles.infoadditional}>
                                <Text style={ globalStyles.infosubtitle}>Name</Text>
                                <Text>Elvira</Text>
                                </View>
                                    <View style={ globalStyles.infoadditional}>
                                    <Text style={ globalStyles.infosubtitle}>Last Name</Text>
                                    <Text>Lapida</Text>
                                    </View>
                                        <View style={ globalStyles.infoadditional}>
                                        <Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
                                        <Text>07-05-1973</Text>
                                        </View>
                                                    <View style={ globalStyles.infoadditional}>
                                                    <Text style={ globalStyles.infosubtitle}>Gender</Text>
                                                    <Text>Female</Text>
                                                    </View>
                                                        <View style={ globalStyles.infoadditional}>
                                                        <Text style={ globalStyles.infosubtitle}>Relation</Text>
                                                        <Text>Mom</Text>
                                                        </View>
                                    <View style={ globalStyles.infoadditional}>
                                <Text style={ globalStyles.infosubtitle}>Date of Background Law</Text>
                                <Text>07-18-2020</Text>
                            </View>
                        
                            <View style={ globalStyles.infoadditional}>
                                <Text style={ globalStyles.infosubtitle}>Background Law</Text>
				            </View>
                            </Card>
                
                <Card>
				<Text style={ globalStyles.infotitle}>Member 2:</Text>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Name</Text>
				<Text>Cassandra</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Last Name</Text>
				<Text>Lapida</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
				<Text>07-14-1992</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Gender</Text>
				<Text>Female</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Relation</Text>
				<Text>Daughter</Text>
				</View>
                </Card>

                <Card>
				<Text style={ globalStyles.infotitle}>Member 3:</Text>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Name</Text>
				<Text>Alejandro</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Last Name</Text>
				<Text>Lapida</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Date of Birth</Text>
				<Text>07-19-1999</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Gender</Text>
				<Text>Male</Text>
				</View>
				<View style={ globalStyles.infoadditional}>
				<Text style={ globalStyles.infosubtitle}>Relation</Text>
				<Text>Son</Text>
                
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




				</View>
			</ScrollView>
		</Container>
	);
}
}
