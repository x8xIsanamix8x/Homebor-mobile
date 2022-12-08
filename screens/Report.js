import React, { Component, useState} from 'react';
import { View, Image, TouchableOpacity, RefreshControl, Alert, Dimensions, Platform} from 'react-native'
import { NativeBaseProvider, Text, Spinner, Icon, Heading, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Box, Fab, Stack} from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import globalStyles from '../styles/global';

import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from 'expo-file-system';

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

            //Data for cache
            let cache = await AsyncStorage.getItem('reportListCache')
            cache = JSON.parse(cache)
            if(JSON.stringify(cache) !== JSON.stringify(reportslist)) {
                await AsyncStorage.setItem('reportListCache',JSON.stringify(reportslist))
                
            }

            let reportsAll = await api.getAllReports(this.state.email)

            //Data for cache
            let cache2 = await AsyncStorage.getItem('reportsAllCache')
            cache2 = JSON.parse(cache2)
            if(JSON.stringify(cache2) !== JSON.stringify(reportsAll)) {
                await AsyncStorage.setItem('reportsAllCache',JSON.stringify(reportsAll))
                
            }

            this.ImagesCache()
            
        }else{
            let cache = await AsyncStorage.getItem('reportListCache')
            cache = JSON.parse(cache)
            if(cache == null) {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            } else {
                let reportslist = cache
                this.setState({ info : reportslist, loading : false, connection_refreshStatus: false, readyDisplay : true})

                this.ImagesCache()
            }
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

    ImagesCache = () => {
        this.state.info[0].reportslist.map(async (item) => {
        
            if(item.photo_s != 'NULL') {
                const photoStudents = `http://homebor.com/${item.photo_s}`;
                const pathStudents = FileSystem.cacheDirectory + `${item.photo_s}`;
                const studentsImage = await FileSystem.getInfoAsync(pathStudents);
            
                if (studentsImage.exists) {
                    this.setState({
                        [`${item.photo_s}`]: {uri: studentsImage.uri}
                    })
            
                } else {
                    const directoryInfo = await FileSystem.getInfoAsync(pathStudents);
                    if(!directoryInfo.exists) {
                        await FileSystem.makeDirectoryAsync(pathStudents, { intermediates: true }).then(async() => {
                            const newPhomePhoto = await FileSystem.downloadAsync(photoStudents, pathStudents)
                            this.setState({
                              [`${item.photo_s}`]: {uri: newPhomePhoto.uri}
                            })
            
                        });
                    } else {
                        const newPhomePhoto = await FileSystem.downloadAsync(photoStudents, pathStudents)
                            this.setState({
                              [`${item.photo_s}`]: {uri: newPhomePhoto.uri}
                            })
            
                    }
                }
                
            }
        })
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

            //Data for cache
            let cache = await AsyncStorage.getItem('reportListCache')
            cache = JSON.parse(cache)
            if(JSON.stringify(cache) !== JSON.stringify(reportslist)) {
                await AsyncStorage.setItem('reportListCache',JSON.stringify(reportslist))   
            }

            let reportsAll = await api.getAllReports(this.state.email)

            //Data for cache
            let cache2 = await AsyncStorage.getItem('reportsAllCache')
            cache2 = JSON.parse(cache2)
            if(JSON.stringify(cache2) !== JSON.stringify(reportsAll)) {
                await AsyncStorage.setItem('reportsAllCache',JSON.stringify(reportsAll))
                
            }

            this.ImagesCache()

        } else {
            let cache = await AsyncStorage.getItem('reportListCache')
            cache = JSON.parse(cache)
            if(cache == null) {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            } else {
                let reportslist = cache
                this.setState({ info : reportslist, loading : false, connection_refreshStatus: false, readyDisplay : true})

                this.ImagesCache()
            }
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
            <NativeBaseProvider>
                <StatusBar style="light" translucent={true} />
                <View>
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

                        {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
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
                    <View>
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
                                    <Text color="emerald.600" fontWeight="medium">You are connected</Text>
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
                            resizeMode="contain"
                            source={require('../assets/img/empty/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet} />
                        </View>

                        <View style={globalStyles.WelcomeTextandBoton}>
                            <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                            <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                        </View>

                        
                        <View>
                            <Text onPress={this.state.connection_status ? this.onRefresh : this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
                       
                        </View>
                    )}

                    {this.state.connection_refreshStatus == false && (
                        <View style={globalStyles.BackgroundNoti}>
                            <View>
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
                            </View>

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
                                            {!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="contain" source={require('../assets/img/empty/nostudent.png')} style={globalStyles.imageNotInternet}/></View></View> : item.reportslist.map((reportslist) =>
                                                <View key={reportslist.id_not}>
                                                    <View style={globalStyles.show}>
                                                        <TouchableOpacity key={reportslist.id_not} onPress={ () =>this.feedback(
                                                            this.setState({idnoti : reportslist.id_not}, () => AsyncStorage.setItem('idnoti',JSON.stringify(reportslist.id_not))))}>

                                                            <Card>
                                                                <Stack space="2" width="95%" alignItems="center" py="3" ml="3%">
                                                                    <HStack space="2" alignItems="center">
                                                                        <Center>
                                                                        <Avatar size="lg" bg="#232159" style={globalStyles.AvatarReportList} source={ reportslist.photo_s != "NULL" && this.state[reportslist.photo_s]}>{reportslist.name_s.toUpperCase().charAt(0)}
                                                                            <Avatar.Badge bg={reportslist.status == 'Active' ? "green.500" : "red.500"}/>
                                                                        </Avatar>
                                                                        </Center>
                                                                        <Stack width="50%" py="5">
                                                                            <VStack ml="10%">
                                                                                <Text style={globalStyles.ReportsBoldText}>{reportslist.name_s == 'NULL' ? null : reportslist.name_s} {reportslist.l_name_s == 'NULL' ? null : reportslist.l_name_s}</Text>
                                                                            </VStack>
                                                                            <VStack ml="10%">
                                                                                <Text style={globalStyles.ReportsText}>{reportslist.title == 'NULL' ? null : reportslist.title}</Text>
                                                                            </VStack>
                                                                        </Stack>
                                                                        {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                            <Stack mt="-15%" width="25%">
                                                                            
                                                                                {reportslist.dateisbigger == 'Yes' ?
                                                                                    <Text textAlign="right" style={globalStyles.ReportsTextDate}>{reportslist.date == 'NULL' ? null : reportslist.date}</Text>
                                                                                :  
                                                                                    <Text textAlign="right" style={globalStyles.ReportsTextDate}>{reportslist.date == 'NULL' ? null : reportslist.date}</Text>
                                                                                }
                                                                        
                                                                            </Stack>
                                                                        )}
                                                                        {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                            <Stack mt="-5%" width="25%">
                                                                            
                                                                                {reportslist.dateisbigger == 'Yes' ?
                                                                                    <Text textAlign="right" style={globalStyles.ReportsTextDate}>{reportslist.date == 'NULL' ? null : reportslist.date}</Text>
                                                                                :  
                                                                                    <Text textAlign="right" style={globalStyles.ReportsTextDate}>{reportslist.date == 'NULL' ? null : reportslist.date}</Text>
                                                                                }
                                                                        
                                                                            </Stack>
                                                                        )}
                                                                    </HStack>
                                                                </Stack>
                                                            </Card>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    )} 
                                
                                />

                                
                                <View>
                                    <Center>
                                        <Fab onPress={this.InitReport} renderInPortal={false} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="pencil" size="lg" />} />
                                    </Center>
                                </View> 
                                    
                            
                        
                        </View>
                    )}
                    </View>
                )}
                </View>
            </NativeBaseProvider>
        )
    }
}