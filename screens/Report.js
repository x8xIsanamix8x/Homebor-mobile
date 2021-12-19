import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl } from 'react-native'
import { NativeBaseProvider, Text, Spinner } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';

export default class Reports extends Component {

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
		let reportslist = await api.getReportslist(this.state.email)
		this.setState({ info : reportslist, loading : false})
        console.log("nuevo")
        console.log(this.state.info)

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
            let reportslist = await api.getReportslist(this.state.email)
            this.setState({ info : reportslist, loading : false})
            console.log("nuevo")
            console.log(this.state.info)
          }

          //Function to get report id and take to the screen for that report feedback
		  feedback = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('ReportFeedback')
		}

  render() {
    
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
                    <NativeBaseProvider>
                        <ScrollView nestedScrollEnabled={true}>
                            
                        
							{!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card></View> : item.reportslist.map((reportslist) => 
                                    <View key={reportslist.id_not} style={globalStyles.ReportFeedbackMargins}>
                                       
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
                                                                {reportslist.status == 'Close' ? <Text style={globalStyles.textLineItemReportClose}>{reportslist.status}</Text>
                                                                : <Text style={globalStyles.textLineItemReportActive}>{reportslist.status}</Text>}
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
                                

						</ScrollView>
                          
                    </NativeBaseProvider>
                )}> 
            </FlatList>
        </ImageBackground>
    </View>
    
  );
}
}