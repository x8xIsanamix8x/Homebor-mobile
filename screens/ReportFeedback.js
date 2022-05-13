import React, { Component, useState} from 'react';
import { View, ScrollView, Text, ImageBackground, RefreshControl, TouchableOpacity, Alert, Image, KeyboardAvoidingView,  Dimensions,  StyleSheet, Platform} from 'react-native'
import { NativeBaseProvider, Spinner, Input, Stack, Icon } from 'native-base';
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


let scrollYPos = 0;

export default class ReportFeedback extends Component {
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
          
          imagereport: 'NULL',
          photo1 : 'yes',

          report1 : -1,
          reports1 : 0,
    };
  }

  async componentDidMount(){
    //Refresh function when open this screen
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.onActive()
        this.onRefresh()
      });

    this._onFocusListener = this.props.navigation.addListener('blur', () => {
        this.onRelease()
    });

    //Get profile
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    //console.log(userLogin)

    //Get id of report
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})

    //Get Report data
    let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
    this.setState({ info : reportslist, loading : false, reportslist : reportslist[0].reportslist})
    console.log("nuevo")
    console.log(this.state.reportslist)


    //State of modal
    this.setState({modalVisible : false, setModalVisible : false})

    //Reply report data required
    let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
    this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})

    //Permissions function call
    this.getPermissionAsync();
  }

    //Permissions function to access to the gallery in the phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1){
            if (prevState.info !== this.state.info) {
                let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
                this.setState({ info : reportslist })
            }
        }
      }

    cancelimage = () => {
        this.setState({imagereport : 'NULL'})

    }

    onActive = () => {
    this.setState({ report1 : -1 }, () => { console.log('Nuevo NumNoti', this.state.report1) });
    this.setState({ reports1 : 0 }, () => { console.log('Nuevo Noti1', this.state.reports1) });
    console.log('Activar Reportes')
    console.log(this.state.report1)
    console.log(this.state.reports1)
    }
    
    onRelease = () => {
        this.setState({ report1 : 0 }, () => { console.log('Nuevo NumNoti', this.state.report1) });
        this.setState({ reports1 : 0 }, () => { console.log('Nuevo Noti1', this.state.reports1) });
        console.log('Cancelar Reportes')
        console.log(this.state.report1)
        console.log(this.state.reports1)
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

    //Get id of report
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})

    //Get Report data
    let reportslist = await api.getReportsfeedback(this.state.email, this.state.idnoti)
    this.setState({ info : reportslist, loading : false})
    console.log("nuevo")
    console.log(this.state.info)

    //State of modal
    this.setState({modalVisible : false, setModalVisible : false})

    //Reply report data required
    let replyinfo = await api.getInfoReply(this.state.email, this.state.idnoti)
    this.setState({ info2 : replyinfo, name_h : replyinfo.data[0].name_h, l_name_h : replyinfo.data[0].l_name_h, a_name : replyinfo.data[0].a_name, a_mail : replyinfo.data[0].mail, stu_rep : replyinfo.data[0].mail_s, status : replyinfo.data[0].status})

    //Permissions function call
    this.getPermissionAsync();
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
                    console.log(this.state.des, this.state.email, this.state.idnoti, this.state.name_h, this.state.l_name_h, this.state.a_name, this.state.a_mail, this.state.stu_rep, this.state.status, this.state.imagereport)
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
      let a_name = this.state.a_name;
      let a_mail = this.state.a_mail;
      let stu_rep = this.state.stu_rep;
      let status = this.state.status;
      let photo1 = this.state.photo1;

      console.log(this.state.des, this.state.email, this.state.idnoti, this.state.name_h, this.state.l_name_h, this.state.a_name, this.state.a_mail, this.state.stu_rep, this.state.status, this.state.imagereport)

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


  render() {
      //Modal Variables
    let modalVisible = this.state.modalVisible;
    let setModalVisible = this.state.setModalVisible;
    let { imagereport } = this.state;
    const keyboardVerticalOffset = (Platform.OS === 'ios') ? 60 : -20

    return (
        <View style={globalStyles.container}>
            
        <ImageBackground source={require('../assets/chat-box.jpg')} style={globalStyles.ImageBackgroundNoti}>
        <NativeBaseProvider>

            <FlatList
                inverted
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
                               
                                <View key={reportslist.id_r} style={reportslist.mail_i == this.state.email ? globalStyles.ReportFeedbackMarginsUser : globalStyles.ReportFeedbackMarginsSender}>

                                    <View style={globalStyles.show}>

                                                <View style={reportslist.mail_i == this.state.email ? globalStyles.itemReportRecive2 : globalStyles.itemReportRecive}>
                                                    
                                                    <View>
                                                        <View style={reportslist.mail_i == this.state.email ? globalStyles.hideContents : globalStyles.tableColumnTotalsReportsFtitle}>
                                                            <Text style={globalStyles.infosubtitle}>{reportslist.names_i}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={reportslist.report_img != 'NULL' ? globalStyles.imageFeedback : globalStyles.hideContents}>
                                                        <View style={reportslist.report_img != 'NULL' && reportslist.mail_i == this.state.email ? globalStyles.tableColumnTotalsReportsF2 : globalStyles.hideContents}>
                                                        <Image
                                                            source={{ uri: `http://homebor.com/${reportslist.report_img}` }}
                                                            resizeMode="contain"
                                                            style={reportslist.report_img != 'NULL' && reportslist.mail_i == this.state.email ? globalStyles.imageroom6 : globalStyles.hide }
                                                            ></Image>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={reportslist.report_img != 'NULL' && reportslist.mail_i != this.state.email ? globalStyles.tableColumnTotalsReportsF : globalStyles.hideContents}>
                                                        <Image
                                                            source={{ uri: `http://homebor.com/${reportslist.report_img}` }}
                                                            resizeMode="contain"
                                                            style={reportslist.report_img != 'NULL' && reportslist.mail_i != this.state.email ? globalStyles.imageroom6 : globalStyles.hide }
                                                            ></Image>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={reportslist.mail_i == this.state.email ? globalStyles.tableColumnTotalsReportsF2 : globalStyles.tableColumnTotalsReportsF}>
                                                            <Text style={globalStyles.textLineItemReportFeedback}>{reportslist.des}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={globalStyles.tableRowReport}>
                                                        <View style={globalStyles.hideContents}>
                                                            <Text style={globalStyles.infosubtitle}>Names</Text>
                                                        </View>
                                                        <View style={reportslist.mail_i == this.state.email ? globalStyles.tableColumnTotalsReportsF2 : globalStyles.tableColumnTotalsReportsF}>
                                                            <Text style={globalStyles.infosubtitle}>{!reportslist.date ? null : reportslist.date}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={reportslist.mail_i == this.state.email ? globalStyles.show : globalStyles.hideContents}>
                                                        {reportslist.view == 1 ? 
                                                            <View>
                                                                <Image
                                                                source={require('../assets/check_yes.png')}
                                                                resizeMode="contain"
                                                                style={globalStyles.Reportcheck}
                                                            ></Image>
                                                                
                                                            </View>: 
                                                            <View>
                                                                <Image
                                                                source={require('../assets/check_no.png')}
                                                                resizeMode="contain"
                                                                style={globalStyles.Reportcheck}
                                                                ></Image>
                                                            
                                                            </View>}
                                                    </View>

                                                </View>  
                                        
                                    </View>

                                </View> 
                             
								                  
                            )}
                            
                        

                        
                        
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
           
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' enabled={true} keyboardVerticalOffset={(Platform.OS === 'ios') ? 60 : -20}>
                    {this.state.status == 'Active' ? 
                        <Stack inlineLabel last style={globalStyles.input}>
                        <Input
                            InputRightElement={
                                <TouchableOpacity
                                style={globalStyles.ReportFeedbackRLelements}
                                onPress={() => {this.modalreply(), console.log('paper-plane')}}>
                                <Icon as={Ionicons} name="paper-plane" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                </TouchableOpacity>
                            }
                            InputLeftElement={
                                <TouchableOpacity
                                style={globalStyles.ReportFeedbackLLelements}
                                onPress={()=>this._AlertReport()}>
                                    <Icon as={FontAwesome} name="camera" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                </TouchableOpacity>
                            }
                            variant="rounded"
                            size="xl"
                            style={globalStyles.ReportFeedbackInput}
                            placeholder="Message"
                            value={this.state.des}
                            onChangeText={ (des) => this.setState({des}) }
                            />
                                </Stack>
                                : <Stack inlineLabel last style={globalStyles.input}>
                                <Input
                                    InputLeftElement={
                                        <TouchableOpacity
                                        style={globalStyles.ReportFeedbackLLelements}
                                        onPress={()=>this._AlertReport()}>
                                            <Icon as={FontAwesome} name="camera" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                        </TouchableOpacity>
                                    }
                                    variant="rounded"
                                    size="xl"
                                    style={globalStyles.ReportFeedbackInput}
                                    placeholder="Message"
                                    value={this.state.des}
                                    onChangeText={ (des) => this.setState({des}) }
                                    />
                                        </Stack>
                                        
                    }
                                    
                        </KeyboardAvoidingView> :
                        <KeyboardAvoidingView  keyboardVerticalOffset={(Platform.OS === 'ios') ? 60 : 0}>
                            {this.state.status == 'Active' ? 
                                    <Stack inlineLabel last style={globalStyles.input}>
                                        <Input
                                            InputLeftElement={
                                                <TouchableOpacity
                                                style={globalStyles.ReportFeedbackRLelements}
                                                onPress={()=>this._AlertReport()}>
                                                    <Icon as={FontAwesome} name="camera" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                                </TouchableOpacity>
                                            }
                                            InputRightElement={
                                                <TouchableOpacity
                                                style={globalStyles.ReportFeedbackLLelements}
                                                onPress={() => {this.modalreply(), console.log('paper-plane')}}>
                                                <Icon as={Ionicons} name="paper-plane" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                                </TouchableOpacity>
                                            }
                                            size="xl"
                                            style={globalStyles.ReportFeedbackInput2}
                                            variant="rounded"
                                            placeholder="Message"
                                            value={this.state.des}
                                            onChangeText={ (des) => this.setState({des}) }
                                        />
                                    </Stack> 
                                    :

                                    <Stack inlineLabel last style={globalStyles.input}>
                                        <Input
                                            InputLeftElement={
                                                <TouchableOpacity
                                                style={globalStyles.ReportFeedbackLLelements}
                                                onPress={()=>this._AlertReport()}>
                                                    <Icon as={FontAwesome} name="camera" size="8" style={globalStyles.ReportFeedbackIconsCamera} />
                                                </TouchableOpacity>
                                            }
                                            size="xl"
                                            style={globalStyles.ReportFeedbackInput2}
                                            variant="rounded"
                                            placeholder="Message"
                                            value={this.state.des}
                                            onChangeText={ (des) => this.setState({des}) }
                                        />
                                    </Stack> }

                                    </KeyboardAvoidingView>}
           
                        </NativeBaseProvider>
        </ImageBackground>
       
    </View>
    
  );
}
}
