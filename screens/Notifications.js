import React, { Component, useState} from 'react';
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground, RefreshControl } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';

class Notification extends Component {

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

		let notifications = await api.getNotifications(this.state.email,this.state.perm)
		this.setState({ info : notifications, loading : false })
        console.log("nuevo")
        console.log(this.state.info)
	  }

	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        refresh = async() => {
            let notifications = await api.getNotifications(this.state.email,this.state.perm)
			this.setState({ info : notifications, loading : false })
        	console.log("nuevo")
        	console.log(this.state.info)
          }

	render (){
	return (
		<View style={globalStyles.container}>
			<ImageBackground source={require('../assets/img/backgroundNotification.png')} style={globalStyles.ImageBackgroundNoti}>
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
						<ScrollView nestedScrollEnabled={true}>
							{!item.notification ? null : item.notification.map((notification,i) =>
                                   <View key={notification.id}> 
                                        <View style={globalStyles.itemNoti}>
											<Card>
												<View style={globalStyles.inlineData}>
												<MaterialIcons name="notifications" size={18} color="black" />
													<Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
													<Text> wants to reserve</Text> 
													<Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
												</View>
											</Card>
											<View style={globalStyles.notiDate}>
													<View style={globalStyles.inlineData}>
														<Text style={globalStyles.infosubtitle}>Arrive:</Text> 
														<Text>{!notification.start ? null : notification.start}</Text>
													</View>
													<View style={globalStyles.inlineData}>
														<Text style={globalStyles.infosubtitle}>Leave:</Text> 
														<Text>{!notification.end ? null : notification.end}</Text>
													</View>
											</View>
											<Image
                        						source={{ uri: `http://homebor.com/${notification.photo}` }}
                        						resizeMode="contain"
                       							style={ globalStyles.imageNoti }
                        					></Image>
										</View>
                                    </View>                 
                                )} 

						</ScrollView>

				)}>
				</FlatList>	
		</ImageBackground>
		</View>	
	);
   }
}

export default Notification;