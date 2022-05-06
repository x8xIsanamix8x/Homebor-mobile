import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, RefreshControl, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Text, Spinner, Heading, Button, Icon, Checkbox } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';

export default class Studentinfo extends Component {

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
		  loading : true, 

		  imagereport: 'NULL',
          photo1 : 'yes',

		  itemVegetarian : false,
          itemHalal : false,
          itemKosher : false,
          itemLactose : false,
          itemGluten : false,
          itemPork : false,
          itemNone : false,
		}
	  }
	
	  async componentDidMount(){

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		  });

		//Get profile
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)

		//Get student data from id noti
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

		//Get student data
        let student = await api.getStudentnot(this.state.idnoti)
		this.setState({ info : student.data, loading : false, dates : student.data[0].db_s, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name, startd : student.data[0].start, endd_ : student.data[0].end_, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none})
		console.log(this.state.info)

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

		//Variables of modal
		this.setState({modalVisible : false, setModalVisible : false})


		//Variables to report student
		let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
		this.setState({ reportstatus : studentreportstatus.data})
		console.log(this.state.reportstatus)
		
		//If the status state of report doesn't exist them the user will made the report
		if(!this.state.reportstatus.length){
			this.setState({ statusre : 'null'})
			console.log('hola')
			console.log(this.state.statusre)
		}else{
			//If the status state of report does exist them the user will not made the report
			this.setState({ statusre : studentreportstatus.data[0].status})
			console.log('chao')
			console.log(this.state.statusre)
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

		const dateY6 = new Date(this.state.departured); dateY6.setDate(dateY6.getDate() + 1)
		console.log(dateY6)

		
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


	  //Refresh call function
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

		//Refresh function
        refresh = async() => {
			//Get user profile
            let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})
			//console.log(userLogin)

			//Get student data from id noti
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			//Get student data
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name, startd : student.data[0].start, endd_ : student.data[0].end_, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none})
			console.log(this.state.info)

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

			//Variables of modal
			this.setState({modalVisible : false, setModalVisible : false})

			//Variables of report
			let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
			this.setState({ reportstatus : studentreportstatus.data})
			console.log(this.state.reportstatus)
			
			//If the status state of report doesn't exist them the user will made the report
			if(!this.state.reportstatus.length){
				this.setState({ statusre : 'null'})
				console.log('hola')
				console.log(this.state.statusre)
			}else{
				//If the status state of report does exist them the user will not made the report
				this.setState({ statusre : studentreportstatus.data[0].status})
				console.log('chao')
				console.log(this.state.statusre)
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

			const dateY6 = new Date(this.state.departured); dateY6.setDate(dateY6.getDate() + 1)
			console.log(dateY6)

			
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
            
    	}

		  //Go back function
		  back = async() => {
			this.props.navigation.navigate('Notification')
		  }

		  report = async() => {
			this.props.navigation.navigate('Reports')
		  }

		  //Open modal function
		  modalopen = async() => {
			  this.setState({modalVisible : true, setModalVisible : true})
		  }

		  //Close modal function
		  modalclose = async() => {
			this.setState({modalVisible : false, setModalVisible : false})
		  }

		  //Report student function
		  modalnotify = async() => {
			let localUri = this.state.imagereport;
			if (localUri == 'NULL') {
				console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
				api.reportStudent(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
				this.setState({modalVisible : false, setModalVisible : false})
				this.props.navigation.navigate('Notification')
            } else {
				this.registerfile1() 
                this.setState({modalVisible : false, setModalVisible : false})
                this.props.navigation.navigate('Notification')
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
			  let bedrooms = this.state.bedrooms;
			  let photo1 = this.state.photo1;
	
			  console.log(this.state.name_h, this.state.l_name_h, this.state.email, this.state.managermail, this.state.agency, this.state.mail, this.state.des, this.state.idnoti, this.state.report, this.state.bedrooms)
	
			  return await fetch(`https://homebor.com/reportstudentapp.php?name_h=${name_h}&l_name_h=${l_name_h}&email=${eMail}&managermail=${managermail}&agency=${agency}&mail=${mail}&des=${des}&idnoti=${idnoti}&report=${report}&bedrooms=${bedrooms}&photo1=${photo1}`, {
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

  render() {
      //Variables
		let modalVisible = this.state.modalVisible;
		let setModalVisible = this.state.setModalVisible;
		let statusre = this.state.statusre;
		let { imagereport } = this.state;
    
  return (
	<NativeBaseProvider>
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
				<View>
                <ScrollView nestedScrollEnabled={true} >
                    <View>
                        <ImageBackground source={{ uri: `http://homebor.com/${item.photo_a}` }} style={item.photo_a == "NULL" ? globalStyles.hide : globalStyles.profileBanner}>
                            <Image
                                style={globalStyles.profileBannerStudent}>
                            </Image>
                        </ImageBackground>

                        <View style={ globalStyles.profileMargins}>
							<Image
								source={{ uri: `http://homebor.com/${item.photo_s}` }}
								resizeMode="cover"
								style={item.photo_s == "NULL" ? globalStyles.hide : globalStyles.profileStudent}>
							</Image>

							{/*Personal Information*/}
							<View style={ item.name_s == "NULL" && item.l_name_s == "NULL" && item.mail_s == "NULL" && item.gen_s == "NULL" && item.db_s == "NULL" && item.nacionality == "NULL" && item.city == "NULL" && item.lang_s == "NULL" && item.passport == "NULL" ? globalStyles.hideContents : globalStyles.show}>
								<Card>
									<View>
										<Text style={globalStyles.profiledirtitleStudentLeftSide}>
											<Text style={ globalStyles.infotitle}>Name: </Text> 
												{item.name_s == "NULL" && item.l_name_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>
												}	
											</Text>

										<Text style={globalStyles.profiledirtitleStudentRightSide}>
											<Text style={ globalStyles.infotitle}>Email: </Text> 
												{item.mail_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.mail_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitleStudentLeftSide}>
											<Text style={ globalStyles.infotitle}>Age: </Text> 
												{item.db_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{this.state.year} years old</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitleStudentRightSide}>
											<Text style={ globalStyles.infotitle}>Date of Birth: </Text> 
												{item.db_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.db_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitleStudentLeftSide}>
											<Text style={ globalStyles.infotitle}>Gender: </Text> 
												{item.gen_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.gen_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitleStudentRightSide}>
											<Text style={ globalStyles.infotitle}>Phone Number: </Text> 
												{item.num_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.num_s}</Text>
												}	
											</Text>

										<Text style={globalStyles.profiledirtitleStudentLeftSide}>
											<Text style={ globalStyles.infotitle}>Origin Language: </Text> 
												{item.lang_s == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.lang_s}</Text>
												}	
											</Text>
										<Text style={globalStyles.profiledirtitleStudentRightSide}>
											<Text style={ globalStyles.infotitle}>Passport: </Text> 
												{item.passport == "NULL"
													?
														<Text></Text>
													:
														<Text style={globalStyles.varProfile}>{item.passport}</Text>
												}	
											</Text>
									</View>
								</Card>
							</View>

                                {/*Reservation Details*/}
								<View style={ globalStyles.profileMargins}>
									<View style={ item.bedrooms == "NULL" && item.start == "NULL" && item.end_ == "NULL" ? globalStyles.hideContents : globalStyles.ReservationStudentMarginTop}>
										<View style={{flexDirection: 'row'}}>
												<Heading size='md' style={ globalStyles.infomaintitleditStudentLodging}>Lodging Information</Heading>
										</View>
										
												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Bedroom: </Text> 
														{item.bedrooms == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{item.bedrooms}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>Start Date of Stay: </Text> 
														{item.start == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{this.state.arrivingdate}</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudent}>
													<Text style={ globalStyles.infotitle}>End Date of Stay: </Text> 
														{item.end_ == "NULL"
															?
																<Text></Text>
															:
																<Text style={globalStyles.varProfile}>{this.state.leavingdate}</Text>
														}	
												</Text>
													
												<Button
													success
													bordered
													onPress={this.report}
													style={globalStyles.botoneditProfile2}>
													<Text style={globalStyles.botonTexto}>Report Student</Text>
												</Button>
									</View>
								</View>

								<View style={ globalStyles.hr} />


									<View style={ item.smoke_s == "NULL" && item.drinks_alc == "NULL" && item.drugs == "NULL" && item.allergy_a == "NULL" && item.allergy_m == "NULL" && item.disease == "NULL" && item.treatment == "NULL" && item.treatment_p == "NULL" && item.allergies == "NULL" && item.surgery == "NULL" ? globalStyles.hideContents : globalStyles.show}>
									<Card>
								
                                    {/*Health Information*/}
                                    <View style={{flexDirection: 'row'}}>
                                                <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Health Information</Heading>
                                    </View>

                                            <Text style={globalStyles.profiledirtitleStudentLeftSide}>
                                                <Text style={ globalStyles.infotitle}>Smoke: </Text> 
                                                    {item.smoke_s == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.smoke_s}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitleStudentRightSide}>
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

                                            <Text style={globalStyles.profiledirtitleStudentRightSide}>
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

								<View style={ item.name_a == "NULL" && item.city_a == "NULL" && item.dir_a == "NULL" && item.type_s == "NULL" && item.firstd == "NULL" && item.lastd == "NULL" ? globalStyles.hideContents : globalStyles.show}>
									<Card>
										
										{/*Academy Information*/}
										<View style={{flexDirection: 'row'}}>
													<Heading size='md' style={ globalStyles.infomaintitleditTablets3}>Professional Information</Heading>
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

								
							
									
									{/*Flight Information*/}
									<View style={ item.n_airline == "NULL" && item.n_flight== "NULL" && item.departure_f == "NULL" && item.start == "NULL" ? globalStyles.hideContents : globalStyles.show}>
										<Card>
											<View style={{flexDirection: 'row'}}>
														<Heading size='md' style={ globalStyles.infomaintitleditTablets}>Flight Information</Heading>
											</View>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Booking Confirmation: </Text> 
													{item.n_airline == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.n_airline}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Landing Flight Number: </Text> 
													{item.n_flight == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.n_flight}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Flight Date: </Text> 
													{item.departure_f == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{this.state.departuredate}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Arrival at the Homestay: </Text> 
													{item.start == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{this.state.arrivingdate}</Text>
													}	
											</Text>
										</Card>
									</View>

									<View style={ item.cont_name == "NULL" && item.cont_lname == "NULL" && item.cell_s == "NULL" && item.num_conts == "NULL" ? globalStyles.hideContents : globalStyles.show}>
										{/*Emergency Contact*/}
										<Card>
											<View style={{flexDirection: 'row'}}>
														<Heading size='md' style={ globalStyles.infomaintitleditTablets}>Emergency Contact</Heading>
											</View>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Contact Name: </Text> 
													{item.cont_name == "NULL" && item.cont_lname == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.cont_name} {item.cont_lname}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Alternative Number: </Text> 
													{item.cell_s == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.cell_s}</Text>
													}	
											</Text>

											<Text style={globalStyles.profiledirtitleStudentLeftSide}>
												<Text style={ globalStyles.infotitle}>Emergency Contact: </Text> 
													{item.num_conts == "NULL"
														?
															<Text></Text>
														:
															<Text style={globalStyles.varProfile}>{item.num_conts}</Text>
													}	
											</Text>

										</Card>
									</View>

									<View style={ item.smoker_l == "NULL" && item.children == "NULL" && item.teenagers == "NULL" && item.pets == "NULL" && item.food == "NULL" && item.pick_up == "NULL"  && item.drop_off == "NULL" ? globalStyles.hideContents : globalStyles.show}>
									<Card>
								
                                    {/*House Preferences*/}
                                    <View style={{flexDirection: 'row'}}>
                                                <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Additional Information</Heading>
                                    </View>

									<View style={ globalStyles.hr2} />
										
											<Card>
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

												<View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemVegetarian} onPress={() => this.setState({ itemVegetarian: this.state.itemVegetarian })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>Vegetarian</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemHalal} onPress={() => this.setState({ itemHalal: this.state.itemHalal })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>Halal (Muslims)</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemKosher} onPress={() => this.setState({ itemKosher: this.state.itemKosher })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>Kosher (Jews)</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemLactose} onPress={() => this.setState({ itemLactose: this.state.itemLactose })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>Lactose Intolerant</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemGluten} onPress={() => this.setState({ itemGluten: this.state.itemGluten })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>Gluten Free Diet</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemPork} onPress={() => this.setState({ itemPork: this.state.itemPork })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>No Pork</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' isChecked={this.state.itemNone} onPress={() => this.setState({ itemNone: this.state.itemNone })} aria-label="Close"/>
                                                        <Text style={globalStyles.labelSelectEdit}>None</Text>
                                                    </View>
											</Card>

			
													

											<Card>
												<View style={{marginBottom : '5%'}} >
													<Heading size='md' style={ globalStyles.infomaintitleditTablets4}>Transport</Heading>
												</View>
													


												<Text style={globalStyles.profiledirtitleStudentLeftSide}>
													<Text style={ globalStyles.infotitle}>Pick Up Service: </Text> 
													{item.pick_up == "NULL"
															?
																<Text></Text>
															:
															item.pick_up == "Yes" ? 
																<Text style={globalStyles.varProfile}>{item.pick_up}</Text> :
																<Text style={globalStyles.varProfile}>No</Text>
														}	
												</Text>

												<Text style={globalStyles.profiledirtitleStudentRightSide}>
													<Text style={ globalStyles.infotitle}>Drop of Service: </Text> 
														{item.drop_off == "NULL"
															?
																<Text></Text>
															:
															item.drop_off == "Yes" ? 
																<Text style={globalStyles.varProfile}>{item.drop_off}</Text> :
																<Text style={globalStyles.varProfile}>No</Text>
														}	
												</Text>
											</Card>

										</Card>
								</View>
                            </View>
                    </View>
                    
                </ScrollView>


                <Button
                    success
                    bordered
                    onPress={this.back}
                    style={globalStyles.botoneditProfile}>
                    <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='chevron-left' style={globalStyles.botonTextoDisable}> Go Back</Icon></Text>
                </Button>
				</View>
            
           
                )}> 
    </FlatList>
	</NativeBaseProvider>
    
  );
}
}