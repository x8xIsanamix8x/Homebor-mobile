import React, { Component, useState} from 'react';
import { View, ScrollView, SectionList, Text, ImageBackground, RefreshControl, TouchableOpacity, Alert, Image, KeyboardAvoidingView,  Dimensions,  StyleSheet, Platform} from 'react-native'
import { NativeBaseProvider, Spinner, Input, Stack, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Stagger } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import globalStyles from '../styles/global';
import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class ReportFeedback extends Component {
  NetInfoSubscription = null;

  constructor(props) {
    super(props);
    this.state = {
       //Variables
		  email : '',
		  perm : false,
		  info : [],
          refreshing: false,
          modalVisible : false, 
		  setModalVisible : false,
          marked : [],
          
          imagereport: 'NULL',
          photo1 : 'yes',

          report1 : -1,
          reports1 : 0,
          send: 1,

          //Internet Connection
          connection_status: false,
          clockrun : false,

          //LoadingFirstTime
          readyDisplay : false
    };
  }

  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener(
        this._handleConnectivityChange,
      )

    //Get profile
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    //Get id of report
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})

    //Get Report data
    let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
    this.setState({ info : reportslist, loading : false, reportslist : reportslist[0].reportslist, reporttitle : reportslist[0].data.title})


    //State of modal
    this.setState({modalVisible : false, setModalVisible : false})

    //Reply report data required
    let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
    this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})

    //Permissions function call
    this.getPermissionAsync();

    this.anotherFunc();

    this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.onActive()
        this.onRefresh()
      });

    this._onFocusListener = this.props.navigation.addListener('blur', () => {
        this.onRelease()
    });

    
  }

  anotherFunc = () => { 
        let nextDay2 = this.state.reportslist
        let obj = nextDay2.reduce((acc, dt) => {
    
        const dateAcc = acc[dt.day_messages]
            


        if (!dateAcc) {
            acc[dt.day_messages] = {
                message: [{ 
                    count : dt.count,
                    date : dt.date,
                    day_messages : dt.day_messages,
                    des : dt.des,
                    hour_messages : dt.hour_messages,
                    id_r : dt.id_r,
                    mail_i : dt.mail_i,
                    names_i : dt.names_i,
                    report_img : dt.report_img,
                    view : dt.view,
                }]
            }
        } else {
            acc[dt.day_messages].message.push({ count : dt.count, date : dt.date, day_messages : dt.day_messages, des : dt.des, hour_messages : dt.hour_messages, id_r : dt.id_r, mail_i : dt.mail_i, names_i : dt.names_i, report_img : dt.report_img, view : dt.view,})
        }


        return acc
        }, {});
        this.setState({ marked : obj, readyDisplay : true});
        
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

    onActive = () => { this.setState({ report1 : -1, reports1 : 0 }); }
        
    onRelease = () => { this.setState({ report1 : 0, reports1 : 0 }); }

    async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1){
           if (prevState.info !== this.state.info) {
                let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
                this.setState({ info : reportslist, reportslist : reportslist[0].reportslist, reporttitle : reportslist[0].data.title})
                  
                if(this.state.send === 2) {
                    this.setState({send : 1})
                }else {}
                   this.anotherFunc();
              }
         }
      }

    cancelimage = () => {
        this.setState({imagereport : 'NULL'})

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

    //Get id of report
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})

    //Get Report data
    let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
    this.setState({ info : reportslist, loading : false, reportslist : reportslist[0].reportslist, reporttitle : reportslist[0].data.title })

    //State of modal
    this.setState({modalVisible : false, setModalVisible : false})

    //Reply report data required
    let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
    this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})

    //Permissions function call
    this.getPermissionAsync();

    this.anotherFunc();
    }

    //Open modal function
    modalopen = async() => {
        this.setState({modalVisible : true, setModalVisible : true})
    }

    //Close modal function
    modalclose = async() => {
      this.setState({modalVisible : false, setModalVisible : false})
    }

    //Reply modal function to database
    modalreply = async() => {
            let localUri = this.state.imagereport;
            if(this.state.des == null){
                if(this.state.des == null && localUri != 'NULL'){
                    Alert.alert('There must be a message with the photo')
                }
            }
            else{
                if (localUri == 'NULL') {
                    api.replyReports(this.state.des, this.state.email, this.state.idnoti, this.state.name_h, this.state.l_name_h, this.state.a_name, this.state.a_mail, this.state.stu_rep, this.state.status, this.state.imagereport)
                    this.setState({des : null})
                } 
                else {
                    this.registerfile1() 
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

        //Variables
        let des = this.state.des
        let eMail = this.state.email;
        let idnoti = this.state.idnoti;
        let name_h = this.state.name_h; 
        let l_name_h = this.state.l_name_h;
        let a_name = this.state.a_name;
        let a_mail = this.state.a_mail;
        let stu_rep = this.state.stu_rep;
        let status = this.state.status;
        let photo1 = this.state.photo1;

        
        return await fetch(`https://homebor.com/replyreportapp.php?des=${des}&email=${eMail}&idnoti=${idnoti}&name_h=${name_h}&l_name_h=${l_name_h}&a_name=${a_name}&a_mail=${a_mail}&stu_rep=${stu_rep}&status=${status}&photo1=${photo1}`, {
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
                this.setState({ des: null})
                this.setState({imagereport : 'NULL'})
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
      //Modal Variables
    let modalVisible = this.state.modalVisible;
    let setModalVisible = this.state.setModalVisible;
    let { imagereport } = this.state;
    const keyboardVerticalOffset = (Platform.OS === 'ios') ? 60 : -20

    const dateY2 = new Date(); dateY2.setDate(dateY2.getDate() - 1)
	let YDAY2=dateY2.getMonth()<9 ? dateY2.getDate()<=9 ? `0${dateY2.getMonth() + 1}-0${dateY2.getDate()}-${dateY2.getFullYear()}` : `0${dateY2.getMonth() + 1}-${dateY2.getDate()}-${dateY2.getFullYear()}` : dateY2.getDate()<=9 ? `${dateY2.getMonth() + 1}-0${dateY2.getDate()}-${dateY2.getFullYear()}` : `${dateY2.getMonth() + 1}-${dateY2.getDate()}-${dateY2.getFullYear()}`

    const dateY3 = new Date(); dateY3.setDate(dateY3.getDate())
	let YDAY3=dateY3.getMonth()<9 ? dateY3.getDate()<=9 ? `0${dateY3.getMonth() + 1}-0${dateY3.getDate()}-${dateY3.getFullYear()}` : `0${dateY3.getMonth() + 1}-${dateY3.getDate()}-${dateY3.getFullYear()}` : dateY3.getDate()<=9 ? `${dateY3.getMonth() + 1}-0${dateY3.getDate()}-${dateY3.getFullYear()}` : `${dateY3.getMonth() + 1}-${dateY3.getDate()}-${dateY3.getFullYear()}`

    return (
        <View style={globalStyles.container}>
            
        <ImageBackground source={require('../assets/img/backgrounds/chat-box.jpg')} style={globalStyles.ImageBackgroundNoti}>
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
                                <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                    <Skeleton.Text />
                                    <HStack space="2" alignItems="center">
                                        <Skeleton size="5" rounded="full" />
                                        <Skeleton h="3" flex="2" rounded="full" />
                                        <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                    </HStack>
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
                                <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                    <Skeleton.Text />
                                    <HStack space="2" alignItems="center">
                                        <Skeleton size="5" rounded="full" />
                                        <Skeleton h="3" flex="2" rounded="full" />
                                        <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                    </HStack>
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
                                <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                    <Skeleton.Text />
                                    <HStack space="2" alignItems="center">
                                        <Skeleton size="5" rounded="full" />
                                        <Skeleton h="3" flex="2" rounded="full" />
                                        <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                    </HStack>
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
                                        <VStack flex="3" space="4">
                                        <Skeleton startColor="indigo.300" />
                                            <Skeleton.Text />
                                            <HStack space="2" alignItems="center">
                                                <Skeleton size="5" rounded="full" />
                                                <Skeleton h="3" flex="2" rounded="full" />
                                                <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </Center>
                            </View>
                        </View>
                    )}

                    <View style={globalStyles.skeletonMarginTop}>
                        <Center w="100%">
                            <HStack w="90%"  borderWidth="1" space={8} rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }} p="4">
                                <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                </VStack>
                            </HStack>
                        </Center>
                    </View>
                </View>
            )}
            {this.state.readyDisplay == true && (
                <NativeBaseProvider>
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
                    <StatusBar style="light" translucent={true} />
                        <FlatList
                            inverted
                            data={this.state.info}
                            extraData={this.state.info}
                            ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
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
                            renderItem={({}) => (
                                
                                <View>
                                    <Stack space="2" width="100%" alignItems="center" mb="5%">
                                        <HStack space="2"  alignItems="center">
                                            <Center width="50%" style={globalStyles.BackgroundTitle} rounded="lg" py="2">
                                                <Text style={globalStyles.TitleReportFeedback}>{this.state.reporttitle}</Text>
                                            </Center>
                                        </HStack>
                                    </Stack>

                                    {Object.keys(this.state.marked).map(date => (
                                        <View key={date}>
                                            {/*Dates*/}
                                            <Stack space="2" width="100%" alignItems="center" mb="5%">
                                                <HStack space="2"  alignItems="center">
                                                    <Center width="50%" style={globalStyles.BackgroundTitle} rounded="lg" py="2">
                                                        {date == YDAY2 ?
                                                            <Text style={{textAlign : 'center', fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 14 :(Dimensions.get('window').width >= 414) ? 20 : 14, fontWeight : 'bold', color : 'white'}}>Yesterday</Text>
                                                            :
                                                            date == YDAY3 ?
                                                            <Text style={{textAlign : 'center', fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 14 : (Dimensions.get('window').width >= 414) ? 20 : 14, fontWeight : 'bold', color : 'white'}}>Today</Text>
                                                            :
                                                            <Text style={{textAlign : 'center', fontSize : (Platform.OS === 'ios') ? (Platform.isPad === true) ? 20 : 14 : (Dimensions.get('window').width >= 414) ? 20 : 14, fontWeight : 'bold', color : 'white'}}>{date}</Text>
                                                        }
                                                    </Center>
                                                </HStack>
                                            </Stack>

                                            {/*Messages*/}
                                            <View>
                                                {this.state.marked[date].message.map(item => 
                                                    <View key={item.id_r}>
                                                        <Stack space="2" width="100%" alignItems="center" mb="5%" px="5" direction={item.mail_i == this.state.email ? "row-reverse" : "row"}>
                                                            <HStack space="2" maxW="70%" alignItems="center" style={item.mail_i == this.state.email ? globalStyles.BackgroundUser: globalStyles.BackgroundSender} px="5" py="3" rounded="lg">
                                                                <VStack>
                                                                    {item.mail_i != this.state.email && (
                                                                        <Stack py="1" maxW="100%" direction="row">
                                                                            <Text style={globalStyles.TitleReportFeedback}>{item.names_i}</Text>
                                                                        </Stack>
                                                                    )}
                                                                    {item.report_img != 'NULL' && (
                                                                        <Center py="1" maxW="100%" direction="row">
                                                                            <Image
                                                                            source={{ uri: `http://homebor.com/${item.report_img}` }}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.imageroomReportFeedback}
                                                                            ></Image>
                                                                        </Center>
                                                                    )}
                                                                    {item.des.length > 1 && (
                                                                        <Stack py="1" maxW="100%" direction={item.mail_i == this.state.email ? "row-reverse" : "row"}>
                                                                            <Text style={globalStyles.textLineItemReportFeedback}>{item.des}</Text>
                                                                        </Stack>
                                                                    )}
                                                                    {item.mail_i == this.state.email && (
                                                                        <HStack py="1" maxW="100%" direction="row-reverse">
                                                                            <Stack>
                                                                                {item.view == 1 ? 
                                                                                    <View>
                                                                                        <Image
                                                                                        source={require('../assets/img/chat/check_yes.png')}
                                                                                        resizeMode="contain"
                                                                                        style={item.des.length > 1 ?  globalStyles.Reportcheck2 : globalStyles.Reportcheck}
                                                                                        ></Image>
                                                                                    </View>
                                                                                : 
                                                                                    <View>
                                                                                        <Image
                                                                                        source={require('../assets/img/chat/check_no.png')}
                                                                                        resizeMode="contain"
                                                                                        style={item.des.length > 1 ?  globalStyles.Reportcheck2 : globalStyles.Reportcheck}
                                                                                        ></Image>
                                                                                    </View>
                                                                                }
                                                                            </Stack>
                                                                            <Stack>
                                                                                <Text style={globalStyles.infosubtitlegray}>{!item.hour_messages ? null : item.hour_messages}  </Text>
                                                                            </Stack>
                                                                        </HStack>
                                                                    )}
                                                                    {item.mail_i != this.state.email && (
                                                                        <HStack py="1" maxW="100%" direction="row">
                                                                            <Stack>
                                                                                <Text style={globalStyles.infosubtitlegray}>{!item.hour_messages ? null : item.hour_messages}  </Text>
                                                                            </Stack>
                                                                        </HStack>
                                                                    )}
                                                                </VStack>
                                                            </HStack>
                                                        </Stack>
                                                    </View>
                                                )}
                                            </View>


                                        </View>
                                    ))}
                                
                                
                                </View>
                                    
                            
                                
                            )}> 
                            
                        </FlatList>
                        
                    
                        <View style={imagereport == 'NULL' ? globalStyles.hideContents : globalStyles.show}>
                            <Card style={globalStyles.shadowbox}>
                                    <View style={globalStyles.ReportFeedbackCloseIcon}>
                                        <TouchableOpacity
                                                onPress={() => this.cancelimage()}>
                                                <Icon as={Ionicons} name="close" size="8" style={globalStyles.ReportFeedbackIcons} />
                                        </TouchableOpacity>
                                    </View>
                                    {imagereport == 'NULL' ?
                                    <Text></Text>
                                    :<Image source={{uri: imagereport}}
                                    style={globalStyles.ImageLoadReportFeedback} />}
                            </Card>


                    
                        </View>
                    
                    <KeyboardAvoidingView behavior='padding' enabled={true} keyboardVerticalOffset={(Platform.OS === 'ios') ? 60 : (Dimensions.get('window').width >= 414) ? -270 : -200}>

                        <View style={{backgroundColor : '#F9FAFC'}}>

                            <View style={{marginBottom : '5%'}}>
                            {this.state.status == 'Active' ? 
                                    <View>
                                        <Stack space="2" alignItems="center" w="100%" py="3">
                                            <Center w="95%">
                                                <HStack space="2" alignItems="center">
                                                    <Center width="20%">
                                                        <TouchableOpacity
                                                            style={globalStyles.ReportFeedbackLLelements}
                                                            onPress={()=>this._AlertReport()}>
                                                            <Icon as={Ionicons} name="camera-outline" size="10" style={globalStyles.ReportFeedbackIconsCamera} />
                                                        </TouchableOpacity>
                                                    </Center>
                                                    <Center width="60%">
                                                        <Input
                                                            size="xl"
                                                            multiline={true}
                                                            variant="rounded"
                                                            w="100%"
                                                            style={globalStyles.ReportFeedbackInput}
                                                            placeholder="Message"
                                                            value={this.state.des}
                                                            onChangeText={ (des) => this.setState({des}) }   
                                                        />
                                                    </Center>
                                                    <Center width="20%">
                                                        {this.state.connection_status ? 
                                                            this.state.send == 1 ? <View>
                                                                <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={() => {this.modalreply(), console.log('paper-plane'), this.setState({send : 2})}}>
                                                                    <Icon as={Ionicons} name="paper-plane" size="8" style={globalStyles.ReportFeedbackIconsPaperplane} />
                                                                </TouchableOpacity>
                                                            </View> : <View>
                                                                <Spinner color="purple" style={ globalStyles.spinner3}/>
                                                                </View>
                                                                :
                                                                <View>
                                                                <TouchableOpacity
                                                                    style={globalStyles.ReportFeedbackRLelements}
                                                                    onPress={() => {this.noInternetConnection(), console.log('paper-plane')}}>
                                                                    <Icon as={Ionicons} name="paper-plane" size="8" style={globalStyles.ReportFeedbackIconsPaperplane} />
                                                                </TouchableOpacity>
                                                            </View>
                                                                
                                                        }
                                                    </Center>
                                                </HStack>
                                            </Center>
                                        </Stack>   
                                                
                                                
                                    </View>
                            :
                                    <View style={{padding: 10}}>
                                        <Card>
                                            <Text style={{textAlign : 'center'}}>This report has finished</Text>
                                        </Card>
                                    </View> 
                            }
                        </View>

                    </View>
                                
                   
                                    
                    </KeyboardAvoidingView> 
                </NativeBaseProvider>)}
                        
                                   
           
            </NativeBaseProvider>
        </ImageBackground>
       
    </View>
    
  );
}
}
