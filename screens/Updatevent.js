import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Text, Alert, TouchableHighlight, RefreshControl} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Icon, FormControl, Stack, Input, Spinner } from 'native-base';
import Card from '../shared/card';
import { FlatList } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';



export default class ModalUpdate extends Component {

    constructor(props){
      super(props);
      this.state = {
            //Variables
        email : '',
        perm : false,
        newE : 'No',
        info : [],
        refreshing: false,
        title : 'NULL', 
        roome : 'NULL',
        db1 : 'NULL', 
        db2 : 'NULL',
        update : 'Yes',
        delete : 'Yes',
            
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

        //Autorefresh when focus the screen
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
          this.onRefresh()
		    });
        
        //Get profile data
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        //Get student data from id noti
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

        //Get student data
        let room = await api.getRoomevents2(this.state.email, this.state.newE, this.state.idnoti)
        this.setState({ info : room.data, rooms: room.data[0].room, title : room.data[0].title, db1: room.data[0].start, db2: room.data[0].end, idm: room.data[0].id_m, roome : room.data[0].room_e, loading : false})
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

      modalsave = async () => {
      
        console.log(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE, this.state.idnoti, this.state.update)
        api.addNeweventEdit(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE,  this.state.idnoti, this.state.update)
        setTimeout(() => {
            this.props.navigation.navigate('Calendar2')
        }, 2000)
      
    }

    modalalert = async () => {
        Alert.alert(
            'Do you want to delete this event?',
            'Important!, if this event is erased the action will not undone',
            [        
              {text: 'Yes', onPress: () => {console.log(this.state.idnoti)
                api.addNeweventDelete(this.state.idnoti)
                setTimeout(() => {
                    this.props.navigation.navigate('Calendar2')
                }, 2000)}},
              {text: 'No', onPress: () => console.log('Cancel')},
            ],
            { cancelable: true }
          )
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
          
          //Get profile data
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        //Get student data from id noti
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

        //Get student data
        let room = await api.getRoomevents2(this.state.email, this.state.newE, this.state.idnoti)
        this.setState({ info : room.data, rooms: room.data[0].room, title : room.data[0].title, db1: room.data[0].start, db2: room.data[0].end, idm: room.data[0].id_m, roome : room.data[0].room_e, loading : false})
        console.log(this.state.info)
  
          }

    render() {
      let { show, date, mode } = this.state;
      let { show2, date2, mode2 } = this.state; 
      return (
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
          <ScrollView 
                    nestedScrollEnabled={true} 
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}>
          <View style={{marginTop: '10%', alignItems: 'center', justifyContent: 'center' }}>
            <Card>
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label style={ globalStyles.infotitle}>Event Name</FormControl.Label>
                  <Input 
                        defaultValue={item.title == 'NULL' ? '' : item.title}
                        placeholder='e.g. Clean Room 1'
                        onChangeText={ (title) => this.setState({title}) }
                        style={ globalStyles.inputedit}
                    />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label style={ globalStyles.infotitle}>Room</FormControl.Label>
              </Stack> 
              {this.state.rooms == '1' ? 
                <View style={globalStyles.pickerviewModalRAddEvent1}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker>
                  </View>  : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '2' ?
                  <View style={globalStyles.pickerviewModalRAddEvent2}> 
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View> : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '3' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent3}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View> : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '4' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent4}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View> : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '5' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent5}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />
                            <Picker.Item style={this.state.rooms >= 5 ? globalStyles.show : globalStyles.hideContents} label="Room 5" value="room5" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View> : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '6' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent6}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />
                            <Picker.Item style={this.state.rooms >= 5 ? globalStyles.show : globalStyles.hideContents} label="Room 5" value="room5" />
                            <Picker.Item style={this.state.rooms >= 6 ? globalStyles.show : globalStyles.hideContents} label="Room 6" value="room6" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View>: <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '7' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent7}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />
                            <Picker.Item style={this.state.rooms >= 5 ? globalStyles.show : globalStyles.hideContents} label="Room 5" value="room5" />
                            <Picker.Item style={this.state.rooms >= 6 ? globalStyles.show : globalStyles.hideContents} label="Room 6" value="room6" />
                            <Picker.Item style={this.state.rooms >= 7 ? globalStyles.show : globalStyles.hideContents} label="Room 7" value="room7" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker>
                  </View>: <View style={globalStyles.hideContents}></View>}
                {this.state.rooms == '8' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent8}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: 15}}
                        selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />
                            <Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />
                            <Picker.Item style={this.state.rooms >= 5 ? globalStyles.show : globalStyles.hideContents} label="Room 5" value="room5" />
                            <Picker.Item style={this.state.rooms >= 6 ? globalStyles.show : globalStyles.hideContents} label="Room 6" value="room6" />
                            <Picker.Item style={this.state.rooms >= 7 ? globalStyles.show : globalStyles.hideContents} label="Room 7" value="room7" />
                            <Picker.Item style={this.state.rooms >= 8 ? globalStyles.show : globalStyles.hideContents} label="Room 8" value="room8" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View>: <View style={globalStyles.hideContents}></View>}
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label style={ globalStyles.infotitle}>Init Date</FormControl.Label>
                  <Input
                      isReadOnly={true}
                      InputRightElement={
                          <TouchableOpacity
                          style={globalStyles.PaymentHistoryRLelements}
                          onPress={this.datepicker}>
                          <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                          </TouchableOpacity>
                      }
                      size="md"
                      style={globalStyles.ReportFeedbackInput3}
                      value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                      onChangeText={ (db1) => this.setState({db1}) }
                  />
              </Stack>
                { show && Platform.OS != 'ios' && <DateTimePicker 
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
                }
                { show && Platform.OS === 'ios' && 
                            <View style={{width: '100%', marginBottom: '20%'}}>
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
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label style={ globalStyles.infotitle}>End Date</FormControl.Label>
                <Input
                    isReadOnly={true}
                    InputRightElement={
                        <TouchableOpacity
                        style={globalStyles.PaymentHistoryRLelements}
                        onPress={this.datepicker2}>
                        <Icon as={Ionicons} name="calendar" style={globalStyles.ReportFeedbackIcons} />
                        </TouchableOpacity>
                    }
                    size="md"
                    style={globalStyles.ReportFeedbackInput3}
                    value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                    onChangeText={ (db2) => this.setState({db2}) }
                />
              </Stack>
              <View style={globalStyles.PaymentHistoryDates}>   
                  <Stack  style={{ width: "100%", marginRight: "-55%", marginLeft : "-2%"}}>
                      
                  </Stack>
                  <Stack  style={{ width: "100%",  marginRight: "-55%"}}>
                      
                  </Stack>
                </View>
                          { show2 && Platform.OS != 'ios' && <DateTimePicker 
                              value={date2}
                              mode={mode2}
                              is24Hour={true}
                              display="default"
                              onChange={this.setDate2} />
                          }
                          { show2 && Platform.OS === 'ios' && 
                                      <View style={{width: '100%', marginBottom: '20%'}}>
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
                <View style={(Platform.OS === 'ios') ? {marginTop: '5%'} : {marginTop: '5%'}}/>
                <TouchableHighlight
                  style={globalStyles.notifyModalCAddEvent2 }
                  onPress={() => this.modalalert()}>
                  <Text style={globalStyles.textStyleModal}>Delete</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...globalStyles.notifyModalRAddEvent}}
                  onPress={() => this.modalsave()}>
                  <Text style={globalStyles.textStyleModal}>Save</Text>
                </TouchableHighlight>
                <View style={(Platform.OS === 'ios') ? {marginBottom: '2%'} : {marginBottom: '10%'}}/>
            </Card>
          </View>
          </ScrollView>
        </NativeBaseProvider>)}>
    </FlatList>
      );
    }
    
  }