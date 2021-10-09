import React, { Component, useState} from 'react';
import { View, ScrollView, Text, ImageBackground, RefreshControl, Modal, TouchableHighlight, Alert} from 'react-native'
import { Spinner, Input, Form, Item } from 'native-base'
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';




import globalStyles from '../styles/global';

class ReportFeedback extends Component {

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

		let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
		this.setState({ info : reportslist, loading : false})
        console.log("nuevo")
        console.log(this.state.info)

        this.setState({modalVisible : false, setModalVisible : false})

        let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
		this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})

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

            let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
            this.setState({ info : reportslist, loading : false})
            console.log("nuevo")
            console.log(this.state.info)

            this.setState({modalVisible : false, setModalVisible : false})

            let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
            this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})
          }

        modalopen = async() => {
            this.setState({modalVisible : true, setModalVisible : true})
        }

        modalclose = async() => {
          this.setState({modalVisible : false, setModalVisible : false})
        }

        modalreply = async() => {
				console.log(this.state.des, this.state.email, this.state.idnoti, this.state.name_h, this.state.l_name_h, this.state.a_name, this.state.a_mail, this.state.stu_rep, this.state.status)
                api.replyReports(this.state.des, this.state.email, this.state.idnoti, this.state.name_h, this.state.l_name_h, this.state.a_name, this.state.a_mail, this.state.stu_rep, this.state.status)
                this.refresh()
        }

	render (){
        let modalVisible = this.state.modalVisible;
		let setModalVisible = this.state.setModalVisible;
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
                            {this.state.status == 'Active' ? 
                            <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                }}>
                                <View style={globalStyles.centeredViewModal}>
							    <View style={globalStyles.modalView}>
								    <Text style={globalStyles.titleModalR}>Reply Report</Text>
                                    <Form>

                                    <View>
                                    <Item inlineLabel last style={globalStyles.inputReply} >
                                        <Input
                                            placeholder={`Write your answer without special characteres`}
                                            multiline={true}
                                            numberOfLines={4} 
                                            onChangeText={ (des) => this.setState({des}) }
                                        />
                                    </Item>
                                    </View>
                                    </Form>

                                    <TouchableHighlight
									style={{ ...globalStyles.cancelModalR }}
									onPress={() => this.modalclose()}>
									<Text style={globalStyles.textStyleModal}>Cancel</Text>
									</TouchableHighlight>
									
									<TouchableHighlight
									style={{ ...globalStyles.notifyModalR }}
									onPress={() => this.modalreply()}>
									<Text style={globalStyles.textStyleModal}>Reply</Text>
									</TouchableHighlight>
                                </View>
                                </View>
                            </Modal>

                            <TouchableHighlight
                            style={globalStyles.openButtonReply}
                            onPress={() => this.modalopen()}>
                            <Text style={globalStyles.textStyleReply}>Show Modal</Text>
                            </TouchableHighlight>
                            </View>

                            : <View style={globalStyles.hideContents}></View>
                            }

                            
                            <Card>
                        
							{!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card></View> : item.reportslist.map((reportslist) => 
                                    <View key={reportslist.id_r} >
                                       
										<View style={globalStyles.show}>

													<View style={reportslist.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
														<Card>
															<View style={globalStyles.inlineData}>
                                                                <Text>Date: <Text style={globalStyles.infosubtitle}>{!reportslist.date ? null : reportslist.date}</Text></Text>
															</View>
														</Card>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Names</Text>
                                                            </View>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Mail</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>{reportslist.names_i}</Text>
                                                            </View>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>{reportslist.mail_i}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.infosubtitle}>Description:</Text>
                                                            </View>
                                                        </View>

                                                        <View style={globalStyles.tableRowReport}>
                                                            <View style={globalStyles.tableColumnTotalsReports}>
                                                                <Text style={globalStyles.textLineItemReport}>{reportslist.des}</Text>
                                                            </View>
                                                        </View>
													</View>
											
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


export default ReportFeedback;