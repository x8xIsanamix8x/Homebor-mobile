import React, { useState} from 'react';
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card';

import globalStyles from '../styles/global';

export default function Notification () {
	const [people, setPeople] = useState([
		{ name: 'Notification 1', key: '1' },
		{ name: 'Notification 2', key: '2' },
		{ name: 'Notification 3', key: '3' },
		{ name: 'Notification 4', key: '4' },
		{ name: 'Notification 5', key: '5' },
		{ name: 'Notification 6', key: '6' },
		{ name: 'Notification 7', key: '7' },
	]);

	return (
		<View style={StyleSheet.container}>
			<ImageBackground source={require('../assets/img/backgroundNotification.png')} style={styles.stylesImageBackground}>
				<ScrollView>
					{ people.map(item => (
							<View style={styles.item} key={item.key}>
								<Card>
									<Text> ITEM 1 </Text>
								</Card>
								
								<MaterialIcons name="notifications" size={18} color="black" />
								<Text style={styles.itemText}>{item.name}</Text>
							</View>
					))}

							<View>
								<Card>
									<Text> ITEM 1 </Text>
								</Card>
							</View>

				</ScrollView>
			</ImageBackground>
		</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 40,
		paddingHorizontal: 20
	},
	item: {
		padding: 16,
		marginTop: 16,
		borderRadius: 10,
		backgroundColor: '#eeeeee',
		fontSize: 24,
		flexDirection: 'column'
	},
	itemText: {
		marginLeft: 30,
		flexDirection: 'row'
	},
	stylesImageBackground: {
		width: '100%',
		height: '100%'
	}
});