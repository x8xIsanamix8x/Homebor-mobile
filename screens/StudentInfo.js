import React, {Component, useState} from 'react'; 
import { View, Image, RefreshControl, Dimensions } from 'react-native';
import { NativeBaseProvider, AspectRatio, Box, Text, Spinner, Heading, Button, Icon, Avatar, Slide, Alert as AlertNativeBase, Divider, VStack, HStack, Skeleton, Center  } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import Checkbox from 'expo-checkbox';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class Studentinfo extends Component {
	NetInfoSubscription = null;
	
	constructor(props) {
		super(props);
		this.state = {
			//Variables
			email : '',
			perm : false,
			info : [],
			refreshing: false,
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

		//Get student data from id noti
        let idnoti = await AsyncStorage.getItem('idnoti')
		idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

		if(this.state.connection_status == true) {
			//Get student data
			let student = await api.getStudentnot(this.state.idnoti)
			this.setState({ info : student.data, loading : false, dates : student.data[0].db_s, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name, startd : student.data[0].start, endd_ : student.data[0].end_, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none})
	
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
	
	
			//Variables to report student
			let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
			this.setState({ reportstatus : studentreportstatus.data})
	
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
	
			this.setState({readyDisplay : true, connection_refreshStatus: false})

		} else {
			this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
		}

		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.setState({readyDisplay : false})
			this.onRefresh()
		});
				
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

			//Get student data from id noti
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			if(this.state.connection_status == true) {

				//Get student data
				let student = await api.getStudentnot(this.state.idnoti)
				this.setState({ info : student.data, loading : false, mail : student.data[0].mail_s, h_name : student.data[0].h_name, name_h : student.data[0].name_h, l_name_h : student.data[0].l_name_h, start : student.data[0].start, name_s : student.data[0].name_s, l_name_s : student.data[0].l_name_s, bedrooms : student.data[0].bedrooms, end : student.data[0].end_, idm : student.data[0].id_m, report : 'NULL', des : 'NULL', managermail : student.data[0].mail, agency : student.data[0].a_name, startd : student.data[0].start, endd_ : student.data[0].end_, departured : student.data[0].formatted_date, vegetarians : student.data[0].vegetarians, halal : student.data[0].halal, kosher : student.data[0].kosher, lactose : student.data[0].lactose, gluten : student.data[0].gluten, pork : student.data[0].pork, none : student.data[0].none})

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

				//Variables of report
				let studentreportstatus = await api.getReportStudentstatus(this.state.mail)
				this.setState({ reportstatus : studentreportstatus.data})

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

			this.setState({readyDisplay : true, connection_refreshStatus: false})

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
								<Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-70" />
								<Skeleton.Text lines={3} alignItems="center" px="12" />
								<VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
									<View style={globalStyles.skeletonMarginProfileText}>
										<HStack space="2" alignItems="center">
											<Skeleton size="5" rounded="full" />
											<Skeleton h="3" flex="2" rounded="full" />
										</HStack>
									</View>
									<Skeleton.Text px="5" />
									<Skeleton.Text px="5" my="4" />
								</VStack>
								<Skeleton mb="3" w="40" rounded="20" startColor="purple.200" />

								{Dimensions.get('window').width >= 414 &&(
										<VStack mb="3" w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
											<View style={globalStyles.skeletonMarginProfileText}>
												<HStack space="2" alignItems="center">
													<Skeleton size="5" rounded="full" />
													<Skeleton h="3" flex="2" rounded="full" />
												</HStack>
											</View>
											<Skeleton.Text px="5" />
											<Skeleton.Text px="5" my="4" />
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
													<AspectRatio w="100%" ratio={16 / 9}>
														<Image source={{ uri: `http://homebor.com/${item.photo_a}` }} alt="image" />
													</AspectRatio>
												</Box>
											</Box>
											
											<View style={ globalStyles.profileMargins}>
												{(Dimensions.get('window').width >= 414) && (
													<Center mt="-10%">
														<Avatar size="lg" bg="#232159" style={globalStyles.profileStudent} source={ item.photo_s != "NULL" && { uri: `http://homebor.com/${item.photo_s}` }}>{item.photo_s.toUpperCase().charAt(0)}</Avatar>
													</Center>
												)}
												{(Dimensions.get('window').width < 414) && (
													<Center mt="-15%">
														<Avatar size="lg" bg="#232159" style={globalStyles.profileStudent} source={ item.photo_s != "NULL" && { uri: `http://homebor.com/${item.photo_s}` }}>{item.photo_s.toUpperCase().charAt(0)}</Avatar>
													</Center>
												)}

												{/*Personal Information*/}
												{/*Tablets*/}
												{(Dimensions.get('window').width >= 414) && (
													<View style={ item.name_s == "NULL" && item.l_name_s == "NULL" && item.mail_s == "NULL" && item.gen_s == "NULL" && item.db_s == "NULL" && item.nacionality == "NULL" && item.city == "NULL" && item.lang_s == "NULL" && item.passport == "NULL" ? globalStyles.hideContents : globalStyles.show}>
														<Card>
															<View style={globalStyles.TopFirstInfoStudent}>
																<HStack space={2}>
																	<VStack width="45%">
																		<View>
																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Name: </Text> 
																				{item.name_s != "NULL" && item.l_name_s == "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s}</Text>)}	
																				{item.name_s == "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.l_name_s}</Text>)}	
																				{item.name_s != "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>)}	
																		</Text>

													
																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Age: </Text>
																				{item.db_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.db_s}</Text>)}	
																		</Text>
																		
																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Gender: </Text>
																				{item.gen_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.gen_s}</Text>)}	 
																		</Text>

																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Origin Language: </Text>
																				{item.lang_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.lang_s}</Text>)}	 
																		</Text>

																		</View>
																	</VStack>
																	<VStack width="45%">

																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Email: </Text>
																				{item.mail_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.mail_s}</Text>)}	
																		</Text>
																		
																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Date of Birth: </Text>
																				{item.db_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.db_s}</Text>)}	
																		</Text>
																		
																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Phone Number: </Text>
																				{item.num_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.num_s}</Text>)}	
																		</Text>

																		<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																			<Text style={ globalStyles.infotitle}>Passport: </Text> 
																				{item.passport != "NULL" && (<Text style={globalStyles.varProfile}>{item.passport}</Text>)}	
																		</Text>

																	</VStack>
																</HStack>
															</View>
														</Card>
													</View>
												)}
												{/*Phones*/}
												{(Dimensions.get('window').width < 414) && (
													<View style={ item.name_s == "NULL" && item.l_name_s == "NULL" && item.mail_s == "NULL" && item.gen_s == "NULL" && item.db_s == "NULL" && item.nacionality == "NULL" && item.city == "NULL" && item.lang_s == "NULL" && item.passport == "NULL" ? globalStyles.hideContents : globalStyles.show}>
														<Card>
															<View style={globalStyles.TopFirstInfoStudent}>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Name: </Text> 
																		{item.name_s != "NULL" && item.l_name_s == "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s}</Text>)}	
																		{item.name_s == "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.l_name_s}</Text>)}	
																		{item.name_s != "NULL" && item.l_name_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.name_s} {item.l_name_s}</Text>)}	
																	</Text>

																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Email: </Text>
																		{item.mail_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.mail_s}</Text>)}	
																	</Text>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Age: </Text>
																		{item.db_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.db_s}</Text>)}	
																	</Text>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Date of Birth: </Text>
																		{item.db_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.db_s}</Text>)}	
																	</Text>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Gender: </Text>
																		{item.gen_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.gen_s}</Text>)}	 
																	</Text>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Phone Number: </Text>
																		{item.num_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.num_s}</Text>)}	
																	</Text>

																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Origin Language: </Text>
																		{item.lang_s != "NULL" && (<Text style={globalStyles.varProfile}>{item.lang_s}</Text>)}	 
																	</Text>
																<Text style={globalStyles.profiledirtitleStudentLeftSide}>
																	<Text style={ globalStyles.infotitle}>Passport: </Text> 
																		{item.passport != "NULL" && (<Text style={globalStyles.varProfile}>{item.passport}</Text>)}	
																	</Text>
															</View>
															
														</Card>
													</View>
												)}
												

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
												
												<Divider my="2" bg="gray.500"/>

												<View style={ item.smoke_s == "NULL" && item.drinks_alc == "NULL" && item.drugs == "NULL" && item.allergy_a == "NULL" && item.allergy_m == "NULL" && item.disease == "NULL" && item.treatment == "NULL" && item.treatment_p == "NULL" && item.allergies == "NULL" && item.surgery == "NULL" ? globalStyles.hideContents : globalStyles.show}>
													<Card>
													
														{/*Health Information*/}
														<View>
															<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Health Information</Heading>
														</View>

														{/*Tablets*/}			
														{(Dimensions.get('window').width >= 414) && (
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
														{(Dimensions.get('window').width < 414) && (
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

												<View style={ item.name_a == "NULL" && item.city_a == "NULL" && item.dir_a == "NULL" && item.type_s == "NULL" && item.firstd == "NULL" && item.lastd == "NULL" ? globalStyles.hideContents : globalStyles.show}>
													<Card>
														
														{/*Academy Information*/}
														<View>
															<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Professional Information</Heading>
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
														<View>
															<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Flight Information</Heading>
														</View>

														<Text style={globalStyles.profiledirtitleStudentLeftSide}>
															<Text style={ globalStyles.infotitle}>Booking Confirmation: </Text> 
															{item.n_airline != "NULL" && (<Text style={globalStyles.varProfile}>{item.n_airline}</Text>)}	
														</Text>

														<Text style={globalStyles.profiledirtitleStudentLeftSide}>
															<Text style={ globalStyles.infotitle}>Landing Flight Number: </Text>
															{item.n_flight != "NULL" && (<Text style={globalStyles.varProfile}>{item.n_flight}</Text>)} 
														</Text>

														<Text style={globalStyles.profiledirtitleStudentLeftSide}>
															<Text style={ globalStyles.infotitle}>Flight Date: </Text>
															{item.departure_f != "NULL" && (<Text style={globalStyles.varProfile}>{this.state.departuredate}</Text>)} 
														</Text>

														<Text style={globalStyles.profiledirtitleStudentLeftSide}>
															<Text style={ globalStyles.infotitle}>Arrival at the Homestay: </Text>
															{item.start != "NULL" && (<Text style={globalStyles.varProfile}>{this.state.arrivingdate}</Text>)} 
														</Text>
													</Card>
												</View>

												<View style={ item.cont_name == "NULL" && item.cont_lname == "NULL" && item.cell_s == "NULL" && item.num_conts == "NULL" ? globalStyles.hideContents : globalStyles.show}>
													{/*Emergency Contact*/}
													<Card>
														<View>
															<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Emergency Contact</Heading>
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
														<View>
															<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>House Preferences</Heading>
														</View>

														<Card>
															<View>
																<Heading size='md' textAlign={(Dimensions.get('window').width >= 414) ? 'center' : 'left'} style={ globalStyles.infomaintitleditTabletsNativeBase}>Can Share With:</Heading>
															</View>

															{/*Tablets*/}			
															{(Dimensions.get('window').width >= 414) && (
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
															{(Dimensions.get('window').width < 414) && (
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

											<Center>
												<Button
													success
													bordered
													onPress={this.back}
													style={globalStyles.botonStudnentProfile}>
													<Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='chevron-left' style={globalStyles.botonTextoDisable}> Go Back</Icon></Text>
												</Button>
											</Center>
											
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