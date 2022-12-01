import React, {Component, useState} from 'react'; 
import { View, Image, Text, RefreshControl, Dimensions, Platform } from 'react-native';
import { NativeBaseProvider, Heading, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Divider, Box, AspectRatio, Stack, Fab, Icon  } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";

export default class RoomsPreview extends Component {
    NetInfoSubscription = null;

    constructor(props){
        super(props);
        this.state = {
            //Variables 
            email : '',
            perm : false,
            info : [],
            refreshing: false,

            //Variables of collapsibles
            expanded: false,
            expanded2: false,
            expanded3: false,
            expanded4: false,
            expanded5: false,
            expanded6: false,
            expanded7: false,
            expanded8: false,

            //Internet Connection
            connection_status: false,
            connection_refreshStatus: false,
            clockrun : false,

            //LoadingFirstTime
            readyDisplay : false, 
            
            //RoomsEvents Filters
            filterCollapseRoom1 : false,
            filterInformationRoom1BedA : false,
            filterInformationRoom1BedB : false,
            filterInformationRoom1BedC : false,

            filterCollapseRoom2 : false,
            filterInformationRoom2BedA : false,
            filterInformationRoom2BedB : false,
            filterInformationRoom2BedC : false,

            filterCollapseRoom3 : false,
            filterInformationRoom3BedA : false,
            filterInformationRoom3BedB : false,
            filterInformationRoom3BedC : false,

            filterCollapseRoom4 : false,
            filterInformationRoom4BedA : false,
            filterInformationRoom4BedB : false,
            filterInformationRoom4BedC : false,

            filterCollapseRoom5 : false,
            filterInformationRoom5BedA : false,
            filterInformationRoom5BedB : false,
            filterInformationRoom5BedC : false,

            filterCollapseRoom6 : false,
            filterInformationRoom6BedA : false,
            filterInformationRoom6BedB : false,
            filterInformationRoom6BedC : false,

            filterCollapseRoom7 : false,
            filterInformationRoom7BedA : false,
            filterInformationRoom7BedB : false,
            filterInformationRoom7BedC : false,

            filterCollapseRoom8 : false,
            filterInformationRoom8BedA : false,
            filterInformationRoom8BedB : false,
            filterInformationRoom8BedC : false,
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange,)
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
    
        if(this.state.connection_status == true) {
    
            //Get user profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false, connection_refreshStatus: false, room1: profile[0].room1, room2: profile[0].room2, room3: profile[0].room3, room4: profile[0].room4, room5: profile[0].room5, room6: profile[0].room6, room7: profile[0].room7, room8: profile[0].room8})

            let dateDocp = new Date()
            let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`
            this.setState({XDAY : XDAYp})

            if(this.state.room1 && this.state.room1.length > 0) {
                
                let filterfirstRoom = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom1 : filterfirstRoom})
                
                let filterfirstRoomBedA = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom1BedA : filterfirstRoomBedA})
            
                let filterfirstRoomBedB = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom1BedB : filterfirstRoomBedB})
            
                let filterfirstRoomBedC = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom1BedC : filterfirstRoomBedC})
            
                if(this.state.filterRoom1.length === 0){
                    this.setState({filterCollapseRoom1 : false})
                } else {this.setState({filterCollapseRoom1 : true})}
            
                if (this.state.filterRoom1BedA.length === 0){
                    this.setState({filterInformationRoom1BedA : false})
                } else {this.setState({filterInformationRoom1BedA : true})}
            
                if (this.state.filterRoom1BedB.length === 0){
                    this.setState({filterInformationRoom1BedB : false})
                } else {this.setState({filterInformationRoom1BedB : true})}
            
                if (this.state.filterRoom1BedC.length === 0){
                    this.setState({filterInformationRoom1BedC : false})
                } else {this.setState({filterInformationRoom1BedC : true})}
            
            }

            if(this.state.room2 && this.state.room2.length > 0) {
                
                let filtersecondRoom = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom2 : filtersecondRoom})
                
                let filtersecondRoomBedA = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom2BedA : filtersecondRoomBedA})
            
                let filtersecondRoomBedB = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom2BedB : filtersecondRoomBedB})
            
                let filtersecondRoomBedC = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom2BedC : filtersecondRoomBedC})
            
                if(this.state.filterRoom2.length === 0){
                    this.setState({filterCollapseRoom2 : false})
                } else {this.setState({filterCollapseRoom2 : true})}
            
                if (this.state.filterRoom2BedA.length === 0){
                    this.setState({filterInformationRoom2BedA : false})
                } else {this.setState({filterInformationRoom2BedA : true})}
            
                if (this.state.filterRoom2BedB.length === 0){
                    this.setState({filterInformationRoom2BedB : false})
                } else {this.setState({filterInformationRoom2BedB : true})}
            
                if (this.state.filterRoom2BedC.length === 0){
                    this.setState({filterInformationRoom2BedC : false})
                } else {this.setState({filterInformationRoom2BedC : true})}
            
            }

            if(this.state.room3 && this.state.room3.length > 0) {
                
                let filterthirdRoom = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom3 : filterthirdRoom})
                
                let filterthirdRoomBedA = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom3BedA : filterthirdRoomBedA})

                let filterthirdRoomBedB = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom3BedB : filterthirdRoomBedB})

                let filterthirdRoomBedC = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom3BedC : filterthirdRoomBedC})

                if(this.state.filterRoom3.length === 0){
                    this.setState({filterCollapseRoom3 : false})
                } else {this.setState({filterCollapseRoom3 : true})}

                if (this.state.filterRoom3BedA.length === 0){
                    this.setState({filterInformationRoom3BedA : false})
                } else {this.setState({filterInformationRoom3BedA : true})}

                if (this.state.filterRoom3BedB.length === 0){
                    this.setState({filterInformationRoom3BedB : false})
                } else {this.setState({filterInformationRoom3BedB : true})}

                if (this.state.filterRoom3BedC.length === 0){
                    this.setState({filterInformationRoom3BedC : false})
                } else {this.setState({filterInformationRoom3BedC : true})}

            }

            if(this.state.room4 && this.state.room4.length > 0) {
                
                let filterfourthRoom = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom4 : filterfourthRoom})
                
                let filterfourthRoomBedA = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom4BedA : filterfourthRoomBedA})
            
                let filterfourthRoomBedB = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom4BedB : filterfourthRoomBedB})
            
                let filterfourthRoomBedC = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom4BedC : filterfourthRoomBedC})
            
                if(this.state.filterRoom4.length === 0){
                    this.setState({filterCollapseRoom4 : false})
                } else {this.setState({filterCollapseRoom4 : true})}
            
                if (this.state.filterRoom4BedA.length === 0){
                    this.setState({filterInformationRoom4BedA : false})
                } else {this.setState({filterInformationRoom4BedA : true})}
            
                if (this.state.filterRoom4BedB.length === 0){
                    this.setState({filterInformationRoom4BedB : false})
                } else {this.setState({filterInformationRoom4BedB : true})}
            
                if (this.state.filterRoom4BedC.length === 0){
                    this.setState({filterInformationRoom4BedC : false})
                } else {this.setState({filterInformationRoom4BedC : true})}
            
            }

            if(this.state.room5 && this.state.room5.length > 0) {
                
                let filterfifthRoom = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom5 : filterfifthRoom})
                
                let filterfifthRoomBedA = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom5BedA : filterfifthRoomBedA})
            
                let filterfifthRoomBedB = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom5BedB : filterfifthRoomBedB})
            
                let filterfifthRoomBedC = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom5BedC : filterfifthRoomBedC})
            
                if(this.state.filterRoom5.length === 0){
                    this.setState({filterCollapseRoom5 : false})
                } else {this.setState({filterCollapseRoom5 : true})}
            
                if (this.state.filterRoom5BedA.length === 0){
                    this.setState({filterInformationRoom5BedA : false})
                } else {this.setState({filterInformationRoom5BedA : true})}
            
                if (this.state.filterRoom5BedB.length === 0){
                    this.setState({filterInformationRoom5BedB : false})
                } else {this.setState({filterInformationRoom5BedB : true})}
            
                if (this.state.filterRoom5BedC.length === 0){
                    this.setState({filterInformationRoom5BedC : false})
                } else {this.setState({filterInformationRoom5BedC : true})}
            
            }

            if(this.state.room6 && this.state.room6.length > 0) {
                
                let filtersixthRoom = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom6 : filtersixthRoom})
                
                let filtersixthRoomBedA = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom6BedA : filtersixthRoomBedA})
            
                let filtersixthRoomBedB = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom6BedB : filtersixthRoomBedB})
            
                let filtersixthRoomBedC = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom6BedC : filtersixthRoomBedC})
            
                if(this.state.filterRoom6.length === 0){
                    this.setState({filterCollapseRoom6 : false})
                } else {this.setState({filterCollapseRoom6 : true})}
            
                if (this.state.filterRoom6BedA.length === 0){
                    this.setState({filterInformationRoom6BedA : false})
                } else {this.setState({filterInformationRoom6BedA : true})}
            
                if (this.state.filterRoom6BedB.length === 0){
                    this.setState({filterInformationRoom6BedB : false})
                } else {this.setState({filterInformationRoom6BedB : true})}
            
                if (this.state.filterRoom6BedC.length === 0){
                    this.setState({filterInformationRoom6BedC : false})
                } else {this.setState({filterInformationRoom6BedC : true})}
            
            }

            if(this.state.room7 && this.state.room7.length > 0) {
                
                let filterseventhRoom = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom7 : filterseventhRoom})
                
                let filterseventhRoomBedA = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom7BedA : filterseventhRoomBedA})
            
                let filterseventhRoomBedB = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom7BedB : filterseventhRoomBedB})
            
                let filterseventhRoomBedC = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom7BedC : filterseventhRoomBedC})
            
                if(this.state.filterRoom7.length === 0){
                    this.setState({filterCollapseRoom7 : false})
                } else {this.setState({filterCollapseRoom7 : true})}
            
                if (this.state.filterRoom7BedA.length === 0){
                    this.setState({filterInformationRoom7BedA : false})
                } else {this.setState({filterInformationRoom7BedA : true})}
            
                if (this.state.filterRoom7BedB.length === 0){
                    this.setState({filterInformationRoom7BedB : false})
                } else {this.setState({filterInformationRoom7BedB : true})}
            
                if (this.state.filterRoom7BedC.length === 0){
                    this.setState({filterInformationRoom7BedC : false})
                } else {this.setState({filterInformationRoom7BedC : true})}
            
            }

            if(this.state.room8 && this.state.room8.length > 0) {
                
                let filtereighthRoom = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom8 : filtereighthRoom})
                
                let filtereighthRoomBedA = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom8BedA : filtereighthRoomBedA})
            
                let filtereighthRoomBedB = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom8BedB : filtereighthRoomBedB})
            
                let filtereighthRoomBedC = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom8BedC : filtereighthRoomBedC})
            
                if(this.state.filterRoom8.length === 0){
                    this.setState({filterCollapseRoom8 : false})
                } else {this.setState({filterCollapseRoom8 : true})}
            
                if (this.state.filterRoom8BedA.length === 0){
                    this.setState({filterInformationRoom8BedA : false})
                } else {this.setState({filterInformationRoom8BedA : true})}
            
                if (this.state.filterRoom8BedB.length === 0){
                    this.setState({filterInformationRoom8BedB : false})
                } else {this.setState({filterInformationRoom8BedB : true})}
            
                if (this.state.filterRoom8BedC.length === 0){
                    this.setState({filterInformationRoom8BedC : false})
                } else {this.setState({filterInformationRoom8BedC : true})}
            
            }

            this.setState({readyDisplay : true})

        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Refresh function when open this screen
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onRefresh()
        });
    }

    //Function call for refresh
    onRefresh = () => {
    this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
    }

    //Function refresh
    refresh = async() => {
        if(this.state.connection_status == true) {
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, connection_refreshStatus: false})

            let dateDocp = new Date()
            let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`
            this.setState({XDAY : XDAYp})

            if(this.state.room1 && this.state.room1.length > 0) {
                
                let filterfirstRoom = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom1 : filterfirstRoom})
                
                let filterfirstRoomBedA = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom1BedA : filterfirstRoomBedA})
            
                let filterfirstRoomBedB = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom1BedB : filterfirstRoomBedB})
            
                let filterfirstRoomBedC = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom1BedC : filterfirstRoomBedC})
            
                if(this.state.filterRoom1.length === 0){
                    this.setState({filterCollapseRoom1 : false})
                } else {this.setState({filterCollapseRoom1 : true})}
            
                if (this.state.filterRoom1BedA.length === 0){
                    this.setState({filterInformationRoom1BedA : false})
                } else {this.setState({filterInformationRoom1BedA : true})}
            
                if (this.state.filterRoom1BedB.length === 0){
                    this.setState({filterInformationRoom1BedB : false})
                } else {this.setState({filterInformationRoom1BedB : true})}
            
                if (this.state.filterRoom1BedC.length === 0){
                    this.setState({filterInformationRoom1BedC : false})
                } else {this.setState({filterInformationRoom1BedC : true})}
            
            }

            if(this.state.room2 && this.state.room2.length > 0) {
                
                let filtersecondRoom = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom2 : filtersecondRoom})
                
                let filtersecondRoomBedA = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom2BedA : filtersecondRoomBedA})
            
                let filtersecondRoomBedB = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom2BedB : filtersecondRoomBedB})
            
                let filtersecondRoomBedC = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom2BedC : filtersecondRoomBedC})
            
                if(this.state.filterRoom2.length === 0){
                    this.setState({filterCollapseRoom2 : false})
                } else {this.setState({filterCollapseRoom2 : true})}
            
                if (this.state.filterRoom2BedA.length === 0){
                    this.setState({filterInformationRoom2BedA : false})
                } else {this.setState({filterInformationRoom2BedA : true})}
            
                if (this.state.filterRoom2BedB.length === 0){
                    this.setState({filterInformationRoom2BedB : false})
                } else {this.setState({filterInformationRoom2BedB : true})}
            
                if (this.state.filterRoom2BedC.length === 0){
                    this.setState({filterInformationRoom2BedC : false})
                } else {this.setState({filterInformationRoom2BedC : true})}
            
            }

            if(this.state.room3 && this.state.room3.length > 0) {
                
                let filterthirdRoom = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom3 : filterthirdRoom})
                
                let filterthirdRoomBedA = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom3BedA : filterthirdRoomBedA})

                let filterthirdRoomBedB = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom3BedB : filterthirdRoomBedB})

                let filterthirdRoomBedC = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom3BedC : filterthirdRoomBedC})

                if(this.state.filterRoom3.length === 0){
                    this.setState({filterCollapseRoom3 : false})
                } else {this.setState({filterCollapseRoom3 : true})}

                if (this.state.filterRoom3BedA.length === 0){
                    this.setState({filterInformationRoom3BedA : false})
                } else {this.setState({filterInformationRoom3BedA : true})}

                if (this.state.filterRoom3BedB.length === 0){
                    this.setState({filterInformationRoom3BedB : false})
                } else {this.setState({filterInformationRoom3BedB : true})}

                if (this.state.filterRoom3BedC.length === 0){
                    this.setState({filterInformationRoom3BedC : false})
                } else {this.setState({filterInformationRoom3BedC : true})}

            }

            if(this.state.room4 && this.state.room4.length > 0) {
                
                let filterfourthRoom = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom4 : filterfourthRoom})
                
                let filterfourthRoomBedA = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom4BedA : filterfourthRoomBedA})
            
                let filterfourthRoomBedB = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom4BedB : filterfourthRoomBedB})
            
                let filterfourthRoomBedC = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom4BedC : filterfourthRoomBedC})
            
                if(this.state.filterRoom4.length === 0){
                    this.setState({filterCollapseRoom4 : false})
                } else {this.setState({filterCollapseRoom4 : true})}
            
                if (this.state.filterRoom4BedA.length === 0){
                    this.setState({filterInformationRoom4BedA : false})
                } else {this.setState({filterInformationRoom4BedA : true})}
            
                if (this.state.filterRoom4BedB.length === 0){
                    this.setState({filterInformationRoom4BedB : false})
                } else {this.setState({filterInformationRoom4BedB : true})}
            
                if (this.state.filterRoom4BedC.length === 0){
                    this.setState({filterInformationRoom4BedC : false})
                } else {this.setState({filterInformationRoom4BedC : true})}
            
            }

            if(this.state.room5 && this.state.room5.length > 0) {
                
                let filterfifthRoom = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom5 : filterfifthRoom})
                
                let filterfifthRoomBedA = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom5BedA : filterfifthRoomBedA})
            
                let filterfifthRoomBedB = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom5BedB : filterfifthRoomBedB})
            
                let filterfifthRoomBedC = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom5BedC : filterfifthRoomBedC})
            
                if(this.state.filterRoom5.length === 0){
                    this.setState({filterCollapseRoom5 : false})
                } else {this.setState({filterCollapseRoom5 : true})}
            
                if (this.state.filterRoom5BedA.length === 0){
                    this.setState({filterInformationRoom5BedA : false})
                } else {this.setState({filterInformationRoom5BedA : true})}
            
                if (this.state.filterRoom5BedB.length === 0){
                    this.setState({filterInformationRoom5BedB : false})
                } else {this.setState({filterInformationRoom5BedB : true})}
            
                if (this.state.filterRoom5BedC.length === 0){
                    this.setState({filterInformationRoom5BedC : false})
                } else {this.setState({filterInformationRoom5BedC : true})}
            
            }

            if(this.state.room6 && this.state.room6.length > 0) {
                
                let filtersixthRoom = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom6 : filtersixthRoom})
                
                let filtersixthRoomBedA = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom6BedA : filtersixthRoomBedA})
            
                let filtersixthRoomBedB = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom6BedB : filtersixthRoomBedB})
            
                let filtersixthRoomBedC = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom6BedC : filtersixthRoomBedC})
            
                if(this.state.filterRoom6.length === 0){
                    this.setState({filterCollapseRoom6 : false})
                } else {this.setState({filterCollapseRoom6 : true})}
            
                if (this.state.filterRoom6BedA.length === 0){
                    this.setState({filterInformationRoom6BedA : false})
                } else {this.setState({filterInformationRoom6BedA : true})}
            
                if (this.state.filterRoom6BedB.length === 0){
                    this.setState({filterInformationRoom6BedB : false})
                } else {this.setState({filterInformationRoom6BedB : true})}
            
                if (this.state.filterRoom6BedC.length === 0){
                    this.setState({filterInformationRoom6BedC : false})
                } else {this.setState({filterInformationRoom6BedC : true})}
            
            }

            if(this.state.room7 && this.state.room7.length > 0) {
                
                let filterseventhRoom = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom7 : filterseventhRoom})
                
                let filterseventhRoomBedA = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom7BedA : filterseventhRoomBedA})
            
                let filterseventhRoomBedB = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom7BedB : filterseventhRoomBedB})
            
                let filterseventhRoomBedC = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom7BedC : filterseventhRoomBedC})
            
                if(this.state.filterRoom7.length === 0){
                    this.setState({filterCollapseRoom7 : false})
                } else {this.setState({filterCollapseRoom7 : true})}
            
                if (this.state.filterRoom7BedA.length === 0){
                    this.setState({filterInformationRoom7BedA : false})
                } else {this.setState({filterInformationRoom7BedA : true})}
            
                if (this.state.filterRoom7BedB.length === 0){
                    this.setState({filterInformationRoom7BedB : false})
                } else {this.setState({filterInformationRoom7BedB : true})}
            
                if (this.state.filterRoom7BedC.length === 0){
                    this.setState({filterInformationRoom7BedC : false})
                } else {this.setState({filterInformationRoom7BedC : true})}
            
            }

            if(this.state.room8 && this.state.room8.length > 0) {
                
                let filtereighthRoom = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                this.setState({filterRoom8 : filtereighthRoom})
                
                let filtereighthRoomBedA = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'A')
                this.setState({filterRoom8BedA : filtereighthRoomBedA})
            
                let filtereighthRoomBedB = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'B')
                this.setState({filterRoom8BedB : filtereighthRoomBedB})
            
                let filtereighthRoomBedC = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY && item.bed == 'C')
                this.setState({filterRoom8BedC : filtereighthRoomBedC})
            
                if(this.state.filterRoom8.length === 0){
                    this.setState({filterCollapseRoom8 : false})
                } else {this.setState({filterCollapseRoom8 : true})}
            
                if (this.state.filterRoom8BedA.length === 0){
                    this.setState({filterInformationRoom8BedA : false})
                } else {this.setState({filterInformationRoom8BedA : true})}
            
                if (this.state.filterRoom8BedB.length === 0){
                    this.setState({filterInformationRoom8BedB : false})
                } else {this.setState({filterInformationRoom8BedB : true})}
            
                if (this.state.filterRoom8BedC.length === 0){
                    this.setState({filterInformationRoom8BedC : false})
                } else {this.setState({filterInformationRoom8BedC : true})}
            
            }

            this.setState({readyDisplay : true, loading : false,})

            
        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

    }

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    tryAgainNotConnection = () => {
        this.setState({clockrun : true})
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
					<View>
                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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

                        {Dimensions.get('window').width >= 414 &&(
                            <View>
                                <View style={globalStyles.skeletonMarginTop}>
                                    <Center w="100%">
                                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                            <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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

						
                        <View>
                            <Text onPress={this.state.connection_status ? this.onRefresh : this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
						
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
                                                {/*ROOM 1*/}
                                                <View style={item.data.proom1 == 'NULL' && item.data.date1 == 'NULL' && item.data.food1 == 'NULL' && item.data.type1 == 'NULL' && item.data.bed1 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxH="80" maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View style={globalStyles.ProfileBannerView}>
                                                                                <Image
                                                                                style={globalStyles.ProfileBannerImages}
                                                                                source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                                                                                resizeMode="stretch"
                                                                                />
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#232159" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size='xs' color='white'>Room 1</Heading>
                                                                        </Center>
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt="15%" mb="-10%">
                                                                <Center mr="-8%">
                                                                    <Fab renderInPortal={false} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size="lg" />} />
                                                                </Center>
                                                            </Stack>
                                                            <Center>
                                                                <Heading size='md'>CAD$ {item.data.aprox1}</Heading>
                                                            </Center>
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w="10%">
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type1}</Text>
                                                                    </Stack>
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food1}</Text>
                                                                    </Stack>
                                                                    <Center size="16" w="10%"></Center>
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </View>



                                                <View style={item.data.proom1 == 'NULL' && item.data.date1 == 'NULL' && item.data.food1 == 'NULL' && item.data.type1 == 'NULL' && item.data.bed1 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 1</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox1}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom1 == "NULL" && item.data.proom1_2 == "NULL" && item.data.proom1_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom1 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom1_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom1_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom1_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom1_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type1}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food1}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom1 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded} onToggle={(isExpanded)=>this.setState({expanded: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 1 */}
                                                                    {!item.room1 ? null : item.room1.filter(room1Room => room1Room.start <= this.state.XDAY && room1Room.end >= this.state.XDAY && room1Room.bed == 'NULL').map( room1 =>
                                                                        <View key={!room1.id_e ? null : room1.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room1.title ? null : room1.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room1.start ? null :room1.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room1.end ? null :room1.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 1 Bed A */}
                                                                {this.state.filterInformationRoom1BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 1</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed1}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date1}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room1 ? null : item.room1.filter(room1RoomA => room1RoomA.start <= this.state.XDAY && room1RoomA.end >= this.state.XDAY && room1RoomA.bed == 'A').map( room1 =>
                                                                            <View key={!room1.id_e ? null : room1.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room1.title ? null : room1.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room1.start ? null :room1.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room1.end ? null :room1.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 1 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom1BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 2</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed1_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date1_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room1 ? null : item.room1.filter(room1RoomB => room1RoomB.start <= this.state.XDAY && room1RoomB.end >= this.state.XDAY && room1RoomB.bed == 'B').map( room1 =>
                                                                            <View key={!room1.id_e ? null : room1.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room1.title ? null : room1.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room1.start ? null :room1.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room1.end ? null :room1.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 1 Bed C */}
                                                                {this.state.filterInformationRoom1BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 3</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed1_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date1_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room1 ? null : item.room1.filter(room1RoomC => room1RoomC.start <= this.state.XDAY && room1RoomC.end >= this.state.XDAY && room1RoomC.bed == 'C').map( room1 =>
                                                                            <View key={!room1.id_e ? null : room1.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room1.title ? null : room1.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room1.start ? null :room1.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room1.end ? null :room1.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom1 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 2*/}
                                                <View style={item.data.proom2 == 'NULL' && item.data.date2 == 'NULL' && item.data.food2 == 'NULL' && item.data.type2 == 'NULL' && item.data.bed2 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 2</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox2}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom2 == "NULL" && item.data.proom2_2 == "NULL" && item.data.proom2_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom2_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom2_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom2_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom2_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type2}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food2}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom2 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded2} onToggle={(isExpanded)=>this.setState({expanded2: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 2 */}
                                                                    {!item.room2 ? null : item.room2.filter(room2Room => room2Room.start <= this.state.XDAY && room2Room.end >= this.state.XDAY && room2Room.bed == 'NULL').map( room2 =>
                                                                        <View key={!room2.id_e ? null : room2.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room2.title ? null : room2.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room2.start ? null :room2.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room2.end ? null :room2.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 2 Bed A */}
                                                                {this.state.filterInformationRoom2BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 2</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room2 ? null : item.room2.filter(room2RoomA => room2RoomA.start <= this.state.XDAY && room2RoomA.end >= this.state.XDAY && room2RoomA.bed == 'A').map( room2 =>
                                                                            <View key={!room2.id_e ? null : room2.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room2.title ? null : room2.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room2.start ? null :room2.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room2.end ? null :room2.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 2 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom2BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 2</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed2_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date2_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room2 ? null : item.room2.filter(room2RoomB => room2RoomB.start <= this.state.XDAY && room2RoomB.end >= this.state.XDAY && room2RoomB.bed == 'B').map( room2 =>
                                                                            <View key={!room2.id_e ? null : room2.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room2.title ? null : room2.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room2.start ? null :room2.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room2.end ? null :room2.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 2 Bed C */}
                                                                {this.state.filterInformationRoom2BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 3</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed2_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date2_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room2 ? null : item.room2.filter(room2RoomC => room2RoomC.start <= this.state.XDAY && room2RoomC.end >= this.state.XDAY && room2RoomC.bed == 'C').map( room2 =>
                                                                            <View key={!room2.id_e ? null : room2.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room2.title ? null : room2.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room2.start ? null :room2.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room2.end ? null :room2.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom2 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 3*/}
                                                <View style={item.data.proom3 == 'NULL' && item.data.date3 == 'NULL' && item.data.food3 == 'NULL' && item.data.type3 == 'NULL' && item.data.bed3 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 3</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox3}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom3 == "NULL" && item.data.proom3_2 == "NULL" && item.data.proom3_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom3_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom3_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom3_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom3_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type3}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food3}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom3 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded3} onToggle={(isExpanded)=>this.setState({expanded3: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 3 */}
                                                                    {!item.room3 ? null : item.room3.filter(room3Room => room3Room.start <= this.state.XDAY && room3Room.end >= this.state.XDAY && room3Room.bed == 'NULL').map( room3 =>
                                                                        <View key={!room3.id_e ? null : room3.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room3.title ? null : room3.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room3.start ? null :room3.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room3.end ? null :room3.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 3 Bed A */}
                                                                {this.state.filterInformationRoom3BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 3</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room3 ? null : item.room3.filter(room3RoomA => room3RoomA.start <= this.state.XDAY && room3RoomA.end >= this.state.XDAY && room3RoomA.bed == 'A').map( room3 =>
                                                                            <View key={!room3.id_e ? null : room3.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room3.title ? null : room3.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room3.start ? null :room3.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room3.end ? null :room3.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 3 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom3BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 3</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed3_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date3_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room3 ? null : item.room3.filter(room3RoomB => room3RoomB.start <= this.state.XDAY && room3RoomB.end >= this.state.XDAY && room3RoomB.bed == 'B').map( room3 =>
                                                                            <View key={!room3.id_e ? null : room3.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room3.title ? null : room3.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room3.start ? null :room3.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room3.end ? null :room3.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 3 Bed C */}
                                                                {this.state.filterInformationRoom3BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 3</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed3_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date3_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room3 ? null : item.room3.filter(room3RoomC => room3RoomC.start <= this.state.XDAY && room3RoomC.end >= this.state.XDAY && room3RoomC.bed == 'C').map( room3 =>
                                                                            <View key={!room3.id_e ? null : room3.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room3.title ? null : room3.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room3.start ? null :room3.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room3.end ? null :room3.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom3 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 4*/}
                                                <View style={item.data.proom4 == 'NULL' && item.data.date4 == 'NULL' && item.data.food4 == 'NULL' && item.data.type4 == 'NULL' && item.data.bed4 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 4</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox4}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom4 == "NULL" && item.data.proom4_2 == "NULL" && item.data.proom4_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom4 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom4}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom4_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom4_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom4_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom4_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type4}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food4}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom4 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded4} onToggle={(isExpanded)=>this.setState({expanded4: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 4 */}
                                                                    {!item.room4 ? null : item.room4.filter(room4Room => room4Room.start <= this.state.XDAY && room4Room.end >= this.state.XDAY && room4Room.bed == 'NULL').map( room4 =>
                                                                        <View key={!room4.id_e ? null : room4.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room4.title ? null : room4.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room4.start ? null :room4.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room4.end ? null :room4.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 4 Bed A */}
                                                                {this.state.filterInformationRoom4BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 4</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed4}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date4}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room4 ? null : item.room4.filter(room4RoomA => room4RoomA.start <= this.state.XDAY && room4RoomA.end >= this.state.XDAY && room4RoomA.bed == 'A').map( room4 =>
                                                                            <View key={!room4.id_e ? null : room4.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room4.title ? null : room4.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room4.start ? null :room4.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room4.end ? null :room4.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 4 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom4BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 4</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed4_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date4_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room4 ? null : item.room4.filter(room4RoomB => room4RoomB.start <= this.state.XDAY && room4RoomB.end >= this.state.XDAY && room4RoomB.bed == 'B').map( room4 =>
                                                                            <View key={!room4.id_e ? null : room4.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room4.title ? null : room4.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room4.start ? null :room4.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room4.end ? null :room4.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 4 Bed C */}
                                                                {this.state.filterInformationRoom4BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 4</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed4_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date4_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room4 ? null : item.room4.filter(room4RoomC => room4RoomC.start <= this.state.XDAY && room4RoomC.end >= this.state.XDAY && room4RoomC.bed == 'C').map( room4 =>
                                                                            <View key={!room4.id_e ? null : room4.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room4.title ? null : room4.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room4.start ? null :room4.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room4.end ? null :room4.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom4 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 5*/}
                                                <View style={item.data.proom5 == 'NULL' && item.data.date5 == 'NULL' && item.data.food5 == 'NULL' && item.data.type5 == 'NULL' && item.data.bed5 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 5</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox5}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom5 == "NULL" && item.data.proom5_2 == "NULL" && item.data.proom5_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom5 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom5}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom5_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom5_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom5_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom5_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type5}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food5}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom5 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded5} onToggle={(isExpanded)=>this.setState({expanded5: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 5 */}
                                                                    {!item.room5 ? null : item.room5.filter(room5Room => room5Room.start <= this.state.XDAY && room5Room.end >= this.state.XDAY && room5Room.bed == 'NULL').map( room5 =>
                                                                        <View key={!room5.id_e ? null : room5.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room5.title ? null : room5.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room5.start ? null :room5.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room5.end ? null :room5.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 5 Bed A */}
                                                                {this.state.filterInformationRoom5BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 5</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed5}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date5}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room5 ? null : item.room5.filter(room5RoomA => room5RoomA.start <= this.state.XDAY && room5RoomA.end >= this.state.XDAY && room5RoomA.bed == 'A').map( room5 =>
                                                                            <View key={!room5.id_e ? null : room5.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room5.title ? null : room5.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room5.start ? null :room5.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room5.end ? null :room5.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 5 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom5BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 5</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed5_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date5_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room5 ? null : item.room5.filter(room5RoomB => room5RoomB.start <= this.state.XDAY && room5RoomB.end >= this.state.XDAY && room5RoomB.bed == 'B').map( room5 =>
                                                                            <View key={!room5.id_e ? null : room5.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room5.title ? null : room5.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room5.start ? null :room5.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room5.end ? null :room5.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 5 Bed C */}
                                                                {this.state.filterInformationRoom5BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 5</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom5BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed5_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom5AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date5_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room5 ? null : item.room5.filter(room5RoomC => room5RoomC.start <= this.state.XDAY && room5RoomC.end >= this.state.XDAY && room5RoomC.bed == 'C').map( room5 =>
                                                                            <View key={!room5.id_e ? null : room5.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room5.title ? null : room5.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room5.start ? null :room5.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room5.end ? null :room5.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom5 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 6*/}
                                                <View style={item.data.proom6 == 'NULL' && item.data.date6 == 'NULL' && item.data.food6 == 'NULL' && item.data.type6 == 'NULL' && item.data.bed6 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 6</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox6}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom6 == "NULL" && item.data.proom6_2 == "NULL" && item.data.proom6_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom6 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom6_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom6_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom6_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom6_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type6}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food6}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom6 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded6} onToggle={(isExpanded)=>this.setState({expanded6: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 6 */}
                                                                    {!item.room6 ? null : item.room6.filter(room6Room => room6Room.start <= this.state.XDAY && room6Room.end >= this.state.XDAY && room6Room.bed == 'NULL').map( room6 =>
                                                                        <View key={!room6.id_e ? null : room6.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room6.title ? null : room6.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room6.start ? null :room6.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room6.end ? null :room6.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 6 Bed A */}
                                                                {this.state.filterInformationRoom6BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 6</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed6}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date6}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room6 ? null : item.room6.filter(room6RoomA => room6RoomA.start <= this.state.XDAY && room6RoomA.end >= this.state.XDAY && room6RoomA.bed == 'A').map( room6 =>
                                                                            <View key={!room6.id_e ? null : room6.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room6.title ? null : room6.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room6.start ? null :room6.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room6.end ? null :room6.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 6 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom6BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 6</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed6_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date6_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room6 ? null : item.room6.filter(room6RoomB => room6RoomB.start <= this.state.XDAY && room6RoomB.end >= this.state.XDAY && room6RoomB.bed == 'B').map( room6 =>
                                                                            <View key={!room6.id_e ? null : room6.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room6.title ? null : room6.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room6.start ? null :room6.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room6.end ? null :room6.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 6 Bed C */}
                                                                {this.state.filterInformationRoom6BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 6</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed6_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date6_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room6 ? null : item.room6.filter(room6RoomC => room6RoomC.start <= this.state.XDAY && room6RoomC.end >= this.state.XDAY && room6RoomC.bed == 'C').map( room6 =>
                                                                            <View key={!room6.id_e ? null : room6.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room6.title ? null : room6.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room6.start ? null :room6.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room6.end ? null :room6.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom6 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 7*/}
                                                <View style={item.data.proom7 == 'NULL' && item.data.date7 == 'NULL' && item.data.food7 == 'NULL' && item.data.type7 == 'NULL' && item.data.bed7 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 7</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox7}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom7 == "NULL" && item.data.proom7_2 == "NULL" && item.data.proom7_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom7 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom7_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom7_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom7_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom7_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type7}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food7}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom7 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded7} onToggle={(isExpanded)=>this.setState({expanded7: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 7 */}
                                                                    {!item.room7 ? null : item.room7.filter(room7Room => room7Room.start <= this.state.XDAY && room7Room.end >= this.state.XDAY && room7Room.bed == 'NULL').map( room7 =>
                                                                        <View key={!room7.id_e ? null : room7.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room7.title ? null : room7.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room7.start ? null :room7.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room7.end ? null :room7.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 7 Bed A */}
                                                                {this.state.filterInformationRoom7BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 7</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom7BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed7}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date7}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room7 ? null : item.room7.filter(room7RoomA => room7RoomA.start <= this.state.XDAY && room7RoomA.end >= this.state.XDAY && room7RoomA.bed == 'A').map( room7 =>
                                                                            <View key={!room7.id_e ? null : room7.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room7.title ? null : room7.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room7.start ? null :room7.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room7.end ? null :room7.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 7 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom7BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 7</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed7_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date7_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room7 ? null : item.room7.filter(room7RoomB => room7RoomB.start <= this.state.XDAY && room7RoomB.end >= this.state.XDAY && room7RoomB.bed == 'B').map( room7 =>
                                                                            <View key={!room7.id_e ? null : room7.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room7.title ? null : room7.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room7.start ? null :room7.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room7.end ? null :room7.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 7 Bed C */}
                                                                {this.state.filterInformationRoom7BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 7</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed7_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date7_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room7 ? null : item.room7.filter(room7RoomC => room7RoomC.start <= this.state.XDAY && room7RoomC.end >= this.state.XDAY && room7RoomC.bed == 'C').map( room7 =>
                                                                            <View key={!room7.id_e ? null : room7.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room7.title ? null : room7.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room7.start ? null :room7.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room7.end ? null :room7.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom7 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>

                                                {/*ROOM 8*/}
                                                <View style={item.data.proom8 == 'NULL' && item.data.date8 == 'NULL' && item.data.food8 == 'NULL' && item.data.type8 == 'NULL' && item.data.bed8 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Card>
                                                        <VStack>
                                                            <HStack width='100%'>
                                                                <HStack width='50%' textAlign='left'>
                                                                    <Heading size='xl' style={ globalStyles.titleRoomsNativeBase}>Room 8</Heading>
                                                                </HStack>
                                                                <HStack width='50%' direction="row-reverse">
                                                                    <Heading size='xl' style={ globalStyles.priceRooms1NativeBase}>CAD$ {item.data.aprox8}</Heading>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Divider my="2" bg="gray.500" />

                                                        <VStack>
                                                            <HStack space={2} width='100%'>
                                                                <HStack width='40%'>
                                                                    <Box>
                                                                        <Swiper style={globalStyles.showsliderRoompreviewNativeBase} showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                            {item.data.proom8 == "NULL" && item.data.proom8_2 == "NULL" && item.data.proom8_3 == "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom8 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom8_2 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom8_2}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                            {item.data.proom8_3 != "NULL" && (
                                                                                <View>
                                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                                        <View style={globalStyles.RoomPreviewBannerView}>
                                                                                            <Image
                                                                                            style={globalStyles.RoomPreviewBannerImages}
                                                                                            source={{ uri: `http://homebor.com/${item.data.proom8_3}` }}
                                                                                            resizeMode="stretch"
                                                                                            />
                                                                                        </View>
                                                                                    </AspectRatio>
                                                                                </View>
                                                                            )}
                                                                        </Swiper>
                                                                    </Box>

                                                                </HStack>
                                                                <HStack width='50%' mt={'8%'}>
                                                                    <HStack space={2} width='100%'>
                                                                        <HStack width='50%' space={2} textAlign='left'>
                                                                            <HStack width='25%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='75%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type8}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                        <HStack width='50%'>
                                                                            <HStack width='40%'>
                                                                                <Image
                                                                                source={require("../assets/img/roomIcon/food-16.png")}
                                                                                resizeMode="contain"
                                                                                style={globalStyles.imageroom2NativeBase}
                                                                                ></Image>
                                                                            </HStack>
                                                                            <HStack width='60%'>
                                                                                <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food8}</Text>
                                                                            </HStack>
                                                                        </HStack>
                                                                    </HStack>
                                                                </HStack>
                                                            </HStack>
                                                        </VStack>

                                                        <Collapse style={this.state.filterCollapseRoom8 != false ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible} isExpanded={this.state.expanded8} onToggle={(isExpanded)=>this.setState({expanded8: isExpanded})}>
                                                            <CollapseHeader>
                                                                <View>
                                                                    {
                                                                    this.state.expanded === false ?
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                                {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={globalStyles.buttonroom}>
                                                                        <Text style={globalStyles.buttonTextroom}>
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                            {'       '}Room Occupied{'       '}
                                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            </CollapseHeader>
                                                            <CollapseBody>
                                                                <View style={globalStyles.collapsibleItem}>
                                                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                                                </View>

                                                                <View>
                                                                    {/*Room Ocuppied 8 */}
                                                                    {!item.room8 ? null : item.room8.filter(room8Room => room8Room.start <= this.state.XDAY && room8Room.end >= this.state.XDAY && room8Room.bed == 'NULL').map( room8 =>
                                                                        <View key={!room8.id_e ? null : room8.id_e}> 
                                                                            <View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room8.title ? null : room8.title}</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                </View>
                                                                                <View style={globalStyles.collapsibleItem}>
                                                                                    <Text style={globalStyles.roomocuppiedStart}>{!room8.start ? null :room8.start}</Text>
                                                                                    <Text style={globalStyles.roomocuppiedEnd}>{!room8.end ? null :room8.end}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>                   
                                                                    )}
                                                                </View>

                                                                {/*Room Ocuppied 8 Bed A */}
                                                                {this.state.filterInformationRoom8BedA != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 8</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom8BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed8}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date8}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room8 ? null : item.room8.filter(room8RoomA => room8RoomA.start <= this.state.XDAY && room8RoomA.end >= this.state.XDAY && room8RoomA.bed == 'A').map( room8 =>
                                                                            <View key={!room8.id_e ? null : room8.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room8.title ? null : room8.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room8.start ? null :room8.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room8.end ? null :room8.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                     
                                                                        )}
                                                                    </View>
                                                                )} 

                                                                {/*Room Ocuppied 8 Bed B */}
                                                                
                                                                {this.state.filterInformationRoom8BedB != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 8</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed8_2}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date8_2}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room8 ? null : item.room8.filter(room8RoomB => room8RoomB.start <= this.state.XDAY && room8RoomB.end >= this.state.XDAY && room8RoomB.bed == 'B').map( room8 =>
                                                                            <View key={!room8.id_e ? null : room8.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room8.title ? null : room8.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room8.start ? null :room8.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room8.end ? null :room8.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                    
                                                                        )}
                                                                    </View>
                                                                )}
                                                                

                                                                {/*Room Ocuppied 8 Bed C */}
                                                                {this.state.filterInformationRoom8BedC != false && (
                                                                    <View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <Text style={globalStyles.roomocuppiedName}>Bed 8</Text>
                                                                        </View>
                                                                        <View style={globalStyles.collapsibleItem}>
                                                                            <HStack>
                                                                                <Image
                                                                                    source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                    resizeMode="contain"
                                                                                    style={globalStyles.imageroom6BedFilter}
                                                                                ></Image>
                                                                                <Text style={globalStyles.roomocuppiedArrive}>{item.data.bed8_3}</Text>
                                                                            </HStack>

                                                                            <View style={globalStyles.roomOcuppiedfilterTitleBed}>
                                                                                <HStack>
                                                                                    <Image
                                                                                        source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                                                        resizeMode="contain"
                                                                                        style={globalStyles.imageroom6AvalibleFilter}
                                                                                    ></Image>
                                                                                    <Text style={globalStyles.roomocuppiedLeaveTitleFilter}>{item.data.date8_3}</Text>
                                                                                </HStack>
                                                                            </View>
                                                                        </View>
                                                                        {!item.room8 ? null : item.room8.filter(room8RoomC => room8RoomC.start <= this.state.XDAY && room8RoomC.end >= this.state.XDAY && room8RoomC.bed == 'C').map( room8 =>
                                                                            <View key={!room8.id_e ? null : room8.id_e}> 
                                                                                <View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room8.title ? null : room8.title}</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                                                    </View>
                                                                                    <View style={globalStyles.collapsibleItem}>
                                                                                        <Text style={globalStyles.roomocuppiedStart}>{!room8.start ? null :room8.start}</Text>
                                                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room8.end ? null :room8.end}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>                      
                                                                        )}
                                                                    </View>
                                                                )} 
                                                            </CollapseBody>
                                                        
                                                        </Collapse>
                                                        <View style={this.state.filterCollapseRoom8 != false ? globalStyles.bordercolorOccupied : globalStyles.bordercolorAvalible }/>
                                                    </Card>
                                                </View>
                                                
                                            </View>
                                        )}/>
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