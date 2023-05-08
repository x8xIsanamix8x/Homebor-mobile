import React, {Component, useState} from 'react';
import { View, Image, Platform, Alert, RefreshControl, Dimensions} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';

import {Picker} from '@react-native-picker/picker';

import { FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


import globalStyles from '../styles/global';
import Card from '../shared/card';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { StatusBar } from 'expo-status-bar';

import api from '../api/api';

import NetInfo from "@react-native-community/netinfo";

export default class AdditionalEdit extends Component {
    NetInfoSubscription = null;
    constructor(props) {
        super(props);
        this.state = {
            //User Variables 
            email : '',
            perm : false,
            info : [],
            refreshing: false,

            //Internet Connection
            connection_status: false,
            connection_refreshStatus: false,
            clockrun : false,

            //LoadingFirstTime
            readyDisplay : false
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange )
  
        //Get user variables
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
      
  
        if(this.state.connection_status == true) {
            //Get user profile data variables
            let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
            this.setState({ info : profile, connection_refreshStatus: false})

            //Data for cache
            let cache = await AsyncStorage.getItem('aditionalInfoCache')
            cache = JSON.parse(cache)
            if(JSON.stringify(cache) !== JSON.stringify(profile)) {
                await AsyncStorage.setItem('aditionalInfoCache',JSON.stringify(profile))
                
            }
        
            //Get user profile data variables to determinate states for checkbox
            let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
            this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor, readyDisplay : true, loading : false})

            //Data for cache
            let cache2 = await AsyncStorage.getItem('aditionalStateCache')
            cache2 = JSON.parse(cache2)
            if(JSON.stringify(cache2) !== JSON.stringify(profile2)) {
                await AsyncStorage.setItem('aditionalStateCache',JSON.stringify(profile2))
                
            }
        } else {
            //Data for cache
            let cache = await AsyncStorage.getItem('aditionalInfoCache')
            cache = JSON.parse(cache)

            let cache2 = await AsyncStorage.getItem('aditionalStateCache')
            cache2 = JSON.parse(cache2)
            if(cache == null && cache2 == null) {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            } else {
                let profile = cache
                this.setState({ info : profile, connection_refreshStatus: false})

                let profile2 = cache2
                this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor, readyDisplay : true, loading : false})

            }
        }
  
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onRefresh()
        });
    }

    //Function to register data to database
    registerbasici = async () => {
        api.registeradditionalinfo(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.g_pre,this.state.ag_pre,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f, this.state.health_f2, this.state.health_f, this.state.num_mem, this.state.backg, this.state.backl, this.state.religion2, this.state.religion, this.state.condition_m2, this.state.condition_m, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background, this.state.idm)
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
    }

    refresh = async() => {
        if(this.state.connection_status == true) {
            //Get user variables
            let userLogin = await AsyncStorage.getItem('userLogin')
            userLogin = JSON.parse(userLogin)
            this.setState({ email : userLogin.email, perm : userLogin.perm})

            //Get user profile data variables
            let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
            this.setState({ info : profile, connection_refreshStatus: false})

            //Data for cache
            let cache = await AsyncStorage.getItem('aditionalInfoCache')
            cache = JSON.parse(cache)
            if(JSON.stringify(cache) !== JSON.stringify(profile)) {
                await AsyncStorage.setItem('aditionalInfoCache',JSON.stringify(profile))
                
            }
        
            //Get user profile data variables to determinate states for checkbox
            let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
            this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor, readyDisplay : true, loading : false})

            //Data for cache
            let cache2 = await AsyncStorage.getItem('aditionalStateCache')
            cache2 = JSON.parse(cache2)
            if(JSON.stringify(cache2) !== JSON.stringify(profile2)) {
                await AsyncStorage.setItem('aditionalStateCache',JSON.stringify(profile2))
                
            }
        } else {
            //Data for cache
            let cache = await AsyncStorage.getItem('aditionalInfoCache')
            cache = JSON.parse(cache)

            let cache2 = await AsyncStorage.getItem('aditionalStateCache')
            cache2 = JSON.parse(cache2)
            if(cache == null && cache2.length == null) {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            } else {
                let profile = cache
                this.setState({ info : profile, connection_refreshStatus: false})

                let profile2 = cache2
                this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor, readyDisplay : true, loading : false})

            }
        }
    }

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    tryAgainNotConnection = () => {
        this.setState({clockrun : true})
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
                    <View style={globalStyles.skeletonMarginTop}>
                        <Center w="100%">
                            <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                                <View style={globalStyles.skeletonMarginProfileText}>
                                    <HStack space="2" alignItems="center">
                                        <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                                    </HStack>
                                </View>
                                <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                                    <View style={globalStyles.skeletonMarginProfileText}>
                                        <HStack space="2" alignItems="center">
                                            <Skeleton size="5" rounded="full" />
                                            <Skeleton h="3" flex="2" rounded="full" />
                                        </HStack>
                                    </View>
                                    <Skeleton.Text px="5" />
                                    <Skeleton.Text px="5" my="4" />
                                    <Skeleton.Text px="5" my="4" />
                                </VStack>
                                <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                            </VStack>
                        </Center>
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
                        <View style={globalStyles.container}>
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

                                <FlatList 
                                    data={this.state.info}
                                    extraData={this.state.info}
                                    keyExtractor={item => `${item.info}`}
                                    ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                                    nestedScrollEnabled={true}
                                    bounces={false}
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
                                        <View style={ globalStyles.contenido }>
                                            <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                                                <View>

                                                    <View style={globalStyles.marginTopRequiredFields}>
                                                        <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                                                    </View>

                                                    <FormControl>
                                                        {/*Additional Information*/}
                                                        <Card>
                                                            {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                <Stack alignItems="center" width="100%">
                                                                    <HStack alignItems="center">
                                                                        <VStack width="90%">
                                                                            <View>
                                                                                <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Additional Information:</Heading>
                                                                            </View>  
                                                                        </VStack>
                                                                        <Center size="12" width="10%">
                                                                            <Image
                                                                                source={require("../assets/img/editIcons/additional-info-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.editiconsNativeBase}
                                                                            />
                                                                        </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}
                                                            {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                <Stack alignItems="center">
                                                                    <HStack alignItems="center">
                                                                    <Center width="35%">
                                                                        <View>
                                                                        <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Additional Information:</Heading>
                                                                        </View> 
                                                                    </Center>
                                                                    <Center size="12">
                                                                        <Image
                                                                            source={require("../assets/img/editIcons/additional-info-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.editiconsNativeBase}
                                                                        />
                                                                    </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Description</Text></FormControl.Label>
                                                                    <Input 
                                                                        multiline={true}
                                                                        numberOfLines={4} 
                                                                        defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                                                        onChangeText={ (des) => this.setState({des}) }
                                                                        placeholder="Describe your house using few words, no special characters."
                                                                        style={ globalStyles.inputedit}
                                                                        />
                                                            </Stack>
  
                                                            <View inlineLabel last style={globalStyles.hideContents} >
                                                                <Input 
                                                                    defaultValue={item.data.mail_h}
                                                                    onChangeText={ (email) => this.setState({email}) }
                                                                    style={ globalStyles.inputedit}
                                                                />
                                                            </View>
  
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender Preference</Text></FormControl.Label> 
            
                                                            <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={this.state.g_pre}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(g_pre) => this.setState({g_pre})}>
                                                                        <Picker.Item label="Male" value="Male" /> 
                                                                        <Picker.Item label="Female" value="Female" />
                                                                        <Picker.Item label="Any" value="Any" />
                                                                </Picker>
                                                            </View>
  
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Age Preference</Text></FormControl.Label>
            
                                                                <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                    <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo} 
                                                                        selectedValue={this.state.ag_pre}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                                                            <Picker.Item label="Teenager" value="Teenager" /> 
                                                                            <Picker.Item label="Adult" value="Adult" />
                                                                            <Picker.Item label="Any" value="Any" />
                                                                    </Picker>
                                                                </View>
                                                        </Card>

                                                        {/*Any Member of your Family:*/}
                                                        <Card>
                                                            {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                <Stack alignItems="center" width="100%">
                                                                    <HStack alignItems="center">
                                                                        <VStack width="90%">
                                                                            <View>
                                                                                <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Any Member of your Family:</Heading>
                                                                            </View>  
                                                                        </VStack>
                                                                        <Center size="12" width="10%">
                                                                            <Image
                                                                                source={require("../assets/img/editIcons/profile2-64.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.editiconsNativeBase}
                                                                            />
                                                                        </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}
                                                            {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                <Stack alignItems="center">
                                                                    <HStack alignItems="center">
                                                                    <Center width="45%">
                                                                        <View>
                                                                        <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Any Member of your Family:</Heading>
                                                                        </View> 
                                                                    </Center>
                                                                    <Center size="12">
                                                                        <Image
                                                                            source={require("../assets/img/editIcons/profile2-64.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.editiconsNativeBase}
                                                                        />
                                                                    </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}

                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have Allergies?</Text></FormControl.Label>
  
                                                            <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                {this.state.allergies2 === 'NULL' ?
                                                                    //NULL
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"NULL"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(allergies2) => this.setState({allergies2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : this.state.allergies2 === 'No' ?
                                                                    
                                                                    //NO 
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"No"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(allergies2) => this.setState({allergies2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : 
                
                                                                    //YES
                                                                    <View>
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"Yes"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(allergies2) => this.setState({allergies2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker>
                
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Allergy</Text></FormControl.Label>
                                                                                <Input 
                                                                                        defaultValue={item.data.allergies == 'NULL' ? '' : item.data.allergies}
                                                                                        onChangeText={ (allergies) => this.setState({allergies}) }
                                                                                        style={ globalStyles.inputedit}
                                                                                    />
                                                                            </Stack>
                                                                    </View>
                                                                
                                                                }
                                                            </View>
  
  
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Take any Medication?</Text></FormControl.Label>
  
                                                  
                                                            <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                {this.state.medic_f2 === 'NULL' ?
                                                                    //NULL
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"NULL"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : this.state.medic_f2 === 'No' ?
                                                                    
                                                                    //NO 
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"No"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : 
        
                                                                    //YES
                                                                    <View>
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"Yes"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker>
        
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Medication</Text></FormControl.Label>
                                                                                <Input 
                                                                                        defaultValue={item.data.medic_f == 'NULL' ? '' : item.data.medic_f}
                                                                                        onChangeText={ (medic_f) => this.setState({medic_f}) }
                                                                                        style={ globalStyles.inputedit}
                                                                                />
                                                                            </Stack>
                                                                    </View>
                                                                
                                                                }
                                                            
                                                            </View>
  
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have health problems?</Text></FormControl.Label>
  
                                                            <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                {this.state.health_f2 === 'NULL' ?
                                                                    //NULL
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"NULL"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(health_f2) => this.setState({health_f2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : this.state.health_f2 === 'No' ?
                                                                    
                                                                    //NO 
                                                                    <Picker
                                                                    mode="dropdown"
                                                                    style={globalStyles.pickerBasicinfo}
                                                                    selectedValue={"No"}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(health_f2) => this.setState({health_f2})}>
                                                                        <Picker.Item label="Select" value="NULL" /> 
                                                                        <Picker.Item label="Yes" value="Yes" /> 
                                                                        <Picker.Item label="No" value="No" />
                                                                    </Picker> : 
        
                                                                    //YES
                                                                    <View>
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"Yes"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(health_f2) => this.setState({health_f2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker>
        
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Problems</Text></FormControl.Label>
                                                                            <Input 
                                                                                    defaultValue={item.data.health_f == 'NULL' ? '' : item.data.health_f}
                                                                                    onChangeText={ (health_f) => this.setState({health_f}) }
                                                                                    style={ globalStyles.inputedit}
                                                                                />
                                                                            </Stack>
                                                                    </View>
                                                                
                                                                }
                                                            </View>
                                                        </Card>

                                                        {/*Family Preference*/}
                                                        <Card>
                                                            {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                <Stack alignItems="center" width="100%">
                                                                    <HStack alignItems="center">
                                                                        <VStack width="90%">
                                                                            <View>
                                                                                <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Family Preference:</Heading>
                                                                            </View>  
                                                                        </VStack>
                                                                        <Center size="12" width="10%">
                                                                            <Image
                                                                                source={require("../assets/img/editIcons/profile2-64.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.editiconsNativeBase}
                                                                            />
                                                                        </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}
                                                            {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                <Stack alignItems="center">
                                                                    <HStack alignItems="center">
                                                                    <Center width="35%">
                                                                        <View>
                                                                        <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Family Preference:</Heading>
                                                                        </View> 
                                                                    </Center>
                                                                    <Center size="12">
                                                                        <Image
                                                                            source={require("../assets/img/editIcons/profile2-64.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.editiconsNativeBase}
                                                                        />
                                                                    </Center>
                                                                    </HStack>
                                                                </Stack>
                                                            )}

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Number of Family Members</Text></FormControl.Label>
                                                                <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                    <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        selectedValue={this.state.num_mem == 'NULL' ? "Select"  : this.state.num_mem}
                                                                        onValueChange={ (num_mem) => this.setState({num_mem}) }>
                                                                            <Picker.Item label="-- Select --" value="NULL" />
                                                                            <Picker.Item label="1" value="1" /> 
                                                                            <Picker.Item label="2" value="2" />
                                                                            <Picker.Item label="3" value="3" />
                                                                            <Picker.Item label="4" value="4" />
                                                                            <Picker.Item label="5" value="5" />
                                                                            <Picker.Item label="6" value="6" />
                                                                            <Picker.Item label="7" value="7" />
                                                                            <Picker.Item label="8" value="8" />
                                                                    </Picker>
                                                                </View>
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background</Text></FormControl.Label>
                                                                <Input 
                                                                    defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                                                    onChangeText={ (backg) => this.setState({backg}) }
                                                                    placeholder="e.g. Canadian"
                                                                    style={ globalStyles.inputedit}
                                                                />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Language</Text></FormControl.Label>
                                                                    <Input 
                                                                        defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                                                        onChangeText={ (backl) => this.setState({backl}) }
                                                                        placeholder="e.g. English"
                                                                        style={ globalStyles.inputedit}
                                                                    />
                                                            </Stack>

                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Religion to which you belong?</Text></FormControl.Label>
  
                                                                <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                    {this.state.religion2 === 'NULL' ?
                                                                        //NULL
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"NULL"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(religion2) => this.setState({religion2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker> : this.state.religion2 === 'No' ?
                                                                        
                                                                        //NO 
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"No"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(religion2) => this.setState({religion2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker> : 
            
                                                                        //YES
                                                                        <View>
                                                                            <Picker
                                                                            mode="dropdown"
                                                                            style={globalStyles.pickerBasicinfo}
                                                                            selectedValue={"Yes"}
                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                            onValueChange={(religion2) => this.setState({religion2})}>
                                                                                <Picker.Item label="Select" value="NULL" /> 
                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                <Picker.Item label="No" value="No" />
                                                                            </Picker>
            
                                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Which Religion?</Text></FormControl.Label>
                                                                                <Input 
                                                                                        defaultValue={item.data.religion == 'NULL' ? '' : item.data.religion}
                                                                                        onChangeText={ (religion) => this.setState({religion}) }
                                                                                        style={ globalStyles.inputedit}
                                                                                    />
                                                                                </Stack>
                                                                        </View>
                                                                            
                                                                    }
                                                                    
                                                                </View>

                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Any Physical or Mental Condition?</Text></FormControl.Label>

                                                                <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                    {this.state.condition_m2 === 'NULL' ?
                                                                        //NULL
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"NULL"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker> : this.state.condition_m2 === 'No' ?
                                                                        
                                                                        //NO 
                                                                        <Picker
                                                                        mode="dropdown"
                                                                        style={globalStyles.pickerBasicinfo}
                                                                        selectedValue={"No"}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                                            <Picker.Item label="Select" value="NULL" /> 
                                                                            <Picker.Item label="Yes" value="Yes" /> 
                                                                            <Picker.Item label="No" value="No" />
                                                                        </Picker> : 
            
                                                                        //YES
                                                                        <View>
                                                                            <Picker
                                                                            mode="dropdown"
                                                                            style={globalStyles.pickerBasicinfo}
                                                                            selectedValue={"Yes"}
                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                            onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                                                <Picker.Item label="Select" value="NULL" /> 
                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                <Picker.Item label="No" value="No" />
                                                                            </Picker>
            
                                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Which Condition?</Text></FormControl.Label>
                                                                                <Input 
                                                                                        defaultValue={item.data.condition_m == 'NULL' ? '' : item.data.condition_m}
                                                                                        onChangeText={ (condition_m) => this.setState({condition_m}) }
                                                                                        style={ globalStyles.inputedit}
                                                                                    />
                                                                                </Stack>
                                                                        </View>
                                                                    
                                                                    }
                                                
                                                                </View>

                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have they committed misdemeanor?</Text></FormControl.Label>
  
                                                                    <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                        {this.state.misdemeanor2 === 'NULL' ?
                                                                            //NULL
                                                                            <Picker
                                                                            mode="dropdown"
                                                                            style={globalStyles.pickerBasicinfo}
                                                                            selectedValue={"NULL"}
                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                            onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                                                <Picker.Item label="Select" value="NULL" /> 
                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                <Picker.Item label="No" value="No" />
                                                                            </Picker> : this.state.misdemeanor2 === 'No' ?
                                                                            
                                                                            //NO 
                                                                            <Picker
                                                                            mode="dropdown"
                                                                            style={globalStyles.pickerBasicinfo}
                                                                            selectedValue={"No"}
                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                            onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                                                <Picker.Item label="Select" value="NULL" /> 
                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                <Picker.Item label="No" value="No" />
                                                                            </Picker> : 
                
                                                                            //YES
                                                                            <View>
                                                                                <Picker
                                                                                mode="dropdown"
                                                                                style={globalStyles.pickerBasicinfo}
                                                                                selectedValue={"Yes"}
                                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                                onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                                                    <Picker.Item label="Select" value="NULL" /> 
                                                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                                                    <Picker.Item label="No" value="No" />
                                                                                </Picker>
                
                                                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify</Text></FormControl.Label>
                                                                                    <Input 
                                                                                            defaultValue={item.data.misdemeanor == 'NULL' ? '' : item.data.misdemeanor}
                                                                                            onChangeText={ (misdemeanor) => this.setState({misdemeanor}) }
                                                                                            style={ globalStyles.inputedit}
                                                                                        />
                                                                                    </Stack>
                                                                            </View>
                                                                        
                                                                        }
                                                                
                                                                    </View>

                                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Do you give us consent to go to the authorities and check your criminal background check?</Text></FormControl.Label>
  
                                                                    <View style={Platform.OS === 'ios' ? globalStyles.editMargintop : globalStyles.pickerAndroid}>
                                                                        <Picker
                                                                            mode="dropdown"
                                                                            style={globalStyles.pickerBasicinfo}
                                                                            selectedValue={this.state.c_background}
                                                                            itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                            onValueChange={(c_background) => this.setState({c_background})}>
                                                                                <Picker.Item label="Select" value="NULL" /> 
                                                                                <Picker.Item label="Yes" value="Yes" /> 
                                                                                <Picker.Item label="No" value="No" />
                                                                        </Picker>
                                                                    </View>
                                                        </Card>
                                                    </FormControl>
                                                </View>

                                                <View>

                                                    <Button
                                                        success
                                                        bordered
                                                        onPress={this.state.connection_status ? this.registerbasici : this.noInternetConnection}
                                                        style={globalStyles.botonedit}
                                                        >

                                                        <Text style={globalStyles.botonTexto}> Update </Text>
                                                    </Button>
                                            
                                                </View> 
                                            </KeyboardAwareScrollView>
                                        </View>
                                    )}
                                />
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