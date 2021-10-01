import React, { Component, useState} from 'react';
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground, RefreshControl } from 'react-native'
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';

class Reports extends Component {

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
		
		this._onFocusListener = this.props.navigation.addListener('didFocus', () => {
			this.onRefresh()
		  });

		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        //console.log(userLogin)

		let reportslist = await api.getReportslist(this.state.email)
		this.setState({ info : reportslist, loading : false})
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
            let reportslist = await api.getReportslist(this.state.email)
            this.setState({ info : reportslist, loading : false})
            console.log("nuevo")
            console.log(this.state.info)
          }

		  feedback = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('ReportFeedback')
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
                            <Card>
                        
							{!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card></View> : item.reportslist.map((reportslist) => 
                                    <View key={reportslist.id_not} >
                                       
										<View style={globalStyles.show}>
                                        <TouchableOpacity key={reportslist.id_not} onPress={ () =>this.feedback(
												this.setState({idnoti : reportslist.id_not}, () => AsyncStorage.setItem('idnoti',JSON.stringify(reportslist.id_not))))}>

													<View style={reportslist.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
														<Card>
															<View style={globalStyles.inlineData}>
                                                                <Text>Report Number: #<Text style={globalStyles.infosubtitle}>{!reportslist.id_not ? null : reportslist.id_not}</Text></Text>
															</View>
														</Card>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Agency</Text>
                                                            </View>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Student</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowImagesReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Image
                                                                source={{ uri: `http://homebor.com/${reportslist.photo_m}` }}
                                                                resizeMode="contain"
                                                                style={ globalStyles.imageReport }
                                                                ></Image>
                                                            </View>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Image
                                                                source={{ uri: `http://homebor.com/${reportslist.photo_s}` }}
                                                                resizeMode="contain"
                                                                style={ globalStyles.imageReport }
                                                                ></Image>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Title:</Text>
                                                            </View>

                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Status:</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.textLineItemReport}>Report Issue</Text>
                                                            </View>

                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.textLineItemReport}>{reportslist.status}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Touch to Reply this Report</Text>
                                                            </View>
                                                        </View>
                                                        
													</View>
                                                </TouchableOpacity>
										</View>

									</View> 
								                  
                                )} 
                                </Card>

						</ScrollView>
                        

				)}>
				</FlatList>	
		</ImageBackground>
		</View>	
	);
   }
}

export default Reports;