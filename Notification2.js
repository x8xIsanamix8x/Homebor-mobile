import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native'
import NotificationList from '../screens/notificationList'

import globalStyles from '../styles/global';

class Notification extends Component {
	constructor(props){
		super(props);
		this.state = {
			userNotification : [
				{ name: 'Notification 1', key: '1' },
				{ name: 'Notification 2', key: '2' },
				{ name: 'Notification 3', key: '3' },
				{ name: 'Notification 4', key: '4' },
				{ name: 'Notification 5', key: '5' },
				{ name: 'Notification 6', key: '6' },
				{ name: 'Notification 7', key: '7' },
			]
		}
	}

	separator = () => {
		return(
			<View style={StyleSheet.container}></View>
		)
	}

	render(){
		return(
			<ImageBackground source={require('../assets/img/backgroundNotification.png')} style={styles.stylesImageBackground}>
			<FlatList data={this.state.userNotification}
			renderItem={ ({item}) => <NotificationList data={item} />}
			horizontal={false}
			ItemSeparatorComponent={this.separator}></FlatList>
			</ImageBackground>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 40,
		paddingHorizontal: 20
	},
	stylesImageBackground: {
		width: '100%',
		height: '100%'
	}
});

export default Notification


