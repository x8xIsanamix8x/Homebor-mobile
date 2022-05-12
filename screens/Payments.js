import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl, TouchableHighlight, Alert, Platform, Dimensions } from 'react-native'
import { NativeBaseProvider, Text, Spinner, Icon, Input, Stack } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import globalStyles from '../styles/global';
import { StatusBar } from 'expo-status-bar';

export default class Payments extends Component {

    constructor(props){
		super(props);
		this.state = {
      //Variables
		  email : '',
		  perm : false,
		  info : [],
      refreshing: false,
      filterP : 'No',
      db1 : '',
      db2 : '',
      

      report1 : -1,
      reports1 : 0,

      //Calendars DATE PICKERS
      date: new Date(),
      mode: 'date',
      show: false,
      date2: new Date(),
      mode2: 'date2',
      show2: false,
		}
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

        //Get Reports list
        let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
        this.setState({ info : reportslist, loading : false})
        console.log("nuevo")
        console.log(this.state.info)

        //this.anotherFunc();

	  }

      async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1){
            if (prevState.info !== this.state.info) {
              if(this.state.filterP == 'No'){
                let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
                this.setState({ info : reportslist, loading : false})
              }else {
                let reportslist = await api.getPaymentsFilterlist(this.state.email, this.state.filterP, this.state.db1, this.state.db2)
                this.setState({ info : reportslist, loading : false})
              }   
            }
        }
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
            this.setState({ filterP : 'No', db1 : '' , db2 : ''});
            
            //Get Reports list
            let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
            this.setState({ info : reportslist, loading : false})
            console.log("nuevo")
            console.log(this.state.info)
          }


        setDate = (event, date) => {
            date = date || this.state.date;
        
            this.setState({
              show: Platform.OS === 'ios' ? true : false,
              date,
            });
    
            const dateY = new Date(date.setDate(date.getDate()));
            let YDAY= dateY.getMonth()<9 ? dateY.getDate()<=9 ? `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-${dateY.getDate()}` : dateY.getDate()<=9 ? `${dateY.getFullYear()}-${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-${dateY.getMonth() + 1}-${dateY.getDate()}`
            this.setState({db1 : YDAY})
            
          }
    
          closedatepickerIOS = () => {
            this.setState({
              show: Platform.OS === 'ios' ? false : false,
            });
      
          }
        
          show = mode => {
            this.setState({
              show: true,
              mode,
            });
          }
        
          datepicker = () => {
            this.show('date');
          }
    
          setDate2 = (event, date2) => {
            date2 = date2 || this.state.date2;
        
            this.setState({
              show2: Platform.OS === 'ios' ? true : false,
              date2,
            });
    
            const dateY2 = new Date(date2.setDate(date2.getDate()));
            let YDAY2= dateY2.getMonth()<9 ? dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-${dateY2.getDate()}` : dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-${dateY2.getDate()}`
            this.setState({db2 : YDAY2})
            
          }
    
          closedatepickerIOS2 = () => {
            this.setState({
              show2: Platform.OS === 'ios' ? false : false,
            });
      
          }
        
          show2 = mode2 => {
            this.setState({
              show2: true,
              mode2,
            });
          }
        
          datepicker2 = () => {
            this.show2('date');
          }
        
          //anotherFunc = () => {
           // let nextDay = this.state.mfirstd
           // let obj = nextDay.reduce((acc, reportlist) => {
         
            //  const dateAcc = acc[reportlist.status]
              
            //  if (!dateAcc) {
             //   acc[reportlist.status] = {
              //    dots: [{ photo_s : reportlist.photo_s}]
               // }
             // } else {
              //  acc[reportlist.status].dots.push({ photo_s : reportlist.photo_s})
             // }

         // return acc
       // }, {});
       // this.setState({ marked : obj})
       // console.log('AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH', this.state.marked)
    
      //  }

  filterpayments = async () => {
    if (this.state.db1 == '' || this.state.db2 == '') {
      Alert.alert('All fields are required')
    }else {
      this.setState({ refreshing: true, filterP : 'Yes' });
        this.refreshfilter().then(() => {
            this.setState({ refreshing: false, filterP : 'Yes' });
        });
    }
  }

  refreshfilter = async() => {
    //Get profile
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    this.setState({ filterP : 'Yes' });

    //console.log(userLogin)
    
    //Get Reports list
    let reportslist = await api.getPaymentsFilterlist(this.state.email, this.state.filterP, this.state.db1, this.state.db2)
    this.setState({ info : reportslist, loading : false})
    console.log("nuevo")
    console.log(this.state.info)
  }
  


  render() {
    let { show, date, mode } = this.state;
    let { show2, date2, mode2 } = this.state; 
        
  return (
    <View style={globalStyles.container}>
        <ImageBackground source={require('../assets/payments.jpg')} style={globalStyles.ImageBackgroundNoti}>
            <NativeBaseProvider>
              <StatusBar style="light" />
                <View>
                    <View style={globalStyles.PaymentHistoryDates}>   
                        <Stack  style={globalStyles.stackLeftPayments}>
                            <Input
                                isReadOnly={true}
                                InputLeftElement={
                                    <TouchableOpacity
                                    style={globalStyles.PaymentHistoryRLelements}
                                    onPress={this.datepicker}>
                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                    </TouchableOpacity>
                                }
                                variant="rounded"
                                size="md"
                                w="43%"
                                style={globalStyles.ReportFeedbackInput3}
                                placeholder="From"
                                value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                onChangeText={ (db1) => this.setState({db1}) }
                            />
                        </Stack>
                        <Stack  style={globalStyles.stackRightPayments}>
                            <Input
                                isReadOnly={true}
                                InputRightElement={
                                    <TouchableOpacity
                                    style={globalStyles.PaymentHistoryRLelements}
                                    onPress={this.datepicker2}>
                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                    </TouchableOpacity>
                                }
                                variant="rounded"
                                size="md"
                                w="43%"
                                style={globalStyles.ReportFeedbackInput3}
                                placeholder="To"
                                value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                onChangeText={ (db2) => this.setState({db2}) }
                            />
                        </Stack>
                        <Stack  style={globalStyles.stackSearchPayments}>
                            <TouchableOpacity
                                onPress={() => this.filterpayments()}>
                                <Image                     
                                    resizeMode="cover"
                                    source={require('../assets/buscador.png')}
                                    style={globalStyles.PaymentHistorySearchelements}
                                ></Image>
                            </TouchableOpacity>
                        </Stack>
                        
                    </View>
                        { show && Platform.OS != 'ios' && <DateTimePicker 
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDate} />
                        }
                        { show && Platform.OS === 'ios' && 
                                    <View>
                                    <Card style={globalStyles.shadowbox}>
                                        <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                        <DateTimePicker 
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="spinner"
                                            onChange={this.setDate} />

                                        <TouchableHighlight
                                        style={globalStyles.StudentopenButtonReply}
                                        onPress={() => this.closedatepickerIOS()}>
                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                        </TouchableHighlight>
                                    </Card>
                                    </View>
                        }
                        { show2 && Platform.OS != 'ios' && <DateTimePicker 
                            value={date2}
                            mode={mode2}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate2} />
                        }
                        { show2 && Platform.OS === 'ios' && 
                                    <View>
                                    <Card style={globalStyles.shadowbox}>   
                                        <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                        <DateTimePicker 
                                            value={date2}
                                            mode={mode2}
                                            is24Hour={true}
                                            display="spinner"
                                            onChange={this.setDate2} />

                                        <TouchableHighlight
                                        style={globalStyles.StudentopenButtonReply}
                                        onPress={() => this.closedatepickerIOS2()}>
                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                        </TouchableHighlight>
                                    </Card>
                                    </View>
                        }
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
                            <ScrollView nestedScrollEnabled={true}>
                            
                        
							{!item.reportslist ? <View><Card><Text style={globalStyles.NotiDont}>You don't have reportslist request</Text></Card></View> : item.reportslist.map((reportslist, i) => 
                                    <View key={reportslist.id_p} style={globalStyles.ReportFeedbackMargins}>

                                        
                                            <TouchableOpacity key={reportslist.id_not} onPress={ () =>this.feedback(    
												this.setState({idnoti : reportslist.id_not}, () => AsyncStorage.setItem('idnoti',JSON.stringify(reportslist.id_not))))}>
                                                <Card>
                                                    <View style={globalStyles.inlineData}>
                                                        <Text style={globalStyles.infosubtitle}>{reportslist.date}</Text>
                                                    </View>
												                          </Card>
                                                  <Card>
                                                      <View style={globalStyles.notiDate}>
                                                              <View style={globalStyles.inlineDataReportInit}>
                                                                  <Text style={globalStyles.ReportInitBoldText}>{reportslist.name_s} {reportslist.l_name_s}</Text>
                                                                  <View style={globalStyles.PaymentHistoryPrice}>
                                                                      <Text style={globalStyles.ReportInitBoldText}>CAD$ {reportslist.price}</Text>
                                                                  </View>
                                                              </View>
                                                              <View style={globalStyles.inlineDataReportInit}>
                                                                  <Text style={globalStyles.ReportInitBoldText}>Room: </Text>
                                                                  {reportslist.room_p == 'room1' ? <Text style={globalStyles.PaymentText}>1</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room2' ? <Text style={globalStyles.PaymentText}>2</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room3' ? <Text style={globalStyles.PaymentText}>3</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room4' ? <Text style={globalStyles.PaymentText}>4</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room5' ? <Text style={globalStyles.PaymentText}>5</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room6' ? <Text style={globalStyles.PaymentText}>6</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room7' ? <Text style={globalStyles.PaymentText}>7</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  {reportslist.room_p == 'room8' ? <Text style={globalStyles.PaymentText}>8</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                                  <View style={globalStyles.PaymentHistoryPrice2}>
                                                                      <Text style={globalStyles.ReportInitBoldText}>{reportslist.status_p}</Text>
                                                                  </View>
                                                              </View>
                                                              <View style={globalStyles.inlineDataReportInit}>
                                                                  <Text style={globalStyles.ReportInitBoldText}>Weeks: </Text>
                                                                  <Text style={globalStyles.PaymentText}>{reportslist.week}</Text>
                                                              </View>
                                                              <Image                     
                                                                  resizeMode="cover"
                                                                  source={{ uri: `http://homebor.com/${reportslist.photo_s}` }}
                                                                  style={globalStyles.PaymentHistoryimageNoti}
                                                              ></Image>
                                                      </View>
                                                  </Card>
                                            </TouchableOpacity>  

									</View> 
								                  
                                )} 
                                

						</ScrollView>
                          
                    
                )}> 
                </FlatList>
            <View>
            </View>
            </NativeBaseProvider>
        </ImageBackground>
    </View>
    
  );
}
}