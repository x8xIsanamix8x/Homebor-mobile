import React, { Component, useState} from 'react';
import { View, Image, RefreshControl, Modal, TouchableHighlight, Alert, Platform, Dimensions } from 'react-native'
import { NativeBaseProvider, Text, Spinner, Heading, FormControl, Input, Stack, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center} from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';

import globalStyles from '../styles/global';

import {Picker} from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

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

            modalVisible : false, 
            setModalVisible : false,

            imagereport: 'NULL',
            photo1 : 'yes',

            des : '',
            report : '',

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
        
        //Get profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})


        if(this.state.connection_status == true) {
            //Get Reports list
            let reportslist = await api.getStudentoreport(this.state.email)
            this.setState({ info : reportslist, name_h: reportslist[0].data.name, l_name_h: reportslist[0].data.l_name})

            //Variables of modal
		    this.setState({modalVisible : false, setModalVisible : false, loading : false, connection_refreshStatus: false, readyDisplay : true})         
        } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Permissions function call
        this.getPermissionAsync();

        //Refresh function when open this screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });
    }

    //Permissions function to access to the gallery in the phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.');               
            }
        }
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
        if(this.state.connection_status == true) {          
            //Get report list
            let reportslist = await api.getStudentoreport(this.state.email)
            this.setState({ info : reportslist, name_h: reportslist[0].data.name, l_name_h: reportslist[0].data.l_name})

            //Variables of modal
            this.setState({modalVisible : false, setModalVisible : false})
            this.setState({report : 'NULL', imagereport: 'NULL', photo1 : 'yes', loading : false, connection_refreshStatus: false, readyDisplay : true})
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
        //this.props.navigation.navigate('ReportInit')
    }

    //Open modal function
      modalopen = async() => {
        this.setState({modalVisible : true, setModalVisible : true})
    }

    //Close modal function
    modalclose = async() => {
      this.setState({modalVisible : false, setModalVisible : false})
    }

    modalnotify = async () => {
        let email = this.state.email
        let mail = this.state.mail

        console.log(this.state.email, this.state.mail)

        //Api of user duplicated validation
        return await fetch(`https://homebor.com/verifyreportapp.php?email=${email}&mail=${mail}`, {
                method: 'POST',
                header: {
                    'Content-Type': 'multipart/form-data'
                },
              }).then(res => res.json())
                .catch(error => console.error('Error', error))
                .then(response => {
                  if (response.status == 1) {
                    Alert.alert(`${this.state.name_s} ${this.state.l_name_s} already has an active report`)
                  }
                  else {
                    this.initReport()
                  }
                });
    }

    initReport = async() => {
        let localUri = this.state.imagereport;
        if (this.state.des == '' && this.state.report == '' && this.state.imagereport == 'NULL'){
            Alert.alert('All fields are required')
        }else{
            if (localUri == 'NULL') {
                console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
                api.reportStudent(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
                this.setState({modalVisible : false, setModalVisible : false})
                this.props.navigation.navigate('Reports')
            } else {
                this.registerfile1() 
                this.setState({modalVisible : false, setModalVisible : false})
                this.props.navigation.navigate('Reports')
            }
        }
    }

    _AlertReport = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera(),},
              {text: 'Folder', onPress: () => this._pickImage()},
            ],
            { cancelable: true }
          )
    }

    //Function to catch image from frontend
    _pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                imagereport: result.uri
            });


        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                imagereport: result.uri
            });


        }
    }

    //Functions to register the images to database
    registerfile1 = async () => {
    
        let localUri = this.state.imagereport;

        //Files
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

    

        let formData = new FormData();
        formData.append('photo', { uri: localUri, name: filename, type: type });

        console.log('Comprobante de envio')
        console.log(formData);
  
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let des = this.state.des
          let eMail = this.state.email;
          let idnoti = this.state.idnoti;
          let name_h = this.state.name_h; 
          let l_name_h = this.state.l_name_h;
          let managermail = this.state.managermail;
          let agency = this.state.agency;
          let mail = this.state.mail;
          let report = this.state.report;
          let photo1 = 'yes';

          console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report)

          return await fetch(`https://homebor.com/reportstudentapp.php?name_h=${name_h}&l_name_h=${l_name_h}&email=${eMail}&managermail=${managermail}&agency=${agency}&mail=${mail}&des=${des}&idnoti=${idnoti}&report=${report}&photo1=${photo1}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                console.log('Succesfully')
              }
              else {
                console.log('Error')
              }
            });
    };

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
    
    componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;
    }


    render() {
        let modalVisible = this.state.modalVisible;
        let setModalVisible = this.state.setModalVisible;
        let { imagereport } = this.state;
        
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
                                    <Text color="esmerald.600" fontWeight="medium">You are connected</Text>
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
                            source={require('../assets/img/empty/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet}
                            />
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
                    </View>
                )}

                {this.state.readyDisplay == true && (
                    <View>
                    {this.state.connection_refreshStatus != false && (
                        <View>

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
                            resizeMode="cover"
                            source={require('../assets/img/empty/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet} />
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
                                        {!item.studentslist ? <View><Card><Text style={globalStyles.NotiDont}>You do not have students to report</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="cover" source={require('../assets/img/empty/nostudent.png')} style={globalStyles.imageNotInternet}/></View></View> : item.studentslist.map((studentslist) =>
                                            <View key={studentslist.id}>
                                                <TouchableOpacity key={studentslist.id} onPress={ () =>this.modalopen(
                                                        this.setState({mail : studentslist.user_i_mail, idnoti : studentslist.id_not, agency : studentslist.agency, managermail : studentslist.managermail, name_s : studentslist.name_s, l_name_s : studentslist.l_name_s}, console.log(this.state.mail), console.log(this.state.idnoti), console.log(this.state.agency), console.log(this.state.managermail), console.log(this.state.name_s), console.log(this.state.l_name_s)))}> 

                                                    <Card>
                                                        <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                            <HStack space="2" alignItems="center">
                                                                <Center>
                                                                    <Avatar size="lg" style={globalStyles.AvatarReportList} bg="#232159" source={ studentslist.photo != "NULL" && { uri: `http://homebor.com/${studentslist.photo}` }}>{studentslist.name_s.toUpperCase().charAt(0)}</Avatar>
                                                                </Center>
                                                                <Stack width="80%" py="5">
                                                                    <VStack ml="10%">
                                                                        <Text style={globalStyles.ReportsBoldText}>{studentslist.name_s} {studentslist.l_name_s}</Text>
                                                                    </VStack>
                                                                    <VStack ml="10%" mt="7%">
                                                                        <HStack>
                                                                            <Text style={globalStyles.ReportInitBoldText}>Room Occupied: </Text>
                                                                            <Text style={globalStyles.textReports}>{!studentslist.room ? null : studentslist.room}</Text>
                                                                        </HStack>
                                                                    </VStack>
                                                                </Stack>
                                                            </HStack>
                                                        </Stack>
                                                    </Card>
                                                </TouchableOpacity>  
                                            </View>
                                        )}
                                        <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                Alert.alert('Modal has been closed.');
                                                }}>
                                                <View style={globalStyles.centeredViewModal}>
                                                <View style={globalStyles.modalView}>
                                                    <Text style={globalStyles.titleModalR}>Report Details</Text>
                                                    <FormControl>
                                                        <View style={globalStyles.pickerviewModalR}>
                                                            <Picker
                                                                style={globalStyles.pickerModalR}
                                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 15}}
                                                                selectedValue={this.state.report == 'NULL' ? "Report Tilte" : this.state.report}
                                                                onValueChange={(report) => this.setState({report})}>
                                                                    <Picker.Item label="- Report Tilte -" value="NULL" />
                                                                    <Picker.Item label="Cancel Reservation" value="Cancel Reservation" /> 
                                                                    <Picker.Item label="Report Situation" value="Report Situation"/>
                                                            </Picker>
                                                        </View>
                                                        <Stack >
                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <Input
                                                                            placeholder="Describe the problem. No special characters"
                                                                            multiline={true}
                                                                            numberOfLines={4} 
                                                                            onChangeText={ (des) => this.setState({des}) }
                                                                            style={ globalStyles.inputedit}
                                                                            
                                                                        />
                                                            </Stack>
                                                        </Stack>

                                                        <View style={globalStyles.buttonsreport}>
                                                            <TouchableOpacity onPress={()=>this._AlertReport()}>
                                                                <Card style={globalStyles.shadowbox}>
                                                                    <Heading size='md' style={globalStyles.butonfiledit}> Add Report Image</Heading>
                                                                        <View style={ globalStyles.underlinig }/>
                                                                            {imagereport == 'NULL' ?
                                                                            <Text></Text>
                                                                            :<Image source={{uri: imagereport}}
                                                                            style={globalStyles.ImageReportInit} />}
                                                                </Card>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </FormControl>

                                                        <TouchableHighlight
                                                        style={{ ...globalStyles.cancelModalR }}
                                                        onPress={() => this.modalclose()}>
                                                        <Text style={globalStyles.textStyleModal}>Cancel</Text>
                                                        </TouchableHighlight>

                                                    {this.state.connection_status ? 
                                                        
                                                        <TouchableHighlight
                                                        style={{ ...globalStyles.notifyModalR }}
                                                        onPress={() => this.modalnotify()}>
                                                        <Text style={globalStyles.textStyleModal}>Notify</Text>
                                                        </TouchableHighlight>

                                                    : 
                                                        
                                                        <TouchableHighlight
                                                        style={{ ...globalStyles.notifyModalR }}
                                                        onPress={() => this.noInternetConnection()}>
                                                        <Text style={globalStyles.textStyleModal}>Notify</Text>
                                                        </TouchableHighlight>

                                                        }
                                                    
                                                        
                                                </View>
                                                </View>
                                                

                                            </Modal>
                                    </View>
                                )}                    
                            />


                            
                        
                        </View>
                    )}
                    </View>
                )}
                </View>
            </NativeBaseProvider>
        )
    }
}