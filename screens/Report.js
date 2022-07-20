import React, { Component, useState} from 'react';
import { View, Image, TouchableOpacity, RefreshControl, Alert, Dimensions } from 'react-native'
import { NativeBaseProvider, Text, Spinner, Icon, Heading, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center} from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import globalStyles from '../styles/global';

import NetInfo from "@react-native-community/netinfo";


export default class Reports extends Component {
    NetInfoSubscription = null;

    constructor(props){
		super(props);
		this.state = {
          //Variables
		  email : '',
		  perm : false,
		  info : [],
          refreshing: false,

          imagereport: 'NULL',
          photo1 : 'yes',

          report1 : -1,
          reports1 : 0,

          //Internet Connection
          connection_status: false,
          connection_refreshStatus: false,
          clockrun : false,

          //LoadingFirstTime
          readyDisplay : false
		}
	  }

	  async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange)
        
        //Get profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        if(this.state.connection_status == true) {
            //Get Reports list
            let reportslist = await api.getReportslist(this.state.email)
            this.setState({ info : reportslist, loading : false, connection_refreshStatus: false, readyDisplay : true})
        
        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }
        
        //Refresh function when open this screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onActive()
			this.onRefresh()
		  });

        this._onFocusListener = this.props.navigation.addListener('blur', () => {
            this.onRelease()
        });
	  }

      async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1){
            if(this.state.connection_status == true) {
                if (prevState.info !== this.state.info) {
                    let reportslist = await api.getReportslist(this.state.email)
                    this.setState({ info : reportslist, readyDisplay : true })
                }
            }
        }
      }

      onActive = () => { this.setState({ report1 : -1, reports1 : 0 }) }
        
      onRelease = () => { this.setState({ report1 : 0, reports1 : 0 }) }

	  //Refresh call function
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        //Refresh function
        refresh = async() => {
            if(this.state.connection_status == true) {
                //Get report list
                let reportslist = await api.getReportslist(this.state.email)
                this.setState({ info : reportslist, loading : false, connection_refreshStatus: false, readyDisplay : true})
            } else {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            }
          }

          //Function to get report id and take to the screen for that report feedback
		  feedback = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			this.props.navigation.navigate('ReportFeedback')
		}

        InitReport = async () => {
            this.props.navigation.navigate('ReportInit')
        }

        _handleConnectivityChange = (state) => {
            this.setState({ connection_status: state.isConnected, clockrun : true });
            this.Clock()
          }
        
          Clock = () => {
            this.timerHandle = setTimeout (() => {
              this.setState({clockrun : false});
              this.timerHandle = 0;
            }, 5000)
          }

          noInternetConnection = () => {
            Alert.alert('There is no internet connection, connect and try again.')
          }

          tryAgainNotConnection = () => {
            this.setState({clockrun : true})
            this.Clock()
          }
        
          componentWillUnmount(){
            this.NetInfoSubscription && this.NetInfoSubscription()
            clearTimeout(this.timerHandle)
            this.timerHandle = 0;
          }


  render() {
    
    
  return (
    <View style={globalStyles.container}>
        <View style={globalStyles.BackgroundNoti}>
            <NativeBaseProvider>
            {this.state.readyDisplay == false && (
                <View>
                    <View style={globalStyles.skeletonMarginTop}>
                        <Center w="100%">
                            <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }} p="4">
                                <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                <VStack flex="3" space="4">
                                    <Skeleton.Text />
                                </VStack>
                            </HStack>
                        </Center>
                    </View>

                    <View style={globalStyles.skeletonMarginTop}>
                        <Center w="100%">
                            <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }} p="4">
                                <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                <VStack flex="3" space="4">
                                    <Skeleton.Text />
                                </VStack>
                            </HStack>
                        </Center>
                    </View>

                    <View style={globalStyles.skeletonMarginTop}>
                        <Center w="100%">
                            <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }} p="4">
                                <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                <VStack flex="3" space="4">
                                    <Skeleton.Text />
                                </VStack>
                            </HStack>
                        </Center>
                    </View>

                    {Dimensions.get('window').width >= 414 &&(
                        <View>
                            <View style={globalStyles.skeletonMarginTop}>
                                <Center w="100%">
                                    <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                                    borderColor: "coolGray.500"
                                    }} _light={{
                                    borderColor: "coolGray.200"
                                    }} p="4">
                                        <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                        <VStack flex="3" space="4">
                                            <Skeleton.Text />
                                        </VStack>
                                    </HStack>
                                </Center>
                            </View>

                            <View style={globalStyles.skeletonMarginTop}>
                                <Center w="100%">
                                    <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                                    borderColor: "coolGray.500"
                                    }} _light={{
                                    borderColor: "coolGray.200"
                                    }} p="4">
                                        <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                        <VStack flex="3" space="4">
                                            <Skeleton.Text />
                                        </VStack>
                                    </HStack>
                                </Center>
                            </View>
                        </View>
                    )}
                </View>
            )}
            {this.state.readyDisplay == true && (
                <NativeBaseProvider>
                            {this.state.connection_refreshStatus != false && (
                                        <View>
                                            {this.state.refreshing == true && (
                                                <View style={globalStyles.spinnerRefreshInternet}>
                                                    <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
                                                </View>
                                            )}
                                                <Slide in={!this.state.clockrun ? false : true} placement="top">
                                                    {this.state.connection_status ?
                                                    <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
                                                    <VStack space={2} flexShrink={1} w="100%">
                                                    <HStack flexShrink={1} space={2}  justifyContent="center">
                                                        <Text color="emerald.600" fontWeight="medium">
                                                        <Text>You are connected</Text>
                                                        </Text>
                                                    </HStack>
                                                    </VStack>
                                                    </AlertNativeBase>
                                                    :
                                                    <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
                                                    <VStack space={2} flexShrink={1} w="100%">
                                                    <HStack flexShrink={1} space={2}  justifyContent="center">
                                                        <Text color="error.600" fontWeight="medium">
                                                        <AlertNativeBase.Icon />
                                                        <Text> No Internet Connection</Text>
                                                        </Text>
                                                    </HStack>
                                                    </VStack>
                                                    </AlertNativeBase>
                                                    }
                                                </Slide>

                                                <View style={globalStyles.WelcomeImageMargin}>
                                
                                                    <Image
                                                                                                                    
                                                        resizeMode="cover"
                                                        source={require('../assets/vacios-homebor-antena.png')}
                                                        style={globalStyles.imageNotInternet}
                                                    ></Image>

                                                </View>

                                                <View style={globalStyles.WelcomeTextandBoton}>
                                                    <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                                                    <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                                                </View>

                                                {this.state.connection_status ?
                                                    <View>
                                                        <Text onPress={this.onRefresh} style={globalStyles.createaccount}> Try Again </Text>
                                                    </View>
                                                : 
                                                    <View>
                                                        <Text onPress={this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                                                    </View>
                                                }

                                            </View>
                                            )}

                                    {this.state.connection_refreshStatus == false && (
                                        <NativeBaseProvider>
                                            <StatusBar style="light" translucent={true} />
                                                <Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
                                                    <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
                                                    <VStack space={2} flexShrink={1} w="100%">
                                                    <HStack flexShrink={1} space={2}  justifyContent="center">
                                                        <Text color="error.600" fontWeight="medium">
                                                        <AlertNativeBase.Icon />
                                                        <Text> No Internet Connection</Text>
                                                        </Text>
                                                    </HStack>
                                                    </VStack>
                                                    </AlertNativeBase>
                                                </Slide>  
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
                                                    />
                                                    }
                                                    renderItem={({item}) => (
                                                            <View>
                                                            
                                                        
                                                            {!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card></View> : item.reportslist.map((reportslist) => 
                                                                    <View key={reportslist.id_not}>

                                                                        <View style={globalStyles.show}>
                                                                        <TouchableOpacity key={reportslist.id_not} onPress={ () =>this.feedback(
                                                                                this.setState({idnoti : reportslist.id_not}, () => AsyncStorage.setItem('idnoti',JSON.stringify(reportslist.id_not))))}>

                                                                                    <View style={globalStyles.itemReportList}>

                                                                                        <View style={globalStyles.notiDate}>
                                                                                        {reportslist.dateisbigger == 'Yes' ?
                                                                                            <View style={{marginLeft: '65%', marginTop: '-6%'}}>
                                                                                                <Text style={globalStyles.ReportsTextDate}>{reportslist.date}</Text>
                                                                                            </View> :  
                                                                                            <View style={{marginLeft: '77%', marginTop: '-6%'}}>
                                                                                                <Text style={globalStyles.ReportsTextDate}>{reportslist.date}</Text>
                                                                                            </View> 
                                                                                        }
                                                                                        
                                                                                            <View style={globalStyles.inlineDataReportInit}>
                                                                                                <Text style={globalStyles.ReportsBoldText}>{reportslist.name_s} {reportslist.l_name_s}</Text>
                                                                                            </View>
                                                                                            <View style={globalStyles.inlineDataReportInit}>
                                                                                                <Text style={globalStyles.ReportsText}>{reportslist.title}</Text>
                                                                                            </View>

                                                                                            <Avatar size="lg" bg="#232159" style={ globalStyles.ReportimageBox } source={ reportslist.photo_s != "NULL" && { uri: `http://homebor.com/${reportslist.photo_s}` }}>{reportslist.name_s.toUpperCase().charAt(0)}
                                                                                                <Avatar.Badge bg={reportslist.status == 'Active' ? "green.500" : "red.500"}/>
                                                                                            </Avatar>
                                                                                        </View>

                                                                                        
                                                                                        
                                                                                    </View>
                                                                                </TouchableOpacity>

                                                                        </View>

                                                                    </View> 
                                                                                
                                                                )} 
                                                                

                                                        </View>
                                                        
                                                    
                                                )}> 
                                                </FlatList>

                                                {this.state.connection_status ?
                                                    <View>
                                                        <TouchableOpacity
                                                            style={globalStyles.IconCreateReport}
                                                            onPress={this.InitReport}>
                                                            <Icon as={FontAwesome} size="10" name="pencil" style={globalStyles.ReportIcons} />
                                                        </TouchableOpacity>
                                                    </View> 
                                                        :
                                                    <View>
                                                        <TouchableOpacity
                                                            style={globalStyles.IconCreateReport}
                                                            onPress={this.noInternetConnection}>
                                                            <Icon as={FontAwesome} size="10" name="pencil" style={globalStyles.ReportIcons} />
                                                        </TouchableOpacity>
                                                    </View> 
                                                }

                                    </NativeBaseProvider>
                                )}
                            </NativeBaseProvider>)}
                
            </NativeBaseProvider>
        </View>
    </View>
    
  );
}
}