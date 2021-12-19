import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl, Icon } from 'react-native'
import { NativeBaseProvider, Text, Spinner } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


import globalStyles from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';

export default class Notification extends Component {

    constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
          refreshing: false,
		}
	  }

	  async componentDidMount(){
		
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });

		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        //console.log(userLogin)

		let notifications = await api.getNotifications(this.state.email,this.state.perm)
		this.setState({ info : notifications, loading : false})
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
            let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})

			//console.log(userLogin)

			let notifications = await api.getNotifications(this.state.email,this.state.perm)
			this.setState({ info : notifications, loading : false})
			console.log("nuevo")
			console.log(this.state.info)
          }

		  edit = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('Studentnot')
		}

		edit2  = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('Studentinfo')
		}

		report = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			console.log(this.state.idnoti)
			api.markviewNotification(this.state.idnoti)

			this.props.navigation.navigate('Reports')
		}

		report2 = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})
			
			this.props.navigation.navigate('Reports')
			
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
                            {!item.notification ? <View><Card><Text style={globalStyles.NotiDont}>You don't have notification request</Text></Card></View> : item.notification.map((notification) => 
                                        <View key={notification.id} >

                                            {/*Student Request new Notification */}
                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title != 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit(
                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
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
                                                                            <Text style={globalStyles.infosubtitle}>Arriving Date:</Text> 
                                                                            <Text>{!notification.start ? null : notification.start}</Text>
                                                                        </View>
                                                                        <View style={globalStyles.inlineData}>
                                                                            <Text style={globalStyles.infosubtitle}>Leaving Date:</Text> 
                                                                            <Text>{!notification.end ? null : notification.end}</Text>
                                                                        </View>
                                                                        <View style={globalStyles.inlineData}>
                                                                            <Text style={globalStyles.infosubtitle}>Arriving From:</Text> 
                                                                            <Text>{!notification.end ? null : notification.agency}</Text>
                                                                        </View>
                                                                </View>
                                                                <Image
                                                                    source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                    resizeMode="contain"
                                                                    style={ globalStyles.imageNoti }
                                                                ></Image>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>
                                            
                                            {/*Report new Notification */}
                                            <View style={notification.confirmed == 0 && notification.report_s != 'NULL' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id} onPress={ () =>this.report(
                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                            
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*Student Request old Notification */}
                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s == 'NULL' && notification.title != 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
                                                                        <Text> was accepted to</Text> 
                                                                        <Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
                                                                    </View>
                                                                </Card>
                                                                
                                                                <View style={globalStyles.notiDate}>
                                                                        <View style={globalStyles.inlineData}>
                                                                            <Text style={globalStyles.infosubtitle}>Arriving Date:</Text> 
                                                                            <Text>{!notification.start ? null : notification.start}</Text>
                                                                        </View>
                                                                        <View style={globalStyles.inlineData}>
                                                                            <Text style={globalStyles.infosubtitle}>Leaving Date:</Text> 
                                                                            <Text>{!notification.end ? null : notification.end}</Text>
                                                                        </View>
                                                                        <View style={globalStyles.inlineData}>
                                                                            <Text style={globalStyles.infosubtitle}>Arriving From:</Text> 
                                                                            <Text>{!notification.end ? null : notification.agency}</Text>
                                                                        </View>
                                                                </View>
                                                                <Image
                                                                    source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                    resizeMode="contain"
                                                                    style={ globalStyles.imageNoti }
                                                                ></Image>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                                    
                                            {/*Report old Notification */}
                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.report2(
                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                    <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                            
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*3 weeks student reminder*/}
                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3w' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                            
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                            
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*3 weeks student old reminder*/}
                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3w' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*15th day student reminder*/}
                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*15th day student old reminder*/}
                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                            
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*3 day student reminder*/}
                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                           
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            {/*3 day student old reminder*/}
                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                <TouchableOpacity key={notification.id_s} > 
                                                        <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                          
                                                                <Card>
                                                                    <View style={globalStyles.inlineData}>
                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                        <Text>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                    </View>
                                                                </Card>
                                                                <View style={globalStyles.notiDate}>
                                                                    <Image
                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                        resizeMode="contain"
                                                                        style={ globalStyles.imageNoti }
                                                                    ></Image>
                                                                </View>
                                                           
                                                        </View>
                                                </TouchableOpacity>
                                            </View>

                                            

                                            {/*Student Rejected */}
                                            <View style={notification.confirmed != 0 && notification.status == 'Rejected' ? globalStyles.show : globalStyles.hideContents}>
                                                    <View style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                       
                                                            <Card>
                                                                <View style={globalStyles.inlineData}>
                                                                <MaterialIcons name="notifications" size={18} color="black" />
                                                                    <Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
                                                                    <Text> was rejected from</Text> 
                                                                    <Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
                                                                </View>
                                                            </Card>
                                                            <View style={globalStyles.notiDate}>
                                                                    <View style={globalStyles.inlineData}>
                                                                        <Text style={globalStyles.infosubtitle}>Arriving Date:</Text> 
                                                                        <Text>{!notification.start ? null : notification.start}</Text>
                                                                    </View>
                                                                    <View style={globalStyles.inlineData}>
                                                                        <Text style={globalStyles.infosubtitle}>Leaving Date:</Text> 
                                                                        <Text>{!notification.end ? null : notification.end}</Text>
                                                                    </View>
                                                                    <View style={globalStyles.inlineData}>
                                                                        <Text style={globalStyles.infosubtitle}>Arriving From:</Text> 
                                                                        <Text>{!notification.end ? null : notification.agency}</Text>
                                                                    </View>
                                                            </View>
                                                            <Image
                                                                source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                resizeMode="contain"
                                                                style={ globalStyles.imageNoti }
                                                            ></Image>
                                                       
                                                    </View>
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