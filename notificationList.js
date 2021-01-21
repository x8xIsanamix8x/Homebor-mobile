import React from 'react'
import { View, Image, StyleSheet, ScrollView, Text, ImageBackground, FlatList } from 'react-native'
import Card from '../shared/card';
import { MaterialIcons } from '@expo/vector-icons';

function NotificationList(props){

    return(
        <View style={StyleSheet.container}>
            <View style={styles.item} key={props.data.key}>
				<Card>
					<Text> ITEM 1 </Text>
				</Card>
                    <MaterialIcons name="notifications" size={18} color="black" />
                    <Text>{props.data.name}</Text>
            </View>

            <View>
			    <Card>
					<Text> ITEM 1 </Text>
				</Card>
			</View>
        </View>
    )
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
});

export default NotificationList