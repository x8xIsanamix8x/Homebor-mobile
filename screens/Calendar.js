import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'; 
import {Agenda} from 'react-native-calendars'; 
import { useNavigation } from '@react-navigation/native' 
import globalStyles from '../styles/global';

import Header from '../styles/header'

import Notifications from '../screens/Notifications'
import Profile from '../screens/Profile'
import Rooms from '../screens/RoomsPreview'
import EditProperty from '../screens/EditProperty'
import Disable from '../screens/Disable'

import {createAppContainer} from 'react-navigation' 
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'native-base';



class Calendar extends Component {
  

  static navigationOptions = () => {
    title : "Calendario"
  };

  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,
      items : {}
    }
  }

  async componentDidMount(){
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    let agenda = await api.getAgenda2(this.state.email,this.state.perm)
    this.setState({ items : agenda })
    console.log(this.state.items)
  }
  
  render() {
    return (
      <Agenda
        items={this.state.items}       
        selected={new Date}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)} 

        markedDates={{
          '2021-04-14': {
            periods: [
              {startingDay: true, endingDay: false, color: '#5f9ea0'},
              {startingDay: false, endingDay: true, color: '#ffa500'},
              {startingDay: false, endingDay: true, color: '#f0e68c'},
              {startingDay: false, endingDay: true, color: '#5f9e96'},
              {startingDay: false, endingDay: true, color: '#578952'},
              {startingDay: false, endingDay: true, color: '#582318'},
              {startingDay: false, endingDay: true, color: '#579842'},
            ]
          },
          '2021-04-15': {
            periods: [
              {startingDay: false, endingDay: false, color: '#5f9ea0'},
              {startingDay: true, endingDay: false, color: '#ffa500'},
              {startingDay: false, endingDay: true, color: '#f0e68c'},
              {startingDay: false, endingDay: true, color: '#5f9e96'},
              {startingDay: false, endingDay: true, color: '#578952'},
              {startingDay: false, endingDay: true, color: '#582318'},
              {startingDay: false, endingDay: true, color: '#579842'},
            ]
          },
          '2021-02-16': {
            periods: [
              {startingDay: false, endingDay: true, color: '#5f9ea0'},
              {startingDay: false, endingDay: true, color: '#ffa500'},
              {startingDay: false, endingDay: true, color: '#f0e68c'},
              {startingDay: false, endingDay: true, color: '#5f9e96'},
              {startingDay: false, endingDay: true, color: '#578952'},
              {startingDay: false, endingDay: true, color: '#582318'},
              {startingDay: false, endingDay: true, color: '#579842'},
            ]
          },
        }}
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        markingType='multi-period'


        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
        
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <Card style={item.room == "room1" ? globalStyles.calendarColor1 : item.room == "room2" ? globalStyles.calendarColor2 : item.room == "room3" ? globalStyles.calendarColor3 : item.room == "room4" ? globalStyles.calendarColor4 : item.room == "room5" ? globalStyles.calendarColor5 : item.room == "room6" ? globalStyles.calendarColor6 : item.room == "room7" ? globalStyles.calendarColor7 : item.room == "room8" ? globalStyles.calendarColor8 : item.room == "room" ? globalStyles.calendarColorA : globalStyles.show}>
       <Image
        source={{ uri: `http://homebor.com/${item.photo}` }}
        resizeMode="contain"
        style={item.photo == "NULL" ? globalStyles.hideContents : globalStyles.imageCalendar}
      ></Image>
      <TouchableOpacity
        style={[styles.item, item.mail_s == "NULL" ? {height : item.height} : {height: 140} ]}
        onPress={() => Alert.alert(item.name)}
      >
        {/*Room title */}
        <View style={ globalStyles.eventTitleview }>
          <Text style={ item.room == "room1" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 1</Text>
          <Text style={ item.room == "room2" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 2</Text>
          <Text style={ item.room == "room3" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 3</Text>
          <Text style={ item.room == "room4" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 4</Text>
          <Text style={ item.room == "room5" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 5</Text>
          <Text style={ item.room == "room6" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 6</Text>
          <Text style={ item.room == "room7" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 7</Text>
          <Text style={ item.room == "room8" ? globalStyles.calendarRoom : globalStyles.hideContents}>Room 8</Text>
          <Text style={ item.room == "room" ? globalStyles.calendarRoom : globalStyles.hideContents}>Activity</Text>
        </View>

        {/*Event title */}
        <Text style={globalStyles.eventTitle}>{item.name}</Text>
          <View style={globalStyles.inlineTitle}>
            <Text style={globalStyles.eventArrive1}>Arrive:</Text>
            <Text style={globalStyles.eventLeave1}>Leave:</Text>
          </View>

          {/*Events data*/}
          <View style={globalStyles.inlineData}>
            <Text style={globalStyles.eventStart1}>{item.start}</Text>
            <Text style={globalStyles.eventEnd1}>{item.end}</Text>
          </View>

          <View style={globalStyles.inlineTitle2}>
            <Text style={item.mail_s != "NULL" ? globalStyles.eventAgency : globalStyles.hideContents}>Agency:</Text>
            <Text style={item.mail_s != "NULL" ? globalStyles.eventAcademy : globalStyles.hideContents}>Academy:</Text>
          </View>
          
          <View style={globalStyles.inlineData2}>
            <Text style={item.mail_s != "NULL" ? globalStyles.eventAgencyname : globalStyles.hideContents}>{item.agency}</Text>
            <Text style={item.mail_s != "NULL" ? globalStyles.eventAcronym : globalStyles.hideContents}>{item.academy}</Text>
          </View>


      </TouchableOpacity>
      </Card>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

const CalendarStack = createStackNavigator({
  Calendar
});

const RoomsStack = createStackNavigator({
  Rooms: {
    screen: Rooms,
    navigationOptions: {
        title:"Your Rooms",
          headerStyle:{
            backgroundColor: '#232159'
          },
        headerTintColor:'#fff'
    }
}
});

const ProfileStack = createStackNavigator({
  Profile : {
    screen : Profile,
    navigationOptions: {
      title:"Homestay Profile",
        headerStyle:{
          backgroundColor: '#232159'
        },
        headerTintColor:'#fff'
    }
  }
});

const DisableStack = createStackNavigator({
  Disable : {
    screen : Disable,
    navigationOptions: {
      title:"Disable Account",
        headerStyle:{
          backgroundColor: '#232159'
        },
        headerTintColor:'#fff'
    }
  }
});

const NotificationsStack = createStackNavigator({
  Notifications
});

const EditPropertyStack = createStackNavigator({
  EditProperty
});



const drawerNavigator = createDrawerNavigator({
  
  CalendarStack: {
    screen: CalendarStack,
    navigationOptions : () => ({
      title: 'Calendar',

    })
  },
  RoomsStack: {
    screen: RoomsStack,
    navigationOptions : () => ({
      title: 'Your Rooms'
    })
  },
  ProfileStack: {
    screen: ProfileStack,
    navigationOptions : () => ({
      title: 'Profile'
    }),
  },
  NotificationsStack: {
    screen: NotificationsStack,
    navigationOptions : () => ({
      title: 'Notifications'
    }),
  },
  EditProperty: {
    screen: EditPropertyStack,
    navigationOptions : () => ({
      title: 'Edit Property'
    }),
  },
  Disable: {
    screen: DisableStack,
    navigationOptions : () => ({
      title: 'Disable Account'
    }),
  },

},{
  drawerBackgroundColor: '#fff',
  contentOptions: {
    activeTintColor: '#fff',
    activeBackgroundColor: '#982a72',
    inactiveTintColor: '#fff',
    inactiveBackgroundColor: '#232159',
    headerTitleAlign: 'center',

  }
  
});


export default createAppContainer(drawerNavigator)