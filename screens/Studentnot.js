import React, {Component, useState} from 'react';
import { View, RefreshControl, Image, Dimensions, Platform } from 'react-native';
import { NativeBaseProvider, Text, Box, AspectRatio, Spinner, Heading, Button, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Divider } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';

import Checkbox from 'expo-checkbox';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class Studentnot extends Component {
	NetInfoSubscription = null;

    constructor(props){
		super(props);
		this.state = {
		  //Variables
		  email : '',
		  perm : false,
		  info : [],
		  refreshing: false,

		  itemVegetarian : false,
          itemHalal : false,
          itemKosher : false,
          itemLactose : false,
          itemGluten : false,
          itemPork : false,
          itemNone : false,

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

		//Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

		//Get student info throught id of notification
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

		if(this.state.connection_status == true) {

			//Get student info
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, dates : student.data[0].db_s, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, agency : student.data[0].mail, startd : student.data[0].start, endd_ : student.data[0].end_, startda : student.data[0].firstd, endda_ : student.data[0].lastd, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none, des : student.data[0].des})

			//Checkboxes
			if (this.state.vegetarians == 'yes') {
				this.setState({itemVegetarian : true})
			} else {
				this.setState({itemVegetarian : false}) 
			}
			if (this.state.halal == 'yes') {
				this.setState({itemHalal : true})
			} else {
				this.setState({itemHalal : false}) 
			}
			if (this.state.kosher == 'yes') {
				this.setState({itemKosher : true})
			} else {
				this.setState({itemKosher : false}) 
			}
			if (this.state.lactose == 'yes') {
				this.setState({itemLactose : true})
			} else {
				this.setState({itemLactose : false}) 
			}
			if (this.state.gluten == 'yes') {
				this.setState({itemGluten : true})
			} else {
				this.setState({itemGluten : false}) 
			}
			if (this.state.pork == 'yes') {
				this.setState({itemPork : true})
			} else {
				this.setState({itemPork : false}) 
			}
			if (this.state.none == 'yes') {
				this.setState({itemNone : true})
			} else {
				this.setState({itemNone : false}) 
			}

			let d1 = new Date();
			let d2 = new Date(this.state.dates);
			let one_day = 1000*60*60*24
			let diff = Math.floor(d1.getTime()-d2.getTime())
			let range = Math.floor(diff/(one_day))
			let months = Math.floor(range/31)
			let years = Math.floor(months/12)

			this.setState({ year : years, month : months, ranges : range})

			const dateY2 = new Date(this.state.startd); dateY2.setDate(dateY2.getDate() + 1)
			if (dateY2.getMonth() == 0){
				let YDAY2=`January ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 1){
				let YDAY2=`February ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 2){
				let YDAY2=`March ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 3){
				let YDAY2=`April ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 4){
				let YDAY2=`May ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 5){
				let YDAY2=`June ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 6){
				let YDAY2=`July ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 7){
				let YDAY2=`August ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 8){
				let YDAY2=`September ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 9){
					let YDAY2=`October ${dateY2.getDate()}, ${dateY2.getFullYear()}`
					this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 10){
				let YDAY2=`November ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 11){
				let YDAY2=`December ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}

			const dateY3 = new Date(this.state.endd_); dateY3.setDate(dateY3.getDate() + 1)
			if (dateY3.getMonth() == 0){
				let YDAY3=`January ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 1){
				let YDAY3=`February ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 2){
				let YDAY3=`March ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 3){
				let YDAY3=`April ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 4){
				let YDAY3=`May ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 5){
				let YDAY3=`June ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 6){
				let YDAY3=`July ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 7){
				let YDAY3=`August ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 8){
				let YDAY3=`September ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 9){
				let YDAY3=`October ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 10){
				let YDAY3=`November ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 11){
				let YDAY3=`December ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}

			const dateY4 = new Date(this.state.startda); dateY4.setDate(dateY4.getDate() + 1)
			if (dateY4.getMonth() == 0){
				let YDAY4=`January ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 1){
				let YDAY4=`February ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 2){
				let YDAY4=`March ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 3){
				let YDAY4=`April ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 4){
				let YDAY4=`May ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 5){
				let YDAY4=`June ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 6){
				let YDAY4=`July ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 7){
				let YDAY4=`August ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 8){
				let YDAY4=`September ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 9){
				let YDAY4=`October ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 10){
				let YDAY4=`November ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 11){
				let YDAY4=`December ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}

			const dateY5 = new Date(this.state.endda_); dateY5.setDate(dateY5.getDate() + 1)
			if (dateY5.getMonth() == 0){
				let YDAY5=`January ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 1){
				let YDAY5=`February ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 2){
				let YDAY5=`March ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 3){
				let YDAY5=`April ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 4){
				let YDAY5=`May ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 5){
				let YDAY5=`June ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 6){
				let YDAY5=`July ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 7){
				let YDAY5=`August ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 8){
				let YDAY5=`September ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 9){
				let YDAY5=`October ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 10){
				let YDAY5=`November ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 11){
				let YDAY5=`December ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}

			
			const dateY6 = new Date(this.state.departured); dateY6.setDate(dateY6.getDate() + 1)

			
			if (dateY6.getMonth() == 0){
				let YDAY6=`January ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 1){
				let YDAY6=`February ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 2){
				let YDAY6=`March ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 3){
				let YDAY6=`April ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 4){
				let YDAY6=`May ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 5){
				let YDAY6=`June ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 6){
				let YDAY6=`July ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 7){
				let YDAY6=`August ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 8){
				let YDAY6=`September ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 9){
				let YDAY6=`October ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 10){
				let YDAY6=`November ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 11){
				let YDAY6=`December ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			this.setState({readyDisplay : true})
		} else {
			this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
		}

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.setState({readyDisplay : false})
			this.onRefresh()
		});
		
	}

	//Function call to refresh
	onRefresh = () => {
		this.setState({ refreshing: true });
			this.refresh().then(() => {
				this.setState({ refreshing: false });
		});
	}

	//refresh function
	refresh = async() => {
		//Get user profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

		//Get student info throught id of notification
		let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
		this.setState({ idnoti : idnoti})

		if(this.state.connection_status == true) {

		//Get student info
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, agency : student.data[0].mail, startd : student.data[0].start, endd_ : student.data[0].end_, startda : student.data[0].firstd, endda_ : student.data[0].lastd, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none})

			//Checkboxes
			if (this.state.vegetarians == 'yes') {
				this.setState({itemVegetarian : true})
			} else {
				this.setState({itemVegetarian : false}) 
			}
			if (this.state.halal == 'yes') {
				this.setState({itemHalal : true})
			} else {
				this.setState({itemHalal : false}) 
			}
			if (this.state.kosher == 'yes') {
				this.setState({itemKosher : true})
			} else {
				this.setState({itemKosher : false}) 
			}
			if (this.state.lactose == 'yes') {
				this.setState({itemLactose : true})
			} else {
				this.setState({itemLactose : false}) 
			}
			if (this.state.gluten == 'yes') {
				this.setState({itemGluten : true})
			} else {
				this.setState({itemGluten : false}) 
			}
			if (this.state.pork == 'yes') {
				this.setState({itemPork : true})
			} else {
				this.setState({itemPork : false}) 
			}
			if (this.state.none == 'yes') {
				this.setState({itemNone : true})
			} else {
				this.setState({itemNone : false}) 
			}

			let d1 = new Date();
			let d2 = new Date(this.state.dates);
			let one_day = 1000*60*60*24
			let diff = Math.floor(d1.getTime()-d2.getTime())
			let range = Math.floor(diff/(one_day))
			let months = Math.floor(range/31)
			let years = Math.floor(months/12)

			this.setState({ year : years, month : months, ranges : range})

			const dateY2 = new Date(this.state.startd); dateY2.setDate(dateY2.getDate() + 1)
			if (dateY2.getMonth() == 0){
				let YDAY2=`January ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 1){
				let YDAY2=`February ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 2){
				let YDAY2=`March ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 3){
				let YDAY2=`April ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 4){
				let YDAY2=`May ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 5){
				let YDAY2=`June ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 6){
				let YDAY2=`July ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 7){
				let YDAY2=`August ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 8){
				let YDAY2=`September ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 9){
					let YDAY2=`October ${dateY2.getDate()}, ${dateY2.getFullYear()}`
					this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 10){
				let YDAY2=`November ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}
			if (dateY2.getMonth() == 11){
				let YDAY2=`December ${dateY2.getDate()}, ${dateY2.getFullYear()}`
				this.setState({arrivingdate : YDAY2})
			}

			const dateY3 = new Date(this.state.endd_); dateY3.setDate(dateY3.getDate() + 1)
			if (dateY3.getMonth() == 0){
				let YDAY3=`January ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 1){
				let YDAY3=`February ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 2){
				let YDAY3=`March ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 3){
				let YDAY3=`April ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 4){
				let YDAY3=`May ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 5){
				let YDAY3=`June ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 6){
				let YDAY3=`July ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 7){
				let YDAY3=`August ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 8){
				let YDAY3=`September ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 9){
				let YDAY3=`October ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 10){
				let YDAY3=`November ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}
			if (dateY3.getMonth() == 11){
				let YDAY3=`December ${dateY3.getDate()}, ${dateY3.getFullYear()}`
				this.setState({leavingdate : YDAY3})
			}

			const dateY4 = new Date(this.state.startda); dateY4.setDate(dateY4.getDate() + 1)
			if (dateY4.getMonth() == 0){
				let YDAY4=`January ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 1){
				let YDAY4=`February ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 2){
				let YDAY4=`March ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 3){
				let YDAY4=`April ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 4){
				let YDAY4=`May ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 5){
				let YDAY4=`June ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 6){
				let YDAY4=`July ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 7){
				let YDAY4=`August ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 8){
				let YDAY4=`September ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 9){
				let YDAY4=`October ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 10){
				let YDAY4=`November ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}
			if (dateY4.getMonth() == 11){
				let YDAY4=`December ${dateY4.getDate()}, ${dateY4.getFullYear()}`
				this.setState({startacademydate : YDAY4})
			}

			const dateY5 = new Date(this.state.endda_); dateY5.setDate(dateY5.getDate() + 1)
			if (dateY5.getMonth() == 0){
				let YDAY5=`January ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 1){
				let YDAY5=`February ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 2){
				let YDAY5=`March ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 3){
				let YDAY5=`April ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 4){
				let YDAY5=`May ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 5){
				let YDAY5=`June ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 6){
				let YDAY5=`July ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 7){
				let YDAY5=`August ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 8){
				let YDAY5=`September ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 9){
				let YDAY5=`October ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 10){
				let YDAY5=`November ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}
			if (dateY5.getMonth() == 11){
				let YDAY5=`December ${dateY5.getDate()}, ${dateY5.getFullYear()}`
				this.setState({lastacademydate : YDAY5})
			}

			
			const dateY6 = new Date(this.state.departured); dateY6.setDate(dateY6.getDate() + 1)

			
			if (dateY6.getMonth() == 0){
				let YDAY6=`January ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 1){
				let YDAY6=`February ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 2){
				let YDAY6=`March ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 3){
				let YDAY6=`April ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 4){
				let YDAY6=`May ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 5){
				let YDAY6=`June ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 6){
				let YDAY6=`July ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 7){
				let YDAY6=`August ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 8){
				let YDAY6=`September ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 9){
				let YDAY6=`October ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 10){
				let YDAY6=`November ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}
			if (dateY6.getMonth() == 11){
				let YDAY6=`December ${dateY6.getDate()}, ${dateY6.getFullYear()}`
				this.setState({departuredate : YDAY6})
			}

			this.setState({readyDisplay : true, connection_refreshStatus: false, loading : false})

		} else {
			this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
		}
		
	}

	//Go back function
	back = async() => {
		this.props.navigation.navigate('Notification')
	}

	report = async() => {
		this.props.navigation.navigate('Reports')
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
	
	componentWillUnmount(){
		this.NetInfoSubscription && this.NetInfoSubscription()
		clearTimeout(this.timerHandle)
		this.timerHandle = 0;
	}

	//Reject student function 
	reject = async () => {
		api.rejectStudent(this.state.email, this.state.mail, this.state.idnoti, this.state.h_name, this.state.name_h, this.state.l_name_h)
		this.props.navigation.navigate('Notification')
	}

	//Confirm student function
	confirm = async () => {
		api.confirmStudent(this.state.email, this.state.mail, this.state.idnoti, this.state.h_name, this.state.name_h, this.state.l_name_h, this.state.start, this.state.name_s, this.state.l_name_s, this.state.bedrooms, this.state.end, this.state.idm, this.state.agency, this.state.des)
		this.props.navigation.navigate('Notification')
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
								<Skeleton h="40" />
								<HStack w="90%"  space={8} rounded="md" p="4">
									{Dimensions.get('window').width >= 414 ?
										
										<Skeleton flex="1" h="100" mt="1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
										:

										<Skeleton flex="1" h="70" mt="10" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
									}  
									<VStack flex="3" space="4">
										<Skeleton.Text />
									</VStack>
								</HStack>
								<HStack w="80%" space={2} rounded="md" >
									<Skeleton mb="3" w="50%" rounded="20" startColor="purple.200" />
									<Skeleton mb="3" w="50%" rounded="20" startColor="indigo.200" />
								</HStack>
								<Skeleton.Text lines={3} alignItems="center" px="12" />
								<VStack w="90%" mb="3" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
									<View style={globalStyles.skeletonMarginProfileText}>
										<HStack space="2" alignItems="center">
											<Skeleton size="5" rounded="full" />
											<Skeleton h="3" flex="2" rounded="full" />
										</HStack>
									</View>
									<View style={globalStyles.skeletonMarginBottomStudentNot}>
										<Skeleton.Text px="5" />
									</View>
								</VStack>

								{(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
										<VStack w="90%" mb="3" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
											<View style={globalStyles.skeletonMarginProfileText}>
												<HStack space="2" alignItems="center">
													<Skeleton size="5" rounded="full" />
													<Skeleton h="3" flex="2" rounded="full" />
												</HStack>
											</View>
											<View style={globalStyles.skeletonMarginBottomStudentNot}>
												<Skeleton.Text px="5" />
											</View>
										</VStack>
								)}
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
											<Box maxH="80" overflow="hidden">
												<Box>
													<View>
														{item.photo_a != 'NULL' && (
															<AspectRatio w="100%" ratio={16 / 9}>
																<View style={globalStyles.ProfileBannerView}>
																	<Image
																	style={globalStyles.ProfileBannerImages}
																	source={{ uri: `http://homebor.com/${item.photo_a}` }}
																	resizeMode="stretch"
																	/>
																</View>
															</AspectRatio>
														)}
														{item.photo_a == 'NULL' && (
															<AspectRatio w="100%" ratio={16 / 9}>
																<View style={globalStyles.ProfileBannerView}>
																	<Image
																	style={globalStyles.ProfileBannerImages}
																	source={require('../assets/img/promocionales/promocional.jpg')}
																	resizeMode="stretch"
																	/>
																</View>
															</AspectRatio>
														)}
													</View>
												</Box>
											</Box>

											<View style={ globalStyles.profileMargins}>
												<HStack mt="2%" space={5} width="100%">
													<VStack width="45%">
														<Avatar size="lg" bg="#232159" style={globalStyles.profileStudentnot} source={ item.photo_s != "NULL" && { uri: `http://homebor.com/${item.photo_s}` }}>{item.photo_s.toUpperCase().charAt(0)}</Avatar>
													</VStack>
													<VStack width="45%" mt="3%">
														
														<Text style={globalStyles.profiledirtitleStudent}>
															<Text style={ globalStyles.infotitle}>Name: </Text> 
																{item.name_s != "NULL" && item.l_name_s == "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s}</Text>)}	
																{item.name_s == "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.l_name_s}</Text>)}	
																{item.name_s != "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>)}	
														</Text>

														<Text style={globalStyles.profiledirtitleStudent}>
															<Text style={ globalStyles.infotitle}>Gender: </Text> 
																{item.gen_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.gen_s}</Text>)}	
														</Text>
														<Text style={globalStyles.profiledirtitleStudent}>
															<Text style={ globalStyles.infotitle}>Age: </Text> 
																{item.db_s != "NULL" && (<Text style={globalStyles.varProfile}>{this.state.year} years old</Text>)}	
														</Text>
														<Text style={globalStyles.profiledirtitleStudent}>
															<Text style={ globalStyles.infotitle}>Origin Language: </Text> 
																{item.lang_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.lang_s}</Text>)}	
														</Text>

													</VStack>
												</HStack>

												<Divider my="2" bg="gray.500"/>

												{/*Reservation Details*/}
												<View style={ globalStyles.profileMargins}>
													<View>
														<View style={{flexDirection: 'row'}}>
																<Heading size='md' style={ globalStyles.infomaintitleditStudentnotReservation}>Reservation Details</Heading>
														</View>

																<Text style={globalStyles.profiledirtitleStudent}>
																	<Text style={ globalStyles.infotitle}>Room: </Text> 
																		{item.bedrooms == "NULL"
																			?
																				<Text></Text>
																			:
																				<Text style={globalStyles.varProfile}>{item.bedrooms} {item.des == 'A' && (<Text>First Bed</Text>)} {item.des == 'B' && (<Text>Second Bed</Text>)} {item.des == 'C' && (<Text>Third Bed</Text>)}</Text>
																		}	
																</Text>

																<Text style={globalStyles.profiledirtitleStudent}>
																	<Text style={ globalStyles.infotitle}>Arriving Date: </Text> 
																		{item.start == "NULL"
																			?
																				<Text></Text>
																			:
																				<Text style={globalStyles.varProfile}>{this.state.arrivingdate}</Text>
																		}	
																</Text>

																<Text style={globalStyles.profiledirtitleStudent}>
																	<Text style={ globalStyles.infotitle}>Leaving Date: </Text> 
																		{item.end_ == "NULL"
																			?
																				<Text></Text>
																			:
																				<Text style={globalStyles.varProfile}>{this.state.leavingdate}</Text>
																		}	
																</Text>

																	<View>
																		<Center alignItems="center" width="100%">
																			<HStack space="10" alignItems="center">
																				<Center width="45%">
																					<Button
																					success
																					bordered
																					onPress={this.state.connection_status ? this.confirm : this.noInternetConnection}
																					style={globalStyles.botonconfirmStuNativeBase}>
																						<Text style={globalStyles.botonTexto}> Confirm </Text>
																					</Button>
																				</Center>
																				<Center width="45%">
																					<Button
																					success
																					bordered
																					onPress={this.state.connection_status ? this.reject : this.noInternetConnection}
																					style={globalStyles.botonrejectStuNativeBase}>
																						<Text style={globalStyles.botonTexto}> Reject </Text>
																					</Button>
																				</Center>
																			</HStack>
																		</Center>								
																	</View>

																	

																<Divider my="2" bg="gray.500" mb="5%"/>

																<View style={ item.smoke_s == "NULL" && item.drinks_alc == "NULL" && item.drugs == "NULL" && item.allergy_a == "NULL" && item.allergy_m == "NULL" && item.disease == "NULL" && item.treatment == "NULL" && item.treatment_p == "NULL" && item.allergies == "NULL" && item.surgery == "NULL" ? globalStyles.hideContents : globalStyles.show}>
																	<View>
																		<Card>
																		
																			{/*Health Information*/}
																			<View>
																				<Heading size='md' textAlign={(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Health Information</Heading>
																			</View>

																			{/*Tablets*/}			
																			{(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && ( 
																				<View>
																					<HStack space={2} ml="3%">
																						<VStack width="45%">
																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Smoke: </Text> 
																									{item.smoke_s == "NULL"
																										?
																											<Text></Text>
																										:
																											<Text style={globalStyles.varProfile}>{item.smoke_s}</Text>
																									}	
																							</Text>

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Use Drugs: </Text> 
																									{item.drugs == "NULL"
																										?
																											<Text></Text>
																										:
																										item.drugs == "Yes" ?
																											<Text style={globalStyles.varProfile}>{item.drugs}</Text> :
																											<Text style={globalStyles.varProfile}>No</Text>
																									}	
																							</Text>
																						</VStack>
																						<VStack width="45%">

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Drink Alcohol: </Text> 
																									{item.drinks_alc == "NULL"
																										?
																											<Text></Text>
																										:
																										item.drinks_alc == "Yes"
																										? 
																										<Text style={globalStyles.varProfile}>{item.drinks_alc}</Text> 
																											: 
																										<Text style={globalStyles.varProfile}>No</Text>
																									}	
																							</Text>

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Allergy to Animals: </Text> 
																									{item.allergy_a == "NULL"
																										?
																											<Text></Text>
																										:
																										item.allergy_a == "Yes" ? 
																											<Text style={globalStyles.varProfile}>{item.allergy_a}</Text> :
																											<Text style={globalStyles.varProfile}>No</Text>
																									}	
																							</Text>
																						</VStack>
																					</HStack>
																				</View>
																			)}

																			{/*Phones*/}
																			{(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
																				<View>
																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Smoke: </Text> 
																							{item.smoke_s == "NULL"
																								?
																									<Text></Text>
																								:
																									<Text style={globalStyles.varProfile}>{item.smoke_s}</Text>
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Drink Alcohol: </Text> 
																							{item.drinks_alc == "NULL"
																								?
																									<Text></Text>
																								:
																								item.drinks_alc == "Yes"
																								? 
																								<Text style={globalStyles.varProfile}>{item.drinks_alc}</Text> 
																									: 
																								<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Use Drugs: </Text> 
																							{item.drugs == "NULL"
																								?
																									<Text></Text>
																								:
																								item.drugs == "Yes" ?
																									<Text style={globalStyles.varProfile}>{item.drugs}</Text> :
																									<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Allergy to Animals: </Text> 
																							{item.allergy_a == "NULL"
																								?
																									<Text></Text>
																								:
																								item.allergy_a == "Yes" ? 
																									<Text style={globalStyles.varProfile}>{item.allergy_a}</Text> :
																									<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>
																				</View>
																			)}

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>Dietary Restrictions: </Text> 
																					{item.allergy_m == "NULL"
																						?
																							<Text></Text>
																						:
																						item.allergy_m == "NULL" ? 
																							<Text style={globalStyles.varProfile}>{item.allergy_m}</Text> : 
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>Some Disease: </Text> 
																					{item.disease == "NULL"
																						?
																							<Text></Text>
																						:
																						item.disease == "NULL" ?
																							<Text style={globalStyles.varProfile}>{item.disease}</Text> :
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>Medical Treatment: </Text> 
																					{item.treatment == "NULL"
																						?
																							<Text></Text>
																						:
																						item.treatment == "Yes" ? 
																							<Text style={globalStyles.varProfile}>{item.treatment}</Text> :
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>Psychological Treatment: </Text> 
																					{item.treatment_p == "NULL"
																						?
																							<Text></Text>
																						:
																						item.treatment_p == "Yes" ? 
																							<Text style={globalStyles.varProfile}>{item.treatment_p}</Text> :
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>He/she has Allergies: </Text> 
																					{item.allergies == "NULL"
																						?
																							<Text></Text>
																						:
																						item.allergies == "Yes" ? 
																							<Text style={globalStyles.varProfile}>{item.allergies}</Text> : 
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>

																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>He/she had Surgeries: </Text> 
																					{item.surgery == "NULL"
																						?
																							<Text></Text>
																						:
																						item.surgery == "Yes" ? 
																							<Text style={globalStyles.varProfile}>{item.surgery}</Text> :
																							<Text style={globalStyles.varProfile}>No</Text>
																					}	
																			</Text>
																		</Card>
																	</View>
																</View>

																<View style={ item.name_a == "NULL" && item.city_a == "NULL" && item.dir_a == "NULL" && item.type_s == "NULL" && item.firstd == "NULL" && item.lastd == "NULL" ? globalStyles.hideContents : globalStyles.show}>
																	<Card>
																		
																		{/*Academy Information*/}
																		<View>
																			<Heading size='md' textAlign={(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Professional Information</Heading>
																		</View>

																				<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																					<Text style={ globalStyles.infotitle}>Academy Name: </Text> 
																						{item.name_a == "NULL"
																							?
																								<Text></Text>
																							:
																								<Text style={globalStyles.varProfile}>{item.name_a}</Text>
																						}	
																				</Text>

																				<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																					<Text style={ globalStyles.infotitle}>Academy Address: </Text> 
																						{item.dir_a == "NULL"
																							?
																								<Text></Text>
																							:
																								<Text style={globalStyles.varProfile}>{item.dir_a}</Text>
																						}	
																				</Text>

																				<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																					<Text style={ globalStyles.infotitle}>Type of Student: </Text> 
																						{item.type_s == "NULL"
																							?
																								<Text></Text>
																							:
																								<Text style={globalStyles.varProfile}>{item.type_s}</Text>
																						}	
																				</Text>
																	</Card>
																</View>

																<View style={ item.smoker_l == "NULL" && item.children == "NULL" && item.teenagers == "NULL" && item.pets == "NULL" && item.food == "NULL" && item.pick_up == "NULL"  && item.drop_off == "NULL" ? globalStyles.hideContents : globalStyles.show}>
																	<Card>
																
																		{/*House Preferences*/}
																		<View>
																			<Heading size='md' textAlign={(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>House Preferences</Heading>
																		</View>

																		<Card>
																			<View>
																				<Heading size='md' textAlign={(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Can Share With:</Heading>
																			</View>

																			{/*Tablets*/}			
																			{(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
																				<View>
																					<HStack space={2} ml="3%">
																						<VStack width="45%">
																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Smoke: </Text> 
																									{item.smoker_l == "NULL"
																									?
																										<Text></Text>
																									:
																									item.smoker_l == "Yes" ? 
																										<Text style={globalStyles.varProfile}>{item.smoker_l}</Text> : 
																										<Text style={globalStyles.varProfile}>No</Text>
																									}		
																							</Text>

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Use Drugs: </Text> 
																									{item.teenagers == "NULL"
																									?
																										<Text></Text>
																									:
																									item.teenagers == "Yes" ? 
																										<Text style={globalStyles.varProfile}>{item.teenagers}</Text> : 
																										<Text style={globalStyles.varProfile}>No</Text>
																									}
																							</Text>
																						</VStack>
																						<VStack width="45%">

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Drink Alcohol: </Text> 
																									{item.children == "NULL"
																									?
																										<Text></Text>
																									:
																									item.children == "Yes" ? 
																										<Text style={globalStyles.varProfile}>{item.children}</Text> :
																										<Text style={globalStyles.varProfile}>No</Text> 
																									}	
																							</Text>

																							<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																								<Text style={ globalStyles.infotitle}>Allergy to Animals: </Text> 
																									{item.pets == "NULL"
																									?
																										<Text></Text>
																									:
																									item.pets == "Yes" ? 
																										<Text style={globalStyles.varProfile}>{item.pets}</Text> :
																										<Text style={globalStyles.varProfile}>No</Text>
																									}	
																							</Text>
																						</VStack>
																					</HStack>
																				</View>
																			)}

																			{/*Phones*/}
																			{(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
																				<View>
																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Smokers: </Text> 
																							{item.smoker_l == "NULL"
																								?
																									<Text></Text>
																								:
																								item.smoker_l == "Yes" ? 
																									<Text style={globalStyles.varProfile}>{item.smoker_l}</Text> : 
																									<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Children: </Text> 
																							{item.children == "NULL"
																								?
																									<Text></Text>
																								:
																								item.children == "Yes" ? 
																									<Text style={globalStyles.varProfile}>{item.children}</Text> :
																									<Text style={globalStyles.varProfile}>No</Text> 
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Teenagers: </Text> 
																							{item.teenagers == "NULL"
																								?
																									<Text></Text>
																								:
																								item.teenagers == "Yes" ? 
																									<Text style={globalStyles.varProfile}>{item.teenagers}</Text> : 
																									<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>

																					<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																						<Text style={ globalStyles.infotitle}>Pets: </Text> 
																							{item.pets == "NULL"
																								?
																									<Text></Text>
																								:
																								item.pets == "Yes" ? 
																									<Text style={globalStyles.varProfile}>{item.pets}</Text> :
																									<Text style={globalStyles.varProfile}>No</Text>
																							}	
																					</Text>
																				</View>
																			)}


																			<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																				<Text style={ globalStyles.infotitle}>Required Special Diet?: </Text> 
																						{item.food == "NULL"
																							?
																								<Text></Text>
																							:
																							item.food == "Yes" ?
																								<Text style={globalStyles.varProfile}>{item.food}</Text> :
																								<Text style={globalStyles.varProfile}>No</Text>
																						}	
																			</Text>

																			
																			<View style={this.state.itemVegetarian == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemVegetarian} color={this.state.itemVegetarian ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>Vegetarian</Text>
																			</View>

																			<View style={this.state.itemHalal == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemHalal} color={this.state.itemHalal ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>Halal (Muslims)</Text>
																			</View>

																			<View style={this.state.itemKosher == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemKosher} color={this.state.itemKosher ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>Kosher (Jews)</Text>
																			</View>

																			<View style={this.state.itemLactose == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemLactose} color={this.state.itemLactose ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>Lactose Intolerant</Text>
																			</View>

																			<View style={this.state.itemGluten == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemGluten} color={this.state.itemGluten ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>Gluten Free Diet</Text>
																			</View>

																			<View style={this.state.itemPork == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemPork} color={this.state.itemPork ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>No Pork</Text>
																			</View>

																			<View style={this.state.itemNone == true ? globalStyles.editSelectsSquareRightSideStudentInfo : globalStyles.hideContents}>
																				<Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemNone} color={this.state.itemNone ? '#B70B7B' : undefined}/>
																				<Text style={globalStyles.labelSelectEdit}>None</Text>
																			</View>

																		</Card>
																	</Card>
																</View>
															</View>
												</View>

											</View>
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