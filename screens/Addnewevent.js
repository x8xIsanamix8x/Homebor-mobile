import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, Platform, ScrollView, Text, Alert, TouchableHighlight, RefreshControl, Dimensions} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Icon, FormControl, Stack, Input, Spinner } from 'native-base';
import Card from '../shared/card';

import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';
import { getLastNotificationResponseAsync } from 'expo-notifications';



export default class ModalScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
            //Variables
        email : '',
        perm : false,
        newE : 'Yes',
        info : [],
        refreshing: false,
        title : 'NULL', 
        roome : 'NULL',
        db1 : 'NULL', 
        db2 : 'NULL',
            
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

        //Get student data
        let room = await api.getRoomevents(this.state.email, this.state.newE)
        this.setState({ info : room.data, rooms: room.data[0].room, idm : room.data[0].id_m, loading : false})
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
      if(this.state.title == 'NULL' || this.state.roome == 'NULL' || this.state.db1 == 'NULL' || this.state.db2 == 'NULL'){
        Alert.alert('All fields are required')
      } else {
        console.log(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE)
        api.addNewevent(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE)
        setTimeout(() => {
            this.props.navigation.navigate('Calendar2')
        }, 2000)
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
          
          //Get profile data
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        //Get student data
        let room = await api.getRoomevents(this.state.email, this.state.newE)
        this.setState({ info : room.data, rooms: room.data[0].room, idm : room.data[0].id_m, loading : false})
        console.log(this.state.info)
  
          }

    render() {
      let { show, date, mode } = this.state;
      let { show2, date2, mode2 } = this.state; 
      return (
        <NativeBaseProvider>
          <ScrollView 
                    nestedScrollEnabled={true} 
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}
                    refreshControl={
                      <RefreshControl
                         enabled={true}
                         refreshing={this.state.refreshing}
                         onRefresh={this.onRefresh}
                         tintColor="purple"
                         colors={["purple","purple"]}
                         size={RefreshControl.SIZE.LARGE}
                     />
                  }>
          <View style={globalStyles.containerNewEvent}>
            <Card>
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Event Name</Text></FormControl.Label>
                  <Input 
                        placeholder='e.g. Clean Room 1'
                        onChangeText={ (title) => this.setState({title}) }
                        style={ globalStyles.inputedit}
                    />
              </Stack>
              <Stack inlineLabel last style={globalStyles.input}>
                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Room</Text></FormControl.Label>
              </Stack> 
              {this.state.rooms == '1' ? 
                <View style={globalStyles.pickerviewModalRAddEvent1}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker>
                  </View>  : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '2' ?
                  <View style={globalStyles.pickerviewModalRAddEvent2}> 
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
                            <Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />
                            <Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />
                            <Picker.Item label="Other Activity" value="room" /> 
                    </Picker> 
                  </View> : <View style={globalStyles.hideContents}></View>}
              {this.state.rooms == '3' ? 
                  <View style={globalStyles.pickerviewModalRAddEvent3}>
                    <Picker
                        style={globalStyles.pickerModalR}
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                        selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                        onValueChange={(roome) => this.setState({roome})}>
                            <Picker.Item label="Select" value="NULL" />
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
              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Init Date</Text></FormControl.Label>
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
                            <View style={globalStyles.viewCalendarAddNewEvent}>
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
              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>End Date</Text></FormControl.Label>
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
                  <Stack  style={globalStyles.hideWidthAddnewevet}>
                      
                  </Stack>
                  <Stack  style={globalStyles.hideWidthAddnewevet2}>
                      
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
                                      <View style={globalStyles.viewCalendarAddNewEvent}>
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
                  onPress={() => this.props.navigation.navigate('Calendar2')}>
                  <Text style={globalStyles.textStyleModal}>Close</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...globalStyles.notifyModalRAddEvent2}}
                  onPress={() => this.modalsave()}>
                  <Text style={globalStyles.textStyleModal}>Save</Text>
                </TouchableHighlight>
                <View style={(Platform.OS === 'ios') ? {marginBottom: '2%'} : {marginBottom: '10%'}}/>
            </Card>
          </View>
          </ScrollView>
        </NativeBaseProvider>
      );
    }
    
  }